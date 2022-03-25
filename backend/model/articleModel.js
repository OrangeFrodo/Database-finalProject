const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    header: {
        type: String,
        require: [true, "Please add a header"]
    },
    text: {
        type: String,
        require: [true, "Please add a text value"]
    }
}, {
    timestamp: true
})

module.exports = mongoose.model("Article", articleSchema)