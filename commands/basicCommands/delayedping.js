const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delayedping')
        .setDescription('Delayed response with Pong!'),
    async execute(interaction){
        await interaction.deferReply();
		await wait(4000);
        await interaction.editReply('Pong!');
    },
}