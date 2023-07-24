//import required files
const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

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

//create client to log in with
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//initialize collection of commands
client.commands = new Collection();

//assign folder with path.join
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  //grab commands from internal folders
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      console.log(command.data.name);

    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

//listen for chat command key '/'
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  //retrieve command names
  const command = interaction.client.commands.get(interaction.commandName);

  //no command found
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    //execute command
    await command.execute(interaction);
  } catch (error) {
    //error messages for commands
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

/* ------------------------------------------------------------ */
// message showing the bot is running
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//login using token
client.login(token);
