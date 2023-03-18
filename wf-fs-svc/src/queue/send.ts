import amqp from "amqplib/callback_api";

export async function send(message: string) {
  amqp.connect("amqp://localhost", (err, conn) => {
    if (err) {
      console.log(err);
      throw err;
    }
    conn.createChannel((err, ch) => {
      if (err) {
        console.log(err);
        throw err;
      }
      const queue = "hello";
      const msg = message;
      ch.assertQueue(queue, { durable: false });
      ch.sendToQueue(queue, Buffer.from(msg), { persistent: true });
      console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
      conn.close();
    }, 500);
  });
}
