(function () {
    $("#range-red").bind('input', function () {
        document.documentElement.style.setProperty('--EDITOR_RED', $("#range-red").val());
        APP.PICKER[0] = $("#range-red").val();
        WP_UPDATE();
    });

    $("#range-green").bind('input', function () {
        document.documentElement.style.setProperty('--EDITOR_GREEN', $("#range-green").val());
        APP.PICKER[1] = $("#range-green").val();
        WP_UPDATE();
    });

    $("#range-blue").bind('input', function () {
        document.documentElement.style.setProperty('--EDITOR_BLUE', $("#range-blue").val());
        APP.PICKER[2] = $("#range-blue").val();
        WP_UPDATE();
    });

    $("#selector-red .button.minus").on("click", function () {
        WP_CHANGE(0, false);
    });

    $("#selector-red .button.plus").on("click", function () {
        WP_CHANGE(0, true);
    });

    $("#selector-green .button.minus").on("click", function () {
        WP_CHANGE(1, false);
    });

    $("#selector-green .button.plus").on("click", function () {
        WP_CHANGE(1, true);
    });

    $("#selector-blue .button.minus").on("click", function () {
        WP_CHANGE(2, false);
    });

    $("#selector-blue .button.plus").on("click", function () {
        WP_CHANGE(2, true);
    });

    $("#button-validate").on("click", function () {
        $("body").css("background-color", Game.Theme);
    });

    $(".hex-color #copy").on("click", function () {
        let SELECTED = document.createElement('textarea');
        SELECTED.value = "#" + $("#color-name").attr("placeholder");
        document.body.appendChild(SELECTED);
        SELECTED.select();
        document.execCommand('copy');
        document.body.removeChild(SELECTED);
        window.getSelection().removeAllRanges();
    });
})();

const WP_CHANGE = function (TYPE, PARAM) {
    if (!PARAM && APP.PICKER[TYPE] > 0) APP.PICKER[TYPE]--;
    else if (PARAM && APP.PICKER[TYPE] < 255) APP.PICKER[TYPE]++;
    $("#range-" + APP.TYPES[TYPE]).val(APP.PICKER[TYPE]);
    WP_UPDATE();
};

const WP_UPDATE = function () {
    Game.Theme = `${APP.PICKER[0]} ${APP.PICKER[1]} ${APP.PICKER[2]}`;
    $('body').attr("style", `--ALPHA: ${Game.Theme};`);
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
    $('body').attr("style", `--ALPHA: ${Game.Theme};`);
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
