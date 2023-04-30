
// Populate the channels navigation bar with the selected guild voice channels
function updateChannels(guildId) {
    const guild = client.guilds.cache.get(guildId);
    const voiceChannels = guild.channels.cache.filter(c => c.type == 2);

    guildName.html(guild.name);
    channels.empty();

    voiceChannels.forEach(channel => {
        const e = $(`<div class="channel-btn" data-id="${channel.id}">${voiceChannelIcon}<span>${channel.name}</span></div>`);
        e.click(() => { streamChannelAudio(e.data("id")); });
        channels.append(e);
    });  
}


// Functions for managing the channel display:
function addParticipant(userId) {
    const user = client.users.cache.get(userId);
    const avatarURL = user.displayAvatarURL();
    
    participants.append(`<div class="participant" data-id="${userId}"><div class="content"><img src="${avatarURL}"><span>${user.username}</span></div></div>`);
    const avatarImg = $(`.participant[data-id="${userId}"] img`);

    avatarImg.on("load", () => {
        const color = colorThief.getColor(avatarImg[0]);
        $(`.participant[data-id="${userId}"] .content`).css("background-color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    })

    voiceCallContent.removeClass("hidden");
    //joinSoundEffect.play();
}

function removeParticipant(userId) {
    participants.find(`.participant[data-id="${userId}"]`).remove();
    //leaveSoundEffect.play();
}

function setSpeaking(userId, speaking) {
    const e = `.participant[data-id="${userId}"] .content`;
    if(speaking) participants.find(e).addClass("speaking");
    else participants.find(e).removeClass("speaking");  
}

function leaveCall() {
    participants.empty();
    voiceCallContent.addClass("hidden");
    connection.disconnect();
    console.log(`Left \"${voiceChannel.name}\"`); 
}