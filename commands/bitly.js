const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bitly')
		.setDescription('Jill will (pfff) shorten your URL.')
		.addStringOption(option =>
			option.setName('link')
				.setDescription('What should (pfff) shorten for you, Boss?')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('back')
				.setDescription('What should the link end with, Boss?')
				.setRequired(true))
		,
};