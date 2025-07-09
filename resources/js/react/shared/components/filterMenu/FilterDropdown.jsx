import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ReactSelect from "../select/reactSelect";
import { getFormattedMessage, getFormattedOptions } from "../../sharedMethod";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    statusOptions,
} from "../../../constants";

import { Button,Dropdown} from "react-bootstrap";
import { fetchAllProductCategories } from "../../../store/action/productCategoryAction";


const FilterDropdown = (props) => {
    const {
        setStatusData,
        onResetClick,
        isStatus
    } = props;


    const dispatch = useDispatch();
    const isReset = useSelector((state) => state.resetOption);
    const [status, setStatus] = useState();
    const statusFilterOptions = getFormattedOptions(statusOptions);


    useEffect(() => {
        fetchAllProductCategories(); 
    }, [ fetchAllProductCategories]);


    const onReset = () => {
        dispatch({ type: "RESET_OPTION", payload: true });
        setStatus({ label: "All", value: "0" });
        //setProductCategory({ label: "All", value: "0" });
        onResetClick();
    };


    const onStatusChange = (obj) => {
        dispatch({ type: "RESET_OPTION", payload: false });
        setStatus(obj);
        setStatusData(obj);
        dispatch({ type: "ON_TOGGLE", payload: false });
    };



    const statusDefaultValue = statusFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name,
        };
    });

    



    return (
        <Dropdown
            className="me-3 mb-2 filter-dropdown order-1 order-sm-0"
        >
            <Dropdown.Toggle
                variant="primary"
                className="text-white btn-icon hide-arrow p-2"
                id="filterDropdown"
            >
                <FontAwesomeIcon icon={faFilter} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-7 p-5">
             
            {isStatus ? (
                    <Dropdown.Header
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        eventkey="1"
                        className="mb-5 p-0"
                    >
                       
                       <ReactSelect
                            multiLanguageOption={statusFilterOptions}
                            name="status"
                            title={getFormattedMessage(
                                "purchase.select.status.label"
                            )}
                            placeholder={getFormattedMessage(
                                "purchase.select.status.label"
                            )}
                            defaultValue={statusDefaultValue[0]}
                            value={isReset ? statusDefaultValue[0] : status}
                            isRequired
                            onChange={onStatusChange}
                        />
                    </Dropdown.Header>
                ) : null}

             



                <div className="btn btn-secondary " onClick={onReset}>
                    {getFormattedMessage("date-picker.filter.reset.label")}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

const mapStateToProps = (state) => {
    const { base, productCategories } = state;
    return { base, productCategories };
};

export default connect(mapStateToProps, {
    fetchAllProductCategories,
})(FilterDropdown);
