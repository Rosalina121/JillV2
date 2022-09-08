const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Jill will put on some good music.')
		.addStringOption(option =>
			option.setName('tune')
				.setDescription('What should I play for you, Boss?')
				.setRequired(false))
		,
};