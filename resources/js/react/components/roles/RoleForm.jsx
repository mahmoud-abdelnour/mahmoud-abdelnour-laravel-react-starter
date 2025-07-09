import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {editRole} from '../../store/action/roleAction';
import {getFormattedMessage, placeholderText} from "../../shared/sharedMethod";


import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';

const RoleForm = (props) => {
    const {
        addRolesData, 
        singleRole, 
        editRole,
        permissionsArray, 
        isEditMode,
        id
    } = props;

    const navigate = useNavigate();
    const [permissionsList,setNewPer] = useState(permissionsArray);
    const [allChecked, setAllChecked] = useState( false);
    const [selectedPermissionsArray, setselectedPermissionsArray] = useState([]);

    const [rolesValue, setRolesValue] = useState({
        name: '',
        permissions: []
    });

    useEffect(() => {
        setNewPer(permissionsArray); 
    }, [permissionsArray]); 


    useEffect(() => {
        const selectedPermissions = permissionsList.filter(item => item.isChecked);
        const selectedPermissionsArray2 = selectedPermissions.map(item => String(item.id));
        setselectedPermissionsArray(selectedPermissionsArray2); 
    }, [permissionsList]); 
    
   
    const [disabled, setIsDisabled] = useState(false);


    useEffect(()=> {
        setRolesValue(
            {
                name:singleRole ? singleRole.name : "",
                display_name:singleRole ? singleRole.display_name : "",
                permissions: singleRole ? singleRole.permissions : ''
            }
        )
    }, [singleRole])

    
    const roleValidation = yup.object({
        name: yup
        .string()
        .required('Please enter your role name'),
        display_name: yup
        .string()
        .required('Please enter your role name'),
        permissions: yup
        .array()
        .min(1, 'At least one permission must be selected')
        .required('Please enter your role name'),
    });


    const roleFormik = useFormik({
        initialValues: {
            name: rolesValue.name??'',
            display_name: rolesValue.display_name??'',
            permissions:selectedPermissionsArray??[],
        },
        enableReinitialize: true,
        validationSchema: roleValidation,
        onSubmit: (values) => {
            if (!values.name || !values.permissions ) {
                // setErrorMessage("Please fill in all fields");
            } else {
                let formData = _.cloneDeep(values);
                if(isEditMode){
                    editRole(id, formData, navigate);
                }else{
                    addRolesData(formData);
                }
            }
        }
    });


    useEffect(() => {
        const disabled =  (!roleFormik.isValid) || (roleFormik.isValid && !roleFormik.dirty && isEditMode ) ? true : false;
        setIsDisabled(disabled);
        if(roleFormik.values.permissions.length === permissionsList.length){
            setAllChecked(true)
        }else{
            setAllChecked(false)
        }
    }, [roleFormik]);
    

    const handleCheckAll = (e) => {
        const isChecked = e.target.checked;
        setAllChecked(!allChecked)
        roleFormik.setFieldValue(
          'permissions',
          isChecked ? permissionsList.map((permission) => String(permission.id)) : []
        );
    };



    return (
        <div className='container-fluid pt-10'>

            <div className='card custom-card p-5 bg-white'>
                <Form className='m-4' onSubmit={roleFormik.handleSubmit}>
                    <div className='row'>

                        <div className='col-md-12'>
                            <Form.Group className='mb-5 form-group'>
                                <Form.Label className='form-label fs-6 fw-bolder text-gray-700 mb-3'>{getFormattedMessage("globally.input.name.label")}: </Form.Label>
                                <span className='required'/>
                                <Form.Control 
                                    type='text' 
                                    name='name' 
                                    placeholder={placeholderText("globally.input.name.placeholder.label")}
                                    className='form-control'
                                    autoFocus={true}
                                    value={roleFormik.values.name}
                                    onChange={roleFormik.handleChange}
                                />
                                {Boolean(roleFormik.errors.name)? <p className='text-danger d-block fw-400 fs-xsmall '>{roleFormik.errors.name}</p> : '' }
                            </Form.Group>
                        </div>

                        <div className='col-md-12'>
                            <Form.Group className='mb-5 form-group'>
                                <Form.Label className='form-label fs-6 fw-bolder text-gray-700 mb-3'>{getFormattedMessage("globally.input.display_name.label")}: </Form.Label>
                                <span className='required'/>
                                <Form.Control 
                                    type='text' 
                                    name='display_name' 
                                    placeholder={placeholderText("globally.input.display_name.placeholder.label")}
                                    className='form-control'
                                    autoFocus={true}
                                    value={roleFormik.values.display_name}
                                    onChange={roleFormik.handleChange}
                                />
                                {Boolean(roleFormik.errors.display_name)? <p className='text-danger d-block fw-400 fs-xsmall '>{roleFormik.errors.display_name}</p> : '' }
                            </Form.Group>
                        </div>

                        <div>
                            <Form.Group className='mb-5 form-group'>
                                <div className='d-flex col-md-12 flex-wrap align-items-center'>
                                    <Form.Label
                                        className='form-label fs-6 fw-bolder text-gray-700 mb-0'>{getFormattedMessage("role.input.permission.label")}: 
                                    </Form.Label>
                                    <span className='required'/>
                                    <div className='d-flex col-md-6 flex-wrap ps-5'>
                                        <div className="col-md-8">
                                            <label className='form-check form-check-custom form-check-solid form-check-inline d-flex align-items-center my-3 cursor-pointer custom-label' >
                                              
                                                <input 
                                                    type='checkbox' 
                                                    checked={allChecked}
                                                    name='all_check'
                                                    className='me-3 form-check-input cursor-pointer'
                                                    onChange={handleCheckAll}
                                                />

                                                <div className='control__indicator'/>
                                                {getFormattedMessage("role.select.all-permission.label")}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className='d-flex col-md-12 flex-wrap'>
                                    {
                                        permissionsList && permissionsList.map((permission, index) => {
                                            return (
                                                <div className="col-md-4" key={index}>
                                                    <label className='form-check form-check-custom form-check-solid form-check-inline d-flex align-items-center my-3 cursor-pointer custom-label'  key={index}>

                                                        <input 
                                                            type='checkbox' 
                                                            name='permissions'
                                                            value={String(permission.id)}
                                                            onChange={roleFormik.handleChange}
                                                            checked={roleFormik.values.permissions.includes(String(permission.id))}
                                                            className='me-3 form-check-input cursor-pointer'
                                                        />

                                                        <div className='control__indicator'/>
                                                        {permission.name}
                                                    </label>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {Boolean(roleFormik.errors.permissions)? <p className='text-danger d-block fw-400 fs-xsmall '>{roleFormik.errors.permissions}</p> : '' }

                            </Form.Group>
                        </div>



                        <div className='d-flex mt-5'>
                            {singleRole ?
                                <div >
                                    <input className='btn btn-primary me-3' type='submit' value={placeholderText("globally.save-btn")}
                                           disabled={disabled}
                                    />
                                </div>
                                :
                                <div>
                                    <input className='btn btn-primary me-3' type='submit' value={placeholderText("globally.save-btn")}
                                           disabled={disabled}/>
                                </div>
                            }
                            <Link to='/app/roles'
                                  className='btn btn-light btn-active-light-primary me-3'>{getFormattedMessage("globally.cancel-btn")}</Link>
                        </div>


                    </div>
                </Form>
            </div>
        </div>
    )
};

export default connect(null, {editRole})(RoleForm);
