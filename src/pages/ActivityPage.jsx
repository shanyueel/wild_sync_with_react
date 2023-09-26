import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import styled from "styled-components"

import StyledButton from "components/StyledButton"
import StyledUserInfo from "components/StyledUserInfo"
import StyledActivityBasicInfo from "components/StyledActivityBasicInfo"
import StyledActivityHistory from "components/StyledActivityHistory"
import StyledActivityUpdateModal from "modals/StyledActivityUpdateModal"
import StyledActivityTables from "components/tables/StyledActivityTables"
import StyledActivityAttendance from "components/StyledActivityAttendance"

import { alterActivityAttendance, alterActivityLiked, getActivity } from "api/activityApi"
import { transferTimestamp } from "utils/date-fns"
import { displayLocation } from "utils/location"

import {ReactComponent as ReturnIcon} from "assets/icons/ReturnIcon.svg"
import {ReactComponent as LocationIcon} from "assets/icons/LocationIcon.svg"
import {ReactComponent as CalendarIcon} from "assets/icons/CalendarIcon.svg"
import {ReactComponent as HeartIcon} from "assets/icons/HeartIcon.svg"

const defaultImageURL = require('data/defaultImageURL.json')

const ActivityPage = ({ className }) => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const environmentParams = useSelector(state => state.environment)
  const userId = user.uid
  const windowSize = environmentParams.windowSize
  const activityId = useParams().activityId
  const isHolder = user.heldActivities.includes(activityId)
  const [isLargeLayout, setIsLargeLayout] = useState(false)
  const [isMediumLayout, setIsMediumLayout] = useState(false)
  const [activity, setActivity] = useState({})
  const [userAttendance, setUserAttendance] = useState(false)
  const [isAttendanceExpired, setIsAttendanceExpired] = useState(false)
  const [isAttendanceFull, setIsAttendanceFull] = useState(false)
  const [btnContent, setBtnContent] = useState("報名")
  const [isActivityUpdateModalOpen, setIsActivityUpdateModalOpen] = useState(false)
  const [isActivityLiked, setIsActivityLiked] = useState(false)

  useEffect(()=>{
    const setWindowSize = () => {
      setIsLargeLayout(windowSize === "large")
      setIsMediumLayout(windowSize === "medium" || windowSize === "large")
    }
    setWindowSize()
  },[windowSize])

  useEffect(()=>{
    if(isActivityUpdateModalOpen){
      document.querySelector('body').classList.add('no-scroll')
      document.querySelector('html').classList.add('no-scroll')
    }else{
      document.querySelector('body').classList.remove('no-scroll')
      document.querySelector('html').classList.remove('no-scroll')
    }
  },[isActivityUpdateModalOpen])

  useEffect(()=>{
    const setCurrentActivity = async() => {
      const activity = await getActivity(activityId)
      if(activity){
        setActivity(activity)
        storeBrowseHistory()
      }else{
        navigate('/*')
      } 
    }

    const storeBrowseHistory = () => {
      let currentList = JSON.parse( localStorage.getItem('history') ) || []
      
      if(currentList.includes(activityId)){
        currentList.unshift(activityId)
        currentList = [...new Set(currentList)]
      }else{
        if(currentList.length <= 4){
          currentList.unshift(activityId)
        }else{
          currentList.pop()
          currentList.unshift(activityId)
        }
      }

      localStorage.setItem('history',JSON.stringify(currentList))
    }
    
    setCurrentActivity()
  },[activityId, navigate])

  useEffect(() => {
    const now = new Date()
    setIsAttendanceExpired(Date.parse(now) > activity?.deadline)
    setUserAttendance(activity?.attendance?.includes(userId))
    setIsAttendanceFull(Number(activity?.attendance?.length) === Number(activity?.attendanceLimit))

    if(userAttendance){
      setBtnContent("已成功報名 ( 再次點擊退出 )")
    }else if(isAttendanceExpired){
      setBtnContent("報名已截止")
    }else if(isAttendanceFull){
      setBtnContent("報名已額滿")
    }else{
      setBtnContent("報名加入")
    }
  },[activity, userId, userAttendance, isAttendanceExpired, isAttendanceFull])

  useEffect(()=>{
    setIsActivityLiked(user?.likedActivities?.includes(activityId))
  },[activityId, user])

  const handleReturn = () => {
    window.history.back()
  }

  const handleAttendClick = async() => {
    if(isAttendanceExpired || (isAttendanceFull && !userAttendance)) return

    if(!user.loggedIn){
      toast.error('請登入以報名', {
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
    
    const { success } = await alterActivityAttendance(userId, activityId)
    setUserAttendance(!userAttendance)
    const newActivity = await getActivity(activityId)
    setActivity(newActivity)

    if(!userAttendance){
      if(success){
        toast.success('參加活動成功', {
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
        toast.error('參加活動失敗', {
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
        toast.success('退出活動成功', {
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
        toast.error('退出活動成功', {
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

  const handleActivityUpdate = () => {
    setIsActivityUpdateModalOpen(true)
  }

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
        <div className="l-web-container__main l-activity">
          <div className="l-activity-header">
            <ReturnIcon className="o-activity-header__return" onClick={handleReturn}/>
            <StyledUserInfo user={activity?.holder}/>
            <div className="o-activity__like">
              <input id="like" type="checkbox" onChange={handleActivityLiked} checked={isActivityLiked}/>
              <label htmlFor="like"><HeartIcon /></label>
            </div>
          </div>
          <div className="l-activity-body">
            <img className="o-activity-cover" src={activity?.coverURL || defaultImageURL?.activityCover} alt="activity-cover" />
              <h2 className="o-activity-title">{activity?.name}
              {!isMediumLayout && <br/>}
              <span className="o-activity-title__update-time"> ( 最後更新於: {transferTimestamp(activity?.updateAt) || transferTimestamp(activity?.createAt)} )</span>
            </h2>
            <div className="l-activity-location">
              <LocationIcon /><h3>{displayLocation(activity?.location)}</h3>
            </div>
            <div className="l-activity-time">
              <CalendarIcon /><h3>{transferTimestamp(activity?.time?.start)} - {transferTimestamp(activity?.time?.end)}</h3>
            </div>

            <p className="o-activity-introduction">{activity?.introduction}</p>

            <div className="l-activity-application">
              {activity?.holder?.uid === userId ? 
                <>
                  <StyledButton outlined onClick={handleActivityUpdate} >更新活動</StyledButton>
                  <StyledActivityUpdateModal
                    activityId={activityId}
                    currentActivity={activity}
                    setActivity={setActivity}
                    isActivityUpdateModalOpen={isActivityUpdateModalOpen}  
                    setIsActivityUpdateModalOpen={setIsActivityUpdateModalOpen}
                  />  
                </>

                :<StyledButton outlined={!userAttendance} disabled={isAttendanceExpired || (!userAttendance && isAttendanceFull)} onClick={handleAttendClick} >{ btnContent }</StyledButton>
              }
              
              <h4 className="o-activity-deadline">- 報名截止日: {transferTimestamp(activity?.deadline, "yyyy年MM月dd日 HH:mm")} -</h4>
            </div>

            <StyledActivityBasicInfo 
              className="l-activity-basics" 
              activityContent={{
                difficulty: activity?.difficulty,
                activityTimeLength: activity?.activityTimeLength,
                cost: activity?.cost,
                attendance: activity?.attendance,
                attendanceLimit: activity?.attendanceLimit
              }}
            />
            
            <StyledActivityTables 
              activity={activity}
            />
            
          </div>
          
          <StyledActivityHistory />

        </div>

        <div className="l-web-container__side">
          { 
            activity &&
            <StyledActivityAttendance 
              activity={activity}
              setActivity={setActivity}
              isHolder={isHolder}
              holder={activity?.holder} 
              attendance={activity?.attendance} 
              isLargeLayout={isLargeLayout}
            /> 
          }
        </div>
      </div>
  )
}

const StyledActivityPage = styled(ActivityPage)`
  width: 100%;
  height: 100%;
  
  .l-activity-header{
    display: flex;
    align-items: center;
    width: 100%;
    height: 4rem;
    
    .o-activity-header__return{
      height: 1.5rem;
      margin-right: 1rem;
      fill: ${({theme})=>theme.color.default};
      cursor: pointer;
    }

    .o-activity__like{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      padding: .25rem;
      border-radius: 1rem;
      background-color: white;
      border: 1px solid ${({theme})=>theme.color.alert};
      
      label{
        display: flex;
        align-items: center;
        cursor: pointer;

        svg{
          width: 1.5rem;
          height: 1.5rem;
          padding: .2rem;
          fill: transparent;
          stroke: ${({theme})=>theme.color.alert};
          stroke-width: 50;
        }
      }

      input[type="checkbox"]{
        display: none;
      }



      &:has(input:checked){
        background-color: ${({theme})=>theme.color.alert};
        label{
          color: white;

          svg{
            stroke: white;
            fill: white;
          }
        }

      }
    }
  }

  .o-activity-cover{
    position: absolute;
    top: 4rem;
    left: 0;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .l-activity-body{
     margin-top: calc(1rem + 100vw * 9 / 16);
    
    .o-activity-title{
      margin: .5rem 0 1rem;
      color: ${({theme})=>theme.color.default};
      font-weight: 700;

      .o-activity-title__update-time{
        color: ${({theme})=>theme.color.grey};
        font-weight: 400;
        font-size: .75rem;
      }
    }
    
    .l-activity-time, .l-activity-location {
      display: flex;
      align-items: center;
      margin: .25rem 0;

      svg{
        width: 1.25rem;
        height: 1.25rem;
        fill: ${({theme})=>theme.color.default};
      }
      
      h3{
        margin-left: .25rem;
        color: ${({theme})=>theme.color.default};
        font-weight: 400;
      }
      
    }

    .l-activity-time{
      svg{
        height: 1rem;
        height: 1rem;
      }
    }
    

    .o-activity-introduction{
      margin-top: .75rem;
      line-height: 1.25rem;
      color: ${({theme})=> theme.color.black};
    }
    
    .l-activity-application{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 1rem;

      .o-activity-deadline{
        margin-top: .75rem;
        justify-self: center;
        text-align: center;
        letter-spacing: .1rem;
        color: ${({theme})=>theme.color.default};
        font-weight: 400;
      }
    }
  }
  @media screen and (min-width: 480px) {
    .l-activity-header .o-activity__like{
      padding: .25rem .75rem;
      
      label::after{
        content:"收藏活動";
        margin-left: .125rem;
        font-size: .8rem;
        color: ${({theme})=>theme.color.alert};
      }

      &:has(input:checked){
        label::after{
          content:"已收藏";
          color: white;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;

    .l-web-container__main{

      .l-activity-body{
        margin-top: 0;

        .o-activity-cover{
          width: 100%;
          position: static;
        }
      }
    }
  } 
`

export default StyledActivityPage