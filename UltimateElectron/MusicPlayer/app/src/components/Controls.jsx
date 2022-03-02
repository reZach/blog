import React from "react";

function Controls(props) {
    return (
        <div className="h-full grid grid-cols-1 grid-rows-2 justify-items-center">
            <div className="self-center grid grid-cols-3 gap-x-2">
                <button className="bg-blue-500 text-white rounded py-2 px-4">Previous</button>
                <button className="bg-blue-500 text-white rounded py-2 px-4" onClick={() => props.play()}>Play</button>
                <button className="bg-blue-500 text-white rounded py-2 px-4">Next</button>
            </div>
            <div className="self-center">
                Volume <input type="range" min="0" max="100" />
            </div>
        </div>
    );
}

export default Controls;
