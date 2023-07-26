const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('secretmessage')
    .setDescription('Get a secret message that only you can see.'),
  async execute(interaction) {
    // Your secret message content
    const secretMessage = 'This is a secret message that only you can see!';

    // Send the secret message as an ephemeral reply
    await interaction.reply({ content: secretMessage, ephemeral: true });
  },
};
