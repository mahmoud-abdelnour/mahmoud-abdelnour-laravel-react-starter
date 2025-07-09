import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Tokens } from '../../constants/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMaximize,
    faMinimize,
    faUser,
    faLock,
    faRightFromBracket,
    faAngleDown,
    faBell, faLanguage
} from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Row } from "react-bootstrap";
import {
    getAvatarName,
    getFormattedMessage,

} from "../../shared/sharedMethod";
import { useDispatch } from "react-redux";
import { updateLanguage } from '../../store/action/updateLanguageAction';
import { logoutAction } from '../../store/action/authAction';
import _ from 'lodash';


const Header = (props) => {

    const {
        menuClick,
    } = props;

    const userData = props.userData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentUserData, setUserData] = useState({});
    const stored_language = localStorage.getItem(Tokens.UPDATED_LANGUAGE);
    const [selected_language, setLanguage] = useState(stored_language);
    const loginUserArray = JSON.parse(localStorage.getItem( "loginUserArray"));

    const onLogOut = () => {
        dispatch(logoutAction(navigate));
        navigate('/login');
    };
    
    const onClickLanguage = (event,lang) => {
        event.preventDefault();
        setLanguage(lang);
        if(selected_language != lang)
            dispatch(updateLanguage(lang));
    };

    useEffect(() => {
        
    }, [selected_language]);    
    

    useEffect(() => {
        const loginUserArray = JSON.parse(localStorage.getItem("loginUserArray"));
        const User_Data = !_.isEmpty(userData)?userData:loginUserArray;
        setUserData(User_Data.attributes);
    }, [userData]); 
    
    

    return (
        <div className="nk-header nk-header-fixed is-light">
        <div className="container-fluid">
            <div className="nk-header-wrap">
                <div className="nk-menu-trigger d-xl-none ms-n1">
                    <a  className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu" 
                      onClick={(e) => menuClick(e)}
                      >
                        <em className="icon ni ni-menu"></em>
                    </a>
                </div>
                <div className="nk-header-brand d-xl-none">
                    
                </div>
             
                <div className="nk-header-tools">
                    <ul className="nk-quick-nav">
                        <li className="dropdown language-dropdown d-none d-sm-block me-n1">
                            <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-bs-toggle="dropdown">
                                <div className="quick-icon border border-light">
                                    {selected_language && selected_language === 'ar' ? <img className="icon" src="./images/flags/arabic.png" alt=""/> : <img className="icon" src="./images/flags/english-sq.png" alt=""/>}

                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-s1">
                                <ul className="language-list">
                                    <li>
                                        <a href="#" className="language-item" onClick={(e) => onClickLanguage(e,'en')}>
                                            <img src="./images/flags/english.png" alt="" className="language-flag"/>
                                            <span className="language-name"  >English</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="language-item" onClick={(e) => onClickLanguage(e,'ar')}>
                                            <img src="./images/flags/arabic.png" alt="" className="language-flag"/>
                                            <span className="language-name">عربي</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="dropdown user-dropdown">
                            <a href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
                                <div className="user-toggle">
                                    <div className="user-avatar sm">
                                        {currentUserData?.image?
                                            <img src={currentUserData.image}  />
                                        :
                                            <em className="icon ni ni-user-alt"></em>
                                        }
                                        
                                    </div>
                                    <div className="user-info d-none d-md-block">
                                            <div className="user-status">{currentUserData?.role?.[0].display_name}</div>
                                            <div className="user-name dropdown-indicator">{currentUserData?.name}</div>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-md dropdown-menu-end dropdown-menu-s1">
                                <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                                    <div className="user-card">
                                        <div className="user-avatar">
                                        {currentUserData?.image?
                                            <img src={currentUserData.image}  />
                                        :
                                        <span>{getAvatarName(currentUserData?.name)}</span>

                                        }
                                        

                                        </div>
                                        <div className="user-info">
                                            <span className="lead-text">{currentUserData?.name}</span>
                                            <span className="sub-text">{currentUserData?.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown-inner">
                                    <ul className="link-list">
                                        <li>
                                            <Link to="/admin/profile">
                                                <em className="icon ni ni-user-alt"></em><span>{getFormattedMessage( "View Profile")}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/settings">
                                                <em className="icon ni ni-setting-alt"></em><span>{getFormattedMessage( "Account Setting")}</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="dropdown-inner">
                                    <ul className="link-list">
                                        <li>
                                            <a
                                            role="button"
                                            onClick={(e) => onLogOut(e)}
                                        ><em className="icon ni ni-signout"></em><span>{getFormattedMessage( "Sign out")}</span></a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                     
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
};


const mapStateToProps = (state) => {
    const { userData } =state;
    return { userData };
};

export default connect(mapStateToProps)(Header);



