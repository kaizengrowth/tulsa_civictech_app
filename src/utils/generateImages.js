/* eslint-env node */
/* global process */
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const configuration = new Configuration({
  apiKey: process.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function generateImage(prompt, filename) {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data.data[0].url;
    const filepath = path.join(process.cwd(), 'public', 'images', filename);
    
    await downloadImage(imageUrl, filepath);
    console.log(`Successfully generated and saved: ${filename}`);
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
  }
}

// Generate the first three images
async function generateInitialImages() {
  const images = [
    {
      prompt: "Professional photo of a modern desk with a laptop, papers, and a pen, Tulsa city skyline visible through window, warm lighting, modern office setting, photorealistic style",
      filename: "letter-writing.jpg"
    },
    {
      prompt: "Diverse group of volunteers in Tulsa working together at a community event, people planting trees and cleaning parks, outdoor setting, natural lighting, photorealistic",
      filename: "get-involved.jpg"
    },
    {
      prompt: "Senior citizen learning computer skills from a young teacher in a modern Tulsa library, warm lighting, encouraging atmosphere, photorealistic style",
      filename: "digital-literacy.jpg"
    }
  ];

  for (const image of images) {
    await generateImage(image.prompt, image.filename);
  }
}

generateInitialImages(); 