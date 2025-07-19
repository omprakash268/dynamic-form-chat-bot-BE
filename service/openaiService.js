import OpenAI from "openai";
import dotenv from "dotenv";
import { systemMessage } from "./prompt.js";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getStructuredResponse(prompt) {


    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: prompt }
        ],
        temperature: 0.3
    });

    const raw = completion.choices[0].message.content;

    try {
        return JSON.parse(raw);
    } catch (err) {
        const res = {
            type: 'Other',
            text: "Invalid JSON returned from LLM: " + err,
            formConfig: null
        }
        console.log(err);
        return res;
    }
}
