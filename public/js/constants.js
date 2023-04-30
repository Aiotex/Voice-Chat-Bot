// Imports
const { entersState, joinVoiceChannel, getVoiceConnections, createAudioResource, createAudioPlayer, VoiceConnectionStatus, EndBehaviorType, NoSubscriberBehavior, AudioPlayerStatus} = require("@discordjs/voice");
const { OpusEncoder } = require("@discordjs/opus");
const record = require('node-mic-record');
const AudioMixer = require('audio-mixer');
const Speaker = require("speaker");
const fs = require('fs')
const colorThief = new ColorThief();

// Variables
const voiceChannelIcon = `<img class="icon voice-channel-icon" src="../public/assets/images/voicechannel.png">`;

const aboutBtn = $('#about-btn');

const guilds = $('.guilds-container');
const guildName = $('#guild-name');
const channels = $('.channels-container');

const voiceCallContent = $('.voice-call-content');
const channelName = $('#voice-channel-name');
const participants = $('.participants');
const disconnectBtn = $('#disconnect-btn');
const muteBtn = $('#mute-btn');
const deafenBtn = $('#deafen-btn');
const noConnectionMsg = $('.no-connection-msg');

// Sound
const joinSoundEffect = new Audio('../public/assets/sounds/join.wav');
const leaveSoundEffect = new Audio('../public/assets/sounds/leave.wav');

// Voice call
const latency = $('#latency');
let connection;
let voiceChannel;
let muted = true;
let deafened = false;


