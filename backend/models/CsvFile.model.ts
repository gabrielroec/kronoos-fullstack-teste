import { Schema, model, Document } from "mongoose";

interface ICsvFileDatas {
  nrInst: number;
  nrAgencia: number;
  cdClient: number;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: number;
  dtContrato: Date;
  qtPrestacoes: number;
  vlTotal: number;
  cdProduto: number;
  dsProduto: string;
  cdCarteira: number;
  dsCarteira: string;
  nrProposta: number;
  nrPresta: number;
  tpPresta: string;
  nrSeqPre: number;
  dtVctPre: Date;
  vlPresta: number;
  vlMora: number;
  vlMulta: number;
  vlOutAcr: number;
  vlIof: number;
  vlDescon: number;
  vlAtual: number;
  idSituac: string;
  idSitVen: string;
}

interface ICsvFile extends Document {
  title: string;
  csvFileDatas: ICsvFileDatas[];
}

const csvFileDataSchema = new Schema<ICsvFileDatas>({
  nrInst: Number,
  nrAgencia: Number,
  cdClient: Number,
  nmClient: String,
  nrCpfCnpj: String,
  nrContrato: Number,
  dtContrato: Date,
  qtPrestacoes: Number,
  vlTotal: Number,
  cdProduto: Number,
  dsProduto: String,
  cdCarteira: Number,
  dsCarteira: String,
  nrProposta: Number,
  nrPresta: Number,
  tpPresta: String,
  nrSeqPre: Number,
  dtVctPre: Date,
  vlPresta: Number,
  vlMora: Number,
  vlMulta: Number,
  vlOutAcr: Number,
  vlIof: Number,
  vlDescon: Number,
  vlAtual: Number,
  idSituac: String,
  idSitVen: String,
});

const csvFileSchema = new Schema<ICsvFile>({
  title: { type: String, required: true },
  csvFileDatas: [csvFileDataSchema],
});

export default model<ICsvFile>("CsvFile", csvFileSchema);
