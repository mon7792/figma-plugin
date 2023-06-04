import { NextFunction, Request, Response } from "express";
import { DBStoreRepository } from "src/respository/db.driver";
import { FsStoreRepository } from "src/respository/fs.driver";
import { QueueStoreRepository } from "src/respository/queue.driver";
import { UploadFile } from "../usecase/uploadfile.usecase";
import { FileStatus } from "../usecase/fileStatus.usecase";
import { AuthPlugin } from "../usecase/authPlugin.usecase";
import { Session } from "express-session";
import NodeCache from  "node-cache" ;
// const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

// WireFrameController is a class that contains all the methods for the wireframe controller
export class WireFrameController {
  private fileStore: FsStoreRepository;
  private dbStore: DBStoreRepository;
  private queueStore: QueueStoreRepository;
  private cacheStore: NodeCache

  constructor(
    fileStore: FsStoreRepository,
    dbStore: DBStoreRepository,
    queueStore: QueueStoreRepository
  ) {
    this.fileStore = fileStore;
    this.dbStore = dbStore;
    this.queueStore = queueStore;
    this.cacheStore = new NodeCache( { stdTTL: 100, checkperiod: 120 } )
  }

  statusFileHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("statusFileHandler");
    const id: string = req.params.id || "";
    if (id.length === 0) {
      res.status(400).send("id does not exist");
      return;
    }

    const fsHandler = new FileStatus(this.dbStore);
    try {
      const status = await fsHandler.exec(id);
      res.send(status);
    } catch (error) {
      next(error);
    }
  };

  uploadFileHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const upFsHandler = new UploadFile(
      this.dbStore,
      this.queueStore,
      this.fileStore
    );
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
      const resp = await upFsHandler.exec(fsName, req);

      res.send(resp);
    } catch (error) {
      next(error);
    }
  };

  homeHandler = async (
    req: Request & Session,
    res: Response,
    next: NextFunction
  ) => {
    try {
       

      res.send(`home handler ${req.session.id}`);
    } catch (error) {
      next(error);
    }
  };

  // plugin authentication
  // pluginKeyGenHandler generate read & write keys and store in cache.  
  pluginKeyGenHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      try {
        // 1. generate keys
        const authPluginHandler = new AuthPlugin(this.cacheStore);
        // 2. 
        const keys = authPluginHandler.generateRWKeys();
        res.send(`{ "r": ${keys[0]}, "w": ${keys[1]} }`)
      } catch (error) {
        next(error)
      }
  }

  // plugin authentication
  // pluginKeyGenHandler generate read & write keys and store in cache.  
    pluginKeyStatusHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
      try {

        // key
        const key = req.params.key || ""

        // 1. generate keys
        const authPluginHandler = new AuthPlugin(this.cacheStore);
        // 2. 
        const loginStatus = authPluginHandler.getLoginStatus(key);
        res.send(`{ "loginStatus": ${loginStatus} }`)
      } catch (error) {
        next(error)
      }
  }
}
