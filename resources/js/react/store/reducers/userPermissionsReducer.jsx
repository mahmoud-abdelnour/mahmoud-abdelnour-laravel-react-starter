import {configActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case configActionType.FETCH_USER_PERMISSIONS:
            return action.payload;
        default:
            return state;
    }
};
