import StyledButton from "components/StyledButton"
import StyledUserInfo from "components/StyledUserInfo"
import styled from "styled-components"

import {ReactComponent as ReturnIcon} from "assets/icons/ReturnIcon.svg"
import {ReactComponent as EllipsisIcon} from "assets/icons/EllipsisIcon.svg"
import { Link } from "react-router-dom"
import StyledHorizontalActivityCard from "components/StyledHorizontalActivityCard"
import StyledUserCard from "components/StyledUserCard"

const UserPage = ({className}) => {
  return(
    <div className={className}>
      <div className="l-web-container__main">
        <div className="l-user__header">
          <Link><ReturnIcon className="o-user-header__return"/></Link>
          <StyledUserInfo className="c-user-header__user-info"/>
          <EllipsisIcon className="o-user-header__more"/>
        </div>
        <div className="l-user__main">
          <img className="o-user__cover-image" src={require("assets/images/userDefaultCover.jpg")} alt="user-cover"/>
          <img className="o-user__avatar" src={require("assets/images/userDefaultImage.png")} alt="user-avatar"/>
          <div className="l-user__info">
            <h1 className="o-user__name">Daisy</h1>
            <h3 className="o-user__account">@daisy1234</h3>
            <p className="o-user__introduction">
              我是一位熱愛登山的夢想家。希望能在這個平台上結交志同道合的夥伴，一同征服大自然的奇妙，共享挑戰與成就。期待與你們相遇，共創難忘的登山冒險！
            </p>
            <div className="l-user__stats">

            </div>
            <StyledButton className="o-user__edit-button" outlined>編輯個人資料</StyledButton>
          </div>
          
          <div className="l-user-activities">

            <div className="l-user-activities__navbar">
              <label htmlFor="participation" className="o-user-activities__nav-item">
                <input type="radio" name="user-activities" id="participation" defaultChecked />參與紀錄
              </label>

              <label htmlFor="favorite" className="o-user-activities__nav-item">
                <input type="radio" name="user-activities" id="favorite" />喜愛活動
              </label>

              <label htmlFor="host" className="o-user-activities__nav-item">
                <input type="radio" name="user-activities" id="host" />主辦經驗
              </label>
            </div>
            
            <div className="l-user-activities__container">
              <StyledHorizontalActivityCard />
              <StyledHorizontalActivityCard />
              <StyledHorizontalActivityCard />
            </div>

          </div>
        </div>


      </div>
      <div className="l-web-container__side">
          <div className="l-holder-recommendation">
            <h2 className="o-holder-recommendation__title">熱門主辦者</h2>
            <div className="l-holder-recommendation__container">
               <StyledUserCard />
               <StyledUserCard />
               <StyledUserCard />
               <StyledUserCard />
               <StyledUserCard />
               <StyledUserCard />
            </div>
          </div>
      </div>
    </div>
  )
}

const StyledUserPage = styled(UserPage)`
  width: 100%;
  height: 100%;

  .l-web-container{
    &__side{
      .o-holder-recommendation__title{
        color: ${({theme})=>theme.color.default};
        font-weight: 700;
      }

      .l-holder-recommendation__container{
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
      }
    }

    &__main{
      position: relative;

      .l-user__header{
        width: 100%;
        display: flex;
        align-items: center;
        height: 4rem;
        border-bottom: 1px solid ${({theme})=> theme.backgroundColor.default};

        svg{
          width: 1.5rem;
          height: 1.5rem;
          fill: ${({theme})=>theme.color.default}
        }

        .c-user-header__user-info{
          margin-left: 1rem;
          margin-right: auto;
        }
      }
 
      .l-user__main{
        margin-top: 12.5rem;
        
        .l-user__info{
          position: relative;
          padding: 0 1rem;
        }

        .o-user{
          &__cover-image{
            position: absolute;
            left: 0;
            top: 4rem;
            width: 100%;
            height: 10rem;
            object-fit: cover;
          }

          &__avatar{
            position: absolute;
            top: 11rem;
            left: 1.25rem;
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            z-index: 1;
          }

          &__name, &__account{
            color: ${({theme})=> theme.color.default};
          }

          &__account{
            margin-top: .25rem;
          }

          &__introduction{
            margin-top: 1rem;
          }

          &__edit-button{
            position: absolute;
            width: 40%;
            top: .25rem;
            right: 1rem;
          }
        }
        
        .l-user-activities{
          &__navbar{
            display: grid;
            grid-template-columns: repeat(3,1fr);
            gap: .25rem;
            justify-content: space-between;
            margin-top: 2rem;
            
            .o-user-activities__nav-item{
              position: relative;
              height: 3rem;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1rem;
              font-weight: 700;
              border-radius: .25rem .25rem 0 0;
              color: ${({theme})=> theme.color.default};
              background-color: ${({theme})=> theme.backgroundColor.default};
              cursor: pointer;

              input{
                display: none;
              }

              label{

              }

              &:has(input:checked){
                background-color: ${({theme})=> theme.color.default};
                  color: white;            

                &::after{
                  position: absolute;
                  content:"";
                  background-color: ${({theme})=> theme.color.default};
                  width: 100%;
                  height: 1rem;
                  top: 2.75rem;
                  left: 0;
                  right: 0;
                }
              } 
            }
          }

          &__container{
            display: flex;
            flex-direction: column;
            gap: .75rem;
            margin-top: .5rem;
            padding: .75rem .5rem;
            background-color: ${({theme})=>theme.color.default};
            margin-bottom: 5rem;
            border-radius: 0 0 .25rem .25rem;
          }
        }

      }
    }
  }

  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`

export default StyledUserPage