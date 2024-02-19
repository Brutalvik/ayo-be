const express = require("express")
const register = express.Router();
const users = require("../../db/user")
const bcrypt = require("bcrypt")
const {registrationSchema} = require("../../middleware/validation")
const SALT = 10;

//Register user
register.post("/register", async(req, res) => {

    const user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }

    const validation = registrationSchema.validate(req.body)
    
    if(validation.error) {
        return res.status(400).json({
          isRegistered: false,
          error: validation.error.details[0].message
    })
    }

    try{
        const userCollection = await users();
        const email = user.email
        const response = await userCollection.findOne({ email });

        if (response) {
          return res.status(400).send({
            isRegistered: false,
            message: `User with email ${email} already exists`,
          });
        }

        bcrypt.hash(user.password, SALT, async(error, hash) => {
            if(error) {
                return res.status(400).json({
                    isRegistered: false,
                    error: 'Password encryption failed'
                })
            }

            const insertUser = await userCollection.insertOne({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: hash
            })

            if(!insertUser) {
                return res.status(400).json({
                    isRegistered: false,
                    message: "failed"
                })
            }
            
            res.status(200).json({
                message: "success",
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
            })
        })
        
    } catch(error) {
        res.status(400).json({
            isRegistered:false,
            error:"unknown"
        })
    }

})

module.exports = register