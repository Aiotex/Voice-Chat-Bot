
const mixer = new AudioMixer.Mixer({
    channels: 2, 
    bitDepth: 16, 
    sampleRate: 48000, 
    clearInterval: 250
});

const speaker = new Speaker({
    channels: 2, 
    bitDepth: 16, 
    sampleRate: 48000
});

mixer.pipe(speaker);

async function streamChannelAudio(channelId) {
    if(connection) await leaveCall();
    muteBtn.removeClass("mute-btn").addClass("unmute-btn")
    muteBtn.children('img').attr('src', '../public/assets/images/unmute.png');
    muted = true;

    voiceChannel = client.channels.cache.get(channelId);
    connection = getVoiceConnections().get(voiceChannel.guild.id);
    channelName.html(voiceChannel.name);

    connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        selfDeaf: false,
        selfMute: false,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    // keeps player and receiver alive
    const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
        const newUdp = Reflect.get(newNetworkState, 'udp');
        clearInterval(newUdp?.keepAliveInterval);
    }

    connection.on('stateChange', (oldState, newState) => {
        const oldNetworking = Reflect.get(oldState, 'networking');
        const newNetworking = Reflect.get(newState, 'networking');
      
        oldNetworking?.off('stateChange', networkStateChangeHandler);
        newNetworking?.on('stateChange', networkStateChangeHandler);
    });

    await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
    console.log(`Joined \"${voiceChannel.name}\"`);
    voiceChannel.members.forEach(member => { addParticipant(member.id); });

    const receiver = connection.receiver;
    receiver.speaking.on("start", (user) => { mixStream(receiver, user) });
}


// Add the audio stream to the mixer
function mixStream(receiver, userId) {
    const encoder = new OpusEncoder(48000, 2);
    const audioStream = receiver.subscribe(userId, { end: { behavior: EndBehaviorType.AfterSilence, duration: 200 } });
    const input = mixer.input({ volume: 75 });
    setSpeaking(userId, true);

    audioStream
        .on("data", (chunk) => {
            const buffer = encoder.decode(chunk);
            if(!deafened) input.write(buffer);  
        })
        .on("error", (e) => {
            console.log(e)
        })
        .on("end", () => {
            mixer.removeInput(input);
            setSpeaking(userId, false);  
        })
}
