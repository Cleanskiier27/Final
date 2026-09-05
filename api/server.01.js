import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyKeyMiddleware, InteractionType, InteractionResponseType } from 'discord-interactions';
import { startDiscordBot } from './discordBot.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Load system specifications
const specs = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/system-specifications.json'), 'utf8'));

// Must be registered before express.json(): verifyKeyMiddleware needs the raw request body to check the signature.
app.post('/discord/interactions', verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY), (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = interaction.data;

    if (name === 'specs') {
      const list = Object.keys(specs).map((k) => `• ${k}`).join('\n') || 'No sections available';
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { embeds: [{ title: 'NASA Luna Recycle Challenge — System Specifications', description: list, color: 0x00b7ff }] },
      });
    }

    if (name === 'section') {
      const sectionName = options?.find((o) => o.name === 'name')?.value;
      const section = specs[sectionName];
      if (!section) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: `Section "${sectionName}" not found.`, flags: 64 },
        });
      }
      const body = JSON.stringify(section, null, 2).slice(0, 3900);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { embeds: [{ title: `Section: ${sectionName}`, description: '```json\n' + body + '\n```', color: 0x00b7ff }] },
      });
    }
  }

  return res.status(400).json({ error: 'Unknown interaction type' });
});

// API Routes
app.use(express.json());

app.get('/api/specs', (req, res) => {
  res.json(specs);
});

app.get('/api/specs/:section', (req, res) => {
  const section = req.params.section;
  if (specs[section]) {
    res.json({ [section]: specs[section] });
  } else {
    res.status(404).json({ error: 'Section not found' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log(`Specs: http://localhost:${PORT}/api/specs`);
});

startDiscordBot(specs).catch((err) => {
  console.error('Failed to start Discord bot:', err.message);
});
