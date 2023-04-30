

// Change mute button icon and stop audio recording
muteBtn.click(() => { 
    if(connection) {
        if(!muted) { record.stop(); } 
        else { streamMicAudio(); }
    }

    muted = !muted
    if(muted) {
        muteBtn.removeClass("mute-btn").addClass("unmute-btn")
        muteBtn.children('img').attr('src', '../public/assets/images/unmute.png');
        latency.addClass("hidden");
    } else {
        muteBtn.removeClass('unmute-btn').addClass('mute-btn')
        muteBtn.children('img').attr('src', '../public/assets/images/mute.png');
        latency.removeClass("hidden");
    } 

    console.log("Muted:", muted)
})

// Change deafen button icon
deafenBtn.click(() => { 
    deafened = !deafened
    if(deafened) {
        deafenBtn.removeClass("deafen-btn").addClass("undeafen-btn")
        deafenBtn.children('img').attr('src', '../public/assets/images/undeafen.png');
    } else {
        deafenBtn.removeClass('undeafen-btn').addClass('deafen-btn')
        deafenBtn.children('img').attr('src', '../public/assets/images/deafen.png');
    } 
    console.log("Deafened:", deafened)
})

disconnectBtn.click(() => { leaveCall(); })

aboutBtn.click(() => {
    leaveCall();
    voiceCallContent.hide();
})
