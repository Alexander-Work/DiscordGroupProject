const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('The message you want the bot to say')
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName('anonymous')
        .setDescription('Make the bot say the message anonymously')
    ),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    const isAnonymous = interaction.options.getBoolean('anonymous');

    if (isAnonymous) {
      await interaction.reply(`Someone said: ${message}`);
    } else {
      await interaction.reply({ content: message, ephemeral: true });
    }
  },
};
