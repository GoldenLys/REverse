import FUNCTIONS from './index.js';

// SAVE AND LOAD FUNCTIONS
export function SAVE_DATA() {
    localStorage.setItem("REverse", JSON.stringify(Game));
    localStorage.setItem("REverse-Backup", JSON.stringify(Game.username));
}

export function LOAD_SAVE() {
    let savegame = JSON.parse(localStorage.getItem("REverse"));
    for (var property in savegame) {
        if (typeof savegame[property] !== "undefined") Game[property] = savegame[property];
    }
    // LOAD BACKUP
    let Backup = JSON.parse(localStorage.getItem("REverse-Backup"));
    Game.username = Backup
}

export function exportSave() {
    window.getSelection().removeAllRanges();
    NOTICE("Save exported", "Your save is now copied in your clipboard.");
    $("#exportBody").html("<textarea id='saveCode'>" + btoa(JSON.stringify(Game)) + "</textarea>");
    var textField = document.getElementById("saveCode");
    textField.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    $("#exportBody").html("");
}

export function importSave() {
    var save = prompt("Paste your save code here");
    if (save) {
        restoreSave(save);
        NOTICE("Save imported", "Your save has been imported.");
        FUNCTIONS.MISSIONS.GENERATE_MISSION_VIEW();
        FUNCTIONS.APP.UpdateUI();
        Game.isInFight = false;
    }
}

export function restoreSave(save) {
    try {
        var decoded = atob(save);
        JSON.parse(decoded);
        if (decoded) {
            localStorage.setItem("REverse", decoded);
            LOAD_SAVE();
        } else $("#codereturn").html("ERROR: Invalid Save Data");
    } catch (err) {
        $("#codereturn").html("ERROR: Invalid Save Data");
    }
}

export function Reset() {
    FUNCTIONS.MAIN.POPUP("Confirm", `Do you really want to reset all your stats ?`, 5);
}

export function confirmReset() {
    localStorage.clear();
    location.reload();
}

// MISC FUNCTIONS
export function FORMAT_NUMBER(x, type) {
    let VALUE;

    if (type == 0) VALUE = numeral(x).format("0");
    if (type == 1) VALUE = numeral(x).format("0,0");
    if (type == 2) VALUE = numeral(x).format("0%");
    if (type == 3) {
        VALUE = numeral(x).format("0.0%");
        VALUE = VALUE.endsWith('.0%') ? VALUE.slice(0, -3) + "%" : VALUE;
    }
    if (type == 4) VALUE = numeral(x).format("0.0a");
    if (type == 5) {
        if (x != Math.round(x)) VALUE = numeral(x).format("0,0.0");
        else VALUE = numeral(x).format("0,0");
    }
    if (type == "auto") {
        if (x <= 1000) VALUE = numeral(x).format("0a");
        if (x > 1000) VALUE = numeral(x).format("0.0a");
        if (x > 10000) VALUE = numeral(x).format("0.00a");
    }
    if (type == "auto-round") {
        if (x != Math.round(x)) VALUE = numeral(x).format("0.0a");
        else VALUE = numeral(x).format("0a");
    }
    return VALUE;
}

export const toHHMMSS = function (seconds) {
    seconds = parseInt(seconds, 10);
    let CONFIG = {
        texts: [" " + language[APP.LANG].MISC.Hour, " " + language[APP.LANG].MISC.Minute, " " + language[APP.LANG].MISC.Second],
        time: [Math.floor(seconds / 3600), Math.floor((seconds - (Math.floor(seconds / 3600) * 3600)) / 60), seconds - (Math.floor(seconds / 3600) * 3600) - (Math.floor((seconds - (Math.floor(seconds / 3600) * 3600)) / 60) * 60)]
    };
    for (let TYPE in CONFIG.time) {
        CONFIG.texts[TYPE] = CONFIG.time[TYPE] === 1 ? CONFIG.time[TYPE] + CONFIG.texts[TYPE] : CONFIG.time[TYPE] + CONFIG.texts[TYPE] + "s";
        if (CONFIG.time[TYPE] === 0 && TYPE != 2) CONFIG.texts[TYPE] = ``;
    }
    return `${CONFIG.texts[0]} ${CONFIG.texts[1]} ${CONFIG.texts[2]}`;
};

// UI FUNCTIONS
export const OPEN_MENU = function (MENU, STATUS) {
    if (STATUS === "active") {
        $("#DIV-" + MENU).show();
        $("#DIV-COMBAT").hide();
        $(".BUTTONS_ACTIONS").hide();
    } else {
        $("#DIV-" + MENU).hide();
        $("#DIV-COMBAT").show();
        $(".BUTTONS_ACTIONS").show();
    }
    FUNCTIONS.CLOUD.TOP("10");
    FUNCTIONS.APP.UPDATE_STATS();
    FUNCTIONS.APP.UpdateGame();
};

export const CLOSE_MENUS = function () {
    let MENUS = ["INVENTORY", "PRESTIGE", "STATS", "LEADERBOARD", "SETTINGS", "CREDITS", "STORY"];
    $('.link-container.active').each(function () {
        $(this).attr("class", "link-container");
    });
    for (let M in MENUS) {
        $("#DIV-" + MENUS[M]).hide();
    }
    $("#GAME").removeClass("story");
    $("#DIV-COMBAT").show();
    $(".BUTTONS_ACTIONS").show();
    $("#BACKGROUND").attr("style", `background: center / cover no-repeat url("https://purplewizard.space/REverse/images/Locations/${GLOBALS.LOCATIONS[Game.Location][6]}");`);
};

export function SelectTAB(TAB) {
    let TABS = [
        ["EXPLORE", "exploration"],
        ["MISSIONS", "missions"],
        ["GUILD", "guild"]
    ];
    for (let T in TABS) {
        if (TABS[T][0] != TAB) {
            $("#DIV-" + TABS[T][0]).hide();
            $("#" + TABS[T][1]).removeClass("active");
        } else {
            $("#DIV-" + TABS[T][0]).show();
            $("#" + TABS[T][1]).addClass("active");
        }
    }
}

export function GetEnemyHPPercent() {
    let value = (100 / Game.Enemy[4]) * Game.Enemy[5];
    if (value <= 0) value = 0;
    if (value > 100) value = 100;
    return value;
}

export function GetPlayerHPPercent() {
    let value = (100 / APP.CoreBaseLife) * APP.CoreLife;
    if (value <= 0) value = 0;
    if (value > 100) value = 100;
    return value;
}

export function GetEXPPercent() {
    let value = (100 * (Game.xp[0] - FUNCTIONS.MAIN.CalcEXP(Game.Level - 1))) / (FUNCTIONS.MAIN.CalcEXP(Game.Level) - FUNCTIONS.MAIN.CalcEXP(Game.Level - 1));
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    if (value > 99 && Game.xp[0] < Game.xp[1]) value = 99;
    return value;
}

// GAME FUNCTIONS
export const CHANGE_AVATAR = function (TYPE) {
    if (TYPE == 0) {
        if (Game.Avatar <= 1) Game.Avatar = 65;
        else Game.Avatar--;
    } else {
        if (Game.Avatar == 0 || Game.Avatar >= 65) Game.Avatar = 1;
        else Game.Avatar++;
    }
    $("#avatar").attr("src", `images/avatars/avatar (${Game.Avatar}).png`);
    $("#avatar2").attr("src", `images/avatars/avatar (${Game.Avatar}).png`);
};

export function GenExplorationMenu() {
    $("#DIV-EXPLORE").html("");
    let QUALITIES = ["Normal", "Common", "Uncommon", "Rare", "Epic", "Exotic", "Legendary"];
    for (var E in GLOBALS.LOCATIONS) {
        let QUALITY = APP.ScoreModeEnabled == 0 ? QUALITIES[GLOBALS.LOCATIONS[E][3]] : "Legendary";
        var MINLEVEL = Game.Level >= GLOBALS.LOCATIONS[E][1] ? "pw green" : "pw red";
        var MAXLEVEL = Game.Level >= GLOBALS.LOCATIONS[E][2] ? "pw green" : "pw yellow";
        let LEVEL = APP.ScoreModeEnabled == 0 ? `<span class="${MINLEVEL}">${GLOBALS.LOCATIONS[E][1]} </span>-<span class="${MAXLEVEL}"> ${GLOBALS.LOCATIONS[E][2]}</span>` : "<span class='pw green'>" + APP.MaxLevel + "</span>";
        var UNLOCKED = Game.Level >= GLOBALS.LOCATIONS[E][1] ? "pw green" : "pw red";
        if (Game.MissionsCompleted[GLOBALS.LOCATIONS[E][4]] == 0) UNLOCKED = "pw red bold";
        let UNLOCKTEXT = Game.MissionsCompleted[GLOBALS.LOCATIONS[E][4]] == 1 ? "<span class='pw green'>" + GLOBALS.MISSIONS.LIST[GLOBALS.LOCATIONS[E][4]].NAME + " - " + language[APP.LANG].STATUS.Complete + "</span>" : "<span class='pw red'>" + GLOBALS.MISSIONS.LIST[GLOBALS.LOCATIONS[E][4]].NAME + " - " + language[APP.LANG].STATUS.Incomplete + "</span>";
        if (Game.MissionsCompleted[GLOBALS.LOCATIONS[E][4]] == 0 && !Game.MissionStarted[0]) UNLOCKTEXT = "<span class='pw red'>" + GLOBALS.MISSIONS.LIST[GLOBALS.LOCATIONS[E][4]].NAME + " - " + language[APP.LANG].STATUS.NotStarted + "</span>";
        let BTN = Game.MissionsCompleted[GLOBALS.LOCATIONS[E][4]] == 1 ? "<div class='pw fluid darkgrey button' onclick='FUNCTIONS.MAIN.GO_EXPLORE(" + E + ");' >" + language[APP.LANG].ACTIONS.Travel + " <i class='" + UNLOCKED + " fal fa-arrow-right'></i></div>" : "";
        if (Game.MissionStarted[0] || Game.Location == E) BTN = "";
        let LOCATION_COLOR = Game.Location != E ? "pw segment margin dark" : "pw segment margin active";
        if (GLOBALS.LOCATIONS[E][1] < Game.Level + 1 && E != 11 && E != 17) {
            $("#DIV-EXPLORE").append(`<div class='text-center ${LOCATION_COLOR}'>
            <h3>${GLOBALS.LOCATIONS[E][0]}<span class='pw white'> - ${language[APP.LANG].MISC.Lv} ${LEVEL}</span>
            <div class="pw subtitle"><i class='far fa-dot-circle'></i> ${UNLOCKTEXT}</div></h3>
            <div class="pw inline label"><i class='fas fa-sack icon'></i> <span class='${QUALITY}'>${language[APP.LANG].QUALITIES[QUALITY]}</span></div>
            ${BTN}</div>`);
        }
    }
}

export function GenGuildMenu() {
    $("#DIV-EXPLORE").html("");
    let QUALITIES = ["Normal", "Common", "Uncommon", "Rare", "Epic", "Exotic", "Legendary"];
    // WORK IN PROGRESS
}

export function hideRewards() {
    FUNCTIONS.APP.UpdateGame();
    FUNCTIONS.MISSIONS.END_MISSION();
}

export function GO_EXPLORE(loc) {
    if (GLOBALS.LOCATIONS[loc][1] <= Game.Level && !Game.MissionStarted[0] && Game.MissionsCompleted[GLOBALS.LOCATIONS[loc][4]] == 1) {
        Game.Location = loc;
        Game.isInFight = false;
        Game.LastEscape = 30;
        $("#BACKGROUND").attr("style", `background: center / cover no-repeat url("https://purplewizard.space/REverse/images/Locations/${GLOBALS.LOCATIONS[Game.Location][6]}");`);
        GenExplorationMenu();
        FUNCTIONS.APP.UpdateGame();
    }
}

export const CalcEXP = function (LEVEL) {
    const BASE_EXP = 100;
    let expFactor = 1.5 - (0.001 * LEVEL); // Decreases as the level increases
    let requiredExp = BASE_EXP * Math.pow(LEVEL, expFactor);
    return Math.round(requiredExp);
};

export const CURRENT_MAX_ITEM_LEVEL = function () {
    if (Game.MissionStarted[0] && Game.Level < APP.MaxLevel) return GLOBALS.LOCATIONS[Game.Location][2];
    else if (APP.ScoreModeEnabled) return APP.MaxScore; 
    else return APP.MaxLevel;
};

export function ChangeStep(type) {
    // 0 = BACK & 1 = NEXT
    if (type == 0 && APP.WelcomeData[0] > 1) APP.WelcomeData[0]--;
    if (type == 1) APP.WelcomeData[0]++;
    for (var L = 1; L < 6; L++) {
        $("#step" + L).attr("class", "step");
        $("#tutorial-" + L).hide();
    }
    for (var L2 = 1; L2 < APP.WelcomeData[0] + 1; L2++) {
        $("#step" + L2).attr("class", "completed step");
    }
    $("#step" + APP.WelcomeData[0]).attr("class", "active step");
    $("#tutorial-" + APP.WelcomeData[0]).show();
    if (APP.WelcomeData[0] > 1) $("#WelcomePrevious").show();
    else $("#WelcomePrevious").hide();
}

export function WelcomeNext() {
    if (APP.WelcomeData[0] == 5) {
        $("#GAME").show();
        $("#INTRODUCTION").hide();
        $(".footer").show();
        if (Game.username == "Default") Game.username = APP.WelcomeData[1];
        Game.Introduction = true;
        Game.isInFight = false;
        if (!GLOBALS.VERSION.endsWith('(dev)')) LOGIN("FIRST_TIME");
        SAVE_DATA();
    }
    if (APP.WelcomeData[0] == 4) {
        if (APP.WelcomeData[2] == "Warrior") Game.Upgrades = [0, 5, 0];
        if (APP.WelcomeData[2] == "Paladin") Game.Upgrades = [0, 0, 5];
        if (APP.WelcomeData[2] == "Ninja") Game.Upgrades = [5, 0, 0];
        if (APP.WelcomeData[2] != "Warrior" && APP.WelcomeData[2] != "Paladin" && APP.WelcomeData[2] != "Ninja") $("#namehelp").html("You need to select a class !");
        else {
            ChangeStep(1);
            Game.class = APP.WelcomeData[2];
            $("#namehelp").html("");
            $("#WELCOME_DATA").html(`<img class='pw centered medium image' src='images/avatars/avatar (${Game.Avatar}).png'>${APP.WelcomeData[1]}<div class='pw inline label'>Level 1</div><div class="pw alpha inline label">${APP.WelcomeData[2]}</div>`);
            $("#WelcomeNext").html("Start <i class='fal fa-arrow-right'></i>");
        }
    }
    if (APP.WelcomeData[0] == 3) ChangeStep(1);
    if (APP.WelcomeData[0] == 2) {
        let NICKNAME = $("#PlayerName").val();
        if (NICKNAME != null) {
            if (NICKNAME == null || NICKNAME == "___" || NICKNAME.length < 3 || NICKNAME == "null") ErrorName();
            else {
                NICKNAME = NICKNAME.replace(/[^a-zA-Z0-9]/g, '_');
                if (NICKNAME == "Neo" || NICKNAME == "NEO" || NICKNAME == "neo" || NICKNAME == "nebulys" || NICKNAME == "Nebulys" || NICKNAME == "NEBULYS" || NICKNAME == "Purple_Wizard") NICKNAME = "Adventurer" + _.random(10000, 999999);
                Backup = APP.WelcomeData[1] = NICKNAME;
                ChangeStep(1);
                $("#namehelp").html("");
            }
        } else ErrorName();
    }
    if (APP.WelcomeData[0] == 1) ChangeStep(1);
}

export function ErrorName() {
    $("#namehelp").html("You need to write a username !");
}

export const OpenLink = function (url) {
    if (url != "#") window.open(url, '_blank').focus();
};

var NOTICE_TIMER = [];

export const NOTICE = function (title, content) {
    $("#notice-title").html(title);
    $("#notice-text").html(content);
    $("#NOTICE").attr("class", "notice active");
    NOTICE_TIMER = [5, setInterval(NOTICE_TIMING, 1000)];
    NOTICE_TIMING();
};

export const NOTICE_TIMING = function () {
    let PERCENT = (100 / 5) * NOTICE_TIMER[0];
    $("#notice-countdown").attr("style", `width: calc(${PERCENT}% - 20px);`);
    if (NOTICE_TIMER[0] > 0) NOTICE_TIMER[0]--;
    else {
        clearInterval(NOTICE_TIMER[1]);
        $("#NOTICE").attr("class", "notice");
        $("#notice-title").html("");
        $("#notice-text").html("");
    }
};

export const POPUP = function (title, content, buttons) {
    let buttons_type = [
        /* DEFAULT        */
        `<div id="POPUP_CLOSE" class="pw fluid red button"><i class="fal fa-times"></i> Close</div>`,

        /* DESTROY WEAPON */
        `<div class="pw fluid buttons"><div class='pw red button' onclick='FUNCTIONS.INVENTORY.DestroyWeapon("${APP.ToDelete.type}");'><i class='fas fa-trash'></i> Confirm</div><div id="POPUP_CLOSE" class="pw grey button"><i class="fal fa-times"></i> Cancel</div></div>`,

        /* CONFIRM RIFT   */
        `<div class="pw fluid buttons"><div id="ConfirmRift" onclick="FUNCTIONS.DIMENSION.ConfirmWT();" class="pw green button"><i class="fal fa-check"></i> Yes</div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> No</div></div>`,

        /* DESTROY ARMOR  */
        `<div class="pw fluid buttons"><div class='pw red button' onclick='FUNCTIONS.INVENTORY.DestroyArmor(${APP.ToDelete.type});'><i class='fas fa-trash'></i> Confirm</div><div id="POPUP_CLOSE" class="pw grey button"><i class="fal fa-times"></i> Cancel</div></div>`,
        /* INSTALL RELIC  */
        `<div class="pw fluid buttons"><div id='replace-btn' onclick='FUNCTIONS.INVENTORY.InstallRelic(${APP.ToAdd[0]}, ${APP.ToAdd[1]});' class='pw alpha button'><i class="fal fa-check"></i> Replace Relic </div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> Cancel</div></div>`,

        /* RESET SAVE     */
        `<div class="pw fluid buttons"><div class="pw alpha button" onclick="FUNCTIONS.MAIN.confirmReset();" ><i class="fal fa-check"></i> Yes</div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> Cancel</div></div>`,

        /* CONFIRM ARMOR  */
        `<div class="pw fluid buttons"><div id='replace-btn' onclick='FUNCTIONS.INVENTORY.DEFINE_ARMOR(${APP.ToAdd[0]}, ${APP.ToAdd[1]});' class='pw alpha button'><i class="fal fa-check"></i> Replace the ${GLOBALS.ARMORS_TYPE[APP.ToAdd[0]]}</div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> Cancel</div></div>`,

        /* CONFIRM WEAPON */
        `<div class="pw fluid buttons"><div id='replace-btn' onclick='FUNCTIONS.INVENTORY.DEFINE_WEAPON("${APP.ToAdd[0]}", ${APP.ToAdd[1]});' class='pw alpha button'><i class="fal fa-check"></i> Replace the ${APP.ToAdd[0]} Weapon</div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> Cancel</div></div>`
    ];
    if (typeof (buttons) === 'undefined') $("#popup-buttons").html(buttons_type[0]);
    else $("#popup-buttons").html(buttons_type[buttons]);
    $("#popup-title").html(title);
    $("#popup-text").html(content);
    $("#POPUP").attr("class", "popup active");
    $("#POPUP_CLOSE").on("click", function () {
        POPUP_CLOSE();
    });
};

export const POPUP_CLOSE = function () {
    $("#POPUP").attr("class", "popup");
    $("#popup-title").html("");
    $("#popup-text").html("");
    FUNCTIONS.MAIN.hideRewards();
};

export const LOGIN = function (state) {
    let text = state === "RETURN" ? `<b>Welcome back to <span class='pw alpha'>${GLOBALS.NAME}</span>, ${Game.username}</b><br>Would you like to login ?` : `<b>Hello ${Game.username} !</b><br>It's your first time playing ${GLOBALS.NAME}, would you like to login ?`;
    $("#wb-title").html(GLOBALS.NAME);
    $("#wb-text").html(text);
    $("#LOGIN-NOTICE").attr("class", "popup active");
};

export const LATEST_LOCATION_UNLOCKED = function () {
    let RESULT = 0;
    for (let LOCATION in GLOBALS.LOCATIONS) {
        if (GLOBALS.LOCATIONS[LOCATION][1] <= Game.Level && Game.MissionsCompleted[GLOBALS.LOCATIONS[LOCATION][4]] == 1) RESULT = LOCATION;
    }
    return RESULT;
};

export const MIND_CONTROL = function () {
    APP.MIND_CONTROL[1] = APP.MIND_CONTROL[1] > 120 ? 120 : APP.MIND_CONTROL[1] + 1;
    let WAS_ACTIVE = APP.MIND_CONTROL[0];

    if (Game.Dimension > 1 && Game.isInFight && $("#DIV-COMBAT").is(":visible") && APP.MIND_CONTROL[1] > 60 && Game.config[5] === 1) {
        APP.MIND_CONTROL[0] = true;
        if (!WAS_ACTIVE) NOTICE("MIND CONTROL", "Mind control is now active.");
        $("#MIND_CONTROL").html("Mind Control enabled, click on any button to disable it.");
        if ($("#POPUP").hasClass("active")) {
            POPUP_CLOSE();
            LOG("Mind Control", "Closing rewards", "white; background-color: rgb(20 185 80)");
        }
        if (!APP.isCovered) {
            if (APP.CoreLife <= Game.Enemy[3] || (APP.CoreBaseLife * 15) / 100 >= APP.CoreLife) {
                FUNCTIONS.COMBAT.TAKE_COVER();
                LOG("Mind Control", "Take Cover", "rgb(0 0 0 / 65%); background-color: rgb(224 225 226)");
            } else if (Game.Emp > 0 && !$("#special-btn").hasClass("transparent")) {
                FUNCTIONS.COMBAT.SPECIAL_ATTACK();
                LOG("Mind Control", "Special Attack", "white; background-color: rgb(230 193 56)");
            } else if ((Game.inventory.length - 1) < Game.MaxInv) {
                FUNCTIONS.COMBAT.MAIN_ATTACK();
                LOG("Mind Control", "Main Attack", "white; background-color: rgb(28 103 228)");
            } else {
                APP.MIND_CONTROL = [false, 0];
                LOG("Mind Control", "Mind control disabled", "white; background-color: rgb(210 5 43)");
            }
        }
    } else if (Game.Dimension > 1 && $("#DIV-COMBAT").is(":visible") && APP.MIND_CONTROL[1] > 60 && Game.config[5] === 1) {
        APP.MIND_CONTROL[0] = false;
        POPUP_CLOSE();
        LOG("Mind Control", "Closing rewards", "white; background-color: rgb(20 185 80)");
    } else $("#MIND_CONTROL").html("");
};

export const LOG = function (TITLE, MESSAGE, COLOR) {
    COLOR = typeof (COLOR) === 'undefined' ? "white" : COLOR;
    console.log("%c" + TITLE + "%c" + MESSAGE, "background-color: rgb(19 241 210 / 25%); color: rgb(19 241 210); border-radius: 5px 0 0 5px; padding: 5px;", "padding: 5px; border-radius: 0 5px 5px 0; color: " + COLOR + "; ");
};

export const SELECT_LANGUAGE = function () {
    let LANG = Game.Language === "Automatic" ? navigator.language : Game.Language;
    if (/^fr\b/.test(LANG)) APP.LANG = "FR";
    else APP.LANG = "EN";

    GLOBALS.RELICS_NAMES = language[APP.LANG].RELICS_NAMES;
    GLOBALS.THREATS = language[APP.LANG].THREATS;
    GLOBALS.ARMORS_TYPE = language[APP.LANG].ARMORS_TYPE;
    GLOBALS.WEAPONS_TYPE = language[APP.LANG].WEAPONS_TYPE;

    for (let M in GLOBALS.MISSIONS.LIST) {
        GLOBALS.MISSIONS.LIST[M].NAME = language[APP.LANG].MISSIONS[M][0];
    }

    for (let L in GLOBALS.LOCATIONS) {
        GLOBALS.LOCATIONS[L][0] = language[APP.LANG].LOCATIONS[L];
    }

    GLOBALS.BOSSES_NAMES = language[APP.LANG].BOSSES_NAMES;
    GLOBALS.ENEMIES_NAMES = language[APP.LANG].ENEMIES_NAMES;

    $("#attack-btn").html('<i class="fas fa-sword"></i> ' + language[APP.LANG].ACTIONS.Main);
    $("#special-btn").html('<i class="fas fa-swords"></i> ' + language[APP.LANG].ACTIONS.Special);
    $("#cover-btn").html('<i class="fas fa-shield"></i> ' + language[APP.LANG].ACTIONS.Cover);
    $("#run-btn").html('<i class="fas fa-running"></i> ' + language[APP.LANG].ACTIONS.RunAway);

    $("#inventory").html('<i class="fas fa-sack icon"></i> ' + language[APP.LANG].MENUS.Inventory);
    $("#prestige").html('<i class="far fa-portal-enter icon"></i> ' + language[APP.LANG].MENUS.Dimension);
    $("#statistics").html('<i class="fas fa-clipboard list icon"></i> ' + language[APP.LANG].MENUS.Statistics);
    $("#leaderboard").html('<i class="fas fa-trophy icon"></i> ' + language[APP.LANG].MENUS.Leaderboard);
    $("#settings").html('<i class="fas fa-cogs icon"></i> ' + language[APP.LANG].MENUS.Settings);
    $("#credits").html('<i class="fas fa-popcorn icon"></i> ' + language[APP.LANG].MENUS.Credits);
    $("#missions").html('<i class="far fa-dot-circle icon"></i> ' + language[APP.LANG].MENUS.Missions);
    $("#exploration").html('<i class="fa-solid fa-earth-europe icon"></i> ' + language[APP.LANG].MENUS.Exploration);
    $("#guild").html('<i class="fa-solid fa-circle-star icon"></i> ' + language[APP.LANG].MENUS.Guild);

    $("#MainWeaponType").html(language[APP.LANG].MISC.MainWeapon);
    $("#SpecialWeaponType").html(language[APP.LANG].MISC.SpecialWeapon);
    $("#Armor1Type").html(language[APP.LANG].ARMORS_TYPE[1]);
    $("#Armor2Type").html(language[APP.LANG].ARMORS_TYPE[2]);
    $("#Armor3Type").html(language[APP.LANG].ARMORS_TYPE[3]);
    $("#Armor4Type").html(language[APP.LANG].ARMORS_TYPE[4]);

    $("#RM1>label").html(language[APP.LANG].QUALITIES.Normal);
    $("#RM2>label").html(language[APP.LANG].QUALITIES.Common);
    $("#RM3>label").html(language[APP.LANG].QUALITIES.Uncommon);
    $("#RM4>label").html(language[APP.LANG].QUALITIES.Rare);
    $("#RM5>label").html(language[APP.LANG].QUALITIES.Epic);
    $("#RM6>label").html(language[APP.LANG].QUALITIES.Exotic);

    $(`#MainWeapon>.footer>.Throw.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.ThrowAway);
    $(`#SpecialWeapon>.footer>.Throw.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.ThrowAway);
    $(`#Armor1>.footer>.Throw.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.ThrowAway);
    $(`#Armor2>.footer>.Throw.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.ThrowAway);
    $(`#Armor3>.footer>.Throw.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.ThrowAway);
    $(`#Armor4>.footer>.Throw.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.ThrowAway);

    $(`#MainWeapon>.footer>.Unequip.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.UnequipAway);
    $(`#SpecialWeapon>.footer>.Unequip.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.UnequipAway);
    $(`#Armor1>.footer>.Unequip.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.UnequipAway);
    $(`#Armor2>.footer>.Unequip.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.UnequipAway);
    $(`#Armor3>.footer>.Unequip.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.UnequipAway);
    $(`#Armor4>.footer>.Unequip.button`).html('<i class="fas fa-trash"></i> ' + language[APP.LANG].MISC.UnequipAway);

    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(1)>.segment.text-left").html(language[APP.LANG].STATS.Identification);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(2)>.segment.text-left").html(language[APP.LANG].STATS.Ranking);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(3)>.segment.text-left").html(language[APP.LANG].STATS.TimePlayed);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(4)>.segment.text-left").html(language[APP.LANG].STATS.CurrentLevel);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(5)>.segment.text-left").html(language[APP.LANG].STATS.Class);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(6)>.segment.text-left").html(language[APP.LANG].STATS.TotalDamage);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(7)>.segment.text-left").html(language[APP.LANG].STATS.TotalLife);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(8)>.segment.text-left>.link").html(language[APP.LANG].STATS.EquipmentScore);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(9)>.segment.text-left").html(language[APP.LANG].STATS.DimensionalDiffculty);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(10)>.segment.text-left").html(language[APP.LANG].STATS.FortressesDefeated);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(11)>.segment.text-left").html(language[APP.LANG].STATS.MainWeaponDamage);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(12)>.segment.text-left").html(language[APP.LANG].STATS.SpecialWeaponDamage);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(13)>.segment.text-left").html(language[APP.LANG].STATS.HelmetBaseLife);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(14)>.segment.text-left").html(language[APP.LANG].STATS.ArmorBaseLife);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(15)>.segment.text-left").html(language[APP.LANG].STATS.ShieldBaseLife);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(16)>.segment.text-left").html(language[APP.LANG].STATS.BootsBaseLife);
    $("#DIV-STATS>div:nth-child(3)>div>.segments:nth-child(17)>.segment.text-left").html(language[APP.LANG].STATS.GameVersion);
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(1)>.segment.text-left").html(language[APP.LANG].STATS.Kills.split("[CLASS]").join(`<span class="Enemy1">${language[APP.LANG].THREATS[1]}</span>`));
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(2)>.segment.text-left").html(language[APP.LANG].STATS.Kills.split("[CLASS]").join(`<span class="Enemy2">${language[APP.LANG].THREATS[2]}</span>`));
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(3)>.segment.text-left").html(language[APP.LANG].STATS.Kills.split("[CLASS]").join(`<span class="Enemy3">${language[APP.LANG].THREATS[3]}</span>`));
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(4)>.segment.text-left").html(language[APP.LANG].STATS.Kills.split("[CLASS]").join(`<span class="Enemy4">${language[APP.LANG].THREATS[4]}</span>`));
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(5)>.segment.text-left").html(language[APP.LANG].STATS.Kills.split("[CLASS]").join(`<span class="Enemy5">${language[APP.LANG].THREATS[5]}</span>`));
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(6)>.segment.text-left").html(language[APP.LANG].STATS.Kills.split("[CLASS]").join(`<span class="Enemy6">${language[APP.LANG].THREATS[6]}</span>`));
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(7)>.segment.text-left").html(language[APP.LANG].STATS.Kills.split("[CLASS]").join(`<span class="Enemy7">${language[APP.LANG].THREATS[7]}</span>`));
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(8)>.segment.text-left").html(language[APP.LANG].STATS.Ratio);
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(9)>.segment.text-left").html(language[APP.LANG].STATS.TotalKills);
    $("#DIV-STATS>div:nth-child(5)>div>.segments:nth-child(10)>.segment.text-left").html(language[APP.LANG].STATS.TotalDeaths);
    $("#GUILD_QUESTS_NAME").html(language[APP.LANG].MISC.Quests);
    $("#GUILD_TITLES_NAME").html(language[APP.LANG].MISC.Titles);
    $("#GUILD_BANK_NAME").html(language[APP.LANG].MISC.Bank);
    $("#GUILD_SHOP_NAME").html(language[APP.LANG].MISC.Shop);
    FUNCTIONS.INVENTORY.GenInventory();
    FUNCTIONS.APP.UpdateUI();
};

export const GET_QUALITY_NUMBER = function (QUALITY) {
    let QUALITIES = {
        Normal: 0,
        Common: 1,
        Uncommon: 2,
        Rare: 3,
        Epic: 4,
        Exotic: 5,
        Legendary: 6,
        Divine: 7,
        Error: "E"
    };
    return QUALITIES[QUALITY];
};

export const GET_ICON_ID = function (TYPE, CLASS) {
    if (TYPE != 0) {
        let ICON = "";
        let ARMORS = ["", "Helmets", "Armors", "Shields", "Boots"];
        let TYPES = {
            "Main": [4, 5, 4, 4, 5, 5, 5],
            "Special": [4, 4, 5, 4, 5, 5, 5],
            "Helmets": [4, 5, 5, 6, 7, 6, 7],
            "Armors": [6, 6, 5, 4, 6, 6, 6],
            "Shields": [4, 4, 4, 4, 4, 3, 4],
            "Boots": [7, 7, 6, 4, 5, 5, 4]
        };
        if (TYPE === "Special" || TYPE === "Main") {
            ICON = `./images/Weapons/${TYPE}/${GET_QUALITY_NUMBER(CLASS)}-${_.random(1, TYPES[TYPE][GET_QUALITY_NUMBER(CLASS)])}.png`;
        } else if (TYPE === "Relic") {
            ICON = `./images/Relics/${CLASS}.png`;
        } else if (TYPE === "Gem") {
            ICON = `./images/Gems/${CLASS}.png`;
        }
        else {
            ICON = `./images/Armors/${ARMORS[TYPE]}/${GET_QUALITY_NUMBER(CLASS)}-${_.random(1, TYPES[ARMORS[TYPE]][GET_QUALITY_NUMBER(CLASS)])}.png`;
        }
        return ICON;
    } else return;
};