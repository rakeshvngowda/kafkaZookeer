import { config } from "dotenv";
import { Kafka } from "kafkajs";

config();

export const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'my-app'
})