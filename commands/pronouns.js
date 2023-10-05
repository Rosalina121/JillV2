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
                .addChoices(
                    { name: "she/her", value: "she/her" },
                    { name: "he/him", value: "he/him" },
                    { name: "they/them", value: "they/them" },
                    { name: "other/ask", value: "other/ask" },
                    { name: "Clear pronouns", value: "clear" }
                )
        )
};
