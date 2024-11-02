import { kafka } from "./client.js";
import { constants } from "./constants.js";
import readline from 'readline';

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init() {
    const producer = kafka.producer();

    console.log("Connecting Producer...");
    await producer.connect();
    console.log("Producer Connected Successfully...");

    
    console.log("Sending message from producer");
    

    r1.setPrompt("> ");
    r1.prompt();
    r1.on("line", async function (line) {
        const [riderName, location] = line.split(" ");
        await producer.send({
            topic: constants.topicName,
            messages: [
                {
                    key: 'location-update',
                    partition: location === "north" ? 1 : 0,
                    value: JSON.stringify({
                        name: riderName, location
                    })
                }
            ]
        });
    }).on("close", async () => {
        await producer.disconnect();
    });

}

init();

