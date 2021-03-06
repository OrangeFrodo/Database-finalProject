const path = require('path');
const express = require("express")
const connectDB = require("../backend/config/db")

// Dotenv file with variables init
const dotenv = require("dotenv").config()

connectDB(process.env.MONGO_URI)

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
app.use("/api/articles", require("./routes/articleRoute"))
app.use("/api/users", require("./routes/userRoutes"))

// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")))
    app.get("*", (req, res) => res.sendFile(
        path.resolve(
            __dirname,
            "../",
            "frontend",
            "build",
            "index.html")
    ))
} else {
    app.get("/", (req, res) => res.send("Not in production mode"))
}

// Error handler
app.use(errorHandler)

// App listen (create server on port 5000)
app.listen(port, () => {
    console.log("Server started")
})