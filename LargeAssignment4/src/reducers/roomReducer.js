import { FIND_ROOM } from '../constants/constants';

const initialState = {
    roomName: "lobby"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FIND_ROOM:
            return action.payload;
        default:
            return state;
    }
}