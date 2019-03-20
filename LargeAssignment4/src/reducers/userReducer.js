import { ADD_USER } from '../constants';

const initialState = {
    name: ''
};

export default function(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case ADD_USER:
            return action.payload;
        default:
            return state;
    }
}