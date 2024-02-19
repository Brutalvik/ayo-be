require("dotenv")
const express = require("express")
const login = express.Router();
const users = require("../../db/user")
const bcrypt = require("bcrypt")
const {loginSchema} = require("../../middleware/validation")
// const jwt = require("jsonwebtoken")
// const authenticateToken = require("../../auth/auth")

login.post("/login", async(req, res) => {
    const email = req.body.email
    const password = req.body.password

    const validation = loginSchema.validate(req.body)

    if(validation.error) {
        return res.status(400).json({
          isLoggedIn: false,
          error: validation.error.details[0].message
    })
    }

    try{
        const userCollection = await users();
        const response = await userCollection.findOne({ email });

        if (!response) {
          return res.status(400).send({
            isLoggedIn: false,
            message: `User with email ${email} does not exist`,
          });
        }
        
        if(response.isLoggedIn) {
            return res.status(200).send({
                isLoggedIn: response.isLoggedIn,
                message: `${email} is already logged in`,
                data: {
                    id: response._id,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email
                }
            })
        }

        bcrypt.compare(password, response.password, async(error, result) => {

            if(error) {
                return res.status(400).json({
                    isLoggedIn: false,
                    error: "Something went wrong"
                })
            }

            if(!result) {
                return res.status(400).json({
                    isLoggedIn: false,
                    error: 'Wrong password'
                })
            }
 

            // const userPayload = {
            //         id: response._id,
            //         firstName: response.firstName,
            //         lastName: response.lastName,
            //         email: response.email
            // }

            // const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET)
            // res.json({accessToken: accessToken})

            res.status(200).json({
                isLoggedIn: response.isLoggedIn,
                data: {
                    id: response._id,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email
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

module.exports = login