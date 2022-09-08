const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cowsay')
		.setDescription('Do you seriously still use this old-ass terminal?')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('What should the Cow say?')
				.setRequired(true))
		,
};