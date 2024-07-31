import { UploadedFile } from "express-fileupload";

declare module "express-serve-static-core" {
  interface Request {
    files?: {
      [key: string]: UploadedFile | UploadedFile[];
    };
  }
}
