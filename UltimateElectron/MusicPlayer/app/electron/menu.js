const { Menu } = require("electron");

const MenuBuilder = function(){

    const menuTemplate = [
        {
            label: "&Play",
            accelerator: "CmdOrCtrl+Space",
            click: function(menuItem, browserWindow, event){
                browserWindow.webContents.send("MENUPLAYMUSIC");
            }
        },
        {
            label: "Previous",
            accelerator: "CmdOrCtrl+Left",
            click: function(menuItem, browserWindow, event){
                browserWindow.webContents.send("MENUPREVIOUSSONG");
            }
        },
        {
            label: "Next",
            accelerator: "CmdOrCtrl+Right",
            click: function(menuItem, browserWindow, event){
                browserWindow.webContents.send("MENUNEXTSONG");
            }
        }
    ];

    return {
        buildMenu: function(){
            const menu = Menu.buildFromTemplate(menuTemplate);
            Menu.setApplicationMenu(menu);
        }
    };
};

module.exports = MenuBuilder;