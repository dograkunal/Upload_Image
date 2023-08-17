const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const jsonServer = require("json-server");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(fileUpload());

//Basic --> Takes 2 params (Request and Response)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Handle file upload
app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedFile = req.files.file;

  uploadedFile.mv(`uploads/${uploadedFile.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("File uploaded!");
  });
});

app.use("/uploads", express.static("uploads"));

// Use json-server to create a dummy API
const router = jsonServer.router("db.json");
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
