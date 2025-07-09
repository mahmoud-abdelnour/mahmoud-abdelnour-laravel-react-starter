import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Navigate } from "react-router-dom";
import { Tokens } from "../constants";
import moment from "moment";
import _ from 'lodash';

export const getAvatarName = (name) => {
    if (name) {
        return name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase())
            .join("");
    }
};

export const numValidate = (event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
};

export const numWithSpaceValidate = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== ' ') {
            event.preventDefault();
        }
};


export const numFloatValidate = (event) => {
    const key = event.key;
    const value = event.target.value;
    if (/[0-9]/.test(key)) {
        return;
    }
    if (key === '.' && !value.includes('.')) {
        return;
    }
    event.preventDefault();
};


export const getFormattedMessage = (id) => {
    return <FormattedMessage id={id} defaultMessgae={id} />;
};

export const getFormattedOptions = (options) => {
    const intl = useIntl();
    const copyOptions = _.cloneDeep(options);
    copyOptions.map(
        (option) =>
            (option.name = intl.formatMessage({
                id: option.name,
                defaultMessage: option.name,
            }))
    );
    return copyOptions;
};

export const placeholderText = (label) => {
    const intl = useIntl();
    const placeholderLabel = intl.formatMessage({ id: label });
    return placeholderLabel;
};

export const decimalValidate = (event) => {
    if (!/^\d*\.?\d*$/.test(event.key)) {
        event.preventDefault();
    }
};

export const addRTLSupport = (rtlLang) => {
    const html = document.getElementsByTagName("html")[0];
    const att = document.createAttribute("dir");
    att.value = "rtl";
    if (rtlLang === "ar") {
        html.setAttributeNode(att);
    } else {
        html.removeAttribute("dir");
    }
};

export const onFocusInput = (el) => {
    if (el.target.value === "0.00") {
        el.target.value = "";
    }
};

export const ProtectedRoute = (props) => {
    const { children, allConfigData, route } = props;
    const token = localStorage.getItem(Tokens.ADMIN);
    if (!token || token === null) {
        return <Navigate to="/login" replace={true} />;
    } else {
        return children;
    }
};

export const formatErrors = (errors) => {
    if (!errors || typeof errors !== 'object') {
      return 'No errors found';
    }
  
    const formattedErrors = Object.entries(errors)
      .map(([field, messages]) => {
        return `${messages}<br>`; 
      })
      .join(''); 
  
    return `${formattedErrors}`;
}
  
  

export const getFormattedDate = (date, config) => {
    const format = config && config.date_format;
    if (format === "d-m-y") {
        return moment(date).format("DD-MM-YYYY");
    } else if (format === "m-d-y") {
        return moment(date).format("MM-DD-YYYY");
    } else if (format === "y-m-d") {
        return moment(date).format("YYYY-MM-DD");
    } else if (format === "m/d/y") {
        return moment(date).format("MM/DD/YYYY");
    } else if (format === "d/m/y") {
        return moment(date).format("DD/MM/YYYY");
    } else if (format === "y/m/d") {
        return moment(date).format("YYYY/MM/DD");
    } else if (format === "m.d.y") {
        return moment(date).format("MM.DD.YYYY");
    } else if (format === "d.m.y") {
        return moment(date).format("DD.MM.YYYY");
    } else if (format === "y.m.d") {
        return moment(date).format("YYYY.MM.DD");
    } else moment(date).format("YYYY-MM-DD");
};
