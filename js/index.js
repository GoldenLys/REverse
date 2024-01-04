window.FUNCTIONS = {};

import * as MAIN from "./main.js";
FUNCTIONS.MAIN = MAIN;

import * as CONFIG from "./config.js";
import * as LANGUAGE from "./lang.js";

import * as CLOUD from "./cloud.js";
FUNCTIONS.CLOUD = CLOUD;

import * as COMBAT from "./combat.js";
FUNCTIONS.COMBAT = COMBAT;

import * as INVENTORY from "./inventory.js"; //TODO
FUNCTIONS.INVENTORY = INVENTORY;

import * as DIMENSION from "./dimension.js";
FUNCTIONS.DIMENSION = DIMENSION;

import * as MISSIONS from "./missions.js";
FUNCTIONS.MISSIONS = MISSIONS;

import * as EVENTS from "./events.js";
FUNCTIONS.EVENTS = EVENTS;

import * as APP from "./app.js";
FUNCTIONS.APP = APP;

import * as PALETTE from "./palette.js";
FUNCTIONS.PALETTE = PALETTE;

const loadCSS = function(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
};

$(document).ready(function () {
    const CSS_FILES = [
        "css/vars.css", "css/base.css",
        "css/style.css", "css/palette.css"
    ];
    CSS_FILES.forEach(file => {
        loadCSS(file);
    });
});

export default FUNCTIONS;
