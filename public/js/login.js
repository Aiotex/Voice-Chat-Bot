const { Client, GatewayIntentBits } = require("discord.js");
const loadingGif = $('.preloader video');
const tokenInputContainer = $('.token-input-container');
const tokenInput = $('.token-input');
const submitTokenBtn = $('.submit-token-btn');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

const login = (token) => {
    tokenInputContainer.addClass('hidden');
    loadingGif.removeClass('hidden');

    client.login(token).then()
        .then(() => {
        console.log(`Succecfuly logged in as ${client.user.username}`);
        setTimeout(() => {$(".preloader").fadeOut(200); }, 1000);
    })
        .catch((err) => {
        console.log(err);
        tokenInputContainer.removeClass('hidden');
        loadingGif.addClass('hidden');
        errorNotification("Please enter a valid token in the input box");
    });
}

submitTokenBtn.click(() => {
    const token = tokenInput.val()
    localStorage.setItem("token", token);
    login(token);
})

tokenInput.val(localStorage.getItem("token"));