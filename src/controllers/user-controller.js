const { getAllUsers, getUserById } = require("../utils/user-utils");

async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    /** A bad response will return null */
    if (!users) {
      throw Error;
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: "No users found" });
  }
}

async function getUser(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw Error;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: "No user found" });
  }
}

module.exports = {
  getUsers,
  getUser,
};
