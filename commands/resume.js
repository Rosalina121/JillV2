const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Jill will resume the music.'),
};