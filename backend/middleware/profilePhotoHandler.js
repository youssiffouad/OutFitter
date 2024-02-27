const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const profilePhotosDir = path.resolve("assets", "profilephotos");
    if (!fs.existsSync(profilePhotosDir)) {
      fs.mkdirSync(profilePhotosDir, { recursive: true });
    }
    cb(null, profilePhotosDir);
  },
  filename: function (req, file, cb) {
    console.log("here is the file name", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storageHandler = multer({ storage: storage });

module.exports = { storageHandler };
