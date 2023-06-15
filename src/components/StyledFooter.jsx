import clsx from "clsx"
import styled from "styled-components"
import StyledTextLink from "./StyledTextLink"
import { Link } from "react-router-dom"

import {ReactComponent as WildSyncLogo} from "assets/icons/WildSyncLogo.svg"
import {ReactComponent as LineIcon} from "assets/icons/LineIcon.svg"
import {ReactComponent as MailIcon} from "assets/icons/MailIcon.svg"
import {ReactComponent as LinkedInIcon} from "assets/icons/LinkedInIcon.svg"

const Footer = ({className}) =>{
  const pathname = window.location.pathname

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
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: ${({theme}) => theme.color.default};


  .c-footer__content{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    margin: 0 auto 2rem;
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
        color: white;
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
          border-radius: 50%;
          background-color: white;
          
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
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 2rem;
    background-color: ${({theme})=> theme.color.black};
    text-align: center;
    line-height: 2rem;
    
    p{
      color: white;
    }
  }



  @media screen and (min-width: 768px) {

    .c-footer__content{
      display: grid;
      grid-template-columns: 27rem auto 12rem;
      grid-template-rows: 3rem 3rem;
      grid-template-areas: 
      'nav . contact'
      'title . contact';
      height: 8rem;
      padding: .75rem 1rem 2rem;
      align-items: center;
      
      .c-footer__nav-area{
        width: fit-content;
        grid-area: nav;
        .c-footer__nav-list{
          width: fit-content;
          display: flex;
          gap: 20px;
          .o-footer__nav-item{
            position: relative;
            width: fit-content;
            color: white;
            border-bottom: none;

            &::after{
              position: absolute;
              right: -10px;
              width: 2px;
              height: 1.25rem;
              border-radius: .5rem;
              content: '';
              background-color: white;
            }

            &:last-child::after{
              display: none;
            }
          }
        }
      }

      .c-footer__title{
        display: flex;
        align-items: center;
        grid-area: title;

        .o-footer__logo{
          height: 2.25rem;
        }

        .o-footer__brand{
          margin-left: .5rem;
          color: white;
          font-size: 2rem;
        }
      }

      .c-footer__contact-area{
        grid-area: contact;
        justify-content: space-between;
        align-items: flex-end;
        height: 5rem;
        margin-bottom:  0;

        
        
        .o-footer__contact-title{
          font-size: 1.25rem;
          margin-bottom: 0;
        }
      }

      .c-footer__license{
        grid-area: license;
      }
    }


  }

  @media screen and (min-width: 1400px) {
    .c-footer__content{
      padding: .75rem calc((100vw - 1400px) / 2 + 1rem) 2rem;
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