import PropTypes from 'prop-types';
import {toastType} from '../../constants/index';
import {faCheck, faClose, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {placeholderText} from "../sharedMethod";
import parse from 'html-react-parser';


const ToastCard = (props) => {
    const {type, text,toast_title ,closeToast,onCancel} = props;
    const dispatch = useDispatch();


    useEffect(() => {
        setTimeout(() => dispatch(onCancel()), 5000);
    }, []);
    
    const iconColor = type === toastType.ERROR ? 'toast-card__icon--error' : 'toast-card__icon--success';

    const renderCard = () => {
        return (
            <div className='d-flex align-items-center'>
                <div className={`${iconColor}`}>
                    <FontAwesomeIcon icon={type === toastType.ERROR ? faXmark : faCheck}
                                     className='fs-1'/>
                </div>
                <div className='mx-3'>
                    {toast_title && (
                        <h2 className='toast-card__toast-title mb-1'>
                            {(`${type === toastType.ERROR ? placeholderText("toast.error.title") : placeholderText(toast_title)}`)}
                        </h2>
                        
                    )}

                    <p className='toast-card__toast-message'>
                     
                        <>
                            {typeof text === 'string' ? parse(text) : text}
                        </>
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className='toast-card'>
            <FontAwesomeIcon icon={faClose} className='fs-3 toast-card__close-btn' onClick={closeToast}/>
            {renderCard()}
        </div>
    )
};

ToastCard.propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
    ]),
    type: PropTypes.string,
    closeToast: PropTypes.func,
};

export default ToastCard;
