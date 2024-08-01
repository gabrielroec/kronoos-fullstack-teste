const express2 = require("express");
import {
  uploadCsv,
  getCsvFileById,
  getCsvFiles,
  deleteCsvFile,
} from "../controllers/csvController.controller";

const router = express2.Router();

router.post("/upload", uploadCsv);
router.get("/get", getCsvFiles);
router.get("/get/:id", getCsvFileById);
router.delete("/delete/:id", deleteCsvFile);

module.exports = router;
