import { Request } from "express";

export interface FsStoreRepository {
  validateFileName(name: string): boolean;
  saveFileStream(name: string, req: Request): Promise<string>;
  getFileContent(filePath: string): Blob;
}
