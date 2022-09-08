const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tvp')
		.setDescription('Jill will call the local propaganda station and make some news for you!')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('What\'s the headline, Boss?')
				.setRequired(true))
		,
};