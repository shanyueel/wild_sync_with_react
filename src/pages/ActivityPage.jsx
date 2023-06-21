import { useEffect, useState } from "react"
import styled from "styled-components"

import StyledButton from "components/StyledButton"
import StyledUserInfo from "components/StyledUserInfo"
import StyledActivityTable from "components/StyledActivityTable"
import StyledResidenceAndTransportationTable from "components/StyledResidenceAndTransportationTable"
import StyledOthersTable from "components/StyledOthersTable"
import StyledMessageCard from "components/StyledMessageCard"
import StyledMessageReply from "components/StyledMessageReply"
import StyledActivityBasicInfo from "components/StyledActivityBasicInfo"
import StyledActivityHistory from "components/StyledActivityHistory"

import {ReactComponent as ReturnIcon} from "assets/icons/ReturnIcon.svg"
import {ReactComponent as LocationIcon} from "assets/icons/LocationIcon.svg"
import {ReactComponent as ClockIcon} from "assets/icons/ClockIcon.svg"
import {ReactComponent as FlameIcon} from "assets/icons/FlameIcon.svg"
import {ReactComponent as ParticipationIcon} from "assets/icons/ParticipationIcon.svg"

const ActivityPage = ({ className }) => {
  const [isLargeLayout, setIsLargeLayout] = useState(false)
  const [isMediumLayout, setIsMediumLayout] = useState(false)

  const [ActiveTable, setActiveTable] = useState("detail")
  
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

  useEffect(()=>{
    const handleResize = () => {
      setIsLargeLayout( window.innerWidth >= 1024 )
      setIsMediumLayout( window.innerWidth >= 768 )
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () =>{
      window.removeEventListener('resize', handleResize)
    }
  },[isLargeLayout,isMediumLayout])


  return(
      <div className={className}>
        <div className="l-web-container__main l-activity">
          <div className="l-activity-header">
            <ReturnIcon className="o-activity-header__return"/>
            <StyledUserInfo detailed />
          </div>
          <div className="l-activity-body">
            <img className="o-activity-cover" src="https://www.ysnp.gov.tw/UploadPlugin?file=i%2BifzMiqxoOGxT%2FVr25SKzsDjCs7OItEOJlnGmQ4RxicJgsIU04Z4eAK80tRn%2FwR6XmMRuJgAVD2G9JaZXVLDA%3D%3D" alt="activity-cover" />
            <h2 className="o-activity-title">麟趾-鹿林山健行</h2>
            <div className="l-activity-location">
              <LocationIcon /><h3>南投縣信義鄉</h3>
            </div>
            <div className="l-activity-time">
              <ClockIcon /><h3>2023.07.01 08:00 - 2023.07.02 18:00</h3>
            </div>


            <div className="l-activity-stats">
              <div className="o-activity-stats__popularity">
                <FlameIcon className="o-activity-stats__icon"/><h4 className="o-activity-stats__detail">瀏覽次數： 53次</h4>
              </div>
              <div className="o-activity-stats__participation">
                <ParticipationIcon className="o-activity-stats__icon"/><h4 className="o-activity-stats__detail">報名人數： 12人</h4>
              </div>
            </div>

            <div className="l-activity-application">
              <StyledButton title="報名"/>
              <h4 className="o-activity-deadline">- 申請截止日：2023年06月24日 (六) 23:59 -</h4>
            </div>

            <StyledActivityBasicInfo className="l-activity-basics"/>
            
            <div className="l-activity-tables">
              <div className="c-activity-tables__navbar" onClick={handleTableNavbarClick} >
                <div className="c-activity-tables__nav-item">
                  <input name="activity-tables__navbar" id="activity-detail" type="radio" defaultChecked/>
                  <label htmlFor="activity-detail">路徑資訊</label>
                </div>
                <div className="c-activity-tables__nav-item">
                  <input name="activity-tables__navbar" id="activity-residence-and-transportation" type="radio"/>
                  <label htmlFor="activity-residence-and-transportation">交通 / 住宿</label>
                </div>
                <div className="c-activity-tables__nav-item">
                  <input name="activity-tables__navbar" id="activity-others" type="radio"/>
                  <label htmlFor="activity-others">行程 & 其他</label>
                </div>
              </div>
              <div className="l-activity-tables__container">
                {ActiveTable === "detail" && <StyledActivityTable className="o-activity-detail-table" isMediumLayout={isMediumLayout}/>}
                {ActiveTable === "residence-transportation" && <StyledResidenceAndTransportationTable className="o-activity-residence-and-transportation-table" isMediumLayout={isMediumLayout}/>}
                {ActiveTable === "others" && <StyledOthersTable isMediumLayout={isMediumLayout}/>}
              </div> 
            </div>
          </div>

          <div className="l-activity-discussion">
            <h2 className="o-activity-discussion__title">留言</h2>
            <div className="c-activity-discussion__body">
              <StyledMessageCard />
              <StyledMessageCard />
            </div>
            <hr />
            <StyledMessageReply className="o-activity-discussion__reply-input"/>
          </div>


        </div>

        <div className="l-web-container__side">
          <StyledActivityHistory />
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

    .l-activity-stats{
      display: flex;
      gap: 1.25rem;
      margin: .75rem 0 ;

      .o-activity-stats__popularity, .o-activity-stats__participation{
        display: flex;

        svg{
          height: 1.125rem;
          width: 1.125rem;
          margin-right: .375rem;
          fill: ${({theme})=>theme.color.default};
        }

        .o-activity-stats__detail{
          font-size: 0.875rem;
          color: ${({theme})=>theme.color.default};
        }
      }
    }
    
    .l-activity-application{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 1.5rem;

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
          background-color: ${({theme})=> theme.backgroundColor.default};
          font-size: 1rem;
          font-weight: 700;
          border-radius: .25rem .25rem 0 0;

          input{
            display: none;
          }

          label{
            color: ${({theme})=> theme.color.default};
            cursor: pointer;
          }

          &:has(input:checked){
            background-color: ${({theme})=> theme.color.default};
            
            label{
              color: white;
            }

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
        padding: 1.5rem 2rem;
        background-color: ${({theme})=>theme.color.default};
        border-radius: 0 0 .25rem .25rem;
      }
    }
  }

  

  .l-activity-discussion{
    margin-bottom: 3rem;

    .o-activity-discussion__title{
      color: ${({theme})=> theme.color.default};
      font-weight: 700;
    }
    
    .c-activity-discussion__body{
      display: flex;
      flex-direction: column;
      gap: .75rem;
      margin-top: 1rem;
    }
    
    hr{
      margin: .75rem 0;
    }

    .c-activity-discussion__reply-input{
      position: relative;
      
      &::before{
        content: "";
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: red;
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

        .l-activity-history__body{
          width: 100%;
          height: fit-content;
          overflow-x: hidden;
          margin-bottom: 0;
          padding-bottom: 0;

          .c-activity-history__cards{
            width: 100%;
            flex-direction: column;

            .o-activity-history__card{
              height: 10rem;
              width: 100%;

              .l-activity-card__info{
                width: 100%;
              }
            }
          }
        }
      }
  } 
`

export default StyledActivityPage