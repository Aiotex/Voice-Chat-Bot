![image](https://user-images.githubusercontent.com/79638013/235369233-018b1e8b-f708-4d98-9ccc-a66235e981fd.png)


# Voice Chat Bot
This project is a control panel that enables you to use a Discord bot as a participant in voice chats. You can join voice chats and listen to conversations, as well as use your microphone.

## Requirements
- [node.js](https://nodejs.org/en/download/)
- [SoX](https://sourceforge.net/projects/sox/files/sox/14.4.2/) (Add it to your $PATH by typing `setx PATH "%PATH%;C:\Program Files (x86)\sox-14-4-2"
` in Command Prompt
- [node-gyp](https://github.com/nodejs/node-gyp)

## Getting Started
1. Clone the repository: `git clone https://github.com/Aiotex/discord-live-channel.git`
2. Click on the `run.bat` file
3. [Create a discord bot](https://discordpy.readthedocs.io/en/stable/discord.html) and paste the token in the input box


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
