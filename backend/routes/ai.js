const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

router.post('/generate-description', async (req, res) => {
  const title = req.body.title;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Write one short plain text task description (one or two sentences, no markdown, no bold, no bullet points) for this task: ${title}`
    });

    // Remove any markdown symbols the model still adds
    const clean = response.text.replace(/[*#`_]/g, '').replace(/\s+/g, ' ').trim();

    res.json({ description: clean, fallback: false });
  } catch (err) {
    console.error('AI error:', err.message);
    res.status(200).json({ description: '', fallback: true });
  }
});

module.exports = router;