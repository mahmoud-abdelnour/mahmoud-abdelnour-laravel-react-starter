import apiConfig from '../../config/apiConfig';
import { apiBaseURL, toastType, languageActionType, Tokens } from '../../constants';
import { addToast } from './toastAction';
import { getFormattedMessage } from '../../shared/sharedMethod';
import { setLoading } from "./loadingAction";

export const updateLanguage = (language) => async (dispatch) => {

    dispatch({ type: languageActionType.UPDATED_LANGUAGE, payload: language});
    localStorage.setItem(Tokens.UPDATED_LANGUAGE, language);
    setTimeout(() => {
                window.location.reload()
    }, 100)

 
};
