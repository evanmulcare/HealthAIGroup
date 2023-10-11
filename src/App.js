import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DashboardScreen,
  PatientsScreen,
  LoginScreen,
  ExitScreen,
  HealthAIScreen,
  ProfilePage,
  PatientViewScreen,
  NoAccessScreen
} from './Pages';
import { Navbar } from './Components';
import FileComponent from './FileSystem/FileSystemPartials/FileComponent';
import { getUsers } from './Contexts/actionCreators/ userActionCreator';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const selectUsers = (state) => state.users.users;
  const userData = useSelector(selectUsers);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserData = userData.find(user => user.docId === currentUser?.uid);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Navigate to='/signin' />} />

            <Route path='/signin' element={<LoginScreen />} />


            {currentUser && currentUserData && currentUserData.role === 'doctor' && (
              <>
                <Route path='/Dashboard' element={<DashboardScreen />} />
                <Route path='/Patients' element={<PatientsScreen />} />
                <Route path='/Patients/:patientId' element={<PatientViewScreen />} />
                <Route path='/Patients/:category/:folderId' element={<PatientViewScreen />} />
                <Route path='/file/:fileId' element={<FileComponent />} />
                <Route path='/HealthAI' element={<HealthAIScreen />} />
                <Route path='/Profile' element={<ProfilePage />} />
                <Route path='/Exit' element={<ExitScreen />} />
              </>
            )}
            <Route path='/no-access' element={<NoAccessScreen />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
