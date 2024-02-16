const joi = require("joi")

const userSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required()
})

module.exports = {userSchema}