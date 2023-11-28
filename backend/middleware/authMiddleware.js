const User = require("../model/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            //extract the token from the the Bearer token
            token = req.headers.authorization.split(" ")[1]
            //decode the jwt and compare it by the id of user
            const decoded = jwt.decode(token, process.env.SECRET_KEY)

            //if there was a user with this id, attach it to the req
            req.user = await User.findById(decoded.id)
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not Authorized")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("No Token, Not Authorized")
    }
})


module.exports = protect