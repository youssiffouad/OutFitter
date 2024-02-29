const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { phototype } = req.headers;
    console.log("here is the phototype received at server", phototype);
    const profilePhotosDir = path.resolve("assets", `${phototype}`);
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
