import { Outlet } from "react-router";
import styled from "styled-components";

import {ReactComponent as ChatIcon} from "assets/icons/ChatIcon.svg"

const ActivityPageDiscussionLayout = ({className}) => {
  return(
    <div className={className}>
      <div className="c-activity-discussion__icon">
        <input type="checkbox" id="activity-discussion"/>
        <label htmlFor="activity-discussion"><ChatIcon  /></label>
      </div>
      <div className="l-activity-discussion">
        <Outlet />
      </div>
    </div>
  )
}

const StyledActivityPageDiscussionLayout = styled(ActivityPageDiscussionLayout)`
  width: 100%;
  height: 100%;
  .c-activity-discussion__icon{
    position: fixed;
    bottom: 2.5rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=> theme.color.default};
    box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
    z-index: 1;
    

    input{
      display: none;
    }

    svg{
      fill: white;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }

    &:has(input:checked){
      display: none;

      & ~ .l-activity-discussion{
        display: flex;
        flex-direction: column;
      }
    }

  }

  .l-activity-discussion{
    display: none;
    position: fixed;
    top: 4rem;
    left: 0;
    bottom: 0;
    right: 0; 
    margin-bottom: 3rem;
    background-color: rgb(255,255,255,0.9);
    width: 100%;
    height: calc(100vh - 4rem) ;
    padding: 1rem 1rem 3rem;
    z-index: 1;
  }

  @media screen and (min-width: 1024px){
    .c-activity-discussion__icon{
      display: none;
    }

    .l-activity-discussion{
      padding: 0;
      display: block;
      position: static;

      height: calc(100vh - 10rem);
    }
  }
`

export default StyledActivityPageDiscussionLayout