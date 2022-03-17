const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
const MenuBuilder = require("./menu");
const path = require("path");
const isDevelopment = process.env.NODE_ENV === "development";
const { playSong } = require("../src/backend/musicplayer");

function createWindow() {
    // Create a new window
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    // Create a custom menu
    const menuBuilder = MenuBuilder();
    menuBuilder.buildMenu();

    // Event listeners to play music
    ipcMain.on("PLAYMUSIC", (IpcMainEvent, args) => {
        playSong(args.name, function(){
            window.webContents.send("PLAYMUSICRESPONSE");
        });
    });

    // Event listeners on the window
    window.webContents.on("did-finish-load", () => {
        window.show();
        window.focus();
    });

    // Load our HTML file
    if (isDevelopment) {
        window.loadURL("http://localhost:40992");
    } else {
        console.log("prod");
        window.loadFile("app/dist/index.html");
    }

    // Only do these things when in development
    if (isDevelopment) {

        // Errors are thrown if the dev tools are opened
        // before the DOM is ready
        window.webContents.once("dom-ready", () => {
            window.webContents.openDevTools();
        });
    }
}

// This method is called when Electron
// has finished initializing
app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});