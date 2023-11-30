const asyncHandler = require("express-async-handler")
const path = require("path")
const fs = require("fs")
const User = require("../model/userModel")
const Image = require("../model/imageModel")
const ExcelJS = require('exceljs')
const archiver = require("archiver")





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




//@desc     Get single Image
//@desc     GET/download/:id
//@access   private
const getImage = asyncHandler(async (req, res, next) => {
    //check for the user
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    //send the id of the image that we want to pull
    const image = await Image.findById(req.params.id)
    if (!image) {
        res.status(404)
        throw new Error("Image not found.")
    }
    if (image.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error("Only authorized user can delete!")
    }

    res.status(200).json(image)
})



//@desc     Exporting data from mongodb to CSV
//@route    GET /api/images/export-to-excel
//@access   Private
const exportToExcel = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id)
    console.log(user)
    if (!user) {
        res.status(401)
        throw new Error("User not Found")
    }

    try {

        const images = await Image.find({ user: req.user.id });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Images');

        // Adding headers to the Excel file
        worksheet.columns = [
            { header: 'Label', key: 'label' },
            { header: 'Description', key: 'description' },
            { header: 'Image', key: 'image' },
        ];

        // Adding data to the Excel file
        images.forEach((image) => {
            worksheet.addRow({
                label: image.label,
                description: image.description,
                image: image.image,
            });
        });

        // Generating Excel file in memory
        const excelBuffer = await workbook.xlsx.writeBuffer();

        // Prepare the zip file containing the Excel file and images
        const archive = archiver('zip', { zlib: { level: 9 } });
        res.attachment('imageCollection.zip'); // Set the response to send a zip file

        archive.pipe(res); // Pipe the zip to the response

        // Add the Excel file to the zip
        archive.append(excelBuffer, { name: 'imageData.xlsx' }); // Add the Excel file to the zip

        // Add images to the zip
        images.forEach((image) => {
            const imagePath = path.join(__dirname, "../../frontend/src/images", image.image); // Adjust with your image path
            archive.file(imagePath, { name: `images/${image.image}` }); // Add each image to the 'images' folder in the zip
        });

        archive.finalize(); // Finalize the zip file

    } catch (error) {
        res.status(500).json({ message: 'Failed to generate zip file' });
    }
})




//@desc     Delete an image
//@route    DELETE /api/images/:id
//@access   Private
const deleteImage = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const image = await Image.findById(req.params.id)
    const imagePath = path.join(__dirname, "../../frontend/src/images", image.image)

    if (!image) {
        res.status(404)
        throw new Error("Image not found")
    }


    if (image.user.toString() !== req.user._id.toString()) {
        res.status(401)
        throw new Error("Only authorized user can delete!")
    }


    await Image.findByIdAndDelete(req.params.id)

    //this piece delete file from the DB and from the Image folder :)
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete the file synchronously
        res.status(200).json({ message: 'Image deleted successfully', id: req.params.id });
    } else {
        res.status(404).json({ message: 'Image not found' });
    }

})


//Update Image

module.exports = {
    uploadImage,
    getImages,
    getImage,
    exportToExcel,
    deleteImage
}