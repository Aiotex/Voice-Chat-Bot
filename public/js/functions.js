
// Populate the channels navigation bar with the selected guild voice channels
function updateChannels(guildId) {
    const guild = client.guilds.cache.get(guildId);
    const voiceChannels = guild.channels.cache.filter(c => c.type == 2);

    guildName.html(guild.name);
    channels.empty();

    voiceChannels.forEach(channel => {
        const e = $(`<div class="main-btn" data-id="${channel.id}">${voiceChannelIcon}<span>${channel.name}</span></div>`);
        e.click(() => { streamAudio(e.data("id")); });
        channels.append(e);
    });  
}


// Functions for managing the channel display:
function addParticipant(userId) {
    const user = client.users.cache.get(userId);
    participants.append(`<div class="participant main-btn" data-id=${user.id}><img src="${user.displayAvatarURL()}"><span>${user.username}</span></div>`);
    voiceCall.show();
    noConnection.hide();
    joinSoundEffect.play();
}

function removeParticipant(userId) {
    participants.find(`.participant[data-id="${userId}"]`).remove();
    leaveSoundEffect.play();
}

function setSpeaking(userId, speaking) {
    const e = `.participant[data-id="${userId}"]`;
    if(speaking) participants.find(e).addClass("speaking");
    else participants.find(e).removeClass("speaking");  
}

function leaveCall() {
    participants.empty();
    voiceCall.hide();
    noConnection.show();
    try { connection.destroy(); } catch(err) { console.log(err); }
}