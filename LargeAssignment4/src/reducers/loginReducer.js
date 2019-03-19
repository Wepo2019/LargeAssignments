import { LOGIN_USER } from '../constants/constants';

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log(action.payload);
      return action.payload;
    default: return state;
  }
};