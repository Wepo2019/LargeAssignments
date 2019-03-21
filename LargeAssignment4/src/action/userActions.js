import { ADD_USER } from '../constants';

export const addUser = (name) => {
  console.log(name);
  return {
    type: ADD_USER,
    payload: name
  };
};