import styled from "styled-components";
import StyledUserInfo from "./StyledUserInfo";

const UserCard = ({className}) => {
  return(
    <div className={className}>
      <StyledUserInfo className="o-user-card__user-info"/>
      <p className="o-user-card__introduction">我是一位熱愛登山的夢想家。希望能在這個平台上結交志同道合的夥伴，一同征服大自然的奇妙，共享挑戰與成就。期待與你們相遇，共創難忘的登山冒險！</p>
    </div>
  )
}

const StyledUserCard = styled(UserCard)`
  padding: .75rem 1rem;
  border-radius: .5rem;
  background-color: ${({theme})=>theme.backgroundColor.default};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);


  .o-user-card__introduction{
    margin-top: .5em;
  }
`

export default StyledUserCard