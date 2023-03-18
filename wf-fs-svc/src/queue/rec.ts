import amqp from "amqplib/callback_api";

export async function receive() {
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
      ch.assertQueue(queue, { durable: false });
      ch.consume(
        queue,
        (msg) => {
          console.log(" [x] Received %s", msg.content.toString());
        },
        { noAck: true }
      );
    });
    setTimeout(function () {
      conn.close();
    }, 500);
  });
}
