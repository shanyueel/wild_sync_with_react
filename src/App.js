import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';

import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';
import RegisterPage from 'pages/RegisterPage';

const theme = {
  color:{
    default: "#3F6F41",
    secondary: "#6FAE71",
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
