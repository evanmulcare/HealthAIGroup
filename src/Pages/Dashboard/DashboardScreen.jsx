import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardView from './DashboardView';

import { downloadHeartDiseaseAccuracy, downloadLungCancerAccuracy, downloadHeartDiseaseReport, downloadLungCancerReport} from '../../Hooks/usePredictionDataReport'
const DashboardScreen = () => {
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserData = users.find((user) => user.docId === currentUser?.uid);

  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <DashboardView
      currentUserData={currentUserData}
      selectedLanguage={selectedLanguage}
      handleLanguageChange={handleLanguageChange}
      downloadHeartDiseaseAccuracy={downloadHeartDiseaseAccuracy}
      downloadLungCancerAccuracy={downloadLungCancerAccuracy}
      downloadHeartDiseaseReport={downloadHeartDiseaseReport}
      downloadLungCancerReport={downloadLungCancerReport}
    />
  );
};

export default DashboardScreen;
