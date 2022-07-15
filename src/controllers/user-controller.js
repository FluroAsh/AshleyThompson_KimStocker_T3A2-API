// import { getAllUsers } from '../utils/user-utils';
const { getAllUsers } = require('../utils/user-utils');

let usersArray = []

async function getUsers(req, res) {
  const users = await getAllUsers;
  for (let user of users) {
    usersArray.push(user.dataValues)
  }

  console.log(users[0].dataValues);
  console.log(usersArray)
  res.json(usersArray)
}

module.exports = {
  getUsers,
};