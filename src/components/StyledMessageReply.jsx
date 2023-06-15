import styled from "styled-components";

import StyledUserInfo from "./StyledUserInfo";
import StyledButton from "./StyledButton";

const MessageReply = ({ className }) => {
  return(
    <div className={className}>
      <StyledUserInfo className="o-message-reply__user-info"/>
      <textarea className="o-message-reply__input" placeholder="請輸入內文"/>
      <StyledButton className="o-message-reply__button" title="留言"/>
    </div>
  )
}

const StyledMessageReply = styled(MessageReply)`
  display: flex;
  flex-direction: column;
  padding: .75rem 1rem;
  width: 100%;
  border-radius: .5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
  background-color: ${({theme})=> theme.backgroundColor.default};


  .o-message-reply__user-info{
    margin-bottom: .5rem;
  }

  .o-message-reply__input{
    width: 100%;
    height: 5rem;
    resize: none;
    margin-bottom: .5rem;
    border-radius: .25rem;
    padding: .5rem;
  }

  .o-message-reply__button{
    width: 5rem;
    height: 2rem;
    align-self: flex-end;
  }
`

export default StyledMessageReply