const asyncHandler = require("express-async-handler")

const Article = require("../model/articleModel")
const User = require("../model/userModel")

// Route = "/"
// Method = GET
const getArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find()
    res.status(200).json(articles)
})


const getArticlesByName = asyncHandler(async (req, res) => {
    const articles = await Article.find({ user: req.user.id })
    res.status(200).json(articles)
})

// Route = "/"
// Method = POST
const postArticles = asyncHandler(async (req, res) => {
    if(!req.body.text || !req.body.header) {
        res.status(400)
        throw new Error("Missing text or header field")
    }
    const article = await Article.create({
        header: req.body.header,
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(article)
})

// Route = "/:id"
// Method = UPDATE
const updateArticles = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (!article) {
        res.status(400)
        throw new Error('Article new found')
    }

    const user = await User.findById(req.user.id)

    // If user does not exists
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the goal user
    if(article.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedArticle = await Article.findByIdAndUpdate(
        req.params.id, 
        req.body, {
            new: true
        })

    res.status(200).json(updatedArticle)
})

// Route = "/:id"
// Method = DELETE
const deleteArticles = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (!article) {
        res.status(400)
        throw new Error('Article new found')
    }
    
    const user = await User.findById(req.user.id)

    // If user does not exists
    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user matches the goal user
    if(article.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    const deletedArticle = await Article.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedArticle)
})

// Exports module
module.exports = {
    getArticles,
    postArticles,
    updateArticles,
    deleteArticles,
    getArticlesByName
}