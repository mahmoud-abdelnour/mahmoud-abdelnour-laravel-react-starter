
import apiConfig from "../../config/apiConfigWthFormData";

import { apiBaseURL, userActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage,formatErrors } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";
import _, { method } from 'lodash';

export const fetchUsers = (filter = {}, isLoading = true, allUser) =>
    async (dispatch) => {

        
        if (isLoading) {
            dispatch(setLoading(true));
        }

        let url = apiBaseURL.USERS;

        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter, null, null, null, url);
        }

        

        url += allUser ? allUser : "";

        apiConfig
            .get(url)
            .then((response) => {


                dispatch({
                    type: userActionType.FETCH_USERS,
                    payload: response.data.data.data,
                });

              
                dispatch(
                    setTotalRecord(
                        response.data.data.meta.total !== undefined &&
                            response.data.data.meta.total >= 0
                            ? response.data.data.meta.total
                            : response.data.data.data.total
                    )
                );

                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (isLoading) {
                    dispatch(setLoading(false));
                }

                if(response.data){
                    dispatch(
                        addToast({
                            text:  response?.data?.messages[0],
                            type: toastType.ERROR,
                        })
                    );
                }
            });
};

export const fetchUser =  (userId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.USERS + "/" + userId)
            .then((response) => {
                dispatch({
                    type: userActionType.FETCH_USER,
                    payload: response.data.data,
                });
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
};

export const addUser = (users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.USERS, users)
        .then((response) => {
            dispatch({
                type: userActionType.ADD_USER,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.create.message"),
                })
            );
            navigate("/app/users");
            dispatch(addInToTotalRecord(1));
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editUser = (userId, users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig
        .post(apiBaseURL.USERS + "/" + userId, users,{_method:"PATCH"})
        .then((response) => {
            
            dispatch({
                type: userActionType.EDIT_USER,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.edit.message"),
                })
            );
            //navigate("/app/users");
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: formatErrors(response.data.errors), type: toastType.ERROR })
            );
        });
};

export const deleteUser = (userId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.USERS + "/" + userId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({ type: userActionType.DELETE_USER, payload: userId });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.delete.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};
