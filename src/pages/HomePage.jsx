import styled from "styled-components"

import StyledImageSlider from "components/StyledImageSlider"
import StyledActivityCard from "components/StyledVerticalActivityCard"
import StyledPeriodSelector from "components/StyledPeriodSelector"
import StyledButton from "components/StyledButton"


const HomePage = ({className}) => {
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


  
  
  
  return(
      <div className={className} >
        <StyledImageSlider sliderImages={sliderImage}/>

        <div className="l-popular-places">
          <h1 className="l-popular-places__title">熱門活動地點</h1>
          <div className="c-popular-places__list">
            {popularPlaces.map((popularPlace)=>{ 
              return(
                <div className="c-popular-place" key={popularPlace.id}>
                  <img className="o-popular-place__circle" src={popularPlace.image} alt={popularPlace.title} />
                  <h2 className="o-popular-place__name">{popularPlace.title}</h2>
                </div>
              )})}
          </div>
        </div>
        
        <div className="l-activities">
          <h1 className="o-activities__title">最新活動</h1>
          <ul className="c-activities__nav-list">
            <li className="o-activities__nav-item --selected">登山</li>
            <li className="o-activities__nav-item">單車</li>
            <li className="o-activities__nav-item">露營</li>
            <li className="o-activities__nav-item">潛水</li>
            <li className="o-activities__nav-item">其他</li>
          </ul>
          <div className="c-activities-filters">
            <select className="c-activities-filters__location">
              <option id="TPE">台北</option>
              <option>台中</option>
              <option>台南</option>
            </select>
            <div className="c-activities-filters__others">
              <input id="o-activities-filter__checkbox" type="checkbox"/>
              <label htmlFor="o-activities-filter__checkbox" >篩選器 ▼</label>
              <div className="c-activities-filters__others-modal">
                <div className="c-activities-filters__date">
                  <h3 className="o-activities-filters__title">活動日期</h3>
                  <StyledPeriodSelector />
                </div>

                <div className="c-activities-filters__order">
                  <h3 className="o-activities-filters__title">排序依據</h3>
                  <select className="c-activities-filters__selector">
                    <option>最新發布</option>
                    <option>即將開始</option>
                    <option>熱門聚會</option>
                  </select>
                </div>

                <div className="c-activities-filters__length">

                  <h3 className="o-activities-filters__title">活動時長</h3>
                  <div className="c-activities-filters__checkbox-list">
                    <div className="o-activities-checkbox">
                    <input name="activities-length" type="checkbox" id="hours" /><label htmlFor="hours" >3小時內</label>
                    </div>
                    <div className="o-activities-checkbox">
                      <input name="activities-length" type="checkbox" id="half-day" /><label htmlFor="half-day" >半天</label>
                    </div>
                    <div className="o-activities-checkbox">
                      <input name="activities-length" type="checkbox" id="all-day" /><label htmlFor="all-day" >全天</label>
                    </div>
                    <div className="o-activities-checkbox">
                      <input name="activities-length" type="checkbox" id="overnight" /><label htmlFor="overnight">2天以上</label>
                    </div>
                  </div>

                </div>

                <StyledButton className="o-activities-filters__button" title="篩選" />

              </div>
            </div>
          </div>
          <div className="l-activities__card-list">
            <StyledActivityCard />
            <StyledActivityCard />
            <StyledActivityCard />
            <StyledActivityCard />
          </div>
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

      .l-popular-places__title{
        margin-bottom: 2.5rem;
        font-weight: 700;
        color: ${({theme})=> theme.color.default}
      }

      .c-popular-places__list{
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
      
      .o-activities__title{
        margin-top: 2rem;
      }

      .c-activities__nav-list{
        display: flex;
        gap: .75rem;
        margin: 1rem 0;
        padding: .25rem;
        font-size: 1rem;
        line-height: 2rem;
        border-bottom: 1.25px solid ${({theme})=> theme.backgroundColor.default};

        .o-activities__nav-item{
          width: 3rem;
          text-align: center;
          cursor: pointer;

          &.--selected{
            border-radius: 1rem;
            color: white;
            background-color: ${({theme}) => theme.color.default};
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
      }

      .c-activities-filters{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;

        .c-activities-filters__location{
          cursor: pointer;
        }

        .c-activities-filters__others{
          & > input{
            display: none;

            &:checked{
              & ~ .c-activities-filters__others-modal{
                display: flex;
                flex-direction: column;
                align-items: center;
              }
            }
          }

          label{
            color: ${({theme})=>theme.color.default};
            font-weight: 700;
            cursor: pointer;
          }
          .c-activities-filters__others-modal{
            display: none;
            position: absolute;
            right:0;
            top: -1;
            width: 100%;
            max-width: 432px;
            margin-top: 1rem;
            background-color: ${({theme})=>theme.backgroundColor.default};
            padding: 1.5rem 1rem;
            border-radius: .5rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
            
            .c-activities-filters__date,
            .c-activities-filters__length,
            .c-activities-filters__order{
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
              }

              .c-activities-filters__checkbox-list{
                display: flex;
                justify-content: space-between;
                width: 100%;

                .o-activities-checkbox{
                  label{
                    font-weight: 500;
                    margin-left: .25rem;
                  }
                }
              }
            }

          }
        }
        
        select{
          border: none;
          font-size: 1rem;
          font-weight: 700;
          color: ${({theme})=>theme.color.default};
        }


      }

      .l-activities__card-list{
        width: 90%;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 1rem;
        margin-top: 1rem;
      }
    }
  

  @media screen and (min-width: 768px) {
      .l-popular-places{
        margin-top: 28rem;

        .c-popular-places__list{
          grid-template-columns: repeat(3,100px);
          grid-template-rows: repeat(2,140px);
        }
      }
      
      .l-activities{
        .l-activities__card-list{
          grid-template-columns: repeat(3,1fr);
          grid-gap: 1.25rem;
        }
      }
    }

  @media screen and (min-width: 1024px) {
      .l-popular-places{
        .c-popular-places__list{
          grid-template-columns: repeat(6,100px);
          grid-template-rows: 140px;  
          gap: 6rem;
        }
      }
      .l-activities{
        .l-activities__card-list{
          /* grid-template-columns: repeat(4,1fr);
          gap: 1.5rem; */
        }
      }
  }
`

export default StyledHomePage