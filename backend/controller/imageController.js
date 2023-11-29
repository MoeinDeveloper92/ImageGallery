const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")
const Image = require("../model/imageModel")


//@desc     Upload user's image
//@route    POST/api/images/upload
//@access   Private=>This is a protected route
const uploadImage = asyncHandler(async (req, res, next) => {

    const { label, description } = req.body

    if (!label || !description) {
        res.status(400)
        throw new Error("Please include image URL and lable of the image.")
    }

    //we need to make sure this route has been access by authenticated user
    const user = await User.findById(req.user.id)
    if (!user) {
        //Unauthorized access
        res.status(401)
        throw new Error("User not Found!")
    }
    //extract the na,e of the image which has been created by multer middleware.
    const imageName = req.files.image[0].filename

    const newImageStored = await Image.create({
        user: req.user._id,
        image: imageName,
        label,
        description
    })

    if (newImageStored) {
        res.status(201).json({
            _id: newImageStored._id,
            label: newImageStored.label,
            description: newImageStored.label
        })
    } else {
        res.status(400)
        throw new Error("Something went wrong during the upload.")
    }
})


//@desc     Get all the user's image and send the, backe to fornt
//@route    GET/api/images/download
//@access   Private
const getImages = asyncHandler(async (req, res, next) => {
    //check for the user
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const images = await Image.find({ user: req.user._id })
    res.status(200).json(images)
})

const getImage = asyncHandler(async (req, res, next) => {
    //check for the user
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    //send the id of the image that we want to pull
    const image = await Image.findById(req.params.id)
    if (image.user.toString() !== req.user._id) {
        res.status(401)
        throw new Error("Unauthorized access...")
    }

    res.status(200).json(image)
})

module.exports = {
    uploadImage,
    getImages,
    getImage
}