const express = require("express")
const router = express.Router()

// Controllers
const { 
    getArticles,
    postArticles,
    updateArticles,
    deleteArticles,
    getArticlesByName
} = require("../controllers/articleController")

const { protect } = require("../midlleware/authMiddleware")

// Get method = 200
router.route("/").get(getArticles)
router.route("/byName").get(protect, getArticlesByName)

// Post method = 200
router.route("/").post(protect, postArticles)

// Put method = 200
router.route("/:id").put(protect, updateArticles)

// Delete method = 200
router.route("/:id").delete(protect, deleteArticles)

// Export router
module.exports = router