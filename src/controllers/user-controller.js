// import { getAllUsers } from '../utils/user-utils';
const { getAllUsers } = require('../utils/user-utils');

async function getUsers(req, res) {
  const users = await getAllUsers;
  console.log(users[0].dataValues.firstName);
}

module.exports = {
  getUsers,
};
