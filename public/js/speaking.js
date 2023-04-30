
var changeLatencyDisplay;
var recordingStartTime, audioStartTime;

function streamMicAudio() {
    const audioPlayer = createAudioPlayer({behaviors: {noSubscriber: NoSubscriberBehavior.Stop}});
    const inputStream = record.start({sampleRate: 48000, verbose: false});
    const audioResource = createAudioResource(inputStream);
    recordingStartTime = null;
    audioStartTime = null;
    
    inputStream.on('data', () => { if(!recordingStartTime) recordingStartTime = Date.now(); })
    inputStream.on('end', () => { clearInterval(changeLatencyDisplay); })
    connection.subscribe(audioPlayer);
    audioPlayer.play(audioResource);

    audioPlayer.on(AudioPlayerStatus.Playing, () => {
        audioStartTime = Date.now();
        setSpeaking(client.user.id, true);
        console.log('Player playing');
    });
    audioPlayer.on(AudioPlayerStatus.Idle, () => {
        setSpeaking(client.user.id, false);
        console.log('Player idle');
    });

    changeLatencyDisplay = setInterval(updateLatency, 10);
}

// Update the latency display
function updateLatency() {
    var latencyMs = 0;

    if (audioStartTime != null) {
        latencyMs = audioStartTime - recordingStartTime;
        clearInterval(changeLatencyDisplay);
    } else if (recordingStartTime != null) {
        latencyMs = Date.now() - recordingStartTime;
    }
    
    if (latencyMs < 1000) latency[0].firstChild.nodeValue = latencyMs + "ms";
    else latency[0].firstChild.nodeValue = (latencyMs / 1000).toFixed(2) + "s";
    latency.css("color", getColor(latencyMs, 0, ((latencyMs > 3000) ? latencyMs : 3000)));
}

// Get the color based on latency
function getColor(perc, min, max) {
	var base = (max - min);
    var r, g, b = 0;

	if (base == 0) { perc = 100; }
	else { perc = (max - perc - min) / base * 100; }

	if (perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}

	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}