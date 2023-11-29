const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    image: {
        type: String,
        required: [true, "Please upload your image"]
    },
    label: {
        type: String,
        required: [true, "Please add images's lable"]
    },
    description: {
        type: String,
        required: [true, "Please add  description"]
    }
}, {
    timestamps: true
})


const Image = mongoose.model("Image", imageSchema)

module.exports = Image