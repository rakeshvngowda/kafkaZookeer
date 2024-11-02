import { kafka } from "./client.js";
import { constants } from "./constants.js";

async function init() {
    const admin = kafka.admin();
    console.log("Admin connecting...");
    admin.connect();
    console.log("Admin Connection Success");
    console.log("Creating Topic [rider-updates]");
    await admin.createTopics({
        topics: [
            {
                topic: constants.topicName,
                numPartitions: 2
            }
        ]
    });
    console.log(`Topic Created Successfully [${constants.topicName}]`);

    console.log("Disconnecting Admin..");
    admin.disconnect();
}

init();