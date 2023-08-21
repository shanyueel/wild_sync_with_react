import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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

import { alterActivityAttendance, getActivity } from "api/activityApi"
import { transferTimestamp } from "utils/date-fns"
import { displayLocation } from "utils/location"

import {ReactComponent as ReturnIcon} from "assets/icons/ReturnIcon.svg"
import {ReactComponent as LocationIcon} from "assets/icons/LocationIcon.svg"
import {ReactComponent as CalendarIcon} from "assets/icons/CalendarIcon.svg"


const ActivityPage = ({ className }) => {
  const user = useSelector(state => state.user)
  const environmentParams = useSelector(state => state.environment)
  const userId = user.uid
  const windowSize = environmentParams.windowSize
  const activityId = useParams().activityId
  const defaultImageURL = require('data/defaultImageURL.json')
  const [isLargeLayout, setIsLargeLayout] = useState(false)
  const [isMediumLayout, setIsMediumLayout] = useState(false)
  const [activity, setActivity] = useState({})
  const [userAttendance, setUserAttendance] = useState(false)
  const [isAttendanceExpired, setIsAttendanceExpired] = useState(false)
  const [isAttendanceFull, setIsAttendanceFull] = useState(false)
  const [btnContent, setBtnContent] = useState("報名")
  const [isActivityUpdateModalOpen, setIsActivityUpdateModalOpen] = useState(false)

  useEffect(()=>{
    const setWindowSize = () => {
      setIsLargeLayout(windowSize === "large")
      setIsMediumLayout(windowSize === "medium" || windowSize === "large")
    }
    setWindowSize()
  },[windowSize])

  useEffect(()=>{
    const setCurrentActivity = async() => {
      const activity = await getActivity(activityId)
      setActivity(activity)
    }
    setCurrentActivity()
  },[activityId])

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

  const handleReturn = () => {
    window.history.back()
  }

  const handleAttendClick = async() => {
    if(isAttendanceExpired || (isAttendanceFull && !userAttendance)) return
    
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
      }
      
    }
  }

  const handleActivityUpdate = () => {
    setIsActivityUpdateModalOpen(true)
    document.querySelector('body').classList.add('no-scroll');
    document.querySelector('html').classList.add('no-scroll');
  }

  return(
      <div className={className}>
        <div className="l-web-container__main l-activity">
          <div className="l-activity-header">
            <ReturnIcon className="o-activity-header__return" onClick={handleReturn}/>
            <StyledUserInfo user={activity?.holder}/>
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
              <CalendarIcon /><h3>{transferTimestamp(activity?.time?.[0])} - {transferTimestamp(activity?.time?.[1])}</h3>
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
          { activity && <StyledActivityAttendance holder={activity?.holder} attendance={activity?.attendance} isLargeLayout={isLargeLayout}/> }
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