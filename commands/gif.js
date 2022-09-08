const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Jill will fetch you a gif (not GF tho, it\'s not that easy).')
		.addStringOption(option =>
			option.setName('topic')
				.setDescription('What should I look for Boss?')
				.setRequired(true))
		,
};