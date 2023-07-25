import styled from "styled-components";

import {ReactComponent as FlameIcon} from "assets/icons/FlameIcon.svg"
import {ReactComponent as ClockIcon} from "assets/icons/ClockIcon.svg"
import {ReactComponent as PaymentIcon} from "assets/icons/PaymentIcon.svg"
import {ReactComponent as CrowdIcon} from "assets/icons/CrowdIcon.svg"

const ActivityBasicInfo = ({ className }) => {
  return(
    <div className={className}>
      <div className="c-activity-info-card">
        <FlameIcon className="o-activity-info-card__icon" />
        <h3 className="o-activity-info-card__title">難易程度</h3>
        <h3 className="o-activity-info-card__value">入門</h3>
      </div>
      <div className="c-activity-info-card">
        <ClockIcon className="o-activity-info-card__icon" />
        <h3 className="o-activity-info-card__title">活動時長</h3>
        <h3 className="o-activity-info-card__value">5.5 小時</h3>
      </div>
      <div className="c-activity-info-card">
        <PaymentIcon className="o-activity-info-card__icon"/>
        <h3 className="o-activity-info-card__title">活動費用</h3>
        <h3 className="o-activity-info-card__value">300 - 500</h3>
      </div>
      <div className="c-activity-info-card">
        <CrowdIcon className="o-activity-info-card__icon"/>
        <h3 className="o-activity-info-card__title">人數限制</h3>
        <h3 className="o-activity-info-card__value">10 / 12</h3>
      </div>
    </div>
  )
}

const StyledActivityBasicInfo = styled(ActivityBasicInfo)`
  position: relative;
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;

  .c-activity-info-card{
    width: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    svg{
      width: 2rem;
      height: 2rem;
      fill: ${({theme})=>theme.color.default};
    }

    .o-activity-info-card__title{
      font-weight: 700;
      color: ${({theme})=>theme.color.default};
      letter-spacing: .1rem;
    }
  }

  &::after{
    content: "";
    width: 100%;
    height: 1px;
    border-radius: .5px;
    position: absolute;
    top: 4.5rem;
    background-color: ${({theme})=> theme.color.default};
  }
`

export default StyledActivityBasicInfo