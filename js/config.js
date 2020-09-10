const GLOBALS = {
    NAME: "AlphaRPG",
    VERSION: "3.0",
    BETA: false,
    RELICS_NAMES: ["Ares Relic", "Yggdrasil Relic", "Hermes Relic", "Vulcan Relic", "No Relic"],
    ARMORS_NAMES: {
        Normal: ['Tiny', 'Cursed', 'Ruined', 'Damaged', 'Unusable', 'Rusty', 'Weakened', 'Broken'],
        Common: ['Cheap', 'Small', 'Fragile', 'Chipped', 'Weak', 'Used', 'Battered', 'Basic'],
        Uncommon: ['Acceptable', 'Big', 'Expensive', 'Light', 'Undamaged', 'Clean', 'Worn', 'Fresh'],
        Rare: ['Nice', 'Good', 'Premium', 'Hard', 'Strong', 'Durable', 'Polished', 'Powerful'],
        Epic: ['Master', 'Expert', 'Guardian', 'Perfect', 'Balanced', 'Epic', 'Advanced', 'Shiny'],
        Exotic: ['Exotic', 'Magic', 'Sacred', 'Blessed', 'Relic', 'Alpha', 'Destiny', 'Deca'],
        Divine: ['Unreal', 'Paradise', 'Divine', 'Godly', 'Holy', 'Heavenly', 'Fairy', 'Fantasm']
    },
    ARMORS_TYPE: ["", "Helmet", "Armor", "Shield", "Boots"],
    WEAPONS_TYPE: ["Main", "Special"],
    MISSIONS: {
        // 0     1     2      3     4          5           6            7        8         9
        // NAME, DESC, LEVEL, TYPE, REQ KILLS, EXPERIENCE, REWARD TYPE, QUALITY, LOCATION, REQ MISSION
        0: ["White Light", 'You wake up in an unknown place where a white light dazzles you...<br>You can see the exit in the distance. Make it quick, this place seems weird!', 1, 1, 10, 200, 0, "Normal", 0, -1],
        1: ["Shadow Forest", 'You are now in a forest... a dark and creepy forest.<br>You decide to move from here since at this rate you could die in that lost place.', 4, 1, 10, 250, 0, "Common", 1, 0],
        2: ["Lost Path", 'You arrive at the end of the forest and discover a little path hidden behind a big tree.<br>There seems to be a light in the distance and perhaps finally some answers.', 7, 1, 10, 500, 0, "Common", 2, 1],
        3: ["Galarius City", 'You reach a city with many people from a variety of different races: humans, dwarves, and even elves.<br>It seems like you might be able to find some help here... or maybe just someone who can tell you how to get back to your world.', 9, 1, 10, 750, 0, "Uncommon", 3, 2],
        4: ["Endless mountain", 'One of the locals advises you to go north and reach the royal capital through the mountains...<br>So here you are in the so-called "endless" mountains.', 12, 1, 10, 1000, 0, "Uncommon", 4, 3],
        5: ["Dark Cave", 'You arrive at the entrance of a dark cave.<br>It seems narrow but it is much faster and less dangerous than the mountains.', 15, 1, 10, 1500, 0, "Rare", 5, 4],
        6: ["Empire Road", 'You finally reach the end of the cave, tired but in one piece.<br>You can already see a sprawling city at the end of the road.', 19, 1, 10, 2500, 0, "Rare", 6, 5],
        7: ["Imperium City", 'You arrive at the Capital; the King, having heard about your story, demands an immediate hearing.', 22, 1, 10, 3000, 0, "Rare", 7, 6],
        8: ["Central V", 'You discuss finding a way to return to your world with the king.<br>He informs you that the only way is through the Red Portal on the farm side of the nearby demon army.<br>You\'ll need to get there quickly before the demons swarm you!', 25, 1, 10, 5000, 0, "Epic", 8, 7],
        9: ["The Red Portal", 'The red portal is near and burns white-hot like the gates of hell.<br>Lacking any better options you head closer.', 27, 1, 10, 7500, 0, "Epic", 9, 8],
        10: ["Corrupted World", 'You have successfully passed through the portal... But where have you arrived?', 29, 1, 10, 10000, 0, "Epic", 10, 9],
        11: ["Corrupted Fortress", 'You see a huge fortress full of nothing but demons; you feel the need to cleanse this place.', 30, 2, 10, 0, 0, "Exotic", 11, 10],
        12: ["Corrupted Fortress - Basement", 'There is a door inside that leads downwards to another level; you feel the need to cleanse this place too.', 30, 2, 25, 0, 2, "Exotic", 11, 11],
        13: ["Corrupted Fortress - Core", 'On the final floor you find the Fortress Core, where the corruption started... Destroy it.', 30, 2, 50, 1, 0, "Exotic", 11, 12],
        14: ["The Black Portal", 'Just after you destroyed the Fortress Core another portal appears, this one black and cold as ice.<br><br><center>A new story begins.</center>', 30, 1, 10, 15000, 0, "Exotic", 12, 11],
        15: ["The Black Portal II", 'As you move forward the passage becomes even darker and colder.<br>You can just make out a light far in the distance...', 30, 1, 10, 20000, 0, "Exotic", 12, 14],
        16: ["Light of Elysia", 'Exiting the other side of the portal you land in a new world in the city of Elysia.<br>This world seems quite beautiful; why not explore it for awhile?', 31, 1, 10, 25000, 0, "Exotic", 13, 15],
        17: ["Red Moon at Elysia", 'Elysia is lively, peaceful, and filled solely by humans as far as you can tell.<br>As you wander the city you hear a cry; when you arrive at the sound you see a man sucking someone\'s blood in the shadow of an alley... a vampire!', 31, 1, 10, 50000, 0, "Exotic", 13, 16],
        18: ["Vampire Manor", 'One of the vampires confesses the location of a vampire hideout. Surely you will find more information there.', 32, 1, 10, 75000, 0, "Exotic", 14, 17],
        19: ["Funeral Chamber of the Manor", 'This seems to be the right place: it\'s full of vampires and one of them emits a strange power.', 32, 1, 10, 100000, 0, "Exotic", 14, 18],
        20: ["The New World", 'The city is now at peace. You head towards the Red River as you continue to explore this new world.', 33, 1, 10, 125000, 0, "Exotic", 15, 19],
        21: ["The Red River", 'During your daily hunt you find a merchant who keeps repeating that the vampire attack in the city was only the beginning.<br>He also shares a rumor: the vampire\'s castle is said to be hidden somewhere in the mountains.', 33, 1, 10, 150000, 0, "Exotic", 15, 20],
        22: ["The Mountains", "After searching for five days in the mountains you find a bridge filled with corpses.<br>Without any hesitation you start to cross the bridge into vampire territory.", 34, 1, 10, 175000, 0, "Exotic", 16, 21],
        23: ["The Immortal Bridge", "These vampires seem more difficult to kill than the ones in the city.<br>An enormous castle looms at the end of the bridge so you continue to fight through them.", 34, 1, 10, 175000, 0, "Exotic", 16, 22],
        24: ["Vampire Castle", 'This is it: The Vampire Castle.<br>Now that you have arrived it\'s time to cleanse this filthy place.', 35, 2, 10, 0, 0, "Exotic", 17, 23],
        25: ["Vampire Castle - Tower", 'You discover that one of the towers in the castle houses many powerful vampires.<br>This may take longer than you had hoped to clean up.', 35, 2, 25, 1, 2, "Divine", 17, 24],
        26: ["Vampire Castle - Core", 'You have reached the Castle Heart. By destroying the Heart this world will finally be at peace.<br>But first you\'ll need to kill the remaining vampires that guard it!', 35, 2, 50, 2, 0, "Divine", 17, 25]
    },
    BOSSES_NAMES: [
        'Pure Soul',
        'Fairy Queen',
        'Alpha Wolf',
        'Huge Rat',
        'Poison Golem',
        'Pink Slime',
        'Albino Spider',
        'Black Mage',
        'Ghoul',
        'Poltergeist',
        'Knight Commander',
        'Demon Lord',
        'Powerful Skeleton',
        "Jack-o'-lantern",
        'Vampire Lord',
        'Big Fish-Man',
        'Vampire Lord',
        'Vampire King'
    ],
    ENEMIES_NAMES: [
        ["Kind Soul", "Evil Soul"],
        ["Fire Fairy", "Water Fairy", "Grass Fairy"],
        ["Wolf", " White Wolf", "African Wolf"],
        ["Grey Rat", "Brown Rat"],
        ["Stone Golem", "Water Golem"],
        ["Blue Slime", "Black Slime", "Yellow Slime"],
        ["Black Spider", "Red Spider"],
        ["Fire Mage", "Water Mage"],
        ["Zombie", "Burning Zombie"],
        ["Ghost", "Crying Ghost"],
        ["White Knight", "Red Knight"],
        ["Minor Rank Demon", "Middle Rank Demon", "Higher Rank Demon"],
        ["Skeleton", "Decrepit Skeleton", "Burnt Skeleton"],
        ["Jack-o'-lantern", "Jack-o'-lantern"],
        ["Vampire"],
        ["Fish-Man", "Fish-Man", "Fish-Man"],
        ["Vampire", "Noble Vampire"],
        ["Vampire Lord", "Noble Vampire"]
    ],
    LOCATIONS: {
        // 0     1          2          3                 4                 5           6
        // NAME, MIN LEVEL, MAX LEVEL, MAX DROP QUALITY, MISSION REQUIRED, LOOT (WIP), BACKGROUND
        0: ["The White Light", 1, 4, 0, 0, { lootables: ["Truc", "Potion"], }, "0.jpg"],
        1: ["The Shadow Forest", 4, 7, 1, 1, { lootables: ["Truc", "Potion"], }, "1.jpg"],
        2: ["The Lost Path", 7, 9, 1, 2, { lootables: ["Truc", "Potion"], }, "2.jpg"],
        3: ["Galarius City", 9, 12, 2, 3, { lootables: ["Truc", "Potion"], }, "3.jpg"],
        4: ["The Endless Mountain", 12, 15, 2, 4, { lootables: ["Truc", "Potion"], }, "4.jpg"],
        5: ["The Dark Cave", 15, 19, 3, 5, { lootables: ["Truc", "Potion"], }, "5.jpg"],
        6: ["Empire Road", 19, 22, 3, 6, { lootables: ["Truc", "Potion"], }, "6.jpg"],
        7: ["Imperium City", 22, 25, 3, 7, { lootables: ["Truc", "Potion"], }, "7.jpg"],
        8: ["Central V", 25, 27, 4, 8, { lootables: ["Truc", "Potion"], }, "8.jpg"],
        9: ["The Red Portal", 27, 29, 4, 9, { lootables: ["Truc", "Potion"], }, "9.jpg"],
        10: ["The Corrupted World", 29, 30, 4, 10, { lootables: ["Truc", "Potion"], }, "10.jpg"],
        11: ["The Corrupted Fortress", 29, 30, 5, 10, { lootables: ["Truc", "Potion"], }, "11.jpg"],
        12: ["The Black Portal", 30, 31, 5, 14, { lootables: ["Truc", "Potion"], }, "12.jpg"],
        13: ["Elysia City", 31, 32, 5, 14, { lootables: ["Truc", "Potion"], }, "13.jpg"],
        14: ["Vampire Manor", 32, 33, 5, 20, { lootables: ["Truc", "Potion"], }, "14.jpg"],
        15: ["The Red River", 33, 34, 5, 20, { lootables: ["Truc", "Potion"], }, "15.jpg"],
        16: ["The Immortal Bridge", 34, 35, 5, 20, { lootables: ["Truc", "Potion"], }, "16.jpg"],
        17: ["Vampire Castle", 35, 35, 5, 20, { lootables: ["Truc", "Potion"], }, "17.jpg"]
    }
};
var Backup = "Default";
var Game = {
    username: "Default",
    Armors: [[],
        // 0       1     2      3      4      5
        // STATUS, NAME, CLASS, ARMOR, LEVEL, GEMS
        [true, "Basic Armor", "Normal", 100, 1, 0],
        [false, "Basic Armor", "Normal", 100, 1, 0],
        [false, "Basic Armor", "Normal", 100, 1, 0],
        [false, "Basic Armor", "Normal", 100, 1, 0]
    ],
    Weapons: {
        // 0     1      2     3      4
        // NAME, CLASS, GEMS, LEVEL, POWER
        Main: ["Training Sword", "Normal", 0, 1, 10],
        Special: ["Training Dagger", "Normal", 0, 1, 10]
    },
    RELICS: [[],
        // 0      1    2
        // CLASS, TYPE, VALUE
        ["Normal", 5, 0],
        ["Normal", 5, 0],
        ["Normal", 5, 0],
        ["Normal", 5, 0]
    ],
    ArmorUpgrades: [null, 0, 0, 0, 0],
    WeaponUpgrades: { Main: 0, Special: 0 },
    MaxUPC: [0, 0, 0, 0, 0, 0],
    xp: [0, 100, 1],
    Level: 1,
    Enemy: [], // NAME, CLASS, LEVEL, POWER, LIFE, CURRENTLIFE
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
    Simulation: 1,
    DIMENSION_MULTIPLIERS: [0, 0, 0, 1], // POWER, LIFE, XP, DIFFICULTY
    Avatar: random(1, 50),
    config: [1, 1, 0, 1, 0],
    LastEscape: 0,
    Sprite: 0,
    MissionsCompleted: [],
    Location: 0,
    PlayTime: 0,
    MissionStarted: [false, 0, 0, 0, 0], // MISSION STARTED TOGGLE, MISSION ID, PROGRESSION, OBTAINED REWARD, LOCK WIN
    DefeatedByLocation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    FortressesCleared: 0,
    AutoRemove: [0, 0, 0, 0, 0, 0],
    TotalMissions: 0,
    class: "none",
    MaxLevelReached: 1
};
