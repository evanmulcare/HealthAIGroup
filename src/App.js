import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  DashboardScreen,
  AllPatientsScreen,
  LoginScreen,
  ExitScreen,
  ProfilePage,
  IndividualPatientScreen,
  ChatbotScreen,
  InvitePatientScreen
} from './Pages';

import Navbar from './Components/Navbar';
import FileComponent from './Components/FileSystemPartials/FileComponent';

function App() {

  const currentUser = useSelector((state) => state.auth.currentUser);
  
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/signin' />;
  };

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Navigate to='/signin' />} />

            <Route path='/signin' element={<LoginScreen />} />
        
            <Route path='/Dashboard' element={<RequireAuth><DashboardScreen /></RequireAuth>} />
            <Route path='/Patients' element={<RequireAuth><AllPatientsScreen /></RequireAuth>} />
            <Route path='/invite' element={<RequireAuth><InvitePatientScreen /></RequireAuth>} />

            <Route path='/Patients/:patientId' element={<RequireAuth><IndividualPatientScreen /></RequireAuth>} />
            <Route path='/Patients/:patientId/:category/:folderId' element={<RequireAuth><IndividualPatientScreen /></RequireAuth>} />
            <Route path='/file/:fileId' element={<RequireAuth><FileComponent /></RequireAuth>} />
            <Route path='/HealthAI' element={<RequireAuth><ChatbotScreen /></RequireAuth>} />
            <Route path='/Profile' element={<RequireAuth><ProfilePage /></RequireAuth>} />
            <Route path='/Exit' element={<RequireAuth><ExitScreen /></RequireAuth>} />

            <Route path='*' element={<LoginScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
