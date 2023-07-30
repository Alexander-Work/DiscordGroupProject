const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    data: new SlashCommandBuilder()
		// setting the name when called in discord followed by a '/'
        .setName('gif')
		// setting the description of the command
        .setDescription('Sends a random gif!')
		// adding options for the command
		.addStringOption(option =>
			// making this a category for the type of gif to be sent
			option.setName('category')
				.setDescription('The gif category')
				// making sure its required so that the bot knows what kind of gif to send
				.setRequired(true)
				// the actual choices given. if one is selected then the value is what
				// will be used to filter the gifs being sent
				.addChoices(
					{ name: 'Funny', value: 'funny' },
					{ name: 'Meme', value: 'meme' },
					{ name: 'Movie', value: 'movie' },
					{ name: 'Coding', value: 'coding'},
				)),
    async execute(interaction){
		// getting the value of the choice made in discord when the /gif command is called
		const choice = interaction.options.get("category").value;
		// getting the tenor api link to receive gifs
		// putting in the value of the choice in the filter for tenor
		// ContentFilter=high filters it so no explicit gifs will be sent
		let url = `https://g.tenor.com/v1/search?q=${choice}&key=LIVDSRZULELA&ContentFilter=high`
		// fetching the response from the url
		let tenorResponse = await fetch(url);
		// getting the json value of the response from tenor
		let json = await tenorResponse.json();
		// making sure we get a random gif every time
		const index = Math.floor(Math.random() * json.results.length);
		// grabbing the url given from the json request in tenor to be sent by the bot
		let display = json.results[index].url;
        await interaction.deferReply();
		await wait(4000);
		// respond with the url of the gif
        await interaction.editReply(display);
    },
}