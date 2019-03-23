# README
# SC-T-427-WEPO
### Large Assignment 4 - Chat.IO
This README is about our Chat.IO client and with accompanying server. 

## About
### Chat.IO client functionality
1. User can pick his nick name
   * If the name is untaken, he is free to move forward in the application. 
   * If the name is taken the user is prompted and let know that he/she has to choose different nickname.
2. After the user has chosen his/hers nick, he/she can see a list of all chat rooms already active.
3. User can join chat room and leave chat rooms.
4. User can create new chat rooms.
   * When a user creates a room, he is automatically the rooms OP.
   * If user that is the rooms OP leaves the room he/she is no longer the rooms OP.
5. Inside chatrooms, users can send messages to the room, see previous messages, and see new messages appear in real time.
6. Users can send private messages to each other.
7. OPs can kicks users from room.
   * Kicked users can reenter the same room they were kicked from.
8. Ops can ban users from room.
   * Banned users can not reenter the same room they were banned from. And the rooms are not render for them.
9. Ops can grant other user Op privilege.

## Changes made to the server code ##
You can also finds these changes comments in the README for the server code.

**Changes made to joinroom**
We added that when you joinroom and the room is undefined in other words you create the room, the socket emits updatechat.

## Dependencies install and to build
### Server and Client
First off you need to install dependencies, so type npm install in the console.
## To Run  
### Server
To run the server you need to type node chatserver.js in console.
### Client
To run the client you need to type npm start in console.

## Known Issues
No component testing, we ran out of time.

## Team Members - 
Guðrún Margrét Ívansdóttir: gudruni17@ru.is  
Hjörtur Jóhann Vignisson: hjorturv17@ru.is  
Ívar Kristinn Hallsson: ivar17@ru.is   