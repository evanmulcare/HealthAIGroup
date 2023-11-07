import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardView from './DashboardView';
import i18n from '../../Translations/i18n';
import { changeTranslation } from '../../Contexts/actionCreators/TranslationActionCreator';

import { downloadHeartDiseaseAccuracy, downloadLungCancerAccuracy, downloadHeartDiseaseReport, downloadLungCancerReport } from '../../Hooks/usePredictionDataReport'
const DashboardScreen = () => {
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserData = users.find((user) => user.docId === currentUser?.uid);
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const dispatch = useDispatch();

  const handleLanguageChange = (language) => {
    dispatch(changeTranslation(language));
    i18n.changeLanguage(language);

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
