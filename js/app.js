import FUNCTIONS from './index.js';
import { LOG } from './main.js';

window.APP = {
    WelcomeData: [1, "Neo", "None"],
    WeaponsPower: 10,
    SpecialPower: 20,
    Ranking: 0,
    PowerMult: 1,
    LifeMult: 1,
    lastCloudSave: 0,
    NewArmorID: 0,
    CoreLife: 100,
    CoreBaseLife: 100,
    TotalWeaponsUpgrades: 0,
    TotalArmorsUpgrades: 0,
    LEADERBOARD_POSITION: 0,
    MaxLevel: 35,
    MaxScore: 35,
    TotalMissions: 0,
    LastMission: 0,
    ScoreModeEnabled: 0,
    LoggedIn: 0,
    ToDelete: "none",
    ToAdd: ["", ""],
    Email: "none",
    GOT_REWARDS: 0,
    LastId: 0,
    LeaderFilter: 0,
    LEADERBOARD: {
        PAGE: 0,
        RANGES: [1, 10]
    },
    isCovered: false,
    LastCover: 0,
    NextHeal: 5,
    TYPES: ["red", "green", "blue"],
    PICKER: [19, 241, 210],
    SELECTION: "",
    MIND_CONTROL: [false, 0],
    AverageArmorStat: 0,
    LANG: "EN",
    StoryView: false
};

$(document).ready(function () {
    if (location.href.match(/(:5500).*/)) GLOBALS.VERSION = GLOBALS.VERSION + " (dev)";
    else if (GLOBALS.BETA) GLOBALS.VERSION = `${GLOBALS.VERSION} BETA ${GLOBALS.BETA}`;
    document.title = GLOBALS.NAME;
    $("#game_version").html(GLOBALS.VERSION);
    FUNCTIONS.PALETTE.RESET_THEME(0);
    if (localStorage.getItem("REverse") !== null) FUNCTIONS.MAIN.LOAD_SAVE();
    FUNCTIONS.MAIN.SELECT_LANGUAGE();
    if (Game.username != "Default" && APP.LoggedIn == 0 && APP.Email != "DoNotLogin" && !$("#LOGIN-NOTICE").hasClass("active") && !GLOBALS.VERSION.endsWith('(dev)')) FUNCTIONS.MAIN.LOGIN("RETURN");
    if (Game.username != "Default") {
        $("#GAME").show();
        $("#INTRODUCTION").hide();
        $(".footer").show();
        UpdateEngine();
        FUNCTIONS.MISSIONS.GENERATE_MISSION_VIEW();
        FUNCTIONS.INVENTORY.CHECK_EQUIPMENT();
        FUNCTIONS.PALETTE.LOAD_THEME();
        if (!Game.Introduction) Game.Introduction = true;
    }
    Game.isInFight = false;
    APP.MIND_CONTROL[1] = 0;
    setInterval(function () {
        if (Game.config[5] === 1) FUNCTIONS.MAIN.MIND_CONTROL();
    }, 1750);
    setInterval(UpdateEngine, 1000);
    Game.xp[1] = FUNCTIONS.MAIN.CalcEXP(Game.Level);
    FUNCTIONS.MISSIONS.END_MISSION();
    APP.LeaderFilter = 0;
    UpdateGame();
    FUNCTIONS.CLOUD.TOP("10");
    $('.pw.checkbox').each(function () {
        if ($(this).attr("data-id") < 5 || $(this).attr("data-id") == 11 || $(this).attr("data-id") == 12) {
            let TOGGLE = Game.config[$(this).attr("data-id")] == 1 ? "checked" : "unchecked";
            $(this).attr("data-check", TOGGLE);
        } else {
            let TOGGLE = Game.AutoRemove[$(this).attr("data-id") - 5] == 1 ? "checked" : "unchecked";
            $(this).attr("data-check", TOGGLE);
        }
    });
    $("#VERSION_TEXT").html("REverse v" + GLOBALS.VERSION);
    $("#avatar").attr("src", `images/avatars/avatar (${Game.Avatar}).png`);
    $("#avatar2").attr("src", `images/avatars/avatar (${Game.Avatar}).png`);
    FUNCTIONS.INVENTORY.GenInventory();
    FUNCTIONS.CLOUD.DELETE_LOCAL_DATABASE();
    FUNCTIONS.MAIN.CLOSE_MENUS();
    FUNCTIONS.EVENTS.DYNAMICS();
    UpdateUI();
});

export const UpdateEngine = function () {
    UpdateGame();
    Game.PlayTime++;
    APP.ScoreModeEnabled = Game.Level >= APP.MaxLevel && _.countBy(Game.MissionsCompleted, x => x === 1).true >= APP.TotalMissions ? 1 : 0;
    if (!Game.MissionStarted[0] && Game.MissionsCompleted[Game.MissionStarted[1]] === 0 && Game.config[3] === 1 && $("#INTRODUCTION").is(":hidden") && !$("#LOGIN-NOTICE").hasClass("active")) FUNCTIONS.MISSIONS.LAUNCH_MISSION(0);
    if (Game.MissionStarted[0] && Game.MissionsCompleted[Game.MissionStarted[1]] === 0 && !FUNCTIONS.MISSIONS.IS_STORY_FINISHED(Game.MissionStarted[1]) && !$("#GAME").hasClass("story")) {
        Game.Choices[Game.MissionStarted[1]] = Game.Choices[Game.MissionStarted[1]] == "undefined" || Game.Choices[Game.MissionStarted[1]] == null ? [[null]] : Game.Choices[Game.MissionStarted[1]];
        FUNCTIONS.MISSIONS.TOGGLE_STORY(Game.MissionStarted[1])
    }
    if (Game.isInFight) $("#EnemySprite").html(`<img class='pw medium image' style='${FUNCTIONS.COMBAT.Get_Monster_Image_Position_By_Name(Game.Enemy[0])}' src='${FUNCTIONS.COMBAT.Get_Monster_Image_By_Name(Game.Enemy[0])}'>`);
    if (APP.CoreLife > APP.CoreBaseLife) {
        APP.CoreLife = APP.CoreBaseLife;
        UpdateUI();
    }
    if (Game.isInFight != true && APP.CoreLife == null || Game.Enemy[5] == null || Game.Enemy[5] == 0) {
        Game.isInFight = false;
        UpdateGame();
    }
    if (APP.LoggedIn === 1 && APP.Email !== "none") {
        if (APP.lastCloudSave < 180) {
            APP.lastCloudSave++;
        } else {
            FUNCTIONS.CLOUD.SEND_STATS();
        }
    }
    Game.LastEscape ? ($("#NextRetreat").html(language[APP.LANG].MISC.Retreat.split("[COUNT]").join(FUNCTIONS.MAIN.toHHMMSS(Game.LastEscape -= 1)))) : ($("#NextRetreat").html(""));
    APP.LastCover ? ($("#NextCover").html(language[APP.LANG].MISC.Cover.split("[COUNT]").join(FUNCTIONS.MAIN.toHHMMSS(APP.LastCover -= 1)))) : ($("#NextCover").html(""), APP.LastCover = 0);
    Game.xp[0] < 0 && (Game.xp[0] = 0);
    Game.MaxUPC.forEach(function (el, i) { typeof (el) === 'undefined' && (Game.MaxUPC[i] = 0) });
    if (Game.username === null || Game.username === "" || Game.username === " " || Game.username === "" || Game.username.length < 3) {
        localStorage.clear();
        Backup = "Default";
        Game.username = Backup;
    } else Game.username = Game.username.replace(/[^a-zA-Z0-9]/g, '');
    (Backup !== "Default" && Backup !== Game.username) && (Game.username = Backup);
    typeof (Game.xp[2]) === 'undefined' && (Game.xp[2] = 1);
    const LEVEL = APP.ScoreModeEnabled === 0 ? `${language[APP.LANG].MISC.Level} ${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Level, 0)}` : `${language[APP.LANG].MISC.Score} <i class='fad fa-dice-d20'></i>${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.Ranking, 0)}`;
    if (Game.Level < 1) {
        Game.Level = 1;
        Game.xp[0] = 0;
    } else if (Game.Level < APP.MaxLevel) {
        // if current experience is higher than exp required and not in mission
        if (Game.xp[0] >= Game.xp[1] && !Game.MissionStarted[0]) {
            // if current level is less than max level for current location and player while not in mission
            if ((Game.Level+1) <= GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][2]) Game.Level++;
        // if player is in mission and level equals current location max level but current experience is higher than the experience required to reach the current level
        } else if (Game.Level === GLOBALS.LOCATIONS[Game.Location][2] && Game.MissionStarted[0] && Game.xp[0] > FUNCTIONS.MAIN.CalcEXP(GLOBALS.LOCATIONS[Game.Location][2])) {
            Game.xp[0] = FUNCTIONS.MAIN.CalcEXP(Game.Level);
            LOG("(1) LEVEL", "RE-CALCULATE EXP", "rgb(0 0 0 / 65%); background-color: rgb(224 225 226);");
        // if current experience is less than the experience required to reach the current level and current is higher than 1
        } else if (Game.xp[0] < FUNCTIONS.MAIN.CalcEXP(Game.Level - 1) && Game.Level > 1) {
            Game.xp[0] = FUNCTIONS.MAIN.CalcEXP(Game.Level - 1);
            LOG("(2) LEVEL", "RE-CALCULATE EXP", "rgb(0 0 0 / 65%); background-color: rgb(224 225 226);");
        // if current level is less than the last finished mission required level
        } else if (APP.LastMission > 0 && Game.Level < GLOBALS.MISSIONS.LIST[APP.LastMission-1].LEVEL) {
            Game.Level = GLOBALS.MISSIONS.LIST[APP.LastMission-1].LEVEL;
            LOG("(3) LEVEL", "RE-CALCULATE LEVEL", "rgb(0 0 0 / 65%); background-color: rgb(224 225 226);");
        }
        Game.xp[1] = FUNCTIONS.MAIN.CalcEXP(Game.Level);
    } else if (Game.Level > APP.MaxLevel) {
        Game.Level = APP.MaxLevel;
        if (Game.Level > GLOBALS.MISSIONS.LIST[APP.LastMission-1].LEVEL) {
            Game.Level = GLOBALS.MISSIONS.LIST[APP.LastMission-1].LEVEL;
            LOG("(4) LEVEL", "RE-CALCULATE LEVEL", "rgb(0 0 0 / 65%); background-color: rgb(224 225 226);");
        }
    }
    if (APP.ScoreModeEnabled === 0 && Game.Level > GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][2]) {
        Game.Level = GLOBALS.LOCATIONS[Game.Location][2];
        Game.xp[0] = FUNCTIONS.MAIN.CalcEXP(Game.Level);
        LOG("(5) LEVEL", "RE-CALCULATE LEVEL + EXP", "rgb(0 0 0 / 65%); background-color: rgb(224 225 226);");
    }
    if (Game.Emp > 50) Game.Emp = 50;
    //let ONLINEICON = "<i title='Offline' class='pw red far fa-circle'></i>";
    //location.href.match(/(nebulys.eu).*/) && (Game.username !== null && Game.username !== "Default") && (APP.LoggedIn === 1 && APP.Email !== "none") && (ONLINEICON = "<i title='Online' class='pw alpha fas fa-circle'></i>");
    $("#PlayerID").html(`<div class='pw alpha'>${FUNCTIONS.CLOUD.GET_TROPHY_ICON()} ${Game.username} <span class='pw inline label level-number'>${LEVEL}</span></div>`);
    $("#PlayerSprite").html(`<img class='pw small image' src='images/avatars/avatar (${Game.Avatar}).png'>`);
    Game.Armors[2][0] = Game.Level >= 10;
    Game.Armors[3][0] = Game.Level >= 20;
    Game.Armors[4][0] = Game.Level >= 30;
    APP.ScoreModeEnabled === 0 && Game.inventory.forEach((element, index) => {
        if (index > Game.MaxInv || Game.inventory[index].LEVEL > Game.Level) Game.inventory.splice(index, 1);
    });
    for (let x in [5, 6]) Game.Weapons.Main[x] > (APP.ScoreModeEnabled === 0 ? Game.Level : APP.MaxScore) && (FUNCTIONS.MAIN.LOG("ERROR", "code 00" + (x + 2), "white; background-color: rgb(185 20 20)"), FUNCTIONS.INVENTORY.ErrorArmor(x));
    if (Game.isInFight && APP.CoreLife <= 0 && !RESPAWN_TIMER[1]) FUNCTIONS.COMBAT.LoseFight();
    else if (Game.isInFight && Game.Enemy[5] <= 0) FUNCTIONS.COMBAT.WinFight();
};

export const UpdateGame = function () {
    Game.Dimension = Math.min(Game.Dimension, 50);
    APP.MaxScore = APP.MaxLevel + (Game.Dimension * 5);
    for (let D = 1; D < 7; D++) {
        if (Game.Defeated[D] === null) Game.Defeated[D] = 0;
    }
    Game.DIMENSION_MULTIPLIERS[0] = 0;
    Game.DIMENSION_MULTIPLIERS[1] = 0;
    for (const RELIC in Game.RELICS) {
        if (Game.RELICS[RELIC][1] === 1) Game.DIMENSION_MULTIPLIERS[0] += Game.RELICS[RELIC][2];
        else if (Game.RELICS[RELIC][1] === 2) Game.DIMENSION_MULTIPLIERS[1] += Game.RELICS[RELIC][2];
        else if (Game.RELICS[RELIC][1] === 4) APP.MaxScore += Game.RELICS[RELIC][2] / 10;
    }
    if (Game.isInFight && Game.class === "none") {
        Game.username = "Default";
        Backup = "Default";
        FUNCTIONS.PALETTE.RESET_THEME(1);
    }
    Game.DIMENSION_MULTIPLIERS[2] = Game.Dimension * 0.03 - 0.03; // EXPMULT
    Game.DIMENSION_MULTIPLIERS[3] = Game.Dimension * 0.015 + 0.985; // DIFFICULTYMULT
    Backup = Object.freeze(Game.username);
    APP.PowerMult = Game.Upgrades[1] * 0.01 + 1;
    APP.LifeMult = Game.Upgrades[2] * 0.01 + 1;
    Game.MaxInv = Game.Dimension * 2 + 18 + (Game.Upgrades[3] * 1);
    if (typeof Game.MissionStarted[4] === "undefined") Game.MissionStarted[4] = 0;
    FUNCTIONS.COMBAT.CHECK_ENEMY();
    APP.CoreBaseLife = 0;
    APP.TotalWeaponsUpgrades = 0;
    APP.TotalArmorsUpgrades = 0;
    GET_EQUIPMENT_RANK();
    APP.TotalWeaponsUpgrades += Game.WeaponUpgrades.Main + Game.WeaponUpgrades.Special;
    let TotalMissionsCount = 0;
    for (let mission in GLOBALS.MISSIONS.LIST) {
        if (mission[3] !== 2) TotalMissionsCount++;
        Game.MissionsCompleted[mission] = Game.MissionsCompleted[mission] === "undefined" || Game.MissionsCompleted[mission] === null ? 0 : Game.MissionsCompleted[mission];
        if (FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED() !== "none" && APP.ScoreModeEnabled === 0 && !Game.MissionStarted[0] && Game.Level >= GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][2] && Game.username !== "Default" && Game.isInFight === true) {
            if (Game.MissionsCompleted[mission] === 0 && Game.MissionsCompleted[GLOBALS.MISSIONS.LIST[mission].REQUIRED] === 1 && GLOBALS.MISSIONS.LIST[mission].TYPE !== 2 && Game.Level >= GLOBALS.MISSIONS.LIST[mission].LEVEL) {
                FUNCTIONS.MISSIONS.GENERATE_MISSION_VIEW();
                if (Game.config[3] === 1 && !$("#POPUP").hasClass("active")) FUNCTIONS.MISSIONS.LAUNCH_MISSION(mission);
            }
        }   
    }
    for (const MISSION in GLOBALS.MISSIONS.LIST) {
        Game.Choices[MISSION] = Game.Choices[MISSION] === "undefined" || Game.Choices[MISSION] === null ? [[null]] : Game.Choices[MISSION];
    }
    APP.TotalMissions = TotalMissionsCount;
    APP.CoreBaseLife = Math.round(APP.CoreBaseLife * (APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1]));
    APP.WeaponsPower = Math.round(Game.Weapons.Main[4] * (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0]));
    APP.SpecialPower = Math.round((Game.Weapons.Main[4] + Game.Weapons.Special[4]) * (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0]));
    if (Game.MissionStarted[0]) Game.Location = GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].LOCATION;
    else if (Game.Location === 11 || Game.Location === 17) Game.Location--;
    for (let i = 0; i < Game.inventory.length; i++) {
        const item = Game.inventory[i];
        if (item !== undefined) {
            switch (item.class) {
                case "Normal":
                    if (Game.AutoRemove[0] === 1) FUNCTIONS.INVENTORY.RemoveItem(i);
                    break;
                case "Common":
                    if (Game.AutoRemove[1] === 1) FUNCTIONS.INVENTORY.RemoveItem(i);
                    break;
                case "Uncommon":
                    if (Game.AutoRemove[2] === 1) FUNCTIONS.INVENTORY.RemoveItem(i);
                    break;
                case "Rare":
                    if (Game.AutoRemove[3] === 1) FUNCTIONS.INVENTORY.RemoveItem(i);
                    break;
                case "Epic":
                    if (Game.AutoRemove[4] === 1 || (Game.Level < 30 && item.class === "Exotic")) FUNCTIONS.INVENTORY.RemoveItem(i);
                    break;
                case "Legendary":
                    if (Game.Level < 30) FUNCTIONS.INVENTORY.RemoveItem(i);
                    break;
            }
            if (!item.type || i >= Game.MaxInv) FUNCTIONS.INVENTORY.RemoveItem(i);
            else if (Game.Level < 10 && item.class === "Uncommon") FUNCTIONS.INVENTORY.RemoveItem(i);
            else if (Game.Level < 15 && item.class === "Rare") FUNCTIONS.INVENTORY.RemoveItem(i);
            else if (Game.Level < 20 && item.class === "Epic") FUNCTIONS.INVENTORY.RemoveItem(i);
            else if (Game.Level < 30 && (item.class === "Exotic" || item.class === "Legendary")) FUNCTIONS.INVENTORY.RemoveItem(i);
        } else {
            FUNCTIONS.MAIN.LOG("ERROR", "code 007", "white; background-color: rgb(185 20 20)");
            FUNCTIONS.INVENTORY.RemoveItem(i);
        }
    }
    UpdateUI();
    FUNCTIONS.MAIN.SAVE_DATA();
};

export const UpdateUI = function () {
    const xpMultiplier = ((Game.xp[2] + Game.DIMENSION_MULTIPLIERS[2]) - Math.floor(Game.xp[2] + Game.DIMENSION_MULTIPLIERS[2])) < 1 ? "+" + Game.Upgrades[0] + "%" : "+" + Game.Upgrades[0] + "%";
    $("#XPMULTVAL").html(xpMultiplier);
    const powerMultiplier = ((APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0]) - Math.floor(APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0])) < 1 ? "+" + Game.Upgrades[1] + "%" : "+" + Game.Upgrades[1] + "%";
    $("#POWERMULTVAL").html(powerMultiplier);
    const lifeMultiplier = ((APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1]) - Math.floor(APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1])) < 1 ? "+" + Game.Upgrades[2] + "%" : "+" + Game.Upgrades[2] + "%";
    $("#LIFEMULTVAL").html(lifeMultiplier);
    $("#INVUPGVAL").html(Game.MaxInv);
    $("#ShardsNumber").html(`<i class='pw blue fal fa-dna'></i>${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Shards, 5)} Dimensional Fragments`);
    if (Game.username == "Default") {
        $("#GAME").hide();
        $("#INTRODUCTION").show();
        $(".footer").hide();
        Game.Introduction = false;
    }
    $("#PlayerXP .progress-bar").attr("style", `max-width:${FUNCTIONS.MAIN.GetEXPPercent()}%;`);
    const WTText = Game.Dimension > 1 ? `Dimension <i class='globe icon'></i> ${Game.Dimension}<br>` : "";
    $("#LABEL_SHARDS").html(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Shards, 5));
    if (APP.ScoreModeEnabled == 0) {
        $("#DimensionID").html(WTText);
        $("#PlayerXP").show();
        $("#LABEL_EXP").html(`<span class='pw alpha bold'>${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.xp[0], "auto")}</span>/${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.xp[1], "auto")} XP`);
    } else {
        $("#DimensionID").html(WTText);
        if (Game.Level >= APP.MaxLevel) {
            $("#PlayerXP").hide();
            $("#LABEL_EXP").html("Max Level");
        }
    }
    let completedMissions = 0;
    for (let M in GLOBALS.MISSIONS.LIST) {
        if (GLOBALS.MISSIONS.LIST[M].TYPE != 2 && Game.MissionsCompleted[M] == 1) completedMissions++;
    }
    APP.LastMission = completedMissions;
    const ranking = (((30 + (Game.Dimension * 5)) * 10) - 5);
    if (Game.Level >= APP.MaxLevel && APP.Ranking >= ranking && _.countBy(Game.MissionsCompleted, x => x === 1).true  >= APP.TotalMissions) {
        $("#WTBTN").show();
        $("#WTUNLOCK").html(`Dimensional Rift <i class='globe icon'></i> ${Game.Dimension + 1} is opened.`);
    } else {
        $("#WTBTN").hide();
        $("#WTUNLOCK").html("");
    }
    const shards = Game.Level < APP.MaxLevel ? "0" : Math.round(APP.Ranking / 10 - 30) <= 0 ? "0" : Math.round(APP.Ranking / 10 - 30);
    const completedstory = _.countBy(Game.MissionsCompleted, x => x === 1).true == APP.TotalMissions ? `<span class='pw alpha'>Yes</span>` : `<span class='pw red'>Not Yet</span>`;
    $("#WTShards").html(`Score required : <span class='pw alpha'><i class='fad fa-dice-d20'></i>${ranking}</span><br>Completed story : ${completedstory}<br>Fragments reward : <span class='pw alpha'><i class='fal fa-dna'></i>${shards}</span>`);
    $("#CurrWT").html(`Current dimension : <span class='pw alpha'><i class='globe icon'></i>${Game.Dimension}</span>`);

    const UPGRADES_IDs = ["XPMULTPRICE", "POWERMULTPRICE", "LIFEMULTPRICE", "INVUPGPRICE"];
    const UPGRADE_TEXT = [];
    const CAN_AFFORD_UPGRADE = [];
    for (let UPGRADE = 0; UPGRADE < 4; UPGRADE++) {
        CAN_AFFORD_UPGRADE[UPGRADE] = FUNCTIONS.DIMENSION.GET_DIMENSIONAL_SHARDS_PRICE(UPGRADE) > Game.Shards ? "pw red" : "pw green";
        if (FUNCTIONS.DIMENSION.GET_DIMENSIONAL_SHARDS_PRICE(UPGRADE) > Game.Shards) $(`#UPGRADE_${UPGRADE}`).hide();
        else $(`#UPGRADE_${UPGRADE}`).show();
        if (FUNCTIONS.DIMENSION.GET_DIMENSIONAL_SHARDS_PRICE(UPGRADE) === Infinity) UPGRADE_TEXT[UPGRADE] = "MAXED OUT";
        else UPGRADE_TEXT[UPGRADE] = `<i class='fal fa-dna'></i>${FUNCTIONS.DIMENSION.GET_DIMENSIONAL_SHARDS_PRICE(UPGRADE)}`;
        $(`#${UPGRADES_IDs[UPGRADE]}`).html(`<span class='${CAN_AFFORD_UPGRADE[UPGRADE]}'>${UPGRADE_TEXT[UPGRADE]}</span>`);
    }
    $("#TOPNEXT").html(`${APP.LEADERBOARD.PAGE + 1} <i class="fa-solid fa-square-arrow-down"></i>`);
    $("#TOPPREVIOUS").html(`<i class="fa-solid fa-square-arrow-up"></i> ${APP.LEADERBOARD.PAGE - 1}`);
    const isNextPageEnabled = APP.LEADERBOARD.RANGES[1] + 1 <= APP.LastId;
    $("#TOPNEXT").attr('class', `pw grey button ${isNextPageEnabled ? (APP.LEADERBOARD.PAGE == 1 ? "rounded" : "") : "disabled"}`);
    $("#TOPPREVIOUS").attr('class', `pw grey button ${APP.LEADERBOARD.PAGE == 1 ? "disabled" : (isNextPageEnabled == 1 ? "" : "rounded")}`);
    $("#LowScore").html((Game.Level - 5) * 10 >= APP.Ranking ? "Your current armor is outdated! Upgrade it now for better performance." : (Game.Level - 2) * 10 >= APP.Ranking ? "Enemies are growing stronger. Upgrade your equipment to keep up." : "");
    SET_CURRENT_TASK();
    $("#REWARDS_CURRENT_CONFIG").html(language[APP.LANG].REWARDS[Game.config[2]]);
    if ($('#DIV-COMBAT').is(":visible")) $("#DIV-REWARDS").hide();
    if (APP.LoggedIn == 1) $("#CloudTimer").html("<i title='Online' class='pw alpha fas fa-circle'></i> Last cloud sync " + FUNCTIONS.MAIN.toHHMMSS(APP.lastCloudSave) + " ago, as <span class='pw alpha'>" + Game.username + "</span>.");
    else $("#CloudTimer").html("<i title='Offline' class='pw red far fa-circle'></i> Cloud sync disabled.");
    if (APP.LEADERBOARD_POSITION > 0) $('#IS_PLAYER_IN_LEADERBOARD').html(APP.LEADERBOARD_POSITION <= 10 ? `You are now among the top players! Your current position is #${APP.LEADERBOARD_POSITION}.` : `You have made it to the leaderboard! Your current position is #${APP.LEADERBOARD_POSITION}.`);
    $("#LABEL_INVENTORY").html("<i class='fas fa-sack'></i> " + Game.inventory.length + "/" + Game.MaxInv);
    $("#LABEL_CASH").html(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Cash, 1));
    $("#MISSIONS_COMPLETED_COUNT").html("Missions completed (" + _.countBy(Game.MissionsCompleted, x => x === 1).true + "/" + APP.TotalMissions + ")");
    $("#DUNGEONS_COMPLETED_COUNT").html("Dungeons (" + FUNCTIONS.MISSIONS.COUNT_DUNGEONS("completed") + "/" + FUNCTIONS.MISSIONS.COUNT_DUNGEONS("total") + ")");
    if (Game.Level >= GLOBALS.LOCATIONS[Game.Location][2] && APP.ScoreModeEnabled == 0 && !Game.MissionStarted[0]) $("#MaxPOSLVL").html(`${language[APP.LANG].MISC.MaxLevelForArea}`);
    if (FUNCTIONS.MISSIONS.IS_NEXT_MISSION_AVAILABLE()) $("#IS_MISSION_AVAILABLE").html(`${language[APP.LANG].MISC.AvailableMission}`);
    else $("#MaxPOSLVL").html("");
    if ($('#DIV-INVENTORY').is(":visible")) {
        $("#DIV-REWARDS").hide();
        $("#DIV-COMBAT").hide();
    }
    if (Game.isInFight == true) FUNCTIONS.COMBAT.UpdateCombat();
    if ($('#DIV-STATS').is(":visible")) UPDATE_STATS();
    FUNCTIONS.PALETTE.RESET_THEME(2);
    FUNCTIONS.MISSIONS.GENERATE_MISSION_VIEW();
};

const SET_CURRENT_TASK = function () {
    if (Game.MissionStarted[0]) {
        if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 1) {
            if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].OBJECTIVE - Game.MissionStarted[2] === 1) $("#PLAYER-ETA").html("<div class='pw inline label'><i class='far fa-dot-circle'></i> " + language[APP.LANG].TASKS.Mission[0] + "</div>" + language[APP.LANG].TASKS.Mission[2].split("[COUNT]").join(GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].OBJECTIVE - Game.MissionStarted[2]).split("[LOCATION]").join(GLOBALS.LOCATIONS[GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].LOCATION][0]).split("[CLASS]").join(`<span class='Enemy6'>${GLOBALS.THREATS[6]}</span>`));
            else $("#PLAYER-ETA").html("<div class='pw inline label'><i class='far fa-dot-circle'></i> " + language[APP.LANG].TASKS.Mission[0] + "</div>" + language[APP.LANG].TASKS.Mission[1].split("[COUNT]").join(GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].OBJECTIVE - Game.MissionStarted[2]).split("[LOCATION]").join(GLOBALS.LOCATIONS[GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].LOCATION][0]));
        }
        else if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) $("#PLAYER-ETA").html("<div class='pw inline label'><i class='far fa-bullseye'></i> " + language[APP.LANG].TASKS.Dungeon[0] + "</div>" + language[APP.LANG].TASKS.Dungeon[1].split("[COUNT]").join(GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].OBJECTIVE - Game.MissionStarted[2]).split("[LOCATION]").join(GLOBALS.LOCATIONS[GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].LOCATION][0]));
    } else $("#PLAYER-ETA").html("<div class='pw inline label'><i class='fas fa-map-marked-alt icon'></i> " + language[APP.LANG].TASKS.Exploration[0] + "</div>" + language[APP.LANG].TASKS.Exploration[1].split("[LOCATION]").join(language[APP.LANG].LOCATIONS[Game.Location]));
};

export const DEFINE_BODY_ATTRIBUTES = function () {
    $("body").attr("style", `--ALPHA: ${Game.Theme};`);
};

export const UPDATE_STATS = function () {
    let DEATHS = Game.Loses == 0 ? 1 : Game.Loses;

    // GENERAL
    $("#namestat").html("<img class='pw mini image' src='images/avatars/avatar (" + Game.Avatar + ").png'><span style='color: rgb(" + Game.Theme + ");'>" + Game.username + "</span>");
    $("#playtimestat").html(FUNCTIONS.MAIN.toHHMMSS(Game.PlayTime));
    $("#Levelstat").html("<span class='pw alpha'>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Level, 0) + "</span>/" + APP.MaxLevel);
    $("#Classstat").html(Game.class);
    $("#Scorestat").html("<span class='pw alpha'><i class='fad fa-dice-d20'></i>" + FUNCTIONS.MAIN.FORMAT_NUMBER(APP.Ranking, 0) + "</span>/" + (APP.MaxScore * 10));
    $("#Difficultystat").html(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.DIMENSION_MULTIPLIERS[3], 3));
    $("#Rankstat").html(APP.LEADERBOARD_POSITION + "/" + APP.LastId);
    $("#Ratiostat").html(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Wins / DEATHS, 4));
    $("#Versionstat").html("v" + GLOBALS.VERSION);
    $("#fortressstat").html(Game.DungeonsCleared);
    $("#lifestat").html("<i class='pw red fas fa-heart'></i>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.round(APP.CoreBaseLife / (APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1])), 1) + " <span class='pw inline label'>+" + FUNCTIONS.MAIN.FORMAT_NUMBER(APP.CoreBaseLife - Math.round(APP.CoreBaseLife / (APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1])), 1) + "</span>");
    $("#powerstat").html("<i class='pw blue fas fa-sword'></i>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.round(APP.WeaponsPower / (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0])), 1) + " <span class='pw inline label'>+" + FUNCTIONS.MAIN.FORMAT_NUMBER(APP.WeaponsPower - Math.round(APP.WeaponsPower / (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0])), 1) + "</span>");

    // WEAPONS
    $("#mainweaponstat").html("<i class='pw blue fas fa-sword'></i>" + (Game.Weapons.Main[4] - Game.WeaponUpgrades.Main) + "<span class='pw inline label'>+" + Game.WeaponUpgrades.Main + "</span>");
    $("#specialweaponstat").html("<i class='pw blue fas fa-sword'></i>" + (Game.Weapons.Special[4] - Game.WeaponUpgrades.Special) + "<span class='pw inline label'>+" + Game.WeaponUpgrades.Special + "</span>");

    // ARMOR
    $("#armor1stat").html("<i class='pw red fas fa-heart'></i>" + (Game.Armors[1][3] - Game.ArmorUpgrades[1]) + "<span class='pw inline label'>+" + Game.ArmorUpgrades[1] + "</span>");
    if (Game.Armors[2][0]) $("#armor2stat").html("<i class='pw red fas fa-heart'></i>" + (Game.Armors[2][3] - Game.ArmorUpgrades[2]) + "<span class='pw inline label'>+" + Game.ArmorUpgrades[2] + "</span>");
    else $("#armor2stat").html("Not yet unlocked.");
    if (Game.Armors[3][0]) $("#armor3stat").html("<i class='pw red fas fa-heart'></i>" + (Game.Armors[3][3] - Game.ArmorUpgrades[3]) + "<span class='pw inline label'>+" + Game.ArmorUpgrades[3] + "</span>");
    else $("#armor3stat").html("Not yet unlocked.");
    if (Game.Armors[4][0]) $("#armor4stat").html("<i class='pw red fas fa-heart'></i>" + (Game.Armors[4][3] - Game.ArmorUpgrades[4]) + "<span class='pw inline label'>+" + Game.ArmorUpgrades[4] + "</span>");
    else $("#armor4stat").html("Not yet unlocked.");

    // LOCATIONS
    $("#locations-stats").html("");
    for (var L in GLOBALS.LOCATIONS) $("#locations-stats").append(`<div class="pw dark horizontal equal segments" id="defeatloc${L}"><div class='pw segment text-right'>${GLOBALS.LOCATIONS[L][0]}</div><div class='pw segment text-left'>${language[APP.LANG].STATS.Defeated.split("[COUNT]").join(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.DefeatedByLocation[L], 1))}</div></div>`);
    // KILLS
    for (var D in Game.Defeated) {
        if (D != 0) $("#Defeat" + D).html(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Defeated[D], "auto"));
    }
    $("#Killstat").html(Game.Wins);
    $("#Deathstat").html(Game.Loses);
};

const GET_EQUIPMENT_RANK = function() {
    let RANKING = Game.Weapons.Main[3] + Game.Weapons.Special[3];
    let divisor = 2;
    for (let armor = 1; armor < 5; armor++) {
        if (Game.Armors[armor][0]) {
            Game.Armors[armor][4] = Number(Game.Armors[armor][4]);
            APP.CoreBaseLife += Game.Armors[armor][3];
            APP.TotalArmorsUpgrades += Game.ArmorUpgrades[armor];
            RANKING += Game.Armors[armor][4];
            divisor++;
            if (typeof (Game.Armors[armor][5]) === 'undefined') Game.Armors[armor][5] = 0;
        }
    }
    APP.Ranking = Math.floor((RANKING / divisor) * 10);
};