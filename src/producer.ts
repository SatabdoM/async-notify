import { Kafka } from "kafkajs";
import { kafka } from "./kafka";

const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
}

export async function sendEvent(event: any) {
  await producer.send({
    topic: process.env.NOTIFY_TOPIC!,
    messages: [
      {
        key: event.userId.toString(),
        value: JSON.stringify(event),
        headers: {
          type: event.type,
        },
      },
    ],
  });
}
