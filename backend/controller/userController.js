const User = require("../model/userModel")
const asyncHandler = require("express-async-handler")
const generateToken = require("../auth/generateToken")
const bcrypt = require("bcryptjs")

//@desc     Register user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res, next) => {
    //destructure data from the req, which has been sent from frontend.
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all the fields")
    }

    //check for the user in the DB
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist.")
    }

    //creating new user
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Something went wrong.")
    }

})



//@desc     Login User
//@route    POST/api/users
//@access   Public
const loginUser = asyncHandler(async (req, res, next) => {
    //get the data from the req which has been sent from the client
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all the fields")
    }

    //check for the user and passwords matching
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password.")
    }
})


const getMe = asyncHandler(async (req, res, next) => {
    res.status(200).json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}