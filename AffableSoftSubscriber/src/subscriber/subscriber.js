// src/subscriber/subscriber.js
import { PubSub } from '@google-cloud/pubsub';
import fetchFollowerCount from './fetchFollowerCount.js'
import updateInfluencerData from './updateInfluencerData.js';

function initSubscriber() {
    const pubsub = new PubSub();
    const subscriptionName = 'influencer-topic-sub';

    const subscriberOptions = {
        flowControl: {
          maxMessages: 2,
        },
      };

    const subscriber = pubsub.subscription(subscriptionName, subscriberOptions);

    subscriber.on('message', async (message) => {
        try {
            const dataString = Buffer.from(message.data, 'base64').toString();
            console.log(JSON.parse(dataString));
            const influencerKey =  Number(JSON.parse(dataString));
            console.log('Received message for influencer with primary key:', influencerKey);
            const followerCount = await fetchFollowerCount(influencerKey);
            updateInfluencerData(influencerKey, followerCount);
            message.ack();
            console.log(`Updated data for influencer with primary key ${influencerKey}`);
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    return subscriber;
}

export default initSubscriber;
