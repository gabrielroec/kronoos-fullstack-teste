const csvParser = require("csv-parser");
const { Readable } = require("stream");

export const parseCsv = (data: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    const stream = Readable.from(data);

    stream
      .pipe(csvParser())
      .on("data", (data: any) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err: any) => reject(err));
  });
};
