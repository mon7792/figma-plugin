import { Request } from "express";
import fs from "fs";
import path from "path";

import { FsStoreRepository } from "../../respository/fs.driver";

// TODO: check with AI Team for the file extensions
// extensionList is a list of allowed file extensions
const extensionList: Array<string> = ["png", "jpg", "jpeg"];

// FileStore to handle files operations
export class FileStore implements FsStoreRepository {
  constructor() {}

  // createFilePath to create file name
  private createFilePath(dir: string, name: string): string {
    const fsList = name.split(".");
    const ext = fsList[fsList.length - 1].toLowerCase();
    // get random filename.
    const filename = this.createRandomString(10);
    return path.join(dir, `${filename}.${ext}`);;
  }

  // validateFileName is a method that validates the file name   
  public validateFileName(name: string): boolean{
    // process file extension.
    const fsList = name.split(".");
    if (fsList.length == 2) {
      return false;
    }

    // get the file extension
    const ext = fsList[fsList.length - 1].toLowerCase();
    if (!extensionList.includes(ext)) {
        return false;
    }

    return true
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

  // saveFileStream to save file stream to file system
  public async saveFileStream(name: string, req: Request): Promise<string> {
    // create file name.
    // TODO: check with AI Team for the file extensions
    const filePath = this.createFilePath("uploads", name);

    // receive file stream from client
    const stream = fs.createWriteStream(filePath);
    stream.on("open", () => {
      console.log("stream opened 0.0%");
      req.pipe(stream);
    });

    stream.on("drain", () => {
      const written = parseInt(stream.bytesWritten.toString());
      const total = parseInt(req.headers["content-length"] || "0");
      const pWritten = ((written / total) * 100).toFixed(2);
      console.log(`stream drained ${pWritten}% done`);
    });

    stream.on("close", async () => {
      console.log("stream closed 100%");
    });

    stream.on("error", (err) => {
      console.log("stream error", err);
    });

    return filePath;
  }
}
