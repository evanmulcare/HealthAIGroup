import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  DashboardScreen,
  PatientsScreen,
  LoginScreen,
  ExitScreen,
  HealthAIScreen,
  ProfilePage,
} from './Pages';

import { Navbar, Sidebar } from './Components';

import { useStateContext } from './Contexts/ContextProvider';

function App() {

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { activeMenu } = useStateContext();


  const RequireAuth = ({ children }) => {
    if (currentUser == null) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  return (
    <div >
      <BrowserRouter>
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
                <Route
                  path='/Dashboard'
                  element={
                    <RequireAuth>
                      <DashboardScreen />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/Patients'
                  element={
                    <RequireAuth>
                      <PatientsScreen />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/HealthAI'
                  element={
                    <RequireAuth>
                      <HealthAIScreen />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/Profile'
                  element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/Exit'
                  element={
                    <RequireAuth>
                      <ExitScreen />
                    </RequireAuth>
                  }
                />
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
