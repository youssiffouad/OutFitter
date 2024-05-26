const fs = require("fs");
const path = require("path");
const { addNewPiece } = require("../Services/userServices");

const assignPhotosToUser = () => {
  // Define the path to the folder
  const folderPath = path.join(__dirname, "../react-outfit-model/src/static");

  // Read the files from the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading the folder:", err);
      return;
    }

    // Loop over the files and call addNewPiece for each file
    files.forEach((file) => {
      const filePath = {
        originalname: file,
        path: path.join(folderPath, file),
      };
      console.log("here is the originalname", filePath.originalname);
      console.log("here is the full Path", filePath.path);
      addNewPiece(1, null, null, null, null, filePath);
    });
  });
};

assignPhotosToUser();
