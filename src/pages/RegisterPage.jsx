import styled from "styled-components"


import StyledNavbar from "components/StyledNavbar"
import StyledFooter from "components/StyledFooter"
import StyledTextInput from "components/StyledTextIpnut"
import StyledButton from "components/StyledButton"
import StyledTextLink from "components/StyledTextLink"

import {ReactComponent as WildSyncLogo} from "assets/icons/WildSyncLogo.svg"
import RegisterImage from "assets/images/loginImage.png"

const LoginPage = ({className})=>{
  return(
    <div className={className}>
      <StyledNavbar />
      <div className="l-web-container--license-only">
        <div className="l-register-area">
          <div className="l-register-area__main">
            <div className="l-register-area__title">
              <WildSyncLogo className="o-register-area__logo"/>
              <h1 className="o-register-area__brand">Wild Sync</h1>
            </div>
            <div className="l-register-area__input">
              <StyledTextInput title='設定信箱' placeholder="請輸入信箱"/>
              <StyledTextInput title='設定暱稱' placeholder="請輸入暱稱"/>
              <StyledTextInput title='設定密碼' placeholder="請輸入密碼"/>
              <StyledTextInput title='確認密碼' placeholder="請再次輸入密碼"/>
              <StyledButton className="o-register-area__button" title="註冊"/>
              <StyledTextLink sm className="o-register-area__register-link" text="已經是Wild Sync會員?" destination="/login" />
            </div>
          </div>
          <div className="l-register-area__image">
          </div>
        </div>
      </div>
      <StyledFooter/>
    </div>

  )
}

const StyledLoginPage = styled(LoginPage)`
  .l-web-container--license-only{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .l-register-area{
    width: 90%;
    border-radius: .5rem;

    .l-register-area__main{
      padding: 0 1rem;

      .l-register-area__title{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2.25rem 0;

        .o-register-area__logo{
          width: 8rem;
          fill: ${({theme}) => theme.color.default};
        }
        .o-register-area__brand{
          margin-top: 1rem;
          font-size: 2rem;
          color: ${({theme}) => theme.color.default};
        }
      }

      .l-register-area__input{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.75rem;

        .o-register-area__button{
          margin-top: 1.5rem;
        }

        .o-register-area__register-link{
          margin-top: 1.5rem;
          line-height: 2rem;
          color: ${({theme})=>theme.color.default};
          text-decoration: underline;
        }
      }
    }
    
    .l-register-area__image{
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    .l-register-area{
      display: flex;
      width: 70%;
      max-width: 1120px;
      margin: 3rem auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
      background-color: ${({theme}) => theme.backgroundColor.default};

      .l-register-area__main{
        width: 45%;
        padding: 0 2.5rem;
        
        .l-register-area__title{
          margin: 3.5rem 0 2.5rem;
        }

        .l-register-area__input{
          margin-bottom: 3.5rem;
        }
      }

      .l-register-area__image{
        display: block;
        width:55%;
        border-radius: 0 .5rem .5rem 0;
        background-image: url(${RegisterImage});
        background-size: cover;
        background-position: center;
      }
    }
  }
`

export default StyledLoginPage