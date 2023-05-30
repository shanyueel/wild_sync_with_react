import styled from "styled-components"
import { Link } from "react-router-dom"

import { ReactComponent as WildSyncLogo } from "assets/icons/WildSyncLogo.svg"
import { ReactComponent as SearchIcon } from "assets/icons/SearchIcon.svg"
import { ReactComponent as ListIcon } from "assets/icons/ListIcon.svg"
import { ReactComponent as UserIcon } from "assets/icons/UserIcon.svg"

const Navbar = ({ className }) => {
  return(
    <div className={className}>
      <div className="l-navbar">
        <Link className="c-navbar__title" to="/">
          <WildSyncLogo className="o-navbar__logo" fill="#3F6F41"/>
          <h1 className="o-navbar__brand">Wild Sync</h1>
        </Link>
        <div className="o-navbar__searchbar">
          <input placeholder="登山路線、露營地、潛水處"/>
          <button><SearchIcon /></button>
        </div>
        <ul className="c-navbar__list">
          <li className="o-navbar__item">活動內容</li>
          <li className="o-navbar__item">貼文分享</li>
          <li className="o-navbar__item">新手上路</li>
          <li className="o-navbar__item">關於我們</li>
        </ul>
        <div className="c-navbar__icons">
          <div className="o-navbar__icon">
            <input name="navbar-icons" type="checkbox" id="o-navbar__search-icon"></input>
            <label for="o-navbar__search-icon"><SearchIcon /></label>
          </div>
          <div className="o-navbar__icon">
            <input name="navbar-icons" type="checkbox" id="o-navbar__list-icon"></input>
            <label for="o-navbar__list-icon"><ListIcon /></label>
          </div>
          <div className="o-navbar__icon">
            <input name="navbar-icons" type="checkbox" id="o-navbar__user-icon"></input>
            <label for="o-navbar__user-icon"><UserIcon /></label>
          </div>
        </div>
      </div>
    </div>

  )
}

const StyledNavbar = styled(Navbar)`
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid #E0E0E0;
    background-color: white;

    .l-navbar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1400px;
      margin: auto 1rem;

      .c-navbar__title{
        display: flex;
        height: 1.5rem;

        .o-navbar__logo{
          fill: ${({theme})=> theme.color.default};
        }

        .o-navbar__brand{
          margin-left: .5rem;
          color: ${({theme})=> theme.color.default};
        }
      }

      .o-navbar__searchbar{
        position: fixed;
        top: 4rem;
        left:0;
        display:flex;
        justify-content: space-between;
        width: 100%;
        height: 3rem;
        padding: .5rem 1rem;
        background-color: ${({theme})=> theme.backgroundColor.default};
        transform: scale(1,0);

        input{
          height: 100%;
          width: 80%;
          border:none;
          background-color: transparent;

          &:focus, &:hover{
            border-bottom: 0.5px solid ${({theme})=> theme.color.default};
          }
        }

        button{
          width: 15%;
          border-radius: 1rem;
          border: none;
          background-color: ${({theme})=> theme.color.default};
          cursor: pointer;

          svg{
            height: 1rem;
            margin: .5rem;
            fill: #fff;
          }
        }
      }
      
      .c-navbar__list{
        position: fixed;
        top: 4rem;
        left:0;
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: ${({theme})=> theme.backgroundColor.default};
        transform: scale(1,0);
        
        li{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 3rem;
          border-bottom: 1px solid white;
          font-weight: 700;
          color:${({theme})=> theme.color.default};

          &:hover{
            background-color: #D0D0D0;
          }
        }
      }

      .c-navbar__icons{
        display: grid;
        grid-template-columns:repeat(3,2rem);
        grid-template-rows: 2rem;
        grid-gap: 1rem;
        fill: ${({theme})=> theme.color.default};
        
        input{
          display: none;
        }
        
        label{
          width: 100%;
          height: 100%;
          

          svg{
            width: 1.5rem;
            height: 1.5rem;
            margin: 0.25rem;
          }

          &:hover{
            cursor: pointer;
            
            svg{
              stroke:${({theme})=> theme.color.default};
              stroke-width: 1px;
              stroke-opacity: 0.5;
            }
          }
        }
      }

      &:has(#o-navbar__search-icon:checked){
        .o-navbar__searchbar{
          transition: transform .3s ease-out;
          transform: scale(1,1);
          transform-origin: top;
        }
      }

      &:has(#o-navbar__list-icon:checked){
        .c-navbar__list{
          transition: transform .4s ease-out;
          transform: scale(1,1);
          transform-origin: top;
        }
      }
    }

    @media screen and (min-width: 768px) {
      .l-navbar{
        display: grid;
        width: 100%;
        grid-template-columns: 10rem 16rem 1fr 5rem;
        grid-template-rows: 100%;
        grid-template-areas: 'title searchBar . icons';
        grid-gap: 1rem;
        
        .c-navbar__title{
          grid-area: title;
        }

        .o-navbar__searchbar{
          position: static;
          grid-area: searchBar;
          width: 16rem;
          height: 2rem;
          padding: 0;
          border-radius: 1rem;
          transform: scale(1,1);
          
          input{
            margin-left: .5rem;
            
            &:focus,&:hover{
              border-bottom: none;
            }
          }

          button{
            width:20%;
          }

          &:has(input:focus){
            box-shadow: 0 0 0 .5px ${({theme})=> theme.color.default};
          }

          &:has(input:hover){
            box-shadow: 0 0 0 .5px ${({theme})=> theme.color.default};
          }
        }

        .c-navbar__icons{
          grid-area: icons;
          grid-template-columns:repeat(2,2rem);
          
          .o-navbar__icon:first-child{
            display: none;
          }
        }
      }

      
    }

    @media screen and (min-width: 1024px){
      .l-navbar{
        display: grid;
        grid-template-columns: 10rem 16rem 1fr 2rem;
        grid-template-rows: 100%;
        grid-template-areas: 'title searchBar . icons';
        grid-gap: 2rem;
        width: 100%;

        .c-navbar__list{
          position: static;
          flex-direction: row;
          background-color: transparent;
          transform: scale(1,1);

          li{
            width: 6rem;
            height:2.5rem;

            &:hover{
              background-color: transparent;
              border-bottom: 2px solid ${({theme})=> theme.color.default};
              cursor: pointer;
            }
          }
        }

        .c-navbar__icons{
          .o-navbar__icon:nth-child(2){
            display: none;
          }
        }
      }
    }
`

export default StyledNavbar