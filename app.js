const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow, splash;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        autoHideMenuBar: true,
        
    });

    mainWindow.loadFile(path.join(__dirname, 'views/index.html'));

    splash = new BrowserWindow({ 
        width: 300, 
        height: 300, 
        transparent: true, 
        frame: false, 
        alwaysOnTop: true 
    });

    splash.loadFile(path.join(__dirname, 'views/splash.html'));
    splash.center();

    mainWindow.webContents.on('did-finish-load', function() {
        splash.destroy();
        mainWindow.center();
        mainWindow.show();
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});