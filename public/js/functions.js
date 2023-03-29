
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

    fac.getColorAsync(avatarURL)
    .then(color => {
        participants.append(`<div class="participant" style="background-color: ${color.hex}" data-id=${user.id}><img src="${avatarURL}"><span>${user.username}</span></div>`);
    })
    .catch(e => {
        console.log(e);
    });
    
    voiceCallContent.removeClass("hidden")
    //joinSoundEffect.play();
}

function removeParticipant(userId) {
    participants.find(`.participant[data-id="${userId}"]`).remove();
    //leaveSoundEffect.play();
}

function setSpeaking(userId, speaking) {
    const e = `.participant[data-id="${userId}"]`;
    if(speaking) participants.find(e).addClass("speaking");
    else participants.find(e).removeClass("speaking");  
}

async function leaveCall() {
    participants.empty();
    voiceCallContent.addClass("hidden")

    try { connection.destroy(); } catch(e) { console.log(e) } 
    await entersState(connection, VoiceConnectionStatus.Destroyed, 20e3);
    console.log(`Left \"${voiceChannel.name}\"`); 
}