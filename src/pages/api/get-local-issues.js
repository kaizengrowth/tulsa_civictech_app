/* eslint-env node */
/* global process */
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { zipCode } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a local issues expert for Tulsa, Oklahoma. You understand the specific challenges and 
          opportunities in different ZIP codes. Format your response as a JSON array of objects with 'id', 'title', 
          and 'description' fields.`
        },
        {
          role: "user",
          content: `Generate 5 current and specific civic issues for ZIP code ${zipCode} in Tulsa, OK. 
          Consider local infrastructure, community development, education, and environmental concerns.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Parse and format the response
    let issues = [];
    try {
      const content = completion.data.choices[0].message.content;
      issues = JSON.parse(content);
    } catch (parseError) {
      console.error('Error parsing GPT response:', parseError);
      issues = [
        {
          id: 1,
          title: "Error generating specific issues",
          description: "Please try again or contact support if the problem persists."
        }
      ];
    }

    res.status(200).json({ issues });
  } catch (error) {
    console.error('Error fetching local issues:', error);
    res.status(500).json({ 
      message: 'Error fetching local issues',
      error: error.message 
    });
  }
} 