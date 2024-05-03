// influencerMetricsRepository.js

const InfluencerMetrics = require('./influencerMetricsModel');

async function findByInfluencerId(influencerId) {
    try {
        const influencerMetrics = await InfluencerMetrics.findByInfluencerId(influencerId);
        return influencerMetrics;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findByInfluencerId
};
