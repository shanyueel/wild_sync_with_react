import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

import StyledActivityCreateModal from "modals/StyledActivityCreateModal"

import { ReactComponent as WildSyncLogo } from "assets/icons/WildSyncLogo.svg"
import { ReactComponent as SearchIcon } from "assets/icons/SearchIcon.svg"
import { ReactComponent as ListIcon } from "assets/icons/ListIcon.svg"
import { ReactComponent as LoginIcon } from "assets/icons/LoginIcon.svg"
import { ReactComponent as PlusIcon } from "assets/icons/PlusIcon.svg"
import { ReactComponent as LogoutIcon } from "assets/icons/LogoutIcon.svg"
import { ReactComponent as SettingIcon } from "assets/icons/SettingIcon.svg"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "api/auth"
import { resetUser } from "reducers/userSlice"
import StyledAccountUpdateModal from "modals/StyledAccountUpdateModal"

const Navbar = ({ className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchbarRef = useRef(null)
  const user = useSelector((state)=> state.user)
  const navIconsRef = useRef([])
  const [isActivityCreateModalOpen, setIsActivityCreateModalOpen] = useState(false)
  const [isAccountUpdateModalOpen, setIsAccountUpdateModalOpen] = useState(false)

  useEffect(()=>{
    if(isActivityCreateModalOpen || isAccountUpdateModalOpen){
      document.querySelector('body').classList.add('no-scroll')
      document.querySelector('html').classList.add('no-scroll')
    }else{
      document.querySelector('body').classList.remove('no-scroll')
      document.querySelector('html').classList.remove('no-scroll')
    }
  },[isActivityCreateModalOpen, isAccountUpdateModalOpen])

  const handleSearchEnter = (e) => {
    if(e.key === "Enter") handleSearch()
  }

  const handleSearch = (e) => {
    if(searchbarRef.current.value.length === 0) return
    navIconsRef.current[0].checked = false
    const keyword = searchbarRef.current.value
    navigate(`/activity/search?keyword=${keyword}`)
    searchbarRef.current.value = ""
  }
  
  const handleNavbarIconChange = (e) => {
    const checkboxes = document.getElementsByName("navbar-icons")
    checkboxes.forEach((checkbox) => {
      if (checkbox !== e.target) {
        checkbox.checked = false
      }
    })
  } 

  const handleActivityCreateClick = () => {
    navIconsRef.current[0].checked = false
    navIconsRef.current[1].checked = false
    navIconsRef.current[3].checked = false
    setIsActivityCreateModalOpen(true)
  }

  const handleAccountSetting = () => {
    setIsAccountUpdateModalOpen(true)
    navIconsRef.current[3].checked = false
  }
  
  const handleLogin = () => {
    navigate(`/login`)
    navIconsRef.current[3].checked = false
  }

  const handleRegister = () => {
    navigate(`/register`)
    navIconsRef.current[3].checked = false
  }

  const handleLogout = async () => {
    const { success } = await logout()
    
    if(success){
      dispatch(resetUser())
      toast.success('已成功登出', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      window.location.reload()
    }

    navIconsRef.current[3].checked = false
  }
  
  return(
    <div className={className}>
      <div className="l-navbar">
        <Link className="c-navbar__title" to="/">
          <WildSyncLogo className="o-navbar__logo" fill="#3F6F41"/>
          <h1 className="o-navbar__brand">Wild Sync</h1>
        </Link>
        <div className="o-navbar__searchbar">
          <input type='search' placeholder="登山路線、營地、潛水處" ref={searchbarRef} onKeyUp={handleSearchEnter}/>
          <button onClick={handleSearch}><SearchIcon /></button>
        </div>
        <ul className="c-navbar__list">
          <Link to="/activity/search"><li className="o-navbar__item">活動列表</li></Link>
          <Link to="/guide"><li className="o-navbar__item">使用指南</li></Link>
          <Link to="/about"><li className="o-navbar__item">關於我們</li></Link>
        </ul>
        <div className="c-navbar__icons">
          <div className="o-navbar__icon">
            <input name="navbar-icons" type="checkbox" id="o-navbar__search-icon" ref={(element)=>navIconsRef.current[0] = element} onChange={handleNavbarIconChange}/>
            <label htmlFor="o-navbar__search-icon"><SearchIcon /></label>
          </div>
          <div className="o-navbar__icon">
            <input name="navbar-icons" type="checkbox" id="o-navbar__list-icon" ref={(element)=>navIconsRef.current[1] = element} onChange={handleNavbarIconChange}/>
            <label htmlFor="o-navbar__list-icon"><ListIcon /></label>
          </div>
          { user.loggedIn &&
            <div className="o-navbar__icon">
              <label><PlusIcon onClick={handleActivityCreateClick}/></label>
            </div>
          }


          <div className="o-navbar__icon">
            <input name="navbar-icons" type="checkbox" id="user-icon" ref={(element)=>navIconsRef.current[3] = element} onChange={handleNavbarIconChange}/>
            <label htmlFor="user-icon"><img src={user?.photoURL||require('assets/images/userDefaultImage.png')} alt="user-icon"/></label>
            <div className="l-navbar__user-dropdown">
              {user.uid?
              <Link to={`/user/${user.uid}`} onClick={()=>{navIconsRef.current[3].checked = false}}>
                <img className="o-navbar__user-avatar" src={user?.photoURL} alt="user-avatar" />
              </Link>
              :<img className="o-navbar__user-avatar not-user" src={require("assets/images/userDefaultImage.png")} alt="user-avatar" />}
              <h2 className="o-navbar__user-name">{user.displayName}</h2>
              
              <ul className="l-navbar__user-dropdown-body">
                {user.loggedIn?
                  <>
                    <li className="c-navbar__account-setting" onClick={handleAccountSetting}><SettingIcon/>帳戶設定</li>
                    <li className="c-navbar__logout" onClick={handleLogout}><LogoutIcon/>帳戶登出</li>
                  </>
                  :
                  <>
                    <li className="c-navbar__login" onClick={handleLogin}><LoginIcon/> 帳號登入</li>
                    <li className="c-navbar__register" onClick={handleRegister}><PlusIcon/> 帳號註冊</li>
                  </>}
              </ul>
              
              <StyledActivityCreateModal isActivityCreateModalOpen={isActivityCreateModalOpen}  setIsActivityCreateModalOpen={setIsActivityCreateModalOpen}/>
              <StyledAccountUpdateModal isAccountUpdateModalOpen={isAccountUpdateModalOpen} setIsAccountUpdateModalOpen={setIsAccountUpdateModalOpen}/>
            </div>
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
    z-index: 5;

    .l-navbar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: auto .75rem;

      .c-navbar__title{
        display: flex;
        height: 1.5rem;

        .o-navbar__logo{
          fill: ${({theme})=> theme.color.default};
        }

        .o-navbar__brand{
          margin-left: .5rem;
          color: ${({theme})=> theme.color.default};
          font-weight: 500;
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
        z-index: 1;
        
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
        position: relative;
        display: block;
        display: flex;
        height: 2rem;
        gap: .5rem;
        justify-content: center;
        align-items: center;
        
        .o-navbar__icon{
          input{
            display: none;
          }

          label{
            width: 100%;
            height: 100%;
            
            svg{
              width: 1.5rem;
              height: 1.5rem;
              margin: 0.375rem;
              fill: ${({theme})=> theme.color.default};
            }

            img{
              width: 1.75rem;
              height: 1.75rem;
              margin: 0.25rem;
              border: 3px solid ${({theme})=> theme.color.default};
              border-radius: 50%;
            }

            &:hover{
              cursor: pointer;
            }
          }

          &:nth-child(3) label svg{
            width: 1.5rem;
            height: 1.5rem;
            margin: 0.25rem;
          }

          .l-navbar__user-dropdown{
            display: none;
          }

          &:has(input:checked){

            .l-navbar__user-dropdown{
              position: absolute;
              top:2.25rem;
              right: 1rem;
              display: block;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: .75rem;
              width: 10rem;
              height: fit-content;
              padding: .75rem;
              border-radius: .75rem 0 .75rem .75rem;
              background-color: ${({theme})=> theme.backgroundColor.default};
              box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
              
              .o-navbar__user-avatar{
                width: 3rem;
                height: 3rem;
                object-fit: cover;
                border: 5px solid ${({theme})=> theme.color.default};
                border-radius: 50%;
                margin-top: .75rem;
              }

              .not-user{
                cursor: default;
              }

              .o-navbar__user-name{
                color: ${({theme})=> theme.color.default};

              }

              .l-navbar__user-dropdown-body{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-top: 1px solid grey;
                padding-top: .75rem;
                gap: .75rem;

                li{
                  width: 6rem;
                  height: 1.5;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-weight: 700;
                  color: ${({theme})=> theme.color.default};
                  cursor: pointer;
                  
                  svg{
                    width: 1.25rem;
                    margin-right: .5rem;
                    fill:${({theme})=> theme.color.default};
                  }
                }
              }
            }
          }
        }

        .o-navbar__create-btn{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.75rem;
          height: 1.75rem;
          margin: auto;
          border-radius: 8px;
          color: ${({theme})=> theme.color.default};
          background-color: white;
          border: 1.5px solid ${({theme})=> theme.color.default};
          font-weight: 700;
          cursor: pointer;

          &:hover{
            color: white;
            background-color: ${({theme})=> theme.color.default};
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
        grid-template-columns: 10.5rem 16rem 1fr auto;
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
          
          .o-navbar__icon:first-child{
            display: none;
          }

          .o-navbar__create-btn{
            width: 6rem;
          }
        }
      }

      
    }

    @media screen and (min-width: 1024px){
      .l-navbar{
        display: grid;
        grid-template-columns: 10.5rem 16rem 1fr auto;
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
          gap: .75rem;
          
          .o-navbar__icon:nth-child(2){
            display: none;
          }
        }
      }
    }
`

export default StyledNavbar