import { kafka } from "./kafka";

export async function startConsumer() {
  const consumer = kafka.consumer({ groupId: "notify-group" });

  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.NOTIFY_TOPIC!,
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("Consumer message recieved");
      console.log({
        key: message?.key?.toString(),
        value: message.value?.toString(),
        headers: message.headers,
      });
    },
  });
}
