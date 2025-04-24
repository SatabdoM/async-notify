import { Kafka } from "kafkajs";
import dotenv from 'dotenv'

dotenv.config()


export const kafka = new Kafka({
  clientId: "async-nortify-service",
  brokers: [process.env.KAFKA_BROKER!],
});