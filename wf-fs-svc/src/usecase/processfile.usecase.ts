import axios from "axios";
import { DBStoreRepository } from "src/respository/db.driver";
import { FsStoreRepository } from "src/respository/fs.driver";
import { QueueStoreRepository } from "src/respository/queue.driver";

type resp = {
  predicted: string;
};

export class ProcessFile {
  private db: DBStoreRepository;
  private queue: QueueStoreRepository;
  private fs: FsStoreRepository;
  private aiUrl: string;
  constructor(
    db: DBStoreRepository,
    queue: QueueStoreRepository,
    fs: FsStoreRepository,
    aiUrl: string
  ) {
    this.db = db;
    this.queue = queue;
    this.fs = fs;
    this.aiUrl = aiUrl;
  }

  private async sendRequestToAiServer(
    fileName: string,
    fileContent: Blob
  ): Promise<string> {
    // send the request to the ai server

    try {
      // create form data
      const data = new FormData();
      data.append("file", fileContent, fileName);

      let result: resp = { predicted: "" };
      //  axios request to post multipart file to upload api.
      const response = await axios.post(this.aiUrl, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      result.predicted = response.data
        .replaceAll("<START>", "")
        .replaceAll("<END>", "");

      let status: string = JSON.stringify(result);

      return status;
    } catch (error) {
      console.log(`error in sending request to ai server: ${error}`);
      throw error;
    }
  }

  public async exec(queName: string): Promise<void> {
    // read the filepaths from the queue
    const filePath = await this.queue.receive(queName);

    // read the file from the file system
    const readStream = await this.fs.getFileContent(filePath);

    // send the request to the ai server
    const predicted = await this.sendRequestToAiServer(filePath, readStream);

    // add the predicted to the database
    await this.db.updateProcessedFile(filePath, true, predicted);
  }
}
