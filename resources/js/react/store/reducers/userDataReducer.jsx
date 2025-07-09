import {configActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case configActionType.FETCH_USER_DATA:
            return action.payload;
        default:
            return state;
    }
};
