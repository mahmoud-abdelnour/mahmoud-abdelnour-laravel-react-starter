import React from 'react';
import MasterLayout from '../MasterLayout';
import { useSelector } from "react-redux";
import { connect } from "react-redux";

const BlankPage = (props) => {
    const {
        config,
    } = props;

    return (
        <MasterLayout>
            
            {config}
            
        </MasterLayout>
    )
}


const mapStateToProps = (state) => {
    const {  config,  } = state;
    return { config };
};

export default connect(mapStateToProps)(BlankPage);

