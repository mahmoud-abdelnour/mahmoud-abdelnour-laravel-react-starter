import { apiBaseURL, rolesActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import _ from 'lodash';
import { getFormattedMessage,formatErrors } from "../../shared/sharedMethod";


export const fetchRoles =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.ROLES;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter, admin, null, null, url);
        }
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: rolesActionType.FETCH_ROLES,
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
                if(response.data){
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
            });
    };

export const fetchRole =
    (rolesId, singleRole, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.ROLES + "/" + rolesId, singleRole)
            .then((response) => {
                dispatch({
                    type: rolesActionType.FETCH_ROLE,
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

export const addRole = (roles, navigate) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.ROLES, roles)
        .then((response) => {
            dispatch({
                type: rolesActionType.ADD_ROLES,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("role.success.create.message"),
                })
            );
            navigate("/app/roles");
            dispatch(addInToTotalRecord(1));
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editRole = (rolesId, role, navigate) => async (dispatch) => {

    await apiConfig
        .patch(apiBaseURL.ROLES + "/" + rolesId, role)
        .then((response) => {
            
            dispatch({
                type: rolesActionType.EDIT_ROLES,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("role.success.edit.message"),
                })
            );
            //navigate("/app/roles");
        })
        .catch(({ response }) => {
           
            dispatch(
                addToast({ text: formatErrors(response.data.errors), type: toastType.ERROR })
            );
        });
};

export const deleteRole = (rolesId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.ROLES + "/" + rolesId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({ type: rolesActionType.DELETE_ROLES, payload: rolesId });
            dispatch(
                addToast({
                    text: getFormattedMessage("role.success.delete.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: formatErrors(response.data.errors), type: toastType.ERROR })
            );
        });
};

export const fetchAllRoles = () => async (dispatch) => {
    let url = apiBaseURL.ROLES+'/allRoles';
    apiConfig
        .get(url)
        .then((response) => {
            dispatch({
                type: rolesActionType.FETCH_ALL_ROLES,
                payload: response.data.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};
