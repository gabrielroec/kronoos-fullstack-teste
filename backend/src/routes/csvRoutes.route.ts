const express2 = require("express");
import {
  uploadCsv,
  getCsvFileById,
  getCsvFiles,
} from "../controllers/csvController.controller";

const router = express2.Router();

router.post("/upload", uploadCsv);
router.get("/get", getCsvFiles);
router.get("/get/:id", getCsvFileById);

module.exports = router;
