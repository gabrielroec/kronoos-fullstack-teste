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

export const getCsvFiles = async (req: Request, res: Response) => {
  const csvFiles = await CsvFile.find();
  csvFiles.forEach((file) => {
    console.log(file.title);
  });
  res.json(csvFiles);
};

export const getCsvFileById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const csvFile = await CsvFile.findById(id);

  if (!csvFile) {
    return res.status(404).send("File not found");
  }

  res.json(csvFile);
};
