const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3060; // Choose your desired port number

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
// Define a random endpoint to test POST requests
// app.post("/test", (req, res) => {
//   console.log("Received POST request at /test");
//   console.log("Request body:", req.body);
//   res.json({ message: "Received POST request at /test" });
// });

// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("here is the file", file);
//     const uploadDir = path.join(__dirname, "uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Create a multer instance
// const upload = multer({ storage: storage });

// // POST endpoint for uploading the file
// app.post("/upload", upload.single("photo"), (req, res) => {
//   if (!req.file) {
//     console.log("error no file uploaded", req.file, req.body);
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   res.json({ filename: req.file.filename });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
