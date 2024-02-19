require("dotenv")
const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(token === null) {
        return res.send(401).json({
            error: true,
            message: `401 Not Authorized`
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({ error: true, message: "Access Denied"})
        }

        req.user = user
        next()
    })
}

module.exports = authenticateToken;