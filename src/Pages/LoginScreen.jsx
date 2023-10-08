import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPasswordAsync } from '../Contexts/actionCreators/authActionCreator';
import { signUpWithEmailAndPasswordAsync } from '../Contexts/actionCreators/authActionCreator';
const LoginScreen = () => {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in both email and password fields.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }

    try {
      await dispatch(signInWithEmailAndPasswordAsync(email, password));
      navigate('/Dashboard')
    } catch (error) {
      console.error('Error signing in:', error);

    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!registerEmail || !registerPassword || !firstname || !lastname) {
      toast.error('Please fill in all required fields.', {
        position: 'top-center',
        autoClose: 2000,
      });
      return;
    }
    try {
      await dispatch(signUpWithEmailAndPasswordAsync(registerEmail, registerPassword, firstname, lastname));
      navigate('/Dashboard')
    } catch (error) {
      console.error('Error registering and logging in:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-gray-50 flex justify-center items-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-3/4 flex flex-col p-5 bg-white rounded-3xl shadow-md overflow-y-scroll">
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-3xl font-bold text-gray-700 mt-4">HealthAI Web Portal</h1>
        </div>

        <div className='flex border-b'>
          <button
            className={`flex-1 py-2 text-lg font-semibold ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400 '
              }`}
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold  ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'
              }`}
            onClick={() => setActiveTab('signup')}
          >
            SIGN UP
          </button>

        </div>


        <div className="h-full mx-auto">

          {activeTab === 'login' && (

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
                  onClick={() => (handleLogin)}
                  className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Login
                </button>
              </form>
            </div>
          )

          }

          {
            activeTab === 'signup' && (
              <div className="w-full max-w-md py-5">
                <p className="font-semibold text-lg text-gray-500 text-center mb-4">New user? Sign up here!</p>
                <form onSubmit={handleRegister}>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <input
                    type="firstname"
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <input
                    type="lastname"
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <button
                    onClick={() => (handleRegister)}
                    className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
