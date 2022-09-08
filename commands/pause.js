const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('I\'ll pause the song, Boss.'),
};