const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinaryConfig");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    format: async (req, file) => "png", // Supports promises as well
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImageTypes = /jpeg|jpg|png|webp/;
    const extension = file.mimetype.split("/")[1];
    if (supportedImageTypes.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg/jpeg image"));
    }
  },
  limits: {
    fileSize: 2000000,
  },
});

module.exports = uploader;
