/* eslint-env node */
import { Configuration, OpenAIApi } from 'openai';

/* global process */

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { topic, stance } = req.body;

    const prompt = `Write a formal, persuasive letter to a government representative about ${topic}. 
    The constituent's position is: ${stance}
    
    The letter should:
    1. Be professional and respectful
    2. Include specific local context about Tulsa
    3. Clearly state the constituent's position
    4. Request specific action
    5. Include relevant data or examples
    6. Be approximately 400 words
    
    Format the letter with proper business letter formatting.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a skilled writer helping constituents craft effective letters to their representatives."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const letter = completion.data.choices[0].message.content;

    res.status(200).json({ letter });
  } catch (error) {
    console.error('Error generating letter:', error);
    res.status(500).json({ message: 'Error generating letter' });
  }
} 