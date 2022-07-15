import { db } from "../models/index.js";

export const signUp = (req, res) => {
    const newUser = new db.sequelize.models.User;

    // TODO double check the password and password confirmation before sending it backend
    newUser.save((err, user) => {
        if (err) {
            res.status(500)
            return res.json({error: err.message})

        } else {
            res.status(201)
            res.json(user)
        }
    })
}