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


const Footer = (props) => {

    return (
        <>
             <div className="nk-footer">
                    <div className="container-fluid">
                        <div className="nk-footer-wrap">
                            <div className="nk-footer-copyright"> 2025 React Laravel Dashboard Made with love ♥ 
                            </div>
                        </div>
                    </div>
                </div>
                
        </>
    )
};


export default Footer;
