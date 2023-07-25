const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: {
      name: 'time', // The name of the command (used for calling it)
      description: 'Get the localized time.', // Description of the command (optional)
    },
    async execute(interaction) {
      // Get the user's preferred locale from the interaction data or use a default value
      const userLocale = interaction.locale || 'en';
  
      // Get the localized time for the user's locale
      const localizedTime = formatLocalizedTime(userLocale);
  
      // Reply to the interaction with the localized time
      await interaction.reply(`The localized time is: ${localizedTime}`);
    },
  };
  

  ////