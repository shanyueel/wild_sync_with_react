import styled from "styled-components"
import { useDispatch } from "react-redux"
import { setPathname } from "reducers/pathnameSlice"

import StyledNavbar from "components/StlyedNavbar"
import StyledFooter from "components/StyledFooter"
import StyledTextInput from "components/StyledTextIpnut"
import StyledButton from "components/StyledButton"
import StyledTextLink from "components/StyledTextLink"

import {ReactComponent as WildSyncLogo} from "assets/icons/WildSyncLogo.svg"
import registerImage from "assets/images/loginImage.png"

const RegisterPage = ({className})=>{
  const dispatch = useDispatch();
  dispatch(setPathname())

  return(
    <div className={className}>
      <StyledNavbar />
      <div className="l-web-container">
        <div className="l-register-area">
          <div className="l-register-area__main">
            <div className="l-register-area__title">
              <WildSyncLogo className="o-register-area__logo"/>
              <h1 className="o-register-area__brand">Wild Sync</h1>
            </div>
            <div className="l-register-area__input">
              <StyledTextInput title='信箱' placeholder="請輸入信箱"/>
              <StyledTextInput title='暱稱' placeholder="請輸入暱稱"/>
              <StyledTextInput title='密碼' placeholder="請輸入密碼"/>
              <StyledTextInput title='確認密碼' placeholder="請再次輸入密碼"/>
              
              <StyledButton className="o-register-area__button" title="註冊"/>
              <StyledTextLink className="o-register-area__login-link" text="已經註冊過?" destination="/login" />
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

const StyledRegisterPage = styled(RegisterPage)`
  .l-register-area{
    position: fixed;
    top: 52%;
    left: 50%;
    width: 90%;
    height: 32rem;
    margin: 0 auto;
    border-radius: .5rem;
    transform: translate(-50%,-50%);

    .l-register-area__main{
      padding: 0 2rem 2rem;

      .l-register-area__title{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1.25rem;

        .o-register-area__logo{
            width: 7rem;
            fill: ${({theme}) => theme.color.default};
        }
        .o-register-area__brand{
          margin-top: .5rem;
          font-size: 1.75rem;
          color: ${({theme}) => theme.color.default};
        }
      }

      .l-register-area__input{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        .o-register-area__button{
          margin-top: .75rem;
        }

        .o-register-area__login-link{
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
      height: 36rem;
      top: 50%;
      width: 85%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
      background-color: ${({theme}) => theme.backgroundColor.default};
      .l-register-area__main{
        width: 45%;
        padding-top: 2.25rem;
      }

      .l-register-area__image{
        width:55%;
        background-image: url(${registerImage});
        background-size: cover;
        background-position: center;
        display: block;
        border-radius: 0 .5rem .5rem 0;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .l-register-area{
      width: 80%;
      height: 40rem;
      max-width: 1120px;

      .l-register-area__main{
        padding-top: 3.5rem;
      }
    }
  }
`

export default StyledRegisterPage