import styled from "styled-components"

import StyledUserInfo from "./StyledUserInfo"

import {ReactComponent as LikeIcon} from "assets/icons/LikeIcon.svg"
import {ReactComponent as ReplyIcon} from "assets/icons/ReplyIcon.svg"

const MessageCard = ({className}) => {
  return(
    <div className={className}>
       <StyledUserInfo className="o-message-card__user-info" message/>
       <p className="o-message-card__content">如果要退出，請於一周前告知，方便退房處理。</p>
       <div className="c-message-card__footer">
         <h3 className="o-message-card__like-count"><LikeIcon />12</h3>
         <h3 className="o-message-card__reply-count"><ReplyIcon />12</h3>
       </div>
    </div>
  )
}

const StyledMessageCard = styled(MessageCard)`
  padding: .75rem 1rem;
  width: 100%;
  border-radius: .5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .2);
  background-color: ${({theme})=> theme.backgroundColor.default};

  .o-message-card__user-info{
    margin-bottom: .5rem;
  }

  .o-message-card__content{
    padding-bottom: .5rem;
  }

  .c-message-card__footer{
    display: flex;
    gap: 2rem;
    
    .o-message-card__like-count, .o-message-card__reply-count{
      display: flex;
      align-items: center;
    }

    svg{
      height: 1.25rem;
      margin-right: .5rem;
      fill: ${({theme})=> theme.color.default}
    }
  }
`

export default StyledMessageCard