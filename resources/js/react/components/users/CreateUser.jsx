import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { addUser } from '../../store/action/userAction';
import MasterLayout from '../MasterLayout';
import { Filters } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { getFormattedMessage } from '../../shared/sharedMethod';

const CreateUser = ( props ) => {
    const { addUser } = props;
    const navigate = useNavigate();
    const addUserData = ( formValue ) => {
        addUser( formValue, navigate, Filters.OBJ );
    };

    return (
        <MasterLayout>
            <UserForm addUserData={addUserData} isEditMode={false} />
        </MasterLayout>
    );
}

export default connect( null, { addUser } )( CreateUser );
