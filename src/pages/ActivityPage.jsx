import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import StyledButton from "components/StyledButton"
import StyledUserInfo from "components/StyledUserInfo"
import StyledHikingTable from "components/StyledHikingTable"
import StyledResidenceAndTransportationTable from "components/StyledResidenceAndTransportationTable"
import StyledOthersTable from "components/StyledOthersTable"
import StyledActivityBasicInfo from "components/StyledActivityBasicInfo"
import StyledActivityHistory from "components/StyledActivityHistory"

import {ReactComponent as ReturnIcon} from "assets/icons/ReturnIcon.svg"
import {ReactComponent as LocationIcon} from "assets/icons/LocationIcon.svg"
import {ReactComponent as CalendarIcon} from "assets/icons/CalendarIcon.svg"
import {ReactComponent as ChatIcon} from "assets/icons/ChatIcon.svg"
import { Outlet } from "react-router-dom"

const activity = {
  name: "麟趾-鹿林山健行",
  type: "hiking",
  location: "南投縣信義鄉",
  time: ["2023-07-22T08:00","2023-07-22T13:00"],
  deadline: "2023-07-22T08:00",
}

const detail = {
  departurePoint: "上東埔登山口",
  trackType: "backtrack",
  trackLength: "11",
  altitude: [1000, 1500],
  trackCondition: "柏油路、原始山徑、石階、木棧道",
  belongingPark: "玉山國家公園",
  applicationNeeded: "unNeeded",
  trackIntroduction: "信義路五段150巷22弄→(0.05K,2分鐘)→靈雲宮→(0.5K,35分鐘)→六巨石→(0.1K, 8分鐘)→逸賢亭(象山頂)→(0.25K, 10分鐘)→打印台→(0.6K, 35分鐘)→永春崗公園",
  trackImage: "https://farm4.static.flickr.com/3616/3368789043_3f745faa30_b.jpg"
}

const residenceAndTransportation = {
  outbound:"1.國道三號名間交流道→台16→水里→台21→信義→和社→塔塔加遊客中心→台18線108.7K上東埔停車場。2.國道三號中埔交流道→台18→阿里山→台18線108.7K上東埔停車場。",
  inbound:"1.嘉義出發：嘉義市搭乘嘉義縣公車至阿里山後，再雇車至塔塔加遊憩區，或於阿里山森林遊樂區內搭乘員林客運「6739日月潭─阿里山線」，於塔塔加遊憩區「上東埔」站下車，步行即達登山口。2.南投出發：搭乘員林客運「6739日月潭─阿里山線」，於「塔塔加遊客中心」下車，改由塔塔加遊客中心旁步道進入。或於「上東埔」站下車，步行即達登山口。"
}



const ActivityPage = ({ className }) => {
  const [attendance, setAttendance] = useState(true)
  const expired = false
  const [btnContent, setBtnContent] = useState("報名")
  const [ActiveTable, setActiveTable] = useState("detail")
  const environmentParams = useSelector((state) => state.environment)
  const isMediumLayout = environmentParams.windowSize === "medium" || environmentParams.windowSize === "large"
  

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

  const handleAttendClick = () => {
    setAttendance(!attendance)
  }

  return(
      <div className={className}>
        <div className="l-web-container__main l-activity">
          <div className="l-activity-header">
            <ReturnIcon className="o-activity-header__return" onClick={handleReturn}/>
            <StyledUserInfo/>
          </div>
          <div className="l-activity-body">
            <img className="o-activity-cover" src="https://www.ysnp.gov.tw/UploadPlugin?file=i%2BifzMiqxoOGxT%2FVr25SKzsDjCs7OItEOJlnGmQ4RxicJgsIU04Z4eAK80tRn%2FwR6XmMRuJgAVD2G9JaZXVLDA%3D%3D" alt="activity-cover" />
            <h2 className="o-activity-title">{activity.name} <span className="o-activity-title__update-time">( 最後更新於: 2023/07/18 23:00 )</span> </h2>
            <div className="l-activity-location">
              <LocationIcon /><h3>{activity.location}</h3>
            </div>
            <div className="l-activity-time">
              <CalendarIcon /><h3>2023.07.01 08:00 - 2023.07.02 18:00</h3>
            </div>

            <p className="o-activity-introduction">快來參加我們的登山活動！一起征服麟趾山和鹿林山的壯麗峰巒吧！無論你是新手還是經驗豐富的登山者，都歡迎加入我們的隊伍。盡情享受大自然的美景，與同好們一同挑戰極限！</p>

            <div className="l-activity-application">
              <StyledButton outlined={!attendance} disabled={expired} onClick={handleAttendClick} >{ btnContent }</StyledButton>
              <h4 className="o-activity-deadline">- 申請截止日：2023年06月24日 (六) 23:59 -</h4>
            </div>

            <StyledActivityBasicInfo className="l-activity-basics"/>
            
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
                {ActiveTable === "detail" && <StyledHikingTable className="o-activity-detail-table" formContent={detail}/>}
                {ActiveTable === "residence-transportation" && <StyledResidenceAndTransportationTable className="o-activity-residence-and-transportation-table" formContent={residenceAndTransportation}/>}
                {ActiveTable === "others" && <StyledOthersTable isMediumLayout={isMediumLayout}/>}
              </div> 
            </div>
          </div>
          
          <StyledActivityHistory />

        </div>

        <div className="l-web-container__side">
          <div className="c-activity-discussion__icon">
            <input type="checkbox" id="activity-discussion"/>
            <label htmlFor="activity-discussion"><ChatIcon  /></label>
          </div>
          <div className="l-activity-discussion">
            <Outlet />
          </div>
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
    height: 3.5rem;
    
    .o-activity-header__return{
      height: 1.5rem;
      margin-right: 1rem;
      fill: ${({theme})=>theme.color.default};
      cursor: pointer;
    }
  }

  .o-activity-cover{
    position: absolute;
    top: 3.5rem;
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
    
    .l-activity-time, .l-activity-location, .o-activity-deadline{
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
      }
    }
  }

  .c-activity-discussion__icon{
    position: fixed;
    bottom: 2.5rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=> theme.color.default};
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
    z-index: 1;
    

    input{
      display: none;
    }

    svg{
      fill: white;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }

    &:has(input:checked){
      display: none;

      & ~ .l-activity-discussion{
        display: flex;
        flex-direction: column;
      }
    }

  }

  .l-activity-discussion{
    display: none;
    position: fixed;
    top: 4rem;
    left: 0;
    bottom: 0;
    right: 0; 
    margin-bottom: 3rem;
    background-color: rgb(255,255,255,0.9);
    width: 100%;
    height: calc(100vh - 4rem) ;
    padding: 1rem 1rem 3rem;
    z-index: 1;
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
        .c-activity-discussion__icon{
          display: none;
        }

        .l-activity-discussion{
          padding: 0;
          display: block;
          position: static;

          height: calc(100vh - 10rem);
        }
      }



  } 
`

export default StyledActivityPage