const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Roll a dice')
        .addIntegerOption(option =>
            option.setName('sides')
                .setDescription('Number of sides on the dice')
                .setRequired(true)),
    async execute(interaction) {
        const sides = interaction.options.getInteger('sides');

        // Roll the dice
        const rollResult = Math.floor(Math.random() * sides) + 1;

        await interaction.reply(`You rolled a ${rollResult} on a ${sides}-sided dice!`);
    },
};
