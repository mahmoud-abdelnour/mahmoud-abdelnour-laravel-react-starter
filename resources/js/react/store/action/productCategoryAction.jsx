import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    productCategoriesActionType,
    toastType,
} from "../../constants";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    setTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";


export const fetchAllProductCategories = () => async (dispatch) => {
    apiConfig
        .get(`product-categories`)
        .then((response) => {
            dispatch({
                type: productCategoriesActionType.FETCH_ALL_PRODUCTS_CATEGORIES,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};
