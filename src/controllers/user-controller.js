const { getAllUsers, getUserById, checkHost } = require("../utils/user-utils");

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

async function checkHostPrivledge(req, res) {
  try {
    if (!req.user.id) {
      throw Error("No authorised user detected");
    }

    const host = await checkHost(req.user.id);

    if (!host) {
      throw Error("User is not a host");
    }

    res.status(200).json(host);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getUsers,
  getUser,
  checkHostPrivledge,
};
