const express = require("express")
const router = express.Router()

// 
const {reqisterUser} = require("../controllers/userController")
const { getMe } = require("../controllers/userController")
const { loginUser } = require("../controllers/userController")


// Method = post
router.post("/", reqisterUser)

// Method = post
router.post("/login", loginUser)

// Method = get 
router.get("/me", getMe)

module.exports = router