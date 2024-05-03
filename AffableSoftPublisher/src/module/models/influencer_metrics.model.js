// influencerMetricsModel.js

import { client } from './db'; // Import your Cassandra client configuration

class InfluencerMetrics {
    constructor(influencerId, currentFollowerCount, currentAvg, iterationCount) {
        this.influencerId = influencerId;
        this.currentFollowerCount = currentFollowerCount;
        this.currentAvg = currentAvg;
        this.iterationCount = iterationCount;
    }

    static async findByInfluencerId(influencerId) {
        const query = 'SELECT * FROM influencer_metrics WHERE influencer_id = ?';
        const params = [influencerId];
        try {
            const result = await client.execute(query, params, { prepare: true });
            if (result.rows.length > 0) {
                const { influencer_id, current_follower_count, current_avg, iteration_count } = result.rows[0];
                return new InfluencerMetrics(influencer_id, current_follower_count, current_avg, iteration_count);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}

export default InfluencerMetrics;
