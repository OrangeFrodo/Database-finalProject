const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")

// Register user
// POST method "/api/users"
const reqisterUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all field")
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// Register user
// POST method "/api/users"
const loginUser = asyncHandler(async (req, res) => {
    res.json({message: "Login user"})
})

// Register user
// POST method "/api/users"
const getMe = asyncHandler(async (req, res) => {
    res.json({message: "User data"})
})

module.exports = {
    reqisterUser,
    loginUser,
    getMe
}