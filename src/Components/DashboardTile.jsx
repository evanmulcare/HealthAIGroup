import React, { useState } from 'react';
import {  FaDownload } from 'react-icons/fa'
import AggregateModal from './Modals/Aggregation/AggregateModal';
import { useTranslation } from 'react-i18next';

const DashboardTile = ({image, title,datasetDownload,accuracyDownload,type }) => {
  const [showAggregateModal, setShowAggregateModal] = useState(null);
  const { t } = useTranslation();

  return (
<div className='lg:flex'>
{showAggregateModal && (
        <AggregateModal
          setShowAggregateModal={setShowAggregateModal}
          showAggregateModal={showAggregateModal}
          title={title}
          type={type}
        />
      )}
  <div className='lg:w-3/4 md:w-full rounded-2xl shadow-lg p-2 bg-gray-800 text-white flex h-auto lg:h-32 overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300' onClick={() => setShowAggregateModal(true)}>
    <div className='rounded-l-2xl text-white flex justify-center items-center lg:w-1/4 md:w-1/3'>
      <div className='w-16 h-16 md:w-24 md:h-24 lg:w-24 lg:h-24 border rounded-full bg-cover bg-center' style={{ backgroundImage: `url(${image})` }}></div>
    </div>
    <div className='p-4 flex-1'>
      <div className='text-lg font-semibold'>{title} {t('dashboardTile.DataAggregation')}</div>
      <h3 className='text-sm text-gray-300'>{t('dashboardTile.subtextone')} {title} {t('dashboardTile.subtexttwo')}</h3>
    </div>
  </div>
  <div className='lg:pl-2 w-full lg:w-1/2 flex space-x-4'>
    <div className='p-2 border h-32 w-32 rounded-full bg-white shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer' onClick={datasetDownload}>
      <FaDownload className='text-gray-800 text-4xl mb-2' />
      <span className='text-sm font-semibold text-gray-800 text-center'>{title} {t('dashboardTile.dataset')}</span>
    </div>
    <div className='p-2 border h-32 w-32 rounded-full bg-white shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer' onClick={accuracyDownload}>
      <FaDownload className='text-gray-800 text-4xl mb-2' />
      <span className='text-sm font-semibold text-gray-800 text-center'>{title} {t('dashboardTile.accuracy')}</span>
    </div>
  </div>
</div>


  )
}

export default DashboardTile