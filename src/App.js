import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Modal from 'react-modal';
import './App.css';

import BasicLayout from 'pages/BasicLayout';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import RegisterPage from 'pages/RegisterPage';
import ActivityPage from 'pages/ActivityPage';
import SearchActivityPage from 'pages/ActivitySearchPage';
import UserPage from 'pages/UserPage'
import ActivityPageDiscussionListArea from 'pages/ActivityPageDiscussionListArea';
import ActivityPageDiscussionArea from 'pages/ActivityPageDiscussionArea'
import ScrollToTop from 'utils/ScrollToTop';
import NotFoundPage from 'pages/NotFoundPage';
import GuidePage from 'pages/GuidePage';
import AboutPage from 'pages/AboutPage';

const theme = {
  color:{
    default: "#3F6F41",
    secondary: "#6FAE71",
    grey: "#7B7B7B",
    black: "#272727",
    alert: "#D0342C"
  },
  backgroundColor:{
    default: '#F0F0F0',
    secondary: '#ADADAD'
  }
}

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter basename="/wild_sync_with_react">
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="activity">
                <Route path=":activityId" element={<ActivityPage />} >
                  <Route index element={<ActivityPageDiscussionListArea />} />
                  <Route path='chatroom/:chatroomId' element={<ActivityPageDiscussionArea />}/>
                </Route>
                <Route path="search" element={<SearchActivityPage />} />
              </Route>
              <Route path="user/:userId" element={<UserPage />} />
              <Route path="guide" element={<GuidePage/>}/>
              <Route path="about" element={<AboutPage/>}/>
              <Route path="*" element={<NotFoundPage />}/>
            </Route>
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
