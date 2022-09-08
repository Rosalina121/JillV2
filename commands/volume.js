const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Jill will change the volume.')
		.addStringOption(option =>
			option.setName('percentage')
				.setDescription('How loud should it be, Boss?')
				.setRequired(false))
		,
};