const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('w2g')
		.setDescription('Jill will create a private room... Sexy.')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('What should I put on to play, Boss?')
				.setRequired(true))
		,
};