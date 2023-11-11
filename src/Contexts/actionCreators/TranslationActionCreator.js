// actions/translationActions.js
import * as types from '../actionTypes/TranslationActionTypes';

export const changeTranslation = (language) => {
  return {
    type: types.CHANGE_TRANSLATION,
    payload: language,
  };
};
