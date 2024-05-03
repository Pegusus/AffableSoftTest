// influencerMetricsController.js

import { findByInfluencerId } from './influencerMetricsService';

async function getInfluencerMetrics(req, res) {
    const influencerId = req.params.id;
    try {
        const influencerMetrics = await findByInfluencerId(influencerId);
        if (influencerMetrics) {
            res.status(200).json(influencerMetrics);
        } else {
            res.status(404).json({ error: 'Influencer metrics not found' });
        }
    } catch (error) {
        console.error('Error fetching influencer metrics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default getInfluencerMetrics;
