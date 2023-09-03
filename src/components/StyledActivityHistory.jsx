import styled, { css } from "styled-components";

import StyledActivityCardItem from "./StyledActivityCardItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getActivitiesByIdList } from "api/activityApi";
import StyledActivityListItem from "./StyledActivityListItem";

const ActivityHistory = ({className, sideUsed}) => {
  const environmentParams = useSelector(state=> state.environment)
  const windowSize = environmentParams.windowSize
  const [isLargeLayout, setIsLargeLayout] = useState(false)
  const [historyActivities, setHistoryActivities] = useState([])

  useEffect(()=>{
    const setWindowSize = () => {
      setIsLargeLayout(windowSize === "large")
    }
    setWindowSize()
  },[windowSize])

  useEffect(()=>{
    const getHistoryActivities = async() => {
      const historyIdList = JSON.parse(localStorage.getItem('history'))
      const activityList = await getActivitiesByIdList(historyIdList)
      setHistoryActivities(activityList)
    }
    getHistoryActivities()
  },[])

  return(
    <div className={className}>
      <h2 className="o-activity-history__title">瀏覽紀錄</h2>
      <div className="l-activity-history__body scrollbar-x">
        <div className="c-activity-history__cards">
          { sideUsed && isLargeLayout && historyActivities?.map(activity=><StyledActivityListItem sm activity={activity}/>)}
          { sideUsed && !isLargeLayout && historyActivities?.map(activity=><StyledActivityCardItem activity={activity}/>)}
          { !sideUsed && historyActivities?.map(activity=><StyledActivityCardItem activity={activity}/>)}
        </div>
      </div>
    </div>
  )
}

const StyledActivityHistory = styled(ActivityHistory)`
  width: 100%;
  .o-activity-history__title{
    margin-bottom: 1rem;
    color: ${({theme})=> theme.color.default};
    font-weight: 700;
  }

  .l-activity-history__body{
    margin-bottom: 3rem;

    .c-activity-history__cards{
      display: flex;
      width: fit-content;
      height: fit-content;
      gap: 1rem;
    }
  }

  ${props=>props.sideUsed && css`
    height: 7.5rem;

    @media screen and (min-width: 1024px){
      .l-activity-history__body{

        .c-activity-history__cards{
          width: 100%;
          flex-direction: column;
          gap: 1rem;
        }
      }
    }

  `}
`

export default StyledActivityHistory