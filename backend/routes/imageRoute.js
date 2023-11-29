const express = require("express")
const { uploadImage, getImages, getImage } = require("../controller/imageController")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const multer = require("multer")

//this define a destination whgere our images will be stored
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './frontend/src/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})



const upload = multer({ storage: storage });

router.route("/upload").post(protect, upload.fields([{ name: 'image' }, { name: 'label' }, { name: 'description' }]), uploadImage);
router.route("/download").get(protect, getImages)
router.route("/download/:id").get(protect, getImage)

module.exports = router
