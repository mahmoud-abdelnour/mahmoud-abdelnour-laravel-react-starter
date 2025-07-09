import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import {getFormattedMessage,getAvatarName,placeholderText} from '../../shared/sharedMethod';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {
    updateSetting,
    fetchSettings,
} from "../../store/action/settingsAction";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import userAvatar from "../../assets/images/avatar.png";

import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import ImagePicker from "../../shared/components/ImagePicker/ImagePicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ModelFooter from "../../shared/modelFooter";
import _ from 'lodash';


const Settings = (props) => {
    const {fetchSettings, settings,updateSetting} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [settingValue, setSettingValue] = useState({
        contact_email: "",
        logo: "",
        app_name: "",
    });
    const [selectImg, setSelectImg] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [disabled, setIsDisabled] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);



    useEffect(() => {
        if (settings) {
            setSettingValue({
                app_name: settings
                    ? settings &&
                    settings.app_name
                    : "",
                contact_email: settings
                    ? settings && settings.contact_email
                    : "",
                logo: settings
                    ? settings && settings.logo
                    : "",
            });
            setImagePreviewUrl(
                settings
                    ? settings && settings.logo
                    : userAvatar
            );
        }
    }, [settings]);


    const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
    const FILE_SIZE = 1024 * 1024; // 1 MB

    const settingsValidation = yup.object({
        contact_email: yup
            .string("Email must be a string")
            .email("Please enter a valid email address")
            .required('Email is required'),
        app_name: yup
        .string()
        .required('Please Enter your Name'),
        logo: 
            (  selectImg == null && settingValue.logo != null) ? null :
        yup
        .mixed()
        .required("Image is required")
        .test(
        "fileFormat",
        "Unsupported Format. Only JPEG and PNG are allowed.",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
        )
        .test(
        "fileSize",
        "File size is too large. Maximum size is 1 MB.",
        (value) => value && value.size <= FILE_SIZE
        ),

    });
    
    
    const settingFormik = useFormik({
        initialValues: {
            app_name: settingValue.app_name??'',
            contact_email: settingValue.contact_email??'',
        },
        validationSchema: settingsValidation,
        enableReinitialize: true,
        onSubmit: (values) => {
            let formData = _.cloneDeep(values);
            updateSetting(formData);
        }
    });

    
    const handleImageChanges = (e) => {
        settingFormik.setFieldValue('logo', e.currentTarget.files[0]); 
        setSelectImg(e.currentTarget.files[0]); 

        e.preventDefault();
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === "image/jpeg" || file.type === "image/png") {
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    setImagePreviewUrl(fileReader.result);
                };
                fileReader.readAsDataURL(file);
            }
        }
    };
    
    useEffect(() => {
        const disabled =  (!settingFormik.isValid) || (settingFormik.isValid && !settingFormik.dirty  ) ? true : false;
        setIsDisabled(disabled);
    }, [settingFormik]);
    

    const onSubmit = (event) => {

    };

    
    return (
        <MasterLayout>
            <TopProgressBar />
            <div className="card">
                <div className="card-body">
                    <Form onSubmit={settingFormik.handleSubmit}>
                        <div className="row">


                            <div className="mb-4">
                                <ImagePicker
                                    user={userAvatar}
                                    imageTitle={placeholderText(
                                        "globally.input.change-image.tooltip"
                                    )}
                                    imagePreviewUrl={imagePreviewUrl}
                                    handleImageChange={handleImageChanges}
                                />
                                { Boolean(settingFormik.errors.logo)? <p className='text-danger d-block fw-400 fs-xsmall '>{settingFormik.errors.logo}</p> : '' }
                            </div>

                            <div className="col-md-12 mb-3">
                                <label
                                    htmlFor="name"
                                    className="form-label"
                                >
                                    {getFormattedMessage("name")}
                                    :<span className="required" />
                                </label>
                                <input
                                    type="text"
                                    name="app_name"
                                    className="form-control " 
                                    placeholder="Enter User Name  "
                                    value={settingFormik.values.app_name}
                                    onChange={settingFormik.handleChange}
                                    id="name"
                                />
                                {Boolean(settingFormik.errors.app_name)? <p className='text-danger d-block fw-400 fs-xsmall '>{settingFormik.errors.app_name}</p> : '' }
                            </div>
                        
                            <div className="col-md-6 mb-3">
                                <label className="form-label" htmlFor="email">
                                    {getFormattedMessage(
                                        "email"
                                    )}
                                    :
                                </label>
                                <span className="required" />
                                <input
                                    name="contact_email"
                                    className="form-control " 
                                    placeholder="Enter contact email "
                                    value={settingFormik.values.contact_email}
                                    onChange={settingFormik.handleChange}
                                    id="email"
                                />
                                {Boolean(settingFormik.errors.contact_email)? <p className='text-danger d-block fw-400 fs-xsmall '>{settingFormik.errors.contact_email}</p> : '' }
                            </div>
                        
                

                            <ModelFooter
                                onSubmit={onSubmit}
                                editDisabled={disabled}
                                onEditRecord={settingValue}
                            />

                        </div>
                    </Form>
                </div>
            </div>
        </MasterLayout>
    );
};


const mapStateToProps = (state) => {
    const {settings} = state;
    return {settings}
};
export default connect(mapStateToProps, {updateSetting,fetchSettings})(Settings);
