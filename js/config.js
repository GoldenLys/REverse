window.GLOBALS = {
    NAME: "REverse",
    VERSION: "3.6",
    BETA: 6,
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
    BOSSES_NAMES: [],
    ENEMIES_NAMES: [],
    LOCATIONS: {
        // 0     1          2          3                  4                5           6
        // NAME, MIN LEVEL, MAX LEVEL, MAX DROP QUALITY, MISSION REQUIRED, LOOT (WIP), BACKGROUND
        0: ["The White Light", 1, 4, 0, 0, {
            loot: ["none"],
        }, "0.jpg"],
        1: ["The Shadow Forest", 4, 7, 1, 1, {
            loot: ["none"],
        }, "1.jpg"],

        2: ["The Lost Path", 7, 9, 1, 2, {
            loot: ["none"],
        }, "2.jpg"],

        3: ["Galarius City", 9, 12, 2, 3, {
            loot: ["none"],
        }, "3.jpg"],
        /*
        4: ["The Endless Mountain", 12, 15, 2, 4, {
            loot: ["none"],
        }, "4.jpg"],
        5: ["The Dark Cave", 15, 19, 3, 5, {
            loot: ["none"],
        }, "5.jpg"],
        6: ["Empire Road", 19, 22, 3, 6, {
            loot: ["none"],
        }, "6.jpg"],
        7: ["Imperium City", 22, 25, 3, 7, {
            loot: ["none"],
        }, "7.jpg"],
        8: ["Central V", 25, 27, 4, 8, {
            loot: ["none"],
        }, "8.jpg"],
        9: ["The Red Portal", 27, 29, 4, 9, {
            loot: ["none"],
        }, "9.jpg"],
        10: ["The Corrupted World", 29, 30, 4, 10, {
            loot: ["none"],
        }, "10.jpg"],
        11: ["The Corrupted Fortress", 29, 30, 5, 10, {
            loot: ["none"],
        }, "11.jpg"],
        12: ["The Black Portal", 30, 31, 5, 14, {
            loot: ["none"],
        }, "12.jpg"],
        13: ["Elysia City", 31, 32, 5, 14, {
            loot: ["none"],
        }, "13.jpg"],
        14: ["Vampire Manor", 32, 33, 5, 20, {
            loot: ["none"],
        }, "14.jpg"],
        15: ["The Red River", 33, 34, 5, 20, {
            loot: ["none"],
        }, "15.jpg"],
        16: ["The Immortal Valley", 34, 35, 5, 20, {
            loot: ["none"],
        }, "16.jpg"],
        17: ["Vampire Castle", 35, 35, 5, 20, {
            loot: ["none"],
        }, "17.jpg"]
        */
    },
    CODES: ["N4M3rs", "Wiz478", "1LUV17", "F0RC3D", "R3T0RN", "S4Vn0w", "H4d65M", "R3SET"],
};

GLOBALS.MISSIONS = {
    LIST: [
        {
            NAME: "White Light",
            LEVEL: 1,
            REWARDS: [200, 0, "Normal"],
            LOCATION: 0,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: -1
        },
        {
            NAME: "Shadow Forest",
            LEVEL: 4,
            REWARDS: [250, 0, "Common"],
            LOCATION: 1,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 0
        },

        {
            NAME: "Lost Path",
            LEVEL: 7,
            REWARDS: [500, 0, "Common"],
            LOCATION: 2,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 1
        },
        {
            NAME: "Galarius City",
            LEVEL: 9,
            REWARDS: [750, 0, "Uncommon"],
            LOCATION: 3,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 2
        },
        /*{
             NAME: "",
             LEVEL: 12,
             REWARDS: [1000, 0, "Uncommon"],
             LOCATION: 4,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 3
         },
         {
             NAME: "",
             LEVEL: 15,
             REWARDS: [1500, 0, "Rare"],
             LOCATION: 5,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 4
         },
         {
             NAME: "",
             LEVEL: 19,
             REWARDS: [2500, 0, "Rare"],
             LOCATION: 6,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 5
         },
         {
             NAME: "",
             LEVEL: 22,
             REWARDS: [3000, 0, "Rare"],
             LOCATION: 7,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 6
         },
         {
             NAME: "",
             LEVEL: 25,
             REWARDS: [5000, 0, "Epic"],
             LOCATION: 8,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 7
         },
         {
             NAME: "",
             LEVEL: 27,
             REWARDS: [7500, 0, "Epic"],
             LOCATION: 9,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 8
         },
         {
             NAME: "",
             LEVEL: 29,
             REWARDS: [10000, 0, "Epic"],
             LOCATION: 10,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 9
         },
         {
             NAME: "",
             LEVEL: 30,
             REWARDS: [0, 0, "Exotic"],
             LOCATION: 11,
             OBJECTIVE: 10,
             TYPE: 2,
             REQUIRED: 10
         },
         {
             NAME: "",
             LEVEL: 30,
             REWARDS: [0, 2, "Exotic"],
             LOCATION: 11,
             OBJECTIVE: 25,
             TYPE: 2,
             REQUIRED: 11
         },
         {
             NAME: "",
             LEVEL: 30,
             REWARDS: [1, 0, "Exotic"],
             LOCATION: 11,
             OBJECTIVE: 50,
             TYPE: 2,
             REQUIRED: 12
         },
         {
             NAME: "",
             LEVEL: 30,
             REWARDS: [15000, 0, "Exotic"],
             LOCATION: 12,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 11
         },
         {
             NAME: "",
             LEVEL: 30,
             REWARDS: [20000, 0, "Exotic"],
             LOCATION: 12,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 14
         },
         {
             NAME: "",
             LEVEL: 31,
             REWARDS: [25000, 0, "Exotic"],
             LOCATION: 13,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 15
         },
         {
             NAME: "",
             LEVEL: 31,
             REWARDS: [50000, 0, "Exotic"],
             LOCATION: 13,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 16
         },
         {
             NAME: "",
             LEVEL: 32,
             REWARDS: [75000, 0, "Exotic"],
             LOCATION: 14,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 17
         },
         {
             NAME: "",
             LEVEL: 32,
             REWARDS: [100000, 0, "Exotic"],
             LOCATION: 14,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 18
         },
         {
             NAME: "",
             LEVEL: 33,
             REWARDS: [125000, 0, "Exotic"],
             LOCATION: 15,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 19
         },
         {
             NAME: "",
             LEVEL: 33,
             REWARDS: [150000, 0, "Exotic"],
             LOCATION: 15,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 20
         },
         {
             NAME: "",
             LEVEL: 34,
             REWARDS: [175000, 0, "Exotic"],
             LOCATION: 16,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 21
         },
         {
             NAME: "",
             LEVEL: 34,
             REWARDS: [175000, 0, "Exotic"],
             LOCATION: 16,
             OBJECTIVE: 10,
             TYPE: 1,
             REQUIRED: 22
         },
         {
             NAME: "",
             LEVEL: 35,
             REWARDS: [0, 0, "Exotic"],
             LOCATION: 17,
             OBJECTIVE: 10,
             TYPE: 2,
             REQUIRED: 23
         },
         {
             NAME: "",
             LEVEL: 35,
             REWARDS: [1, 2, "Legendary"],
             LOCATION: 17,
             OBJECTIVE: 25,
             TYPE: 2,
             REQUIRED: 24
         },
         {
             NAME: "",
             LEVEL: 35,
             REWARDS: [2, 0, "Legendary"],
             LOCATION: 17,
             OBJECTIVE: 50,
             TYPE: 2,
             REQUIRED: 25
         },*/
    ],
    CHOICES: {
        /*null: {
            0: [
                "First",
                ["continue"]
            ],
            1: [
                "Second",
                [["Continue", [true, 3]], ["Bad ending", [false, 2]]]
            ],
            2: [
                "Bad ending",
                ["end"]
            ],
            3: [
                "Fourth",
                [["Good ending", ["accept", 4]], ["Bad ending", ["refuse", 2], ["Neutral ending", ["neutral", 5]]]]
            ],
            4: [
                "Good ending",
                ["end"]
            ],
            5: [
                "Neutral ending",
                ["end"]
            ],
        }*/
        0: {
            0: [
                "Death has claimed you... or so you thought, when an agonizing jolt wracked through your body, collapsing you onto the harsh pavement. The world around you blurred and faded into blackness.",
                ["continue"]
            ],
            1: [
                "And yet, within this obsidian abyss, you sense your existence, a consciousness stirring. You can feel the ethereal strands of your being. But... Wait, what does this mean? Where are you?",
                [["This must be some bizarre kind of dream...", [true, 3]], ["I... I have no idea...", [false, 2]], ["This is preposterous! Where is the person in charge?", ["karen", 2]]]
            ],
            2: [
                "Exhaustion washes over you. Succumbing to this overwhelming fatigue, you close your spiritual eyes, letting the darkness envelope you once again.",
                ["continue"]
            ],
            3: [
                "Upon reopening your eyes, you're embraced by a luminous wash of light. Your surroundings are formless, an infinite expanse of incandescent glow. Wherever you are, it's certainly not Earth. An awakening looms. Rise!",
                ["end"]
            ],
        },
        1: {
            0: [
                "Whatever that blinding light was, it seems that you have reached the end.",
                ["continue"]
            ],
            1: [
                "But one question remains, where are you ?",
                [["It seems that i'll get isekai'd to another world.", [true, 2]], ["Maybe i'm going to heaven... Should i make a harem ?", ['harem', 2]]]
            ],
            2: [
                "The only things you see are trees. an unknown, dark and creepy forest with no one in sight.",
                [["You decide to leave this place right now, even at the risk of losing your life in the unknown.", [true, 3]], ["You decide to stay here, till someone comes to help.", [false, 4]]]
            ],
            3: [
                "With a deep breath, you took your first step into the unknown.<br>The world around you shimmered with an otherworldly glow as you realized that you really had crossed over into a place unlike any you had ever seen before. And so, with equal parts excitement and trepidation, your adventure began.",
                ["end"]
            ],
            4: [
                "After waiting for some time, you decide to leave the place before you die of hunger...",
                ["end"]
            ]
        },
        2: {
            0: [
                "With each step, the alien beauty of your surroundings becomes more intense. A forest unlike any on Earth, with strange and twisted vegetation.",
                ["continue"]
            ],
            1: [
                "Suddenly, a rustling sound behind catches your attention. You spin around, a mix of both fear and anticipation in your heart. Is it a friend or foe?",
                [["Decide to avoid it and head in a different direction.", [false, 2]], ["Venture towards the noise, taking cautious steps.", [true, 3]]]
            ],
            2: [
                "Prudence wins over curiosity and you decide to maintain distance, marching off in the opposite direction, hoping to ward off any potential danger lurking in the enigmatic forest.",
                ["end"]
            ],
            3: [
                "As you draw closer, a boar emerges from the density of the foliage. The creature's eyes lock onto yours, establishing a tense standoff between man and beast.",
                ["continue"]
            ],
            4: [
                "Summoning your courage, you take a step closer to the boar. The beast, instead of acting aggressively, merely observes you with vigilance. You discover an unlikely kinship in the unknown, realising even in alien circumstances, one can find common ground.",
                ["end"]
            ]
        },
        3: {
            0: [
                "Driven by your sharp curiosity rather than caged by trepidation, you persist on your journey of exploration. The thought of hostile encounters eases as you find this new world to be more inviting than imagined.",
                ["continue"]
            ],
            1: [
                "Eventually, the shimmering outline of a city materializes in your line of sight. As you approach this bustling metropolis, you find inhabitants of this world who hold striking resemblances to the races you knew - humans, dwarves, and even elves!",
                [["Proceed into the city, prepared for any challenge.", [true, 2]], ["Elect to rest in the nearby forest before daring to enter the city.", [false, 3]]]
            ],
            2: [
                "Taking a deep, bolstering breath, you indulge in the city's vibrancy. Multitudes of different races enliven the streets, engulfing you in an extraordinary display of foreign trade and dialogue. The initial disorientation erodes swiftly, replaced by a steadily building curiosity about this novel environment.",
                ["end"]
            ],
            3: [
                "Deciding that caution is the better part of valor, you opt to maintain a careful distance from the city. After all, you are a solitary wanderer in an uncharted land.<br>Instead, you choose to take a rest in the seclusion of the forest, gathering your thoughts and bolstering your courage before venturing into the heart of the city.",
                ["continue"]
            ],
            4: [
                "After a peaceful rest under the foreign yet comforting canopy of the forest, you feel rejuvenated, ready to face the next part of your journey. With newfound resolve, you decide to finally head for the city.",
                ["end"]
            ]
        },
        4: {
            0: [
                "Feeling adventurous, you step into the heart of the city. The walls around you resonate with the hustle and bustle of city life. The city, a cosmopolitan canvas of many races and cultures, quickly accepts you.",
                [["This place seems great!", [true, 1]], ["This place... feels weird.", [false, 1]]]
            ],
            1: [
                "Each step immerses you deeper into this city's heartbeat. Among the marketplace conversations, local tavern camaraderie, and city nightlife, you feel a sense of belonging.",
                [["Join the crowd and head to the marketplace.", [true, 2]], ["Visit a local tavern to quench your thirst.", [false, 6]]]
            ],
            2: [
                "Choosing to mingle in the marketplace, the lively banter of vendors peddling their wares entertains you. Their strange yet fascinating products catch your eye.",
                ["An intriguing day at the market!", [true, 3]]
            ],
            3: [
                "In the midst of your enchantment, you feel a sudden jolt. Looking down, you find your satchel missing! A thief bumps into you and, just as swiftly, disappears into the crowd with your belongings.",
                ["Chase after the thief!", [true, 4], "Let it go and learn from the experience.", ["loss", 5]]
            ],
            4: [
                "You make a quick decision and dash after the thief. After a breathless chase, you corner him in an alley. You manage to retrieve your satchel - a hard-earned victory in this foreign city.",
                ["Phew. That was intense!", [true, 7]]
            ],
            5: [
                "Accepting the loss of your satchel, you learn a valuable lesson about vigilance. The city, while welcoming, also has its pitfalls. This fuels you to become stronger and warier.",
                ["A bitter lesson, but a lesson nonetheless.", [true, 7]]
            ],
            6: [
                "Opting for the tavern over the crowded marketplace, you find a cozy corner and a welcoming barkeep. The warm glow of the hearth accompanies the laughter and music that fill the place.",
                ["I could get used to this.", [true, 7]]
            ],
            7: [
                "The day, filled with excitement and learning, comes to an end. As you retreat to your room for a rest, you feel an unmistakable part of the tapestry of this vibrant city. Your dreams are filled with anticipation of tomorrow's adventures.",
                ["What a day! Ready for the next adventure.", [true, 8]]
            ],
            8: [
                "Whether your day was marked by the chase of a thief or the warmth of a tavern, it was but the start of your grand adventure. Tomorrow, you resolve to further explore the city and its myriad opportunities.",
                ["end"]
            ]
        }
    }
};

window.Backup = "Default";
window.Game = {
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
        Main: ["Makeshift Stick", "Normal", 0, 1, 10,],
        Special: ["Makeshift Dagger", "Normal", 0, 1, 10]
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
    isInFight: false,
    Emp: 0,
    Shards: 0,
    Defeated: [null, 0, 0, 0, 0, 0, 0, 0],
    inventory: [],
    MaxInv: 20,
    Theme: "",
    Upgrades: [0, 0, 0, 0],
    Dimension: 1,
    DIMENSION_MULTIPLIERS: [0, 0, 0, 1], //POWER, LIFE, XP, DIFFICULTY
    Avatar: _.random(1, 65),
    config: [1, 1, 2, 1, 0, 0],
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
    MaxLevelReached: 1,
    Introduction: false,
    Choices: [],
};