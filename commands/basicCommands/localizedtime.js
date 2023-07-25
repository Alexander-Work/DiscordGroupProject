
// Function to format the time based on the user's locale
function formatLocalizedTime(locale) {
    // Get the current date and time
    const currentDate = new Date();
  
    // Format the time based on the user's locale
    let formattedTime;
    try {
      formattedTime = currentDate.toLocaleTimeString(locale);
    } catch (error) {
      // If the locale is not supported or there is an error, fallback to English
      formattedTime = currentDate.toLocaleTimeString('en');
    }
  
    return formattedTime;
  }
  
  module.exports = {
    data: {
      name: 'localizedtime', // The name of the command (used for calling it)
      description: 'Get the localized time.', // Description of the command (optional)
    },
    async execute(interaction) {
      // Get the user's preferred locale from the interaction data or use a default value
      const userLocale = interaction.user.locale || 'en';
  
      // Get the localized time for the user's locale
      const localizedTime = formatLocalizedTime(userLocale);
  
      // Reply to the interaction with the localized time
      await interaction.reply(`The localized time is: ${localizedTime}`);
    },
  };
  