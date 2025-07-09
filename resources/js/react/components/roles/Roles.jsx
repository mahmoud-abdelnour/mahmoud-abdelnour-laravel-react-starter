import MasterLayout from '../MasterLayout';
import { connect } from "react-redux";
import {fetchRoles} from '../../store/action/roleAction';
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { getFormattedMessage } from "../../shared/sharedMethod";
import ReactDataTable from '../../shared/components/DataTable/ReactDataTable'
import ActionButton from '../../shared/components/ActionButtons/ActionButton';
import DeleteRole from './DeleteRole';

const Roles = (props) => {
    const {
        roles,
        fetchRoles,
        isLoading,
        totalRecord,
    } = props;

    const [isDelete, setIsDelete] = useState(null);
    const [deleteModel, setDeleteModel] = useState(false);
    

    useEffect(() => {
        fetchRoles();
    }, []);


    const itemsValue = roles.length >= 0 && roles.map(role => ({
        date: moment(role.attributes.created_at).format('DD-MM-YYYY'),
        time: moment(role.attributes.created_at).format('LT'),
        name: role.attributes.name,
        display_name: role.attributes.display_name,
        id: role.id

    }));

    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = '#/admin/roles/edit/' + id;
    };


    const columns = [
        {
            name: getFormattedMessage('Name'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            selector: row => row.name,
        },
        {
            name: getFormattedMessage('Display Name'),
            selector: row => row.display_name,
            sortField: 'display_name',
            sortable: false,
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
            cell: row => <ActionButton item={row} goToEditAction={goToEdit} isEditMode={true} onClickDeleteModel={onClickDeleteModel}/>
        }
    ];


    const onChange = (filter) => {
        fetchRoles(filter, true);
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
                    ButtonValue={('roles.create.title')}
                    to='#/app/roles/create' 
                    totalRows={totalRecord} 
                    isLoading={isLoading}
                />
                <DeleteRole onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
            </div>
        </MasterLayout>
    )
}


const mapStateToProps = (state) => {
    const {roles, totalRecord, isLoading, allConfigData} = state;
    return {roles, totalRecord, isLoading, allConfigData}
};

export default connect(mapStateToProps, {fetchRoles})(Roles);




