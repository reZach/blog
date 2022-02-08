import React from "react";

import "./AlbumArt.css";

function AlbumArt(props) {
  return (
    <div className="container">
      <img src={props} />
    </div>
  );
}

export default AlbumArt;
