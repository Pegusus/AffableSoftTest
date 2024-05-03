import express from 'express';
import StartCronJob from './src/publisher/publisher.js';
import { connectToCassandra } from './db/db.js';
// import router from './routes/routes.js';

const app = express();
const port = 3003;

// app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectToCassandra();
});