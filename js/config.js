var GLOBALS = {
    NAME: "AlphaRPG",
    VERSION: "3.3",
    BETA: 12,
    RELICS_NAMES: [],
    THREATS: [],
    ARMORS_NAMES: {
        Normal: [],
        Common: [],
        Uncommon: [],
        Rare: [],
        Epic: [],
        Exotic: [],
        Legendary: []
    },
    ARMORS_TYPE: [],
    WEAPONS_TYPE: [],
    MISSIONS: {
        // 0     1     2      3     4          5           6            7        8         9
        // NAME, DESC, LEVEL, TYPE, REQ KILLS, EXPERIENCE, REWARD TYPE, QUALITY, LOCATION, REQ MISSION
        0: ["", "", 1, 1, 10, 200, 0, "Normal", 0, -1],
        1: ["", "", 4, 1, 10, 250, 0, "Common", 1, 0],
        2: ["", "", 7, 1, 10, 500, 0, "Common", 2, 1],
        3: ["", "", 9, 1, 10, 750, 0, "Uncommon", 3, 2],
        4: ["", "", 12, 1, 10, 1000, 0, "Uncommon", 4, 3],
        5: ["", "", 15, 1, 10, 1500, 0, "Rare", 5, 4],
        6: ["", "", 19, 1, 10, 2500, 0, "Rare", 6, 5],
        7: ["", "", 22, 1, 10, 3000, 0, "Rare", 7, 6],
        8: ["", "", 25, 1, 10, 5000, 0, "Epic", 8, 7],
        9: ["", "", 27, 1, 10, 7500, 0, "Epic", 9, 8],
        10: ["", "", 29, 1, 10, 10000, 0, "Epic", 10, 9],
        11: ["", "", 30, 2, 10, 0, 0, "Exotic", 11, 10],
        12: ["", "", 30, 2, 25, 0, 2, "Exotic", 11, 11],
        13: ["", "", 30, 2, 50, 1, 0, "Exotic", 11, 12],
        14: ["", "", 30, 1, 10, 15000, 0, "Exotic", 12, 11],
        15: ["", "", 30, 1, 10, 20000, 0, "Exotic", 12, 14],
        16: ["", "", 31, 1, 10, 25000, 0, "Exotic", 13, 15],
        17: ["", "", 31, 1, 10, 50000, 0, "Exotic", 13, 16],
        18: ["", "", 32, 1, 10, 75000, 0, "Exotic", 14, 17],
        19: ["", "", 32, 1, 10, 100000, 0, "Exotic", 14, 18],
        20: ["", "", 33, 1, 10, 125000, 0, "Exotic", 15, 19],
        21: ["", "", 33, 1, 10, 150000, 0, "Exotic", 15, 20],
        22: ["", "", 34, 1, 10, 175000, 0, "Exotic", 16, 21],
        23: ["", "", 34, 1, 10, 175000, 0, "Exotic", 16, 22],
        24: ["", "", 35, 2, 10, 0, 0, "Exotic", 17, 23],
        25: ["", "", 35, 2, 25, 1, 2, "Legendary", 17, 24],
        26: ["", "", 35, 2, 50, 2, 0, "Legendary", 17, 25]
    },
    BOSSES_NAMES: [],
    ENEMIES_NAMES: [],
    LOCATIONS: {
        // 0     1          2          3                  4                5           6
        // NAME, MIN LEVEL, MAX LEVEL, MAX DROP QUALITY, MISSION REQUIRED, LOOT (WIP), BACKGROUND
        0: ["The White Light", 1, 4, 0, 0, {
            loot: ["Truc", "Potion"],
        }, "0.jpg"],
        1: ["The Shadow Forest", 4, 7, 1, 1, {
            loot: ["Truc", "Potion"],
        }, "1.jpg"],
        2: ["The Lost Path", 7, 9, 1, 2, {
            loot: ["Truc", "Potion"],
        }, "2.jpg"],
        3: ["Galarius City", 9, 12, 2, 3, {
            loot: ["Truc", "Potion"],
        }, "3.jpg"],
        4: ["The Endless Mountain", 12, 15, 2, 4, {
            loot: ["Truc", "Potion"],
        }, "4.jpg"],
        5: ["The Dark Cave", 15, 19, 3, 5, {
            loot: ["Truc", "Potion"],
        }, "5.jpg"],
        6: ["Empire Road", 19, 22, 3, 6, {
            loot: ["Truc", "Potion"],
        }, "6.jpg"],
        7: ["Imperium City", 22, 25, 3, 7, {
            loot: ["Truc", "Potion"],
        }, "7.jpg"],
        8: ["Central V", 25, 27, 4, 8, {
            loot: ["Truc", "Potion"],
        }, "8.jpg"],
        9: ["The Red Portal", 27, 29, 4, 9, {
            loot: ["Truc", "Potion"],
        }, "9.jpg"],
        10: ["The Corrupted World", 29, 30, 4, 10, {
            loot: ["Truc", "Potion"],
        }, "10.jpg"],
        11: ["The Corrupted Fortress", 29, 30, 5, 10, {
            loot: ["Truc", "Potion"],
        }, "11.jpg"],
        12: ["The Black Portal", 30, 31, 5, 14, {
            loot: ["Truc", "Potion"],
        }, "12.jpg"],
        13: ["Elysia City", 31, 32, 5, 14, {
            loot: ["Truc", "Potion"],
        }, "13.jpg"],
        14: ["Vampire Manor", 32, 33, 5, 20, {
            loot: ["Truc", "Potion"],
        }, "14.jpg"],
        15: ["The Red River", 33, 34, 5, 20, {
            loot: ["Truc", "Potion"],
        }, "15.jpg"],
        16: ["The Immortal Bridge", 34, 35, 5, 20, {
            loot: ["Truc", "Potion"],
        }, "16.jpg"],
        17: ["Vampire Castle", 35, 35, 5, 20, {
            loot: ["Truc", "Potion"],
        }, "17.jpg"]
    }
};
var Backup = "Default";
var Game = {
    username: "Default",
    Language: "Automatic",
    Armors: [
        //  0       1     2      3      4      5     6
        //  STATUS, NAME, CLASS, ARMOR, LEVEL, GEMS, ICON
        [],
        [true, "Basic Armor", "Normal", 100, 1, 0],
        [false, "Basic Armor", "Normal", 100, 1, 0],
        [false, "Basic Armor", "Normal", 100, 1, 0],
        [false, "Basic Armor", "Normal", 100, 1, 0]
    ],
    Weapons: {
        // 0     1      2     3      4      5
        // NAME, CLASS, GEMS, LEVEL, POWER, ICON
        Main: ["Training Sword", "Normal", 0, 1, 10, ],
        Special: ["Training Dagger", "Normal", 0, 1, 10]
    },
    RELICS: [
        // 0           1      2     3   
        // RELIC NAME, CLASS, TYPE, VALUE
        [],
        ["Normal", 5, 0],
        ["Normal", 5, 0],
        ["Normal", 5, 0],
        ["Normal", 5, 0]
    ],
    ArmorUpgrades: [null, 0, 0, 0, 0],
    WeaponUpgrades: {
        Main: 0,
        Special: 0
    },
    MaxUPC: [0, 0, 0, 0, 0, 0],
    xp: [0, 100, 1],
    Level: 1,
    Enemy: [], //NAME, CLASS, LEVEL, POWER, LIFE, CURRENTLIFE
    Loses: 0,
    Wins: 0,
    Cash: 0,
    isInFight: 3,
    Emp: 0,
    Shards: 0,
    Defeated: [null, 0, 0, 0, 0, 0, 0, 0],
    inventory: [],
    MaxInv: 20,
    Theme: "",
    Upgrades: [0, 0, 0, 0],
    Dimension: 1,
    DIMENSION_MULTIPLIERS: [0, 0, 0, 1], //POWER, LIFE, XP, DIFFICULTY
    Avatar: random(1, 50),
    config: [1, 1, 0, 1, 0, 0],
    LastEscape: 0,
    Sprite: 0,
    MissionsCompleted: [],
    Location: 0,
    PlayTime: 0,
    MissionStarted: [false, 0, 0, 0, 0], //MISSION STARTED TOGGLE, MISSION ID, PROGRESSION, OBTAINED REWARD, LOCK WIN
    DefeatedByLocation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    FortressesCleared: 0,
    AutoRemove: [0, 0, 0, 0, 0, 0],
    TotalMissions: 0,
    class: "none",
    MaxLevelReached: 1
};