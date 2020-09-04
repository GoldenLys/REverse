//INVENTORY VISUALS
function GenInventory() {
    $("#INVENTORY-Gem").html("");
    $("#INVENTORY-Relic").html("");
    $("#INVENTORY-Weapon").html("");
    $("#INVENTORY-Armor").html("");
    $("#EQUIPPED_ITEMS").html($("#EQUIPMENT").html());
    for (let IV in Game.inventory) {
        let INVENTORY = {
            BOX_SHADOW: { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6, },
            ITEM_TYPES: ["", "Armor", "Gem", "Relic", "Weapon", "Gem"],
            LEVEL_TYPE: ["Level " + Game.inventory[IV].level, "Score <i class='fad fa-dice-d20'></i>" + Math.floor(Game.inventory[IV].level * 10)],
            RELICS_DESC: ["-", "Power bonus of " + fix(Game.inventory[IV].bonus, 2), "Life bonus of " + fix(Game.inventory[IV].bonus, 2), "Max Score +" + fix(Game.inventory[IV].bonus, 1), "Minimal drop quality <span class='" + Game.inventory[IV].bonus + "'>" + Game.inventory[IV].bonus + "</span>"],
        };
        let ITEM = { DESC: "", LEVEL: "" };
        if (Game.inventory[IV] != undefined) {
            var UPS = Game.inventory[IV].ups > 0 ? "<div class='pw inline orange label'><i class='pw orange fad fa-gem'></i> " + Game.inventory[IV].ups + "</div>" : "";
            if (Game.inventory[IV].id == 1) {
                ITEM.LEVEL = INVENTORY.LEVEL_TYPE[APP.ScoreModeEnabled];
                ITEM.DESC = UPS + "<div class='pw inline red label'><i class='pw red fas fa-heart'></i> " + Game.inventory[IV].life + "</div>";
            }
            if (Game.inventory[IV].id == 2) ITEM.DESC = "<div class='pw inline red label'><i class='pw red fas fa-heart'></i> " + Game.inventory[IV].life + "</div>";
            if (Game.inventory[IV].id == 3) ITEM.DESC = "<div class='pw inline label'>" + INVENTORY.RELICS_DESC[Game.inventory[IV].object] + "</div>";
            if (Game.inventory[IV].id == 4) {
                ITEM.LEVEL = INVENTORY.LEVEL_TYPE[APP.ScoreModeEnabled];
                ITEM.DESC = UPS + "<div class='pw inline blue label'><i class='pw blue fas fa-sword'></i> " + Game.inventory[IV].power + "</div>";
            }
            if (Game.inventory[IV].id == 5) ITEM.DESC = "<div class='pw inline blue label'><i class='pw blue fas fa-sword'></i> " + Game.inventory[IV].power + "</div>";
            var IS_LEVEL_SET = ITEM.LEVEL != "" ? "<div class='pw inline label'>" + ITEM.LEVEL + "</div>" : "";

            $("#INVENTORY-" + INVENTORY.ITEM_TYPES[Game.inventory[IV].id]).append(`<div class="pw message"><div class="pw horizontal segments">
            <div class="pw little segment"> <div onclick="EquipItem(${IV}, ${Game.inventory[IV].id})" class="pw green button"><i class="fal fa-check"></i></div> </div>
            <div class="pw segment">
            <span class="${Game.inventory[IV].class}" id="${IV}">${Game.inventory[IV].class}</span>
            ${Game.inventory[IV].name} ${IS_LEVEL_SET} ${ITEM.DESC}
            </div>
            <div class="pw little segment"> <div onclick="RemoveItem(${IV})" class="pw red button"><i class="fas fa-trash"></i></div> </div>
            </div></div>`);
        }
    }
}

function GenWeapons() {
    var TYPE = "";
    for (var T = 1; T < 3; T++) {
        var Names = ["", "Sword", "Dagger"];
        if (T == 1) { TYPE = "Main"; } else { TYPE = "Special"; }
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
        if (Game.MaxUPC[UPWSELECTOR] > 0) $("#" + TYPE + "WeaponGems").show(); else $("#" + TYPE + "WeaponGems").hide();
        $("#" + TYPE + "WeaponGems").html(UPWTEXT);

        if (Class == "E") { $("#" + TYPE + "WeaponSprite").html("<div class='pw image error-img'></div>"); }
        else {
            $("#" + TYPE + "WeaponSprite").html("<img class='pw centered tiny image' src='images/Weapons/" + TYPE + "-" + Class + ".png'></img>");
        }
        $("#" + TYPE + "WeaponLevel").html(LEVELTEXT);
        $("#" + TYPE + "WeaponText").html("<i class='pw blue fas fa-sword'></i> " + Game.Weapons[TYPE][4]);
        $("#" + TYPE + "WeaponTitle").html("<span class='" + Game.Weapons[TYPE][1] + "'>" + Game.Weapons[TYPE][1] + "</span> " + Game.Weapons[TYPE][0]);
    }
}

function GenArmors() {
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
        $("#" + armor + "-icon").attr("class", "classBar" + Class);
        $("#" + armor + "-title").attr("class", "text-center");
        $("#D" + armor).attr("onclick", "ConfirmDestroy(" + UPC + ");");
        if (Game.RELICS[UPC][1] == 1) RLSTXT = "Power bonus of " + fix(Game.RELICS[UPC][2], 2);
        if (Game.RELICS[UPC][1] == 2) RLSTXT = "Life bonus of " + fix(Game.RELICS[UPC][2], 2);
        if (Game.RELICS[UPC][1] == 3) RLSTXT = "Max Score +" + fix(Game.RELICS[UPC][2], 1);
        if (Game.RELICS[UPC][1] == 4) RLSTXT = "Minimal drop quality <span class='" + Game.RELICS[UPC][2] + "'>" + Game.RELICS[UPC][2] + "</span>";
        if (Game.RELICS[UPC][1] != 5) RLSTXT = "<i class='pw yellow fas fa-stars'></i> " + RLSTXT;
        var LEVELICON = APP.ScoreModeEnabled == 0 ? "Level" : "Score";
        var LEVELTEXT = APP.ScoreModeEnabled == 0 ? fix(Math.floor(Game.Armors[UPC][4]), 0) : "<i class='fad fa-dice-d20'></i>" + fix(Math.floor(Game.Armors[UPC][4] * 10), 0);
        $("#armor" + UPC + "-level").html(LEVELICON + " " + LEVELTEXT);
        var COREUPC = Game.Armors[UPC][5] == Game.MaxUPC[UPC - 1] ? "" : "green";
        var UPCTEXT = Game.MaxUPC[UPC - 1] > 0 ? "<i class='pw orange fad fa-gem'></i> <span class='" + COREUPC + "'>" + Game.Armors[UPC][5] + "</span>/" + Game.MaxUPC[UPC - 1] : "";
        $("#" + armor + "-life").html("<i class='pw red fas fa-heart'></i> " + fix(Game.Armors[UPC][3], 1));
        $("#" + armor + "-rarity").html(RLSTXT);
        $("#" + armor + "-gems").html(UPCTEXT);
        if (Game.MaxUPC[UPC - 1] > 0) $("#" + armor + "-gems").show(); else $("#" + armor + "-gems").hide();

        if (Class == "E") $("#" + armor + "-image").html("<div class='pw image error-img'></div>");
        else $("#" + armor + "-image").html("<img class='pw centered tiny image' style='margin-top: 1em; height: 100px; width: auto;' src='images/Armors/" + UPC + "-" + Class + ".png'></div>");
        $("#" + armor + "-title").html("<span class='" + Game.Armors[UPC][2] + "'>" + Game.Armors[UPC][2] + "</span> " + Game.Armors[UPC][1]);
        if (!Game.Armors[UPC][0]) $("#" + armor).hide();
        else $("#" + armor).show();
    }
    if (Game.Level < 30) $("#NextArmor").html("Next armor piece unlocked at Lv. " + NEXT_ARMOR_PIECE());
    else $("#NextArmor").html("");
}


//ITEM GENERATION
function newItem(type, level, rarity) {
    if (APP.ScoreModeEnabled == 1) level /= 10;
    let ITEM_CONFIG = {
        MULTIPLIERS: [_.random(1.00, 1.05), _.random(1.15, 1.20), _.random(1.25, 1.30), _.random(1.35, 1.40), _.random(1.50, 1.60), _.random(1.75, 1.85), _.random(1.95, 2.10)],
        RARITIES: { Normal: [1, 1], Common: [2, 2000], Uncommon: [3, 5000], Rare: [4, 7000], Epic: [5, 8500], Exotic: [6, 9500], Divine: [7, 9850] },
        RELIC_MULTIPLIERS: [_.random(0.01, 0.03), _.random(0.03, 0.05), _.random(0.05, 0.09), _.random(0.10, 0.14), _.random(0.15, 0.19), _.random(0.20, 0.24), _.random(0.25, 0.30)],
        RELIC_SCORE_MUTLIPLIERS: [_.random(1, 5), _.random(1, 10), _.random(5, 14), _.random(5, 19), _.random(10, 24), _.random(15, 49), _.random(20, 100)],
        GEMS_MULTIPLIERS: { Normal: [0.01, 0.30], Common: [0.01, 0.75], Uncommon: [0.01, 1.50], Rare: [1.5, 1.95], Epic: [1.95, 2.25], Exotic: [2.25, 2.40], Divine: [2.40, 3.00] },
    };
    let CLASSES = Object.keys(ITEM_CONFIG.RARITIES);
    let item = {};
    if (level < 1) level = 1;
    if (type == 0) { let RNG_TYPE = _.random(0, 100); if (RNG_TYPE > 45) type = "Weapon"; else type = "Armor"; }
    let BASE_LUCK = ITEM_CONFIG.RARITIES[rarity][1];

    for (var R in Game.RELICS) {//IF PLAYER HAVE A MINIMAL RARITY RELIC THEN USE IT HERE
        if (Game.RELICS[R][1] == 4 && BASE_LUCK < ITEM_CONFIG.RARITIES[Game.RELICS[R][2]][1]) BASE_LUCK = ITEM_CONFIG.RARITIES[Game.RELICS[R][2]][1];
    }
    if (APP.ScoreModeEnabled == 1 && BASE_LUCK < 7000) {//IF IN SCORE MODE REPLACE ALL LOW CLASS ITEMS WITH HIGH CLASS ONES
        let LUCK_PER_TYPES = { 0: 7000, 1: 7000, 2: 7000, 3: 7000, 4: 7000, 5: 8500, 6: 8500, 7: 9850, };
        BASE_LUCK = LUCK_PER_TYPES[Game.Enemy[1]];
        if (level > APP.MaxScore) level = APP.MaxScore;
        if (Game.MissionStarted[0] && GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2) BASE_LUCK = Game.Enemy == 7 ? 9850 : 9500; //IF IN A FORTRESS GENERATE AN EXOTIC OR BETTER
    } else {
        if (level > Game.Level && APP.ScoreModeEnabled == 0) level = Game.Level;
        if (level > GLOBALS.LOCATIONS[Game.Location][2] && APP.ScoreModeEnabled == 0) level = GLOBALS.LOCATIONS[Game.Location][2];
    }
    let MAX_LUCK = ITEM_CONFIG.RARITIES[CLASSES[GLOBALS.LOCATIONS[Game.Location][3]]][1]; //DEFINE THE MAXIMUM DROP QUALITY TO LOCATION MAX
    if (Game.MissionStarted[0] && GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2) MAX_LUCK = BASE_LUCK; //IF IN A FORTRESS GENERATE AN EXOTIC OR BETTER
    if (_.inRange(Game.Level, 0, 5) && GLOBALS.LOCATIONS[Game.Location][3] > 0) MAX_LUCK = 1999;
    if (_.inRange(Game.Level, 6, 10) && GLOBALS.LOCATIONS[Game.Location][3] > 1) MAX_LUCK = 4999;
    if (_.inRange(Game.Level, 9, 15) && GLOBALS.LOCATIONS[Game.Location][3] > 2) MAX_LUCK = 6999;
    if (_.inRange(Game.Level, 14, 50) && GLOBALS.LOCATIONS[Game.Location][3] > 3) MAX_LUCK = 8499;
    if (_.inRange(Game.Level, 19, 30) && GLOBALS.LOCATIONS[Game.Location][3] > 4) MAX_LUCK = 9499;
    if (_.inRange(Game.Level, 29, 40) && GLOBALS.LOCATIONS[Game.Location][3] > 5) MAX_LUCK = 9849;
    if (_.inRange(Game.Level, 39, 41) && GLOBALS.LOCATIONS[Game.Location][3] > 6) MAX_LUCK = 10000;
    if (BASE_LUCK > MAX_LUCK) BASE_LUCK = MAX_LUCK;
    let LUCK = _.random(BASE_LUCK, MAX_LUCK);
    item.class = "Normal";
    if (_.inRange(LUCK, 1999, 5000)) item.class = "Common";
    if (_.inRange(LUCK, 4999, 7000)) item.class = "Uncommon";
    if (_.inRange(LUCK, 6999, 8500)) item.class = "Rare";
    if (_.inRange(LUCK, 8499, 9500)) item.class = "Epic";
    if (_.inRange(LUCK, 9499, 9850)) item.class = "Exotic";
    if (_.inRange(LUCK, 9849, 10001)) item.class = "Divine";

    if (type == "Armor") { //GENERATE AN ARMOR
        item.name = GLOBALS.ARMORS_NAMES[[item.class]][Math.floor(Math.random() * GLOBALS.ARMORS_NAMES[item.class].length)] + " Armor";
        if (level > APP.MaxScore) level = APP.MaxScore;
        item.level = level;
        item.object = 0;
        item.ups = GET_MAX_UPGRADES(item.class);
        if (APP.ScoreModeEnabled == 1) item.life = Math.floor(random((level * 10) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] * 0.75) + 100, (level * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] + 100));
        else item.life = Math.floor(random((level * 10) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] * 0.9) + 100, (level * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] + 100));
        item.id = 1; //SET AS ARMOR
    }

    if (type == "Weapon") { //GENERATE A WEAPON
        item.name = GLOBALS.ARMORS_NAMES[[item.class]][Math.floor(Math.random() * GLOBALS.ARMORS_NAMES[item.class].length)] + " Weapon";
        if (level > APP.MaxScore) level = APP.MaxScore;
        item.level = level;
        item.object = 0;
        item.ups = GET_MAX_UPGRADES(item.class);
        if (APP.ScoreModeEnabled == 1) item.power = Math.floor(random((level * 3) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] * 0.75), (level * 3) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] + 5));
        else item.power = Math.floor(random((level * 3) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] * 0.9), (level * 3) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] + 5));
        item.id = 4; //SET AS WEAPON
    }

    if (type == "Gem") { //GENERATE A GEM
        let MULTIPLIER = _.random(ITEM_CONFIG.GEMS_MULTIPLIERS[item.class][0], ITEM_CONFIG.GEMS_MULTIPLIERS[item.class][1]); //Random number between 0.1% - 2.5%
        let GEMTYPE = _.random(1, 100);

        let GEMS_DROP_RATES = APP.ScoreModeEnabled == 1 ? { MIN: [0, 35], MAX: [36, 101] } : { MIN: [0, 50], MAX: [51, 101] };

        if (_.inRange(GEMTYPE, GEMS_DROP_RATES.MIN[0], GEMS_DROP_RATES.MAX[0])) { //GENERATE A POWER GEM
            item.power = Math.floor(MULTIPLIER * ((APP.WeaponsPower / (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0])) * 0.01) + ITEM_CONFIG.RARITIES[item.class][0]);
            if (item.power < 1) item.power = 1;
            item.life = 0;
            item.name = "Power Gem";
            item.level = ITEM_CONFIG.RARITIES[item.class][0];
            item.object = 2;
            item.id = 5; //SET AS POWER GEM
        }
        if (_.inRange(GEMTYPE, GEMS_DROP_RATES.MIN[1], GEMS_DROP_RATES.MAX[1])) { //GENERATE A LIFE GEM
            item.life = Math.floor(MULTIPLIER * ((APP.CoreBaseLife / (APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1])) * 0.01) + ITEM_CONFIG.RARITIES[item.class][0]);
            if (item.life < 1) item.life = 1;
            item.power = 0;
            item.name = "Life Gem";
            item.level = ITEM_CONFIG.RARITIES[item.class][0];
            item.object = 1;
            item.id = 2; //SET AS LIFE GEM
        }
    }

    if (type == "Relic") { //GENERATE A RELIC
        let RelicType = APP.ScoreModeEnabled == 1 ? _.random(0, 3) : _.random(0, 1);
        if (Game.Level > 10 && APP.ScoreModeEnabled == 0) RelicType = _.random(0, 2);

        if (RelicType == 0) item.bonus = ITEM_CONFIG.RELIC_MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]];
        if (RelicType == 1) item.bonus = ITEM_CONFIG.RELIC_MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]];
        if (RelicType == 2) item.bonus = ITEM_CONFIG.RELIC_SCORE_MUTLIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]];

        if (RelicType == 3) {
            item.bonus = CLASSES[_.random(0, ITEM_CONFIG.RARITIES[item.class][0])];
            if (ITEM_CONFIG.RARITIES[item.class][0] > 1) item.bonus = CLASSES[_.random(ITEM_CONFIG.RARITIES[item.class][0] - 2, ITEM_CONFIG.RARITIES[item.class][0])];
            if (ITEM_CONFIG.RARITIES[item.class][0] > 2) item.bonus = CLASSES[_.random(ITEM_CONFIG.RARITIES[item.class][0] - 3, ITEM_CONFIG.RARITIES[item.class][0])];
        }
        item.object = RelicType + 1;
        item.name = GLOBALS.RELICS_NAMES[RelicType];
        item.id = 3; //SET AS RELIC
    }
    if (type == 'Armor' || type == 'Weapon' || type == 'Gem' || type == 'Relic') if ((Game.inventory.length - 1) < Game.MaxInv) Game.inventory[Game.inventory.length] = item;
    GenInventory();
}


//EQUIPMENT INSTALLATION
function EquipItem(id, type) {
    let ARMOR_TYPES = ["", "Helmet", "Armor", "Shield", "Boots"];
    let ARMOR_BUTTON = [];
    let WEAPON_BUTTON = [];
    let ARMOR_UPGRADE_BUTTON = [];
    let RELIC_BUTTON = [];
    let WEAPON_UPGRADE_BUTTON = [];

    if (type == 1) {
        for (let ARMOR in Game.Armors) { if (Game.Armors[ARMOR][0]) ARMOR_BUTTON[ARMOR] = "<div onclick='NewCore(" + ARMOR + ", " + id + ");' class='pw alpha button'>Use as " + ARMOR_TYPES[ARMOR] + "</div>"; }
        POPUP("Select an Armor Slot", "<div class='pw fluid vertical buttons'>" + ARMOR_BUTTON[1] + ARMOR_BUTTON[2] + ARMOR_BUTTON[3] + ARMOR_BUTTON[4] + "</div>", 0);
    }

    if (type == 2) {
        for (let ARMOR in Game.Armors) {
            ARMOR_UPGRADE_BUTTON[ARMOR] = Game.Armors[ARMOR][0] ? `<div onclick='UPCore(${ARMOR}, ${id});' class='pw alpha button'>Upgrade ${ARMOR_TYPES[ARMOR]}</div>` : ``;
            if (Game.Armors[ARMOR][5] >= Game.MaxUPC[ARMOR - 1] && Game.Armors[ARMOR][0]) ARMOR_UPGRADE_BUTTON[ARMOR] = `<div class='pw darkgrey button'>No gem slots left for the ${ARMOR_TYPES[ARMOR]}.</div>`;
        }
        POPUP("Select an Armor Slot", "<div class='pw fluid vertical buttons'>" + ARMOR_UPGRADE_BUTTON[1] + ARMOR_UPGRADE_BUTTON[2] + ARMOR_UPGRADE_BUTTON[3] + ARMOR_UPGRADE_BUTTON[4] + "</div>", 0);
    }

    if (type == 3) {
        for (let RELIC in Game.RELICS) {
            if (RELIC != 0) RELIC_BUTTON[RELIC] = Game.Armors[RELIC][0] ? `<div onclick="ConfirmRelic(${RELIC}, ${id});" class="pw alpha button">Apply on ${ARMOR_TYPES[RELIC]}</div>` : ``;
        }
        POPUP("Select a Relic Slot", "<div class='pw fluid vertical buttons'>" + RELIC_BUTTON[1] + RELIC_BUTTON[2] + RELIC_BUTTON[3] + RELIC_BUTTON[4] + "</div>", 0);
    }

    if (type == 4) {
        for (let WEAPON in Game.Weapons) WEAPON_BUTTON[WEAPON] = `<div onClick='NewWeapon("${WEAPON}", ${id});' class='pw alpha button'>Use as ${WEAPON} weapon</div>`;
        POPUP("Select a Weapon Slot", "<div class='pw fluid vertical buttons'>" + WEAPON_BUTTON.Main + WEAPON_BUTTON.Special + "</div>", 0);
    }

    if (type == 5) {
        for (let WEAPON in Game.Weapons) {
            let NUMBER = 4;
            if (WEAPON != "Main") NUMBER = 5;
            WEAPON_UPGRADE_BUTTON[WEAPON] = Game.Armors[1][0] ? `<div onClick='UPWeapon("${WEAPON}", ${id});' class='pw alpha button'>Upgrade ${WEAPON} Weapon</div>` : ``;
            if (Game.Weapons[WEAPON][2] >= Game.MaxUPC[NUMBER]) WEAPON_UPGRADE_BUTTON[WEAPON] = `<div class='pw darkgrey button'>No gem slots left for the ${WEAPON} weapon.</div>`;
        }
        POPUP("Select a Weapon Slot", "<div class='pw fluid vertical buttons'>" + WEAPON_UPGRADE_BUTTON.Main + WEAPON_UPGRADE_BUTTON.Special + "</div>", 0);
    }

    Game.isInFight = 0;
    UpdateGame();
}

const NewCore = function (ARMOR, ITEM) {
    APP.ToAdd = [ARMOR, ITEM];
    let CONFIG = {
        OLD_ARMOR: Game.Armors[ARMOR],
        NEW_ARMOR: [true, Game.inventory[ITEM].name, Game.inventory[ITEM].class, Game.inventory[ITEM].life, Game.inventory[ITEM].level, Game.inventory[ITEM].ups],
        COLORS: {
            OLD: ["none", "none", "none", "", "", ""],
            NEW: ["none", "none", "none", "", "", ""],
        },
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

function DefineCore(armor, selected) {
    if (Game.config[0] == 1) POPUP_CLOSE();
    if (typeof (Game.inventory[selected].life) !== 'undefined') {
        Game.Armors[armor] = [true, Game.inventory[selected].name, Game.inventory[selected].class, Game.inventory[selected].life, Game.inventory[selected].level, 0];
        Game.MaxUPC[armor - 1] = Game.inventory[selected].ups;
        Game.ArmorUpgrades[armor] = 0;
    }
    if (selected <= Game.MaxInv) RemoveItem(selected);
    if ($('#DIV-INVENTORY').is(":visible")) POPUP_CLOSE(); else hideRewards();
    Game.isInFight = 0;
    GenInventory();
    UpdateGame();
}

const NewWeapon = function (WEAPON, ITEM) {
    APP.ToAdd = [WEAPON, ITEM];
    let CONFIG = {
        OLD_WEAPON: [true, Game.Weapons[WEAPON][0], Game.Weapons[WEAPON][1], Game.Weapons[WEAPON][4], Game.Weapons[WEAPON][3], Game.Weapons[WEAPON][2]],
        NEW_WEAPON: [true, Game.inventory[ITEM].name, Game.inventory[ITEM].class, Game.inventory[ITEM].power, Game.inventory[ITEM].level, Game.inventory[ITEM].ups],
        COLORS: {
            OLD: ["none", "none", "none", "", "", ""],
            NEW: ["none", "none", "none", "", "", ""],
        },
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

function DefineWeapon(type, selected) {
    let UPC_TYPE = { Main: 1, Special: 2 };
    if (typeof (Game.inventory[selected].power) !== 'undefined') {
        Game.Weapons[type] = [Game.inventory[selected].name, Game.inventory[selected].class, 0, Game.inventory[selected].level, Game.inventory[selected].power];
        Game.MaxUPC[UPC_TYPE[type] + 3] = Game.inventory[selected].ups;
    }
    if (selected <= Game.MaxInv) RemoveItem(selected);
    Game.isInFight = 0;
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}

function ConfirmRelic(R, id) {
    APP.ToAdd = [R, id];
    let IRCOLOR = Game.RELICS[R][1] == 5 ? "pw green" : "pw red";
    let IRCOLOR2 = Game.RELICS[R][1] == 5 ? "pw green" : "pw red";
    if (Game.RELICS[R][1] == Game.inventory[id].object && Game.RELICS[R][2] > Game.inventory[id].bonus) IRCOLOR = "pw green";
    if (Game.RELICS[R][1] == Game.inventory[id].object && Game.RELICS[R][2] < Game.inventory[id].bonus) IRCOLOR2 = "pw green";

    let DESCS = ["-",
        "Power bonus of <span class='" + IRCOLOR + "'>" + fix(Game.RELICS[R][2], 2) + "</span>",
        "Life bonus of <span class='" + IRCOLOR + "'>" + fix(Game.RELICS[R][2], 2) + "</span>",
        "Max Score +<span class='" + IRCOLOR + "'>" + fix(Game.RELICS[R][2], 1) + "</span>",
        "Minimal drop quality <span class='" + Game.RELICS[R][2] + "'>" + Game.RELICS[R][2] + "</span>",
        "-"
    ];

    let DESCS2 = ["-",
        "Power bonus of <span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[id].bonus, 2) + "</span>",
        "Life bonus of <span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[id].bonus, 2) + "</span>",
        "Max Score +<span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[id].bonus, 1) + "</span>",
        "Minimal drop quality <span class='" + Game.inventory[id].bonus + "'>" + Game.inventory[id].bonus + "</span>",
        "-"
    ];

    if (Game.config[1] == 1) {
        POPUP("New Relic confirmation",
            `<div class="pw horizontal segments"><div class="pw segment">Old</div><div class="pw little segment"><i class="fal fa-arrow-right"></i></div><div class="pw segment">New</div></div>
      <div class="pw horizontal segments">
      <div class="pw segment"><div>${GLOBALS.RELICS_NAMES[Game.RELICS[R][1] - 1]}</div><div class="${Game.RELICS[R][0]}">${Game.RELICS[R][0]}</div><div>${DESCS[Game.RELICS[R][1]]}</div></div>
      <div class="pw little segment"></div>
      <div class="pw segment"><div>${Game.inventory[id].name}</div><div class="${Game.inventory[id].class}">${Game.inventory[id].class}</div><div>${DESCS2[Game.inventory[id].object]}</div></div>
      </div>`, 4);
    }
    else InstallRelic(R, id);
}

function InstallRelic(R, id) {
    Game.RELICS[R] = [Game.inventory[id].class, Game.inventory[id].object, Game.inventory[id].bonus];
    if (id <= Game.MaxInv) RemoveItem(id);
    if ($('#DIV-INVENTORY').is(":visible")) POPUP_CLOSE(); else hideRewards();
    POPUP_CLOSE();
    GenInventory();
}


//UPGRADE EQUIPMENT
function UPCore(armor, ITEM) {
    let BONUSES = { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6 };
    if (Game.Armors[armor][5] < Game.MaxUPC[armor - 1]) {
        Game.Armors[armor][3] += Game.inventory[ITEM].life;
        Game.Armors[armor][5]++;
        if (APP.ScoreModeEnabled === 1) {
            if (Game.Armors[armor][4] + (BONUSES[Game.inventory[ITEM].class] / 10) <= APP.MaxScore) { Game.Armors[armor][4] += (BONUSES[Game.inventory[ITEM].class] / 10); }
            else { Game.Armors[armor][4] = APP.MaxScore; }
        }
        Game.ArmorUpgrades[armor] += Game.inventory[ITEM].life;
        if (ITEM < Game.MaxInv) RemoveItem(ITEM);
    }
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}

function UPWeapon(WEAPON, ITEM) {
    let BONUSES = { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6 };
    let WEAPON_ID = WEAPON == "Main" ? 1 : 2;
    if (Game.Weapons[WEAPON][2] < Game.MaxUPC[WEAPON_ID + 3]) {
        Game.Weapons[WEAPON][4] += Game.inventory[ITEM].power;
        Game.Weapons[WEAPON][2]++;
        if (APP.ScoreModeEnabled == 1) {
            if (Game.Weapons[WEAPON][3] + (BONUSES[Game.inventory[ITEM].class] / 10) <= APP.MaxScore) Game.Weapons[WEAPON][3] += (BONUSES[Game.inventory[ITEM].class] / 10);
            else Game.Weapons[WEAPON][3] = APP.MaxScore;
        }
        if (ITEM < Game.MaxInv) RemoveItem(ITEM);
    }
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}


//DESTROY EQUIPMENT 
function DestroyWeapon(type) {
    if (type == "Main") Game.Weapons.Main = ["Training Sword", "Normal", 0, 1, 9 + (Game.Simulation * 1)];
    else Game.Weapons.Special = ["Training Dagger", "Normal", 0, 1, 9 + (Game.Simulation * 1)];
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}

function ConfirmDestroyWeapon(weapon) {
    APP.ToDelete = Game.Weapons[weapon];
    APP.ToDelete.type = weapon;
    var TIER = APP.ScoreModeEnabled == 0 ? "Level " : "Score <i class='fad fa-dice-d20'></i>";
    var DTIERRANK = APP.ScoreModeEnabled == 0 ? Math.round(APP.ToDelete[3]) : Math.floor(APP.ToDelete[3] * 10);
    POPUP("Throw your current " + weapon + " weapon ?",
        `<span class='${APP.ToDelete[1]}'>${APP.ToDelete[1]} ${APP.ToDelete[0]} <div class='pw inline label'>${TIER} ${DTIERRANK}</div></span><br><i class='pw blue fas fa-sword'></i>${APP.ToDelete[4]}`,
        1);
}

function DestroyCore(armor) {
    Game.Armors[armor] = [true, "Basic Armor", "Normal", 100, 1, 0];
    Game.MaxUPC[armor - 1] = 0;
    Game.ArmorUpgrades[armor] = 0;
    POPUP_CLOSE();
    GenInventory();
    UpdateGame();
}

function ConfirmDestroy(armor) {
    APP.ToDelete = Game.Armors[armor];
    APP.ToDelete.type = armor;
    var TIER = APP.ScoreModeEnabled == 0 ? "Level " : "Score <i class='fad fa-dice-d20'></i>";
    var DTIERRANK = APP.ScoreModeEnabled == 0 ? Math.round(APP.ToDelete[4]) : Math.floor(APP.ToDelete[4] * 10);
    var Names = ["", "Helmet", "Armor", "Shield", "Boots"];
    POPUP("Throw your current " + Names[armor] + " ?",
        `<span class='${APP.ToDelete[2]}'>${APP.ToDelete[2]} ${APP.ToDelete[1]} <div class='pw inline label'>${TIER} ${DTIERRANK}</div></span><br>Available slots : ${(Game.MaxUPC[armor - 1] - APP.ToDelete[5])}<i class='pw orange fad fa-gem'></i><br><i class='pw red fas fa-heart'></i>${APP.ToDelete[3]}`,
        3);
}

function RemoveItem(id) {
    if (id < Game.MaxInv) {
        Game.inventory[id].id = 0;
        if (id >= Game.inventory.length) Game.inventory.splice(id - 1, 1); else Game.inventory.splice(id, 1);
    } else Game.inventory.splice(id, 1);
    GenInventory();
    UpdateGame();
}

function ErrorArmor(ARM) {
    if (ARM < 5) {
        Game.Armors[ARM] = [true, "Error", "Error", 100, 1, 0];
        Game.ArmorUpgrades[ARM] = 0;
        Game.MaxUPC[ARM - 1] = 0;
    } else if (_.inRange(ARM, 5, 7)) {
        if (ARM == 5) Game.Weapons.Main = ["Error", "Error", 0, 1, 10];
        if (ARM == 6) Game.Weapons.Special = ["Error", "Error", 0, 1, 10];
    }
    UpdateGame();
}

const NEXT_ARMOR_PIECE = function () {
    let LEVEL = 0;
    if (_.inRange(Game.Level, 0, 11)) LEVEL = 10;
    if (_.inRange(Game.Level, 10, 21)) LEVEL = 20;
    if (_.inRange(Game.Level, 20, 31)) LEVEL = 30;
    return LEVEL;
};


const CHECK_MAX_LIFE = function () {
    let QUALITIES = ["Normal", "Common", "Uncommon", "Rare", "Epic", "Exotic", "Divine"];
    let ITEM_CONFIG = {
        MULTIPLIERS: [1.05, 1.20, 1.30, 1.40, 1.60, 1.85, 2.10],
        RARITIES: { Normal: [1, 1], Common: [2, 2000], Uncommon: [3, 5000], Rare: [4, 7000], Epic: [5, 8500], Exotic: [6, 9500], Divine: [7, 9850] },
        RELIC_MULTIPLIERS: [0.03, 0.05, 0.09, 0.14, 0.19, 0.24, 0.30],
        RELIC_SCORE_MUTLIPLIERS: [5, 10, 14, 19, 24, 49, 100],
        GEMS_MULTIPLIERS: { Normal: [0.01, 0.30], Common: [0.01, 0.75], Uncommon: [0.01, 1.50], Rare: [1.5, 1.95], Epic: [1.95, 2.25], Exotic: [2.25, 2.40], Divine: [2.40, 3.00] },
    };

    let MAX_QUALITY = APP.ScoreModeEnabled == 1 ? "Divine" : QUALITIES[GLOBALS.LOCATIONS[LATEST_LOCATION_UNLOCKED()][3]];
    for (let ARMOR in Game.Armors) {
        let MAX_VALUE = (Game.Armors[ARMOR][4] * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[MAX_QUALITY][0]] + 100;
        if ((Game.Armors[ARMOR][3] - Game.ArmorUpgrades[ARMOR]) > MAX_VALUE) {
            Game.Armors[ARMOR][3] = (MAX_VALUE + Game.ArmorUpgrades[ARMOR]);
            console.log("CHEAT DETECTED ON ARMOR " + ARMOR);
        }
    }
};

function test() {
    return GLOBALS.LOCATIONS[Game.Location][5].lootables[Math.floor(Math.random() * GLOBALS.LOCATIONS[Game.Location][5].lootables.length)];
}
