import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/action/authAction";
import { authActionType, Tokens, toastType, apiBaseURL } from "../../constants";
import {connect} from 'react-redux';
import { createBrowserHistory } from "history";
import { getFormattedMessage, placeholderText } from '../../shared/sharedMethod';


const Login = (props) => {
   

    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem(Tokens.ADMIN);
    const history = createBrowserHistory();


    useEffect(() => {
        if (token) {
            history.push(window.location.pathname);
            navigate("/admin/dashboard");
        }
    }, []);

 
    const loginValidation = yup.object({
        email: yup
          .string("Email must be a string")
          .email("Please enter a valid email address")
          .required('Email is required'),
        password: yup
        .string()
        .required('Please Enter your password')
    });
    
  

    const loginFormik = useFormik({
    initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValidation,
        onSubmit: (values) => {
            setLoading(true);
            if (!values.email || !values.password) {
                setErrorMessage("Please fill in all fields");
            } else {
                dispatch(
                    loginAction(values, navigate)
                ) 
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
            }
        }
    });

    return (
        <>
            <div className="nk-main ">
          
                <div className="nk-wrap nk-wrap-nosidebar">
                    <div className="nk-content ">
                        <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                            <div className="brand-logo pb-4 text-center">
                                <a href="html/index.html" className="logo-link">
                                    <img className=" logo-img logo-img-lg" src="./images/dashboard-logo.png" />
                                </a>
                            </div>
                            <div className="card card-bordered">
                                <div className="card-inner card-inner-lg">
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <h4 className="nk-block-title">
                                                  {getFormattedMessage("Sign-In")}
                                            </h4>
                                            <div className="nk-block-des">
                                                <p>
                                                    {getFormattedMessage("Access using your email and password.")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <form  onSubmit={loginFormik.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="default-01">
                                                    
                                                    {getFormattedMessage("Email")}

                                                </label>
                                            </div>
                                            <div className="form-control-wrap">
                                                <input 
                                                className="form-control form-control-lg" 
                                                placeholder="Enter your email address "
                                                name='email'
                                                value={loginFormik.values.email}
                                                onChange={loginFormik.handleChange}
                                                id="email"

                                                />
                                                {loginFormik.touched.email && Boolean(loginFormik.errors.email)? <p className='text-danger'>{loginFormik.errors.email}</p> : '' }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-label-group">
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>
                                            <div className="form-control-wrap">
                                             
                                                <input 
                                                    type="password" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Enter your passcode" 
                                                    name='password'
                                                    value={loginFormik.values.password}
                                                    onChange={loginFormik.handleChange}
                                                    id="password"
                                                />
                                                {loginFormik.touched.password && Boolean(loginFormik.errors.password)? <p className='text-danger'>{loginFormik.errors.password}</p> : '' }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                          
                                            <button className="btn btn-lg btn-primary btn-block" type='submit'  disabled={loading}  >
                                              {loading ? (
                                                <span className="d-block">
                                                  {getFormattedMessage("Loading")}
                                                </span>
                                              ) : (
                                                <span>
                                                  {getFormattedMessage("Login")}
                                                </span>
                                              )}
                                            </button>
                                        </div>
                                    </form>


                              
                                </div>
                            </div>
                        </div>
                       
                    </div>
                
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {toasts: state.toasts}
};

export default connect(mapStateToProps)(Login);



