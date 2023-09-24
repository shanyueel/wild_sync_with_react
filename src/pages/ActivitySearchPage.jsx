import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getActivitiesByFilters } from "api/activityApi";

import StyledButton from "components/StyledButton";
import StyledActivityListItem from "components/StyledActivityListItem";
import StyledActivityHistory from "components/StyledActivityHistory";
import StyledCheckboxInput from "components/inputs/StyledCheckboxInput";
import StyledDatePeriodInput from "components/inputs/StyledDatePeriodInput";
import StyledSelector from "components/inputs/StyledSelector";
import StyledLoading from "components/StyledLoading";

import {ReactComponent as UpIcon} from "assets/icons/UpIcon.svg"
import {ReactComponent as DownIcon} from "assets/icons/DownIcon.svg"

const activitiesLocationOptions = require('data/taiwanDistricts.json')
const activitiesDifficultyOptions = require('data/activityDifficultyOptions.json')
const activitiesOrderOptions = require('data/activitiesOrderOptions.json')

const ActivitySearchPage = ({ className }) => {
  const searchbarRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [isFiltersDisplay, setIsFiltersDisplay] = useState(false)
  const [searchOrder, setSearchOrder] = useState({ order: "releaseDate" })
  const [searchFilter, setSearchFilter] = useState({
    keyword: queryParams.get('keyword'),
    location: JSON.parse(queryParams?.get('location')),
    difficulty: JSON.parse(queryParams?.get('difficulty')),
    time: JSON.parse(queryParams?.get('time'))
  })

  const [activities, setActivities] = useState([])
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(true)

  useEffect(()=>{
    const getFilteredActivities = async() => {
      setIsActivitiesLoading(true)
      const newActivities = await getActivitiesByFilters(searchFilter)
      setActivities(newActivities)
      setIsActivitiesLoading(false)
    } 
    getFilteredActivities()
  },[location.search])

  const handleSearchbarChange = () => {
    const newForm = {
      ...searchFilter,
      keyword: searchbarRef.current.value
    }
    setSearchFilter(newForm)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const { keyword, location, difficulty ,time } = searchFilter
    
    const queryParams = [
      keyword && `keyword=${keyword}`,
      location && location?.length > 0 && `location=${JSON.stringify(location)}`,
      difficulty && difficulty?.length > 0 && `difficulty=${JSON.stringify(difficulty)}`,
      time && `time=${JSON.stringify(time)}` 
    ]
      ?.filter(Boolean)
      ?.join('&')

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
              value={searchFilter?.keyword || ""}
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
                    formContent={searchFilter} 
                    onFormChange={setSearchFilter}
                  />
                </td>
              </tr>
              <tr>
                <td className="c-table-key">時間</td>
                <td className="c-table-content ">
                  <StyledDatePeriodInput
                    inputId="time"
                    formContent={searchFilter}
                    onFormChange={setSearchFilter}
                  />
                </td>
              </tr>
              <tr>
                <td className="c-table-key">地區</td>
                <td className="c-table-content">
                  <StyledCheckboxInput
                    inputId="location" 
                    checkboxOptions={activitiesLocationOptions} 
                    formContent={searchFilter} 
                    onFormChange={setSearchFilter}
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
              isActivitiesLoading
              ? <StyledLoading title="活動讀取中"/>
              : activities?.length > 0 && activities?.map(activity => <StyledActivityListItem key={activity?.id} activity={activity} />)
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