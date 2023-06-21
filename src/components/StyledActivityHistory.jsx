import styled from "styled-components";
import { useSelector } from "react-redux";

import StyledVerticalActivityCard from "./StyledVerticalActivityCard";
import StyledHorizontalActivityCard from "./StyledHorizontalActivityCard";

const ActivityHistory = ({className}) => {
  const environmentParams = useSelector((state) => state.environment)
  const isLargeLayout = environmentParams.windowSize === "large"

  return(
    <div className={className}>
      <h2 className="o-activity-history__title">瀏覽紀錄</h2>
      <div className="l-activity-history__body">
        <div className="c-activity-history__cards">
            { isLargeLayout? <StyledHorizontalActivityCard sideUsed /> : <StyledVerticalActivityCard /> }
            { isLargeLayout? <StyledHorizontalActivityCard sideUsed /> : <StyledVerticalActivityCard /> }
            { isLargeLayout? <StyledHorizontalActivityCard sideUsed /> : <StyledVerticalActivityCard /> }
            { isLargeLayout? <StyledHorizontalActivityCard sideUsed /> : <StyledVerticalActivityCard /> }
            { isLargeLayout? <StyledHorizontalActivityCard sideUsed /> : <StyledVerticalActivityCard /> }
        </div>
      </div>
    </div>
  )
}

const StyledActivityHistory = styled(ActivityHistory)`
  .o-activity-history__title{
    margin-bottom: 1rem;
    color: ${({theme})=> theme.color.default};
    font-weight: 700;
  }

  .l-activity-history__body{
    height: 
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    overflow-x: scroll;

    .c-activity-history__cards{
      display: flex;
      width: fit-content;
      height: fit-content;
      gap: 1rem;
    }
  }

  @media screen and (min-width: 1024px) {
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
`

export default StyledActivityHistory