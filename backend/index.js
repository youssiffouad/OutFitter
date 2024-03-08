const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoute");
const materialRoutes = require("./routes/materialsRoute");
const clothesRoutes = require("./routes/clothesRoutes");
const modeRoutes = require("./routes/modeRoutes");
const occasionRoutes = require("./routes/OccasionRoutes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3060; // Choose your desired port number

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/weather", weatherRoutes);
app.use("/material", materialRoutes);
app.use("/clothes", clothesRoutes);
app.use("/modes", modeRoutes);
app.use("/occasions", occasionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
