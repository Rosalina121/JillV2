const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("getwontresd")
        .setDescription("Get Wontres'd")
};
