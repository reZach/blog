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
    }
});