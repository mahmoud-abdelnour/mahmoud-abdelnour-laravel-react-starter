import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import UserForm from './UserForm';
import {fetchUser} from '../../store/action/userAction';
import {useParams} from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import {getFormattedMessage} from '../../shared/sharedMethod';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const EditUser = (props) => {
    const {fetchUser, users} = props;
    const {id} = useParams();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchUser(id);
        setIsEdit(true);
    }, []);



    const itemsValue = users && users.length === 1 && users.map(user => ({
        image: user.attributes.image,
        name: user.attributes.name,
        email: user.attributes.email,
        phone: user.attributes.phone,
        role_id: {
            value: user.attributes.role.map((ro) => ro.id),
            label: user.attributes.role.map((ro) => ro.name)
        },
        id: user.id
    }));



    return (
        <MasterLayout>
            <TopProgressBar />
            {users.length === 1 && <UserForm singleUser={itemsValue} id={id} isEditMode={isEdit}/>}
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const {users} = state;
    return {users}
};

export default connect(mapStateToProps, {fetchUser})(EditUser);
