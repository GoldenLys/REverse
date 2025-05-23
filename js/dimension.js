import FUNCTIONS from './index.js';

//PRESTIGE FUNCTIONS
export const ChangeWT = function () {
    FUNCTIONS.MAIN.POPUP("Do you really want to go through the rift?", `You will lose your current equipment and mission progress but gain the following benefits: <br>
<div class="pw inline label">Maximum score increased to  <i class='fad fa-dice-d20'></i>${(APP.MaxScore + 5) * 10}</div>
<div class="pw inline label">+3% experience gain</div>
<div class="pw inline label">Inventory capacity increased to  ${Game.MaxInv + 2}</div>
<div class="pw inline label">${Math.round(APP.Ranking / 10 - 30)} Dimensional Fragments</div>`, 2);
};

export const ConfirmWT = function () {
    if (Game.Level >= APP.MaxLevel && APP.Ranking >= (((30 + (Game.Dimension * 5)) * 10) - 5) && APP.LastMission >= APP.TotalMissions) {
        Game.Dimension++;
        Game.xp = [0, 100, 1];
        Game.Level = 1;
        let FRAGMENTS = Math.round(APP.Ranking / 10 - 30) > 50 ? 50 : Math.round(APP.Ranking / 10 - 30);
        Game.Shards += FRAGMENTS;
        APP.LifeMult = 1;
        APP.PowerMult = 1;
        Game.Emp = 0;
        Game.inventory = [];
        Game.MaxUPC = [0, 0, 0, 0, 0, 0];
        Game.Armors = {
            1: [true, "Basic Armor", "Normal", 100, 1, 0, "Default"],
            2: [false, "Basic Armor", "Normal", 100, 1, 0, "Default"],
            3: [false, "Basic Armor", "Normal", 100, 1, 0, "Default"],
            4: [false, "Basic Armor", "Normal", 100, 1, 0, "Default"]
        };
        Game.ArmorUpgrades = [null, 0, 0, 0, 0];
        Game.WeaponUpgrades = {
            Main: 0,
            Special: 0
        };
        Game.RELICS = [
            [],
            ["Normal", 5, 0],
            ["Normal", 5, 0],
            ["Normal", 5, 0],
            ["Normal", 5, 0]
        ];
        Game.Weapons.Main = ["Makeshift Stick", "Normal", 0, 1, 10, "Default"];
        Game.Weapons.Special = ["Makeshift Dagger", "Normal", 0, 1, 10, "Default"];
        Game.isInFight = false;
        Game.MissionsCompleted = [];
        Game.Choices = [];
        Game.Location = 0;
        Game.MissionStarted = [false, 0, 0, 0, 0];
        Game.AutoRemove = [0, 0, 0, 0, 0, 0];
        $("#RM1").attr("data-check", "unchecked");
        $("#RM2").attr("data-check", "unchecked");
        $("#RM3").attr("data-check", "unchecked");
        $("#RM4").attr("data-check", "unchecked");
        $("#RM5").attr("data-check", "unchecked");
        $("#RM6").attr("data-check", "unchecked");
        APP.MIND_CONTROL[1] = 0;
        FUNCTIONS.MAIN.hideRewards();
        FUNCTIONS.MAIN.CLOSE_MENUS();
        FUNCTIONS.MAIN.POPUP_CLOSE();
        FUNCTIONS.MISSIONS.LAUNCH_MISSION(0);
    }
};

export const GET_MAX_UPGRADES = function (CLASS) {
    let CONFIG = [{
        Normal: 0,
        Common: 0,
        Uncommon: _.random(0, 1),
        Rare: _.random(1, 2),
        Epic: _.random(2, 3),
        Exotic: _.random(3, 4),
        Legendary: _.random(4, 5)
    },
    {
        Normal: _.random(0, 1),
        Common: _.random(0, 2),
        Uncommon: _.random(1, 2),
        Rare: _.random(2, 3),
        Epic: _.random(3, 4),
        Exotic: _.random(3, 5),
        Legendary: _.random(5, 6)
    },
    ];
    return CONFIG[APP.ScoreModeEnabled][CLASS];
};

export const DIMENSIONAL_UPGRADE = function (TYPE) {
    let COST = GET_DIMENSIONAL_SHARDS_PRICE(TYPE);
    if (Game.Shards >= COST && COST !== Infinity) {
        Game.Shards -= COST;
        Game.Upgrades[TYPE]++;
        FUNCTIONS.APP.UpdateGame();
    }
};

export const GET_DIMENSIONAL_SHARDS_PRICE = function (UPGRADE) {
    if (typeof Game.Upgrades[UPGRADE] !== "number") Game.Upgrades[UPGRADE] = 0;
    let SHARDS = Infinity;
    let TIERS = {
        // Experience Multiplier
        0: {
            0: 2,
            10: 3,
            20: 4,
            30: 5,
            40: 10,
            50: 15,
            60: 20,
            70: 25,
            80: 30,
            90: 40,
            100: 50,
            110: 60,
            120: 70,
            130: 80,
            140: 90,
            150: 100,
            160: 125,
            170: 150,
            180: 175,
            190: 200,
            200: Infinity,
        },
        // Damage Multiplier
        1: {
            0: 2.5,
            10: 5,
            20: 10,
            30: 15,
            40: 20,
            50: 25,
            60: 30,
            70: 35,
            80: 40,
            90: 50,
            100: Infinity,
        },
        // Armor Multiplier
        2: {
            0: 2.5,
            10: 5,
            20: 10,
            30: 15,
            40: 20,
            50: 25,
            60: 30,
            70: 35,
            80: 40,
            90: 50,
            100: Infinity,
        },
        // Additional Inventory Capacity
        3: {
            0: 5,
            5: 10,
            10: 15,
            20: 20,
            30: 25,
            40: 30,
            50: 35,
            60: 40,
            70: 50,
            80: Infinity,
        },
    };
    for (let TIER = 0; TIER < _.size(TIERS[UPGRADE]); TIER++) {
        if (Game.Upgrades[UPGRADE] >= Number(Object.keys(TIERS[UPGRADE])[TIER])) SHARDS = TIERS[UPGRADE][Number(Object.keys(TIERS[UPGRADE])[TIER])];
    }
    return SHARDS;
};