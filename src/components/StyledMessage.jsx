import styled from "styled-components"
import clsx from "clsx"

import userDefaultImage from "assets/images/userDefaultImage.png"

const Message = ({className,isSelf}) => {
  return(
    <div className={clsx(className,{"--others":!isSelf},{"--self":isSelf})} >
      <img className="o-activity-discussion__message-avatar" src={userDefaultImage} alt="user-avatar"/>
      <p className="o-activity-discussion__message-content">
        我臨時有些事情需要處理，想要取消，謝謝！
      </p>
      <h4 className="o-activity-discussion__message-time">12:59</h4>
    </div>
  )
}

const StyledMessage = styled(Message)`
  width: 100%;
  display:flex;
  gap: 0.5rem;
  
  .o-activity-discussion__message-avatar{
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    align-self: flex-end;
  }

  .o-activity-discussion__message-content{
    padding: .5rem .5rem;
    width: 55%;
    line-height: 1.25rem;
  }

  .o-activity-discussion__message-time{
    margin-top: .25rem;
    color: ${({theme})=>theme.color.grey};
    font-weight: 400;
    text-align: end;
  }

  &.--self{
    justify-content: end;
    margin-left: auto;
    
    .o-activity-discussion__message{
      &-avatar{
        order:3
      }

      &-content{
        order:2;
        border-radius: .5rem .5rem 0 .5rem ;
        background-color: ${({theme})=>theme.color.grey};
        color:white;
      }

      &-time{
        order: 1;
        align-self: flex-end;
      }
    }
  }

  &.--others{

    .o-activity-discussion__message{

      &-avatar{
        order:1
      }

      &-content{
        order:2;
        border-radius: .5rem .5rem .5rem 0;
        background-color: ${({theme})=>theme.color.default};
        color:white;
      }

      &-time{
        order: 3;
        align-self: flex-end;
      }
    }
  }
`

export default StyledMessage

