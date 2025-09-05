import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';
import { pageTransition } from './animations/routes';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const location = useLocation();


  return (
    <div className='app flex items-center justify-center w-full h-full'>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/home"
            element={
              <motion.div {...pageTransition}>
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div {...pageTransition}>
                <RegisterPage />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div {...pageTransition}>
                <LoginPage />
              </motion.div>
            }
          />
          <Route
            path="/"
            element={
              <motion.div {...pageTransition}>
                <WelcomePage />
              </motion.div>
            }
          />
          <Route
            path="/error"
            element={
              <motion.div {...pageTransition}>
                <ErrorPage />
              </motion.div>
            }
          />
          <Route
            path="/loading"
            element={
              <motion.div {...pageTransition}>
                <LoadingPage />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;