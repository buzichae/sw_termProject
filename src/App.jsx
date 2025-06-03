import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LogInPage from './pages/LoginPage';
import ReservationPage from './pages/ReservationPage';
import MyPage from "./pages/MyPage";
import './App.css'

function App() {

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/reservation" element={<ReservationPage/>} />
          <Route path="/MyReserve" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
