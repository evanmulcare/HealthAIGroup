import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import {  toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in both email and password fields.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return; 
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user })
        navigate(`/Dashboard`)
        toast.success('Welcome, Login successfully', {
          position: 'top-center',
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.error('Error logging in. Please check your credentials.', {
          position: 'top-center',
          autoClose: 2000,
        });
      });
  }



  return (
    <div className="fixed left-0 top-0 w-full h-full bg-gray-50 flex justify-center items-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-3/4 flex flex-col p-5 bg-white rounded-3xl shadow-md overflow-y-scroll">
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-3xl font-bold text-gray-700 mt-4">HealthAI Web Portal</h1>
        </div>
        <div className="h-full mx-auto">
          <div className="w-full max-w-md py-5">
            <p className="font-semibold text-lg text-gray-500 text-center mb-4">Please Log in to continue</p>
            <p className="font-semibold text-sm text-gray-600 text-center mb-4">LOGIN: email: johndoe@gmail.com, password: Password.123</p>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
