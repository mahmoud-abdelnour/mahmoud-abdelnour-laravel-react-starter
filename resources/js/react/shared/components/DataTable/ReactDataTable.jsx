import React, { useState, useEffect, useMemo } from "react";
import { constants, Filters } from "../../../constants";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import { renderSortIcons } from "../../../config/sortConfig";
import TableButton from "../ActionButtons/TableButton";
import EmptyComponent from "../../../components/empty-component/EmptyComponent";
import { getFormattedMessage } from "../../sharedMethod";
//import DateRangePicker from "../datepicker/DateRangePicker";
import FilterDropdown from "../filterMenu/FilterDropdown";
import { Button, Col } from "react-bootstrap";


const ReactDataTable = (props) => {
    const {
        columns,
        items,
        defaultLimit = Filters.OBJ.page,
        onChange,
        totalRows,
        paginationRowsPerPageOptions = [10, 15, 25, 50, 100],
        isLoading,
        isShowFilterField,
        isShowSearch,
        subHeader = true,
        ButtonValue,
        to,
        isStatus
    } = props;

    const [perPage, setPerPages] = useState(defaultLimit);
    const [pageSize, setPageSize] = useState(Filters.OBJ.pageSize);
    const [created_at] = useState(Filters.OBJ.created_at);
    const [order_By, setOrderBy] = useState(Filters.OBJ.order_By);
    const [direction, setDirection] = useState(Filters.OBJ.direction);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [status, setStatus] = useState();

    const dispatch = useDispatch();

    const tableColumns = useMemo(() => columns, []);

    useEffect(() => {
        onChangeDidMount(currentPage);
    }, [
        currentPage,
        perPage,
        order_By,
        direction,
        searchText,
        pageSize,
        totalRows,
        status
    ]);

    const handleSearch = (searchText) => {
        handlePageChange(1);
        setSearchText(searchText);
    };

    const customSort = (column, sortDirection) => {
        if (column) {
            setOrderBy(column.sortField);
            setDirection(sortDirection);
        }
    };

    const onResetClick = () => {
        setStatus({ label: "All", value: "0" });
    };

   
    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <>

                {isShowSearch ? (
                    ""
                ) : (
                    <FilterComponent handleSearch={handleSearch} />
                )}

                <Col
                    xxl={isShowSearch ? 12 : 8}
                    className="d-flex flex-wrap align-items-start justify-content-end col-12 col-md-9 col-lg-8"
                >
                    {isShowFilterField ?  (
                        <FilterDropdown
                            onResetClick={onResetClick}
                            isStatus={isStatus}
                            setStatusData={setStatus}
                           
                        />
                    ) : null}
                    

                    {ButtonValue ? (
                        <TableButton ButtonValue={ButtonValue} to={to} />
                    ) : null}

                   
                </Col>
            </>
        );
    }, [items]);

    const onChangeDidMount = () => {
        const filters = {
            order_By: order_By,
            page: currentPage,
            pageSize: pageSize,
            direction: direction,
            created_at: created_at,
            status: status ? status.value : null,
            search:
                searchText === ""
                    ? searchText === 1 || searchText === undefined
                        ? ""
                        : searchText.toLowerCase()
                    : "" || searchText !== ""
                    ? searchText.toLowerCase()
                    : "",
        };
        
        onChange(filters);
    };

    const handlePerRowsChange = async (recordPerPage) => {
        if (perPage !== recordPerPage) {
            setPerPages(recordPerPage);
            setPageSize(recordPerPage);
        }
    };

    const handlePageChange = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page);
        }
    };

    const paginationComponentOptions = {
        rowsPerPageText: getFormattedMessage(
            "react-data-table.records-per-page.label"
        ),
    };

    const emptyStateProps = {
        isLoading: isLoading,
    };
    
  

    return (
        <div className="data-table pt-0">



            <DataTable
                columns={tableColumns}
                noDataComponent={<EmptyComponent {...emptyStateProps} />}
                data={items}
                paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                pagination={true}
                onChangePage={handlePageChange}
                paginationServer={true}
                paginationComponentOptions={paginationComponentOptions}
                subHeader={subHeader}
                onSort={customSort}
                sortServer
                paginationTotalRows={totalRows}
                subHeaderComponent={subHeaderComponentMemo}
                onChangeRowsPerPage={handlePerRowsChange}
                sortIcon={renderSortIcons(direction)}
                persistTableHead={false}

            />


        </div>
    );
};

ReactDataTable.propTypes = {
    columns: PropTypes.array,
    paginationRowsPerPageOptions: PropTypes.array,
    defaultLimit: PropTypes.number,
    totalRows: PropTypes.number,
    onChange: PropTypes.func,
    sortAction: PropTypes.func,
};
export default ReactDataTable;
