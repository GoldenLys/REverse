import FUNCTIONS from './index.js';

function LOAD_PALETTE_VIEW() {
    const setProperty = (color, value) => {
        document.documentElement.style.setProperty(color, value);
        UPDATE_PALETTE_VIEW();
    };

    const changeValue = (index, increase) => {
        const value = parseInt(APP.PICKER[index]);
        const newValue = increase ? value + 1 : value - 1;
        if (newValue >= 0 && newValue <= 255) {
            APP.PICKER[index] = newValue;
            setProperty(`--EDITOR_${color[index]}`, newValue);
        }
    };

    const color = ["RED", "GREEN", "BLUE"];

    ["red", "green", "blue"].forEach((color, index) => {
        $(`#range-${color}`).on("input", function () {
            setProperty(`--EDITOR_${color.toUpperCase()}`, $(`#range-${color}`).val());
            APP.PICKER[index] = $(`#range-${color}`).val();
            UPDATE_PALETTE_VIEW();
        });
    });

    ["red", "green", "blue"].forEach((color, index) => {
        $(`#selector-${color} .button.minus`).on("click", function () {
            changeValue(index, false);
        });

        $(`#selector-${color} .button.plus`).on("click", function () {
            changeValue(index, true);
        });
    });

    $("#button-validate").on("click", function () {
        $("body").css("background-color", Game.Theme);
    });

    $(".hex-color #copy").on("click", function () {
        let selected = document.createElement("textarea");
        selected.value = "#" + $("#color-name").attr("placeholder");
        document.body.appendChild(selected);
        selected.select();
        document.execCommand("copy");
        document.body.removeChild(selected);
        window.getSelection().removeAllRanges();
    });
}

export const LOAD_THEME = function () {
    let theme = Game.Theme.split(" ");
    $("#range-red").val(theme[0]);
    APP.PICKER[0] = $("#range-red").val();
    document.documentElement.style.setProperty('--EDITOR_RED', $("#range-red").val());
    $("#range-green").val(theme[1]);
    APP.PICKER[1] = $("#range-green").val();
    document.documentElement.style.setProperty('--EDITOR_GREEN', $("#range-green").val());
    $("#range-blue").val(theme[2]);
    APP.PICKER[2] = $("#range-blue").val();
    document.documentElement.style.setProperty('--EDITOR_BLUE', $("#range-blue").val());
    LOAD_PALETTE_VIEW();
    UPDATE_PALETTE_VIEW();
};

const UPDATE_PALETTE_VIEW = function () {
    Game.Theme = `${APP.PICKER[0]} ${APP.PICKER[1]} ${APP.PICKER[2]}`;
    FUNCTIONS.APP.DEFINE_BODY_ATTRIBUTES();
    $(".button-validate").attr("style", "background-color: " + Game.Theme + ";");
    for (let COLOR in APP.PICKER) {
        $("#selector-" + APP.TYPES[COLOR] + " .value").html(APP.PICKER[COLOR]);
        $("#selector-" + APP.TYPES[COLOR] + " .value").css("margin-left", "calc(" + (APP.PICKER[COLOR] / 255) + " * (100% - 3em))");
    }
    $("#color-name").attr("placeholder", fullColorHex(APP.PICKER[0], APP.PICKER[1], APP.PICKER[2]));
};

// THEME FUNCTIONS
export const RESET_THEME = function (code) {
    if (code != 2) Game.Theme = "19 241 210";
    FUNCTIONS.APP.DEFINE_BODY_ATTRIBUTES();
    if (code == 1) FUNCTIONS.MAIN.SAVE_DATA()
};

const rgbToHex = function (rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) hex = "0" + hex;
    if (hex === "0") hex = "00";
    return hex;
};

const fullColorHex = function (r, g, b) {
    let red = rgbToHex(r);
    let green = rgbToHex(g);
    let blue = rgbToHex(b);
    return red + green + blue;
};