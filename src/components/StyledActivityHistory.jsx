import styled from "styled-components";

import StyledActivityCardItem from "./StyledActivityCardItem";

const ActivityHistory = ({className}) => {

  return(
    <div className={className}>
      <h2 className="o-activity-history__title">瀏覽紀錄</h2>
      <div className="l-activity-history__body scrollbar-x">
        <div className="c-activity-history__cards">
          <StyledActivityCardItem small/>
          <StyledActivityCardItem small/>
          <StyledActivityCardItem small/>
          <StyledActivityCardItem small/>
          <StyledActivityCardItem small/>
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
    margin-bottom: 3rem;

    .c-activity-history__cards{
      display: flex;
      width: fit-content;
      height: fit-content;
      gap: 1rem;
    }
  }
`

export default StyledActivityHistory