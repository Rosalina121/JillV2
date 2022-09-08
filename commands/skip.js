const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Jill will skip to the next track.'),
};