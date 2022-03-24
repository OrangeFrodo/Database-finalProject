const express = require("express")
const router = express.Router()

// Controllers
const { 
    getArticles,
    postArticles,
    updateArticles,
    deleteArticles
} = require("../controllers/articleController")

// Get method = 200
router.route("/").get(getArticles)

// Post method = 200
router.route("/").post(postArticles)

// Put method = 200
router.route("/:id").put(updateArticles)

// Delete method = 200
router.route("/:id").delete(deleteArticles)

// Export router
module.exports = router