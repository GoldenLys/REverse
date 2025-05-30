import FUNCTIONS from './index.js';

// INVENTORY VISUALS
export const GenInventory = function () {
    var COUNTERS = [0, 0, 0, 0, 0];
    let SCORE = APP.ScoreModeEnabled == 0 ? language[APP.LANG].MISC.Level + " " + FUNCTIONS.MAIN.FORMAT_NUMBER(APP.Ranking / 10, 0) : language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i> " + FUNCTIONS.MAIN.FORMAT_NUMBER(APP.Ranking, 0);
    $("#INVENTORY-LIFE_GEM").html("");
    $("#INVENTORY-POWER_GEM").html("");
    $("#INVENTORY-RELIC").html("");
    $("#INVENTORY-WEAPON").html("");
    $("#INVENTORY-ARMOR").html("");
    $("#EQUIPPED_ITEMS").html($("#EQUIPMENT").html());
    $("#EQUIPMENT_COUNTER").html(`<i class="fas fa-user"></i> ${language[APP.LANG].MISC.Equipment} <div class="pw inline label">${SCORE}</div>`);
    $("#INVENTORY_COUNTER").html(`<i class="fas fa-sack icon"></i> ${language[APP.LANG].MENUS.Inventory} <div class="pw inline label">${Game.inventory.length} / ${Game.MaxInv}</div>`);
    for (let ITEM in Game.inventory) {
        let AVERAGE = "pw white";
        let INVENTORY = {
            LEVEL_TYPE: [language[APP.LANG].MISC.Level + " " + Game.inventory[ITEM].level, language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i>" + Math.floor(Game.inventory[ITEM].level * 10)]
        };

        let AVERAGES = {ARMOR: GET_AVERAGE_EQUIPMENT_ARMOR(), MAIN: Game.Weapons.Main[4], SPECIAL: Game.Weapons.Special[4]};
        let RELIC = "";
        if (Game.inventory[ITEM].relictype !== 5) {
            RELIC = "<i class='pw yellow fas fa-stars'></i> ";
            if (Game.inventory[ITEM].relictype === 1 || Game.inventory[ITEM].relictype === 2) RELIC = RELIC + language[APP.LANG].RELICS[Game.inventory[ITEM].relictype].split("[BONUS]").join(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.inventory[ITEM].bonus, 3));
            else if (Game.inventory[ITEM].relictype === 3) RELIC = RELIC + language[APP.LANG].RELICS[Game.inventory[ITEM].relictype].split("[BONUS]").join(`<span class='${Game.inventory[ITEM].bonus}'>${Game.inventory[ITEM].bonus}</span>`);
            else if (Game.inventory[ITEM].relictype === 4) RELIC = RELIC + language[APP.LANG].RELICS[Game.inventory[ITEM].relictype].split("[BONUS]").join(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.inventory[ITEM].bonus, 1));
        }
        let I = {
            DESC: "",
            LEVEL: ""
        };
        if (Game.inventory[ITEM] != undefined) {
            var UPS = Game.inventory[ITEM].ups > 0 ? "<div class='pw inline orange label'><i class='pw orange fad fa-gem'></i> " + Game.inventory[ITEM].ups + "</div>" : "";
            if (Game.inventory[ITEM].type == "ARMOR") {
                AVERAGE = AVERAGES.ARMOR < Game.inventory[ITEM].life ? "pw green" : "pw red";
                I.LEVEL = INVENTORY.LEVEL_TYPE[APP.ScoreModeEnabled];
                I.DESC = UPS + "<div class='pw inline red label'><i class='pw red fas fa-heart'></i> <span class='" + AVERAGE + "'>" + Game.inventory[ITEM].life + "</span></div>";
                COUNTERS[1]++;
            } else if (Game.inventory[ITEM].type == "WEAPON") {
                if (Game.inventory[ITEM].type2 == "Special") AVERAGE = AVERAGES.SPECIAL < Game.inventory[ITEM].power ? "pw green" : "pw red";
                else if (Game.inventory[ITEM].type2 == "Main") AVERAGE = AVERAGES.MAIN < Game.inventory[ITEM].power ? "pw green" : "pw red";
                I.LEVEL = INVENTORY.LEVEL_TYPE[APP.ScoreModeEnabled];
                I.DESC = UPS + "<div class='pw inline blue label'><i class='pw blue fas fa-sword'></i> <span class='" + AVERAGE + "'>" + Game.inventory[ITEM].power + "</span></div>";
                COUNTERS[0]++;
            } else if (Game.inventory[ITEM].type == "RELIC") {
                I.DESC = "<div class='pw inline label'>" + RELIC + "</div>";
                COUNTERS[4]++;
            } else if (Game.inventory[ITEM].type == "LIFE_GEM") {
                I.DESC = "<div class='pw inline red label'><i class='pw red fas fa-heart'></i> " + Game.inventory[ITEM].life + "</div>";
                COUNTERS[3]++;
            } else if (Game.inventory[ITEM].type == "POWER_GEM") {
                I.DESC = "<div class='pw inline blue label'><i class='pw blue fas fa-sword'></i> " + Game.inventory[ITEM].power + "</div>";
                COUNTERS[2]++;
            }
            let IS_LEVEL_SET = I.LEVEL != "" ? "<div class='pw inline label level-number'>" + I.LEVEL + "</div>" : "";

            let ICON = FUNCTIONS.MAIN.GET_QUALITY_NUMBER(Game.inventory[ITEM].class) == "E" ? "<div class='pw image error-img'></div>" : "<img class='icon' src='" + Game.inventory[ITEM].icon + "'></img>";
            $("#INVENTORY-" + Game.inventory[ITEM].type).append(`<div id="ITEM-${ITEM}" class="pw message item"><div class="pw horizontal segments">
                <div class="pw segment content"><div class="pw button-container"> <div onclick="FUNCTIONS.INVENTORY.EquipItem(${ITEM}, '${Game.inventory[ITEM].type}')" class="pw green button"><i class="fal fa-check"></i></div> </div>
                ${ICON} ${Game.inventory[ITEM].name} ${IS_LEVEL_SET}
                <span class="pw inline ${Game.inventory[ITEM].class} label" id="${ITEM}">${language[APP.LANG].QUALITIES[Game.inventory[ITEM].class]}</span> ${I.DESC}
                <div class="pw button-container"> <div onclick="FUNCTIONS.INVENTORY.RemoveItem(${ITEM})" class="pw red button"><i class="fas fa-trash"></i></div></div></div>
                </div></div>`);
        }
    }
    $("#WEAPONS_COUNT").html(`${language[APP.LANG].MISC.Weapons} <div class="pw inline label">${COUNTERS[0]}</div>`);
    $("#ARMORS_COUNT").html(`${language[APP.LANG].MISC.Armors} <div class="pw inline label">${COUNTERS[1]}</div>`);
    $("#POWER_GEMS_COUNT").html(`${language[APP.LANG].MISC.PowerGems} <div class="pw inline label">${COUNTERS[2]}</div>`);
    $("#LIFE_GEMS_COUNT").html(`${language[APP.LANG].MISC.LifeGems} <div class="pw inline label">${COUNTERS[3]}</div>`);
    $("#RELICS_COUNT").html(`${language[APP.LANG].MISC.Relics} <div class="pw inline label">${COUNTERS[4]}</div>`);
    GenArmors();
    GenWeapons();

    $(".Throw.button").on("click", function () {
        let THROW = $(this).parent().parent().parent().attr("id");
        for (let ARMOR in Game.Armors)
            if (THROW.match(`Armor${ARMOR}`)) ConfirmDestroy(ARMOR);
        for (let WEAPON in Game.Weapons)
            if (THROW.match(`${WEAPON}Weapon`)) ConfirmDestroyWeapon(WEAPON);
    });

    let ARMORS = {
        1: "Helmet",
        2: "Chestplate",
        3: "Shield",
        4: "Boots"
    };

    $(".Unequip.button").on("click", function () {
        let UNEQUIP = $(this).parent().parent().parent().attr("id");
        for (let ARMOR in Game.Armors)
            if (UNEQUIP.match(`Armor${ARMOR}`)) UnequipItem(Game.Armors[ARMOR], ARMORS[ARMOR]);
        for (let WEAPON in Game.Weapons)
            if (UNEQUIP.match(`${WEAPON}Weapon`)) UnequipItem(Game.Weapons[WEAPON], WEAPON);
    });
};

export const GenWeapons = function () {
    for (var WEAPON in Game.Weapons) {
        if (typeof Game.Weapons[WEAPON][5] === "undefined" || Game.Weapons[WEAPON][5] === "Default") Game.Weapons[WEAPON][5] = FUNCTIONS.MAIN.GET_ICON_ID(WEAPON, Game.Weapons[WEAPON][1]);
        Game.Weapons[WEAPON][0] = Game.Weapons[WEAPON][0].split(language[APP.LANG].MISC.Weapon).join(language[APP.LANG].WEAPONS_TYPE[`${WEAPON === "Main" ? 0 : 1}`]).split(language.EN.MISC.Weapon).join(language.EN.WEAPONS_TYPE[`${WEAPON === "Main" ? 0 : 1}`]);
        let MAX_GEMS = WEAPON === "Main" ? Game.MaxUPC[4] : Game.MaxUPC[5];
        let GEMS = Game.Weapons[WEAPON][2] > 0 ? `<div class="pw inline orange label"><span class="pw orange">+${Game.Weapons[WEAPON][2]}</span></div>` : "";
        let GEMS_SLOTS = (MAX_GEMS - Game.Weapons[WEAPON][2]) > 0 ? `<div class="pw inline orange label"><i class='pw orange fad fa-gem'></i> <span class='${(MAX_GEMS - Game.Weapons[WEAPON][2]) > 0 ? "" : "pw green"}'>${MAX_GEMS - Game.Weapons[WEAPON][2]}</span></div> ` : "";

        //DEFINE CONTENT
        $(`#${WEAPON}Weapon>.header`).html(`${Game.Weapons[WEAPON][0]}${GEMS}
<div class="pw inline label level-number">${APP.ScoreModeEnabled == 0 ? language[APP.LANG].MISC.Level + " " + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.floor(Game.Weapons[WEAPON][3]), 0) : language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i> " + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.floor(Game.Weapons[WEAPON][3] * 10), 0)}</div>
<div class="pw inline label ${Game.Weapons[WEAPON][1]}">${language[APP.LANG].QUALITIES[Game.Weapons[WEAPON][1]]}</div>`);
        if (FUNCTIONS.MAIN.GET_QUALITY_NUMBER(Game.Weapons[WEAPON][1]) == "E") $(`#${WEAPON}Weapon>.content>.icon`).html("<div class='pw image error-img'></div>");
        else $(`#${WEAPON}Weapon>.content>.icon`).html("<img class='pw centered tiny image " + Game.Weapons[WEAPON][1] + "' src='" + Game.Weapons[WEAPON][5] + "'></img>");
        $(`#${WEAPON}Weapon>.content>.description`).html(`${language[APP.LANG].MISC[`${WEAPON}Weapon`]}<br> ${GEMS_SLOTS} <div class="pw inline blue label"><i class='pw blue fas fa-sword'></i> ${Game.Weapons[WEAPON][4]}</div>`);
    }
};

export const GenArmors = function () {
    let Names = GLOBALS.ARMORS_TYPE;
    for (let ARMOR = 1; ARMOR < 5; ARMOR++) {
        if (typeof Game.Armors[ARMOR][6] === "undefined" || Game.Armors[ARMOR][6] === "Default") {
            Game.Armors[ARMOR][6] = FUNCTIONS.MAIN.GET_ICON_ID(ARMOR, Game.Armors[ARMOR][2]);
        }
        Game.Armors[ARMOR][1] = Game.Armors[ARMOR][1].split(language.EN.MISC.Armor).join(Names[ARMOR]).split(language.EN.MISC.Armor).join(Names[ARMOR]);

        let MAX_GEMS = Game.MaxUPC[ARMOR - 1];
        let GEMS = Game.Armors[ARMOR][5] > 0 ? `<div class="pw inline orange label"><span class="pw orange">+${Game.Armors[ARMOR][5]}</span></div>` : "";
        let GEMS_SLOTS = (MAX_GEMS - Game.Armors[ARMOR][5]) > 0 ? `<div class="pw inline orange label"><i class='pw orange fad fa-gem'></i> <span class='${(MAX_GEMS - Game.Armors[ARMOR][5]) > 0 ? "" : "pw green"}'>${MAX_GEMS - Game.Armors[ARMOR][5]}</span></div> ` : "";
        let RELIC = "";
        let RELIC_ICON = "";
        if (Game.RELICS[ARMOR][1] !== 5) {
            RELIC = "<span class='text'><i class='pw yellow fas fa-stars'></i> ";
            RELIC_ICON = `<img class='pw centered mini image' src='${FUNCTIONS.MAIN.GET_ICON_ID("Relic", Game.RELICS[ARMOR][1])}'></div>`;
            if (Game.RELICS[ARMOR][1] === 1 ||Game.RELICS[ARMOR][1] === 2) RELIC = RELIC + language[APP.LANG].RELICS[Game.RELICS[ARMOR][1]].split("[BONUS]").join('' + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.RELICS[ARMOR][2], 3) + '</span>');
            else if (Game.RELICS[ARMOR][1] === 3) RELIC = RELIC + language[APP.LANG].RELICS[Game.RELICS[ARMOR][1]].split("[BONUS]").join(`<span class='${Game.RELICS[ARMOR][2]}'>${Game.RELICS[ARMOR][2]}</span></span>`);
            else if (Game.RELICS[ARMOR][1] === 4) RELIC = RELIC + language[APP.LANG].RELICS[Game.RELICS[ARMOR][1]].split("[BONUS]").join('' + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.RELICS[ARMOR][2], 1) + '</span>');
        }

        //DEFINE CONTENT
        $(`#Armor${ARMOR}>.header`).html(`${Game.Armors[ARMOR][1]}${GEMS}
<div class="pw inline label level-number">${APP.ScoreModeEnabled == 0 ? language[APP.LANG].MISC.Level + " " + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.floor(Game.Armors[ARMOR][4]), 0) : language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i> " + FUNCTIONS.MAIN.FORMAT_NUMBER(Math.floor(Game.Armors[ARMOR][4] * 10), 0)}</div>
<div class="pw inline label ${Game.Armors[ARMOR][2]}">${language[APP.LANG].QUALITIES[Game.Armors[ARMOR][2]]}</div>`);

        if (FUNCTIONS.MAIN.GET_QUALITY_NUMBER(Game.Armors[ARMOR][2]) == "E") $(`#Armor${ARMOR}>.content>.icon`).html("<div class='pw image error-img'></div>");
        else $(`#Armor${ARMOR}>.content>.icon`).html("<img class='pw centered tiny image " + Game.Armors[ARMOR][2] + "' src='" + Game.Armors[ARMOR][6] + "'></div>");
        $(`#Armor${ARMOR}>.content>.description`).html(`${language[APP.LANG].ARMORS_TYPE[ARMOR]}<br> ${GEMS_SLOTS} <div class="pw inline red label"><i class='pw red fas fa-heart'></i> ${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Armors[ARMOR][3], 1)}</div><br>${RELIC}`);
        $(`#Armor${ARMOR}>.content>.relic`).html(RELIC_ICON);

        if (!Game.Armors[ARMOR][0]) $("#Armor" + ARMOR).hide();
        else $("#Armor" + ARMOR).show();
    }
    if (Number(LATEST_UNLOCKED_ARMOR()) <= 2) $(".pw.armor.grids").attr("data-variant", "vertical");
    if (Game.Level < 30) $("#NextArmor").html(language[APP.LANG].MISC.NextArmorUnlock.split("[LEVEL]").join(NEXT_ARMOR_PIECE()));
    else $("#NextArmor").html("");

};

// ITEM GENERATION
export const newItem = function (OBJECT, LEVEL, CLASS) {
    CHECK_EQUIPMENT();
    if (APP.ScoreModeEnabled == 1) LEVEL /= 10;
    let ITEM_CONFIG = {
        MULTIPLIERS: [_.random(1.00, 1.05, true), _.random(1.15, 1.20, true), _.random(1.25, 1.30, true), _.random(1.35, 1.40, true), _.random(1.50, 1.60, true), _.random(1.75, 1.85, true), _.random(1.95, 2.10, true)],
        RARITIES: {
            Normal: [1, 1],
            Common: [2, 3050],
            Uncommon: [3, 5550],
            Rare: [4, 7300],
            Epic: [5, 8550],
            Exotic: [6, 9550],
            Legendary: [7, 9900]
        },
        RELIC_MULTIPLIERS: [
            _.random(0.001, 0.01, true),//0.1% - 1%
            _.random(0.01, 0.015, true),  //1%   - 1.5%
            _.random(0.015, 0.025, true),   //1.5% - 2.5%
            _.random(0.025, 0.030, true),  //2.5% - 3%
            _.random(0.04, 0.05, true),   //4%   - 5%
            _.random(0.05, 0.10, true),   //5%   - 10%
            _.random(0.1, 0.15, true)     //10%  - 15%
        ],
        RELIC_SCORE_MUTLIPLIERS: [_.random(1, 5), _.random(6, 10), _.random(11, 15), _.random(16, 20), _.random(21, 25), _.random(26, 50), _.random(51, 100)],
        GEMS_MULTIPLIERS: {
            Normal: _.random(1.0, 1.5, true),
            Common: _.random(1.5, 2.5, true),
            Uncommon: _.random(2.5, 3.5, true),
            Rare: _.random(3.5, 5.0, true),
            Epic: _.random(5.0, 7.5, true),
            Exotic: _.random(7.5, 9, true),
            Legendary: _.random(8.5, 10, true)
        },
        MAX_GEMS_MULTIPLIER: {
            Normal: 1.5,
            Common: 2.5,
            Uncommon: 3.5,
            Rare: 5.0,
            Epic: 7.5,
            Exotic: 9,
            Legendary: 10
        },
    };
    let CLASSES = Object.keys(ITEM_CONFIG.RARITIES);
    let ITEM = {};
    if (LEVEL < 1 || LEVEL === undefined) LEVEL = 1;
    let BALANCE_EQUIPMENT = [67, 50, 40, 33];
    if (OBJECT == 0) {
        if (_.random(0, 100) > BALANCE_EQUIPMENT[LATEST_UNLOCKED_ARMOR() - 1]) OBJECT = "Weapon";
        else OBJECT = "Armor";
    }
    let BASE_LUCK = ITEM_CONFIG.RARITIES[CLASS][1];
    for (var RELIC in Game.RELICS) { // IF PLAYER HAS A MINIMAL RARITY RELIC THEN USE IT HERE
        if (Game.RELICS[RELIC][1] == 3 && BASE_LUCK < ITEM_CONFIG.RARITIES[Game.RELICS[RELIC][2]][1]) BASE_LUCK = ITEM_CONFIG.RARITIES[Game.RELICS[RELIC][2]][1];
    }
    if (APP.ScoreModeEnabled == 1 && BASE_LUCK < 7300) { // IF IN SCORE MODE REPLACE ALL LOW CLASS ITEMS WITH HIGH CLASS ONES
        let LUCK_PER_TYPES = {
            0: 7300,
            1: 7300,
            2: 7300,
            3: 7300,
            4: 7300,
            5: 8550,
            6: 8550,
            7: 9900
        };
        BASE_LUCK = LUCK_PER_TYPES[Game.Enemy[1]];
        if (LEVEL > APP.MaxScore) LEVEL = APP.MaxScore;
        if (Game.MissionStarted[0] && GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) BASE_LUCK = Game.Enemy == 7 ? 9900 : 9550; // IF IN A FORTRESS GENERATE AN EXOTIC OR BETTER
    } else {
        if (LEVEL > Game.Level && APP.ScoreModeEnabled == 0) LEVEL = Game.Level;
        if (LEVEL > GLOBALS.LOCATIONS[Game.Location][2] && APP.ScoreModeEnabled == 0) LEVEL = GLOBALS.LOCATIONS[Game.Location][2];
    }
    let MAX_LUCK = ITEM_CONFIG.RARITIES[CLASSES[GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3]]][1]; // DEFINE THE MAXIMUM DROP QUALITY TO LOCATION MAX
    if (_.inRange(Game.Level, 0, 4) && GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3] >= 0) MAX_LUCK = 3049; // NORMAL
    if (_.inRange(Game.Level, 4, 10) && GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3] >= 1) MAX_LUCK = 5549; // COMMON
    if (_.inRange(Game.Level, 10, 15) && GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3] >= 2) MAX_LUCK = 7299; // UNCOMMON
    if (_.inRange(Game.Level, 15, 20) && GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3] >= 3) MAX_LUCK = 8549; // RARE
    if (_.inRange(Game.Level, 20, 30) && GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3] >= 4) MAX_LUCK = 9549; // EPIC
    if (_.inRange(Game.Level, 30, 35) && GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3] >= 5) MAX_LUCK = 9899; // EXOTIC
    if (_.inRange(Game.Level, 35, 36) && GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3] >= 5) MAX_LUCK = 10000; // LEGENDARY
    if (BASE_LUCK > MAX_LUCK) BASE_LUCK = MAX_LUCK;
    let LUCK = _.random(BASE_LUCK, MAX_LUCK);
    //  N            C            U        R            Ep           Ex       L         
    // 0-30.5% > 30.5-55.5% > 55.5-73% > 73-85.5% > 85.5-95.5% > 95.5-99% > 99-100%
    //  30.5%        25%        17.5%      12.5%        10%          3.5%     1%
    ITEM.class = "Normal";
    if (_.inRange(LUCK, 3050, 5550)) ITEM.class = "Common";
    if (_.inRange(LUCK, 5550, 7300)) ITEM.class = "Uncommon";
    if (_.inRange(LUCK, 7300, 8550)) ITEM.class = "Rare";
    if (_.inRange(LUCK, 8550, 9550)) ITEM.class = "Epic";
    if (_.inRange(LUCK, 9550, 9900)) ITEM.class = "Exotic";
    if (_.inRange(LUCK, 9900, 10001)) ITEM.class = "Legendary";
    if (OBJECT == "Armor") { // GENERATE AN ARMOR
        if (LEVEL > APP.MaxScore) LEVEL = APP.MaxScore;
        ITEM.level = LEVEL;
        ITEM.ups = FUNCTIONS.DIMENSION.GET_MAX_UPGRADES(ITEM.class);
        if (APP.ScoreModeEnabled == 1) ITEM.life = Math.floor(_.random((LEVEL * 10) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] * 0.75) + 100, (LEVEL * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 100));
        else ITEM.life = Math.floor(_.random((LEVEL * 10) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] * 0.9) + 100, (LEVEL * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 100));
        ITEM.type = "ARMOR"; // SET AS ARMOR
        let ARMORS = {
            1: "Helmet",
            2: "Chestplate",
            3: "Shield",
            4: "Boots"
        };
        ITEM.type2 = _.random(1, LATEST_UNLOCKED_ARMOR());
        ITEM.name = language[APP.LANG].ARMORS_NAMES[ITEM.class][_.random(0, language[APP.LANG].ARMORS_NAMES[ITEM.class].length - 1)].replace("[ARMOR]", language[APP.LANG].ARMORS_TYPE[ITEM.type2])
        ITEM.icon = FUNCTIONS.MAIN.GET_ICON_ID(ITEM.type2, ITEM.class);
        ITEM.type2 = ARMORS[ITEM.type2];
    } else if (OBJECT == "Weapon") { // GENERATE A WEAPON
        if (LEVEL > APP.MaxScore) LEVEL = APP.MaxScore;
        ITEM.level = LEVEL;
        ITEM.ups = FUNCTIONS.DIMENSION.GET_MAX_UPGRADES(ITEM.class);
        if (APP.ScoreModeEnabled == 1) ITEM.power = Math.floor(_.random((LEVEL * 2) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] * 0.75) + 5, (LEVEL * 2) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 10));
        else ITEM.power = Math.floor(_.random((LEVEL * 2) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] * 0.9) + 5, (LEVEL * 2) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 10));
        ITEM.type = "WEAPON"; // SET AS WEAPON
        let WEAPONS_TYPE = {
            0: "Main",
            1: "Special"
        };
        ITEM.type2 = _.random(0, 1);
        ITEM.name = language[APP.LANG].WEAPONS_NAMES[ITEM.class][_.random(0, language[APP.LANG].WEAPONS_NAMES[ITEM.class].length - 1)].replace("[WEAPON]", ITEM.class == "Normal" && ITEM.type2 == 0 ? language[APP.LANG].WEAPONS_TYPE[3] : language[APP.LANG].WEAPONS_TYPE[ITEM.type2]);
        ITEM.icon = FUNCTIONS.MAIN.GET_ICON_ID(WEAPONS_TYPE[ITEM.type2], ITEM.class);
        ITEM.type2 = WEAPONS_TYPE[ITEM.type2];
    } else if (OBJECT == "Gem") { // GENERATE A GEM
        let GEMTYPE = _.random(1, 100);
        let GEMS_DROP_RATES = APP.ScoreModeEnabled == 1 ? {
            MIN: [0, 45],
            MAX: [46, 101]
        } : {
            MIN: [0, 50],
            MAX: [51, 101]
        };
        if (_.inRange(GEMTYPE, GEMS_DROP_RATES.MIN[0], GEMS_DROP_RATES.MAX[0])) { //GENERATE A POWER GEM
            ITEM.power = Math.floor(ITEM_CONFIG.GEMS_MULTIPLIERS[ITEM.class] * ((Game.Weapons.Main[4] - Game.WeaponUpgrades.Main) * 0.01) + ITEM_CONFIG.RARITIES[ITEM.class][0]);
            if (ITEM.power < 1) ITEM.power = 1;
            ITEM.life = 0;
            ITEM.name = language[APP.LANG].MISC.PowerGem;
            ITEM.icon = FUNCTIONS.MAIN.GET_ICON_ID("Gem", "Power");
            ITEM.level = ITEM_CONFIG.RARITIES[ITEM.class][0];
            ITEM.type = "POWER_GEM"; // SET AS POWER GEM
        }
        if (_.inRange(GEMTYPE, GEMS_DROP_RATES.MIN[1], GEMS_DROP_RATES.MAX[1])) { //GENERATE A LIFE GEM
            ITEM.life = Math.floor(ITEM_CONFIG.GEMS_MULTIPLIERS[ITEM.class] * Game.AverageArmorStat * 0.01 + ITEM_CONFIG.RARITIES[ITEM.class][0]);
            if (ITEM.life < 1) ITEM.life = 1;
            ITEM.power = 0;
            ITEM.name = language[APP.LANG].MISC.LifeGem;
            ITEM.icon = FUNCTIONS.MAIN.GET_ICON_ID("Gem", "Life");
            ITEM.level = ITEM_CONFIG.RARITIES[ITEM.class][0];
            ITEM.type = "LIFE_GEM"; // SET AS LIFE GEM
        }
    } else if (OBJECT == "Relic") { // GENERATE A RELIC
        let RelicType = Game.Level > 10 ? _.random(0, 2) : _.random(0, 1);
        if (APP.ScoreModeEnabled == 1) RelicType = _.random(0, 3);
        if (CLASS === "Normal") RelicType = _.random(0, 1);
        // ARES - POWER BONUS
        if (RelicType == 0) ITEM.bonus = ITEM_CONFIG.RELIC_MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1];
        // YGGDRASIL - LIFE BONUS
        if (RelicType == 1) ITEM.bonus = ITEM_CONFIG.RELIC_MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1];
        // HERMES - MINIMAL RARITY
        if (RelicType == 2) {
            ITEM.bonus = ITEM_CONFIG.RARITIES[ITEM.class][0] - 1;
            if (ITEM_CONFIG.RARITIES[ITEM.class][0] > 1) ITEM.bonus = CLASSES[ITEM.bonus - 1, ITEM.bonus];
        }
        // VULCAN - MAX SCORE
        if (RelicType == 3) ITEM.bonus = ITEM_CONFIG.RELIC_SCORE_MUTLIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1];
        ITEM.relictype = RelicType + 1;
        ITEM.name = GLOBALS.RELICS_NAMES[RelicType];
        ITEM.icon = FUNCTIONS.MAIN.GET_ICON_ID("Relic", ITEM.relictype);
        ITEM.type = "RELIC"; // SET AS RELIC
    }
    if ((OBJECT == 'Armor' || OBJECT == 'Weapon' || OBJECT == 'Gem' || OBJECT == 'Relic') && Game.inventory.length - 1 < Game.MaxInv) Game.inventory[Game.inventory.length] = ITEM;
    GenInventory();
};

// EQUIP A NEW ITEM
export const EquipItem = function (ITEM, TYPE) {
    FUNCTIONS.MAIN.POPUP_CLOSE();
    let ARMOR_TYPES = language[APP.LANG].ARMORS_TYPE;
    let ARMOR_UPGRADE_BUTTON = [];
    let RELIC_BUTTON = [];
    let WEAPON_UPGRADE_BUTTON = [];
    if (TYPE == "ARMOR") {
        let ARMORS = {
            "Helmet": 1,
            "Chestplate": 2,
            "Shield": 3,
            "Boots": 4
        };
        PREVIEW_ARMOR(ARMORS[Game.inventory[ITEM].type2], ITEM);
    } else if (TYPE == "LIFE_GEM") {
        for (let ARMOR in Game.Armors) {
            ARMOR_UPGRADE_BUTTON[ARMOR] = Game.Armors[ARMOR][0] ? `<div onclick='FUNCTIONS.INVENTORY.UPGRADE_ARMOR(${ARMOR}, ${ITEM});' class='pw alpha button'>Upgrade ${ARMOR_TYPES[ARMOR]}</div>` : ``;
            if (Game.Armors[ARMOR][5] >= Game.MaxUPC[ARMOR - 1] && Game.Armors[ARMOR][0]) ARMOR_UPGRADE_BUTTON[ARMOR] = `<div class='pw darkgrey button'>No gem slots left for the ${ARMOR_TYPES[ARMOR]}.</div>`;
        }
        FUNCTIONS.MAIN.POPUP("Select an Armor Slot", "<div class='pw fluid vertical buttons'>" + ARMOR_UPGRADE_BUTTON[1] + ARMOR_UPGRADE_BUTTON[2] + ARMOR_UPGRADE_BUTTON[3] + ARMOR_UPGRADE_BUTTON[4] + "</div>", 0);
    } else if (TYPE == "RELIC") {
        for (let RELIC in Game.RELICS) {
            if (RELIC != 0) RELIC_BUTTON[RELIC] = Game.Armors[RELIC][0] ? `<div onclick="FUNCTIONS.INVENTORY.ConfirmRelic(${RELIC}, ${ITEM});" class="pw alpha button">Apply on ${ARMOR_TYPES[RELIC]}</div>` : ``;
        }
        FUNCTIONS.MAIN.POPUP("Select a Relic Slot", "<div class='pw fluid vertical buttons'>" + RELIC_BUTTON[1] + RELIC_BUTTON[2] + RELIC_BUTTON[3] + RELIC_BUTTON[4] + "</div>", 0);
    } else if (TYPE == "WEAPON") {
        PREVIEW_WEAPON(Game.inventory[ITEM].type2, ITEM);
    }
    else if (TYPE == "POWER_GEM") {
        for (let WEAPON in Game.Weapons) {
            let NUMBER = 4;
            if (WEAPON != "Main") NUMBER = 5;
            WEAPON_UPGRADE_BUTTON[WEAPON] = Game.Armors[1][0] ? `<div onClick='FUNCTIONS.INVENTORY.UPGRADE_WEAPON("${WEAPON}", ${ITEM});' class='pw alpha button'>Upgrade ${WEAPON} Weapon</div>` : ``;
            if (Game.Weapons[WEAPON][2] >= Game.MaxUPC[NUMBER]) WEAPON_UPGRADE_BUTTON[WEAPON] = `<div class='pw darkgrey button'>No gem slots left for the ${WEAPON} weapon.</div>`;
        }
        FUNCTIONS.MAIN.POPUP("Select a Weapon Slot", "<div class='pw fluid vertical buttons'>" + WEAPON_UPGRADE_BUTTON.Main + WEAPON_UPGRADE_BUTTON.Special + "</div>", 0);
    }
    Game.isInFight = false;
    FUNCTIONS.APP.UpdateGame();
};

export const UnequipItem = function (ITEM, TYPE) {
    let ARMORS = {
        "Helmet": 1,
        "Chestplate": 2,
        "Shield": 3,
        "Boots": 4
    };

    if (Game.inventory.length < Game.MaxInv) {
        Game.inventory[Game.inventory.length] = CONVERT_EQUIPMENT_TO_ITEM(ITEM, TYPE);
        if (TYPE == "Main" || TYPE == "Special") DestroyWeapon(TYPE);
        else DestroyArmor(ARMORS[TYPE]);
    }
    GenInventory();
}

export const PREVIEW_ARMOR = function (ARMOR, ITEM) {
    APP.ToAdd = [ARMOR, ITEM];
    var CONFIG = {
        OLD_ARMOR: Object.assign({}, Game.Armors[ARMOR]),
        NEW_ARMOR: [true, Game.inventory[ITEM].name, Game.inventory[ITEM].class, Game.inventory[ITEM].life, Game.inventory[ITEM].level, Game.inventory[ITEM].ups],
        COLORS: {
            OLD: ["none", "none", "none", "", "", ""],
            NEW: ["none", "none", "none", "", "", ""]
        }
    };
    var TIER = APP.ScoreModeEnabled == 0 ? language[APP.LANG].MISC.Level + " " : language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i>";
    for (var CURRENT = 3; CURRENT < 6; CURRENT++) {
        if (CONFIG.NEW_ARMOR[CURRENT] != CONFIG.OLD_ARMOR[CURRENT]) {
            CONFIG.COLORS.OLD[CURRENT] = CONFIG.OLD_ARMOR[CURRENT] > CONFIG.NEW_ARMOR[CURRENT] ? "pw green" : "pw red";
            CONFIG.COLORS.NEW[CURRENT] = CONFIG.OLD_ARMOR[CURRENT] < CONFIG.NEW_ARMOR[CURRENT] ? "pw green" : "pw red";
        }
    }
    if (Game.config[0] == 1) FUNCTIONS.MAIN.POPUP(`Do you really want to equip this new ${GLOBALS.ARMORS_TYPE[ARMOR]} ?`,
        `<div class="pw horizontal segments"><div class="pw segment">Old</div><div class="pw button-container"><i class="fal fa-arrow-right"></i></div><div class="pw segment">New</div></div>
        <div class="pw horizontal segments">
        <div class="pw segment"><div>${CONFIG.OLD_ARMOR[1]}<div class="pw inline label">${TIER} <span class="${CONFIG.COLORS.OLD[4]}">${APP.ScoreModeEnabled == 0 ? CONFIG.OLD_ARMOR[4] : Math.floor(CONFIG.OLD_ARMOR[4] * 10)}</span></div></div><div class="${CONFIG.OLD_ARMOR[2]}">${CONFIG.OLD_ARMOR[2]}</div><div class="pw inline orange label"><i class="pw orange fad fa-gem"></i> <span class="${CONFIG.COLORS.OLD[5]}">${CONFIG.OLD_ARMOR[5]}</span></div><div class="pw inline red label"><i class="pw red fas fa-heart"></i> <span class="${CONFIG.COLORS.OLD[3]}">${CONFIG.OLD_ARMOR[3]}</span></div></div>
        <div class="pw button-container"></div>
        <div class="pw segment"><div>${CONFIG.NEW_ARMOR[1]}<div class="pw inline label">${TIER} <span class="${CONFIG.COLORS.NEW[4]}">${APP.ScoreModeEnabled == 0 ? CONFIG.NEW_ARMOR[4] : Math.floor(CONFIG.NEW_ARMOR[4] * 10)}</span></div></div><div class="${CONFIG.NEW_ARMOR[2]}">${CONFIG.NEW_ARMOR[2]}</div><div class="pw inline orange label"><i class="pw orange fad fa-gem"></i> <span class="${CONFIG.COLORS.NEW[5]}">${CONFIG.NEW_ARMOR[5]}</span></div><div class="pw inline red label"><i class="pw red fas fa-heart"></i> <span class="${CONFIG.COLORS.NEW[3]}">${CONFIG.NEW_ARMOR[3]}</span></div></div>
        </div>`, 6);
    else DEFINE_ARMOR(ARMOR, ITEM);
};

export const DEFINE_ARMOR = function (ARMOR, ITEM) {
    if (Game.config[0] == 1) FUNCTIONS.MAIN.POPUP_CLOSE();
    if (typeof (Game.inventory[ITEM].life) !== 'undefined') {
        Game.Armors[ARMOR] = [true, Game.inventory[ITEM].name, Game.inventory[ITEM].class, Game.inventory[ITEM].life, Game.inventory[ITEM].level, 0, Game.inventory[ITEM].icon];
        Game.MaxUPC[ARMOR - 1] = Game.inventory[ITEM].ups;
        Game.ArmorUpgrades[ARMOR] = 0;
    }
    if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
    if ($('#DIV-INVENTORY').is(":visible")) FUNCTIONS.MAIN.POPUP_CLOSE();
    else FUNCTIONS.MAIN.hideRewards();
    Game.isInFight = false;
    GenInventory();
    FUNCTIONS.APP.UpdateGame();
};

export const PREVIEW_WEAPON = function (WEAPON, ITEM) {
    APP.ToAdd = [WEAPON, ITEM];
    var CONFIG = {
        OLD_WEAPON: [true, Game.Weapons[WEAPON][0], Game.Weapons[WEAPON][1], Game.Weapons[WEAPON][4], Game.Weapons[WEAPON][3], Game.Weapons[WEAPON][2]],
        NEW_WEAPON: [true, Game.inventory[ITEM].name, Game.inventory[ITEM].class, Game.inventory[ITEM].power, Game.inventory[ITEM].level, Game.inventory[ITEM].ups],
        COLORS: {
            OLD: ["none", "none", "none", "", "", ""],
            NEW: ["none", "none", "none", "", "", ""]
        }
    };
    var TIER = APP.ScoreModeEnabled == 0 ? language[APP.LANG].MISC.Level + " " : language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i>";
    for (let CURRENT = 3; CURRENT < 6; CURRENT++) {
        if (CONFIG.NEW_WEAPON[CURRENT] != CONFIG.OLD_WEAPON[CURRENT]) {
            CONFIG.COLORS.OLD[CURRENT] = CONFIG.OLD_WEAPON[CURRENT] > CONFIG.NEW_WEAPON[CURRENT] ? "pw green" : "pw red";
            CONFIG.COLORS.NEW[CURRENT] = CONFIG.OLD_WEAPON[CURRENT] < CONFIG.NEW_WEAPON[CURRENT] ? "pw green" : "pw red";
        }
    }
    if (Game.config[0] == 1) FUNCTIONS.MAIN.POPUP(`Do you really want to equip this weapon as your ${WEAPON} weapon ?`,
        `<div class="pw horizontal segments"><div class="pw segment">Old</div><div class="pw button-container"><i class="fal fa-arrow-right"></i></div><div class="pw segment">New</div></div>
        <div class="pw horizontal segments">
        <div class="pw segment"><div>${CONFIG.OLD_WEAPON[1]}<div class="pw inline label">${TIER} <span class="${CONFIG.COLORS.OLD[4]}">${APP.ScoreModeEnabled == 0 ? CONFIG.OLD_WEAPON[4] : Math.floor(CONFIG.OLD_WEAPON[4] * 10)}</span></div></div><div class="${CONFIG.OLD_WEAPON[2]}">${CONFIG.OLD_WEAPON[2]}</div><div class="pw inline orange label"><i class="pw orange fad fa-gem"></i> <span class="${CONFIG.COLORS.OLD[5]}">${CONFIG.OLD_WEAPON[5]}</span></div><div class="pw inline blue label"><i class="pw blue fas fa-sword"></i> <span class="${CONFIG.COLORS.OLD[3]}">${CONFIG.OLD_WEAPON[3]}</span></div></div>
        <div class="pw button-container"></div>
        <div class="pw segment"><div>${CONFIG.NEW_WEAPON[1]}<div class="pw inline label">${TIER} <span class="${CONFIG.COLORS.NEW[4]}">${APP.ScoreModeEnabled == 0 ? CONFIG.NEW_WEAPON[4] : Math.floor(CONFIG.NEW_WEAPON[4] * 10)}</span></div></div><div class="${CONFIG.NEW_WEAPON[2]}">${CONFIG.NEW_WEAPON[2]}</div><div class="pw inline orange label"><i class="pw orange fad fa-gem"></i> <span class="${CONFIG.COLORS.NEW[5]}">${CONFIG.NEW_WEAPON[5]}</span></div><div class="pw inline blue label"><i class="pw blue fas fa-sword"></i> <span class="${CONFIG.COLORS.NEW[3]}">${CONFIG.NEW_WEAPON[3]}</span></div></div>
        </div>`, 7);
    else DEFINE_WEAPON(WEAPON, ITEM);
};

export const DEFINE_WEAPON = function (WEAPON, ITEM) {
    let UPC_TYPE = {
        Main: 1,
        Special: 2
    };
    if (typeof (Game.inventory[ITEM].power) !== 'undefined') {
        Game.Weapons[WEAPON] = [Game.inventory[ITEM].name, Game.inventory[ITEM].class, 0, Game.inventory[ITEM].level, Game.inventory[ITEM].power, Game.inventory[ITEM].icon];
        Game.MaxUPC[UPC_TYPE[WEAPON] + 3] = Game.inventory[ITEM].ups;
        Game.WeaponUpgrades[WEAPON] = 0;
    }
    if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
    Game.isInFight = false;
    FUNCTIONS.MAIN.POPUP_CLOSE();
    GenInventory();
    FUNCTIONS.APP.UpdateGame();
};

export const ConfirmRelic = function (RELIC, ITEM) {
    APP.ToAdd = [RELIC, ITEM];
    let IRCOLOR = Game.RELICS[RELIC][1] == 5 ? "pw green" : "pw red";
    let IRCOLOR2 = Game.RELICS[RELIC][1] == 5 ? "pw green" : "pw red";
    if (Game.RELICS[RELIC][1] == Game.inventory[ITEM].relictype && Game.RELICS[RELIC][2] > Game.inventory[ITEM].bonus) IRCOLOR = "pw green";
    if (Game.RELICS[RELIC][1] == Game.inventory[ITEM].relictype && Game.RELICS[RELIC][2] < Game.inventory[ITEM].bonus) IRCOLOR2 = "pw green";
    let FORMAT = Game.inventory[ITEM].relicType <= 1 ? 2 : 3;
    let DESCS = ["-",
        "Power bonus of <span class='" + IRCOLOR + "'>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.RELICS[RELIC][2], FORMAT) + "</span>",
        "Life bonus of <span class='" + IRCOLOR + "'>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.RELICS[RELIC][2], FORMAT) + "</span>",
        "Minimal drop quality <span class='" + Game.RELICS[RELIC][2] + "'>" + Game.RELICS[RELIC][2] + "</span>",
        "Max Score +<span class='" + IRCOLOR + "'>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.RELICS[RELIC][2], 1) + "</span>",
        "-"
    ];
    let DESCS2 = ["-",
        "Power bonus of <span class='" + IRCOLOR2 + "'>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.inventory[ITEM].bonus, FORMAT) + "</span>",
        "Life bonus of <span class='" + IRCOLOR2 + "'>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.inventory[ITEM].bonus, FORMAT) + "</span>",
        "Minimal drop quality <span class='" + Game.inventory[ITEM].bonus + "'>" + Game.inventory[ITEM].bonus + "</span>",
        "Max Score +<span class='" + IRCOLOR2 + "'>" + FUNCTIONS.MAIN.FORMAT_NUMBER(Game.inventory[ITEM].bonus, 1) + "</span>",
        "-"
    ];
    if (Game.config[1] == 1) FUNCTIONS.MAIN.POPUP("New Relic confirmation", `<div class="pw horizontal segments"><div class="pw segment">Old</div><div class="pw button-container"><i class="fal fa-arrow-right"></i></div><div class="pw segment">New</div></div>
        <div class="pw horizontal segments">
        <div class="pw segment"><div>${GLOBALS.RELICS_NAMES[Game.RELICS[RELIC][1] - 1]}</div><div class="${Game.RELICS[RELIC][0]}">${Game.RELICS[RELIC][0]}</div><div>${DESCS[Game.RELICS[RELIC][1]]}</div></div>
        <div class="pw button-container"></div>
        <div class="pw segment"><div>${Game.inventory[ITEM].name}</div><div class="${Game.inventory[ITEM].class}">${Game.inventory[ITEM].class}</div><div>${DESCS2[Game.inventory[ITEM].relictype]}</div></div>
        </div>`, 4);
    else InstallRelic(RELIC, ITEM);
};

export const InstallRelic = function (RELIC, ITEM) {
    if (Game.RELICS[RELIC][1] !== Game.inventory[ITEM].relictype && !CHECK_RELICS_LIMIT(Game.inventory[ITEM].relictype)) {
        alert('You can\'t equip more than one power or life relic');
        return;
    }
    Game.RELICS[RELIC] = [Game.inventory[ITEM].class, Game.inventory[ITEM].relictype, Game.inventory[ITEM].bonus];
    if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
    if ($('#DIV-INVENTORY').is(":visible")) FUNCTIONS.MAIN.POPUP_CLOSE();
    else FUNCTIONS.MAIN.hideRewards();
    FUNCTIONS.MAIN.POPUP_CLOSE();
    GenInventory();
};

// UPGRADE EQUIPMENT
export function UPGRADE_ARMOR(ARMOR, ITEM) {
    let BONUSES = {
        Normal: 0,
        Common: 1,
        Uncommon: 2,
        Rare: 3,
        Epic: 4,
        Exotic: 5,
        Legendary: 6,
        Divine: 8
    };
    if (Game.Armors[ARMOR][5] < Game.MaxUPC[ARMOR - 1]) {
        Game.Armors[ARMOR][3] += Game.inventory[ITEM].life;
        Game.Armors[ARMOR][5]++;
        if (APP.ScoreModeEnabled === 1) {
            if (Game.Armors[ARMOR][4] + (BONUSES[Game.inventory[ITEM].class] / 10) <= APP.MaxScore) Game.Armors[ARMOR][4] += (BONUSES[Game.inventory[ITEM].class] / 10);
            else Game.Armors[ARMOR][4] = APP.MaxScore;
        }
        Game.ArmorUpgrades[ARMOR] += Game.inventory[ITEM].life;
        if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
        Game.Armors[ARMOR][4] = Number(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Armors[ARMOR][4], 5));
    }
    FUNCTIONS.MAIN.POPUP_CLOSE();
    GenInventory();
    FUNCTIONS.APP.UpdateGame();
}

export function UPGRADE_WEAPON(WEAPON, ITEM) {
    let BONUSES = {
        Normal: 0,
        Common: 1,
        Uncommon: 2,
        Rare: 3,
        Epic: 4,
        Exotic: 5,
        Legendary: 6,
        Divine: 8
    };
    let WEAPON_ID = WEAPON == "Main" ? 1 : 2;
    if (Game.Weapons[WEAPON][2] < Game.MaxUPC[WEAPON_ID + 3]) {
        Game.Weapons[WEAPON][4] += Game.inventory[ITEM].power;
        Game.Weapons[WEAPON][2]++;
        if (APP.ScoreModeEnabled == 1) {
            if (Game.Weapons[WEAPON][3] + (BONUSES[Game.inventory[ITEM].class] / 10) <= APP.MaxScore) Game.Weapons[WEAPON][3] += (BONUSES[Game.inventory[ITEM].class] / 10);
            else Game.Weapons[WEAPON][3] = APP.MaxScore;
        }
        Game.WeaponUpgrades[WEAPON] += Game.inventory[ITEM].power;
        if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
        Game.Weapons[WEAPON][3] = Number(FUNCTIONS.MAIN.FORMAT_NUMBER(Game.Weapons[WEAPON][3], 5));
    }
    FUNCTIONS.MAIN.POPUP_CLOSE();
    GenInventory();
    FUNCTIONS.APP.UpdateGame();
}

// DESTROY EQUIPMENT
export function DestroyWeapon(WEAPON) {
    if (WEAPON == "Main") Game.Weapons.Main = ["Makeshift Stick", "Normal", 0, 1, 10, "Default"];
    else Game.Weapons.Special = ["Makeshift Dagger", "Normal", 0, 1, 10, "Default"];
    CHECK_EQUIPMENT();
    FUNCTIONS.MAIN.POPUP_CLOSE();
    GenInventory();
    FUNCTIONS.APP.UpdateGame();
}

export function ConfirmDestroyWeapon(weapon) {
    APP.ToDelete = Game.Weapons[weapon];
    APP.ToDelete.type = weapon;
    let TIER = APP.ScoreModeEnabled == 0 ? language[APP.LANG].MISC.Level + " " : language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i>";
    var DTIERRANK = APP.ScoreModeEnabled == 0 ? Math.round(APP.ToDelete[3]) : Math.floor(APP.ToDelete[3] * 10);
    FUNCTIONS.MAIN.POPUP("Throw away your current " + weapon + " weapon ?", `<span class='${APP.ToDelete[1]}'>${APP.ToDelete[1]} ${APP.ToDelete[0]} <div class='pw inline label'>${TIER} ${DTIERRANK}</div></span><br><i class='pw blue fas fa-sword'></i>${APP.ToDelete[4]}`, 1);
}

export function DestroyArmor(ARMOR) {
    Game.Armors[ARMOR] = [true, "Basic Armor", "Normal", 100, 1, 0, "Default"];
    Game.MaxUPC[ARMOR - 1] = 0;
    Game.ArmorUpgrades[ARMOR] = 0;
    CHECK_EQUIPMENT();
    FUNCTIONS.MAIN.POPUP_CLOSE();
    GenInventory();
    FUNCTIONS.APP.UpdateGame();
}

export function ConfirmDestroy(ARMOR) {
    APP.ToDelete = Game.Armors[ARMOR];
    APP.ToDelete.type = ARMOR;
    let TIER = APP.ScoreModeEnabled == 0 ? language[APP.LANG].MISC.Level + " " : language[APP.LANG].MISC.Score + " <i class='fad fa-dice-d20'></i>";
    var DTIERRANK = APP.ScoreModeEnabled == 0 ? Math.round(APP.ToDelete[4]) : Math.floor(APP.ToDelete[4] * 10);
    var Names = language[APP.LANG].ARMORS_TYPE;
    FUNCTIONS.MAIN.POPUP("Throw away your current " + Names[ARMOR] + " ?", `<span class='${APP.ToDelete[2]}'>${APP.ToDelete[2]} ${APP.ToDelete[1]} <div class='pw inline label'>${TIER} ${DTIERRANK}</div></span><br>Available slots : ${(Game.MaxUPC[ARMOR - 1] - APP.ToDelete[5])}<i class='pw orange fad fa-gem'></i><br><i class='pw red fas fa-heart'></i>${APP.ToDelete[3]}`, 3);
}

export const RemoveItem = function (ITEM) {
    if (ITEM < Game.MaxInv) {
        if (ITEM >= Game.inventory.length) Game.inventory.splice(ITEM - 1, 1);
        else Game.inventory.splice(ITEM, 1);
    } else Game.inventory.splice(ITEM, 1);
    if ($("#POPUP").find('.pw.message.item').length > 0) FUNCTIONS.COMBAT.UPDATE_LOOT_VIEW(true);
    GenInventory();
    FUNCTIONS.APP.UpdateGame();
};

export const ErrorArmor = function (EQUIPMENT) {
    if (EQUIPMENT < 5) {
        Game.Armors[EQUIPMENT] = [true, "Error", "Error", 100, 1, 0];
        Game.ArmorUpgrades[EQUIPMENT] = 0;
        Game.MaxUPC[EQUIPMENT - 1] = 0;
    } else if (_.inRange(EQUIPMENT, 5, 7)) {
        if (EQUIPMENT == 5) Game.Weapons.Main = ["Error", "Error", 0, 1, 10];
        if (EQUIPMENT == 6) Game.Weapons.Special = ["Error", "Error", 0, 1, 10];
    }
    CHECK_EQUIPMENT();
    GenInventory();
    FUNCTIONS.APP.UpdateGame();
};

export const NEXT_ARMOR_PIECE = function () {
    if (_.inRange(Game.Level, 0, 10)) return 10;
    else if (_.inRange(Game.Level, 10, 20)) return 20;
    else if (_.inRange(Game.Level, 20, 30)) return 30;
    else return 0;
};

export const CHECK_EQUIPMENT = function () {
    Game.MaxLevelReached = 0;
    let QUALITIES = ["Normal", "Common", "Uncommon", "Rare", "Epic", "Exotic", "Legendary", "Divine"];
    let GEMS = {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        "Main": 4,
        "Special": 5
    };
    let ITEM_CONFIG = {
        MULTIPLIERS: [1.05, 1.20, 1.30, 1.40, 1.60, 1.85, 2.10],
        RARITIES: {
            Normal: [1, 1],
            Common: [2, 3050],
            Uncommon: [3, 5550],
            Rare: [4, 7300],
            Epic: [5, 8550],
            Exotic: [6, 9550],
            Legendary: [7, 9900]
        },
        GEMS_MULTIPLIER: {
            Normal: 1.5,
            Common: 2.5,
            Uncommon: 3.5,
            Rare: 5.0,
            Epic: 7.5,
            Exotic: 9,
            Legendary: 10
        },
        RELIC_MULTIPLIERS: {
            Normal: 0.01,
            Common: 0.015,
            Uncommon: 0.025,
            Rare: 0.30,
            Epic: 0.05,
            Exotic: 0.10,
            Legendary: 0.15
        },
    };

    let MAX_QUALITY = APP.ScoreModeEnabled == 1 ? "Legendary" : QUALITIES[GLOBALS.LOCATIONS[FUNCTIONS.MAIN.LATEST_LOCATION_UNLOCKED()][3]];
    let MAX_GEMS = [0, 0]; // LIFE || POWER
    let ARMOR_STAT = [0, 0];
    // GET AVERAGE ARMOR VALUE
    for (let ARMOR in Game.Armors) {
        if (Game.Armors[ARMOR][0]) {
            ARMOR_STAT[0] += Game.Armors[ARMOR][3] - Game.ArmorUpgrades[ARMOR];
            ARMOR_STAT[1]++;
        }
    }
    Game.AverageArmorStat = ARMOR_STAT[0] / ARMOR_STAT[1];
    MAX_GEMS[0] = ITEM_CONFIG.GEMS_MULTIPLIER[MAX_QUALITY] * (Game.AverageArmorStat * 0.01) + ITEM_CONFIG.RARITIES[MAX_QUALITY][0];

    // GET MAXIMUM LIFE GEM VALUE
    for (let ARMOR in Game.Armors) {
        Game.MaxLevelReached = Game.Armors[ARMOR][4] > Game.MaxLevelReached ? Game.Armors[ARMOR][4] : Game.MaxLevelReached;
    }
    // GET MAXIMUM POWER GEM VALUE
    for (let WEAPON in Game.Weapons) {
        MAX_GEMS[1] = ITEM_CONFIG.GEMS_MULTIPLIER[MAX_QUALITY] * ((Game.Weapons[WEAPON][4] - Game.WeaponUpgrades[WEAPON]) * 0.01) + ITEM_CONFIG.RARITIES[MAX_QUALITY][0];
        Game.MaxLevelReached = Game.Weapons[WEAPON][3] > Game.MaxLevelReached ? Game.Weapons[WEAPON][3] : Game.MaxLevelReached;
    }
    let MAX_LEVEL = APP.ScoreModeEnabled == 1 ? APP.MaxScore : APP.MaxLevel;
    if (Game.MaxLevelReached > MAX_LEVEL) Game.MaxLevelReached = MAX_LEVEL;

    // CHECK & AUTO SCALE ARMORS
    for (let ARMOR in Game.Armors) {
        if (ARMOR != 0) {
            let MAX_VALUE = (Game.MaxLevelReached * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[MAX_QUALITY][0] - 1] + 100;
            if (Game.Armors[ARMOR][4] > FUNCTIONS.MAIN.CURRENT_MAX_ITEM_LEVEL()) {
                FUNCTIONS.MAIN.LOG(`Auto scaling of the ${GLOBALS.ARMORS_TYPE[ARMOR]}`, `${Game.Armors[ARMOR][4]} out of ${FUNCTIONS.MAIN.CURRENT_MAX_ITEM_LEVEL()}.`, "white; background-color: rgb(58 59 70)");
                Game.Armors[ARMOR][4] = FUNCTIONS.MAIN.CURRENT_MAX_ITEM_LEVEL();
            }
            if (Number.isNaN(Game.Armors[ARMOR][4])) Game.Armors[ARMOR][4] = Number(Game.Armors[ARMOR][4]);
            if (Game.Armors[ARMOR][6].includes("undefined")) Game.Armors[ARMOR][6] = FUNCTIONS.MAIN.GET_ICON_ID(ARMOR, Game.Armors[ARMOR][2]);
            if ((Game.Armors[ARMOR][3] - Game.ArmorUpgrades[ARMOR]) > MAX_VALUE) {
                FUNCTIONS.MAIN.LOG(`Auto scaling of the ${GLOBALS.ARMORS_TYPE[ARMOR]}`, `${Game.Armors[ARMOR][3]} out of ${Math.floor(MAX_VALUE)}.`, "white; background-color: rgb(58 59 70)");
                Game.Armors[ARMOR][3] = (Math.floor(MAX_VALUE) + Game.ArmorUpgrades[ARMOR]);
            }
            if (Game.ArmorUpgrades[ARMOR] > (MAX_GEMS[0] * Game.MaxUPC[GEMS[ARMOR]])) {
                FUNCTIONS.MAIN.LOG(`Auto scaling the gems of the ${GLOBALS.ARMORS_TYPE[ARMOR]}`, `${Game.ArmorUpgrades[ARMOR]} out of ${Math.round(MAX_GEMS[0] * Game.MaxUPC[GEMS[ARMOR]])}.`, "white; background-color: rgb(58 59 70)");
                Game.ArmorUpgrades[ARMOR] = Math.round(MAX_GEMS[0] * Game.MaxUPC[GEMS[ARMOR]]);
            }
            if (Game.Armors[ARMOR][3] != Math.round(Game.Armors[ARMOR][3]) || Game.ArmorUpgrades[ARMOR] != Math.round(Game.ArmorUpgrades[ARMOR])) {
                Game.Armors[ARMOR][3] = Math.round(Game.Armors[ARMOR][3]);
                Game.ArmorUpgrades[ARMOR] = Math.round(Game.ArmorUpgrades[ARMOR]);
            }
            if (Game.Armors[ARMOR][3] < 0) Game.Armors[ARMOR][3] = Math.floor(MAX_VALUE);
            if (Game.ArmorUpgrades[ARMOR] < 0) Game.ArmorUpgrades[ARMOR] = 0;
        }
    }

    // CHECK & AUTO SCALE WEAPONS
    for (let WEAPON in Game.Weapons) {
        let MAX_VALUE = (Game.MaxLevelReached * 2) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[MAX_QUALITY][0] - 1] + 10;
        if (Game.Weapons[WEAPON][3] > FUNCTIONS.MAIN.CURRENT_MAX_ITEM_LEVEL()) {
            FUNCTIONS.MAIN.LOG(`Auto scaling of the ${WEAPON} weapon`, `${Game.Weapons[WEAPON][3]} out of ${FUNCTIONS.MAIN.CURRENT_MAX_ITEM_LEVEL()}.`, "white; background-color: rgb(58 59 70)");
            Game.Weapons[WEAPON][3] = FUNCTIONS.MAIN.CURRENT_MAX_ITEM_LEVEL();
        }
        if (Number.isNaN(Game.Weapons[WEAPON][3])) Game.Weapons[WEAPON][3] = Number(Game.Weapons[WEAPON][3]);
        if (Game.Weapons[WEAPON][5].includes("undefined")) Game.Weapons[WEAPON][5] = FUNCTIONS.MAIN.GET_ICON_ID(WEAPON, Game.Weapons[WEAPON][1]);
        if ((Game.Weapons[WEAPON][4] - Game.WeaponUpgrades[WEAPON]) > MAX_VALUE) {
            FUNCTIONS.MAIN.LOG(`Auto scaling of the ${WEAPON} weapon`, `${Game.Weapons[WEAPON][4]} out of ${Math.floor(MAX_VALUE)}.`, "white; background-color: rgb(58 59 70)");
            Game.Weapons[WEAPON][4] = (Math.floor(MAX_VALUE) + Game.WeaponUpgrades[WEAPON]);
        }
        if (Game.WeaponUpgrades[WEAPON] > (MAX_GEMS[1] * Game.MaxUPC[GEMS[WEAPON]])) {
            FUNCTIONS.MAIN.LOG(`Auto scaling the gems of the ${WEAPON} weapon`, `${Game.WeaponUpgrades[WEAPON]} out of ${Math.round(MAX_GEMS[1] * Game.MaxUPC[GEMS[WEAPON]])}.`, "white; background-color: rgb(58 59 70)");
            Game.WeaponUpgrades[WEAPON] = Math.round(MAX_GEMS[1] * Game.MaxUPC[GEMS[WEAPON]]);
        }
        if (Game.Weapons[WEAPON][4] != Math.round(Game.Weapons[WEAPON][4]) || Game.WeaponUpgrades[WEAPON] != Math.round(Game.WeaponUpgrades[WEAPON])) {
            Game.Weapons[WEAPON][4] = Math.round(Game.Weapons[WEAPON][4]);
            Game.WeaponUpgrades[WEAPON] = Math.round(Game.WeaponUpgrades[WEAPON]);
        }
        if (Game.Weapons[WEAPON][4] < 0) Game.Weapons[WEAPON][4] = Math.floor(MAX_VALUE);
        if (Game.WeaponUpgrades[WEAPON] < 0) Game.WeaponUpgrades[WEAPON] = 0;
    }

    let ARMORS = {
        1: "Helmet",
        2: "Chestplate",
        3: "Shield",
        4: "Boots"
    };

    for (let RELIC in Game.RELICS) {
        if (RELIC != 0) {
            let MAX_VALUE = ITEM_CONFIG.RELIC_MULTIPLIERS[MAX_QUALITY];
            if (Game.RELICS[RELIC][1] == 1 || Game.RELICS[RELIC][1] == 2) {
                let MAX_ITEM_VALUE = ITEM_CONFIG.RELIC_MULTIPLIERS[Game.RELICS[RELIC][0]];
                if (Game.RELICS[RELIC][2] > MAX_VALUE ) {
                    FUNCTIONS.MAIN.LOG(`Auto scaling the relic of the ${ARMORS[RELIC]}`, `${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.RELICS[RELIC][2], 3)} out of ${FUNCTIONS.MAIN.FORMAT_NUMBER(MAX_VALUE, 3)} ▶ ${FUNCTIONS.MAIN.FORMAT_NUMBER(MAX_VALUE, 3)}.`, "white; background-color: rgb(58 59 70)");
                    Game.RELICS[RELIC][2] = MAX_VALUE;
                }
                if (Game.RELICS[RELIC][2] > MAX_ITEM_VALUE) {
                    FUNCTIONS.MAIN.LOG(`Auto scaling the relic of the ${ARMORS[RELIC]}`, `${FUNCTIONS.MAIN.FORMAT_NUMBER(Game.RELICS[RELIC][2], 3)} out of ${FUNCTIONS.MAIN.FORMAT_NUMBER(MAX_ITEM_VALUE, 3)} ▶ ${FUNCTIONS.MAIN.FORMAT_NUMBER(MAX_VALUE, 3)}.`, "white; background-color: rgb(58 59 70)");
                    Game.RELICS[RELIC][2] = MAX_ITEM_VALUE;
                }
            }
        }
    }
};

export const LATEST_UNLOCKED_ARMOR = function () {
    let LATEST_ARMOR;
    for (let ARMOR in Game.Armors) {
        if (ARMOR != 0 && Game.Armors[ARMOR][0]) LATEST_ARMOR = ARMOR;
    }
    return LATEST_ARMOR;
};

export const CONVERT_EQUIPMENT_TO_ITEM = function (itemData, itemType) {
    let gems = {
        "Helmet": 0,
        "Chestplate": 1,
        "Shield": 2,
        "Boots": 3,
        "Main": 4,
        "Special": 5
    };

    let item = {
        "class": itemData.length == 7 ? itemData[2] : itemData[1],
        "level": itemData.length == 7 ? itemData[4] : itemData[3],
        "ups": itemData.length == 7 ? Game.MaxUPC[gems[itemType]] - itemData[5] : Game.MaxUPC[gems[itemType]] - itemData[2],
        "type": itemData.length == 7 ? "ARMOR" : "WEAPON",
        "type2": itemType,
        "name": itemData.length == 7 ? itemData[1] : itemData[0],
        "icon": itemData.length == 7 ? itemData[6] : itemData[5],
    };
    itemData.length == 7 ? item.life = itemData[3] : item.power = itemData[4];
    return item;
};

function testing_crafting_mats_drops() {
    return _.sample(GLOBALS.LOCATIONS[Game.Location][5].loot);
}

export function GET_AVERAGE_EQUIPMENT_ARMOR() {
    let AVERAGE = 0;
    let divisor = 0;
    for (let armor = 1; armor < 5; armor++) {
        if (Game.Armors[armor][0]) {
            AVERAGE += Game.Armors[armor][3];
            divisor++;
        }
    }
    return FUNCTIONS.MAIN.FORMAT_NUMBER(AVERAGE/divisor, 0);
};

export const CHECK_RELICS_LIMIT = function (relicType) {
    for (let i = 0; i < Game.RELICS.length; i++) {
        if (Game.RELICS[i][1] === relicType) {
            return false;
        }
    }
    return true;
};