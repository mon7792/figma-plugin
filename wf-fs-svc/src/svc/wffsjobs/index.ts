import axios from "axios";
import FormData from "form-data";
import fs from "fs";

import pkg from "pg";
import { exit } from "process";
import { json } from "stream/consumers";
const { Client } = pkg;

import { Files } from "./../../db/files";

console.log("Hello World... starting jobs");

type resp = {
  predicted: string;
};

async function main() {
  try {
    // connect to database
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
    console.log("Connected to database");
    await new Promise(r => setTimeout(r, 2000));
    console.log("waiting for 2 seconds");

    // File class to handle database operations
    const fst = new Files(clt);


    // TODO: the location of the files will come from message queue.
    const filePath =
      "/Volumes/hack/Projects/figma-plugin/wf-fs-svc/uploads/az.png";


    //  read file as stream
    const fA = fs.createReadStream(filePath);

    // create form data
    const data = new FormData();
    data.append("file", fA, "fA.png");

    let result: resp = { predicted: "" };
    //  axios request to post multipart file to upload api.
    const response = await axios.post("http://localhost:5000/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    result.predicted = response.data
      .replaceAll("<START>", "")
      .replaceAll("<END>", "");

    let status: string = JSON.stringify(result);
    console.log(status);
    //  update database with file name and status
    await fst.updateProcessedFile(
      "uploads/az.png",
      true,
      status
    );
  } catch (error) {
    console.log(error);
  }

  exit(0);
}

async function rt(){
    await main();
}

rt();
