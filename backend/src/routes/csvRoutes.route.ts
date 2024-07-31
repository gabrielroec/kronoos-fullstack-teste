const express2 = require("express");
import { getCsvFiles } from "../controllers/csvController.controller";
const { uploadCsv } = require("../controllers/csvController.controller");

const router = express2.Router();

router.post("/upload", uploadCsv);
router.get("/get", getCsvFiles);

module.exports = router;
