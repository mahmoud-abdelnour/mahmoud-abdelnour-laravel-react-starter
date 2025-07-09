import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import RoleFrom from './RoleForm';
import {addRole} from '../../store/action/roleAction';
import MasterLayout from '../MasterLayout';
import {fetchPermissions} from '../../store/action/permissionAction';
import {getFormattedMessage} from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {useParams} from 'react-router-dom';
import {fetchRole} from '../../store/action/roleAction';
import Spinner from "../../shared/components/loaders/Spinner";

const EditRole = (props) => {
    const { fetchPermissions,fetchRole,roles,isLoading, permissions} = props;
    const navigate = useNavigate();
    const {id} = useParams();

    const itemsValue = roles.length === 1 && roles.map((role) => ({
        name: role.attributes.name,
        display_name: role.attributes.display_name,
        permissions: role.attributes.permissions
    }));

    useEffect(() => {
        fetchRole(id);
        fetchPermissions();
    }, []);


      const preparePermissions = (permissions, selectedPermission) => {
        let permissionArray = [];
        permissions.length !== 0 && permissions.forEach(permission => {
            const perm = selectedPermission && selectedPermission.find(perm => perm.id === permission.id);
            let selected = false;
            if (perm) {
                selected = true;
            }
            permissionArray.push({
                id: permission.id,
                name: permission.attributes.display_name,
                selected,
                isChecked: selected
            })
        });
        return permissionArray;
    };

    const newPermission = roles[0] && roles[0].attributes && preparePermissions(permissions, roles[0].attributes.permissions)



    return (
        <>
            <MasterLayout>
                <TopProgressBar/>
                {isLoading ? <Spinner />:
                roles.length === 1 && newPermission && <RoleFrom singleRole={itemsValue[0]} id={id} permissionsArray={newPermission} isEditMode />
            }
            </MasterLayout>
        </>
    );
}



const mapStateToProps = (state) => {
    const {roles, permissions, isLoading} = state;
    return {
        roles,
        permissions,
        isLoading
    }
};

export default connect(mapStateToProps, {fetchRole,fetchPermissions})(EditRole);
