import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { alterActivityLiked } from "api/activityApi";
import { transferTimestamp } from "utils/date-fns";
import { switchDifficulty } from "utils/translation";
import { displayLocation } from "utils/location";

import {ReactComponent as HeartIcon} from "assets/icons/HeartIcon.svg"
import {ReactComponent as LocationIcon} from "assets/icons/LocationIcon.svg"
import {ReactComponent as CalendarIcon} from "assets/icons/CalendarIcon.svg"
import {ReactComponent as CheckIcon} from "assets/icons/CheckIcon.svg"

import defaultImageURL from "data/defaultImageURL.json";

const ActivityCardItem = ({className, activity}) => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const userId = user?.uid
  const activityId = activity?.id
  const [isActivityLiked, setIsActivityLiked] = useState(false)

  useEffect(()=>{
    setIsActivityLiked(user?.likedActivities?.includes(activityId))
  },[activityId, user])

  const handleActivityLiked = async() => {
    if(!user.loggedIn){
      toast.error('請登入以收藏', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return
    }

    const {success} = await alterActivityLiked(userId, activityId)
    setIsActivityLiked(!isActivityLiked)

    if(!isActivityLiked){
      if(success){
        toast.success('收藏活動成功', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }else{
        toast.error('收藏活動失敗', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }else{
      if(success){
        toast.success('取消收藏活動成功', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }else{
        toast.error('取消收藏活動失敗', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }
  }
  return(
    <div className={className}>

      <div className="l-activity-card__cover">
        <Link to={`/activity/${activityId}`}>
          <img className="o-activity__image" src={activity?.coverURL || defaultImageURL.activityCover} alt="activity cover" />
        </Link>
        {
          (user?.attendedActivities?.includes(activityId) || user?.heldActivities?.includes(activityId)) &&
          <div className="o-activity-card__attendance">
            <CheckIcon/><h4>已參加</h4>
          </div>
        }
        
      </div>

      <div className="l-activity-card__info">
        <div className="l-activity-card__title">
          <Link className="o-activity-card__avatar" to={`/user/${activity?.holder?.uid}`} >
            <img  src={activity?.holder?.photoURL} alt="user avatar"/>
          </Link>
          <Link className="o-activity-card__name" to={`/activity/${activity?.id}`}>
            <h3>{activity?.name?.length > 8 ? activity?.name?.slice(0,7)+'...':activity?.name}</h3>
          </Link>
        </div>

        <div className="c-activity-card__brief">
          <h4 className="o-activity-card__location"><LocationIcon/>{displayLocation(activity?.location)}</h4>
          <h4 className="o-activity-card__date"><CalendarIcon/>{transferTimestamp(activity?.time?.start)} -<br/>{transferTimestamp(activity?.time?.end)}</h4>
        </div>

        <ul className="c-activity-card__highlights">
          <li><span>難度 : </span>{switchDifficulty(activity?.difficulty)}</li>
          <li><span>時長 : </span>{activity?.activityTimeLength}h</li>
          <li><span>費用 : </span>{activity?.cost?.min}-{activity?.cost?.max}</li>
          <li><span>人數 : </span>{activity?.attendance?.length} / {activity?.attendanceLimit}</li>
        </ul>

      </div>

      <div className="o-activity-card__like">
        <input id={`${activity?.id}-like`} type="checkbox" checked={isActivityLiked} onChange={handleActivityLiked}/>
        <label htmlFor={`${activity?.id}-like`}><HeartIcon /></label>
      </div>
      
    </div>
  )
}

const StyledActivityCardItem = styled(ActivityCardItem)`
  position: relative;
  width: 11rem;
  height: 18rem;
  border-radius: 1rem;
  background-color: ${({theme})=>theme.backgroundColor.default};
  overflow: hidden;

  .l-activity-card__cover{
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;

    .o-activity__image{
      width: 100%;
      height: 100%;
      border-radius: 1rem 1rem 0 0;
      object-fit: cover;
    }

    .o-activity-card__attendance{
      position: absolute;
      left: .5rem;
      top: .75rem;
      display: flex;
      gap: .25rem;
      margin-left: .25rem;
      padding: .25rem .5rem;
      border-radius: .7125rem;
      border: 2px solid ${({theme})=>theme.backgroundColor.default};
      background-color: ${({theme})=>theme.color.default};

      svg{
        width: .75rem;
        height: .75rem;
        fill: ${({theme})=>theme.backgroundColor.default};
      }

      h4{
        color: ${({theme})=>theme.backgroundColor.default};
      }

    }
  }

  .l-activity-card__info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: fit-content;
    padding: .75rem .5rem;

    .l-activity-card__title{
      display: flex;
      align-items: center;

      .o-activity-card__avatar img{
        width: 1.75rem;
        height: 1.75rem;
        border-radius: 1rem;
      }

      .o-activity-card__name h3{
        margin-left: .25rem;
        font-weight: 700;
      }
    }

    .o-activity-card__date,
    .o-activity-card__location{
      display: flex;
      line-height: 1rem;

      svg{
        display: block;
        width: 1rem;
        height: 1rem;
        fill: ${({theme})=>theme.color.default};
        margin-right: .25rem;
      }
    }
    
    .o-activity-card__location{
      margin-top: .5rem;
      margin-left: .25rem;
    }

    .o-activity-card__date{
      margin-top: .25rem;
      margin-left: .25rem;
      font-weight: 400;
    }

    .c-activity-card__highlights{
      display: flex;
      flex-wrap: wrap;
      gap: .25rem;
      margin-top: .5rem;
      margin-left: .25rem;

      li{
        padding: .25rem .375rem;
        border-radius: .25rem;
        font-size: .75rem;
        color: white;
        background-color: ${({theme})=>theme.color.default};

        span,
        &:last-child{
          display: none;
        }
      }
    }
  }

  .o-activity-card__like{
    position: absolute;
    top: .5rem;
    right: .75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .25rem;
    border-radius: 50%;
    background-color: white;
    
    input[type="checkbox"]{
      display: none;
    }

    svg{
      width: 1.75rem;
      height: 1.75rem;
      padding: .2rem;
      fill: transparent;
      stroke: ${({theme})=>theme.color.alert};
      stroke-width: 50;
      cursor: pointer;
    }

    &:has(input:checked) label{
      svg{
        fill: ${({theme})=>theme.color.alert};
      }
    }
  }
`

export default StyledActivityCardItem