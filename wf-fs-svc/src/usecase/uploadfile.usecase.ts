import { Request } from "express";
import { DBStoreRepository } from "src/respository/db.driver";
import { FsStoreRepository } from "src/respository/fs.driver";
import { QueueStoreRepository } from "src/respository/queue.driver";

export class UploadFile {
  private db: DBStoreRepository;
  private queue: QueueStoreRepository;
  private fs: FsStoreRepository;

  constructor(
    db: DBStoreRepository,
    queue: QueueStoreRepository,
    fs: FsStoreRepository
  ) {
    this.db = db;
    this.queue = queue;
    this.fs = fs;
  }

  //  create a function to generate a random string
  private createRandomString(length: number): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public validate(name: string): boolean {
    return this.fs.validateFileName(name);
  }

  public async exec(name: string, req: Request): Promise<void> {
    // save the file to the file system
    const filePath = await this.fs.saveFileStream(name, req);

    // add the file to the database
    await this.db.addFile(this.createRandomString(8),name,filePath);

    // create the message to send to the queue
    await this.queue.send("upload", filePath);
  }
}
