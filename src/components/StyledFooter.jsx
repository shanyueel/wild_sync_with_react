import clsx from "clsx"
import styled from "styled-components"
import StyledTextLink from "./StyledTextLink"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import {ReactComponent as WildSyncLogo} from "assets/icons/WildSyncLogo.svg"
import {ReactComponent as LineIcon} from "assets/icons/LineIcon.svg"
import {ReactComponent as MailIcon} from "assets/icons/MailIcon.svg"
import {ReactComponent as LinkedInIcon} from "assets/icons/LinkedInIcon.svg"

const Footer = ({className}) =>{
  const { pathname } = useSelector((state)=> state.pathname)

  return(
    <div className={className}>
      <div className={clsx('c-footer__content',{'--hidden': pathname === '/login' || pathname === '/register'})}>
        <div className="c-footer__nav-area">
          <ul className="c-footer__nav-list">
            <li className="o-footer__nav-item"><StyledTextLink text="關於Wild Sync" destination="/about" /></li>
            <li className="o-footer__nav-item"><StyledTextLink text="社群守則" destination="/rules" /></li>
            <li className="o-footer__nav-item"><StyledTextLink text="使用指南" destination="/guide" /></li>
            <li className="o-footer__nav-item"><StyledTextLink text="常見問題" destination="/faq" /></li>
          </ul>
        </div>

        <div className="c-footer__title">
          <WildSyncLogo className="o-footer__logo" fill="#fff"/>
          <p className="o-footer__brand">Wild Sync</p>
        </div>
        
        <div className="c-footer__contact-area">
          <p className="o-footer__contact-title">聯繫我們</p>
          <div className="c-footer__contact-icons">
            <Link className="o-footer__contact-icon" to="/contact"><MailIcon /></Link>
            <Link className="o-footer__contact-icon" to="/contact"><LineIcon /></Link>
            <Link className="o-footer__contact-icon" to="/contact"><LinkedInIcon /></Link>
          </div>
        </div>

      </div>
      <div className="c-footer__license">
          <p>Wild Sync © 2023 Co., LTD. All rights reserved.</p>
      </div>
    </div>
  )
}

const StyledFooter = styled(Footer)`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: ${({theme}) => theme.color.default};


  .c-footer__content{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    padding-bottom: 2rem;
    color: white;
    
    .c-footer__nav-area{
       width: 100%;
      .c-footer__nav-list{
        width: 100%;
        .o-footer__nav-item{
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 1rem 0;
          border-bottom: 1px solid white;
          font-size: 1.25rem;
        }
      }
    }

    .c-footer__title{
      display: none;
    }
    
    .c-footer__contact-area{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 1rem 0;

      .o-footer__contact-title{
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }

      .c-footer__contact-icons{
        display: flex;
        gap: 1.5rem;
        .o-footer__contact-icon{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 3rem;
          height: 3rem;
          background-color: white;
          border-radius: 50%;

          svg{
            width: 1.5rem;
            fill: ${({theme})=> theme.color.default}
          }
        }
      }
    }


    }

  .c-footer__license{
    position: absolute;
    bottom:0;
    width: 100%;
    height: 2rem;
    background-color: ${({theme})=> theme.color.black};
    text-align: center;
    line-height: 2rem;

    p{
      color: white;
    }
  }

  @media screen and (min-width: 768px) {
    height: 11rem;


    .c-footer__content{
      position: relative;
      height: 9rem;
      padding: .5rem 1rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      
      .c-footer__nav-area{
        width: auto;
        grid-area: nav;
        .c-footer__nav-list{
          width: auto;
          display: flex;
          gap: 20px;
          .o-footer__nav-item{
            position: relative;
            width: auto;
            color: white;
            border-bottom: none;

            &::after{
              position: absolute;
              right: -10px;
              content: '';
              width: 2px;
              height: 1.25rem;
              border-radius: .5rem;
              background-color: white;
            }

            &:last-child::after{
              display: none;
            }
          }
        }
      }

      .c-footer__title{
        position: absolute;
        bottom: 2rem;
        left: 1rem;
        display: flex;
        align-items: center;
        margin-top: 1.5rem;
        .o-footer__logo{
          height: 2.5rem;
        }

        .o-footer__brand{
          color: white;
          font-size: 2.5rem;
          margin-left: 1rem;
        }
      }

    .c-footer__contact-area{
      justify-content: space-between;
      align-items: flex-end;
      height: 6rem;
      
      .o-footer__contact-title{
        color: white;
      }
    }
    }


  }

  @media screen and (min-width: 1400px) {
    .c-footer__content{
      max-width: 1400px;
      margin: 0 auto;
    }
  }

  .--hidden{
    display: none;
  }

  &:has(.--hidden){
    background-color: transparent;
  }
`

export default StyledFooter