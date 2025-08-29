import FUNCTIONS from './index.js';
window.HEALING_TIMER;
window.HEALING_ANIMATION;
window.RESPAWN_TIMER = [0, false];

const HEALING = function () {
    APP.NextHeal = Game.Enemy[1] >= 6 ? 3 : 5;
    let config = {
        heals: [65, 85],
        default: [40, 65],
        luck: _.random(1, 100)
    };
    CHECK_ENEMY();
    if (!Game.isInFight) Game.isInFight = true;
    if (APP.isCovered) {
        if (APP.CoreLife < APP.CoreBaseLife) {
            if (_.inRange(config.luck, 0, 16)) config.default = config.heals;
            let healValue = _.random((APP.WeaponsPower * config.default[0]), (APP.WeaponsPower * config.default[1])) / 100;
            APP.CoreLife = Math.min(APP.CoreLife + healValue, APP.CoreBaseLife);
            let text = config.luck <= 15 ? `+ <span class="pw green">${FUNCTIONS.MAIN.FORMAT_NUMBER(healValue, 0)}</span>` : `+ ${FUNCTIONS.MAIN.FORMAT_NUMBER(healValue, 0)}`;
            if (healValue < 1) text = "MISSED";
            $("#EnemyDamage").html("").hide();
            $("#PlayerDamage").html(text).show();
        } else {
            APP.CoreLife = APP.CoreBaseLife;
            APP.isCovered = false;
            HEALING();
        }
    } else {
        APP.isCovered = false;
        if (APP.LastCover === 0) APP.LastCover = 5;
        clearInterval(window.HEALING_TIMER);
        clearInterval(window.HEALING_ANIMATION);
        $("#PlayerDamage").html("").hide();
        $("#cover-btn").html("<i class='fas fa-shield'></i>" + language[APP.LANG].ACTIONS.Cover);
    }
    FUNCTIONS.APP.UpdateGame();
};

const HEALING_TEXT = function () {
    $("#cover-btn").html(`${language[APP.LANG].MISC.Recovering}... (<span class='pw yellow'>${APP.NextHeal}s</span>)`);
    if (APP.NextHeal > 0) APP.NextHeal--;
};

export const TAKE_COVER = function () {
    if (!APP.isCovered && APP.CoreLife < APP.CoreBaseLife && APP.LastCover == 0) {
        APP.isCovered = true;
        HEALING();
        HEALING_TEXT();
        let HEALING_TIME = Game.Enemy[1] >= 6 ? 3000 : 5000;
        window.HEALING_TIMER = setInterval(HEALING, HEALING_TIME);
        window.HEALING_ANIMATION = setInterval(HEALING_TEXT, 1000);
    } else {
        APP.isCovered = false;
        HEALING();
    }
};

export const MAIN_ATTACK = function () {
    FUNCTIONS.INVENTORY.CHECK_EQUIPMENT();
    FUNCTIONS.INVENTORY.GenInventory();
    CHECK_ENEMY();
    if (!Game.isInFight) Game.isInFight = true;
    if (APP.isCovered) {
        APP.isCovered = false;
        HEALING();
    }
    var luck = _.random(1, 100);
    var rPlayerPower = _.random((APP.WeaponsPower * 85), APP.WeaponsPower * 100) / 100;
    if (luck <= _.random(6, 10)) rPlayerPower = APP.WeaponsPower * 1.15;
    var EDamage = "-" + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.round(rPlayerPower), 1);
    Game.Enemy[5] = Math.floor(Game.Enemy[5] - rPlayerPower);
    var rEnemyPower = _.random((Game.Enemy[3] * 65), Game.Enemy[3] * 100) / 100;
    if (luck >= 90) rEnemyPower = 0;
    var DAMAGES = rEnemyPower > 0 ? "-" + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.round(rEnemyPower), 1) : language[APP.LANG].MISC.Missed;
    APP.CoreLife -= rEnemyPower;
    $("#EnemyDamage").html(EDamage).show();
    $("#PlayerDamage").html(DAMAGES).show();
    if (Game.isInFight && APP.CoreLife <= 0 && !RESPAWN_TIMER[1]) LoseFight();
    else if (Game.isInFight && Game.Enemy[5] <= 0) WinFight();
    FUNCTIONS.APP.UpdateGame();
};

export const SPECIAL_ATTACK = function () {
    FUNCTIONS.INVENTORY.CHECK_EQUIPMENT();
    FUNCTIONS.INVENTORY.GenInventory();
    CHECK_ENEMY();
    if (!Game.isInFight) Game.isInFight = true;
    if (APP.isCovered) {
        APP.isCovered = false;
        HEALING();
    }
    if (Game.Emp > 0 && !$("#special-btn").hasClass("transparent")) {
        Game.Emp--;
        var luck = _.random(0, 100);
        var POWERRANGES = [0.75, 1];
        if (luck <= 10) POWERRANGES = [1, 1.5];
        var rPlayerPower = _.random(APP.SpecialPower * POWERRANGES[0], APP.SpecialPower * POWERRANGES[1]);
        Game.Enemy[5] = Math.floor(Game.Enemy[5] - rPlayerPower);
        var rEnemyPower = _.random(0, Game.Enemy[3]);
        APP.CoreLife -= rEnemyPower;
        $("#EnemyDamage").html("-" + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.round(rPlayerPower), "auto")).show();
        $("#PlayerDamage").html("-" + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.round(rEnemyPower), "auto")).show();
    }
    if (Game.isInFight && APP.CoreLife <= 0 && !RESPAWN_TIMER[1]) LoseFight();
    else if (Game.isInFight && Game.Enemy[5] <= 0) WinFight();
    FUNCTIONS.APP.UpdateGame();
};

export const RUN_AWAY = function () {
    if (APP.isCovered) {
        APP.isCovered = false;
        HEALING();
    }
    if (Game.LastEscape == 0) {
        if (Game.Level <= 5) Game.LastEscape = 15;
        else if (Game.Level <= 10) Game.LastEscape = 20;
        else if (Game.Level <= 15) Game.LastEscape = 25;
        else if (Game.Level <= 20) Game.LastEscape = 30;
        else if (Game.Level <= 25) Game.LastEscape = 35;
        else Game.LastEscape = 45;
        APP.CoreLife = APP.CoreBaseLife;
        Game.isInFight = false;
        FUNCTIONS.APP.UpdateGame();
        FUNCTIONS.EVENTS.DYNAMICS();
    }
};

export const CHECK_ENEMY = function () {
    if (APP.StoryView && $("#DIV-STORY").is(":hidden")) APP.StoryView = false;
    if (!Game.isInFight && RESPAWN_TIMER[1] == false && !APP.StoryView) {
        APP.CoreLife = APP.CoreBaseLife;
        Game.Enemy = FUNCTIONS.COMBAT.Create_Enemy();
        Game.isInFight = true;
        $("#EnemySprite").html(`<img class='pw medium image' style='${FUNCTIONS.COMBAT.Get_Monster_Image_Position_By_Name(Game.Enemy[0])}' src='${FUNCTIONS.COMBAT.Get_Monster_Image_By_Name(Game.Enemy[0])}'>`);
        $("#EnemyDamage").html("").hide();
        $("#PlayerDamage").html("").hide();
        FUNCTIONS.APP.UpdateGame();
    }
};

// WIN OR LOSE FIGHT
export const WinFight = function () {
    if (Game.MissionStarted[4] == 0 && Game.isInFight) {
        let LOOT_RATES = [50, 15, 45];
        if (Game.MissionStarted[0]) LOOT_RATES = GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 1 ? [5, 7.5, 10] : [40, 20, 30];
        let MIN_LOOT_QUALITY = ["", "Normal", "Common", "Uncommon", "Rare", "Epic", "Exotic", "Legendary"];
        let COUNTED_LOOTS = 0;
        let LOOTS = "";
        let EMP = "";
        let LEVELUP = "";
        let expGain = Game.Enemy[2] * 10 * ((Game.Enemy[1] * 15 / 100) + Game.xp[2]);
        if (!Game.MissionStarted[0]) {
            expGain = _.random(expGain * 0.65, expGain);
        } else {
            if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) expGain = _.random(expGain * 0.85, expGain * 1.05);
            else expGain = _.random(expGain * 0.85, expGain);
        }
        if (Game.MissionStarted[0] && Game.Level >= GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].LEVEL) expGain = 0;
        Game.Wins++;
        Game.Defeated[Game.Enemy[1]]++;
        Game.DefeatedByLocation[Game.Location]++;
        if (Game.MissionStarted[0]) Game.MissionStarted[2]++;
        if (Game.Level >= GLOBALS.LOCATIONS[Game.Location][2]) expGain = 0;
        if (Game.Level < APP.MaxLevel) {
            Game.xp[0] += Math.floor(expGain);
            if (Game.xp[0] >= Game.xp[1]) LEVELUP = "<div class='pw inline blue label'>" + language[APP.LANG].MISC.LevelUp + " (" + (Game.Level + 1) + ")</div>";
            FUNCTIONS.APP.UpdateGame();
        }
        // EMP LOOT CHANCE
        var ELOOTCHANCE = _.random(1, 100);
        let MINIMALRATE_EMP = Game.MissionStarted[0] ? 55 : 25;
        let EMPCount = _.random(1, 3);
        if (Game.MissionStarted[0] && GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) EMPCount = _.random(2, 4);
        let EMP_DROPS = (Game.Emp + EMPCount) > 50 ? (50 - Game.Emp) : EMPCount;
        if (ELOOTCHANCE <= MINIMALRATE_EMP && Game.Emp < 50) {
            Game.Emp += EMP_DROPS;
            let EMP_TEXT = EMP_DROPS > 1 ? "SpecialsDropped" : "SpecialDropped";
            EMP = "<div class='pw inline yellow label'><i class='pw yellow fas fa-swords'></i>" + language[APP.LANG].MISC[EMP_TEXT].split("[COUNT]").join(EMP_DROPS) + "</div>";
        }
        if (Game.Enemy[1] >= 6 && !Game.MissionStarted[0]) LOOT_RATES[0] = 1;
        // ARMOR / WEAPON LOOT CHANCE
        var LOOTCHANCE1 = _.random(0, 100);
        if (LOOTCHANCE1 > 0 && LOOTCHANCE1 <= LOOT_RATES[0]) {
            COUNTED_LOOTS++;
            if (APP.ScoreModeEnabled == 0) {
                if (Game.Level >= APP.Ranking) {
                    let LOOT_LEVEL = [_.random(Game.Level - 5, Game.Level + 1), _.random(Game.Level - 4, Game.Level + 2), _.random(Game.Level - 3, Game.Level + 2), _.random(Game.Level - 2, Game.Level + 3), _.random(Game.Level - 1, Game.Level + 4), Game.Level, Game.Level];
                    FUNCTIONS.INVENTORY.newItem(0, LOOT_LEVEL[Game.Enemy[1]], MIN_LOOT_QUALITY[Game.Enemy[1]]);
                } else FUNCTIONS.INVENTORY.newItem(0, _.random(APP.Ranking, APP.Ranking + 2), "Normal");
            } else {
                if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) {
                    if (Game.Enemy[1] >= 1) {
                        if (Game.Enemy[1] == 7) FUNCTIONS.INVENTORY.newItem(0, _.random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Legendary");
                        else FUNCTIONS.INVENTORY.newItem(0, _.random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Exotic");
                    }
                } else {
                    if (Game.Enemy[1] < 5) FUNCTIONS.INVENTORY.newItem(0, _.random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Rare");
                    else FUNCTIONS.INVENTORY.newItem(0, _.random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), MIN_LOOT_QUALITY[Game.Enemy[1]]);
                }
            }
            let ITEMID = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;
            if (ITEMID < Game.MaxInv) LOOTS = LOOTS + `<div data-itemid="${ITEMID}" class="pw message item">` + $(`#ITEM-${ITEMID}`).html() + "</div>";
        }
        // RELIC LOOT CHANCE
        var LOOTCHANCE2 = _.random(0, 100);
        if (LOOTCHANCE2 > 0 && LOOTCHANCE2 <= LOOT_RATES[1]) {
            COUNTED_LOOTS++;
            if (APP.ScoreModeEnabled == 0) {
                if (Game.Level > APP.Ranking) FUNCTIONS.INVENTORY.newItem("Relic", null, MIN_LOOT_QUALITY[Game.Enemy[1]]);
                else FUNCTIONS.INVENTORY.newItem("Relic", null, "Normal");
            } else {
                if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) {
                    if (Game.Enemy[1] == 7) FUNCTIONS.INVENTORY.newItem("Relic", null, "Legendary");
                    else FUNCTIONS.INVENTORY.newItem("Relic", null, "Exotic");
                } else {
                    if (Game.Enemy[1] <= 4) FUNCTIONS.INVENTORY.newItem("Relic", null, "Rare");
                    else FUNCTIONS.INVENTORY.newItem("Relic", null, MIN_LOOT_QUALITY[Game.Enemy[1]]);
                }
            }
            let ITEMID = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;
            if (ITEMID < Game.MaxInv) LOOTS = LOOTS + `<div data-itemid="${ITEMID}" class='pw message item'>` + $(`#ITEM-${ITEMID}`).html() + "</div>";
        }
        // GEM LOOT CHANCE
        var LOOTCHANCE3 = _.random(0, 100);
        if (LOOTCHANCE3 > 0 && LOOTCHANCE3 <= LOOT_RATES[2] && Game.Level >= 10) {
            COUNTED_LOOTS++;
            if (APP.ScoreModeEnabled == 0) FUNCTIONS.INVENTORY.newItem("Gem", null, MIN_LOOT_QUALITY[Game.Enemy[1]]);
            else {
                if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) {
                    if (Game.Enemy[1] >= 1) {
                        if (Game.Enemy[1] == 7) FUNCTIONS.INVENTORY.newItem("Gem", null, "Legendary");
                        else FUNCTIONS.INVENTORY.newItem("Gem", null, "Exotic");
                    }
                } else {
                    if (Game.Enemy[1] <= 3) FUNCTIONS.INVENTORY.newItem("Gem", null, "Uncommon");
                    else FUNCTIONS.INVENTORY.newItem("Gem", null, MIN_LOOT_QUALITY[Game.Enemy[1]]);
                }
            }
            let ITEMID = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;
            if (ITEMID < Game.MaxInv) LOOTS = LOOTS + `<div data-itemid="${ITEMID}" class='pw message item'>` + $(`#ITEM-${ITEMID}`).html() + "</div>";
        }
        let INVENTORYFULL = (Game.inventory.length - 1) < Game.MaxInv ? `` : `<div>${language[APP.LANG].MISC.InventoryFull}</div>`;
        LOOTS = LOOTS + INVENTORYFULL;
        if (COUNTED_LOOTS == 0) LOOTS = "<br>" + INVENTORYFULL;
        var ToAddCash = Math.floor(_.random(1 * (Game.Enemy[2] - 5), Game.Enemy[1] * Game.Enemy[2]));
        if (ToAddCash < 1) ToAddCash = 1;
        Game.Cash += ToAddCash;
        let ThreatLevel = GLOBALS.THREATS[Game.Enemy[1]];
        let DEATHS = Game.Loses == 0 ? 1 : Game.Loses;
        let EXP_TEXT = APP.ScoreModeEnabled == 0 ? "<div class='pw inline alpha label'>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.floor(expGain), "auto") + " " + language[APP.LANG].MISC.EXP + "</div>" : "";
        if (Game.Level >= GLOBALS.LOCATIONS[Game.Location][2] || Game.MissionStarted[0] && Game.Level >= GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].LEVEL) EXP_TEXT = "";
        let content = [
            `<span class='pw alpha'> ${language[APP.LANG].MISC.Defeated}</span>`.split("[ENEMY]").join(Game.Enemy[0]),
            `${language[APP.LANG].MISC.YouDefeated}
<br>${language[APP.LANG].MISC.CurrentRatio} ${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Wins / DEATHS, 4)}
<br><br>${EXP_TEXT} ${LEVELUP} ${EMP} <div class='pw inline green label'><i class='fas fa-dollar-sign pw green'></i>${ToAddCash}</div><div id='LOOTS' data-count="${COUNTED_LOOTS}">${LOOTS}</div>`
        ];
        if (Game.config[2] == 0 || Game.config[2] == 2 && COUNTED_LOOTS >= 1) FUNCTIONS.MAIN.POPUP(content[0], content[1].split("[COUNT]").join(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Defeated[Game.Enemy[1]], 1)).split("[CLASS]").join(`<span class='Enemy${Game.Enemy[1]}'>${ThreatLevel}</span>`), 0);
        else FUNCTIONS.MAIN.hideRewards();
        Game.isInFight = false;
    }
    /*$(".pw.message.item").click(".pw.red.button", function () {
        FUNCTIONS.MAIN.POPUP_CLOSE()
    });*/
};

export const LoseFight = function () {
    Game.Loses++;
    let EXP_DESC = APP.ScoreModeEnabled == 0 ? `${language[APP.LANG].MISC.LostExp}<br>` : "";
    Game.xp[0] = FUNCTIONS.MAIN.CalcEXP(Game.Level - 1);
    let DEFEATED = language[APP.LANG].MISC.DefeatedBy;
    if (Game.MissionStarted[0] && GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) {
        Game.MissionStarted = [false, 0, 0, 0, 0];
        FUNCTIONS.MAIN.NOTICE(`<span class='pw red'>${language[APP.LANG].MISC.DungeonFailed}</span>`, language[APP.LANG].MISC.DungeonFailedMessage);
        Game.Location = 0;
    } else {
        const defeatedBy = `<span class="Enemy${Game.Enemy[1]}">${GLOBALS.THREATS[Game.Enemy[1]]} ${Game.Enemy[0]}</span>`;
        FUNCTIONS.MAIN.NOTICE(`${DEFEATED.split("[ENEMY]").join(defeatedBy)}`, `${EXP_DESC}${language[APP.LANG].MISC.CurrentRatio} <span class='pw red'>${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Wins / Math.max(Game.Loses, 1), "auto")}</span>`);
    }
    $("#BUTTONS_COMBAT").hide();
    $("#RESPAWNING").show();
    RESPAWN_TIMER = [5, setTimeout(RESPAWN_TIMING, 1000)];
};

export const RESPAWN_TIMING = function () {
    if (RESPAWN_TIMER[0] > 0) {
        let TEXT = RESPAWN_TIMER[0] > 1 ? language[APP.LANG].MISC.Respawning.split("[COUNT]").join(RESPAWN_TIMER[0]).split("[SECONDS]").join(language[APP.LANG].MISC.Seconds) : language[APP.LANG].MISC.Respawning.split("[COUNT]").join(RESPAWN_TIMER[0]).split("[SECONDS]").join(language[APP.LANG].MISC.Second);
        $("#BUTTONS_COMBAT").hide();
        $("#RESPAWNING").show();
        $("#RESPAWN_TEXT").html(`${TEXT}`);
        RESPAWN_TIMER[0]--;
        RESPAWN_TIMER[1] = setTimeout(RESPAWN_TIMING, 1000);
    } else if (RESPAWN_TIMER[0] === 0) {
        clearTimeout(RESPAWN_TIMER[1]);
        RESPAWN_TIMER[1] = false
        APP.CoreLife = APP.CoreBaseLife;
        Game.isInFight = false;
        $("#BUTTONS_COMBAT").show();
        $("#RESPAWNING").hide();
        FUNCTIONS.MAIN.hideRewards();
        FUNCTIONS.APP.UpdateGame();
        UpdateCombat();
    }
};

export const UpdateCombat = function () {
    let PLAYER_LIFE_COLOR = APP.CoreLife <= APP.CoreBaseLife / 2 ? " pw orange" : "pw green";
    let ENEMY_LIFE_COLOR = Game.Enemy[5] < Game.Enemy[4] / 2 ? " pw orange" : " pw green";
    if (APP.CoreLife <= Game.Enemy[3]) PLAYER_LIFE_COLOR = " pw red";
    if (Game.Enemy[5] < Game.Enemy[4] / 3) ENEMY_LIFE_COLOR = " pw red";
    $("#EnemyTitle").html(`<span class='Enemy${Game.Enemy[1]}'>${language[APP.LANG].FORMAT.ENEMIES.split("[NAME]").join(Game.Enemy[0]).split("[CLASS]").join(GLOBALS.THREATS[Game.Enemy[1]])}</span><span class='pw inline label level-number'>${APP.ScoreModeEnabled == 0 ? ` ${language[APP.LANG].MISC.Level} ` : ` ${language[APP.LANG].MISC.Score} <i class='fad fa-dice-d20'></i>`}  <span class="${GET_DIFFICULTY_COLOR(Game.Level, Math.round(Game.Enemy[2]))}"> ${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.ScoreModeEnabled == 0 ? Math.round(Game.Enemy[2]) : Math.floor(Game.Enemy[2] * 10), 0)}</span></span>`);
    $("#EnemyPower").html("<i class='pw blue fas fa-sword'></i> " + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Enemy[3], "auto"));
    $("#EnemyLife").html(`<i class='pw red fas fa-heart'></i> <span class='${ENEMY_LIFE_COLOR}'>${FUNCTIONS.MAIN.FORMAT_NUMBER(FUNCTIONS.MAIN.GetEnemyHPPercent(), "auto")}%</span> ${(location.href.match(/(:5500).*/)) ? "(" + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Enemy[5], 1) + ")" : ""}`);
    $("#PlayerLife").html(`<i class='pw red fas fa-heart'></i> <span class='${PLAYER_LIFE_COLOR}'>${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.CoreLife, "auto")}</span>/${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.CoreBaseLife, "auto")} `);
    $("#PlayerPower").html(`<i class='pw blue fas fa-sword'></i> ${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.WeaponsPower, "auto")} <span class='sub'>(<i class='pw yellow fas fa-swords'></i> ${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.SpecialPower, "auto")})</span>`);
    $("#special-btn").html(`<i class='fas fa-swords'></i> ${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Emp, 0)} ${Game.Emp > 1 ? language[APP.LANG].ACTIONS.Specials : language[APP.LANG].ACTIONS.Special}`).attr("class", Game.Emp < 1 ? "pw darkgrey button transparent" : "pw yellow button");
    $("#PLAYER_PERCENT").attr("style", `stroke-dashoffset: calc(455 - (455 * ${FUNCTIONS.MAIN.GetPlayerHPPercent()}) / 100)`);
    $("#ENEMY_PERCENT").attr("style", `stroke-dashoffset: calc(455 - (455 * ${FUNCTIONS.MAIN.GetEnemyHPPercent()}) / 100)`);
    //$("#PlayerSprite+h2").html(`${FUNCTIONS.MAIN.FORMAT_NUMBER(GetPlayerHPPercent(), 1)}<span>%</span>`).attr("class", PLAYER_LIFE_COLOR);
    //$("#EnemySprite+h2").html(`${FUNCTIONS.MAIN.FORMAT_NUMBER(GetEnemyHPPercent(), 1)}<span>%</span>`).attr("class", ENEMY_LIFE_COLOR);
};

// ENEMY GENERATION FUNCTION
export const Create_Enemy = function () {
    let ENEMY = [] //0.NAME, 1.CLASS, 2.LEVEL, 3.POWER, 4.LIFE, 5.CURRENTLIFE

    let EnemyLevel = 1;
    let BasePower = Math.round((APP.WeaponsPower - Game.WeaponUpgrades.Main / 2) / (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0]));
    if (BasePower < 10) BasePower = 10;
    let MULTIPLIERS = {
        LIFE: APP.ScoreModeEnabled === 0 ? [1.05, 1.15, 1.25, 1.5, 1.75, 2.0, 2.5] : [2, 2.5, 2.75, 3, 3.5, 4, 5],
        POWER: [
            APP.ScoreModeEnabled === 0 ? [0.9, 0.925, 0.95, 0.975, 0.985, 1, 1] : [1, 1, 1, 1, 1, 1, 1],
            APP.ScoreModeEnabled === 0 ? [1, 1, 1, 1.025, 1.05, 1.10, 1.15] : [1, 1, 1.05, 1.10, 1.15, 1.25, 1.5]
        ]
    };

    let EChance = APP.ScoreModeEnabled === 1 ? _.random(300, 700) : _.random(0, 700);
    if (APP.ScoreModeEnabled === 0 && !Game.MissionStarted[0]) EChance = _.random(0, 685);
    if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE === 2 && EChance < 450) EChance = _.random(450, 700);
    if (Game.MissionStarted[2] === GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].OBJECTIVE - 1) EChance = 700;

    // DEFINE ENEMY CLASS
    switch (true) {
        case _.inRange(EChance, 0, 300): // CLASS NORMAL
            ENEMY[1] = 1;
            EnemyLevel = APP.ScoreModeEnabled == 1 ? _.random(APP.Ranking - 5, APP.Ranking) : _.random((APP.Ranking * 0.85), APP.Ranking);
            break;
        case _.inRange(EChance, 300, 450): // CLASS ADVANCED
            ENEMY[1] = 2;
            EnemyLevel = APP.ScoreModeEnabled == 1 ? _.random(APP.Ranking - 2, APP.Ranking + 5) : _.random((APP.Ranking * 0.95), APP.Ranking);
            break;
        case _.inRange(EChance, 450, 600): // CLASS SUPERIOR
            ENEMY[1] = 3;
            EnemyLevel = APP.ScoreModeEnabled == 1 ? _.random(APP.Ranking - 1, APP.Ranking + 10) : _.random(APP.Ranking, APP.Ranking + 1);
            break;
        case _.inRange(EChance, 600, 650): // CLASS VETERAN
            ENEMY[1] = 4;
            EnemyLevel = APP.ScoreModeEnabled == 1 ? _.random(APP.Ranking + 5, APP.Ranking + 10) : _.random(APP.Ranking + 1, APP.Ranking + 2);
            break;
        case _.inRange(EChance, 650, 685): // CLASS ELITE
            ENEMY[1] = 5;
            EnemyLevel = APP.ScoreModeEnabled == 1 ? _.random(APP.Ranking + 10, APP.Ranking + 15) : _.random(APP.Ranking + 2, APP.Ranking + 3);
            break;
        case _.inRange(EChance, 685, 701) && Game.MissionStarted[0]: // CLASS MASTER OR LEGEND (40% CHANCE IN SCORE MODE)
            if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2 || Game.MissionStarted[2] > GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].OBJECTIVE - 2) {
                ENEMY[1] = 6;
                EnemyLevel = APP.ScoreModeEnabled == 1 ? _.random(APP.Ranking + 15, APP.Ranking + 20) : _.random(APP.Ranking + 3, APP.Ranking + 4);
                if (APP.Ranking > 0) EnemyLevel = _.random(APP.Ranking + 4, APP.Ranking + 6);
                if (APP.ScoreModeEnabled == 1 && _.random(1, 5) >= 4) {
                    EnemyLevel = _.random(APP.Ranking + 20, APP.Ranking + 30);
                    ENEMY[1] = 7;
                }
            }
            break;
    }
    if (EnemyLevel < 1) EnemyLevel = 1;
    EnemyLevel = EnemyLevel / 10;

    if (APP.ScoreModeEnabled == 0) {
        if (EnemyLevel < GLOBALS.LOCATIONS[Game.Location][1]) EnemyLevel = GLOBALS.LOCATIONS[Game.Location][1];
        if (EnemyLevel > GLOBALS.LOCATIONS[Game.Location][2]) EnemyLevel = GLOBALS.LOCATIONS[Game.Location][2];
        if (EnemyLevel > Game.Level + 20) EnemyLevel = Game.Level + 20;
        if (Game.MissionStarted[0] && EnemyLevel >= Game.Level + 2) EnemyLevel = Game.Level;
    }
    // DEFINE ENEMY LEVEL
    ENEMY[2] = FUNCTIONS.MAIN.FORMAT_NUMBER(EnemyLevel, "auto-round");
    // DEFINE ENEMY ATTACK POWER
    ENEMY[3] = Game.Level < 10 && ENEMY[1] >= 4 ? Math.round(_.random(BasePower * MULTIPLIERS.POWER[0][2], BasePower * MULTIPLIERS.POWER[1][ENEMY[1] - 1])) : Math.round(_.random(BasePower * MULTIPLIERS.POWER[0][ENEMY[1] - 1], BasePower * MULTIPLIERS.POWER[1][ENEMY[1] - 1]));
    // DEFINE ENEMY LIFE(5) & MAX LIFE(4)
    ENEMY[4] = Math.round(_.random(EnemyLevel * 10 * MULTIPLIERS.LIFE[ENEMY[1] - 1] * (0.3 + ENEMY[1] / 10) + 100, EnemyLevel * 10 * MULTIPLIERS.LIFE[ENEMY[1] - 1] + 100));
    if (Game.Armors[1][0] && EnemyLevel >= 10) ENEMY[4] += Math.round(_.random(EnemyLevel * 10 * MULTIPLIERS.LIFE[ENEMY[1] - 1] * (0.3 + ENEMY[1] / 10) + 100, ENEMY[4] += EnemyLevel * 10 * MULTIPLIERS.LIFE[ENEMY[1] - 1] + 100));
    if (Game.Armors[1][0] && EnemyLevel >= 20) ENEMY[4] += Math.round(_.random(EnemyLevel * 10 * MULTIPLIERS.LIFE[ENEMY[1] - 1] * (0.3 + ENEMY[1] / 10) + 100, ENEMY[4] += EnemyLevel * 10 * MULTIPLIERS.LIFE[ENEMY[1] - 1] + 100));
    if (Game.Armors[1][0] && EnemyLevel >= 30) ENEMY[4] += Math.round(_.random(EnemyLevel * 10 * MULTIPLIERS.LIFE[ENEMY[1] - 1] * (0.3 + ENEMY[1] / 10) + 100, ENEMY[4] += EnemyLevel * 10 * MULTIPLIERS.LIFE[ENEMY[1] - 1] + 100));
    ENEMY[4] *= Game.DIMENSION_MULTIPLIERS[3];
    ENEMY[5] = ENEMY[4];
    //DEFINE ENEMY NAME
    ENEMY[0] = ENEMY[1] >= 6 ? Get_Random_Monster_Name(Game.Location, true) : Get_Random_Monster_Name(Game.Location, false);
    return ENEMY;
};

export const Get_Random_Monster_Name = function (location, isBoss) {
    const monstersAtLocation = GLOBALS.MONSTERS.filter(monster =>
        monster.location === location && monster.isBoss === isBoss);

    if (monstersAtLocation.length === 0) {
        console.log('No monsters found at the specified location that match the criteria.');
        return null;
    }

    const randomIndex = Math.floor(Math.random() * monstersAtLocation.length);
    return monstersAtLocation[randomIndex].name;
};

export const Get_Monster_Image_By_Name = function (name) {
    const monster = GLOBALS.MONSTERS.find(monster => monster.name === name);
    if (monster) {
        return monster.imageUrl;
    } else {
        console.log('No monster found with the specified name.');
        return null; // or 'url_to_default_image' ?
    }
};

export const Get_Monster_Image_Position_By_Name = function (name) {
    const monster = GLOBALS.MONSTERS.find(monster => monster.name === name);
    if (monster) {
        return `transform: translate(${monster.imagePos[0]}%, ${monster.imagePos[1]}%)`;
    } else {
        console.log('No monster found with the specified name.');
        return null; // or 'transform: translate(0%, 0%)' ?
    }
};


export const Generate_Enemies_List = function () {
    // CREATE ENEMIES LIST
    APP.Enemies = {};
    for (var ENEMY = 0; ENEMY < 10; ENEMY++) {
        APP.Enemies[ENEMY] = Create_Enemy();
    }
    return APP.Enemies;
};

export const LOG_ENEMIES = function () {
    Generate_Enemies_List();
    let ENEMIES = {};
    for (var ENEMY in APP.Enemies) {
        //MEMO: 0.NAME, 1.CLASS, 2.LEVEL, 3.POWER, 4.LIFE, 5.CURRENTLIFE
        ENEMIES[ENEMY] = `${language[APP.LANG].FORMAT.ENEMIES.split("[NAME]").join(APP.Enemies[ENEMY][1] > 5 ? Get_Random_Monster_Name(Game.Location, true) : Get_Random_Monster_Name(Game.Location, false)).split("[CLASS]").join(GLOBALS.THREATS[APP.Enemies[ENEMY][1]])}${APP.ScoreModeEnabled == 0 ? ` ${language[APP.LANG].MISC.Level} ` : ` ${language[APP.LANG].MISC.Score}`} ${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.ScoreModeEnabled == 0 ? Math.round(APP.Enemies[ENEMY][2]) : Math.floor(APP.Enemies[ENEMY][2] * 10), 0)} with ${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.Enemies[ENEMY][3], "auto")} ATK POWER and ${FUNCTIONS.MAIN.FORMAT_NUMBER(APP.Enemies[ENEMY][4], "auto")} LIFE`;
    }
    console.table(ENEMIES);
};

export const GET_DIFFICULTY_COLOR = (playerLevel, enemyLevel) => {
    let DIFFICULTY = Number(enemyLevel - playerLevel);
    let COLOR = "pw white";

    if (DIFFICULTY >= 3) COLOR = "pw red";         // if enemy level is higher than the player level by 3 or more
    else if (DIFFICULTY == 2) COLOR = "pw orange"; // if enemy level is higher than the player level by 2
    else if (DIFFICULTY == 1) COLOR = "pw yellow"; // if enemy level is higher than the player level by 1

    if (DIFFICULTY < -1) COLOR = "pw green";     // if enemy level is inferior to the player level by 2 or more
    else if (DIFFICULTY <= 0) COLOR = "pw white"; // else if enemy level is inferior or equal to the player level by 1 or more  
    return COLOR;
};