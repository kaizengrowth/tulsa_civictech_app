const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Verify OpenAI API key
const apiKey = process.env.VITE_OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API key is missing!');
  process.exit(1);
}

const configuration = new Configuration({
  apiKey: apiKey
});
const openai = new OpenAIApi(configuration);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.post('/api/generate-letter', async (req, res) => {
  console.log('Received request to generate letter');
  
  try {
    const { zipCode, issue } = req.body;
    
    if (!zipCode || !issue) {
      console.error('Missing required fields:', { zipCode, issue });
      return res.status(400).json({ 
        message: 'Missing required fields',
        received: { zipCode, issue }
      });
    }

    console.log('Processing request:', { zipCode, issue });

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

    console.log('Sending request to OpenAI');
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

    console.log('Received response from OpenAI');
    const letter = completion.data.choices[0].message.content;
    res.json({ letter });

  } catch (error) {
    console.error('Error in generate-letter endpoint:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });

    res.status(500).json({
      message: 'Error generating letter',
      error: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`OpenAI API key available: ${!!apiKey}`);
}); 