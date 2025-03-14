const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../constant/config.const")

const generateToken = (user) => {
    return jwt.sign({ role: user.role, id: user._id, email: user.email }, jwt_secret, { expiresIn: "2h" })
}
const isValidToken = (token) => {
    try{
        jwt.verify(token, jwt_secret)
        return true
    }catch{
        return false
    } 
}

const decodeToken = (token) => {
    return isValidToken(token) ? jwt.verify(token, jwt_secret) : null
}

const checkRouteJwt = (req, res, next) => {
    const token = req.headers.authorization || ""
    if (!token) {
        return res.status(401).send({ "message": "missing jwt token" })
    } else if (isValidToken(token)) {
        return next()
    } else {
        return res.status(401).send({ "message": "error with jwt token" })
    }
}

const checkAdminRouteJwt = (req, res, next) => {
    const token = req.headers.authorization || ""
    if (!token) {
        return res.status(401).send({ "message": "missing jwt token" })
    } else if (isValidToken(token)) {
        if(token.role=="admin"){
            return next()
        }else{
            return res.status(401).send({ "message": "not a admin" })
        }
    } else {
        return res.status(401).send({ "message": "error with jwt token" })
    }
}

module.exports = {
    generateToken,
    isValidToken,
    decodeToken,
    checkRouteJwt,
    checkAdminRouteJwt
}