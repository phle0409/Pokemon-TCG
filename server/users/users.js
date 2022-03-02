const users = [];

const isRoomFull = () => {
  return users.length >= 2;
};

const userJoinRoom = (id, username, roomID) => {
  const user = { id, username, roomID };
  if (users.length <= 2) {
    users.push(user);
  }
  return user;
};

module.exports = {
  isRoomFull,
  userJoinRoom,
};
