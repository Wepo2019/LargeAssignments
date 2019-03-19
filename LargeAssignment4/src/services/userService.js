import { socket } from './socketService';

const userService = () => { 
    return {
        getAllUsernames: () => socket.on('users', list => {
            return list;
        })
    };
};

export default userService();