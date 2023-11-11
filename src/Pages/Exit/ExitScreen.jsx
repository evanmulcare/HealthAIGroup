import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUserAsync } from '../../Contexts/actionCreators/authActionCreator';
import ExitScreenView from './ExitScreenView';
import { toast } from 'react-toastify';

const ExitScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogoutClick = () => {
    dispatch(logoutUserAsync());
    navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
    toast.info('Great! Stay as long as you like :)', {
      position: 'top-center',
      autoClose: 2000,
    });
  };


  return (
    <ExitScreenView
    handleCancel={handleCancel}
    handleLogout={handleLogoutClick}
  />
  );
};

export default ExitScreen;
