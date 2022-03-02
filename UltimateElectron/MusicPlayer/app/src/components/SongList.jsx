import React from "react";

function SongList(props) {
  return (
    <ol>
      {props.songs.map((song) => <li className={props.selected === song ? "bg-blue-300" : ""} onClick={() => props.selectSong(song)}>{song}</li>)}
    </ol>
  );
}

export default SongList;
