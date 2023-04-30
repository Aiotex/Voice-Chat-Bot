# discord-live-channel
This is a discord bot panel that allows you to use a bot like a normal user in a voice chat. you can use the bot panel to join any voice chat in any server the bot is in and hear and speak to people.

## Requirements
- [node.js](https://nodejs.org/en/download/)
- [SoX](https://sourceforge.net/projects/sox/files/latest/download) (make sure you add SoX to your $PATH)
- [node-gyp](https://github.com/nodejs/node-gyp)

## Getting Started
1. Open the command line prompt and clone the repository: `git clone https://github.com/Aiotex/discord-live-channel.git`
2. run `npm i`
3. run `npm start`
4. [Create a discord bot](https://discordpy.readthedocs.io/en/stable/discord.html) and paste the token in the input nox


## Common Errors

- Uncaught Error: Cannot find module

If you get this error in the console: `Uncaught Error: Cannot find module '(your current directory)\discord-live-channel\node_modules\@discordjs\opus\prebuild\electron-v22.0-napi-v3-win32-x64-unknown-unknown\opus.node'`

navigate to that folder and change its name from "node-v93-napi-v3-win32-x64-unknown-unknown" to "electron-v22.0-napi-v3-win32-x64-unknown-unknown", or whatever folder name you got in the error.

- Uncaught Error: spawn sox ENOENT

If you get this error in the console: `uncaught Error: spawn sox ENOENT`

This means you didn't add SoX to your $PATH. You can check by opening the command line prompt and typing `sox`, if the output is `'sox' is not recognized as an internal or external command` then you didn't add it to the path correctly.

- No sound playing in the VC while speaking

if you are speaking but there isn't any audio playing in discord, try to set your microphone as the default input device in the settings. 
For windows, Got to `Settings < System < Sound`, and change the input device to the one you currently use.
