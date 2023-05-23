import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';

import LoginPage from 'pages/LoginPage';
import HomePage from 'pages/HomePage';

const theme = {
  color:{
    default: "#3F6F41",
  },
  backgroundColor:{
    default: '#F0F0F0'
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
