import { DBStoreRepository } from "src/respository/db.driver";
import { DbFileStatus } from "src/types";

export class FileStatus {
  private db: DBStoreRepository;

  constructor(db: DBStoreRepository) {
    this.db = db;
  }

  public async exec(fid: string): Promise<DbFileStatus> {
    // TODO: check if the FID exists in the database

    // create the message to send to the queue
    return await this.db.getFsStatus(fid);
  }
}
