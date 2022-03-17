const { Menu } = require("electron");

const MenuBuilder = function(){

    const menuTemplate = [
        {
            label: "Play",
            click: function(menuItem, browserWindow, event){
                browserWindow.webContents.send("MENUPLAYMUSIC");
            }
        },
        {
            label: "Previous",
            click: function(menuItem, browserWindow, event){
                browserWindow.webContents.send("MENUPREVIOUSSONG");
            }
        },
        {
            label: "Next",
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