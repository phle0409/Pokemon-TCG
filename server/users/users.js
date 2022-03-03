const users = [];

const isRoomFull = (roomID) => {
  console.log(users.filter((user) => user.roomID === roomID));
  return users.filter((user) => user.roomID === roomID).length >= 2;
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

const getUserByID = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = {
  isRoomFull,
  userJoinRoom,
  userLeaveRoom,
  getUserByID,
};
