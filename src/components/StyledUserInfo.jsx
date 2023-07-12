import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

const UserInfo = ({className, message}) => {
  return(
    <Link to="/user/1" className={className}>
      <img className="o-user-avatar" src={require("assets/images/userDefaultImage.png")} alt="holder-avatar"/>
      <div className="c-user-info">
        <h2 className="o-user-info__name">Daisy</h2>  
        <h4 className="o-user-info__time">3小時前</h4>
        <h4 className="o-user-info__detail">台中市 - 26 - 工程師</h4>
      </div>
    </Link>
  )
}

const StyledUserInfo = styled(UserInfo)`
  display: flex;
  align-items: center;

  .o-user-avatar{
    width: 2.25rem;
    height: 2.25rem;
    background-color: ${({theme})=>theme.color.default};
    border-radius: 50%;
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

    .o-user-info__detail{
      display: block;
      color: ${({theme})=>theme.color.grey};
      font-weight: 500;
    }

    .o-user-info__time{
      display: none;
    }
  }

  ${props => props.message && css`
    .c-user-info{
      .o-user-info__detail{
        display: none;
      }

      .o-user-info__time{
        display: block;
        color: ${({theme})=>theme.color.grey};
        font-weight: 500;
      }
    }
    `
  };

`

export default StyledUserInfo