const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"]
    },
    email: {
        type: String,
        required: [true, "Please add email field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add password field"],
    },
    isAdmin: {
        type: Boolean,
        default: false,

    }
}, {
    timestamps: true,

},)

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

const User = mongoose.model("User", userSchema)

module.exports = User