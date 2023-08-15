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
  const user = useSelector(state=>state.user)
  const userId = user.uid
  const selectedActivityId = useParams().id
  const defaultImageURL = require('data/defaultImageURL.json')

  const [selectedActivity, setSelectedActivity] = useState({})
  const [userAttendance, setUserAttendance] = useState(false)
  const [expired, setExpired] = useState(false)
  const [btnContent, setBtnContent] = useState("報名")
  const [isActivityUpdateModalOpen, setIsActivityUpdateModalOpen] = useState(false)

  useEffect(()=>{
    const getSelectedActivity = async() => {
      const activity = await getActivity(selectedActivityId)
      setSelectedActivity(activity)
    }
    getSelectedActivity()
  },[selectedActivityId])

  useEffect(()=>{
    const now = new Date()
    setExpired(Date.parse(now) > selectedActivity?.deadline)
    setUserAttendance(selectedActivity?.attendance?.includes(userId))
  },[selectedActivity, selectedActivity?.deadline, selectedActivity?.attendance, userId])

  useEffect(() => {
    if((expired && userAttendance) || (!expired && userAttendance)){
      setBtnContent("報名成功")
    }else if(expired && !userAttendance){
      setBtnContent("報名截止")
    }else {
      setBtnContent("報名")
    }
    //更新活動資訊
  },[expired,userAttendance])

  const handleReturn = () => {
    window.history.back()
  }

  const handleAttendClick = async() => {
    try{
      if(expired) return
      
      await alterActivityAttendance(userId, selectedActivityId)
      setUserAttendance(!userAttendance)

      if(!userAttendance){
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

    }catch(error){
      console.error(error)
    }
  }

  const handleActivityUpdate = () => {
    setIsActivityUpdateModalOpen(true)
  }

  return(
      <div className={className}>
        <div className="l-web-container__main l-activity">
          <div className="l-activity-header">
            <ReturnIcon className="o-activity-header__return" onClick={handleReturn}/>
            <StyledUserInfo user={selectedActivity?.holder}/>
          </div>
          <div className="l-activity-body">
            <img className="o-activity-cover" src={selectedActivity?.coverURL || defaultImageURL.activityCover} alt="activity-cover" />
              <h2 className="o-activity-title">{selectedActivity?.name}
              <span className="o-activity-title__update-time">( 最後更新於: {transferTimestamp(selectedActivity?.updateAt)|| transferTimestamp(selectedActivity?.createAt)} )</span>
            </h2>
            <div className="l-activity-location">
              <LocationIcon /><h3>{displayLocation(selectedActivity?.location)}</h3>
            </div>
            <div className="l-activity-time">
              <CalendarIcon /><h3>{transferTimestamp(selectedActivity?.time?.[0])} - {transferTimestamp(selectedActivity?.time?.[1])}</h3>
            </div>

            <p className="o-activity-introduction">{selectedActivity?.introduction}</p>

            <div className="l-activity-application">
              {selectedActivity?.holder?.uid === userId ? 
                <>
                  <StyledButton outlined disabled={expired} onClick={handleActivityUpdate} >更新活動</StyledButton>
                  <StyledActivityUpdateModal
                    selectedActivityId={selectedActivityId}
                    currentActivity={selectedActivity}
                    refreshActivity={setSelectedActivity}
                    isActivityUpdateModalOpen={isActivityUpdateModalOpen}  
                    setIsActivityUpdateModalOpen={setIsActivityUpdateModalOpen}
                  />  
                </>

                :<StyledButton outlined={!userAttendance} disabled={expired} onClick={handleAttendClick} >{ btnContent }</StyledButton>
              }
              
              <h4 className="o-activity-deadline">- 報名截止日: {transferTimestamp(selectedActivity?.deadline, "yyyy年MM月dd日 HH:mm")} -</h4>
            </div>

            <StyledActivityBasicInfo 
              className="l-activity-basics" 
              activityContent={{
                difficulty: selectedActivity?.difficulty,
                activityTimeLength: selectedActivity?.activityTimeLength,
                cost: selectedActivity?.cost,
                attendance: selectedActivity?.attendance,
                attendanceLimit: selectedActivity?.attendanceLimit
              }}
            />
            
            <StyledActivityTables 
              selectedActivity={selectedActivity}
            />
            
          </div>
          
          <StyledActivityHistory />

        </div>

        <div className="l-web-container__side">
          {
            selectedActivity?.attendance && 
            <StyledActivityAttendance 
              holder={selectedActivity?.holder}
              attendance={selectedActivity?.attendance}
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