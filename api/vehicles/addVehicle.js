const express = require("express");
const vehicleUpload = express.Router();
const multer = require("multer");
const upload = multer();
const uploadVehicles = require("../../db/vehicles");

vehicleUpload.post("/upload", upload.single("file"), async (req, res) => {
    const ownerId = req.query.id
  try {
    const fileId = await uploadVehicles(req.file, ownerId);
    res.status(200).json({ success: true, id: fileId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to upload file" });
  }
});

module.exports = vehicleUpload;