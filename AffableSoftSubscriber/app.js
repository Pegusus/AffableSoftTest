import express from 'express';
import initSubscriber from './src/subscriber/subscriber.js';
import { connectToCassandra } from './db/db.js';

const app = express();
const port = 3006;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// app.post('/pubsub/webhook', async (req, res) => {
//   const message = req.body.message;
//   console.log(message);
//   // Process the message
//   try {
//     const dataString = Buffer.from(message.data, 'base64').toString();
//     console.log(JSON.parse(dataString));
//     const influencerKey =  Number(JSON.parse(dataString));
//     console.log('Received message for influencer with primary key:', influencerKey);
//     const followerCount = await fetchFollowerCount(influencerKey);
//     updateInfluencerData(influencerKey, followerCount);
//     message.ack();
//     console.log(`Updated data for influencer with primary key ${influencerKey}`);
//   } catch (error) {
//       console.error('Error processing message:', error);
//   }
// });

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);

  const subscriber = initSubscriber();
  await connectToCassandra();
});