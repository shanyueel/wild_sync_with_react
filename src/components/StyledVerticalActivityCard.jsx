import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import {ReactComponent as FlameIcon} from "assets/icons/FlameIcon.svg"
import {ReactComponent as HeartIcon} from "assets/icons/HeartIcon.svg"


const VerticalActivityCard = ({className, detailed}) => {
  return(
    <div className={className}>
      
      <Link to="/activity/1">
        <img className="o-activity__image" src="https://clutchpoints.com/_next/image?url=https%3A%2F%2Fwp.clutchpoints.com%2Fwp-content%2Fuploads%2F2023%2F06%2Ffinals.jpg&w=3840&q=75" alt="activity cover" />
      </Link>
      <div className="l-activity-card__info">
        <Link to="/activity/1"> 
          <h3 className="o-activity-card__title">麟趾-鹿林山健行</h3>
        </Link>
        <h4 className="o-activity-card__location">南投縣信義鄉</h4>
        <h4 className="o-activity-card__date">2023.07.01 08:30 -{ !detailed && <br/> }2023.07.02 18:00</h4>

        <div className="c-activity-card__basic-info">
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
      
        <div className="o-activity-card__favorite-button">
          <input id="favorite" type="checkbox"/>
          <label htmlFor="favorite"><HeartIcon /></label>
        </div>
      
    </div>
  )
}

const StyledVerticalActivityCard = styled(VerticalActivityCard)`
  position: relative;
  width: 10rem;
  height: 18rem;
  border-radius: 1rem;
  background-color: ${({theme})=>theme.backgroundColor.default};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
  overflow: hidden;

  .o-activity__image{
    width: 100%;
    height: 10rem;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .l-activity-card__info{
    padding: 1rem;
    width: 100%;
    height: 4rem;
    

    .o-activity-card__title{
      font-weight: 700;
    }

    .o-activity-card__location{
      margin-top: .5rem;
    }

    .o-activity-card__date{
      margin-top: .5rem;
      font-weight: 400;
    }

    .c-activity-card__basic-info{
      margin-top: .5rem;
      display: flex;
      gap: 1rem;
      
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

  .o-activity-card__favorite-button{
    position: absolute;
    top: .75rem;
    right: .5rem;
    border-radius: 50%;
    padding: .25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    
    
    input[type="checkbox"]{
      display: none;
      
    }

    svg{
      width: 1rem;
      height: 1rem;
      fill: transparent;
      stroke: ${({theme})=>theme.color.alert};
      stroke-width: 50;
      cursor: pointer;
    }

    &:has(input:checked) label{
      svg{
        fill: ${({theme})=>theme.color.alert};
      }
    }
  }

  @media screen and (min-width: 480px) {
    width: 12.5rem;
    height: 21rem;

    .o-activity__image{
      height: 12rem;
    }

    .l-activity-card__info{
      height: 4rem;

      h3{
        font-size: 1.25rem;
      }

      h4{
        font-size: 1rem;
      }
    }

    .o-activity-card__favorite-button{
      svg{
        width: 1.25rem;
        height: 1.25rem;
        stroke-width: 40;
      }
    }
  }  
`

export default StyledVerticalActivityCard