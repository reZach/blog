import React from "react";

function SongList(props) {
  return (
    <ol>
      {props.map((song) => <li>{song}</li>)}
    </ol>
  );
}

export default SongList;
