import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import StyledImageSlider from "components/StyledImageSlider"
import StyledActivityCardItem from "components/StyledActivityCardItem"
import StyledActivityListItem from "components/StyledActivityListItem"
import StyledButton from "components/StyledButton"
import StyledPagination from "components/StyledPagination"

import {ReactComponent as GridIcon} from "assets/icons/GridIcon.svg"
import {ReactComponent as ListIcon} from "assets/icons/ListIcon.svg"
import { getActivitiesByFilters, getPopularLocations } from "api/activityApi"
import clsx from "clsx"
import StyledSelector from "components/inputs/StyledSelector"
import StyledCheckboxInput from "components/inputs/StyledCheckboxInput"
import StyledDatePeriodInput from "components/inputs/StyledDatePeriodInput"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const HomePage = ({className}) => {
  const filterCheckboxRef = useRef(null)

  const activityTypeOptions = require('data/activityTypeOptions.json') 
  const activitiesOrderOptions = require('data/activitiesOrderOptions.json')
  const activitiesLocationOptions = require('data/taiwanDistricts.json')
  const activitiesDifficultyOptions = require('data/activityDifficultyOptions.json')
  const homePageSliderImages = require('data/homePageSliderImages.json')

  const [activitiesDisplay, setActivityDisplay] = useState("grid")
  const [activityList, setActivityList] = useState([])
  const [filterCache, setFilterCache] = useState({})
  const [activitiesFilter, setActivitiesFilter] = useState({})
  const [popularLocations, setPopularLocations] = useState([])

  useEffect(()=>{
    const getActivities = async() => {
      const activities= await getActivitiesByFilters(activitiesFilter)
      setActivityList(activities)
    }
    const getPopularActivitiesLocations = async() => {
      const popularLocations = await getPopularLocations()
      setPopularLocations(popularLocations)
    }
    getActivities()
    getPopularActivitiesLocations()
  },[activitiesFilter])

  const handleDisplayClicked = (e) => {
    if(e.target.id === "activities-grid-display") setActivityDisplay("grid")
    if(e.target.id === "activities-list-display") setActivityDisplay("list")
  }

  const handleActivitiesFilter = async(e) => {
    e.preventDefault()
    if(Object.keys(filterCache).length === 0){
      toast.error('未更改任何條件', {
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

    const filterCheckbox = document.getElementById("o-activities-filter__checkbox")
    filterCheckbox.checked = !filterCheckbox.checked
    setActivitiesFilter(filterCache)
  }

  return(
      <div className={className} >
        <StyledImageSlider sliderImages={homePageSliderImages}/>

        <div className="l-popular-places">
          <h1 className="o-popular-places__title">熱門活動地點</h1>
          <div className="l-popular-places__container">
            {popularLocations?.map((popularPlace)=>{ 
              return(
                <Link to={`/activity/search?location=["${popularPlace?.id}"]`} key={popularPlace?.id} className="c-popular-place">
                  <img className="o-popular-place__circle" src={popularPlace?.image} alt={popularPlace?.title} />
                  <h2 className="o-popular-place__name">{popularPlace?.name}</h2>
                </Link>
              )})}
          </div>
        </div>
        
        <div className="l-activities">
          <h1 className="o-activities__title">活動列表</h1>
          <ul className="c-activities__types-options">
            <li className="o-activities__type"><input type="radio" name="activities-type" id="all-type" defaultChecked />
            <label htmlFor="all-type">不限</label></li>
            {activityTypeOptions?.map((activityType)=>{
              return(
                <li className="o-activities__type" key={activityType.id}>
                  <input type="radio" name="activities-type" disabled={activityType.disabled} id={activityType.id}/>
                  <label htmlFor={activityType.id}>{activityType.name}</label>
                </li>
              )
            })}
          </ul>

          <div className="l-activities-settings">         

            <div className="l-activities-filters">
              <input id="o-activities-filter__checkbox" ref={filterCheckboxRef} type="checkbox"/>
              <label htmlFor="o-activities-filter__checkbox" >▼ 篩選器</label>
              <form className="l-activities-filters__dropdown">

                <StyledSelector 
                  title="排序方式" 
                  selectorId="order"
                  optionList={activitiesOrderOptions}
                  formContent={filterCache}
                  onFormChange={setFilterCache}
                />

                <StyledCheckboxInput
                  title="活動難度"
                  inputId="difficulty"
                  checkboxOptions={activitiesDifficultyOptions}
                  formContent={filterCache}
                  onFormChange={setFilterCache}
                />

                <StyledDatePeriodInput
                  title="活動時間"
                  inputId="time"
                  formContent={filterCache}
                  onFormChange={setFilterCache}
                />

                <StyledCheckboxInput
                  title="活動地點"
                  inputId="location"
                  checkboxOptions={activitiesLocationOptions}
                  formContent={filterCache}
                  onFormChange={setFilterCache}
                />

                <StyledButton className="o-activities-filters__button" onClick={handleActivitiesFilter}>篩選</StyledButton>

              </form>
            </div>

            <div className="c-activities-display">
              <h3 className="o-activities-display__title">顯示方式</h3>   
              <div className="c-activities-display__option">
                <input type="radio" name="activities-display" id="activities-grid-display" onClick={handleDisplayClicked} defaultChecked/>
                <label htmlFor="activities-grid-display"><GridIcon/></label>
              </div>
              <div className="c-activities-display__option">
                <input type="radio" name="activities-display" id="activities-list-display" onClick={handleDisplayClicked} />
                <label htmlFor="activities-list-display"><ListIcon/></label>
              </div>
            </div>

          </div>

          <div className="l-activities__container">
            <div className={clsx({"l-activities__container--grid":activitiesDisplay === "grid"},{"l-activities__container--list":activitiesDisplay === "list"})}>
              { 
                activitiesDisplay === "grid" ? 
                activityList?.map((activity)=> <StyledActivityCardItem key={activity?.id} activity={activity} /> )
                : activityList?.map((activity)=> <StyledActivityListItem key={activity?.id} activity={activity} /> )
              }
            </div>
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

        &:has(input:disabled){
          label{
            text-decoration: line-through;
            color: ${({theme})=>theme.backgroundColor.default};
            cursor: default;
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

          &:checked ~ .l-activities-filters__dropdown{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
        }

        .l-activities-filters__dropdown{
          position: absolute;
          left:0;
          top:-1;
          display: none;
          width: 100%;
          max-width: 376px;
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
      margin-top: 1rem;
      width: 90%;

      &--grid{
        display: grid;
        grid-template-columns: repeat(2, 11rem);
        grid-auto-rows: 18rem;
        width: fit-content;
        gap: .25rem;
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


  @media screen and (min-width: 540px) {
    .l-activities .l-activities__container--grid{
      grid-template-columns: repeat(3, 11rem);
      gap: .5rem;
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

    .l-activities .l-activities__container--grid{
      grid-template-columns: repeat(4, 11rem);
    }

  }

  @media screen and (min-width:900px) {
    
  }

  @media screen and (min-width: 1024px) {
    .l-popular-places{
      .l-popular-places__container{
        grid-template-columns: repeat(6,100px);
        grid-template-rows: 140px;  
        gap: 6rem;
      }
    }

    .l-activities .l-activities__container--grid{
      gap: .75rem
    }
  }

  @media screen and (min-width:1200px) {
    .l-activities .l-activities__container--grid{
      grid-template-columns: repeat(6, 11rem);
      gap: .75rem
    }
  }
`

export default StyledHomePage