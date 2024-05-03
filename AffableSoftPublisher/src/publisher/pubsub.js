// src/publisher/pubsub.js
import { PubSub } from '@google-cloud/pubsub';

const pubsub = new PubSub();

// Function to publish a message to Pub/Sub topic
async function publishToPubSub(topicName, message) {
    try {
        const dataBuffer = Buffer.from(JSON.stringify(message)); // Convert message to JSON string and then buffer
        const messageId = await pubsub.topic(topicName).publishMessage({data: dataBuffer});
        console.log(`Message ${messageId} published to topic ${topicName}.`);
        return messageId;
    } catch (error) {
        console.error('Error publishing message to Pub/Sub:', error);
        throw error;
    }
}

export default publishToPubSub;
