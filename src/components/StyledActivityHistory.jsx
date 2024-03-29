import styled, { css } from "styled-components";

import StyledActivityCardItem from "./StyledActivityCardItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getActivity } from "api/activityApi";
import StyledActivityListItem from "./StyledActivityListItem";
import StyledLoading from "./StyledLoading";
import { asyncForEach } from "utils/asyncLoop";

const ActivityHistory = ({className, sideUsed}) => {
  const environmentParams = useSelector(state=> state.environment)
  const windowSize = environmentParams.windowSize
  const [isLargeLayout, setIsLargeLayout] = useState(false)
  const [historyActivities, setHistoryActivities] = useState([])
  const [isHistoryActivitiesLoading, setIsHistoryActivitiesLoading] = useState(true)

  useEffect(()=>{
    const setWindowSize = () => {
      setIsLargeLayout(windowSize === "large")
    }
    setWindowSize()
  },[windowSize])

  useEffect(()=>{
    const getHistoryActivities = async() => {
      setIsHistoryActivitiesLoading(true)
      const activitiesList = []
      const historyIdList = JSON.parse(localStorage.getItem('history'))
      await asyncForEach(historyIdList, async(activityId)=>{
        const activity = await getActivity(activityId)
        if(activity) activitiesList.push(activity)
      })
      setHistoryActivities(activitiesList)
      setIsHistoryActivitiesLoading(false)
    }
    getHistoryActivities()
  },[])

  return(
    <div className={className}>
      {
        historyActivities.length > 0 &&
        <>
          <h2 className="o-activity-history__title">瀏覽紀錄</h2>
          <div className="l-activity-history__body scrollbar-x">
            { isHistoryActivitiesLoading 
                ? <StyledLoading title="活動讀取中"/>
                : (
                    <div className="c-activity-history__cards">
                      { sideUsed && isLargeLayout 
                        ? historyActivities?.map(activity=><StyledActivityListItem sm={isLargeLayout} key={activity?.id} activity={activity}/>)
                        : historyActivities?.map(activity=><StyledActivityCardItem key={activity?.id} activity={activity}/>)
                      }
                    </div>
                  )
            }
          </div>
        </>
      }

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
    
    .c-activity-history__cards{
      display: flex;
      width: fit-content;
      height: fit-content;
      gap: 1rem;
    }
  }

  ${props=>props.sideUsed && css`
    @media screen and (min-width: 1024px){
      .l-activity-history__body .c-activity-history__cards{
        width: 100%;
        flex-direction: column;
        gap: 1rem;
      }
    }

  `}
`

export default StyledActivityHistory