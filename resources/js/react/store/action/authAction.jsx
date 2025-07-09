import apiConfig from "../../config/apiConfig";
import { authActionType, Tokens, toastType, apiBaseURL, configActionType } from "../../constants";
import { addToast } from "./toastAction";
import Cookies from 'js-cookie';
import {getFormattedMessage,formatErrors} from '../../shared/sharedMethod';


export const loginAction = (data, navigate, setLoading) => async (dispatch) => {

    await apiConfig
        .post("login", data)
        .then((response) => {


            localStorage.setItem(Tokens.ADMIN, response.data.data.access_token);
            localStorage.setItem(
                "loginUserArray",
                JSON.stringify(response.data.data.user)
            );

            Cookies.set('authToken', response.data.data.access_token, { expires: new Date(new Date().getTime() + response.data.data.expires_at * 6000 * 1000) });
            
            dispatch({ type: configActionType.FETCH_USER_PERMISSIONS, payload: response.data.data.permissions });

            navigate("/admin/dashboard");
         
            dispatch(
                addToast({ text: getFormattedMessage("login.success.message"), toast_title:'' })
            );

            setLoading(false);

        })
        .catch(({ response }) => {
            if(response.data){
                dispatch(
                    addToast({ text:getFormattedMessage(response.data.errors[0]), type: toastType.ERROR })
                );
            }

        });
};




export const logoutAction = (navigate) => async (dispatch) => {
    await apiConfig
        .post("logout")
        .then((response) => {
            
            localStorage.removeItem(Tokens.ADMIN);
            localStorage.removeItem(Tokens.USER);
            localStorage.removeItem("loginUserArray");
            localStorage.removeItem(Tokens.UPDATED_LAST_NAME);
            Cookies.remove("authToken");
            
            navigate("/login");
            dispatch(
                addToast({
                    text: getFormattedMessage("logout.success.message"),
                })
            );
        })
        .catch(({ response }) => {
            if(response){
                addToast({ text: formatErrors(response.data.errors), type: toastType.ERROR })

                dispatch(
                    addToast({ text: response.data.message, type: toastType.ERROR })
                );
            }

        });
};