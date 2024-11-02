import { kafka } from "./client.js";
import { constants } from "./constants.js";

const groupId = process.argv[2];

async function init() {
    const consumer = kafka.consumer({groupId});

    console.log("Connecting to consumer...");
    await consumer.connect();
    console.log("Connected To Consumer Successfully...");

    await consumer.subscribe({ topics: [ constants.topicName], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`[${topic}]: PART: ${partition}: `,message.value.toString());
        }
    })
}

init()