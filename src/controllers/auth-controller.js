const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;

// TODO double check the password and password confirmation before sending it backend

async function signUp(req, res) {
    
    // if (req.body.password === req.body.password_confirmation) {


        try {
            
            const newUser = await User.create(req.body);
            console.log("new User", newUser.dataValues)
            res.status(201)
            res.send(newUser.dataValues)



        } catch (err) {
            res.status(500)
            return res.json({error: err.message})
        }
    // } else {
    //     // res.status(402)
    //     return res.json({error: "Password confirmation does not match password entered"})
    // }

}
 
module.exports = {
    signUp
}