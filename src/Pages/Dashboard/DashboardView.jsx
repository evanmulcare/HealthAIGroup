import React from 'react';
import { withTranslation,  } from 'react-i18next';
import Calender from '../../Components/Calender';
import DefaultProfile from '../../Assets/DefaultProfile.png';
import { useTranslation  } from 'react-i18next';

const DashboardView = ({  currentUserData, selectedLanguage, handleLanguageChange, downloadHeartDiseaseAccuracy, downloadLungCancerAccuracy, downloadHeartDiseaseReport, downloadLungCancerReport }) => {
  const { t } = useTranslation(); 

  return (
    <div className='mt-2 pl-10 pr-10 pb-10'>

      <div className="flex flex-col md:flex-row justify-center items-center md:justify-between mb-5">
        <h1 className="text-4xl font-semibold text-gray-800 md:ml-2">
          {t('dashboard.greeting', { name: currentUserData?.firstname })}
        </h1>
        <div className="space-y-2 space-x-2 sm mt-5">
          <button
            className={`rounded-md px-4 py-2 text-sm font-normal ${selectedLanguage === 'english'
              ? 'bg-blue-500 text-white'
              : 'text-blue-500 bg-white'
              }`}
            onClick={() => handleLanguageChange('english')}
          >
            {t('dashboard.languages.english')}
          </button>
          <button
            className={`rounded-md px-4 py-2 text-sm font-normal ${selectedLanguage === 'french'
              ? 'bg-blue-500 text-white'
              : 'text-blue-500 bg-white'
              }`}
            onClick={() => handleLanguageChange('french')}
          >
            {t('dashboard.languages.french')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <div className="col-span-1 rounded-2xl shadow-md p-6 bg-gradient-to-r from-blue-500 to-blue-700 bg-pattern">
          <div className="text-3xl font-semibold text-white">{t('dashboard.exportPredictionDatasets')}</div>

          <p className="text-md text-gray-100 mb-6">
            {t('dashboard.exportPredictionDatasetsDescription')}
          </p>

          <div className='col-span-1 space-y-2'>
            <button className="w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer" onClick={() => downloadHeartDiseaseReport()}>
              <span>{t('dashboard.downloadHeartDiseaseDataset')}</span>
            </button>
            <button className="w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer" onClick={() => downloadLungCancerReport()}>
              <span>{t('dashboard.downloadLungCancerDataset')}</span>
            </button>
            <button className=" w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer">
              <span>{t('dashboard.downloadColonCancerDataset')}</span>
            </button>
          </div>
        </div>

        <div className="col-span-1 rounded-2xl shadow-md p-6  bg-gradient-to-r from-blue-500 to-blue-700 bg-pattern cursor-pointer" >
          <div className="text-3xl font-semibold text-white">{t('dashboard.exportAccuracyReport')}</div>

          <p className="text-md text-gray-100 mb-6">
            {t('dashboard.exportAccuracyReportDescription')}
          </p>
          <div className='col-span-1 space-y-2'>
            <button className="w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer" onClick={() => downloadHeartDiseaseAccuracy()}>
              <span>{t('dashboard.downloadHeartDiseaseAccuracy')}</span>
            </button>
            <button className="w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer" onClick={() => downloadLungCancerAccuracy()}>
              <span>{t('dashboard.downloadLungCancerAccuracy')}</span>
            </button>
            <button className=" w-full flex bg-blue-400 rounded-md px-4 py-2 items-center text-white hover:text-gray-200 hover:scale-105 cursor-pointer">
              <span>{t('dashboard.downloadColonCancerAccuracy')}</span>
            </button>
          </div>
        </div>

        <div className="rounded-md col-span-1">
          <div className="p-4 mb-2 border flex items-center bg-white rounded-2xl">
            <div className="h-32 w-32 rounded-full overflow-hidden">
              <img
                src={currentUserData?.profileimg || DefaultProfile}
                alt="Profile"
                className="h-full w-full object-cover rounded-full bg-black opacity-90"
              />
            </div>
            <div className="mt-3 ml-5">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-left">
                {currentUserData?.firstname} {currentUserData?.lastname}
              </h2>
              <div className="md:mt-2">
                <h3 className="text-sm text-gray-500 md:text-gray-400">
                  {currentUserData?.email}
                </h3>
              </div>
            </div>
          </div>
          <Calender />
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(DashboardView);