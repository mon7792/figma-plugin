import { Client } from 'pg';

import { FileResp, DbFileStatus } from "src/types";
import { DBStoreRepository } from "../../respository/db.driver";

// DBStore class to handle database operations
export class DBStore implements DBStoreRepository {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  // addFile to database
  async addFile(fid: string, name: string, filePath: string): Promise<FileResp> {
    const fsRsp : FileResp = {
      id: 0,
      name: name,
      processed: false,
    }
    const text = "insert into files (fid, name, file_path) values ($1, $2, $3) returning fid, name";
    const values = [fid, name, filePath];

    console.log("Adding file to database", name);

    try {
      const res = await this.client.query(text, values);
      fsRsp.id = res.rows[0].fid;
      fsRsp.name = res.rows[0].name;

      return fsRsp;
    } catch (error) {
      console.error(`unable to add the new file in the DB ${error}`);
      throw error;
    }
  }

  async updateProcessedFile(
    filePath: string,
    processed: boolean,
    predicted: string
  ): Promise<void> {
    const text = "update files set processed = $1, predicted = $2 where file_path = $3";
    const values = [processed, predicted, filePath];

    console.log("Updating file in database", filePath);

    try {
      await this.client.query(text, values);
    } catch (error) {
      console.log("unable to update the file in the DB", error);
      throw error;
    }
  }

  async getFileStatus(name: string): Promise<string> {
    const text = "select status from files where name = $1";
    const values = [name];

    console.log("Getting file status from database", name);
    try {
      const res = await this.client.query(text, values);
      return res.rows[0].status;
    } catch (error) {
      console.log(error);
    }
  }

  async getFsStatus(id: string): Promise<DbFileStatus> {
    let fsStatus: DbFileStatus = {
      fid: "",
      name: "",
      processed: false,
      predicted: "",
    };
    const text = "select name, processed, predicted from files where fid = $1";
    const values = [id];

    console.log("Getting file status from database", id);
    try {
      const res = await this.client.query(text, values);
      fsStatus.fid = id;
      fsStatus.name = res.rows[0].name;
      fsStatus.processed = res.rows[0].processed;
      fsStatus.predicted = res.rows[0].predicted || "";
      return fsStatus;
    } catch (error) {
      console.error(`unable to get file status for ${id}`);
      throw error;
    }
  }

  // getFiles
  async getFiles(): Promise<Array<FileResp>> {
    let fsRespList: Array<FileResp> = [];
    const text = "select name, processed from files";
    try {
      const res = await this.client.query(text);
      return res.rows.map((row, i) => {
        return {
          id: i,
          name: row.name,
          processed: row.processed,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
}
