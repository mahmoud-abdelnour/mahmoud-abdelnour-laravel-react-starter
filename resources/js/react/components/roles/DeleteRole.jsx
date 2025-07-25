import React from 'react';
import {connect} from 'react-redux';
import {deleteRole} from '../../store/action/roleAction';
import DeleteModel from '../../shared/components/ActionButtons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';

const DeleteRole = (props) => {
    const {deleteRole, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteRoleClick = () => {
        deleteRole(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel 
                                onClickDeleteModel={onClickDeleteModel} 
                                deleteModel={deleteModel}
                                deleteClick={deleteRoleClick} 
                                name={getFormattedMessage('users.table.role.column.title')}/>}
        </div>
    )
};

export default connect(null, {deleteRole})(DeleteRole);
