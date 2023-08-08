import { useEffect, useState } from "react"
import styled from "styled-components"

import StyledButton from "components/StyledButton"
import StyledUserInfo from "components/StyledUserInfo"
import StyledHikingTable from "components/StyledHikingTable"
import StyledTransportationTable from "components/StyledTransportationTable"
import StyledAccommodationTable from "components/StyledAccommodationTable"
import StyledOthersTable from "components/StyledOthersTable"
import StyledActivityBasicInfo from "components/StyledActivityBasicInfo"
import StyledActivityHistory from "components/StyledActivityHistory"

import {ReactComponent as ReturnIcon} from "assets/icons/ReturnIcon.svg"
import {ReactComponent as LocationIcon} from "assets/icons/LocationIcon.svg"
import {ReactComponent as CalendarIcon} from "assets/icons/CalendarIcon.svg"
import { useParams } from "react-router-dom"
import { alterActivityAttendance, getActivity } from "api/activityApi"
import { useSelector } from "react-redux"
import StyledActivityUpdateModal from "modals/StyledActivityUpdateModal"
import { transferTimestamp } from "utils/date-fns"
import { toast } from "react-toastify"
import ActivityPageAttendanceArea from "./ActivityPageAttendanceArea"

const ActivityPage = ({ className }) => {
  const user = useSelector(state=>state.user)
  const userId = user.uid
  const selectedActivityId = useParams().id
  const [attendance, setAttendance] = useState(false)
  const [expired, setExpired] = useState(false)
  const [btnContent, setBtnContent] = useState("報名")
  const [ActiveTable, setActiveTable] = useState("detail")
  const [selectedActivity, setSelectedActivity] = useState({})
  const [isActivityUpdateModalOpen, setIsActivityUpdateModalOpen] = useState(false)

  useEffect(()=>{
    const now = new Date()
    const getSelectedActivity = async() => {
      const activity = await getActivity(selectedActivityId)
      setSelectedActivity(activity)
    }
    getSelectedActivity()
    setExpired(Date.parse(now) > selectedActivity?.deadline)
    setAttendance(selectedActivity?.attendance?.includes(userId))
  },[selectedActivityId, selectedActivity?.deadline])

  useEffect(() => {
    if((expired && attendance) || (!expired && attendance)){
      setBtnContent("報名成功")
    }else if(expired && !attendance){
      setBtnContent("報名截止")
    }else {
      setBtnContent("報名")
    }
    //更新活動資訊
  },[expired,attendance])

  const handleReturn = () => {
    window.history.back()
  }
  
  const handleTableNavbarClick = (e) => {
    if(e.target.matches('#activity-detail')){
      setActiveTable("detail")
    }
    if(e.target.matches('#activity-residence-and-transportation')){
      setActiveTable("residence-transportation")
    }
    if(e.target.matches('#activity-others')){
      setActiveTable("others")
    }
  }

  const handleAttendClick = async() => {
    try{
      await alterActivityAttendance(userId, selectedActivityId)
      setAttendance(!attendance)

      if(!attendance){
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
            <img className="o-activity-cover" src={selectedActivity?.coverURL} alt="activity-cover" />
            <h2 className="o-activity-title">{selectedActivity?.name} <span className="o-activity-title__update-time">( 最後更新於: 2023/07/18 23:00 )</span> </h2>
            <div className="l-activity-location">
              <LocationIcon /><h3>{selectedActivity?.location}</h3>
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

                :<StyledButton outlined={!attendance} disabled={expired} onClick={handleAttendClick} >{ btnContent }</StyledButton>
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
            
            <div className="l-activity-tables">
              <div className="c-activity-tables__navbar" onClick={handleTableNavbarClick} >
                <label htmlFor="activity-detail" className="c-activity-tables__nav-item">
                  <input name="activity-tables__navbar" id="activity-detail" type="radio" defaultChecked/>活動細節
                </label>
                <label htmlFor="activity-residence-and-transportation" className="c-activity-tables__nav-item">
                  <input name="activity-tables__navbar" id="activity-residence-and-transportation" type="radio"/>交通 / 住宿
                </label>
                <label htmlFor="activity-others" className="c-activity-tables__nav-item">
                  <input name="activity-tables__navbar" id="activity-others" type="radio"/>行程 & 其他
                </label>
              </div>
              <div className="l-activity-tables__container">
                {ActiveTable === "detail" && <StyledHikingTable className="o-activity-detail-table" detailContent={selectedActivity?.detail}/>}
                {ActiveTable === "residence-transportation" && 
                  <div className="o-activity-residence-and-transportation-table">
                    <StyledTransportationTable transportationContent={selectedActivity?.transportation}/>
                    <div className="l-activity-create__accommodation">
                      {selectedActivity?.accommodation?.map((accommodationContent)=>{
                        return(
                          <StyledAccommodationTable
                            key={accommodationContent.id}
                            accommodationId={accommodationContent.id}
                            accommodationList={selectedActivity?.accommodation}
                            onAccommodationListChange={()=>{}}
                          />
                        )
                      })}
                    </div>
                  </div>
                  }
                {ActiveTable === "others" && <StyledOthersTable detailContent={selectedActivity?.detail}/>}
              </div> 
            </div>
          </div>
          
          <StyledActivityHistory />

        </div>

        <div className="l-web-container__side">
          <ActivityPageAttendanceArea 
            holder={selectedActivity?.holder}
            attendance={selectedActivity?.attendance}
          />
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
    
    .l-activity-tables{
      margin: 2rem auto;

      .c-activity-tables__navbar{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: .5rem;
        margin-bottom: .5rem;

        .c-activity-tables__nav-item{
          position: relative;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
          border-radius: .25rem .25rem 0 0;
          color: ${({theme})=> theme.color.default};
          background-color: ${({theme})=> theme.backgroundColor.default};
          cursor: pointer;

          input{
            display: none;
          }

          label{

          }

          &:has(input:checked){
            background-color: ${({theme})=> theme.color.default};
              color: white;            

            &::after{
              position: absolute;
              content:"";
              background-color: ${({theme})=> theme.color.default};
              width: 100%;
              height: 1rem;
              top: 2.75rem;
              left: 0;
              right: 0;
            }
          }
        }
      }

      .l-activity-tables__container{
        padding: 1.5rem 1rem;
        background-color: ${({theme})=>theme.color.default};
        border-radius: 0 0 .25rem .25rem;

        .o-activity-residence-and-transportation-table{
          display: flex;
          flex-direction: column;
          gap: 1rem;
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

      .l-web-container__side{
        
      }



  } 
`

export default StyledActivityPage