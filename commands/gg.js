const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gg')
		.setDescription('Jill will get you classic Gadu-Gadu emoticons. Use without option to list all.')
        .addStringOption(option =>
			option
				.setName('emoticon')
				.setDescription('Which one to send?')
				.setRequired(false)
				// TODO: list 10 most fun emotes
				// Discord has hard limit of 25 options, of which only 10 show up without search. 
			)
		,
};