import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getStructuredResponse } from "./service/openaiService.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:4200"
}));

app.post('/api/generate-form', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await getStructuredResponse(prompt);
        res.json(response);
    } catch (error) {
        console.error('Error generating structured response:', error.message);
        res.status(500).json({ error: 'Error generating structured response:' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
