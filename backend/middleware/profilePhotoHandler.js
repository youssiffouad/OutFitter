const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { phototype } = req.headers;
    console.log("(2)-here is the phototype received at server", phototype);
    const profilePhotosDir = path.join(
      __dirname,
      "../react-outfit-model/src/static"
    );

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
