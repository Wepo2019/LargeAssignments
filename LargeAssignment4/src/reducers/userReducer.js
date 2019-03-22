import { ADD_USER } from '../constants/constants';

const initialState = {
    name: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return action.payload;
        default:
            return state;
    }
}