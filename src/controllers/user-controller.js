// import { getAllUsers } from '../utils/user-utils';
const { getAllUsers, getUserById } = require('../utils/user-utils');

async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500);
    res.json({ error: 'No users found' });
  }
}

async function getUser(req, res) {
  const user = await getUserById(req.params.id);

  if (!user) {
    res.json({ error: 'No user found' });
  }
  res.status(200).json(user);
}

module.exports = {
  getUsers,
  getUser,
};
