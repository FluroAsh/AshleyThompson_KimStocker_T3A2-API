const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

async function findUser(email) {
  try {
    const user = await User.findOne({ where: { email: `${email}` } });
    return user;
  } catch (err) {
    res.status(500);
    return res.json({ error: err.message });
  }
}

module.exports = {
  findUser
};
