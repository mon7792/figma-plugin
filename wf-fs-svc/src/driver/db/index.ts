import { Client } from 'pg';

import { FileResp } from "src/types";
import { DBStoreRepository } from "../../respository/db.driver";

// DBStore class to handle database operations
export class DBStore implements DBStoreRepository {
  private client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  // addFile to database
  async addFile(fid: string, name: string, filePath: string): Promise<void> {
    const text = "insert into files (fid, name, file_path) values ($1)";
    const values = [fid, name, filePath];

    console.log("Adding file to database", name);

    try {
      await this.client.query(text, values);
    } catch (error) {
      console.error(`unable to add the new file in the DB ${error}`);
      throw error;
    }
  }

  async updateProcessedFile(
    name: string,
    processed: boolean,
    status: string
  ): Promise<void> {
    const text = "update files set processed = $1, status = $2 where name = $3";
    const values = [processed, status, name];

    console.log("Updating file in database", name);

    try {
      await this.client.query(text, values);
    } catch (error) {
      console.log(error);
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
