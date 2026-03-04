const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.error('DB Connection Error:', err.message));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, profile } = req.body;

    // 1. Use the STABLE v1 model. 'gemini-2.5-flash' is the 2026 stable workhorse.
    const model = genAI.getGenerativeModel(
      { model: "gemini-2.5-flash" },
      { apiVersion: 'v1' }
    );

    // 2. DO NOT use the systemInstruction field. 
    // Instead, inject your "MikeAI" persona as the very first message.
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `INSTRUCTION: You are MikeAI. Assist a ${profile?.role || 'user'} with a ${profile?.tonePreference || 'Professional'} tone. Stay in character.` }],
        },
        {
          role: "model",
          parts: [{ text: "Acknowledged. MikeAI neural link established. How can I assist you today?" }],
        },
      ],
    });

    // 3. Send the actual user prompt
    const result = await chat.sendMessageStream(prompt);

    // 4. Stream the response back to your Frontend
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }
    
    res.end();

  } catch (error) {
    console.error("SERVER ERROR:", error.message);
    // If we already started streaming, we can't send a 500 status
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      res.end();
    }
  }
});

app.get('/', (req, res) => res.json({ message: "API Running" }));
app.use('/', require('./routes/authRoutes'));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server on port ${port}`));