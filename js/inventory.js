// INVENTORY VISUALS
const GenInventory = function () {
    var COUNTERS = [0, 0, 0, 0, 0];
    let SCORE = APP.ScoreModeEnabled == 0 ? "Level " + fix(APP.Ranking / 10, 0) : "Score <i class='fad fa-dice-d20'></i>" + fix(APP.Ranking, 0);
    $("#INVENTORY-Gem1").html("");
    $("#INVENTORY-Gem0").html("");
    $("#INVENTORY-Relic").html("");
    $("#INVENTORY-Weapon").html("");
    $("#INVENTORY-Armor").html("");
    $("#EQUIPPED_ITEMS").html($("#EQUIPMENT").html());
    $("#EQUIPMENT_COUNTER").html(`<i class="fas fa-user"></i> Equipment <div class="pw inline label">${SCORE}</div>`);
    $("#INVENTORY_COUNTER").html(`<i class="fas fa-sack icon"></i> Inventory <div class="pw inline label">${Game.inventory.length} / ${Game.MaxInv}</div>`);
    for (let IV in Game.inventory) {
        let INVENTORY = {
            BOX_SHADOW: { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6 },
            ITEM_TYPES: ["", "Armor", "Gem1", "Relic", "Weapon", "Gem0"],
            LEVEL_TYPE: ["Level " + Game.inventory[IV].LEVEL, "Score <i class='fad fa-dice-d20'></i>" + Math.floor(Game.inventory[IV].LEVEL * 10)],
            RELICS_DESC: ["-", "Power bonus of " + fix(Game.inventory[IV].bonus, 2), "Life bonus of " + fix(Game.inventory[IV].bonus, 2), "Minimal drop quality <span class='" + Game.inventory[IV].bonus + "'>" + Game.inventory[IV].bonus + "</span>", "Max Score +" + fix(Game.inventory[IV].bonus, 1)]
        };
        let ITEM = { DESC: "", LEVEL: "" };
        if (Game.inventory[IV] != undefined) {
            var UPS = Game.inventory[IV].ups > 0 ? "<div class='pw inline orange label'><i class='pw orange fad fa-gem'></i> " + Game.inventory[IV].ups + "</div>" : "";
            if (Game.inventory[IV].type == 1) {
                ITEM.LEVEL = INVENTORY.LEVEL_TYPE[APP.ScoreModeEnabled];
                ITEM.DESC = UPS + "<div class='pw inline red label'><i class='pw red fas fa-heart'></i> " + Game.inventory[IV].life + "</div>";
                COUNTERS[1]++;
            } else if (Game.inventory[IV].type == 2) {
                ITEM.DESC = "<div class='pw inline red label'><i class='pw red fas fa-heart'></i> " + Game.inventory[IV].life + "</div>";
                COUNTERS[3]++;
            } else if (Game.inventory[IV].type == 3) {
                ITEM.DESC = "<div class='pw inline label'>" + INVENTORY.RELICS_DESC[Game.inventory[IV].relictype] + "</div>";
                COUNTERS[4]++;
            } else if (Game.inventory[IV].type == 4) {
                ITEM.LEVEL = INVENTORY.LEVEL_TYPE[APP.ScoreModeEnabled];
                ITEM.DESC = UPS + "<div class='pw inline blue label'><i class='pw blue fas fa-sword'></i> " + Game.inventory[IV].power + "</div>";
                COUNTERS[0]++;
            } else if (Game.inventory[IV].type == 5) {
                ITEM.DESC = "<div class='pw inline blue label'><i class='pw blue fas fa-sword'></i> " + Game.inventory[IV].power + "</div>";
                COUNTERS[2]++;
            }
            var IS_LEVEL_SET = ITEM.LEVEL != "" ? "<div class='pw inline label'>" + ITEM.LEVEL + "</div>" : "";
            $("#INVENTORY-" + INVENTORY.ITEM_TYPES[Game.inventory[IV].type]).append(`<div class="pw message"><div class="pw horizontal segments">
                <div class="pw little segment"> <div onclick="EquipItem(${IV}, ${Game.inventory[IV].type})" class="pw green button"><i class="fal fa-check"></i></div> </div>
                <div class="pw segment">
                <span class="${Game.inventory[IV].class}" id="${IV}">${Game.inventory[IV].class}</span>
                ${Game.inventory[IV].name} ${IS_LEVEL_SET} ${ITEM.DESC}
                </div>
                <div class="pw little segment"> <div onclick="RemoveItem(${IV})" class="pw red button"><i class="fas fa-trash"></i></div> </div>
                </div></div>`
            );
        }
    }
    $("#WEAPONS_COUNT").html(`Weapons <div class="pw inline label">${COUNTERS[0]}</div>`);
    $("#ARMORS_COUNT").html(`Armors <div class="pw inline label">${COUNTERS[1]}</div>`);
    $("#POWER_GEMS_COUNT").html(`Power Gems <div class="pw inline label">${COUNTERS[2]}</div>`);
    $("#LIFE_GEMS_COUNT").html(`Life Gems <div class="pw inline label">${COUNTERS[3]}</div>`);
    $("#RELICS_COUNT").html(`Relics <div class="pw inline label">${COUNTERS[4]}</div>`);
};

const GenWeapons = function () {
    var TYPE = "";
    for (var T = 1; T < 3; T++) {
        var Names = ["", "Sword", "Dagger"];
        if (T == 1) TYPE = "Main";
        else TYPE = "Special";
        Game.Weapons[TYPE][0] = Game.Weapons[TYPE][0].replace(/Weapon/gi, Names[T]);
        var Class = 0;
        if (Game.Weapons[TYPE][1] == "Common") Class = "1";
        if (Game.Weapons[TYPE][1] == "Uncommon") Class = "2";
        if (Game.Weapons[TYPE][1] == "Rare") Class = "3";
        if (Game.Weapons[TYPE][1] == "Epic") Class = "4";
        if (Game.Weapons[TYPE][1] == "Exotic") Class = "5";
        if (Game.Weapons[TYPE][1] == "Divine") Class = "6";
        if (Game.Weapons[TYPE][1] == "Error") Class = "E";
        $("#" + TYPE + "Weapon").attr("class", "pw segment");
        $("#" + TYPE + "Weapon").attr("style", `--QUALITY:var(--${Game.Weapons[TYPE][1]});`);
        var LEVELTEXT = APP.ScoreModeEnabled == 0 ? "Level " + fix(Math.floor(Game.Weapons[TYPE][3]), 0) : "Score <i class='fad fa-dice-d20'></i>" + fix(Math.floor(Game.Weapons[TYPE][3] * 10), 0);
        var UPWSELECTOR = T == 1 ? 4 : 5;
        var WEAPONUPC = Game.Weapons[TYPE][2] == Game.MaxUPC[UPWSELECTOR] ? "" : "pw green";
        var UPWTEXT = Game.MaxUPC[UPWSELECTOR] > 0 ? "<i class='pw orange fad fa-gem'></i> <span class='" + WEAPONUPC + "'>" + Game.Weapons[TYPE][2] + "</span>/" + Game.MaxUPC[UPWSELECTOR] : "";
        if (Game.MaxUPC[UPWSELECTOR] > 0) $("#" + TYPE + "WeaponGems").show();
        else $("#" + TYPE + "WeaponGems").hide();
        $("#" + TYPE + "WeaponGems").html(UPWTEXT);
        if (Class == "E") $("#" + TYPE + "WeaponSprite").html("<div class='pw image error-img'></div>");
        else $("#" + TYPE + "WeaponSprite").html("<img class='pw centered tiny image' src='images/Weapons/" + TYPE + "-" + Class + ".png'></img>");
        $("#" + TYPE + "WeaponLevel").html(LEVELTEXT);
        $("#" + TYPE + "WeaponText").html("<i class='pw blue fas fa-sword'></i> " + Game.Weapons[TYPE][4]);
        $("#" + TYPE + "WeaponTitle").html("<span class='" + Game.Weapons[TYPE][1] + "'>" + Game.Weapons[TYPE][1] + "</span> " + Game.Weapons[TYPE][0]);
    }
};

const GenArmors = function () {
    let Names = ["", "Helmet", "Armor", "Shield", "Boots"];
    for (let UPC = 1; UPC < 5; UPC++) {
        let Class = 0;
        let RLSTXT = "";
        let armor = "armor" + UPC;
        Game.Armors[UPC][1] = Game.Armors[UPC][1].replace(/Armor/gi, Names[UPC]);
        if (Game.Armors[UPC][2] == "Common") Class = "1";
        if (Game.Armors[UPC][2] == "Uncommon") Class = "2";
        if (Game.Armors[UPC][2] == "Rare") Class = "3";
        if (Game.Armors[UPC][2] == "Epic") Class = "4";
        if (Game.Armors[UPC][2] == "Exotic") Class = "5";
        if (Game.Armors[UPC][2] == "Divine") Class = "6";
        if (Game.Armors[UPC][2] == "Error") Class = "E";
        $("#" + armor).attr("class", "pw segment");
        $("#" + armor).attr("style", `--QUALITY:var(--${Game.Armors[UPC][2]});`);
        $("#D" + armor).attr("onclick", "ConfirmDestroy(" + UPC + ");");
        if (Game.RELICS[UPC][1] == 1) RLSTXT = "Power bonus of " + fix(Game.RELICS[UPC][2], 2);
        if (Game.RELICS[UPC][1] == 2) RLSTXT = "Life bonus of " + fix(Game.RELICS[UPC][2], 2);
        if (Game.RELICS[UPC][1] == 3) RLSTXT = "Minimal drop quality <span class='" + Game.RELICS[UPC][2] + "'>" + Game.RELICS[UPC][2] + "</span>";
        if (Game.RELICS[UPC][1] == 4) RLSTXT = "Max Score +" + fix(Game.RELICS[UPC][2], 1);
        if (Game.RELICS[UPC][1] != 5) RLSTXT = "<i class='pw yellow fas fa-stars'></i> " + RLSTXT;
        var LEVELICON = APP.ScoreModeEnabled == 0 ? "Level" : "Score";
        var LEVELTEXT = APP.ScoreModeEnabled == 0 ? fix(Math.floor(Game.Armors[UPC][4]), 0) : "<i class='fad fa-dice-d20'></i>" + fix(Math.floor(Game.Armors[UPC][4] * 10), 0);
        $("#armor" + UPC + "-level").html(LEVELICON + " " + LEVELTEXT);
        var COREUPC = Game.Armors[UPC][5] == Game.MaxUPC[UPC - 1] ? "" : "pw green";
        var UPCTEXT = Game.MaxUPC[UPC - 1] > 0 ? "<i class='pw orange fad fa-gem'></i> <span class='" + COREUPC + "'>" + Game.Armors[UPC][5] + "</span>/" + Game.MaxUPC[UPC - 1] : "";
        $("#" + armor + "-life").html("<i class='pw red fas fa-heart'></i> " + fix(Game.Armors[UPC][3], 1));
        $("#" + armor + "-rarity").html(RLSTXT);
        $("#" + armor + "-gems").html(UPCTEXT);
        if (Game.MaxUPC[UPC - 1] > 0) $("#" + armor + "-gems").show();
        else $("#" + armor + "-gems").hide();
        if (Class == "E") $("#" + armor + "-image").html("<div class='pw image error-img'></div>");
        else $("#" + armor + "-image").html("<img class='pw centered tiny image' style='margin-top: 1em; height: 80px; width: auto;' src='images/Armors/" + UPC + "-" + Class + ".png'></div>");
        $("#" + armor + "-title").html("<span class='" + Game.Armors[UPC][2] + "'>" + Game.Armors[UPC][2] + "</span> " + Game.Armors[UPC][1]);
        if (!Game.Armors[UPC][0]) $("#" + armor).hide();
        else $("#" + armor).show();
    }
    if (Game.Level < 30) $("#NextArmor").html("Next armor piece unlocked at Lv. " + NEXT_ARMOR_PIECE());
    else $("#NextArmor").html("");
};

// ITEM GENERATION
const newItem = function (OBJECT, LEVEL, CLASS) {
    if (APP.ScoreModeEnabled == 1) LEVEL /= 10;
    let ITEM_CONFIG = {
        MULTIPLIERS: [_.random(1.00, 1.05, true), _.random(1.15, 1.20, true), _.random(1.25, 1.30, true), _.random(1.35, 1.40, true), _.random(1.50, 1.60, true), _.random(1.75, 1.85, true), _.random(1.95, 2.10, true)],
        RARITIES: { Normal: [1, 1], Common: [2, 2000], Uncommon: [3, 5000], Rare: [4, 7000], Epic: [5, 8500], Exotic: [6, 9500], Divine: [7, 9850] },
        RELIC_MULTIPLIERS: [_.random(0.01, 0.025, true), _.random(0.025, 0.05, true), _.random(0.05, 0.10, true), _.random(0.10, 0.15, true), _.random(0.15, 0.20, true), _.random(0.20, 0.25, true), _.random(0.25, 0.30, true)],
        RELIC_SCORE_MUTLIPLIERS: [_.random(1, 5), _.random(6, 10), _.random(11, 15), _.random(16, 20), _.random(21, 25), _.random(26, 50), _.random(51, 100)],
        GEMS_MULTIPLIERS: { Normal: _.random(1.0, 1.5, true), Common: _.random(1.5, 2.5, true), Uncommon: _.random(2.5, 3.5, true), Rare: _.random(3.5, 5.0, true), Epic: _.random(5.0, 7.5, true), Exotic: _.random(7.5, 9, true), Divine: _.random(8.5, 10, true) },
        MAX_GEMS_MULTIPLIER: { Normal: 1.5, Common: 2.5, Uncommon: 3.5, Rare: 5.0, Epic: 7.5, Exotic: 9, Divine: 10 },
    };
    let CLASSES = Object.keys(ITEM_CONFIG.RARITIES);
    let ITEM = {};
    if (LEVEL < 1) LEVEL = 1;
    let BALANCE_EQUIPMENT = [67, 50, 40, 33];
    if (OBJECT == 0) {
        if (_.random(0, 100) > BALANCE_EQUIPMENT[LATEST_UNLOCKED_ARMOR() - 1]) OBJECT = "Weapon";
        else OBJECT = "Armor";
    }
    let BASE_LUCK = ITEM_CONFIG.RARITIES[CLASS][1];
    for (var RELIC in Game.RELICS) { // IF PLAYER HAS A MINIMAL RARITY RELIC THEN USE IT HERE
        if (Game.RELICS[RELIC][1] == 3 && BASE_LUCK < ITEM_CONFIG.RARITIES[Game.RELICS[RELIC][2]][1]) BASE_LUCK = ITEM_CONFIG.RARITIES[Game.RELICS[RELIC][2]][1];
    }
    if (APP.ScoreModeEnabled == 1 && BASE_LUCK < 7000) { // IF IN SCORE MODE REPLACE ALL LOW CLASS ITEMS WITH HIGH CLASS ONES
        let LUCK_PER_TYPES = { 0: 7000, 1: 7000, 2: 7000, 3: 7000, 4: 7000, 5: 8500, 6: 8500, 7: 9850 };
        BASE_LUCK = LUCK_PER_TYPES[Game.Enemy[1]];
        if (LEVEL > APP.MaxScore) LEVEL = APP.MaxScore;
        if (Game.MissionStarted[0] && GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2) BASE_LUCK = Game.Enemy == 7 ? 9850 : 9500; // IF IN A FORTRESS GENERATE AN EXOTIC OR BETTER
    } else {
        if (LEVEL > Game.Level && APP.ScoreModeEnabled == 0) LEVEL = Game.Level;
        if (LEVEL > GLOBALS.LOCATIONS[Game.Location][2] && APP.ScoreModeEnabled == 0) LEVEL = GLOBALS.LOCATIONS[Game.Location][2];
    }
    let MAX_LUCK = ITEM_CONFIG.RARITIES[CLASSES[GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3]]][1]; // DEFINE THE MAXIMUM DROP QUALITY TO LOCATION MAX
    if (_.inRange(Game.Level, 0, 5) && GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3] >= 0) MAX_LUCK = 1999; // NORMAL
    if (_.inRange(Game.Level, 5, 10) && GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3] >= 1) MAX_LUCK = 4999; // COMMON
    if (_.inRange(Game.Level, 10, 15) && GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3] >= 2) MAX_LUCK = 6999; // UNCOMMON
    if (_.inRange(Game.Level, 15, 20) && GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3] >= 3) MAX_LUCK = 8499; // RARE
    if (_.inRange(Game.Level, 20, 30) && GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3] >= 4) MAX_LUCK = 9499; // EPIC
    if (_.inRange(Game.Level, 30, 35) && GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3] >= 5) MAX_LUCK = 9849; // EXOTIC
    if (_.inRange(Game.Level, 35, 36) && GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3] >= 5) MAX_LUCK = 10000; // DIVINE
    if (BASE_LUCK > MAX_LUCK) BASE_LUCK = MAX_LUCK;
    let LUCK = _.random(BASE_LUCK, MAX_LUCK);
    ITEM.class = "Normal";
    if (_.inRange(LUCK, 2000, 5000)) ITEM.class = "Common";
    if (_.inRange(LUCK, 5000, 7000)) ITEM.class = "Uncommon";
    if (_.inRange(LUCK, 7000, 8500)) ITEM.class = "Rare";
    if (_.inRange(LUCK, 8500, 9500)) ITEM.class = "Epic";
    if (_.inRange(LUCK, 9500, 9850)) ITEM.class = "Exotic";
    if (_.inRange(LUCK, 9850, 10001)) ITEM.class = "Divine";
    if (OBJECT == "Armor") { // GENERATE AN ARMOR
        ITEM.name = GLOBALS.ARMORS_NAMES[[ITEM.class]][Math.floor(Math.random() * GLOBALS.ARMORS_NAMES[ITEM.class].length)] + " Armor";
        if (LEVEL > APP.MaxScore) LEVEL = APP.MaxScore;
        ITEM.LEVEL = LEVEL;
        ITEM.ups = GET_MAX_UPGRADES(ITEM.class);
        if (APP.ScoreModeEnabled == 1) ITEM.life = Math.floor(random((LEVEL * 10) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] * 0.75) + 100, (LEVEL * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 100));
        else ITEM.life = Math.floor(random((LEVEL * 10) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] * 0.9) + 100, (LEVEL * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 100));
        ITEM.type = 1; // SET AS ARMOR
    } else if (OBJECT == "Weapon") { // GENERATE A WEAPON
        ITEM.name = GLOBALS.ARMORS_NAMES[[ITEM.class]][Math.floor(Math.random() * GLOBALS.ARMORS_NAMES[ITEM.class].length)] + " Weapon";
        if (LEVEL > APP.MaxScore) LEVEL = APP.MaxScore;
        ITEM.LEVEL = LEVEL;
        ITEM.ups = GET_MAX_UPGRADES(ITEM.class);
        if (APP.ScoreModeEnabled == 1) ITEM.power = Math.floor(random((LEVEL * 2) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] * 0.75) + 5, (LEVEL * 2) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 10));
        else ITEM.power = Math.floor(random((LEVEL * 2) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] * 0.9) + 5, (LEVEL * 2) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 10));
        ITEM.type = 4; // SET AS WEAPON
    } else if (OBJECT == "Gem") { // GENERATE A GEM
        let GEMTYPE = _.random(1, 100);
        let GEMS_DROP_RATES = APP.ScoreModeEnabled == 1 ? { MIN: [0, 45], MAX: [46, 101] } : { MIN: [0, 50], MAX: [51, 101] };
        if (_.inRange(GEMTYPE, GEMS_DROP_RATES.MIN[0], GEMS_DROP_RATES.MAX[0])) { //GENERATE A POWER GEM
            ITEM.power = Math.floor(ITEM_CONFIG.GEMS_MULTIPLIERS[ITEM.class] * ((Game.Weapons.Main[4] - Game.WeaponUpgrades.Main) * 0.01) + ITEM_CONFIG.RARITIES[ITEM.class][0]);
            if (ITEM.power < 1) ITEM.power = 1;
            ITEM.life = 0;
            ITEM.name = "Power Gem";
            ITEM.LEVEL = ITEM_CONFIG.RARITIES[ITEM.class][0];
            ITEM.type = 5; // SET AS POWER GEM
        }
        if (_.inRange(GEMTYPE, GEMS_DROP_RATES.MIN[1], GEMS_DROP_RATES.MAX[1])) { //GENERATE A LIFE GEM

            let BASE_GEM_LIFE = Math.floor((APP.Ranking / 10 * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1] + 100);
            ITEM.life = Math.floor(ITEM_CONFIG.GEMS_MULTIPLIERS[ITEM.class] * (BASE_GEM_LIFE * 0.01) + ITEM_CONFIG.RARITIES[ITEM.class][0]);
            if (ITEM.life < 1) ITEM.life = 1;
            ITEM.power = 0;
            ITEM.name = "Life Gem";
            ITEM.LEVEL = ITEM_CONFIG.RARITIES[ITEM.class][0];
            ITEM.type = 2; // SET AS LIFE GEM
        }
    } else if (OBJECT == "Relic") { // GENERATE A RELIC
        let RelicType = Game.Level > 10 ? _.random(0, 2) : _.random(0, 1);
        if (APP.ScoreModeEnabled == 1) RelicType = _.random(0, 3);
        // ARES - POWER BONUS
        if (RelicType == 0) ITEM.bonus = ITEM_CONFIG.RELIC_MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1];
        // YGGDRASIL - LIFE BONUS
        if (RelicType == 1) ITEM.bonus = ITEM_CONFIG.RELIC_MULTIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1];
        // HERMES - MINIMAL RARITY
        if (RelicType == 2) {
            ITEM.bonus = CLASSES[_.random(0, ITEM_CONFIG.RARITIES[ITEM.class][0]) - 1];
            if (ITEM_CONFIG.RARITIES[ITEM.class][0] > 1) ITEM.bonus = CLASSES[_.random(ITEM_CONFIG.RARITIES[ITEM.class][0] - 2, ITEM_CONFIG.RARITIES[ITEM.class][0] - 1)];
            if (ITEM_CONFIG.RARITIES[ITEM.class][0] > 2) ITEM.bonus = CLASSES[_.random(ITEM_CONFIG.RARITIES[ITEM.class][0] - 3, ITEM_CONFIG.RARITIES[ITEM.class][0] - 1)];
        }
        // VULCAN - MAX SCORE
        if (RelicType == 3) ITEM.bonus = ITEM_CONFIG.RELIC_SCORE_MUTLIPLIERS[ITEM_CONFIG.RARITIES[ITEM.class][0] - 1];
        ITEM.relictype = RelicType + 1;
        ITEM.name = GLOBALS.RELICS_NAMES[RelicType];
        ITEM.type = 3; // SET AS RELIC
    }
    if ((OBJECT == 'Armor' || OBJECT == 'Weapon' || OBJECT == 'Gem' || OBJECT == 'Relic') && Game.inventory.length - 1 < Game.MaxInv) Game.inventory[Game.inventory.length] = ITEM;
    GenInventory();
};

// EQUIPMENT INSTALLATION
const EquipItem = function (ITEM, TYPE) {
    let ARMOR_TYPES = ["", "Helmet", "Armor", "Shield", "Boots"];
    let ARMOR_BUTTON = [];
    let WEAPON_BUTTON = [];
    let ARMOR_UPGRADE_BUTTON = [];
    let RELIC_BUTTON = [];
    let WEAPON_UPGRADE_BUTTON = [];
    if (TYPE == 1) {
        for (let ARMOR in Game.Armors) {
            if (Game.Armors[ARMOR][0]) ARMOR_BUTTON[ARMOR] = "<div onclick='NewCore(" + ARMOR + ", " + ITEM + ");' class='pw alpha button'>Use as " + ARMOR_TYPES[ARMOR] + "</div>";
        }
        POPUP("Select an Armor Slot", "<div class='pw fluid vertical buttons'>" + ARMOR_BUTTON[1] + ARMOR_BUTTON[2] + ARMOR_BUTTON[3] + ARMOR_BUTTON[4] + "</div>", 0);
    } else if (TYPE == 2) {
        for (let ARMOR in Game.Armors) {
            ARMOR_UPGRADE_BUTTON[ARMOR] = Game.Armors[ARMOR][0] ? `<div onclick='UPGRADE_ARMOR(${ARMOR}, ${ITEM});' class='pw alpha button'>Upgrade ${ARMOR_TYPES[ARMOR]}</div>` : ``;
            if (Game.Armors[ARMOR][5] >= Game.MaxUPC[ARMOR - 1] && Game.Armors[ARMOR][0]) ARMOR_UPGRADE_BUTTON[ARMOR] = `<div class='pw darkgrey button'>No gem slots left for the ${ARMOR_TYPES[ARMOR]}.</div>`;
        }
        POPUP("Select an Armor Slot", "<div class='pw fluid vertical buttons'>" + ARMOR_UPGRADE_BUTTON[1] + ARMOR_UPGRADE_BUTTON[2] + ARMOR_UPGRADE_BUTTON[3] + ARMOR_UPGRADE_BUTTON[4] + "</div>", 0);
    } else if (TYPE == 3) {
        for (let RELIC in Game.RELICS) {
            if (RELIC != 0) RELIC_BUTTON[RELIC] = Game.Armors[RELIC][0] ? `<div onclick="ConfirmRelic(${RELIC}, ${ITEM});" class="pw alpha button">Apply on ${ARMOR_TYPES[RELIC]}</div>` : ``;
        }
        POPUP("Select a Relic Slot", "<div class='pw fluid vertical buttons'>" + RELIC_BUTTON[1] + RELIC_BUTTON[2] + RELIC_BUTTON[3] + RELIC_BUTTON[4] + "</div>", 0);
    } else if (TYPE == 4) {
        for (let WEAPON in Game.Weapons) WEAPON_BUTTON[WEAPON] = `<div onClick='NewWeapon("${WEAPON}", ${ITEM});' class='pw alpha button'>Use as ${WEAPON} weapon</div>`;
        POPUP("Select a Weapon Slot", "<div class='pw fluid vertical buttons'>" + WEAPON_BUTTON.Main + WEAPON_BUTTON.Special + "</div>", 0);
    } else if (TYPE == 5) {
        for (let WEAPON in Game.Weapons) {
            let NUMBER = 4;
            if (WEAPON != "Main") NUMBER = 5;
            WEAPON_UPGRADE_BUTTON[WEAPON] = Game.Armors[1][0] ? `<div onClick='UPGRADE_WEAPON("${WEAPON}", ${ITEM});' class='pw alpha button'>Upgrade ${WEAPON} Weapon</div>` : ``;
            if (Game.Weapons[WEAPON][2] >= Game.MaxUPC[NUMBER]) WEAPON_UPGRADE_BUTTON[WEAPON] = `<div class='pw darkgrey button'>No gem slots left for the ${WEAPON} weapon.</div>`;
        }
        POPUP("Select a Weapon Slot", "<div class='pw fluid vertical buttons'>" + WEAPON_UPGRADE_BUTTON.Main + WEAPON_UPGRADE_BUTTON.Special + "</div>", 0);
    }
    Game.isInFight = 0;
    UpdateGame();
};

const NewCore = function (ARMOR, ITEM) {
    APP.ToAdd = [ARMOR, ITEM];
    let CONFIG = {
        OLD_ARMOR: Game.Armors[ARMOR],
        NEW_ARMOR: [true, Game.inventory[ITEM].name, Game.inventory[ITEM].class, Game.inventory[ITEM].life, Game.inventory[ITEM].LEVEL, Game.inventory[ITEM].ups],
        COLORS: {
            OLD: ["none", "none", "none", "", "", ""],
            NEW: ["none", "none", "none", "", "", ""]
        }
    };
    let TIER = APP.ScoreModeEnabled == 0 ? "Level " : "Score <i class='fad fa-dice-d20'></i>";
    CONFIG.OLD_ARMOR[4] = APP.ScoreModeEnabled == 0 ? CONFIG.OLD_ARMOR[4] : Math.floor(CONFIG.OLD_ARMOR[4] * 10);
    CONFIG.NEW_ARMOR[4] = APP.ScoreModeEnabled == 0 ? CONFIG.NEW_ARMOR[4] : Math.floor(CONFIG.NEW_ARMOR[4] * 10);
    for (let CURRENT = 3; CURRENT < 6; CURRENT++) {
        if (CONFIG.NEW_ARMOR[CURRENT] != CONFIG.OLD_ARMOR[CURRENT]) {
            CONFIG.COLORS.OLD[CURRENT] = CONFIG.OLD_ARMOR[CURRENT] > CONFIG.NEW_ARMOR[CURRENT] ? "pw green" : "pw red";
            CONFIG.COLORS.NEW[CURRENT] = CONFIG.OLD_ARMOR[CURRENT] < CONFIG.NEW_ARMOR[CURRENT] ? "pw green" : "pw red";
        }
    }
    if (Game.config[0] == 1) POPUP(`Do you really want to equip this new ${GLOBALS.ARMORS_TYPE[ARMOR]} ?`,
        `<div class="pw horizontal segments"><div class="pw segment">Old</div><div class="pw little segment"><i class="fal fa-arrow-right"></i></div><div class="pw segment">New</div></div>
        <div class="pw horizontal segments">
        <div class="pw segment"><div>${CONFIG.OLD_ARMOR[1]}<div class="pw inline label">${TIER} <span class="${CONFIG.COLORS.OLD[4]}">${CONFIG.OLD_ARMOR[4]}</span></div></div><div class="${CONFIG.OLD_ARMOR[2]}">${CONFIG.OLD_ARMOR[2]}</div><div class="pw inline orange label"><i class="pw orange fad fa-gem"></i> <span class="${CONFIG.COLORS.OLD[5]}">${CONFIG.OLD_ARMOR[5]}</span></div><div class="pw inline red label"><i class="pw red fas fa-heart"></i> <span class="${CONFIG.COLORS.OLD[3]}">${CONFIG.OLD_ARMOR[3]}</span></div></div>
        <div class="pw little segment"></div>
        <div class="pw segment"><div>${CONFIG.NEW_ARMOR[1]}<div class="pw inline label">${TIER} <span class="${CONFIG.COLORS.NEW[4]}">${CONFIG.NEW_ARMOR[4]}</span></div></div><div class="${CONFIG.NEW_ARMOR[2]}">${CONFIG.NEW_ARMOR[2]}</div><div class="pw inline orange label"><i class="pw orange fad fa-gem"></i> <span class="${CONFIG.COLORS.NEW[5]}">${CONFIG.NEW_ARMOR[5]}</span></div><div class="pw inline red label"><i class="pw red fas fa-heart"></i> <span class="${CONFIG.COLORS.NEW[3]}">${CONFIG.NEW_ARMOR[3]}</span></div></div>
        </div>`, 6);
    else DefineCore(ARMOR, ITEM);
};

const DefineCore = function (ARMOR, ITEM) {
    if (Game.config[0] == 1) POPUP_CLOSE();
    if (typeof (Game.inventory[ITEM].life) !== 'undefined') {
        Game.Armors[ARMOR] = [true, Game.inventory[ITEM].name, Game.inventory[ITEM].class, Game.inventory[ITEM].life, Game.inventory[ITEM].LEVEL, 0];
        Game.MaxUPC[ARMOR - 1] = Game.inventory[ITEM].ups;
        Game.ArmorUpgrades[ARMOR] = 0;
    }
    if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
    if ($('#DIV-INVENTORY').is(":visible")) POPUP_CLOSE();
    else hideRewards();
    Game.isInFight = 0;
    GenInventory();
    UpdateGame();
};

const NewWeapon = function (WEAPON, ITEM) {
    APP.ToAdd = [WEAPON, ITEM];
    let CONFIG = {
        OLD_WEAPON: [true, Game.Weapons[WEAPON][0], Game.Weapons[WEAPON][1], Game.Weapons[WEAPON][4], Game.Weapons[WEAPON][3], Game.Weapons[WEAPON][2]],
        NEW_WEAPON: [true, Game.inventory[ITEM].name, Game.inventory[ITEM].class, Game.inventory[ITEM].power, Game.inventory[ITEM].LEVEL, Game.inventory[ITEM].ups],
        COLORS: {
            OLD: ["none", "none", "none", "", "", ""],
            NEW: ["none", "none", "none", "", "", ""]
        }
    };
    let TIER = APP.ScoreModeEnabled == 0 ? "Level " : "Score <i class='fad fa-dice-d20'></i>";
    CONFIG.OLD_WEAPON[4] = APP.ScoreModeEnabled == 0 ? CONFIG.OLD_WEAPON[4] : Math.floor(CONFIG.OLD_WEAPON[4] * 10);
    CONFIG.NEW_WEAPON[4] = APP.ScoreModeEnabled == 0 ? CONFIG.NEW_WEAPON[4] : Math.floor(CONFIG.NEW_WEAPON[4] * 10);
    for (let CURRENT = 3; CURRENT < 6; CURRENT++) {
        if (CONFIG.NEW_WEAPON[CURRENT] != CONFIG.OLD_WEAPON[CURRENT]) {
            CONFIG.COLORS.OLD[CURRENT] = CONFIG.OLD_WEAPON[CURRENT] > CONFIG.NEW_WEAPON[CURRENT] ? "pw green" : "pw red";
            CONFIG.COLORS.NEW[CURRENT] = CONFIG.OLD_WEAPON[CURRENT] < CONFIG.NEW_WEAPON[CURRENT] ? "pw green" : "pw red";
        }
    }
    if (Game.config[0] == 1) POPUP(`Do you really want to equip this weapon as your ${WEAPON} weapon ?`,
        `<div class="pw horizontal segments"><div class="pw segment">Old</div><div class="pw little segment"><i class="fal fa-arrow-right"></i></div><div class="pw segment">New</div></div>
        <div class="pw horizontal segments">
        <div class="pw segment"><div>${CONFIG.OLD_WEAPON[1]}<div class="pw inline label">${TIER} <span class="${CONFIG.COLORS.OLD[4]}">${CONFIG.OLD_WEAPON[4]}</span></div></div><div class="${CONFIG.OLD_WEAPON[2]}">${CONFIG.OLD_WEAPON[2]}</div><div class="pw inline orange label"><i class="pw orange fad fa-gem"></i> <span class="${CONFIG.COLORS.OLD[5]}">${CONFIG.OLD_WEAPON[5]}</span></div><div class="pw inline red label"><i class="pw red fas fa-heart"></i> <span class="${CONFIG.COLORS.OLD[3]}">${CONFIG.OLD_WEAPON[3]}</span></div></div>
        <div class="pw little segment"></div>
        <div class="pw segment"><div>${CONFIG.NEW_WEAPON[1]}<div class="pw inline label">${TIER} <span class="${CONFIG.COLORS.NEW[4]}">${CONFIG.NEW_WEAPON[4]}</span></div></div><div class="${CONFIG.NEW_WEAPON[2]}">${CONFIG.NEW_WEAPON[2]}</div><div class="pw inline orange label"><i class="pw orange fad fa-gem"></i> <span class="${CONFIG.COLORS.NEW[5]}">${CONFIG.NEW_WEAPON[5]}</span></div><div class="pw inline red label"><i class="pw red fas fa-heart"></i> <span class="${CONFIG.COLORS.NEW[3]}">${CONFIG.NEW_WEAPON[3]}</span></div></div>
        </div>`, 7);
    else DefineWeapon(WEAPON, ITEM);
};

const DefineWeapon = function (type, ITEM) {
    let UPC_TYPE = { Main: 1, Special: 2 };
    if (typeof (Game.inventory[ITEM].power) !== 'undefined') {
        Game.Weapons[type] = [Game.inventory[ITEM].name, Game.inventory[ITEM].class, 0, Game.inventory[ITEM].LEVEL, Game.inventory[ITEM].power];
        Game.MaxUPC[UPC_TYPE[type] + 3] = Game.inventory[ITEM].ups;
        Game.WeaponUpgrades[type] = 0;
    }
    if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
    Game.isInFight = 0;
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
};

const ConfirmRelic = function (RELIC, ITEM) {
    APP.ToAdd = [RELIC, ITEM];
    let IRCOLOR = Game.RELICS[RELIC][1] == 5 ? "pw green" : "pw red";
    let IRCOLOR2 = Game.RELICS[RELIC][1] == 5 ? "pw green" : "pw red";
    if (Game.RELICS[RELIC][1] == Game.inventory[ITEM].relictype && Game.RELICS[RELIC][2] > Game.inventory[ITEM].bonus) IRCOLOR = "pw green";
    if (Game.RELICS[RELIC][1] == Game.inventory[ITEM].relictype && Game.RELICS[RELIC][2] < Game.inventory[ITEM].bonus) IRCOLOR2 = "pw green";
    let DESCS = ["-",
        "Power bonus of <span class='" + IRCOLOR + "'>" + fix(Game.RELICS[RELIC][2], 2) + "</span>",
        "Life bonus of <span class='" + IRCOLOR + "'>" + fix(Game.RELICS[RELIC][2], 2) + "</span>",
        "Minimal drop quality <span class='" + Game.RELICS[RELIC][2] + "'>" + Game.RELICS[RELIC][2] + "</span>",
        "Max Score +<span class='" + IRCOLOR + "'>" + fix(Game.RELICS[RELIC][2], 1) + "</span>",
        "-"
    ];
    let DESCS2 = ["-",
        "Power bonus of <span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[ITEM].bonus, 2) + "</span>",
        "Life bonus of <span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[ITEM].bonus, 2) + "</span>",
        "Minimal drop quality <span class='" + Game.inventory[ITEM].bonus + "'>" + Game.inventory[ITEM].bonus + "</span>",
        "Max Score +<span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[ITEM].bonus, 1) + "</span>",
        "-"
    ];
    if (Game.config[1] == 1) POPUP("New Relic confirmation", `<div class="pw horizontal segments"><div class="pw segment">Old</div><div class="pw little segment"><i class="fal fa-arrow-right"></i></div><div class="pw segment">New</div></div>
        <div class="pw horizontal segments">
        <div class="pw segment"><div>${GLOBALS.RELICS_NAMES[Game.RELICS[RELIC][1] - 1]}</div><div class="${Game.RELICS[RELIC][0]}">${Game.RELICS[RELIC][0]}</div><div>${DESCS[Game.RELICS[RELIC][1]]}</div></div>
        <div class="pw little segment"></div>
        <div class="pw segment"><div>${Game.inventory[ITEM].name}</div><div class="${Game.inventory[ITEM].class}">${Game.inventory[ITEM].class}</div><div>${DESCS2[Game.inventory[ITEM].relictype]}</div></div>
        </div>`, 4);
    else InstallRelic(RELIC, ITEM);
};

const InstallRelic = function (RELIC, ITEM) {
    Game.RELICS[RELIC] = [Game.inventory[ITEM].class, Game.inventory[ITEM].relictype, Game.inventory[ITEM].bonus];
    if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
    if ($('#DIV-INVENTORY').is(":visible")) POPUP_CLOSE();
    else hideRewards();
    POPUP_CLOSE();
    GenInventory();
};

// UPGRADE EQUIPMENT
function UPGRADE_ARMOR(ARMOR, ITEM) {
    let BONUSES = { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6 };
    if (Game.Armors[ARMOR][5] < Game.MaxUPC[ARMOR - 1]) {
        Game.Armors[ARMOR][3] += Game.inventory[ITEM].life;
        Game.Armors[ARMOR][5]++;
        if (APP.ScoreModeEnabled === 1) {
            if (Game.Armors[ARMOR][4] + (BONUSES[Game.inventory[ITEM].class] / 10) <= APP.MaxScore) Game.Armors[ARMOR][4] += (BONUSES[Game.inventory[ITEM].class] / 10);
            else Game.Armors[ARMOR][4] = APP.MaxScore;
        }
        Game.ArmorUpgrades[ARMOR] += Game.inventory[ITEM].life;
        if (ITEM <= Game.MaxInv) RemoveItem(ITEM);
    }
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}

function UPGRADE_WEAPON(WEAPON, ITEM) {
    let BONUSES = { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6 };
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
    }
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}

// DESTROY EQUIPMENT
function DestroyWeapon(WEAPON) {
    if (WEAPON == "Main") Game.Weapons.Main = ["Training Sword", "Normal", 0, 1, 10];
    else Game.Weapons.Special = ["Training Dagger", "Normal", 0, 1, 10];
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}

function ConfirmDestroyWeapon(weapon) {
    APP.ToDelete = Game.Weapons[weapon];
    APP.ToDelete.type = weapon;
    var TIER = APP.ScoreModeEnabled == 0 ? "Level " : "Score <i class='fad fa-dice-d20'></i>";
    var DTIERRANK = APP.ScoreModeEnabled == 0 ? Math.round(APP.ToDelete[3]) : Math.floor(APP.ToDelete[3] * 10);
    POPUP("Throw your current " + weapon + " weapon ?", `<span class='${APP.ToDelete[1]}'>${APP.ToDelete[1]} ${APP.ToDelete[0]} <div class='pw inline label'>${TIER} ${DTIERRANK}</div></span><br><i class='pw blue fas fa-sword'></i>${APP.ToDelete[4]}`, 1);
}

function DestroyCore(ARMOR) {
    Game.Armors[ARMOR] = [true, "Basic Armor", "Normal", 100, 1, 0];
    Game.MaxUPC[ARMOR - 1] = 0;
    Game.ArmorUpgrades[ARMOR] = 0;
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}

function ConfirmDestroy(ARMOR) {
    APP.ToDelete = Game.Armors[ARMOR];
    APP.ToDelete.type = ARMOR;
    var TIER = APP.ScoreModeEnabled == 0 ? "Level " : "Score <i class='fad fa-dice-d20'></i>";
    var DTIERRANK = APP.ScoreModeEnabled == 0 ? Math.round(APP.ToDelete[4]) : Math.floor(APP.ToDelete[4] * 10);
    var Names = ["", "Helmet", "Armor", "Shield", "Boots"];
    POPUP("Throw your current " + Names[ARMOR] + " ?", `<span class='${APP.ToDelete[2]}'>${APP.ToDelete[2]} ${APP.ToDelete[1]} <div class='pw inline label'>${TIER} ${DTIERRANK}</div></span><br>Available slots : ${(Game.MaxUPC[ARMOR - 1] - APP.ToDelete[5])}<i class='pw orange fad fa-gem'></i><br><i class='pw red fas fa-heart'></i>${APP.ToDelete[3]}`, 3);
}

const RemoveItem = function (ITEM) {
    if (ITEM < Game.MaxInv) {
        Game.inventory[ITEM].type = 0;
        if (ITEM >= Game.inventory.length) Game.inventory.splice(ITEM - 1, 1);
        else Game.inventory.splice(ITEM, 1);
    } else Game.inventory.splice(ITEM, 1);
    GenInventory();
    UpdateGame();
};

const ErrorArmor = function (EQUIPMENT) {
    if (EQUIPMENT < 5) {
        Game.Armors[EQUIPMENT] = [true, "Error", "Error", 100, 1, 0];
        Game.ArmorUpgrades[EQUIPMENT] = 0;
        Game.MaxUPC[EQUIPMENT - 1] = 0;
    } else if (_.inRange(EQUIPMENT, 5, 7)) {
        if (EQUIPMENT == 5) Game.Weapons.Main = ["Error", "Error", 0, 1, 10];
        if (EQUIPMENT == 6) Game.Weapons.Special = ["Error", "Error", 0, 1, 10];
    }
    UpdateGame();
};

const NEXT_ARMOR_PIECE = function () {
    if (_.inRange(Game.Level, 0, 10)) return 10;
    else if (_.inRange(Game.Level, 10, 20)) return 20;
    else if (_.inRange(Game.Level, 20, 30)) return 30;
    else return 0;
};

const CHECK_EQUIPMENT = function () {
    let QUALITIES = ["Normal", "Common", "Uncommon", "Rare", "Epic", "Exotic", "Divine", "Unique"];
    let GEMS = { 1: 0, 2: 1, 3: 2, 4: 3, "Main": 4, "Special": 5 };
    let ITEM_CONFIG = {
        MULTIPLIERS: [1.05, 1.20, 1.30, 1.40, 1.60, 1.85, 2.10],
        RARITIES: { Normal: [1, 1], Common: [2, 2000], Uncommon: [3, 5000], Rare: [4, 7000], Epic: [5, 8500], Exotic: [6, 9500], Divine: [7, 9850] },
        GEMS_MULTIPLIER: { Normal: 1.5, Common: 2.5, Uncommon: 3.5, Rare: 5.0, Epic: 7.5, Exotic: 9, Divine: 10 }
    };
    let MAX_QUALITY = APP.ScoreModeEnabled == 1 ? "Divine" : QUALITIES[GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3]];
    let MAX_GEMS = [0, 0]; // LIFE || POWER
    for (let ARMOR in Game.Armors) {
        let VALUE = ITEM_CONFIG.GEMS_MULTIPLIER[MAX_QUALITY] * ((Game.Armors[ARMOR][3] - Game.ArmorUpgrades[ARMOR]) * 0.01) + ITEM_CONFIG.RARITIES[MAX_QUALITY][0];
        MAX_GEMS[0] = VALUE > MAX_GEMS[0] ? VALUE : MAX_GEMS[0];
        Game.MaxLevelReached = Game.Armors[ARMOR][4] > Game.MaxLevelReached ? Game.Armors[ARMOR][4] : Game.MaxLevelReached;
    }
    for (let WEAPON in Game.Weapons) {
        let VALUE = ITEM_CONFIG.GEMS_MULTIPLIER[MAX_QUALITY] * ((Game.Weapons[WEAPON][4] - Game.WeaponUpgrades[WEAPON]) * 0.01) + ITEM_CONFIG.RARITIES[MAX_QUALITY][0];
        MAX_GEMS[1] = VALUE > MAX_GEMS[1] ? VALUE : MAX_GEMS[1];
        Game.MaxLevelReached = Game.Weapons[WEAPON][3] > Game.MaxLevelReached ? Game.Weapons[WEAPON][3] : Game.MaxLevelReached;
    }
    for (let ARMOR in Game.Armors) {
        if (ARMOR != 0) {
            let MAX_VALUE = (Game.MaxLevelReached * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[MAX_QUALITY][0] - 1] + 100;
            if ((Game.Armors[ARMOR][3] - Game.ArmorUpgrades[ARMOR]) > MAX_VALUE) {
                console.log(`Auto-Scaling of the ${GLOBALS.ARMORS_TYPE[ARMOR]} || ${Game.Armors[ARMOR][3]} out of ${Math.round(MAX_VALUE)}.`);
                Game.Armors[ARMOR][3] = (MAX_VALUE + Game.ArmorUpgrades[ARMOR]);
            }
            if (Game.ArmorUpgrades[ARMOR] > (MAX_GEMS[0] * Game.MaxUPC[GEMS[ARMOR]])) {
                console.log(`Auto-Scaling the gems of the ${GLOBALS.ARMORS_TYPE[ARMOR]} || ${Game.ArmorUpgrades[ARMOR]} out of ${Math.round(MAX_LIFE_GEM)}.`);
                Game.ArmorUpgrades[ARMOR] = Math.round(MAX_GEMS[0] * Game.MaxUPC[GEMS[ARMOR]]);
            }
            if (Game.Armors[ARMOR][3] != Math.round(Game.Armors[ARMOR][3]) || Game.ArmorUpgrades[ARMOR] != Math.round(Game.ArmorUpgrades[ARMOR])) {
                Game.Armors[ARMOR][3] = Math.round(Game.Armors[ARMOR][3]);
                Game.ArmorUpgrades[ARMOR] = Math.round(Game.ArmorUpgrades[ARMOR]);
            }
            if (Game.Armors[ARMOR][3] < 0) Game.Armors[ARMOR][3] = Math.round(MAX_VALUE);
            if (Game.ArmorUpgrades[ARMOR] < 0) Game.ArmorUpgrades[ARMOR] = 0;
        }
    }

    for (let WEAPON in Game.Weapons) {
        let MAX_VALUE = (Game.MaxLevelReached * 2) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[MAX_QUALITY][0] - 1] + 10;
        if ((Game.Weapons[WEAPON][4] - Game.WeaponUpgrades[WEAPON]) > MAX_VALUE) {
            console.log(`Auto-Scaling of the ${WEAPON} weapon || ${Game.Weapons[WEAPON][4]} out of ${Math.round(MAX_VALUE)}.`);
            Game.Weapons[WEAPON][4] = (MAX_VALUE + Game.WeaponUpgrades[WEAPON]);
        }
        if (Game.WeaponUpgrades[WEAPON] > (MAX_GEMS[1] * Game.MaxUPC[GEMS[WEAPON]])) {
            console.log(`Auto-Scaling the gems of the ${WEAPON} weapon || ${Game.WeaponUpgrades[WEAPON]} out of ${Math.round(MAX_GEMS[1])}.`);
            Game.WeaponUpgrades[WEAPON] = Math.round(MAX_GEMS[1] * Game.MaxUPC[GEMS[WEAPON]]);
        }
        if (Game.Weapons[WEAPON][4] != Math.round(Game.Weapons[WEAPON][4]) || Game.WeaponUpgrades[WEAPON] != Math.round(Game.WeaponUpgrades[WEAPON])) {
            Game.Weapons[WEAPON][4] = Math.round(Game.Weapons[WEAPON][4]);
            Game.WeaponUpgrades[WEAPON] = Math.round(Game.WeaponUpgrades[WEAPON]);
        }
        if (Game.Weapons[WEAPON][4] < 0) Game.Weapons[WEAPON][4] = Math.round(MAX_VALUE);
        if (Game.WeaponUpgrades[WEAPON] < 0) Game.WeaponUpgrades[WEAPON] = 0;
    }
};

const LATEST_UNLOCKED_ARMOR = function () {
    let LATEST_ARMOR;
    for (let ARMOR in Game.Armors) {
        if (ARMOR != 0 && Game.Armors[ARMOR][0]) LATEST_ARMOR = ARMOR;
    }
    return LATEST_ARMOR;
};

function test() {
    return _.sample(GLOBALS.LOCATIONS[Game.Location][5].lootables);
}
