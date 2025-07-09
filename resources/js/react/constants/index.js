//API Base URL
export const apiBaseURL = {
    CONFIG: "config",
    FRONT_SETTING: "front-setting",
    ROLES: "/roles",
    CHANGE_LANGUAGE: "change-language",
    EDIT_PROFILE: "edit-profile",
    UPDATE_PROFILE: "update-profile",
    USERS: "/users",
    SETTINGS: "/settings",
    ADMIN_FORGOT_PASSWORD: "forgot-password",
    ADMIN_RESET_PASSWORD: "reset-password",
    PERMISSION: "/permissions",
    REGISTRATION: "/register",
    PRODUCTS_CATEGORIES: "/product-categories",
    LANGUAGES: "/languages",
    PRODUCTS: "/products",
    CHANGE_PASSWORD: "change-password",
};

export const authActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    ADMIN_FORGOT_PASSWORD: "ADMIN_FORGOT_PASSWORD",
    ADMIN_RESET_PASSWORD: "ADMIN_RESET_PASSWORD",
};


export const configActionType = {
    FETCH_CONFIG: "FETCH_CONFIG",
    FETCH_ALL_CONFIG: "FETCH_ALL_CONFIG",
    FETCH_USER_PERMISSIONS: "FETCH_USER_PERMISSIONS",
    FETCH_USER_DATA: "FETCH_USER_DATA",
};

export const userActionType = {
    FETCH_USERS: "FETCH_USERS",
    FETCH_USER: "FETCH_USER",
    ADD_USER: "ADD_USER",
    EDIT_USER: "EDIT_USER",
    DELETE_USER: "DELETE_USER",
};

export const rolesActionType = {
    FETCH_ROLES: "FETCH_ROLES",
    FETCH_ROLE: "FETCH_ROLE",
    ADD_ROLES: "ADD_ROLES",
    EDIT_ROLES: "EDIT_ROLES",
    DELETE_ROLES: "DELETE_ROLES",
    FETCH_ALL_ROLES: "FETCH_ALL_ROLES",
};

export const productCategoriesActionType = {
    FETCH_ALL_PRODUCTS_CATEGORIES: "FETCH_USERS",
  
};

export const permissionActionType = {
    FETCH_PERMISSIONS: "FETCH_PERMISSIONS",
};


export const Filters = {
    PAGE: 1,
    OBJ: {
        order_By: "",
        page: 1,
        pageSize: 10,
        direction: "asc",
        search: "",
        created_at: "created_at",
        status: "",
        product_category_id:''
    },
};

export const constants = {
    SET_TOTAL_RECORD: "SET_TOTAL_RECORD",
    UPDATE_TOTAL_RECORD_AFTER_DELETE: "UPDATE_TOTAL_RECORD_AFTER_DELETE",
    UPDATE_TOTAL_RECORD_AFTER_ADD: "UPDATE_TOTAL_RECORD_AFTER_ADD",
    IS_LOADING: "IS_LOADING",
    SET_LANGUAGE: "SET_LANGUAGE",
    SET_SAVING: "SET_SAVING",
};

export const dateFormat = {
    DEFAULT_MOMENT: "YYYY-MM-DD hh:mm:ss",
    NATIVE: "YYYY-MM-DD",
    CHART_DATE: "YYYY/MM/DD",
    CHART_CUSTOM_DATE: "MMM_YYYY",
};

export const toastType = {
    ADD_TOAST: "ADD_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
    ERROR: "error",
};

export const Tokens = {
    ADMIN: "auth_token",
    USER: "user",
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    GET_PERMISSIONS: "get_permissions",
    UPDATED_LANGUAGE: "updated_language",
};

export const errorMessage = {
    UNAUTHORIZED: "Unauthorized",
    UNAUTHENTIiCATED: "Unauthenticated."
};

export const Permissions = {
    MANAGE_DASHBOARD: "manage_dashboard",
    MANAGE_ROLES: "manage_roles",
    MANAGE_USERS: "manage_users",
    MANAGE_PRODUCTS: "manage_products",
    MANAGE_PRODUCT_CATEGORIES: "manage_product_categories",
    MANAGE_PROFILE: "manage_profile",
    MANAGE_SETTINGS: "manage_settings",
    
};

export const settingsKey = {
    LANGUAGE: "language",
    DEFAULT_LOCALE: "en",
    LOCALE_ARABIC: "ar",
};

export const languageOptions = [
    {
        id: "ar",
        name: "settings.select.language.arabic.label",
        display_name: "Arabic",
    },
    {
        id: "en",
        name: "settings.select.language.english.label",
        display_name: "English",
    },
];

export const statusOptions = [
    { id: 0, name: "unit.filter.all.label" },
    { id: 1, name: "status.filter.received.label" },
    { id: 2, name: "status.filter.pending.label" },
    { id: 3, name: "status.filter.ordered.label" },
];

export const languageActionType = {
    UPDATE_LANGUAGE: "UPDATE_LANGUAGE",
    UPDATED_LANGUAGE: "UPDATED_LANGUAGE",
};

export const frontSettingActionType = {
    FETCH_FRONT_SETTING: "FETCH_FRONT_SETTING",
    FETCH_SETTING: "FETCH_SETTING",
    UPDATE_SETTINGS: "UPDATE_SETTINGS",
};

export const settingActionType = {
    FETCH_SETTING: "FETCH_SETTING",
    UPDATE_SETTINGS: "UPDATE_SETTINGS",
};



export const profileActionType = {
    FETCH_PROFILE: "FETCH_PROFILE",
    UPDATE_PROFILE: "UPDATE_PROFILE",
};
