const asyncHandler = require("express-async-handler")

const Article = require("../model/articleModel")

// Route = "/"
// Method = GET
const getArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find()
    res.status(200).json(articles)
})

// Route = "/"
// Method = POST
const postArticles = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Missing text field")
    }
    const article = await Article.create({
        header: req.body.header,
        text: req.body.text
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

    const deletedArticle = await Article.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedArticle)
})

// Exports module
module.exports = {
    getArticles,
    postArticles,
    updateArticles,
    deleteArticles
}