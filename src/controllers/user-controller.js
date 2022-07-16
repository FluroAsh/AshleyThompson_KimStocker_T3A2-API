const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;
 
/** Returns a promise */
const getAllUsers = User.findAll();

let usersArray = []
 
async function getUsers(req, res) {
 const users = await getAllUsers;
 for (let user of users) {
   usersArray.push(user.dataValues)
 }
 
//  console.log(users[0].dataValues);
 console.log(usersArray)
 res.json(usersArray)
}
 
module.exports = {
 getUsers,
};
