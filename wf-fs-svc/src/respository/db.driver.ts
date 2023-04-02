import { FileResp, DbFileStatus } from "../types";

export interface DBStoreRepository {
  addFile(fid: string, name: string, filePath: string): Promise<FileResp>;
  updateProcessedFile(
    name: string,
    processed: boolean,
    status: string
  ): Promise<void>;
  getFileStatus(name: string): Promise<string>;
  getFiles(): Promise<Array<FileResp>>;
  getFsStatus(id: string): Promise<DbFileStatus>;
}
