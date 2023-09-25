import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signOut } from 'firebase/auth'; 

const ExitScreen = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const auth = getAuth(); // Get the Firebase auth instance
      await signOut(auth); // Sign out the user
      toast.info('Goodbye ;(', {
        position: 'top-center',
        autoClose: 2000,
      });
      navigate('/signin'); // Navigate to the login page or another desired destination
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 w-full h-full bg-gray-50 flex justify-center items-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-3/4 flex flex-col p-5 bg-white rounded-3xl shadow-md overflow-y-scroll">
        <div className="flex flex-col items-center mt-8">

          <h1 className="text-3xl font-bold text-gray-700 mt-4">
            HealthAI Web Portal
          </h1>
        </div>
        <div className="h-full mx-auto">
          <div className="mt-20">
            <p className="font-semibold text-lg text-gray-500 mb-4">Continue below to log out</p>
            <div className="flex justify-between m-2 space-x-2">
              <button
                className="w-1/2 bg-gray-300 text-gray-700 rounded-lg py-2 px-4 hover:bg-gray-400 focus:outline-none focus:ring"
                onClick={() => {
                  navigate(-1); // Go back to the previous page
                  toast.info('Great! stay as long as you like :)', {
                    position: 'top-center',
                    autoClose: 2000,
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="w-1/2 bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring"
                onClick={handleLogout} // Use the handleLogout function for log out action
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitScreen;
