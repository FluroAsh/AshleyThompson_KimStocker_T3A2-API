// import { getAllUsers } from '../utils/user-utils';
const { getAllUsers, getUserById } = require('../utils/user-utils');

async function getUsers(req, res) {
  const users = await getAllUsers;
  res.json(users);
}

async function getUser(req, res) {
  const user = await getUserById(req.params.id);

  if (!user) {
    res.json({ error: 'No user found' });
  }

  res.json(user);
}

module.exports = {
  getUsers,
  getUser,
};
