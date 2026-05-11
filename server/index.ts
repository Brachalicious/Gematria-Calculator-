import express from 'express';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { setupStaticServing } from './static-serve.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load Sefer HaBahir wisdom
let bahirPassages: string[] = [];
try {
  const bahirData = JSON.parse(readFileSync(join(__dirname, 'bahir.json'), 'utf-8'));
  bahirPassages = (bahirData.text as string[]).filter((t: string) => t && t.trim().length > 20);
  console.log(`Loaded ${bahirPassages.length} passages from Sefer HaBahir`);
} catch (e) {
  console.warn('Could not load Bahir:', e);
}

// Load Sefer Yetzirah wisdom
let yetzirahPassages: string[] = [];
try {
  const yetzirahData = JSON.parse(readFileSync(join(__dirname, 'yetzirah.json'), 'utf-8'));
  const flatText = (yetzirahData.text as any[]).flat(Infinity).filter((t: string) => t && t.trim().length > 20);
  yetzirahPassages = flatText;
  console.log(`Loaded ${yetzirahPassages.length} passages from Sefer Yetzirah`);
} catch (e) {
  console.warn('Could not load Yetzirah:', e);
}

const bahirContext = bahirPassages.length > 0
  ? `\n\nYou also have access to passages from Sefer HaBahir (an ancient Kabbalistic text). Use this wisdom to enrich your answers when relevant:\n\n${bahirPassages.slice(0, 5).join('\n\n')}`
  : '';

const yetzirahContext = yetzirahPassages.length > 0
  ? `\n\nYou also have access to passages from Sefer Yetzirah (The Book of Creation, Aryeh Kaplan translation). Draw on this foundational Kabbalistic text about the 32 paths of wisdom, the Hebrew letters, and the Sefirot when relevant:\n\n${yetzirahPassages.slice(0, 8).join('\n\n')}`
  : '';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MysticMind AI chat endpoint
app.post('/api/chat', async (req: express.Request, res: express.Response) => {
  try {
    const { messages, systemPrompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Missing OpenAI API key' });
      return;
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt || `You are MysticMinded³³, a warm and deeply knowledgeable guide to Gematria, Kabbalah, and Hebrew mysticism. Answer each question specifically and personally — never repeat the same generic analysis. Include real clickable Sefaria links formatted as [Title](https://www.sefaria.org/...). Be wise, warm, and insightful.${bahirContext}${yetzirahContext}`,
          },
          ...messages,
        ],
      }),
    });
    const data = await response.json() as any;
    const reply = data.choices?.[0]?.message?.content ?? 'I could not find an answer.';
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export async function startServer(port) {
  try {
    if (process.env.NODE_ENV === 'production') {
      setupStaticServing(app);
    }
    app.listen(port, () => {
      console.log(`API Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Starting server...');
  startServer(process.env.PORT || 3001);
}
