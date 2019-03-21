import { ADD_USER } from '../constants';

export const addUser = (name) => {
  console.log("User: " + name);
  return {
    type: ADD_USER,
    payload: name
  };
};