import { FileResp } from "../types";

export interface DBStoreRepository {
  addFile(name: string): Promise<void>;
  updateProcessedFile(
    name: string,
    processed: boolean,
    status: string
  ): Promise<void>;
  getFileStatus(name: string): Promise<string>;
  getFiles(): Promise<Array<FileResp>>;
}
