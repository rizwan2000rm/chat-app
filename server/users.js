// Users Data
const users = [];

// Adding a User
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) {
    return { error: "Enter Username and room." };
  }

  if (existingUser) {
    return { error: "Username is Taken" };
  }

  const user = { id, name, room };
  users.push(user);
  return { user };
};

// Removing a User
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Searching a User
const getUser = (id) => {
  return users.find((user) => user.id === id);
};

// Searching a User in a specific room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// EXPORTS
module.exports = { addUser, removeUser, getUser, getUsersInRoom };
