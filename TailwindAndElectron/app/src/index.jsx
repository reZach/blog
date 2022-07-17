import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const container = document.getElementById("target");
const root = createRoot(container);

root.render(
    <React.Fragment>
        <div className="bg-red-200">Hello world</div>
    </React.Fragment>
);
