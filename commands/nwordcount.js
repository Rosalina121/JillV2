const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bitly')
		.setDescription('Jill will check N-word usage.')
		.addStringOption(option =>
			option.setName('username')
				.setDescription('Who do you want to snitch on?')
				.setRequired(true))
		,
};