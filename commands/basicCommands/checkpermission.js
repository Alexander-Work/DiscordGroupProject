const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkpermission')
    .setDescription('Check if you have permission to delete messages.'),
  async execute(interaction) {
    // Check if the interaction is in a guild (server) or a DM
    if (interaction.channel.type === 'DM') {
      await interaction.reply('This command can only be used in a server (guild).');
    } else {
      const roleToCheck = 'new role';
      const role = interaction.guild.roles.cache.find(r => r.name === roleToCheck);

      if (!role) {
        await interaction.reply(`Role "${roleToCheck}" not found in this server.`);
      } else if (interaction.member.roles.cache.has(role.id)) {
        await interaction.reply('You have the permission to delete messages.');
      } else {
        await interaction.reply('You do not have the permission to delete messages.');
      }
    }
  },
};
