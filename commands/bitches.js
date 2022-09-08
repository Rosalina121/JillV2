const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bitches')
		.setDescription('When you don\'t have bitches!'),
};