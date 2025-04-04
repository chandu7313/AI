const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";  // ✅ Correct model
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/command', async (req, res) => {
    try {
        const { command } = req.body;

        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: command }] }]
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('API Response:', response.data);

        res.json({ response: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI" });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to process command' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
