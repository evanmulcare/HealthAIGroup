import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardScreen from './Pages/DashboardScreen';
import PatientsScreen from './Pages/PatientsScreen';
import LoginScreen from './Pages/LoginScreen';
import ExitScreen from './Pages/ExitScreen';
import HealthAIScreen from './Pages/HealthAIScreen';

import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

import ProfilePage from './Pages/ProfilePage';

import { useStateContext } from './Contexts/ContextProvider';
function App() {

  const { currentUser } = useContext(AuthContext);
  const { activeMenu } = useStateContext();


  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/signin' />;
  };


  return (
    <div >
      <BrowserRouter>
        <ToastContainer />
        <ToastContainer />
        <div className='flex'>
          <div className={activeMenu ? 'w-72 fixed h-screen bg-white' : 'w-0'}>
            <Sidebar />
          </div>



          <div className={`bg-gray-50 min-h-screen flex-1 ${activeMenu ? 'ml-72' : ''}`}>

            <div className='fixed md:static bg-gray-50  w-full'>
              <Navbar />
            </div>

            <div className=''>

              <Routes>
                <Route path='/' element={<Navigate to='/signin' />} />
                <Route path='/signin' element={<LoginScreen />} />
                <Route path='/Dashboard' element={<RequireAuth><DashboardScreen /></RequireAuth>} />

                <Route path='/Patients' element={<RequireAuth><PatientsScreen /></RequireAuth>} />
                <Route path='/HealthAI' element={<RequireAuth><HealthAIScreen /></RequireAuth>} />

                <Route path='/Profile' element={<RequireAuth><ProfilePage /></RequireAuth>} />
                <Route path='/Exit' element={<RequireAuth><ExitScreen /></RequireAuth>} />

                <Route path='*' element={<Navigate to='/' />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
