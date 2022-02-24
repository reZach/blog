import React from "react";
import AlbumArt from "./AlbumArt/AlbumArt.jsx";
import SongList from "./SongList.jsx";
import Controls from "./Controls.jsx";

class Application extends React.Component {
    render() {
        return (
            <div className="h-full">
                <div className="h-4/5 grid grid-cols-12 grid-rows-1 gap-0">
                    <div className="col-span-3 bg-gray-300 border-black border-l-2 border-t-2">
                        {SongList()}
                    </div>
                    <div className="col-span-9 border-black border-l-2 border-t-2 border-r-2">
                        {AlbumArt(
                            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                        )}
                    </div>
                </div>
                <div className="h-1/5 bg-gray-400 border-black border-2">
                    {Controls()}
                </div>
            </div>
        );
    }
}

export default Application;
