import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import WelcomePage from './pages/WelcomePage'
import ProtectedRoute from './security/ProtectedRoute'
import ErrorPage from './pages/ErrorPage'
import LoadingPage from './pages/LoadingPage'

const App = () =>{
  return (
    <div className='app flex items-center justify-center'>
      <Routes>
        <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </div>
  )
}

export default App
