import { NextFunction, Request, Response } from "express";
import { DBStoreRepository } from "src/respository/db.driver";
import { FsStoreRepository } from "src/respository/fs.driver";
import { QueueStoreRepository } from "src/respository/queue.driver";
import { UploadFile } from "../usecase/uploadfile.usecase";

// WireFrameController is a class that contains all the methods for the wireframe controller
export class WireFrameController {
  private fileStore: FsStoreRepository
  private dbStore: DBStoreRepository
  private queueStore: QueueStoreRepository

  constructor(fileStore: FsStoreRepository, dbStore: DBStoreRepository, queueStore: QueueStoreRepository) {
    this.fileStore = fileStore;
    this.dbStore = dbStore;
    this.queueStore = queueStore;
  }

   uploadFileHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const upFsHandler = new UploadFile(this.dbStore, this.queueStore, this.fileStore);
    // check if x-file-name header is set
    const fsName: string = req.headers["x-file-name"] as string;
    if (req.headers["x-file-name"] === undefined) {
      res.status(400).send("x-file-name header is not set");
      return;
    }

    if (upFsHandler.validate(fsName)) {
      res.status(400).send("x-file-name header is not valid");
      return;
    }

    // fs extention
    try {
      //  save the file to the file system
      await upFsHandler.exec(fsName, req);

      res.send("uploadFileHandler");
    } catch (error) {
      next(error);
    }
  }
}
