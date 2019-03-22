import { FIND_ROOM } from '../constants/constants';

export const findRoom = (roomName) => {
  console.log("Room name: " + roomName);
  return {
    type: FIND_ROOM,
    payload: roomName
  };
};