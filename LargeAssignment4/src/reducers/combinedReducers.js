import { combineReducers } from 'redux';
import user from './userReducer';
import room from './roomReducer';

export default combineReducers({
    /* This is the Redux store state struct */
    user,
    room
});