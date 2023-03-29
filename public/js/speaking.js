
function streamMicAudio() {
    const audioPlayer = createAudioPlayer({behaviors: {noSubscriber: NoSubscriberBehavior.Stop}});
    const inputStream = record.start({sampleRate: 48000, verbose: true});
    const audioResource = createAudioResource(inputStream);
    
    connection.subscribe(audioPlayer);
    audioPlayer.play(audioResource);


    audioPlayer.on(AudioPlayerStatus.Playing, () => {
        console.log('Player playing');
    });
    audioPlayer.on(AudioPlayerStatus.Idle, () => {
        console.log('Player idle');
    });
}

