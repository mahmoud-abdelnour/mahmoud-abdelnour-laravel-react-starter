import { combineReducers } from "redux";
import loginReducers from "./authReducer";
import configReducer from "./configReducer";
import toastReducer from "./toastReducer";
import userReducers from "./userReducers";
import totalRecordReducer from "./totalRecordReducer";
import saveButtonReducer  from "./saveButtonReducer";
import loadingReducer from "./loadingReducer";
import productCategoryReducers from "./productCategoryReducers";
import roleReducer from "./roleReducer";
import permissionReducer from "./permissionReducer";
import updateLanguageReducer from "./updateLanguageReducer";
import allConfigReducer from "./allConfigReducer";
import userPermissionsReducer from "./userPermissionsReducer";
import frontSettingReducer from "./frontSettingReducer";
import userDataReducer from "./userDataReducer";
import updateProfileReducer from "./updateProfileReducer";
import settingReducer from "./settingsReducer";


export default combineReducers({
    loginUser: loginReducers,
    userPermissions:userPermissionsReducer,
    allConfigData: allConfigReducer,
    toasts: toastReducer,
    users: userReducers,
    totalRecord: totalRecordReducer,
    isSaving:saveButtonReducer,
    isLoading: loadingReducer,
    productCategories: productCategoryReducers,
    roles: roleReducer,
    permissions: permissionReducer,
    updateLanguage: updateLanguageReducer,
    frontSetting: frontSettingReducer,
    userData: userDataReducer,
    userProfile: updateProfileReducer,
    settings: settingReducer,
    
});
