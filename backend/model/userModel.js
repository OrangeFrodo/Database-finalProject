const mongoose = require('mongoose')

// User schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a name"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a name"]
    }
}, {
    timestamp: true
})


module.exports = mongoose.model("User", userSchema)