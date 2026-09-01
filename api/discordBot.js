import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const commands = [
  new SlashCommandBuilder()
    .setName('specs')
    .setDescription('Show the full NASA Luna Recycle Challenge system specifications'),
  new SlashCommandBuilder()
    .setName('section')
    .setDescription('Show a single section of the system specifications')
    .addStringOption((opt) =>
      opt.setName('name').setDescription('Section key, e.g. "hardware"').setRequired(true)
    ),
].map((c) => c.toJSON());

// Starts the Discord bot if credentials are configured; returns null otherwise so the API can run without Discord.
export async function startDiscordBot(specs) {
  const token = process.env.DISCORD_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;
  const guildId = process.env.DISCORD_GUILD_ID; // optional: instant command sync for a single guild

  if (!token || !clientId) {
    console.log('Discord bot disabled (set DISCORD_TOKEN and DISCORD_CLIENT_ID to enable).');
    return null;
  }

  const rest = new REST({ version: '10' }).setToken(token);
  const route = guildId
    ? Routes.applicationGuildCommands(clientId, guildId)
    : Routes.applicationCommands(clientId);
  await rest.put(route, { body: commands });

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once('ready', () => {
    console.log(`Discord bot online as ${client.user.tag}`);
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'specs') {
      const embed = new EmbedBuilder()
        .setTitle('NASA Luna Recycle Challenge — System Specifications')
        .setDescription(Object.keys(specs).map((k) => `• ${k}`).join('\n') || 'No sections available')
        .setColor(0x00b7ff);
      await interaction.reply({ embeds: [embed] });
      return;
    }

    if (interaction.commandName === 'section') {
      const name = interaction.options.getString('name', true);
      const section = specs[name];
      if (!section) {
        await interaction.reply({ content: `Section "${name}" not found.`, ephemeral: true });
        return;
      }
      const body = JSON.stringify(section, null, 2).slice(0, 3900);
      const embed = new EmbedBuilder()
        .setTitle(`Section: ${name}`)
        .setDescription('```json\n' + body + '\n```')
        .setColor(0x00b7ff);
      await interaction.reply({ embeds: [embed] });
    }
  });

  await client.login(token);
  return client;
}
