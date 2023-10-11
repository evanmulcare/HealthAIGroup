import React, { useState } from 'react';
import RegisterForm from '../Components/FormPartials/RegisterForm';
import SignInForm from '../Components/FormPartials/SignInForm';

const LoginScreen = () => {
  const [activeTab, setActiveTab] = useState('login');
  
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

          <SignInForm/>
          )

          }
          {
            activeTab === 'signup' && (
              <RegisterForm />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
