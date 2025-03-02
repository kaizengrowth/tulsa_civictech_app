/* eslint-env node */
import { Configuration, OpenAIApi } from 'openai';

/* global process */

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  console.log('Generate letter API called');
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { zipCode, issue } = req.body;
    console.log('Processing request for ZIP:', zipCode);
    console.log('Issue:', issue);

    console.log('OpenAI API Key available:', !!process.env.VITE_OPENAI_API_KEY);

    const prompt = `Write a formal, persuasive letter to a government representative about the following issue in Tulsa ZIP code ${zipCode}:

Issue: ${issue.title}
Details: ${issue.description}

The letter should:
1. Be professional and respectful
2. Include specific local context about this ZIP code in Tulsa
3. Clearly state the constituent's position
4. Request specific action
5. Include relevant data or examples
6. Be approximately 400 words

Format the letter with proper business letter formatting including today's date.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a skilled writer helping constituents craft effective letters to their representatives. You understand Tulsa's local government structure and current issues."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('OpenAI API response received');
    const letter = completion.data.choices[0].message.content;
    console.log('Letter generated successfully');

    res.status(200).json({ letter });
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });
    
    res.status(500).json({ 
      message: 'Error generating letter',
      error: error.message,
      details: error.response?.data
    });
  }
} 