import React from "react";
import AlbumArt from "./AlbumArt/AlbumArt.jsx";
import SongList from "./SongList.jsx";

class Application extends React.Component {
    render() {
        return (
            <div className="h-full">
                <div className="h-4/5 grid grid-cols-12 grid-rows-1 gap-0">
                    <div className="col-span-3">{SongList()}</div>
                    <div className="col-span-9">
                        {AlbumArt(
                            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                        )}
                    </div>
                </div>
                <div className="h-1/5 bg-red-400">{/* render controls */}</div>
            </div>
        );
    }
}

export default Application;
