import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express());
app.use(cors({ origin: process.env.CORS_ORIGIN }));


// Fetch Codeforces Profile Data
app.get('/profile/codeforces/:handle', async (req, res) => {
    try {
        const response = await axios.get(`https://codeforces.com/api/user.info?handles=${req.params.handle}`);
        // console.log(response);
        res.json(response.data.result[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Codeforces data' });
    }
});

// Fetch LeetCode Profile Data
app.get('/profile/leetcode/:username', async (req, res) => {
    try {
        const response = await axios.post('https://leetcode.com/graphql', {
            query: `{
                matchedUser(username: "${req.params.username}") {
                    username
                    submitStatsGlobal {
                        acSubmissionNum {
                            difficulty
                            count
                        }
                    }
                }
            }`
        });
        res.json(response.data.data.matchedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching LeetCode data' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
