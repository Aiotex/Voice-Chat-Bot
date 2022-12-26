const { entersState, joinVoiceChannel, getVoiceConnections, VoiceConnectionStatus, EndBehaviorType} = require("@discordjs/voice");
const { OpusEncoder } = require("@discordjs/opus");
const AudioMixer = require('audio-mixer');
const Speaker = require("speaker");

const encoder = new OpusEncoder(48000, 2);
const mixer = new AudioMixer.Mixer({channels: 2, bitDepth: 16, sampleRate: 48000, clearInterval: 250});
const speaker = new Speaker({channels: 2, bitDepth: 16, sampleRate: 48000});
mixer.pipe(speaker);


// Handle joining to the voice channel
async function streamAudio(channelId) {
    voiceChannel = client.channels.cache.get(channelId);
    connection = getVoiceConnections().get(voiceChannel.guild.id);
    channelName.html(voiceChannel.name);
    leaveCall();

    connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        selfDeaf: false,
        selfMute: false,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
    console.log(`Joined channel ${voiceChannel.name}`);
    voiceChannel.members.forEach(member => { addParticipant(member.id); });

    const receiver = connection.receiver;
    receiver.speaking.on("start", (user) => { playStream(receiver, user) });
}


// Add the audio stream to a mixer and play it through the speaker
function playStream(receiver, userId) {
    const audioStream = receiver.subscribe(userId, { end: { behavior: EndBehaviorType.AfterSilence, duration: 200 } });
    const input = mixer.input({ volume: 75 });
    setSpeaking(userId, true);

    audioStream
        .on("data", (chunk) => {
            const buffer = encoder.decode(chunk);
            input.write(buffer);
        })
        .on("error", (err) => {
            console.log(err)
        })
        .on("end", () => {
            setSpeaking(userId, false);
            mixer.removeInput(input);
        })
}
