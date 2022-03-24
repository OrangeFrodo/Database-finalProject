const express = require("express")

// Dotenv file with variables init
const dotenv = require("dotenv").config()

// Error handler
const { errorHandler } = require("./midlleware/errorMiddleware")

// Port for server
const port = process.env.port || 5000;
const app = express()

// Add midle ware
// Json object + urlencoded
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// Use routes
app.use("/api/goals", require("./routes/goalRoutes"))

// Error handler
app.use(errorHandler)

// App listen (create server on port 5000)
app.listen(port, () => {
    console.log("Server started")
})