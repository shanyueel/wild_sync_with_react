import styled, { css } from "styled-components";
import StyledUserInfo from "./StyledUserInfo";

const UserCard = ({className, user, isHolder, listItem}) => {

  return(
    <div className={className}>
      <StyledUserInfo cardUsed={!listItem} user={user} />
      <p className="o-user-card__introduction">{user?.introduction}</p>
      {isHolder && <div className="o-user-card__holder-display">HOST</div>}
    </div>
  )
}

const StyledUserCard = styled(UserCard)`
  position: relative;
  width: 10rem;
  height: 14rem;
  padding: 1rem .75rem;
  border-radius: .5rem;
  background-color: ${({theme})=>theme.backgroundColor.default};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);


  .o-user-card__introduction{
    margin-top: .5em;
    line-height: 1.25rem;
  }



  ${props=> props.listItem && css`
    width: 100%;
    height: fit-content;
    padding: 1rem 1.25rem;

    .o-user-card__holder-display{
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      padding: .25rem .5rem;
      border-radius: .25rem;
      border: 2px solid ${({theme})=>theme.color.default};
      font-size: .75rem;
      font-weight: 700;
      color: ${({theme})=>theme.color.default};
    }
  `}

`

export default StyledUserCard