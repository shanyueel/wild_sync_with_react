import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"

import StyledNavbar from "components/StyledNavbar"
import StyledFooter from "components/StyledFooter"

import { setWindowSize } from "reducers/environmentSlice"

const BasicLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const pathname = location.pathname
  const licenseOnly = (pathname === "/login") || (pathname === "/register")
  

useEffect(() => {
  const handleResize = () => {
    dispatch(setWindowSize({ windowWidth: window.innerWidth }));
  };

  window.addEventListener("resize", handleResize);
  dispatch(setWindowSize({ windowWidth: window.innerWidth }));

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  
  return(
    <>
      <StyledNavbar/>
      <div className={licenseOnly?"l-web-container--license-only":"l-web-container"}>
        <Outlet />
      </div>
      <StyledFooter/>
    </>
  )
}

export default BasicLayout