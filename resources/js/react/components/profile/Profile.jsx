import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import {getFormattedMessage,getAvatarName,placeholderText} from '../../shared/sharedMethod';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {
    updateProfile,
    fetchProfile,
} from "../../store/action/updateProfileAction";

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


const Profile = (props) => {
    const {fetchProfile, userProfile,updateProfile} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profileValue, setProfileValue] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        image: "",
    });
    const [selectImg, setSelectImg] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [disabled, setIsDisabled] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    });

    const avatarName = getAvatarName(
     /*    userProfile &&
        userProfile[0].image === "" &&
        userProfile[0].name  */
    );

    useEffect(() => {
        if (userProfile) {
            setProfileValue({
                name: userProfile
                    ? userProfile.attributes &&
                      userProfile.attributes.name
                    : "",
                email: userProfile
                    ? userProfile.attributes && userProfile.attributes.email
                    : "",
                phone: userProfile
                    ? userProfile.attributes && userProfile.attributes.phone
                    : "",
                image: userProfile
                    ? userProfile.attributes && userProfile.attributes.image
                    : "",
            });
            setImagePreviewUrl(
                userProfile
                    ? userProfile.attributes && userProfile.attributes.image
                    : userAvatar
            );
        }
    }, [userProfile]);



    const handleHideShowPassword = (type) => {
        if (type === "new") {
            setShowPassword({ ...showPassword, new: !showPassword.new });
        } else if (type === "confirm") {
            setShowPassword({
                ...showPassword,
                confirm: !showPassword.confirm,
            });
        }
    };
    
    
    const profileValidation = yup.object({
        email: yup
            .string("Email must be a string")
            .email("Please enter a valid email address")
            .required('Email is required'),
        name: yup
        .string()
        .required('Please Enter your Name'),
        phone: yup
        .string()
        .required('Please Enter your phone'),
       
        password: yup.string()
        .nullable() // Allow null or empty values
        .notRequired() // Make the field optional
        .min(8, 'Password must be at least 8 characters'),
     
        confirm_password: yup.string()
        .nullable() // Allow null or empty values
        .notRequired() // Make the field optional
        .oneOf([yup.ref('password')], 'Passwords must match') // Validate if it matches "password"
        .when('password', {
          is: (value) => value && value.trim() !== '', // Only validate if password is not empty
          then: (schema) => schema.required('Password confirmation is required'),
        }),

        image: 
            (  selectImg == null && profileValue.image != null) ? null :
        yup
        .mixed()
        .test(
            'fileType',
            'Unsupported file format',
            (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
        ),
    });
    
    
    const profileFormik = useFormik({
        initialValues: {
                name: profileValue.name??'',
                email: profileValue.email??'',
                phone: profileValue.phone??'',
        },
        validationSchema: profileValidation,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (!values.name || !values.email || !values.phone) {
                //setErrorMessage("Please fill in all fields");
            } else {
                let formData = _.cloneDeep(values);
                updateProfile(formData, navigate);
            }
        }
    });

    
    const handleImageChanges = (e) => {
        profileFormik.setFieldValue('image', e.currentTarget.files[0]); 
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
            const disabled =  (!profileFormik.isValid) || (profileFormik.isValid && !profileFormik.dirty  ) ? true : false;
            setIsDisabled(disabled);
    }, [profileFormik]);
    

    const onSubmit = (event) => {

    };

    
    return (
        <MasterLayout>
            <TopProgressBar />
            <div className="card">
                <div className="card-body">
                    <Form onSubmit={profileFormik.handleSubmit}>
                        <div className="row">
                            <div className="mb-4">
                                <ImagePicker
                                    user={userAvatar}
                                    avtarName={avatarName}
                                    imageTitle={placeholderText(
                                        "globally.input.change-image.tooltip"
                                    )}
                                    imagePreviewUrl={imagePreviewUrl}
                                    handleImageChange={handleImageChanges}
                                />
                                { Boolean(profileFormik.errors.image)? <p className='text-danger d-block fw-400 fs-xsmall '>{profileFormik.errors.image}</p> : '' }
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
                                    name="name"
                                    className="form-control " 
                                    placeholder="Enter User Name  "
                                    value={profileFormik.values.name}
                                    onChange={profileFormik.handleChange}
                                    id="name"
                                />
                                {Boolean(profileFormik.errors.name)? <p className='text-danger d-block fw-400 fs-xsmall '>{profileFormik.errors.name}</p> : '' }
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
                                    name="email"
                                    className="form-control " 
                                    placeholder="Enter email "
                                    value={profileFormik.values.email}
                                    onChange={profileFormik.handleChange}
                                    id="email"
                                />
                                {Boolean(profileFormik.errors.email)? <p className='text-danger d-block fw-400 fs-xsmall '>{profileFormik.errors.email}</p> : '' }
                            </div>
                        
                            <div className="col-md-6 mb-3">
                                <label className="form-label" htmlFor="phone" >
                                    {getFormattedMessage("Phone")}:
                                </label>
                                <span className="required" />
                                <input
                                    name="phone"
                                    className="form-control " 
                                    placeholder="Enter phone "
                                    value={profileFormik.values.phone}
                                    onChange={profileFormik.handleChange}
                                    id="phone"
                                />
                                {Boolean(profileFormik.errors.phone)? <p className='text-danger d-block fw-400 fs-xsmall '>{profileFormik.errors.phone}</p> : '' }
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "user.input.password.label"
                                    )}
                                    :
                                </label>
                                <div className="form-control-wrap">
                                    <div className="input-group">
                                    <input 
                                            type={
                                                showPassword.new
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            placeholder={placeholderText(
                                                "user.input.password.placeholder.label"
                                            )}
                                            className="form-control"
                                            value={profileFormik.values.password  || ''}
                                            onChange={profileFormik.handleChange}
                                            id="password"
                                        />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" 
                                                onClick={() =>
                                                    handleHideShowPassword("new")
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={
                                                        showPassword.new
                                                            ? faEye
                                                            : faEyeSlash
                                                    }
                                                    className="top-0 m-0 fa"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    { Boolean(profileFormik.errors.password)? <p className='text-danger d-block fw-400 fs-xsmall '>{profileFormik.errors.password}</p> : '' }
                                </div>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">
                                    {getFormattedMessage(
                                        "user.input.confirm_password.label"
                                    )}
                                    :
                                </label>
                                <div className="form-control-wrap">
                                    <div className="input-group">
                                    <input 
                                            type={
                                                showPassword.confirm
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirm_password"
                                            placeholder={placeholderText(
                                                "user.input.confirm_password.placeholder.label"
                                            )}
                                            className="form-control"
                                            value={profileFormik.values.confirm_password || ''}
                                            onChange={profileFormik.handleChange}
                                            id="confirm_password"
                                        />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" 
                                                onClick={() =>
                                                    handleHideShowPassword("confirm")
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={
                                                        showPassword.confirm
                                                            ? faEye
                                                            : faEyeSlash
                                                    }
                                                    className="top-0 m-0 fa"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    { Boolean(profileFormik.errors.confirm_password)? <p className='text-danger d-block fw-400 fs-xsmall '>{profileFormik.errors.confirm_password}</p> : '' }
                                </div>
                            </div>
                        
                

                            <ModelFooter
                                onSubmit={onSubmit}
                                editDisabled={disabled}
                                onEditRecord={profileValue}
                            />

                        </div>
                    </Form>
                </div>
            </div>
        </MasterLayout>
    );
};


const mapStateToProps = (state) => {
    const {userProfile} = state;
    return {userProfile}
};

export default connect(mapStateToProps, {fetchProfile,updateProfile})(Profile);
