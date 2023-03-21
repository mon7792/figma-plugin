import express, { Express } from "express";
import fs from "fs";
import path from "path";

import pkg from "pg";
const { Client } = pkg;

import cors from "cors";

import { Files } from "./db/files";
import { receive } from "./queue/rec";
import { send } from "./queue/send";

async function main() {
  const PORT: number = parseInt(process.env.PORT || "3000") || 3000;

  // EXPRESS SERVER
  const app: Express = express();

  // DATABASE CONNECTION
  const DB_HOST: string = process.env.DB_HOST || "127.0.0.1";
  const DB_NAME: string = process.env.DB_NAME || "wffs";
  const DB_PORT: number = parseInt(process.env.DB_PORT || "5432") || 5432;
  const DB_USER: string = process.env.DB_USER || "postgres";
  const DB_PASSWORD: string = process.env.DB_PASSWORD || "";

  if (DB_PASSWORD === "") {
    throw new Error("DB_PASSWORD is not set");
  }

  const clt = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  await clt.connect();

  // File class to handle database operations
  const files = new Files(clt);


  app.use(cors())
  app.get("/", async (req, res) => {
    
    await send(req.query.name as string || "World");
    res.send("Hello World");
  });
  app.get("/rec", async (_, res) => {
    await receive()
    res.send("receving");
  });

  app.get("/status", async (req, res) => {
    const fsName: string = req.headers["x-file-name"] as string || "uploads/az.png";
    // if (req.headers["x-file-name"] === undefined) {
    //     res.status(400).send("x-file-name header is not set");
    //     return;
    // }
    const result = await files.getFileStatus(fsName);
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  });

  app.post("/upload", async (req, res) => {
    // check if x-file-name header is set
    const fsName: string = req.headers["x-file-name"] as string;
    if (req.headers["x-file-name"] === undefined) {
        res.status(400).send("x-file-name header is not set");
        return;
    }

    const filePath = path.join("uploads", fsName);
    
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
      // 1. upload the file to file storage
      // 2. add file to database
      // 3. send the message to the queue  


      await files.addFile(filePath);
      res.send("done");
    });

    stream.on("error", (err) => {
      console.log("stream error", err);
    });

    // return file path
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
