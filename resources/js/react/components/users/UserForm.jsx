import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import * as EmailValidator from "email-validator";
import { editUser } from "../../store/action/userAction";
import ImagePicker from "../../shared/components/ImagePicker/ImagePicker"
import {
    getAvatarName,
    getFormattedMessage,
    placeholderText,
    numValidate,
} from "../../shared/sharedMethod";
import user from "../../assets/images/avatar.png";
import ModelFooter from "../../shared/modelFooter";
import ReactSelect from "../../shared/components/select/reactSelect";
import { fetchAllRoles } from "../../store/action/roleAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { setSavingButton } from "../../store/action/saveButtonAction"; 
import _ from 'lodash';


import { Formik, useFormik } from 'formik';
import * as yup from 'yup';



const UserForm = (props) => {
    const {
        addUserData,
        id,
        singleUser,
        isEditMode,
        isCreate,
        fetchAllRoles,
        roles,
    } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [disabled, setIsDisabled] = useState(false);
    


    const [userValue] = useState({
        name: singleUser ? singleUser[0].name : "",
        email: singleUser ? singleUser[0].email : "",
        phone: singleUser ? singleUser[0].phone : "",
        password: "",
        confirm_password: "",
        role_id: singleUser ? singleUser[0].role_id : "",
        image: singleUser ? singleUser[0].image : "",
    });
    

    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    });

    
    const avatarName = getAvatarName(
        singleUser &&
            singleUser[0].image === "" &&
            singleUser[0].name 
    );

    const newImg =
        singleUser &&
        singleUser[0].image &&
        singleUser[0].image === null &&
        avatarName;
        
    const [imagePreviewUrl, setImagePreviewUrl] = useState(newImg && newImg);
    const [selectImg, setSelectImg] = useState(null);


    useEffect(() => {
        fetchAllRoles();
        setImagePreviewUrl(
            singleUser ? singleUser[0].image && singleUser[0].image : user
        );
    }, []);


    const [selectedRole] = useState(
        singleUser && singleUser[0]
            ? 
                {
                    label: singleUser[0].role_id.label[0],
                    value: singleUser[0].role_id.value[0],
                }
              
            : null
    );

  

    const userValidation = yup.object({
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
        role_id: yup
        .object()
        .required('Please Select your Role'),
        
        password:  ( isEditMode) ? null :
        yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        confirm_password:  ( isEditMode) ? null :
        yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),


        image: 
            ( isEditMode && selectImg == null && userValue.image != null) ? null :
        yup
        .mixed()
        .test(
            'fileSize',
            'File is too large',
            (value) => value && value.size <= 1048576 // 1 MB
        )
        .test(
            'fileType',
            'Unsupported file format',
            (value) => value && ['image/jpeg', 'image/png'].includes(value.type)
        ),

        
    });


    const userFormik = useFormik({
        initialValues: {
                name: userValue.name??'',
                email: userValue.email??'',
                phone: userValue.phone??'',
                role_id: selectedRole??'',
        },
        validationSchema: userValidation,
        context: { isEditMode },
        onSubmit: (values) => {
            if (!values.name || !values.email || !values.phone) {
               // setErrorMessage("Please fill in all fields");
            } else {
                let formData = _.cloneDeep(values);
                if(isEditMode){
                    formData.role_id = formData.role_id.value;
                    dispatch(editUser(id, formData, navigate));
                }else{
                    formData.role_id = formData.role_id.value;
                    addUserData(formData);
                }
            }
        }
    });

    
    const handleImageChanges = (e) => {
        userFormik.setFieldValue('image', e.currentTarget.files[0]); 
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


    const onRolesChange = (obj) => {
        userFormik.setFieldValue('role_id', obj); 
    };


    useEffect(() => {
        const disabled =  (!userFormik.isValid) || (userFormik.isValid && !userFormik.dirty && isEditMode ) ? true : false;
        setIsDisabled(disabled);
    }, [userFormik]);


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

    const onSubmit = (event) => {

    };


    return (
        <div className="card">
            <div className="card-body">

                <Form onSubmit={userFormik.handleSubmit}>

                    <div className="row">

                        <div className="mb-4">
                            <ImagePicker
                                user={user}
                                isCreate={isCreate}
                                avtarName={avatarName}
                                imageTitle={placeholderText(
                                    "globally.input.change-image.tooltip"
                                )}
                                imagePreviewUrl={imagePreviewUrl}
                                handleImageChange={handleImageChanges}
                            />
                            { Boolean(userFormik.errors.image)? <p className='text-danger d-block fw-400 fs-xsmall '>{userFormik.errors.image}</p> : '' }
                        </div>

                        <div className="col-md-6 mb-3">
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
                                value={userFormik.values.name}
                                onChange={userFormik.handleChange}
                                id="name"
                            />
                            {Boolean(userFormik.errors.name)? <p className='text-danger d-block fw-400 fs-xsmall '>{userFormik.errors.name}</p> : '' }
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
                                value={userFormik.values.email}
                                onChange={userFormik.handleChange}
                                id="email"
                            />
                            {Boolean(userFormik.errors.email)? <p className='text-danger d-block fw-400 fs-xsmall '>{userFormik.errors.email}</p> : '' }
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
                                value={userFormik.values.phone}
                                onChange={userFormik.handleChange}
                                id="phone"
                            />
                            {Boolean(userFormik.errors.phone)? <p className='text-danger d-block fw-400 fs-xsmall '>{userFormik.errors.phone}</p> : '' }
                        </div>

                        <div className="col-md-6">
                            <ReactSelect
                                title={getFormattedMessage(
                                    "user.input.role.label"
                                )}
                                placeholder={placeholderText(
                                    "user.input.role.placeholder.label"
                                )}
                                defaultValue={selectedRole}
                                data={roles}
                                onChange={onRolesChange}
                                errors={userFormik.errors.role_id}
                            />
                        </div>

                       

                        {isEditMode ? (
                            ""
                        ) : (
                            <>

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
                                                value={userFormik.values.password}
                                                onChange={userFormik.handleChange}
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
                                        { Boolean(userFormik.errors.password)? <p className='text-danger d-block fw-400 fs-xsmall '>{userFormik.errors.password}</p> : '' }
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
                                                value={userFormik.values.confirm_password}
                                                onChange={userFormik.handleChange}
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
                                        { Boolean(userFormik.errors.confirm_password)? <p className='text-danger d-block fw-400 fs-xsmall '>{userFormik.errors.confirm_password}</p> : '' }
                                    </div>
                                </div>
                            </>
                        )}
                       
               

                        <ModelFooter
                            onEditRecord={singleUser}
                            onSubmit={onSubmit}
                            editDisabled={disabled}
                            link="/app/users"
                            addDisabled={disabled}
                        />

                    </div>
                </Form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { roles } = state;
    return { roles };
};

export default connect(mapStateToProps, { fetchAllRoles })(UserForm);
