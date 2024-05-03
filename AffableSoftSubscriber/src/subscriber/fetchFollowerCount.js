// src/subscriber/fetchFollowerCount.js
import axios from 'axios';

// Function to fetch follower count from Mockstagram API
async function fetchFollowerCount(influencerKey) {
    try {
        console.log(influencerKey, `http://localhost:3000/api/v1/influencers/${influencerKey}`);
        const response = await axios.get(`http://localhost:3000/api/v1/influencers/${influencerKey}`);
        console.log('res', response.data);
        const { followerCount } = response.data; // Assuming the response contains followerCount property
        return followerCount;
    } catch (error) {
        console.error('Error fetching follower count:', error);
        // throw error;
    }
}

export default fetchFollowerCount;
