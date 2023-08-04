import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

const UserInfo = ({className, user, cardUsed, message}) => {
  const calculateAge = (birthTimeStamp) => {
    const currentTimeStamp = Date.now()
    const age = Math.floor((currentTimeStamp - birthTimeStamp) / (1000 * 60 * 60 * 24 * 365.25))
    return age
  }


  return(
    <div  className={className}>
      <Link to={`/user/${user?.uid}`}>
        <img className="o-user-avatar" src={user?.photoURL} alt="holder-avatar"/>
      </Link>
      <div className="c-user-info">
        <Link to="/user/1">
          <h2 className="o-user-info__name">{user?.displayName}</h2> 
        </Link>
        <h4 className="o-user-info__time">3小時前</h4>
        <div className="c-user-info__brief"> 
          <h4 className="o-user-info__region">{user?.region}</h4>
          <h4 className="o-user-info__age">{calculateAge(user?.birth)}歲</h4>
          <h4 className="o-user-info__profession">{user?.profession}</h4>
        </div>
      </div>
    </div>
  )
}

const StyledUserInfo = styled(UserInfo)`
  display: flex;
  align-items: center;

  .o-user-avatar{
    width: 3rem;
    height: 3rem;
    background-color: ${({theme})=>theme.color.default};
    border-radius: 50%;
    border: 5px solid ${({theme})=>theme.color.default};
  }

  .c-user-info{
    margin-left: .75rem;
    height: 2.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    h2,h4{
      width: 100%;
      text-align: flex-start;
    }

    .o-user-info__name{
      color: ${({theme})=>theme.color.default};
    } 

    .c-user-info__brief{
      display: flex;
      gap: .5rem;

      h4{
        position: relative;
        color: ${({theme})=>theme.color.grey};
        font-weight: 500;
        white-space: nowrap;

        &:after{
          content: "-";
          position: absolute;
          left: calc(100% + .25rem);
          transform: translate(-50%,0);
        }

        &:last-child::after{
          display: none;
        }
      }
    }

    .o-user-info__time{
      display: none;
    }
  }

  ${props => props.message && css`
    .c-user-info{
      .c-user-info__brief{
        display: none;
      }

      .o-user-info__time{
        display: block;
        color: ${({theme})=>theme.color.grey};
        font-weight: 500;
      }
    }
    `}

  ${props=> props.cardUsed && css`
    flex-direction: column;
    text-align: center;
    align-items: center;


    .o-user-avatar{
      width: 3.5rem;
      height: 3.5rem;
      border: 5px solid ${({theme})=>theme.color.default};
    }

    .c-user-info{
      margin-left: 0;
      height: auto;

      .c-user-info__brief{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: 1.25rem;
        grid-template-areas: 
          "region age"
          "profession profession";
        gap: 0 .5rem;

        h4:nth-child(2)::after{
          display: none;
        }

        .o-user-info__region{
          grid-area: region;
        }

        .o-user-info__age{
          grid-area: age;
        }

        .o-user-info__profession{
          grid-area: profession;
        }

      }

    }
  `}

`

export default StyledUserInfo