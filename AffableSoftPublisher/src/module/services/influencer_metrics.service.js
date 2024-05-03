// influencerMetricsService.js

import { findByInfluencerId as _findByInfluencerId } from './influencerMetricsRepository';

async function findByInfluencerId(influencerId) {
    return await _findByInfluencerId(influencerId);
}

export default {
    findByInfluencerId
};
