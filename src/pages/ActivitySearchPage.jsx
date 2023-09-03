import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import StyledButton from "components/StyledButton";
import StyledActivityListItem from "components/StyledActivityListItem";
import StyledActivityHistory from "components/StyledActivityHistory";
import StyledCheckboxInput from "components/inputs/StyledCheckboxInput";
import StyledDatePeriodInput from "components/inputs/StyledDatePeriodInput";
import StyledSelector from "components/inputs/StyledSelector";

import {ReactComponent as UpIcon} from "assets/icons/UpIcon.svg"
import {ReactComponent as DownIcon} from "assets/icons/DownIcon.svg"
import { getActivitiesByFilters } from "api/activityApi";
import { useLocation, useNavigate } from "react-router-dom";

const ActivitySearchPage = ({ className }) => {
  const activitiesLocationOptions = require('data/taiwanDistricts.json')
  const activitiesDifficultyOptions = require('data/activityDifficultyOptions.json')
  const activitiesOrderOptions = require('data/activitiesOrderOptions.json')
  const searchbarRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const keywordParam = queryParams.get('keyword')
  const locationParam = JSON.parse(queryParams.get('location'))
  const difficultyParam = JSON.parse(queryParams.get('difficulty'))
  const timeParam = JSON.parse(queryParams.get('time'))

  const searchFilter = {
    keyword: keywordParam,
    location: locationParam,
    difficulty: difficultyParam,
    time: timeParam
  }

  const [isFiltersDisplay, setIsFiltersDisplay] = useState(false)
  const [filterCache, setFilterCache] = useState(searchFilter)
  const [searchOrder, setSearchOrder] = useState({order: "releaseDate"})
  const [filteredActivities, setFilteredActivities] = useState([])

  useEffect(()=>{
    const getFilteredActivities = async() => {
      const newActivities = await getActivitiesByFilters(searchFilter)
      setFilteredActivities(newActivities)
    }
    getFilteredActivities()
  },[])

  const handleSearchbarChange = () => {
    const newForm = {
      ...filterCache,
      keyword: searchbarRef.current.value
    }
    setFilterCache(newForm)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const keywordQuery = filterCache?.keyword 
      ? `keyword=${filterCache?.keyword}` 
      : null
    const locationQuery = filterCache?.location?.length > 0 
      ? `location=${JSON.stringify(filterCache?.location)}` 
      : null
    const difficultyQuery = filterCache?.difficulty?.length > 0 
      ? `difficulty=${JSON.stringify(filterCache?.difficulty)}` 
      : null
    const timeQuery = filterCache?.time 
      ? `time=${JSON.stringify(filterCache?.time)}` 
      : null

    const queryParams = [keywordQuery,locationQuery,difficultyQuery,timeQuery]?.filter(Boolean)?.join('&')
    navigate(`/activity/search?${queryParams}`)
  }

  return(
    <div className={className}>
      <div className="l-web-container__main">
        <form className="l-search-settings">
          <div className="l-search-settings__searchbar">
            <input 
              id="keyword" 
              ref={searchbarRef}
              type="text" 
              placeholder="登山路線、露營地、潛水處" 
              value={filterCache?.keyword || ""}
              onChange={handleSearchbarChange}
              
            />
            <StyledButton onClick={handleSearch}>搜尋</StyledButton>
          </div>
          <table className="l-search-settings__options" style={{display: isFiltersDisplay ? "block" : "none"}}>
            <tbody>
              <tr>
                <td className="c-table-key">難度</td>
                <td className="c-table-content"> 
                  <StyledCheckboxInput
                    inputId="difficulty" 
                    checkboxOptions={activitiesDifficultyOptions} 
                    formContent={filterCache} 
                    onFormChange={setFilterCache}
                  />
                </td>
              </tr>
              <tr>
                <td className="c-table-key">時間</td>
                <td className="c-table-content ">
                  <StyledDatePeriodInput
                    inputId="time"
                    formContent={filterCache}
                    onFormChange={setFilterCache}
                  />
                </td>
              </tr>
              <tr>
                <td className="c-table-key">地區</td>
                <td className="c-table-content">
                  <StyledCheckboxInput
                    inputId="location" 
                    checkboxOptions={activitiesLocationOptions} 
                    formContent={filterCache} 
                    onFormChange={setFilterCache}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <label className="c-search-settings__switch" htmlFor="searchFiltersSwitch">
            <input id="searchFiltersSwitch" type="checkbox" onClick={()=>{setIsFiltersDisplay(!isFiltersDisplay)}}/>
            { isFiltersDisplay ? <><UpIcon/>收起搜尋選項</> : <><DownIcon/>展開搜尋選項</> }
          </label>
        </form>

        <div className="l-search-results">
          <div className="l-search-results__header">
            <h2 className="o-search-results__title">搜尋結果</h2>
            <StyledSelector
              className="o-search-results__order"
              selectorId="order" 
              optionList={activitiesOrderOptions}
              formContent={searchOrder} 
              onFormChange={setSearchOrder}
            />
          </div>
          
          <div className="l-search-results__container">
            {
              filteredActivities?.length > 0 && filteredActivities?.map(activity => <StyledActivityListItem key={activity?.id} activity={activity} />)
            }
          </div>
        </div>
      </div>

      <div className="l-web-container__side">
        <StyledActivityHistory sideUsed/>
      </div>
    </div>
  )
}

const StyledActivitySearchPage = styled(ActivitySearchPage)`
  width: 100%;
  height: 100%;

  .l-web-container__main{
    
    .l-search-settings{
      margin-top: 1rem;
      padding: 1rem;
      border-radius: .5rem;
      background-color: ${({theme})=> theme.backgroundColor.default};
      box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .2);

      .c-search-settings__switch{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        color: ${({theme})=>theme.color.default};
        cursor: pointer;
        
        input{
          display: none;
        }

        svg{
          width: 1.25rem;
          height: 1.25rem;
          margin-right: .25rem;
          fill: ${({theme})=>theme.color.default};
        }
      }
      
      &__searchbar{
        display: flex;

        input{
          width: 80%;
          padding: 0 1rem;
          border-radius: .75rem 0 0 .75rem;
          border: none;
        }

        button{
          width: 20%;
          border-radius: 0 .75rem .75rem 0;
        }
      }

      &__options{
        margin-top: 1rem;

        td{
          border-color: ${({theme})=> theme.backgroundColor.default};
        }

        .c-table-key{
          width: 5rem;
          color: white;
          background-color: ${({theme})=> theme.color.default};
        }

        .c-table-content{
          ul{
            display: flex;
            flex-wrap: wrap;
            gap: .5rem;
            width: 100%;
            height: 100%;
            

            li{
              padding:.25rem .5rem;

              input{
                display: none;
              }
              
              label{
                font-size: 1rem;
              }

              &:has(input:checked){
                background-color: ${({theme}) => theme.color.default};
                border-radius: 1rem;

                label{
                  color: white;
                }
              }
            }
          }
        }
      }
    }

    .l-search-results .l-search-results__container{
      width:100%;
      margin-top: 1rem;
      
    }

    .l-search-results__header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;

      .o-search-results__title{
        font-weight: 700;
        color: ${({theme})=>theme.color.default};
      }

      .o-search-results__order{
        width: 7.5rem;
        select{
          border-radius: 0;
          border: none;
          border-bottom: 1px solid ${({theme})=>theme.color.default};
          height: 1.75rem;
        }
      }
    }

    .l-search-results__container{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 5rem;
    }
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`

export default StyledActivitySearchPage