import React from "react";
import AlbumArt from "./AlbumArt.jsx";
import SongList from "./SongList.jsx";

class Application extends React.Component {

    render(){
        return (
            <div>
                {SongList()}
                {AlbumArt("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png")}
            </div>
        );
    }
}

export default Application;