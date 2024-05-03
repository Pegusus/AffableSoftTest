import { client } from "../../db/db.js";

async function updateInfluencerData(influencerKey, followerCount) {
    try {
        const query = 'SELECT * FROM mykeyspace.influencer_metrics WHERE influencer_id = ? ORDER BY creation_time DESC LIMIT 1';
        const params = [influencerKey];
        const result = await client.execute(query, params, { prepare: true });

        let currentAvg = followerCount;
        let iterationCount = 1;

        if (result.rows.length > 0) {
            const latestRow = result.rows[0];
            const prevAvg = parseFloat(latestRow.current_avg);
            const prevIterationCount = parseInt(latestRow.iteration_count);

            currentAvg = (prevAvg * (prevIterationCount / (prevIterationCount + 1))) + (followerCount / (prevIterationCount + 1));

            iterationCount = prevIterationCount + 1;
        }

        const insertQuery = 'INSERT INTO mykeyspace.influencer_metrics (influencer_id, current_follower_count, current_avg, iteration_count, creation_time) VALUES (?, ?, ?, ?, toTimestamp(now()))';
        const insertParams = [influencerKey, followerCount, currentAvg, iterationCount];
        await client.execute(insertQuery, insertParams, { prepare: true });

        // Update Influencer Profile Query
        const upsertQuery = 'UPDATE mykeyspace.influencer_profile SET latest_follower_count = ?, latest_average = ?, updated_time = toTimestamp(now()) WHERE influencer_id = ?';
        await client.execute(upsertQuery, [followerCount, currentAvg, influencerKey], { prepare: true });

        console.log(`Updated data for influencer ${influencerKey} with follower count ${followerCount}`);
    } catch (err) {
        console.error('Error updating influencer data', err);
    }
}

export default updateInfluencerData;
