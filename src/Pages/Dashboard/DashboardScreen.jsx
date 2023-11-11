import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardView from './DashboardView';
import i18n from '../../Translations/i18n';
import { changeTranslation } from '../../Contexts/actionCreators/TranslationActionCreator';
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
     
    />
  );
};

export default DashboardScreen;
