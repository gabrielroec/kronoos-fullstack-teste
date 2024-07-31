const express2 = require("express");
const { uploadCsv } = require("../controllers/csvController.controller");

const router = express2.Router();

router.post("/upload", uploadCsv);

module.exports = router;
