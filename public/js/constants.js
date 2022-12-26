
const voiceChannelIcon = `<img class="icon voicechannel-icon" src="../public/assets/images/voicechannel.png">`;

const aboutBtn = $('#about-btn')

const guilds = $('.guilds-container');
const guildName = $('#guild-name');
const channels = $('.channels-container');

const voiceCall = $('.voice-call');
const channelName = $('#voice-channel-name');
const participants = $('.participants');
const disconnectBtn = $('.disconnect-btn');
const noConnection = $('.no-connection');

const joinSoundEffect = new Audio('../public/assets/sounds/join.wav');
const leaveSoundEffect = new Audio('../public/assets/sounds/leave.wav');

let connection;
let voiceChannel;


