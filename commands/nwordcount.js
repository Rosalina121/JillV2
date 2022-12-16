const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nwordcount')
		.setDescription('Jill will count your uses of the N-word.')
		,
};