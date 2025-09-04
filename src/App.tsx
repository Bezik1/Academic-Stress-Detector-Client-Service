import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import WelcomePage from './pages/WelcomePage'

const App = () =>{

  return (
    <div className='app flex items-center justify-center'>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  )
}

export default App
