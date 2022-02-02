const path = require("path");

module.exports = {
    entry: "./app/src/index.jsx",
    output: {
        path: path.resolve(__dirname, "app/dist"), 
        filename: "bundle.js"
    },
};