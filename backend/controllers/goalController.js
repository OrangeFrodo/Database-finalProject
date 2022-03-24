const asyncHandler = require("express-async-handler")

// Route = "/"
// Method = GET
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Goals"})
})

// Route = "/"
// Method = POST
const postGoals = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Missing text field")
    }
    res.status(200).json({message: req.body.text})
})

// Route = "/:id"
// Method = UPDATE
const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Goal updated ${req.params.id}`})
})

// Route = "/:id"
// Method = DELETE
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Goal deleted ${req.params.id}`})
})

module.exports = {
    getGoals,
    postGoals,
    updateGoals,
    deleteGoals
}