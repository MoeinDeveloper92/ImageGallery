const express = require("express")
const dotenv = require("dotenv").config({})
const colors = require("colors")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000
const app = express()
const errorHandler = require("./middleware/errorMiddleware")
//Connect Nodejs to MongoDB
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Set up Express
app.get("/", (req, res) => {
    res.status(200).json({
        msg: "The server is running"
    })
})

//middleware Route
app.use("/api/users/", require("./routes/userRoute"))
app.use("/api/images/", require("./routes/imageRoute"))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`The app is running on the port ${PORT}`)
})