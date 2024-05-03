// src/publisher/publisher.js
import { schedule } from 'node-cron';
import publishToPubSub from './pubsub.js';

const topicName = 'influencer-topic';

// Function to start the cron job
function StartCronJob() {
    schedule('0 * * * * *', async () => {
        console.log('Cron job started.');
        try {
            const influencerKeys = Array.from({ length: 1000 }, (_, index) => (1000000 + index + 1).toString());

            // Create an array of promises to publish messages in parallel
            const publishPromises = influencerKeys.map(async (key) => {
                // Publish influencer primary key to Pub/Sub topic
                await publishToPubSub(topicName, key);
                console.log(`Published message for influencer with primary key: ${key}`);
            });

            // Execute all publish promises in parallel
            await Promise.all(publishPromises);
        } catch (error) {
            console.error('Error fetching or publishing influencer data:', error);
        }
    });
}

StartCronJob();

export default StartCronJob;
