// Setup our environment variables via dotenv
require("dotenv").config();

// Import relevant classes from discord.js
const {
    Client,
    VoiceChannel,
    Intents,
    MessageEmbed,
    EmbedBuilder
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const request = require("request");
const { getPost, getImage } = require("random-reddit");

// Voice
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    entersState,
    StreamType,
    AudioPlayerStatus,
    VoiceConnectionStatus
} = require("@discordjs/voice");

// Node libs
const fs = require("node:fs");

// Watch2Gether
const fetch = require("node-fetch");

// Bitly
const { BitlyClient, isBitlyErrResponse } = require("bitly");
const bitly = new BitlyClient(process.env.BITLY_SECRET, {});

// GIFs
const Tenor = require("tenorjs").client({
    Key: "WQUV9WTVV51U", // https://tenor.com/developer/keyregistration
    Filter: "off", // "off", "low", "medium", "high", not case sensitive
    Locale: "en_US", // Your locale here, case-sensitivity depends on input
    MediaFilter: "minimal", // either minimal or basic, not case sensitive
    DateFormat: "YYYY-MM-DD - HH:mm:ss A" // Change this accordingly
});

// Cowsay
const cowsay = require("cowsay");

// TVP Selenium
const { Builder, By, Key, until } = require("selenium-webdriver");
let chrome = require("selenium-webdriver/chrome");

// Music Bot via Distube
const DisTube = require("distube");

// Instantiate a new client with some necessary parameters.
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

// Same for Distube
const distube = new DisTube.default(client);

const commands = [];
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

// Gadu-Gadu emoticons
const ggJson = fs.readFileSync("./emoticons.json", "utf8");
const availableEmoticons = JSON.parse(ggJson).emoticons.sort();

console.log(availableEmoticons);
const clientId = "439420686491058176";

// Jill: 450084991116771328, Ligo: 305732910961393666
const testing = true;
const guildId = testing ? "450084991116771328" : "305732910961393666";

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands
        });

        console.log(
            `Successfully reloaded application (/) commands.\n- ${commandFiles
                .toString()
                .replaceAll(",", "\n- ")
                .replaceAll(".js", "")}`
        );
    } catch (error) {
        console.error(error);
    }
})();

const pronouns = ["she/her", "he/him", "they/them", "other/ask"];
// --------------------- Methods ---------------------

// Just so it's shorter and if API changes easier to adapt
const my = (msg) => {
    return msg.author.bot;
};

// Update Bitlink so the back-half is customized
const updateBitlink = (link, back) => {
    const linkId = link.replace("https://", "");
    let newBitlink = fetch("https://api-ssl.bitly.com/v4/bitlinks/" + linkId, {
        method: "PATCH",
        headers: {
            Authorization: `${process.env.BITLY_SECRET}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: linkId,
            link: link,
            title: "Link: " + back,
            custom_bitlinks: ["https://bit.ly/" + back]
        })
    });
    return newBitlink;
};

const getQueerCalendarData = async () => {
    const url = "https://zaimki.pl//api/calendar/today";
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

// Notify progress
client.on("ready", function (e) {
    console.log(`Serving drinks, Boss!`);
});

// Authenticate
client.login(process.env.DISCORD_TOKEN);

// Set activity
client.on("ready", () => {
    client.user.setActivity("with your emotions", { type: "PLAYING" });
});

// ---------------------------------
//     Commands and other stuff
// ---------------------------------

// Fetch subreddit
client.on("message", function (msg) {
    if (my(msg)) {
        return;
    }
    // don't do links, coz reddit links contain a subreddit
    if (
        new RegExp(
            "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
        ).test(msg.content)
    ) {
        return;
    }
    const subredditRegex = /r\/([a-zA-Z0-9-_]*)/;
    result = msg.content.match(subredditRegex);
    if (result != null) {
        if (result.length !== 0) {
            msg.reply(
                `Serving the subreddit 🍹\nhttps://reddit.com/r/${result[1]}`
            );
        }
    }
});

// Wide Zelensky
client.on("message", function (msg) {
    if (my(msg)) {
        return;
    }
    const rusStrings = ["zelensky", "zielensky", "zełęski"];
    if (rusStrings.some((v) => msg.content.includes(v))) {
        let wideZelenskyEmbed = new MessageEmbed()
            .setColor(0xffff00)
            .setTitle("🇺🇦   ш и р о к и й   З е л е н с ь к и й   🇺🇦")
            .setImage("https://i.redd.it/ixldmehxo6k81.gif");
        msg.channel.send({ embeds: [wideZelenskyEmbed] });
    }
});

// Ruski wojennyj korabl, idi nachuj
client.on("message", function (msg) {
    if (my(msg)) {
        return;
    }
    const rusStrings = ["rosja"];
    if (rusStrings.some((v) => msg.content.includes(v))) {
        msg.channel.send("Русский военный корабль, иди нахуй");
    }
});

// Slava Ukrainie
// Ruski wojennyj korabl, idi nachuj
client.on("message", function (msg) {
    if (my(msg)) {
        return;
    }
    const rusStrings = ["ukrain", "kijów", "kijow"];
    if (rusStrings.some((v) => msg.content.includes(v))) {
        msg.channel.send("Слава Україні!");
    }
});

// Fuck TERFs
//
client.on("message", function (msg) {
    if (my(msg)) {
        return;
    }
    const msgStrings = ["hogwart", "rowling", "harry potter"];
    if (msgStrings.some((v) => msg.content.includes(v))) {
        msg.channel.send(
            "Did I hear a 'no-no' word? Go check: https://shinigami-eyes.github.io/ 🏳️‍⚧️"
        );
    }
});

// Slash commands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }
    if (interaction.commandName === "bitches") {
        await interaction.reply("https://i.redd.it/8d30a5nb43i81.jpg");
    }
    if (interaction.commandName === "blahaj") {
        const image = await getImage("blahaj");
        interaction.reply(image);
    }
    if (interaction.commandName === "w2g") {
        const url = interaction.options.get("url").value;
        if (url == null) {
            await interaction.reply(
                "Boss, you need to provide a YouTube Url. Here, have this Rad Shiba.\nhttps://static.wikia.nocookie.net/va11halla/images/9/91/RadShibaSprite.png/revision/latest?cb=20170603230004"
            );
            return;
        }
        fetch("https://api.w2g.tv/rooms/create.json", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                w2g_api_key: process.env.W2G_KEY,
                share: url,
                bg_color: "#FF2859",
                bg_opacity: "50"
            })
        })
            .then((response) => response.json())
            .then(function (data) {
                interaction.reply(
                    `Here's your private *\\*pfff\\**  room, Boss: ${
                        "https://w2g.tv/rooms/" + data.streamkey
                    }`
                );
            });
    }
    if (interaction.commandName === "gif") {
        const topic = interaction.options.get("topic").value;
        if (topic == null) {
            return;
        }
        var response = "";
        // Tenor.Trending.GIFs("LIMIT HERE")
        Tenor.Search.Query(topic, "1")
            .then(async (Results) => {
                Results.forEach(async (Post) => {
                    if (Post.url == null) {
                        {
                            await interaction.reply(
                                "Sorry Boss. I didn't find anything. Here, have this Rad Shiba.\nhttps://static.wikia.nocookie.net/va11halla/images/9/91/RadShibaSprite.png/revision/latest?cb=20170603230004"
                            );
                        }
                    }
                    await interaction.reply(`${Post.url}`);
                });
            })
            .catch(console.error);
    }
    if (interaction.commandName === "cowsay") {
        const text = interaction.options.get("text").value;
        if (text == null) {
            return;
        }

        await interaction.reply(
            "```gherkin\n" +
                cowsay.say({
                    text: text,
                    e: "oO",
                    T: "U "
                }) +
                "```"
        );
    }
    if (interaction.commandName === "tvp") {
        const text = interaction.options.get("text").value;
        if (text == null) {
            return;
        }
        await interaction.reply("Calling Mr Kurski...");
        (async function example() {
            let driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(
                    new chrome.Options().addArguments([
                        "--headless",
                        "--no-sandbox",
                        "--disable-dev-shm-usage"
                    ])
                )
                .build();
            let tvpUrl = "";
            try {
                await driver.get("https://pasek-tvpis.pl/");

                //Store the ID of the original window
                const originalWindow = await driver.getWindowHandle();

                await driver.findElement(By.id("f1")).click();
                await driver.findElement(By.name("msg")).sendKeys(text);
                await driver
                    .findElement(By.xpath("//input[@type='submit']"))
                    .click();

                //Wait for the new window or tab
                await driver.wait(
                    async () =>
                        (await driver.getAllWindowHandles()).length === 2,
                    10000
                );
                //Loop through until we find a new window handle
                const windows = await driver.getAllWindowHandles();
                windows.forEach(async (handle) => {
                    if (handle !== originalWindow) {
                        await driver.switchTo().window(handle);
                    }
                });
                //Wait for the new tab to finish loading content
                await driver.wait(function () {
                    return driver.getTitle().then(function (title) {
                        return title.includes("tvp");
                    });
                }, 1000);
                tvpUrl = await driver.getCurrentUrl();
                await driver.quit();
            } finally {
                await interaction.editReply(tvpUrl);
            }
        })();
    }
    if (interaction.commandName === "help") {
        await interaction.reply(
            `Here's what I can do for you, Boss:
\`\`\`python
Slash commands:
/pronouns <pronoun> "Set your pronouns (role)"
/ping               "Pong!"
/bitches            "What? No bitches?"
/kto                "Pfff, who asked?"
/w2g <url>          "I'll create a W2G room for you"
/gif <topic>        "I'll fetch you a gif of your choosing"
/cowsay <text>      "I'll ask this nice cow to say something for you"
/tvp <text>         "I'll ask the local propaganda station for a headline for you"

Jukebox:
/play <anything>    "I'll play anything you want. Or not if I don't like it"
/stop               "I'll shut this thing up"
/pause              "I'll kindly ask the music to wait for a bit..."
/resume             "Well... It resumes the music? Geez these commands are simple"
/queue              "Shows queue. I don't even need to write this help, wow"
/skip               "Straight to the nex song, Boss"
/volume <0-100>     "I'll turn this shit up, or down. You decide"
\`\`\``
        );
    }
    if (interaction.commandName === "bitly") {
        let link = interaction.options.get("link").value;
        let back = interaction.options.get("back").value;
        if (link == null || back == null) {
            await interaction.reply(
                "Sorry Boss. Neither arguments can be empty."
            );
            return;
        }
        if (!link.startsWith("http")) {
            link = "https://" + link;
        }
        try {
            result = await bitly.shorten(link);
            console.log(result);
            // const linkId = result.link.replace("https://", "");
            // console.log({id: linkId,
            //     link: result.link,
            //     title: "Link: " + back,
            //     custom_bitlinks: ["https://bit.ly/" + back]});
            // res = await bitly.bitlyRequest("update",   {id: linkId,
            //                                             link: result.link,
            //                                             title: "Link: " + back,
            //                                             custom_bitlinks: ["https://bit.ly/" + back]});
            // const res = await updateBitlink(result.link, back)
            // console.log(res);
            await interaction.reply(
                `Here's your shortlink, Boss: https://bit.ly/${result.link}`
            );
        } catch (e) {
            if (isBitlyErrResponse(e)) {
                await interaction.reply(
                    `Sorry Boss. Bitly sucks and says: ${e.description}`
                );
            }
            throw e;
        }
    }
    if (interaction.commandName === "kto") {
        await interaction.reply("https://i.redd.it/i8fu9rvp3xi91.jpg");
    }
    // Music --------------------------------
    if (interaction.commandName === "play") {
        if (interaction.options.get("tune") == null) {
            await interaction.reply(
                "Sorry, I'm too dumb for that. Please use `/resume` or `/pause`."
            );
            return;
        }
        if (!interaction.member?.voice?.channel) {
            await interaction.reply(
                "You have to be near the jukebox... I mean in the voice channel, Boss..."
            );
            return;
        }
        distube.play(
            interaction.member.voice.channel,
            interaction.options.get("tune").value,
            {
                interaction,
                textChannel: interaction.channel,
                member: interaction.member
            }
        );
        await interaction.reply(
            `Looking for... *${
                interaction.options.get("tune").value
            }*? (I wonder if my ears will make it)`
        );
    }
    if (interaction.commandName === "stop") {
        try {
            distube.stop(interaction);
            await interaction.reply("Stopping the jukebox, Boss.");
        } catch (e) {
            await interaction.reply("Nothing to stop, Boss.");
        }
    }
    if (interaction.commandName === "pause") {
        try {
            distube.pause(interaction);
            await interaction.reply("Pausing the jukebox, Boss.");
        } catch (e) {
            await interaction.reply("Nothing to pause, Boss.");
        }
    }
    if (interaction.commandName === "skip") {
        try {
            const queue = distube.getQueue(interaction);
            if (!queue.autoplay && queue.songs.length <= 1) {
                distube.stop(interaction);
                await interaction.reply("No songs left, Boss.");
                return;
            }
            await interaction.reply("Skipping...");
            queue.skip(interaction);
        } catch (e) {
            console.log(e + "\nError? That shouldn't happen.");
        }
    }
    if (interaction.commandName === "resume") {
        try {
            distube.resume(interaction);
            await interaction.resuming("Resuming playback...");
        } catch (e) {
            await interaction.reply("Nothing to resume, Boss.");
        }
    }
    if (interaction.commandName === "queue") {
        try {
            const queue = distube.getQueue(interaction);
            await interaction.reply(
                "Here's what on the jukebox:\n" +
                    queue.songs
                        .map(
                            (song, id) =>
                                `**${id + 1}**. [${song.name}](${
                                    song.url
                                }) - \`${song.formattedDuration}\``
                        )
                        .join("\n")
            );
        } catch (e) {
            await interaction.reply("Queue is empty. Just like my wallet.");
        }
    }
    if (interaction.commandName === "volume") {
        if (interaction.options.get("percentage") == null) {
            await interaction.reply("How loud should it be, Boss?");
            return;
        }
        try {
            const percent = interaction.options.get("percentage").value;
            distube.setVolume(interaction, parseInt(percent));
            await interaction.reply(`Volume set to: ${percent}`);
        } catch (e) {
            await interaction.reply(
                "Something is wrong with the jukebox, Boss. We need a new one."
            );
        }
    }
    // reply with shrug emoticon on commandName === "idk"
    if (interaction.commandName === "idk") {
        await interaction.reply("¯\\_(ツ)_/¯");
    }
    if (interaction.commandName === "pronouns") {
        const pronoun = interaction.options.get("pronoun")?.value;
        if (pronouns.includes(pronoun)) {
            let role = interaction.member.guild.roles.cache.find(
                (role) => role.name === pronoun
            );
            if (role)
                interaction.guild.members.cache
                    .get(interaction.user.id)
                    .roles.add(role);
            interaction.reply("Pronouns set!");
        } else {
            // Clear pronouns
            interaction.member.roles.cache
                .filter((role) => pronouns.includes(role.name))
                .map((role) => interaction.member.roles.remove(role));
            interaction.reply("Pronouns cleared.");
        }
    }
    if (interaction.commandName === "test") {
        // get image url from getQueerCalendarData()
        const data = await getQueerCalendarData();
        // get flag from eventsRaw
        const flag = data.eventsRaw[0].flag;
        await interaction.reply(flag);
    }
    if (interaction.commandName === "nwordcount") {
        // get username
        let username = interaction.options.get("username").value;

        let reply = `Nword count for user **${username}**:
        Soft r: \`${Math.floor(Math.random() * 1000 + 125)}\` times
        Hard r: \`${Math.floor(Math.random() * 300 + 67)}\` times`;
        if (username === "Rosalina" || username === "Apyxo") {
            reply = `Nword count for user **${username}**:
Soft r: \`0\` times
Hard r: \`0\` times`;
        }
        await interaction.reply(reply);
    }
    if (interaction.commandName === "gg") {
        let reply = "Did you make a typo?";
        let emoticon = interaction.options.get("emoticon")?.value;
        if (emoticon) {
            if (availableEmoticons.includes(emoticon)) {
                const ggUrl = `https://www.ggapp.com/6.31.1/images/emoticons/${emoticon}.gif`;

                await interaction.reply(ggUrl);
            }
        } else {
            await interaction.reply({
                content:
                    "```\n" +
                    availableEmoticons.toString().replaceAll(",", "\n") +
                    "```",
                ephemeral: true
            });
        }
    }

    if (interaction.commandName === "getwontresd") {
        distube.play(
            interaction.member.voice.channel,
            "https://youtu.be/u_Vei_DeaCU?t=23",
            {
                interaction,
                textChannel: interaction.channel,
                member: interaction.member
            }
        );
        await interaction.reply("GET WONTRES'D");
    }
});

distube.on("playSong", (queue, song) => {
    queue.textChannel.send("**Hey Boss. Got this junk working.**");
    let songThumbEmbed = new MessageEmbed()
        .setColor(0xff2859)
        .setTitle(`🎵  ${song.name}`)
        .setImage(song.thumbnail)
        .addField("🕖  Duration", song.formattedDuration)
        .addField("⛓️  Link", song.url);
    queue.textChannel.send({ embeds: [songThumbEmbed] });
});
