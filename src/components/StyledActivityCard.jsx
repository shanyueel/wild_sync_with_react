import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import {ReactComponent as FlameIcon} from "assets/icons/FlameIcon.svg"


const ActivityCard = ({className, rowDisplay}) => {
  return(
    <Link to="/activity/1" className={className}>
      <img className="o-activity__image" src="https://clutchpoints.com/_next/image?url=https%3A%2F%2Fwp.clutchpoints.com%2Fwp-content%2Fuploads%2F2023%2F06%2Ffinals.jpg&w=3840&q=75" alt="activity cover" />
      <div className="l-activity-card__info">
        <h3 className="o-activity-card__title">NBA總冠軍派對</h3>
        <h4 className="o-activity-card__location">JB漢堡店</h4>
        <h4 className="o-activity-card__date">2023.06.05 08:30</h4>
        <div className="c-activity-card__">
          <div className="l-activity-card__holder">
            <img className="o-activity-card__holder-avatar" src="https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg" alt="user avatar"></img>
            <h4 className="o-activity-card__holder-name">Jimmy</h4>
          </div>
          <div className="o-activity-card__holder-activeness">
            <FlameIcon />
            <h4 className="o-activity-card__holder-activeness-count">5734</h4>
          </div>
        </div>
      </div>
    </Link>
  )
}

const StyledActivityCard = styled(ActivityCard)`
  width: fit-content;
  overflow: hidden;
  border-radius: 1rem;
  background-color: ${({theme})=>theme.backgroundColor.default};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);

  .o-activity__image{
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .l-activity-card__info{
    padding: 1rem;
    width: fit-content;
    

    .o-activity-card__title{
      font-weight: 700;
    }

    .o-activity-card__location{
      margin-top: .5rem;
    }

    .o-activity-card__date{
      margin-top: .5rem;
    }

    .c-activity-card__{
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      
      .l-activity-card__holder{
        display: flex;

        .o-activity-card__holder-avatar{
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 1rem;
        }

        .o-activity-card__holder-name{
          margin-left: .25rem;
        }
      }


      .o-activity-card__holder-activeness{
        display: flex;
        align-items: center;
        margin: 0 .5rem;
        
        svg{
          width: 1.25rem;
          height: 1.25rem;
          fill: ${({theme})=> theme.color.alert}
        }

        .o-activity-card__holder-activeness-count{
          margin-left: .25rem;
        }
      }      
    }
  }

  @media screen and (min-width: 480px) {
    .l-activity-card__info{
      width: 100%;

      h3{
        font-size: 1.25rem;
      }

      h4{
        font-size: 1rem;
      }
    }
  }

  ${props => props.rowDisplay && css`
    width: 100%;
    display: flex;
    background-color: ${({theme})=>theme.backgroundColor.default};

    .o-activity__image{
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 1rem 0 0 1rem;
    }

    .l-activity-card__info{
      padding: 0;
      height: fit-content;
      margin: auto 1.5rem;
    }
  `}
  
`

export default StyledActivityCard