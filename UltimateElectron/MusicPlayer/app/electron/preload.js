const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    musicplayer: function(){
        return {
            play: function(name){
                ipcRenderer.send("PLAYMUSIC", {
                    name
                });
            }
        };
    },
    menuControls: function(){
        return {
            onPlay: function(func){
                ipcRenderer.on("MENUPLAYMUSIC", (event, ...args) => {

                    // In order that we only create one .on("MENUPLAYMUSIC") listener,
                    // and still allow _any_ song to be played, we have to pass in 
                    // a function to resolve the name of the song
                    ipcRenderer.send("PLAYMUSIC", {
                        name: func()
                    });
                });
            },
            onPrevious: function(func){
                ipcRenderer.on("MENUPREVIOUSSONG", (event, ...args) => {
                    func();
                });
            },
            onNext: function(func){
                ipcRenderer.on("MENUNEXTSONG", (event, ...args) => {
                    func();
                });
            },
            clearBindings: function(){
                ipcRenderer.removeAllListeners("MENUPLAYMUSIC");
                ipcRenderer.removeAllListeners("MENUPREVIOUSSONG");
                ipcRenderer.removeAllListeners("MENUNEXTSONG");
            }
        }
    }
});