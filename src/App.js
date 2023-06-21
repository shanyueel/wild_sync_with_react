import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';

import BasicLayout from 'pages/BasicLayout';
import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import RegisterPage from 'pages/RegisterPage';
import ActivityPage from 'pages/ActivityPage';
import SearchActivityPage from 'pages/ActivitySearchPage';
import UserPage from 'pages/UserPage'


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

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/activity">
              <Route path=":id" element={<ActivityPage />}/>
              <Route path="search" element={<SearchActivityPage />} />
            </Route>
            <Route path="/user">
              <Route path=":id" element={<UserPage />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
