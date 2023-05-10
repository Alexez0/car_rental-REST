const jwt = require('jsonwebtoken')
const secretKey = 'key'
module.exports = function(role){
    return function (req, res, next) {
        if(req.method ==="OPTIONS"){
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                res.status(401).json({message: "User not authorized"})
            }
            const decoded = jwt.verify(token, secretKey)
            if(decoded.email.role !== role){
                return res.status(403).json({message:"Access denied"})
            }
            req.user = decoded
            next()


        }catch (e) {
            res.status(401).json({message: "User not authorized"})
        }
    }
}








