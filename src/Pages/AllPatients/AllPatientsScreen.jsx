import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AllPatientsScreenView from './AllPatientsScreenView';

const AllPatientsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const doctorsPatients = useSelector((state) => {
    return users.filter(
      (user) => user?.role === 'patient' && user?.doctor === currentUser.uid
    );
  });

  const filteredPatients = doctorsPatients.filter((patient) =>
    patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AllPatientsScreenView
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      navigate={navigate}
      filteredPatients={filteredPatients}
    />
  );
};

export default AllPatientsScreen;
