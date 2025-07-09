import React, {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import PropTypes from 'prop-types';

const Toast = (props) => {
    const {onCancel, language,id} = props;
    useEffect(() => {
      setTimeout(() => onCancel(), 5000);
    }, []);

    return (
        <div>
        <ToastContainer
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            draggable
            containerId={id}
            pauseOnHover
            pauseOnFocusLoss
        />
        <p>bbbbbbbbbbb</p>
        </div>
    );
};

Toast.propTypes = {
    onCancel: PropTypes.func,
};

export default Toast;
