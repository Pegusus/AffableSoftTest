import { Client } from 'cassandra-driver';

// Create a Cassandra client
const client = new Client({
  contactPoints: ['127.0.0.1'], // IP address of your Cassandra instance
  localDataCenter: 'datacenter1', // Name of your datacenter
  keyspace: 'mykeyspace' // Name of the keyspace you created
});

// Connect to Cassandra
async function connectToCassandra() {
  try {
    await client.connect();
    console.log('Connected to Cassandra');
  } catch (err) {
    console.error('Error connecting to Cassandra', err);
    throw err;
  }
}

export { client, connectToCassandra };
