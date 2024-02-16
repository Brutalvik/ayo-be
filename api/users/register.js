import express from "express";
import users from "../../db/user"
import bcrypt from "bcrypt"
import {ObjectId} from "mongodb"
import { userSchema } from "../../middleware/validation";
import { userSchema, validateRequest } from "../../middleware/validation";


const register = express.Router();

//Register user
register.post("/register", validateRequest(userSchema), async(req, res) => {

    const user = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }
    const userCollection = await users();
    const insertUser = await userCollection.insertOne({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    })

    if(!insertUser) {
        return res.status(400).json({
            isRegistered: false,
            message: "failed"
        })
    }

    res.status(200).json({
        message: "success",
        data: user,
    })

})

