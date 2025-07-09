import apiConfig from "../../config/apiConfigWthFormData";
import {apiBaseURL, toastType, profileActionType, Tokens,configActionType} from '../../constants';
import {addToast} from './toastAction'
import {getFormattedMessage} from '../../shared/sharedMethod';
import { setSavingButton } from "./saveButtonAction";

export const fetchProfile = () => async (dispatch) => {
    apiConfig.get(apiBaseURL.EDIT_PROFILE)
        .then((response) => {
            dispatch({type: profileActionType.FETCH_PROFILE, payload: response.data.data});
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};

export const updateProfile = (profile, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig.post(apiBaseURL.UPDATE_PROFILE, profile)
        .then((response) => {
            dispatch(setSavingButton(false));
            if(response.data.data){
                dispatch({ type: configActionType.FETCH_USER_DATA, payload: response.data.data});
            }
            dispatch({type: profileActionType.UPDATE_PROFILE, payload: response.data.data});
            dispatch(addToast({text: getFormattedMessage('update-profile.success.update.message')}));
            navigate('/dashboard')
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
        });
};
