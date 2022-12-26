
// Populate the guilds nav bar
client.on("ready", () => {
    client.guilds.cache.forEach(guild => {
        const e = $(`<div class="squircle" data-id="${guild.id}"><img src="${guild.iconURL()}"><span class="tooltip">${guild.name}</span></div>`);
        e.click(() => { updateChannels(e.data("id")); });
        guilds.append(e);
    });
})

client.on('voiceStateUpdate', (oldState, newState) => {
    const userId = newState.member.id;
    const oldChannelId = oldState.channel ? oldState.channel.id : null;
    const newChannelId = newState.channel ? newState.channel.id : null;
    
    // Return it its not the channel we are tracking
    if (voiceChannel == null || oldChannelId == newChannelId) return;

    if (userId == client.user.id) {
        // Bot left the channel, disconnect and reset channel display
        if(newChannelId != voiceChannel.id) leaveCall();
        return;
    }

    // User left a channel
    if (newChannelId == null && oldChannelId == voiceChannel.id) removeParticipant(userId);
    // User joined a channel
    else if (oldChannelId == null && newChannelId == voiceChannel.id) addParticipant(userId);
    // User moved channels (left)
    else if (oldChannelId == voiceChannel.id) removeParticipant(userId);
    // User moved channels (joined)
    else if (newChannelId == voiceChannel.id) addParticipant(userId);
});