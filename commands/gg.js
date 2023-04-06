const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gg')
		.setDescription('Jill will get you classic Gadu-Gadu emoticons.')
        .addStringOption(option =>
			option.setName('emoticon')
				.setDescription('Which one to send?')
				.setRequired(false))
		,
};