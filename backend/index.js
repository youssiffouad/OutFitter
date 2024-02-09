const express = require("express");
const app = express();
const port = 3060; // Choose your desired port number

// Define a route to handle requests and respond with "Hello, world!"
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
