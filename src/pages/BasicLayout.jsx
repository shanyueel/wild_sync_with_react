import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import StyledNavbar from "components/StyledNavbar"
import StyledFooter from "components/StyledFooter"

import { setWindowSize } from "reducers/environmentSlice"

import 'react-toastify/dist/ReactToastify.css';
import { resetUser, initUser } from "reducers/userSlice";
import { auth } from "api/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const BasicLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const activitiesRef = useRef(null)

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
  });

  onAuthStateChanged(auth, (user)=>{
    if (user) {
      const user = auth.currentUser 
      dispatch(initUser({
        uid: user?.uid,
        email: user?.email,
        displayName:user?.displayName,
        photoURL:user?.photoURL,
      }))
    } else {
      dispatch(resetUser())
    }
  })


  
  
  return(
    <>
      <StyledNavbar activitiesRef={activitiesRef} />
      <div className={licenseOnly?"l-web-container--license-only":"l-web-container"}>
        <Outlet />
      </div>
      <StyledFooter/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default BasicLayout