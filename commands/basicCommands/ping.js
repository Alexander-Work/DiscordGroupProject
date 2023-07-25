const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    // Check if the interaction is in a guild (server) or a DM
    if (interaction.channel.type === 'DM') {
      // This is a direct message
      await interaction.reply('Pong! This command works in direct messages too.');
    } else {
      // This is a guild (server) command
      await interaction.reply('Pong!');
    }
  },
};
