import { LOGIN_USER } from '../constants/constants';
import userService from '../services/userService';

export const getAllUsernames = () => {
  return dispatch => {
    return userService.getAllUsernames().then(d => {
      dispatch(getAllUsernamesSuccess(d));
    });
  };
};

const getAllUsernamesSuccess = list => {
  return {
    type: LOGIN_USER,
    payload: list
  };
};