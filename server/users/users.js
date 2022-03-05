const users = [];

const isRoomFull = (roomID) => {
  const usersInRoom = users.filter((user) => user.roomID === roomID);
  if (usersInRoom.length >= 2) {
    return true;
  } else {
    return false;
  }
};

const userJoinRoom = (id, username, roomID) => {
  const user = { id, username, roomID };
  if (users.filter((user) => user.roomID === roomID).length < 2) {
    users.push(user);
  }
  return user;
};

const userLeaveRoom = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

const getAllUsersInRoomByID = (id) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    const room = user.roomID;
    return users.find((user) => user.roomID === room);
  }
};

const getUserByID = (id) => {
  return users.find((user) => user.id === id);
};

const getAllUsersByRoom = (roomID) => {
  return users.find((user) => user.roomID === roomID);
};

module.exports = {
  isRoomFull,
  userJoinRoom,
  userLeaveRoom,
  getUserByID,
  getAllUsersInRoomByID,
  getAllUsersByRoom,
};
