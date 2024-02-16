import * as joi from "joi";

export const userSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required()
})

export const validateRequest = (userSchema) => {
    return (req, res, next) => {
        const result = joi.validate(req.body, userSchema)
        if(result.error) {
            return res.status(400).json({
                error: result.error.details[0].message
            })
        }
        if (!req.value) {
            req.value = {};
          }
        
        req.value['body'] = result.value;
        next();
    }
}