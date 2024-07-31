import { Request, Response } from "express";
import CsvFile from "../models/CsvFile.model";
import { parseCsv } from "../utils/csvParser.util";

export const uploadCsv = async (req: Request, res: Response) => {
  if (!req.files || !req.files.csvFiles) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const csvFile = req.files.csvFiles as any;
  const title = csvFile.name;
  const records = await parseCsv(csvFile.data.toString());

  console.log(title);

  const newCsvFile = new CsvFile({ title, csvFileDatas: records });
  await newCsvFile.save();

  res.status(201).json(newCsvFile);
};
