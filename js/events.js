import FUNCTIONS from './index.js';

export function DYNAMICS() {
    $("#RESET_THEME").on("click", function () {
        FUNCTIONS.PALETTE.RESET_THEME(1);
    });

    $("#attack-btn").on("click", function () {
        FUNCTIONS.COMBAT.MAIN_ATTACK();
        APP.MIND_CONTROL[1] = 0;
    });

    $("#special-btn").on("click", function () {
        FUNCTIONS.COMBAT.SPECIAL_ATTACK();
        APP.MIND_CONTROL[1] = 0;
    });

    $("#cover-btn").on("click", function () {
        FUNCTIONS.COMBAT.TAKE_COVER();
        APP.MIND_CONTROL[1] = 0;
    });

    $("#run-btn").on("click", function () {
        FUNCTIONS.COMBAT.RUN_AWAY();
        APP.MIND_CONTROL[1] = 0;
    });

    $("#WelcomeNext").on("click", function () {
        FUNCTIONS.MAIN.WelcomeNext();
    });

    $("#WelcomePrevious").on("click", function () {
        FUNCTIONS.MAIN.ChangeStep(0);
    });

    $("#WTBTN").on("click", function () {
        FUNCTIONS.DIMENSION.ChangeWT();
    });

    $("#CheckCode").on("click", function () {
        CheckCode();
    });

    $("#TOP10").on("click", function () {
        FUNCTIONS.CLOUD.TOP("10");
    });

    $("#TOPNEXT").on("click", function () {
        FUNCTIONS.CLOUD.TOP("NEXT");
    });

    $("#TOPPREVIOUS").on("click", function () {
        FUNCTIONS.CLOUD.TOP("PREVIOUS");
    });

    $("#AVATAR_NEXT").on("click", function () {
        FUNCTIONS.MAIN.CHANGE_AVATAR(1);
    });

    $("#AVATAR_PREVIOUS").on("click", function () {
        FUNCTIONS.MAIN.CHANGE_AVATAR(0);
    });

    $("#AVATAR_NEXT_BEGIN").on("click", function () {
        FUNCTIONS.MAIN.CHANGE_AVATAR(1);
    });

    $("#AVATAR_PREVIOUS_BEGIN").on("click", function () {
        FUNCTIONS.MAIN.CHANGE_AVATAR(0);
    });

    $("#ChooseWarrior").on("click", function () {
        APP.WelcomeData[2] = "Warrior";
        $("#warrior").attr("class", "pw message selected");
        $("#paladin").attr("class", "pw message");
        $("#ninja").attr("class", "pw message");
    });

    $("#ChoosePaladin").on("click", function () {
        APP.WelcomeData[2] = "Paladin";
        $("#warrior").attr("class", "pw message");
        $("#paladin").attr("class", "pw message selected");
        $("#ninja").attr("class", "pw message");
    });

    $("#ChooseNinja").on("click", function () {
        APP.WelcomeData[2] = "Ninja";
        $("#warrior").attr("class", "pw message");
        $("#paladin").attr("class", "pw message");
        $("#ninja").attr("class", "pw message selected");
    });

    $("#WB-BTN").on("click", function () {
        FUNCTIONS.MAIN.CLOSE_MENUS();
        $("#DIV-COMBAT").show();
        $(".BUTTONS_ACTIONS").show();
        $("#LOGIN-NOTICE").attr("class", "popup");
        $("#wb-title").html("");
        $("#wb-text").html("");
        APP.Email = "DoNotLogin";
        FUNCTIONS.APP.UpdateGame();
    });

    $("#LOGIN-BTN").on("click", function () {
        $("#LOGIN-NOTICE").attr("class", "popup");
        $("#wb-title").html("");
        $("#wb-text").html("");
        FUNCTIONS.CLOUD.login();
    });

    $("#UPGRADE_0").on("click", function () {
        FUNCTIONS.DIMENSION.DIMENSIONAL_UPGRADE(0);
    });

    $("#UPGRADE_1").on("click", function () {
        FUNCTIONS.DIMENSION.DIMENSIONAL_UPGRADE(1);
    });

    $("#UPGRADE_2").on("click", function () {
        FUNCTIONS.DIMENSION.DIMENSIONAL_UPGRADE(2);
    });

    $("#UPGRADE_3").on("click", function () {
        FUNCTIONS.DIMENSION.DIMENSIONAL_UPGRADE(3);
    });

    $("#reset-btn").on("click", function () {
        FUNCTIONS.MAIN.Reset();
    });

    $("#Reload").on("click", function () {
        location.reload();
    });

    $("#export-btn").on("click", function () {
        FUNCTIONS.MAIN.exportSave();
    });

    $("#import-btn").on("click", function () {
        FUNCTIONS.MAIN.importSave();
    });

    $("#missions").on("click", function () {
        $("#missions").attr("class", "pw button active");
        $("#exploration").attr("class", "pw button");
        $("#guild").attr("class", "pw button");
        FUNCTIONS.MISSIONS.GENERATE_MISSION_VIEW();
        FUNCTIONS.MAIN.SelectTAB("MISSIONS");
    });

    $("#exploration").on("click", function () {
        $("#missions").attr("class", "pw button");
        $("#exploration").attr("class", "pw button active");
        $("#guild").attr("class", "pw button");
        FUNCTIONS.MAIN.GenExplorationMenu();
        FUNCTIONS.MAIN.SelectTAB("EXPLORE");
    });

    $("#guild").on("click", function () {
        $("#missions").attr("class", "pw button");
        $("#exploration").attr("class", "pw button");
        $("#guild").attr("class", "pw button active");
        FUNCTIONS.MAIN.GenGuildMenu();
        FUNCTIONS.MAIN.SelectTAB("GUILD");
    });

    $(".link").bind("click", function (e) {
        e.preventDefault();
        FUNCTIONS.MAIN.OpenLink($(this).attr("data-url"));
    });

    $("#helpscore").bind("click", function (e) {
        FUNCTIONS.MAIN.POPUP("Score Tutorial", "1) Score is calculated by averaging the score of your equipped items (weapons and armor).<br>Picking the equipment with the highest score will allow faster progression through Dimensions even if your damage and life are slightly lower.<br><br>2) Your current score dictates the score of newly dropped loot.<br><br>3) Your score is limited by your current Dimension and (if applicable) your equipped relics. You can view your maximum score in Statistics.");
    });

    $(".menu .link-container").bind("click", function (e) {
        e.preventDefault();
        let TOGGLE = $(this).hasClass("active") ? "" : "active";
        FUNCTIONS.MAIN.CLOSE_MENUS();
        $('.link-container.active').each(function () {
            $(this).attr("class", "link-container");
        });
        if ($(this).data("menu") != "#") {
            $(this).attr("class", "link-container " + TOGGLE);
            FUNCTIONS.MAIN.OPEN_MENU($(this).data("menu"), TOGGLE);
            if ($(this).data("menu") == "INVENTORY") FUNCTIONS.INVENTORY.GenInventory();
        }
    });

    $(`.pw.button[data-link="return_to_game"]`).bind("click", function (e) {
        FUNCTIONS.MAIN.CLOSE_MENUS();
    })

    $(".pw.dropdown .name").bind("click", function (e) {
        e.preventDefault();
        let TOGGLE = $(this).parent().attr("data-open") === "open" ? "closed" : "open";
        $(this).parent().attr("data-open", TOGGLE);
    });

    $(".pw.checkbox").bind("click", function (e) {
        e.preventDefault();
        let TOGGLE = $(this).attr("data-check") === "checked" ? "unchecked" : "checked";
        let CONFIG = $(this).attr("data-check") === "checked" ? 0 : 1;
        Game.config[$(this).attr("data-id")] = CONFIG;
        $(this).attr("data-check", TOGGLE);
        if ($(this).attr("data-id") == 4) FUNCTIONS.CLOUD.READ_DATABASE();
        if (_.inRange($(this).attr("data-id"), 5, 11)) {
            Game.AutoRemove[$(this).attr("data-id") - 5] = CONFIG;
            FUNCTIONS.APP.UpdateUI();
        }
        if ($(this).attr("data-id") == 11) Game.config[5] = CONFIG;
        APP.MIND_CONTROL[1] = 0;
    });

    $("#ShowAllRewards").on("click", function () {
        Game.config[2] = 0;
        FUNCTIONS.APP.UpdateUI();
    });

    $("#SkipAllRewards").on("click", function () {
        Game.config[2] = 1;
        FUNCTIONS.APP.UpdateUI();
    });

    $("#SkipNoItemsRewards").on("click", function () {
        Game.config[2] = 2;
        FUNCTIONS.APP.UpdateUI();
    });

    $("#LanguageSelector_French").on("click", function () {
        Game.Language = "fr-FR";
        FUNCTIONS.MAIN.SELECT_LANGUAGE();
        FUNCTIONS.APP.UpdateUI();
    });

    $("#LanguageSelector_English").on("click", function () {
        Game.Language = "en-US";
        FUNCTIONS.MAIN.SELECT_LANGUAGE();
        FUNCTIONS.APP.UpdateUI();
    });
}

export function CheckCode(debug) {
    const code = $("#promocode").val();
    if (code != null) {
        if (code === GLOBALS.CODES[1]) {
            $("#codereturn").html("Code Accepted, name change.");
            FUNCTIONS.CLOUD.RESET_USERNAME(Game.username);
        } else if (code === GLOBALS.CODES[2]) {
            $("#codereturn").html("Code Accepted, raising all Armor slots by 1.");
            for (var UPC = 0; UPC < 4; UPC++) {
                Game.MaxUPC[UPC]++;
            }
        } else if (code === GLOBALS.CODES[3]) {
            $("#codereturn").html("Code Accepted, you are now at max level.");
            Game.Level = APP.MaxLevel;
        } else if (code === GLOBALS.CODES[4]) {
            $("#codereturn").html("Code Accepted, you just advanced to </i> <i class='globe icon'></i>" + (Game.Dimension + 1));
            Game.Level = APP.MaxLevel;
            Game.Armors[1][4] = APP.MaxScore;
            Game.Armors[2][4] = APP.MaxScore;
            Game.Armors[3][4] = APP.MaxScore;
            Game.Armors[4][4] = APP.MaxScore;
            Game.Weapons.Main[3] = APP.MaxScore;
            Game.Weapons.Special[3] = APP.MaxScore;
            FUNCTIONS.DIMENSION.ChangeWT();
        } else if (code === GLOBALS.CODES[5]) {
            if (Game.Dimension > 1) {
                $("#codereturn").html("Code Accepted, you just lowered to <i class='globe icon'></i> " + (Game.Dimension - 1));
                Game.Dimension--;
            } else invalidCode(3);
        } else if (code === GLOBALS.CODES[6]) {
            $("#codereturn").html("Code Accepted, cloud save done.");
            FUNCTIONS.CLOUD.SEND_DATA_TO_CLOUD();
            APP.lastCloudSave = 0;
        } else if (code === GLOBALS.CODES[7]) {
            $("#codereturn").html("Code Accepted, Finished the story.");
            Game.Level = APP.MaxLevel;
            Game.Armors[1][4] = APP.MaxScore;
            Game.Armors[2][4] = APP.MaxScore;
            Game.Armors[3][4] = APP.MaxScore;
            Game.Armors[4][4] = APP.MaxScore;
            Game.Weapons.Main[3] = APP.MaxScore;
            Game.Weapons.Special[3] = APP.MaxScore;
            Game.MissionStarted = [false, 0, 0, 0];
            for (var MISSION in GLOBALS.MISSIONS.LIST) {
                Game.MissionsCompleted[MISSION] = 1;
            }
        } else if (code === GLOBALS.CODES[10]) {
            $("#codereturn").html("Code Accepted, Reset save.");
            Game.username = "Default";
            Backup = "Default";
            FUNCTIONS.MAIN.SAVE_DATA()
            FUNCTIONS.MAIN.confirmReset();
        } else {
            if (debug != 1) CheckCode(1);
            invalidCode(1);
        }
    } else invalidCode(2);
    FUNCTIONS.APP.UpdateGame();
}

export function invalidCode(error) {
    $("#codereturn").html("Invalid code ! (error " + error + ")");
}