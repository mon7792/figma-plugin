import { Connection } from "amqplib";
import { QueueStoreRepository } from "../../respository/queue.driver";

export class QueueStore implements QueueStoreRepository {
  private client: Connection;
  constructor(client: Connection) {
    this.client = client;
  }

  public async send(queue: string, message: string): Promise<void> {
    const ch = await this.client.createChannel();
    await ch.assertQueue(queue, { durable: false });
    await ch.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(" [x] Sent %s", message);
    await ch.close();
  }

  public async receive(queue: string): Promise<string> {
    const ch = await this.client.createChannel();
    await ch.assertQueue(queue, { durable: false });

    let messages: string = "";
    await ch.consume(
      queue,
      (msg) => {
        messages = msg.content.toString();
        console.log(" [x] Received %s", msg.content.toString());
      },
      { noAck: true }
    );
    await ch.close();

    return messages;
  }
}