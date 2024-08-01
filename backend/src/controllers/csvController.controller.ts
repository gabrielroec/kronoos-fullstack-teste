import { Request, Response } from "express";
import CsvFile from "../models/CsvFile.model";
import { parseCsv } from "../utils/csvParser.util";
import { isValidCpfOrCnpj } from "../utils/validateCpfCnpj.util";
import { formatCurrency } from "../utils/formatCurrency.util";

export const uploadCsv = async (req: Request, res: Response) => {
  if (!req.files || !req.files.csvFiles) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const csvFile = req.files.csvFiles as any;
  const title = csvFile.name;
  const records = await parseCsv(csvFile.data.toString());

  const processedRecord = records.map((record) => {
    const validationResult = isValidCpfOrCnpj(record.nrCpfCnpj);
    record.nrCpfCnpj = validationResult.formattedValue;

    record.vlTotal = parseFloat(record.vlTotal);
    record.vlPresta = parseFloat(record.vlPresta);
    record.vlMora = parseFloat(record.vlMora);
    record.vlMulta = parseFloat(record.vlMulta);
    record.vlOutAcr = parseFloat(record.vlOutAcr);
    record.vlIof = parseFloat(record.vlIof);
    record.vlDescon = parseFloat(record.vlDescon);
    record.vlAtual = parseFloat(record.vlAtual);

    return record;
  });
  console.log(title);

  const newCsvFile = new CsvFile({ title, csvFileDatas: processedRecord });
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

  try {
    const csvFile = await CsvFile.findById(id).lean();

    if (!csvFile) {
      return res.status(404).send("File not found");
    }

    const formattedData = csvFile.csvFileDatas.map((record: any) => ({
      ...record,
      vlTotal: `R$${formatCurrency(record.vlTotal)}`,
      vlPresta: `R$${formatCurrency(record.vlPresta)}`,
      vlMora: `R$${formatCurrency(record.vlMora)}`,
      vlMulta: `R$${formatCurrency(record.vlMulta)}`,
      vlOutAcr: `R$${formatCurrency(record.vlOutAcr)}`,
      vlIof: `R$${formatCurrency(record.vlIof)}`,
      vlDescon: `R$${formatCurrency(record.vlDescon)}`,
      vlAtual: `R$${formatCurrency(record.vlAtual)}`,
    }));

    res.json({ ...csvFile, csvFileDatas: formattedData });
  } catch (error) {
    console.error("Error fetching CSV file:", error);
    res.status(500).send("Internal server error");
  }
};
