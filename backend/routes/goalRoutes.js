const express = require("express")
const router = express.Router()

// Controllers
const { 
    getGoals,
    postGoals,
    updateGoals,
    deleteGoals
} = require("../controllers/goalController")

// Get method = 200
router.route("/").get(getGoals)

// Post method = 200
router.route("/").post(postGoals)

// Put method = 200
router.route("/:id").put(updateGoals)

// Delete method = 200
router.route("/:id").delete(deleteGoals)

// Export router
module.exports = router