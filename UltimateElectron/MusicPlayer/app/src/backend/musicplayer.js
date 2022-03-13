const { exec } = require("child_process");

module.exports = {
    playSong: function(name, callback){

        // Mac
        if (process.platform === "darwin"){
            exec(`afplay \"C:\\Users\\zachary\\source\\repos\\blog\\UltimateElectron\\MusicPlayer\\songs\\${name}.wav\"`, (error, stdout, stderr) => {
                callback()
            });
        } else {
            // Windows            
            exec(`$PlayWav=New-Object System.Media.SoundPlayer; $PlayWav.SoundLocation='C:\\Users\\zachary\\source\\repos\\blog\\UltimateElectron\\MusicPlayer\\songs\\${name}.wav'; $PlayWav.playsync();`, {
                "shell": "powershell.exe"
            }, (error, stdout, stderr) => {
                callback();
            });
        }
    }
}