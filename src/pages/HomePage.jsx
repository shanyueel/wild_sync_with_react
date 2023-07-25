import styled from "styled-components"

import StyledImageSlider from "components/StyledImageSlider"
import StyledVerticalActivityCard from "components/StyledVerticalActivityCard"
import StyledHorizontalActivityCard from "components/StyledHorizontalActivityCard"
import StyledCalendarSele from "components/inputs/StyledCalendarSelector"
import StyledButton from "components/StyledButton"
import StyledPagination from "components/StyledPagination"
import { Link } from "react-router-dom"

import {ReactComponent as GridIcon} from "assets/icons/GridIcon.svg"
import {ReactComponent as ListIcon} from "assets/icons/ListIcon.svg"
import { useState } from "react"



const HomePage = ({className}) => {
  const [activitiesDisplay, setActivityDisplay] = useState("grid")

  const onDisplayClicked = (e) => {
    if(e.target.id === "activities-grid-display") setActivityDisplay("grid")
    if(e.target.id === "activities-list-display") setActivityDisplay("list")
  }

  const sliderImage = [
    {
      title: "picture1",
      image: "https://dsgmedia.blob.core.windows.net/pub/2020/03/10-Best-Outdoor-Activities-to-do-with-Kids2.jpg",
    },
    {
      title: "picture2",
      image: "https://dsgmedia.blob.core.windows.net/pub/2020/03/10-Best-Outdoor-Activities-to-https://www.verywellfamily.com/thmb/WdsWDcwj9Iuh86Ev8jLiWqa0m0o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Familyhike-5075e31a9cb24a2fa35fa22e39adc7c6.jpgdo-with-Kids2.jpg",
    },
    {
      title: "picture3",
      image: "https://wildernessredefined.com/wp-content/uploads/2022/06/different-types-of-tents-set-up-for-camping.jpg",
    }
  ]
  
  const popularPlaces = [
    {
      id: "NTC",
      title: "南投縣",
      image: "https://s.yimg.com/ny/api/res/1.2/WJG407_51l31TqvWfGxBGg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNQ--/https://s.yimg.com/os/creatr-uploaded-images/2021-05/8c9fdf90-bc2d-11eb-be7f-12f267e28102",
    },
    {
      id: "HSZ",
      title: "新竹縣",
      image: "https://recreation.forest.gov.tw/Files/RT/Photo/027/05/%E5%A4%A7%E9%9C%B85.jpg",
    },
    {
      id: "ILA",
      title: "宜蘭縣",
      image: "https://www.lookit.tw/upload/RB/tK0/37065eb6713a4cc596c35ce9d867c63f.jpg",
    },
    {
      id: "HUN",
      title: "花蓮縣",
      image: "https://www.eastcoast-nsa.gov.tw/content/images/static/water-active-05.jpg",
    },
    {
      id: "TTT",
      title: "台東縣",
      image: "https://owlting-blog-media.s3.ap-northeast-1.amazonaws.com/wp-content/uploads/2020/10/06095120/shutterstock_1428104768.jpg",
    },
    {
      id: "PIF",
      title: "屏東縣",
      image: "https://margaret.tw/webp/wp-content/uploads/nEO_IMG_DSC08152-4.jpg.webp",
    }
  ]

  const activitiesTypes = [
    {
      id: "hiking-type",
      title: "登山"
    },
    {
      id: "camping-type",
      title: "露營"
    },
    {
      id: "cycling-type",
      title: "單車"
    },
    {
      id: "diving-type",
      title: "潛水"
    },
    {
      id: "others-type",
      title: "其他"
    }
  ]

  const activitiesAreas = [
    {
      id: "KEL",
      title: "基隆"
    },
    {
      id: "TPE",
      title: "台北"
    },
    {
      id: "NTPC",
      title: "新北"
    },
    {
      id: "TYN",
      title: "桃園"
    },
    {
      id: "HSZ",
      title: "新竹"
    },
    {
      id: "ZMI",
      title: "苗栗"
    },
    {
      id: "TXG",
      title: "台中"
    },
    {
      id: "CHW",
      title: "彰化"
    },
    {
      id: "NTC",
      title: "南投"
    },
    {
      id: "YUN",
      title: "雲林"
    },
    {
      id: "CYI",
      title: "嘉義"
    },
    {
      id: "TNN",
      title: "台南"
    },
    {
      id: "KHH",
      title: "高雄"
    },
    {
      id: "PIF",
      title: "屏東"
    },
    {
      id: "ILA",
      title: "宜蘭"
    },
    {
      id: "HUN",
      title: "花蓮"
    },
    {
      id: "TTT",
      title: "台東"
    },
    {
      id: "PEH",
      title: "澎湖"
    },
    {
      id: "GNI",
      title: "綠島"
    },
    {
      id: "KYD",
      title: "蘭嶼"
    },
    {
      id: "KNH",
      title: "金門"
    },
    {
      id: "MFK",
      title: "馬祖"
    },
  ]

  return(
      <div className={className} >
        <StyledImageSlider sliderImages={sliderImage}/>

        <div className="l-popular-places">
          <h1 className="o-popular-places__title">熱門活動地點</h1>
          <div className="l-popular-places__container">
            {popularPlaces.map((popularPlace)=>{ 
              return(
                <Link to="/activity/search" className="c-popular-place" key={popularPlace.id}>
                  <img className="o-popular-place__circle" src={popularPlace.image} alt={popularPlace.title} />
                  <h2 className="o-popular-place__name">{popularPlace.title}</h2>
                </Link>
              )})}
          </div>
        </div>
        
        <div className="l-activities">
          <h1 className="o-activities__title">活動列表</h1>
          <ul className="c-activities__types-options">
            <li className="o-activities__type"><input type="radio" name="activities-type" id="all-type" defaultChecked />
            <label htmlFor="all-type">不限</label></li>
            {activitiesTypes.map((activitiesType)=>{
              return(
                <li className="o-activities__type" key={activitiesType.id}>
                  <input type="radio" name="activities-type" id={activitiesType.id}/>
                  <label htmlFor={activitiesType.id}>{activitiesType.title}</label>
                </li>
              )
            })}
          </ul>

          <div className="l-activities-settings">         

            <div className="l-activities-filters">
              <input id="o-activities-filter__checkbox" type="checkbox"/>
              <label htmlFor="o-activities-filter__checkbox" >▼ 篩選器</label>
              <div className="l-activities-filters__modal">
                <div className="c-activities-filters__order">
                  <h3 className="o-activities-filters__title">排序依據</h3>
                  <select className="c-activities-filters__selector">
                    <option>最新發布</option>
                    <option>即將開始</option>
                    <option>熱門聚會</option>
                  </select>
                </div>

                <div className="c-activities-filters__area">
                  <h3 className="o-activities-filters__title">活動位置</h3>
                  <ul className="c-activities-filters__checkbox-list">
                    { activitiesAreas.map((activitiesArea)=>{
                      return(
                      <li className="c-activities-checkbox-item" key={activitiesArea.id}>
                        <input type="checkbox" className="o-activities-checkbox" name="activities-area" id={`${activitiesArea.id}-area`} />
                        <label htmlFor={`${activitiesArea.id}-area`}>{activitiesArea.title}</label>
                      </li>
                      )
                    }) }
                  </ul>
                </div>

                <div className="c-activities-filters__date">
                  <h3 className="o-activities-filters__title">活動日期</h3>
                  <StyledCalendarSele />
                </div>

                <div className="c-activities-filters__length">
                  <h3 className="o-activities-filters__title">活動時長</h3>
                  <ul className="c-activities-filters__checkbox-list">
                    <li className="c-activities-checkbox-item">
                    <input name="activities-length" type="checkbox" id="hours" /><label htmlFor="hours">短時</label>
                    </li>
                    <li className="c-activities-checkbox-item">
                      <input name="activities-length" type="checkbox" id="half-day" /><label htmlFor="half-day">半天</label>
                    </li>
                    <li className="c-activities-checkbox-item">
                      <input name="activities-length" type="checkbox" id="all-day" /><label htmlFor="all-day">全天</label>
                    </li>
                    <li className="c-activities-checkbox-item">
                      <input name="activities-length" type="checkbox" id="overnight" /><label htmlFor="overnight">多天數</label>
                    </li>
                  </ul>

                </div>

                <StyledButton className="o-activities-filters__button">篩選</StyledButton>

              </div>
            </div>

            <div className="c-activities-display">
              <h3 className="o-activities-display__title">顯示方式</h3>   
              <div className="c-activities-display__option">
                <input type="radio" name="activities-display" id="activities-grid-display" onClick={onDisplayClicked} defaultChecked/>
                <label htmlFor="activities-grid-display"><GridIcon/></label>
              </div>
              <div className="c-activities-display__option">
                <input type="radio" name="activities-display" id="activities-list-display" onClick={onDisplayClicked} />
                <label htmlFor="activities-list-display"><ListIcon/></label>
              </div>
            </div>

          </div>

          <div className="l-activities__container">
            {activitiesDisplay === "grid" &&
              <div className="l-activities__container--grid">
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                <StyledVerticalActivityCard className="c-activities__card"/>
                {/* <i></i><i></i><i></i><i></i><i></i>                 */}
              </div>
            }

            {activitiesDisplay === "list" &&
              <div className="l-activities__container--list">
                <StyledHorizontalActivityCard />
                <StyledHorizontalActivityCard />
                <StyledHorizontalActivityCard />
                <StyledHorizontalActivityCard />
                <StyledHorizontalActivityCard />
                <StyledHorizontalActivityCard />
                <StyledHorizontalActivityCard />
                <StyledHorizontalActivityCard />                
              </div>
            }

          </div>
          
          <StyledPagination className="c-activities__pagination"/>

        </div>
      </div>
    )
}

const StyledHomePage = styled(HomePage)`
  .l-popular-places{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 24rem;

    .o-popular-places__title{
      margin-bottom: 2.5rem;
      font-weight: 700;
      color: ${({theme})=> theme.color.default}
    }

    .l-popular-places__container{
        display: grid;
        grid-template-columns: repeat(2,100px);
        grid-template-rows: repeat(3,140px);
        grid-gap: 2.5rem 5rem;

      .c-popular-place{
        display: flex;
        flex-direction: column;
        align-items: center;

        .o-popular-place__circle{
          width: 6.25rem;
          height: 6.25rem;
          border-radius: 50%;
          background-color: ${({theme})=>theme.color.default};
          cursor: pointer;
        }

        .o-popular-place__name{
          margin-top: 1rem;
          font-weight: 700;
        }
      }
    }
  }

  .l-activities{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:2.5rem;
    margin-bottom: 5rem;
    border-top: 2px solid ${({theme})=> theme.backgroundColor.default};
    width: 100%;
    
    .o-activities__title{
      color: ${({theme})=>theme.color.default};
      margin-top: 2rem;
    }

    .c-activities__types-options{
      display: flex;
      justify-content: space-around;
      margin: 1rem 0;
      padding: .25rem;
      font-size: 1rem;
      line-height: 2rem;
      border-bottom: 1.25px solid ${({theme})=> theme.backgroundColor.default};

      .o-activities__type{
        input{
          display: none;
        }

        label{
          width: fit-content;
          text-align: center;
          cursor: pointer;
          padding: 0 .5rem;
        }

        &:has(input:checked){
          label{
            border-radius: 1rem;
            color: white;
            background-color: ${({theme}) => theme.color.default};
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
      }
    }

    .l-activities-settings{
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      height: 1.5rem;

      .l-activities-filters{
        #o-activities-filter__checkbox{
          display: none;

          +label{
            color: ${({theme})=>theme.color.default};
            font-weight: 700;
            cursor: pointer;
          }

          &:checked ~ .l-activities-filters__modal{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }

        .l-activities-filters__modal{
          position: absolute;
          left:0;
          top:-1;
          display: none;
          width: 100%;
          max-width: 432px;
          margin-top: 1rem;
          background-color: ${({theme})=>theme.backgroundColor.default};
          padding: 1.5rem 1rem;
          border-radius: .5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
          z-index: 1;
          
          .c-activities-filters{
            &__area,
            &__date,
            &__length,
            &__order{
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-bottom: 1.25rem ;
              width: 100%;

              .o-activities-filters__title{
                color: ${({theme})=> theme.color.default};
                font-weight: 700;
                margin-bottom: .5rem;
              }

              select{
                width: 100%;
                text-align: center;
                height: 1.5rem;
                border-radius: .25rem;
                border: none;
                font-size: 1rem;
                font-weight: 700;
                color: ${({theme})=>theme.color.default};
              }

              .c-activities-filters__checkbox-list{
                display: grid;
                grid-template-columns: repeat(4,1fr);
                grid-auto-rows: 2rem;
                
                width: 100%;

                .c-activities-checkbox-item{
                  display: flex;
                  align-items: center;

                  label{
                    font-size: 1rem;
                    font-weight: 500;
                    margin-left: .25rem;
                  }
                }
              }
            }
          }
        }
      }

      .c-activities-display{
        display: flex;
        align-items: center;
        gap: .5rem;
        fill: ${({theme})=>theme.backgroundColor.secondary};
        
        .o-activities-display__title{
          padding-right: .5rem;
          margin-right: .5rem;
          border-right: 1px solid ${({theme}) => theme.color.default};
          font-weight: 700;
          color: ${({theme})=>theme.color.default}
        }

        .c-activities-display__option{
          input{
            display: none;
          }

          label{
            display: block;
            width: 1rem;
            height: 1rem;
            cursor: pointer;
          }

          &:has(input:checked){
            label{
              fill: ${({theme})=>theme.color.default};
            }
          }
        }
      }

    }

    .l-activities__container{
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      width: 90%;

      &--grid{
        display: grid;
        grid-template-columns: repeat(2, 9.5rem);
        grid-auto-rows: 18rem;
        width: fit-content;
        gap: 1.25rem;
        margin: 2rem auto 0;
      }

      &--list{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
    }

    .c-activities__pagination{
      margin-top: 2.5rem;
    }
  }


  @media screen and (min-width: 480px) {
    .l-activities .l-activities__container--grid{
      grid-template-columns: repeat(2, 12rem);
      grid-auto-rows: 21rem;
    }
  }

  @media screen and (min-width:718px) {
    .l-activities .l-activities__container--grid{
      grid-template-columns: repeat(3, 12rem);
    }
  }

  @media screen and (min-width: 768px) {
    .l-popular-places{
      margin-top: 28rem;

      .l-popular-places__container{
        grid-template-columns: repeat(3,100px);
        grid-template-rows: repeat(2,140px);
      }
    }

  }

  @media screen and (min-width:952px) {
    .l-activities .l-activities__container--grid{
      grid-template-columns: repeat(4, 12rem);
    }
  }

  @media screen and (min-width: 1024px) {
    .l-popular-places{
      .l-popular-places__container{
        grid-template-columns: repeat(6,100px);
        grid-template-rows: 140px;  
        gap: 6rem;
      }
    }
  }

  @media screen and (min-width:1190px) {
    .l-activities .l-activities__container--grid{
      grid-template-columns: repeat(5, 12rem);
    }
  }
`

export default StyledHomePage