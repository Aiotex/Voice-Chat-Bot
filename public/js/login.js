require("dotenv").config();
const config = require("../config.json");
const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env.TOKEN || config.token;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.login(token).then()
    .then(() => {
    console.log(`Succecfuly logged in as ${client.user.username}`);
    setTimeout(() => {$(".preloader").fadeOut(200); }, 1000);
})
    .catch((err) => {
    console.log(err);
    errorNotification("Please enter a valid token in config.json, exit the app and try again");
});