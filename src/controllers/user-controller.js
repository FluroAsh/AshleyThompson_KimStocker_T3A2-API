// import { getAllUsers } from '../utils/user-utils';
const { getAllUsers } = require('../utils/user-utils');

async function getUsers(req, res) {
  const users = await getAllUsers;
  res.json(users);
}

module.exports = {
  getUsers,
};
