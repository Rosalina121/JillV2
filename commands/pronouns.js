const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pronouns")
        .setDescription("How should I call you? Other than Boss... of course.")
        .addStringOption((option) =>
            option
                .setName("pronoun")
                .setDescription("Whatcha using, Boss?")
                .setRequired(true)
                .addChoice("she/her", "she/her")
                .addChoice("he/him", "he/him")
                .addChoice("they/them", "they/them")
                .addChoice("other/ask", "other/ask")
                .addChoice("Clear pronouns", "clear")
        )
};
