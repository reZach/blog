import React from "react";
import AlbumArt from "./AlbumArt.jsx";
import SongList from "./SongList.jsx";
import Controls from "./Controls.jsx";

class Application extends React.Component {
    constructor(){
        super();

        this.state = {
            selectedSong: "",
            selectedAlbumArt: "",
            songs: [
                "song1",
                "song2",
                "song3"
            ],
            albumArt: [
                "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                "https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_152x152.png",
                "https://github.githubassets.com/favicons/favicon.svg"
            ]
        };

        this.setSelectedSong = this.setSelectedSong.bind(this);
        this.play = this.play.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    setSelectedSong(song){
        this.setState(() => ({
            selectedSong: song,
            selectedAlbumArt: this.state.albumArt[this.state.songs.indexOf(song)]
        }));
    }

    play(){
        // Call the function defined in the preload file
        window.api.musicplayer().play(this.state.selectedSong);        
    }

    previous(){
        if (this.state.selectedSong !== ""){
            let index = this.state.songs.indexOf(this.state.selectedSong);

            if (index > 0){
                index--;
            }
            this.setSelectedSong(this.state.songs[index]);
        }
    }

    next(){
        if (this.state.selectedSong !== ""){
            let index = this.state.songs.indexOf(this.state.selectedSong);

            if (index < this.state.songs.length - 1){
                index++;
            }
            this.setSelectedSong(this.state.songs[index]);
        }
    }

    render() {
        return (
            <div className="h-full">
                <div className="h-4/5 grid grid-cols-12 grid-rows-1 gap-0">
                    <div className="col-span-3 bg-gray-300 border-black border-l-2 border-t-2">
                        {SongList({ 
                            songs: this.state.songs,
                            selected: this.state.selectedSong,
                            selectSong: this.setSelectedSong
                        })}
                    </div>
                    <div className="col-span-9 border-black border-l-2 border-t-2 border-r-2">
                        {AlbumArt(this.state.selectedAlbumArt)}
                    </div>
                </div>
                <div className="h-1/5 bg-gray-400 border-black border-2">
                    {Controls({
                        play: this.play,
                        previous: this.previous,
                        next: this.next
                    })}
                </div>
            </div>
        );
    }
}

export default Application;
