import styled from "styled-components"
import { useState } from "react"
import { toast } from "react-toastify"
import { login } from "api/auth"
import { useNavigate } from "react-router-dom"

import StyledTextInput from "components/inputs/StyledTextInput"
import StyledButton from "components/StyledButton"
import StyledTextLink from "components/StyledTextLink"

import {ReactComponent as WildSyncLogo} from "assets/icons/WildSyncLogo.svg"
import loginImage from "assets/images/loginImage.png"


const LoginPage = ({className})=>{
  const navigate = useNavigate()
  const [loginContent, setLoginContent] = useState({})

  const handleLogin = async (e) => {
    e.preventDefault()
    
    const {success} = await login({
      email: loginContent.email,
      password: loginContent.password
    })

    if(success){
      toast.success('登入成功', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(()=>{
        navigate(`/`)
      },1500)
    }


  }

  return(
    <div className={className}>
      <div className="l-login-area__main">
        <div className="l-login-area__title">
          <WildSyncLogo className="o-login-area__logo"/>
          <h1 className="o-login-area__brand">Wild Sync</h1>
        </div>
        <form className="l-login-area__input">
          <StyledTextInput title='信箱' placeholder="請輸入信箱" inputId="email" formContent={loginContent} onFormChange={setLoginContent} />
          <StyledTextInput title='密碼' placeholder="請輸入密碼" inputId="password" formContent={loginContent} onFormChange={setLoginContent} password />
          <StyledButton className="o-login-area__button" onClick={handleLogin}>登入</StyledButton>
          <StyledTextLink sm className="o-login-area__register-link" text="尚未註冊?" destination="/register" />
        </form>
      </div>
      <div className="l-login-area__image">
      </div>
    </div>
  )
}

const StyledLoginPage = styled(LoginPage)`
    position: relative;
    bottom: 2rem;
    width: 90%;
    border-radius: .5rem;

    .l-login-area__main{
      padding: 0 1rem;

      .l-login-area__title{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2.25rem 0;

        .o-login-area__logo{
          width: 8rem;
          fill: ${({theme}) => theme.color.default};
        }
        .o-login-area__brand{
          margin-top: 1rem;
          font-size: 2rem;
          color: ${({theme}) => theme.color.default};
        }
      }

      .l-login-area__input{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.75rem;

        .o-login-area__button{
          margin-top: 1.5rem;
        }

        .o-login-area__register-link{
          margin-top: 1.5rem;
          line-height: 2rem;
          color: ${({theme})=>theme.color.default};
          text-decoration: underline;
        }
      }
    }
    
    .l-login-area__image{
      display: none;
    }

  @media screen and (min-width: 768px) {
      display: flex;
      width: 70%;
      max-width: 1120px;
      margin: 3rem auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
      background-color: ${({theme}) => theme.backgroundColor.default};

      .l-login-area__main{
        width: 45%;
        padding: 1rem 2rem;
        
        .l-login-area__title{
          margin-bottom: 2rem;
        }

        .l-login-area__input{
          margin-bottom: 3.5rem;
        }
      }

      .l-login-area__image{
        display: block;
        width:55%;
        border-radius: 0 .5rem .5rem 0;
        background-image: url(${loginImage});
        background-size: cover;
        background-position: center;
      }
  }
`

export default StyledLoginPage