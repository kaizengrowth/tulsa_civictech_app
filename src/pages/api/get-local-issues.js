/* eslint-env node */
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
    // Use GPT to generate relevant local issues based on ZIP code
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a local issues expert for Tulsa, Oklahoma. Generate relevant current issues for the given ZIP code area."
        },
        {
          role: "user",
          content: `Generate 5 current civic issues for ZIP code ${zipCode} in Tulsa, OK. Include a title and brief description for each issue. Format as JSON.`
        }
      ],
      temperature: 0.7,
    });

    const issues = JSON.parse(completion.data.choices[0].message.content);
    res.status(200).json({ issues });
  } catch (error) {
    console.error('Error fetching local issues:', error);
    res.status(500).json({ message: 'Error fetching local issues' });
  }
} 