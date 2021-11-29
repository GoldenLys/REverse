/* Ideas & Future updates :

1     | Divine items with unique skills. (Old divines will now be legendaries)
2     | Guild : Gain fame in the guild to obtain a cool new rank badge and also to earn some more money.
3     | Shop : Selling the best weapons & armors of the game, unique-class items would have skills embedded into them
4 [?] | Bank : May be put as a guild feature; put your money in a safe so that you don't lose it when dying.
5 [?] | Crafting system for Gems Weapons, Armors and maybe Relics under some circumstances.
6 [?] | Adding achievements
7 [?] | Titles : Unlocking titles under certains conditions, example: kill 1k mobs in a fortress to unlock the "HERO" title.
8     | Bug testing the game

[?] Features listed with a ? mark may be abandonned/modified in future updates

*/

var APP = {
    WelcomeData: [1, "Neo", "None"],
    codes: {},
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
    Leader: 0,
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
    LANG: "EN"
};

$(document).ready(function () {
    if (GLOBALS.BETA) GLOBALS.VERSION = `${GLOBALS.VERSION} BETA ${GLOBALS.BETA}`;
    if (location.href.match(/(:5500).*/)) GLOBALS.VERSION = "dev";
    document.title = GLOBALS.NAME;
    $("#site-name").html(GLOBALS.NAME + "<span class='sub'>" + GLOBALS.VERSION + "</span>");
    ResetTheme(0);
    if (localStorage.getItem("Alpha") !== null) load();
    SELECT_LANGUAGE();
    if (Game.username != "Default" && APP.LoggedIn == 0 && APP.Email != "DoNotLogin" && !$("#LOGIN-NOTICE").hasClass("active") && GLOBALS.VERSION != "dev") LOGIN("RETURN");
    if (Game.username != "Default") {
        $("#GAME").show();
        $("#INTRODUCTION").hide();
        $(".footer").show();
        UpdateEngine();
        GenMissions();
        CHECK_EQUIPMENT();
        WP_UPDATE();
    }
    Game.isInFight = 0;
    APP.MIND_CONTROL[1] = 0;
    setInterval(function () {
        if (Game.config[5] === 1) MIND_CONTROL();
    }, 1750);
    setInterval(UpdateEngine, 1000);
    Game.xp[1] = CalcEXP(Game.Level);
    CompleteMission();
    DYNAMICS();
    filter(0);
    $('.pw.checkbox').each(function () {
        if ($(this).attr("data-id") < 5 || $(this).attr("data-id") == 11) {
            let TOGGLE = Game.config[$(this).attr("data-id")] == 1 ? "checked" : "unchecked";
            $(this).attr("data-check", TOGGLE);
        } else {
            let TOGGLE = Game.AutoRemove[$(this).attr("data-id") - 5] == 1 ? "checked" : "unchecked";
            $(this).attr("data-check", TOGGLE);
        }
    });
    $("#VERSION_TEXT").html("AlphaRPG v" + GLOBALS.VERSION);
    $("#avatar").attr("src", `images/avatars/avatar${Game.Avatar}.jpg`);
    $("#avatar2").attr("src", `images/avatars/avatar${Game.Avatar}.jpg`);
    GenArmors();
    GenWeapons();
    ResetLeaderBoard();
    CLOSE_MENUS();
    UpdateUI();
});

const UpdateEngine = function () {
    UpdateGame();
    Game.PlayTime++;
    if (Game.Level >= APP.MaxLevel && APP.LastMission >= APP.TotalMissions) APP.ScoreModeEnabled = 1;
    else APP.ScoreModeEnabled = 0;
    if (typeof (GLOBALS.ENEMIES_NAMES[Game.Location][Game.Enemy[0]]) === 'undefined' && Game.Enemy[0] != "boss") Game.Enemy[0] = 0;
    if (Game.Level == 1 && !Game.MissionStarted[0] && Game.MissionsCompleted[0] == 0 && Game.config[3] == 1 && $("#INTRODUCTION").is(":hidden") && !$("#LOGIN-NOTICE").hasClass("active")) mission(0);
    if (Game.isInFight == 1) $("#EnemySprite").html("<img class='pw medium image' src='images/Monsters/" + Game.Location + "-" + Game.Enemy[0] + ".png'>");
    if (APP.CoreLife > APP.CoreBaseLife) {
        APP.CoreLife = APP.CoreBaseLife;
        UpdateUI();
    }
    if (Game.isInFight != 2 && APP.CoreLife == null || Game.Enemy[5] == null || Game.Enemy[5] == 0) {
        Game.isInFight = 0;
        UpdateGame();
    }
    if (Game.MissionStarted[0] && GLOBALS.MISSIONS[Game.MissionStarted[1]][3] != 2 && Game.Level > GLOBALS.LOCATIONS[GLOBALS.MISSIONS[Game.MissionStarted[1]][8]][2]) {
        Game.Level = GLOBALS.LOCATIONS[GLOBALS.MISSIONS[Game.MissionStarted[1]][8]][2];
        UpdateGame();
    }
    if (APP.lastCloudSave < 180) APP.lastCloudSave++;
    else SendStats();
    if (Game.LastEscape > 1) {
        Game.LastEscape--;
        $("#NextRetreat").html(`${language[APP.LANG].MISC.Retreat.split("[COUNT]").join(toHHMMSS(Game.LastEscape))}`);
    } else $("#NextRetreat").html("");
    if (APP.LastCover > 1) {
        APP.LastCover--;
        $("#NextCover").html(`${language[APP.LANG].MISC.Cover.split("[COUNT]").join(toHHMMSS(APP.LastCover))}`);
    } else $("#NextCover").html("");
    if (Game.xp[0] < 0) Game.xp[0] = 0;
    for (let UPC = 0; UPC < 4; UPC++) {
        if (typeof (Game.MaxUPC[UPC]) === 'undefined') Game.MaxUPC[UPC] = 0;
    }
    if (Game.username == null || Game.username == "" || Game.username == " " || Game.username == "_" || Game.username.length < 3) {
        localStorage.clear();
        Backup = "Default";
        Game.username = Backup;
    } else Game.username = Game.username.replace(/[^a-zA-Z0-9]/g, '_');
    if (Backup !== "Default" && Backup !== Game.username) Game.username = Backup;
    if (typeof (Game.xp[2]) === 'undefined') Game.xp[2] = 1;
    let LEVEL = APP.ScoreModeEnabled == 0 ? language[APP.LANG].MISC.Level + " " + fix(Game.Level, 0) : language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i>" + fix(APP.Ranking, 0);
    if (Game.Level < 1) {
        Game.Level = 1;
        Game.xp[0] = 0;
    }
    if (APP.ScoreModeEnabled == 0 && Game.Level < APP.MaxLevel) {
        if (Game.xp[0] >= Game.xp[1]) {
            Game.Level++;
            Game.xp[1] = CalcEXP(Game.Level);
        } else {
            if (Game.Level == GLOBALS.LOCATIONS[Game.Location][2]) Game.xp[0] = CalcEXP(Game.Level - 1);
            if (Game.xp[0] < CalcEXP(Game.Level - 1) && Game.Level > 1) Game.xp[0] = CalcEXP(Game.Level - 1);
        }
        Game.xp[1] = CalcEXP(Game.Level);
    }
    if (Game.Level > APP.MaxLevel) {
        Game.Level = APP.MaxLevel;
        if (APP.ScoreModeEnabled == 0 && Game.Level > GLOBALS.MISSIONS[APP.LastMission][2]) {
            Game.Level = GLOBALS.MISSIONS[APP.LastMission][2];
            if (Game.Level > GLOBALS.LOCATIONS[Game.Location][2]) Game.Level = GLOBALS.LOCATIONS[Game.Location][2];
        }
    }
    if (Game.Emp > 50) Game.Emp = 50;
    let ONLINEICON = "<i class='pw red far fa-circle'></i>";
    if (Game.username != "Default" && location.href.match(/(alpha.purplewizard.space).*/) && Game.username != "Default" && Game.username != null && APP.LoggedIn == 1 && APP.Email != "none") ONLINEICON = "<i class='pw alpha fas fa-circle'></i>";
    $("#PlayerID").html("<div class='pw alpha'>" + ONLINEICON + Game.username + " <span class='pw white inline label'>" + LEVEL + "</span></div>");
    $("#PlayerSprite").html("<img class='pw small image' src='images/avatars/avatar" + Game.Avatar + ".jpg'>");
    if (APP.ScoreModeEnabled == 0) {
        for (let ARMOR in Game.Armors) {
            if (Game.Armors[ARMOR] > Game.Level) {
                console.log("ERROR 001");
                ErrorArmor(ARMOR);
            }
        }
        if (Game.Weapons.Main[3] > Game.Level) {
            console.log("ERROR 002");
            ErrorArmor(5);
        }
        if (Game.Weapons.Special[3] > Game.Level) {
            console.log("ERROR 003");
            ErrorArmor(6);
        }
    } else {
        for (let ARMOR in Game.Armors) {
            if (Game.Armors[ARMOR] > APP.MaxScore) {
                console.log("ERROR 004");
                ErrorArmor(ARMOR);
            }
        }
        if (Game.Weapons.Main[3] > APP.MaxScore) {
            console.log("ERROR 005");
            ErrorArmor(5);
        }
        if (Game.Weapons.Special[3] > APP.MaxScore) {
            console.log("ERROR 006");
            ErrorArmor(6);
        }
    }
    Game.Armors[2][0] = Game.Level >= 10 ? true : false;
    Game.Armors[3][0] = Game.Level >= 20 ? true : false;
    Game.Armors[4][0] = Game.Level >= 30 ? true : false;
    if (Game.isInFight == 1 && APP.CoreLife <= 0) LoseFight();
    else if (Game.isInFight == 1 && Game.Enemy[5] <= 0) WinFight();
    for (var I in Game.inventory) {
        if (I > Game.MaxInv) Game.inventory.splice(I, 1);
        else if (APP.ScoreModeEnabled == 0 && Game.inventory[I].LEVEL > Game.Level) Game.inventory.splice(I, 1);
    }
};

const UpdateGame = function () {
    let counter = 0;
    for (var M in GLOBALS.MISSIONS) {
        if (GLOBALS.MISSIONS[M][3] != 2) counter++;
    }
    APP.TotalMissions = counter;
    if (Game.Dimension > 50) Game.Dimension = 50;
    let divisor = 0;
    APP.MaxLevel = 35;
    APP.MaxScore = (APP.MaxLevel + (Game.Dimension * 5) - 5);
    for (var D = 1; D < 7; D++) {
        if (Game.Defeated[D] == null) Game.Defeated[D] = 0;
    }
    Game.DIMENSION_MULTIPLIERS[0] = 0;
    Game.DIMENSION_MULTIPLIERS[1] = 0;
    for (let R in Game.RELICS) {
        if (Game.RELICS[R][1] == 1) Game.DIMENSION_MULTIPLIERS[0] += Game.RELICS[R][2];
        else Game.DIMENSION_MULTIPLIERS[0] += 0;
        if (Game.RELICS[R][1] == 2) Game.DIMENSION_MULTIPLIERS[1] += Game.RELICS[R][2];
        else Game.DIMENSION_MULTIPLIERS[1] += 0;
        if (Game.RELICS[R][1] == 4) APP.MaxScore += (Game.RELICS[R][2] / 10);
    }
    if (Game.isInFight == 1 && Game.class == "none") {
        Game.username = "Default";
        Backup = "Default";
        ResetTheme(1);
        save();
    }
    Game.DIMENSION_MULTIPLIERS[2] = (Game.Dimension * 0.03) - 0.03; // EXPMULT
    Game.DIMENSION_MULTIPLIERS[3] = (Game.Dimension * 0.05) + 0.95; // DIFFICULTYMULT
    Backup = Object.freeze(Game.username);
    Game.xp[2] = Game.Upgrades[0] * 0.01 + 1;
    APP.PowerMult = Game.Upgrades[1] * 0.01 + 1;
    APP.LifeMult = Game.Upgrades[2] * 0.01 + 1;
    Game.MaxInv = (Game.Dimension * 2) + 18 + (Game.Upgrades[3] * 1);
    if (typeof (Game.MissionStarted[4]) === 'undefined') Game.MissionStarted[4] = 0;
    if (Game.isInFight == 0) {
        APP.CoreLife = APP.CoreBaseLife;
        GenEnemy();
    }
    APP.CoreBaseLife = 0;
    APP.TotalWeaponsUpgrades = 0;
    APP.TotalArmorsUpgrades = 0;
    APP.Ranking = 0;
    APP.Ranking += Game.Weapons.Main[3] + Game.Weapons.Special[3];
    APP.TotalWeaponsUpgrades += Game.WeaponUpgrades.Main + Game.WeaponUpgrades.Special;
    divisor = 2;
    for (let armor = 1; armor < 5; armor++) {
        if (Game.Armors[armor][0]) {
            APP.CoreBaseLife += Game.Armors[armor][3];
            APP.TotalArmorsUpgrades += Game.ArmorUpgrades[armor];
            APP.Ranking += Game.Armors[armor][4];
            divisor++;
            if (typeof (Game.Armors[armor][5]) === 'undefined') Game.Armors[armor][5] = 0;
        }
    }
    if (LATEST_LOCATION_UNLOCKED() !== "none" && APP.ScoreModeEnabled == 0 && !Game.MissionStarted[0] && Game.Level >= GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][2] && Game.username != "Default" && Game.isInFight == 1) {
        for (M in GLOBALS.MISSIONS) {
            if (Game.MissionsCompleted[M] == 0 && Game.MissionsCompleted[GLOBALS.MISSIONS[M][9]] == 1 && GLOBALS.MISSIONS[M][3] != 2 && Game.Level >= GLOBALS.MISSIONS[M][2]) {
                GenMissions();
                if (Game.config[3] == 1 && !$("#POPUP").hasClass("active")) mission(M);
            }
        }
    }
    APP.CoreBaseLife = Math.round(APP.CoreBaseLife * (APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1]));
    APP.WeaponsPower = Math.round(Game.Weapons.Main[4] * (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0]));
    APP.SpecialPower = Math.round((Game.Weapons.Main[4] + Game.Weapons.Special[4]) * (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0]));
    APP.Ranking = Math.floor((APP.Ranking / divisor) * 10);
    for (var M2 in GLOBALS.MISSIONS) {
        if (Game.MissionsCompleted[M2] == null) Game.MissionsCompleted[M2] = 0;
    }
    if (Game.MissionStarted[0]) Game.Location = GLOBALS.MISSIONS[Game.MissionStarted[1]][8];
    for (var IV in Game.inventory) {
        if (typeof Game.inventory[IV].name === "undefined" || typeof Game.inventory[IV].class === "undefined" || typeof Game.inventory[IV].type === "undefined") {
            RemoveItem(IV);
            console.log("ERROR 007");
        }
        if (Game.Level < 10 && Game.inventory[IV].class == 'Uncommon') {
            RemoveItem(IV);
            console.log("ERROR 008");
        }
        if (Game.Level < 15 && Game.inventory[IV].class == 'Rare') {
            RemoveItem(IV);
            console.log("ERROR 009");
        }
        if (Game.Level < 20 && Game.inventory[IV].class == 'Epic') {
            RemoveItem(IV);
            console.log("ERROR 010");
        }
        if (Game.Level < 30 && Game.inventory[IV].class == 'Exotic' || Game.Level < 30 && Game.inventory[IV].class == 'Legendary') {
            RemoveItem(IV);
            console.log("ERROR 011");
        }
        if (Game.inventory[IV].type == 0) {
            RemoveItem(IV);
            console.log("ERROR 012");
        }
        if (IV >= Game.MaxInv) RemoveItem(IV);
        if (typeof Game.inventory[IV] !== 'undefined') {
            if (Game.AutoRemove[0] == 1 && Game.inventory[IV].class == "Normal") RemoveItem(IV);
            else if (Game.AutoRemove[1] == 1 && Game.inventory[IV].class == "Common") RemoveItem(IV);
            else if (Game.AutoRemove[2] == 1 && Game.inventory[IV].class == "Uncommon") RemoveItem(IV);
            else if (Game.AutoRemove[3] == 1 && Game.inventory[IV].class == "Rare") RemoveItem(IV);
            else if (Game.AutoRemove[4] == 1 && Game.inventory[IV].class == "Epic") RemoveItem(IV);
            else if (Game.AutoRemove[5] == 1 && Game.inventory[IV].class == "Exotic") RemoveItem(IV);
        }
    }
    if (!Game.MissionStarted[0] && (Game.Location == 11 || Game.Location == 17)) Game.Location--;
    UpdateUI();
    save();
};

const UpdateUI = function () {
    if (((Game.xp[2] + Game.DIMENSION_MULTIPLIERS[2]) - Math.floor(Game.xp[2] + Game.DIMENSION_MULTIPLIERS[2])) < 1) $("#XPMULTVAL").html("+" + Game.Upgrades[0] + "%");
    else $("#XPMULTVAL").html("+" + Game.Upgrades[0] + "%");
    if (((APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0]) - Math.floor(APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0])) < 1) $("#POWERMULTVAL").html("+" + Game.Upgrades[1] + "%");
    else $("#POWERMULTVAL").html("+" + Game.Upgrades[1] + "%");
    if (((APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1]) - Math.floor(APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1])) < 1) $("#LIFEMULTVAL").html("+" + Game.Upgrades[2] + "%");
    else $("#LIFEMULTVAL").html("+" + Game.Upgrades[2] + "%");
    $("#INVUPGVAL").html(Game.MaxInv);
    $("#ShardsNumber").html("<i class='pw blue fal fa-dna'></i>" + fix(Game.Shards, 5) + "</span> Dimensional Fragments");
    if (Game.username == "Default") {
        $("#menu").hide();
        $("#GAME").hide();
        $("#INTRODUCTION").show();
        $(".footer").hide();
        Game.isInFight = 3;
    }
    $("#PlayerXP .progress-bar").attr("style", "max-width:" + GetEXPPercent() + "%;");
    let WTText = Game.Dimension > 1 ? "Dimension <i class='globe icon'></i> " + Game.Dimension + "<br>" : "";
    $("#LABEL_SHARDS").html(fix(Game.Shards, 5));
    if (APP.ScoreModeEnabled == 0) {
        $("#DimensionID").html(WTText);
        $("#PlayerXP").show();
        $("#LABEL_EXP").html("<span class='pw alpha bold'>" + fix(Game.xp[0], "auto") + "</span>/" + fix(Game.xp[1], "auto") + " EXP");
    } else $("#DimensionID").html(WTText);
    if (Game.Level >= APP.MaxLevel) {
        $("#PlayerXP").hide();
        $("#LABEL_EXP").html("Max Level");
    }
    if (Game.Level >= APP.MaxLevel && APP.Ranking >= (((30 + (Game.Dimension * 5)) * 10) - 5) && APP.LastMission >= APP.TotalMissions) {
        $("#WTBTN").show();
        $("#WTUNLOCK").html("Dimensional Rift <i class='globe icon'></i>" + (Game.Dimension + 1) + " is opened.");
    } else {
        $("#WTBTN").hide();
        $("#WTUNLOCK").html("");
    }
    var shards = Game.Level < APP.MaxLevel ? "0" : Math.round(APP.Ranking / 10 - 30);
    var completedstory = APP.LastMission == APP.TotalMissions ? "<span class='pw alpha'>Yes</span>" : "<span class='pw red'>Not Yet</span>";
    $("#WTShards").html("Score Required : <span class='pw alpha'><i class='fad fa-dice-d20'></i>" + (((30 + (Game.Dimension * 5)) * 10) - 5) + "</span><br>Story completed : " + completedstory + "<br>Fragments reward : <span class='pw alpha'><i class='fal fa-dna'></i>" + shards + "</span>");
    $("#CurrWT").html("Current Dimension : <span class='pw alpha'><i class='globe icon'></i>" + Game.Dimension + "</span>");
    let UPGRADES_IDs = ["XPMULTPRICE", "POWERMULTPRICE", "LIFEMULTPRICE", "INVUPGPRICE"];
    let UPGRADE_TEXT = [];
    let CAN_AFFORD_UPGRADE = [];
    for (let UPGRADE = 0; UPGRADE < 4; UPGRADE++) {
        CAN_AFFORD_UPGRADE[UPGRADE] = GetMultPrice(UPGRADE) > Game.Shards ? "pw red" : "pw green";
        if (GetMultPrice(UPGRADE) > Game.Shards) $(`#UPGRADE_${UPGRADE}`).hide();
        else $(`#UPGRADE_${UPGRADE}`).show();
        if (GetMultPrice(UPGRADE) === Infinity) UPGRADE_TEXT[UPGRADE] = "MAXED OUT";
        else UPGRADE_TEXT[UPGRADE] = `<i class='fal fa-dna'></i>${GetMultPrice(UPGRADE)}`;
        $(`#${UPGRADES_IDs[UPGRADE]}`).html(`<span class="${CAN_AFFORD_UPGRADE[UPGRADE]}">${UPGRADE_TEXT[UPGRADE]}</span>`);
    }
    $("#TOPNEXT").html((APP.LEADERBOARD.PAGE + 1) + " <i class='large arrow alternate circle right outline icon'></i>");
    $("#TOPPREVIOUS").html("<i class='large arrow alternate circle left outline icon'></i> " + (APP.LEADERBOARD.PAGE - 1));
    if (APP.LEADERBOARD.RANGES[1] + 1 <= APP.LastId) $("#TOPNEXT").attr('class', 'pw button');
    else $("#TOPNEXT").attr('class', 'pw button disabled');
    if (APP.LEADERBOARD.PAGE == 1) $("#TOPPREVIOUS").attr('class', 'pw button disabled');
    else $("#TOPPREVIOUS").attr('class', 'pw button');
    if (((Game.Level - 5) * 10) >= APP.Ranking) $("#LowScore").html("Using low level armor, upgrade your equipment.");
    else $("#LowScore").html("");
    var CompletedMissions = 0;
    for (var M in GLOBALS.MISSIONS) {
        if (GLOBALS.MISSIONS[M][3] != 2 && Game.MissionsCompleted[M] == 1) CompletedMissions++;
    }
    if (Game.isInFight != 2 || Game.isInFight != 3) APP.LastMission = CompletedMissions;
    SET_CURRENT_TASK();
    if ($('#DIV-COMBAT').is(":visible")) $("#DIV-REWARDS").hide();
    if (APP.LoggedIn == 1) $("#CloudTimer").html("Last cloud sync " + toHHMMSS(APP.lastCloudSave) + " ago, as <span class='pw alpha'>" + Game.username + "</span>.");
    else $("#CloudTimer").html("Cloud sync disabled.");
    $("#LABEL_INVENTORY").html("<i class='fas fa-sack'></i> " + Game.inventory.length + "/" + Game.MaxInv);
    $("#LABEL_CASH").html(fix(Game.Cash, 1));
    $("#mcount").html("Missions completed (" + CompletedMissions + "/" + APP.TotalMissions + ")");
    if (Game.Level >= GLOBALS.LOCATIONS[Game.Location][2] && APP.ScoreModeEnabled == 0 && !Game.MissionStarted[0]) $("#MaxPOSLVL").html(`${language[APP.LANG].MISC.MaxLevelForArea}`);
    else $("#MaxPOSLVL").html("");
    if ($('#DIV-INVENTORY').is(":visible")) {
        $("#DIV-REWARDS").hide();
        $("#DIV-COMBAT").hide();
    }
    if (Game.isInFight == 1) {
        $("#CLOSE_REWARDS").hide();
        $("#BUTTONS_COMBAT").show();
        UpdateCombat();
    }

    if ($('#DIV-STATS').is(":visible")) UPDATE_STATS();
    ResetTheme(2);
};

const SET_CURRENT_TASK = function () {
    if (Game.MissionStarted[0]) {
        if (GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 1) $("#PLAYER-ETA").html("<div class='pw inline label'><i class='far fa-dot-circle'></i> " + language[APP.LANG].TASKS.Mission[0] + "</div>" + language[APP.LANG].TASKS.Mission[1].split("[COUNT]").join(GLOBALS.MISSIONS[Game.MissionStarted[1]][4] - Game.MissionStarted[2]).split("[LOCATION]").join(GLOBALS.LOCATIONS[GLOBALS.MISSIONS[Game.MissionStarted[1]][8]][0]));
        else if (GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2) $("#PLAYER-ETA").html("<div class='pw inline label'><i class='far fa-bullseye'></i> " + language[APP.LANG].TASKS.Fortress[0] + "</div>" + language[APP.LANG].TASKS.Fortress[1].split("[COUNT]").join(GLOBALS.MISSIONS[Game.MissionStarted[1]][4] - Game.MissionStarted[2]).split("[LOCATION]").join(GLOBALS.LOCATIONS[GLOBALS.MISSIONS[Game.MissionStarted[1]][8]][0]));
    } else $("#PLAYER-ETA").html("<div class='pw inline label'><i class='fas fa-map-marked-alt icon'></i> " + language[APP.LANG].TASKS.Exploration[0] + "</div>" + language[APP.LANG].TASKS.Exploration[1].split("[LOCATION]").join(language[APP.LANG].LOCATIONS[Game.Location]));
};

const DEFINE_BODY_ATTRIBUTES = function () {
    $("#BACKGROUND").attr("style", `background: center / cover no-repeat url("../images/Locations/${GLOBALS.LOCATIONS[Game.Location][6]}");`);
    $("body").attr("style", `--ALPHA: ${Game.Theme};`);
};