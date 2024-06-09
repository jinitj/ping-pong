const bcrypt = require('bcryptjs');

const users = [
  { username: 'Eliud', password: bcrypt.hashSync('Eliud', 8), role: 'user' },
  { username: 'Mo', password: bcrypt.hashSync('Mo', 8), role: 'user' },
  { username: 'Mary', password: bcrypt.hashSync('Mary', 8), role: 'user' },
  { username: 'Usain', password: bcrypt.hashSync('Usain', 8), role: 'user' },
  { username: 'Paula', password: bcrypt.hashSync('Paula', 8), role: 'user' },
  { username: 'Galen', password: bcrypt.hashSync('Galen', 8), role: 'user' },
  { username: 'Shalane', password: bcrypt.hashSync('Shalane', 8), role: 'user' },
  { username: 'Haile', password: bcrypt.hashSync('Haile', 8), role: 'user' },
  { username: 'Jinit', password: bcrypt.hashSync('Jinit', 8), role: 'admin' },
];

const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

const validatePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { findUserByUsername, validatePassword };
