import React from 'react'

const NoAccessScreen = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
        <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white rounded-3xl shadow-md overflow-y-scroll">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-700">
              Sorry, only doctors can access the web app. Patients can access their data through the mobile app.
            </h1>
          </div>
        </div>
      </div>
    );
  };
  
  export default NoAccessScreen;
  