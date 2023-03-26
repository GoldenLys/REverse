function DYNAMICS_ColorPalette() {
    const setProperty = (color, value) => {
        document.documentElement.style.setProperty(color, value);
        WP_UPDATE();
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
        $(`#range-${color}`).bind("input", function () {
            setProperty(`--EDITOR_${color.toUpperCase()}`, $(`#range-${color}`).val());
            APP.PICKER[index] = $(`#range-${color}`).val();
            WP_UPDATE();
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

const LOAD_THEME = function () {
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
    DYNAMICS_ColorPalette();
    WP_UPDATE();
};

const WP_UPDATE = function () {
    Game.Theme = `${APP.PICKER[0]} ${APP.PICKER[1]} ${APP.PICKER[2]}`;
    DEFINE_BODY_ATTRIBUTES();
    $(".button-validate").attr("style", "background-color: " + Game.Theme + ";");
    for (let COLOR in APP.PICKER) {
        $("#selector-" + APP.TYPES[COLOR] + " .value").html(APP.PICKER[COLOR]);
        $("#selector-" + APP.TYPES[COLOR] + " .value").css("margin-left", "calc(" + (APP.PICKER[COLOR] / 255) + " * (100% - 3em))");
    }
    $("#color-name").attr("placeholder", fullColorHex(APP.PICKER[0], APP.PICKER[1], APP.PICKER[2]));
};

// THEME FUNCTIONS

const ResetTheme = function (code) {
    if (code != 2) Game.Theme = "19 241 210";
    DEFINE_BODY_ATTRIBUTES();
    if (code == 1) save();
};

const rgbToHex = function (rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) hex = "0" + hex;
    if (hex == 0) hex = "00";
    return hex;
};

const fullColorHex = function (r, g, b) {
    let red = rgbToHex(r);
    let green = rgbToHex(g);
    let blue = rgbToHex(b);
    return red + green + blue;
};