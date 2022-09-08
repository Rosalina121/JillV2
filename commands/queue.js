const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Jill will show you what\'s next up.'),
};