import MasterLayout from '../MasterLayout';
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import {fetchUsers} from '../../store/action/userAction';
import React, { useEffect, useState } from "react";
import {getAvatarName, getFormattedDate} from '../../shared/sharedMethod';
import moment from 'moment';
import { getFormattedMessage } from "../../shared/sharedMethod";
import DataTable from "react-data-table-component";
import { constants, Filters } from "../../constants";
import EmptyComponent from "../../components/empty-component/EmptyComponent";
import ReactDataTable from '../../shared/components/DataTable/ReactDataTable'
import ActionButton from '../../shared/components/ActionButtons/ActionButton';
import DeleteUser from './DeleteUser';

const Users = (props) => {
    const {
        users,
        fetchUsers,
        isLoading,
        totalRecord,
    } = props;

    const [isDelete, setIsDelete] = useState(null);
    const [deleteModel, setDeleteModel] = useState(false);
    

    useEffect(() => {
        fetchUsers();
    }, []);


    const itemsValue = users.length >= 0 && users.map(user => ({
        date: moment(user.attributes.created_at).format('DD-MM-YYYY'),
        time: moment(user.attributes.created_at).format('LT'),
        image: user.attributes.image,
        name: user.attributes.name,
        email: user.attributes.email,
        phone: user.attributes.phone,
        role_name: user.attributes.role.map((role)=> role.name),
        id: user.id
    }));

    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = '#/admin/users/edit/' + id;
    };


    const columns = [
        {
            name:getFormattedMessage('Name'),
            right:true,
            ignoreRowClick: true,
            allowOverflow: true,
            selector: row => row.name,
        },
        {
            name: getFormattedMessage('Phone'),
            selector: row => row.phone,
            sortField: 'phone',
            sortable: false,
        },
        {
            name: getFormattedMessage('Email'),
            selector: row => row.email,
            sortField: 'email',
            sortable: true,
        },
        {
            name: getFormattedMessage('Created at'),
            selector: row => row.date,
            sortField: 'created_at',
            sortable: true,
            cell: row => {
                return (
                    <span className='badge bg-info'>
                        <div className='mb-1'>{row.time}</div>
                        <div>{row.date}</div>
                    </span>
                )
            }
        },
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ActionButton item={row} goToEditAction={goToEdit} isEditMode={true}
                                       onClickDeleteModel={onClickDeleteModel}/>
        }
    ];


    const onChange = (filter) => {
        fetchUsers(filter, true);
    };


    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };


    return (
        <MasterLayout>
            <div className="data-table pt-0">
                <ReactDataTable 
                    columns={columns} 
                    items={itemsValue} 
                    onChange={onChange}
                    ButtonValue={('user.create.title')}
                    to='#/admin/users/create' 
                    totalRows={totalRecord} 
                    isLoading={isLoading}
                    isShowFilterField
                    isStatus
                />
                <DeleteUser onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
            </div>
        </MasterLayout>
    )
}


const mapStateToProps = (state) => {
    const {users, totalRecord, isLoading, allConfigData} = state;
    return {users, totalRecord, isLoading, allConfigData}
};

export default connect(mapStateToProps, {fetchUsers})(Users);



/* const mapStateToProps = (state) => {
    const {  config,  } = state;
    return { config };
};

export default connect(mapStateToProps)(Users); */

