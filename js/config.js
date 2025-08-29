window.GLOBALS = {
    NAME: "REverse",
    VERSION: "3.6",
    BETA: 14,
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
    MONSTERS: [
        // Bosses
        { name: 'Pure Soul', location: 0, imageUrl: 'images/Monsters/pure_soul.png', imagePos: [0, 0], isBoss: true },
        { name: 'Living Mushroom', location: 1, imageUrl: 'images/Monsters/living_mushroom.png', imagePos: [0, 0], isBoss: true },
        { name: 'Rampaging Boar', location: 2, imageUrl: 'images/Monsters/rampaging_boar.png', imagePos: [0, 0], isBoss: true },
        { name: 'Grand Larcenist', location: 3, imageUrl: 'images/Monsters/grand_larcenist.png', imagePos: [0, 15], isBoss: true },
        { name: 'Skeleton King', location: 4, imageUrl: 'images/Monsters/skeleton_king.png', imagePos: [2.5, 5], isBoss: true },
        { name: 'Goblin Knight', location: 5, imageUrl: 'images/Monsters/goblin_knight.png', imagePos: [0, 0], isBoss: true },


        { name: 'Spider Queen', location: 6, imageUrl: 'images/Monsters/spider_queen.png', imagePos: [0, 0], isBoss: true },
        { name: 'Black Mage', location: 7, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: 'Ghoul', location: 8, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: 'Poltergeist', location: 9, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: 'Sentient Dullahan', location: 10, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: 'Demon Lord', location: 11, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: 'Powerful Skeleton', location: 12, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: "Jack-o'-lantern", location: 13, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: 'Vampire Lord', location: 14, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: 'Big Fish-Man', location: 15, imageUrl: '', imagePos: [0, 0], isBoss: true },
        { name: 'Vampire King', location: 17, imageUrl: '', imagePos: [0, 0], isBoss: true },

        // Enemies
        { name: 'Kind Soul', location: 0, imageUrl: 'images/Monsters/kind_soul.png', imagePos: [0, 0], isBoss: false },
        { name: 'Evil Soul', location: 0, imageUrl: 'images/Monsters/evil_soul.png', imagePos: [0, 0], isBoss: false },

        { name: 'Treant Sapling', location: 1, imageUrl: 'images/Monsters/treant_sapling.png', imagePos: [2.5, 0], isBoss: false },
        { name: 'Wolf', location: 1, imageUrl: 'images/Monsters/wolf.png', imagePos: [2.5, -15], isBoss: false },

        { name: 'Brutal Hog', location: 2, imageUrl: 'images/Monsters/boar.png', imagePos: [0, 0], isBoss: false },
        { name: 'Vicious Tusk', location: 2, imageUrl: 'images/Monsters/boar.png', imagePos: [0, 0], isBoss: false },
        { name: 'Wild Tusk', location: 2, imageUrl: 'images/Monsters/boar.png', imagePos: [0, 0], isBoss: false },

        { name: 'Swindler', location: 3, imageUrl: 'images/Monsters/swindler.png', imagePos: [0, 15], isBoss: false },
        { name: 'Thief', location: 3, imageUrl: 'images/Monsters/thief.png', imagePos: [0, 15], isBoss: false },

        { name: 'Skeleton', location: 4, imageUrl: 'images/Monsters/skeleton.png', imagePos: [0, 2.5], isBoss: false },
        { name: 'Skeleton Warrior', location: 4, imageUrl: 'images/Monsters/skeleton_warrior.png', imagePos: [0, 2.5], isBoss: false },

        { name: 'Goblin Archer', location: 5, imageUrl: 'images/Monsters/goblin_archer.png', imagePos: [0, 0], isBoss: false },
        { name: 'Goblin Worker', location: 5, imageUrl: 'images/Monsters/goblin_worker.png', imagePos: [0, 0], isBoss: false },


        { name: 'Spider', location: 6, imageUrl: 'images/Monsters/spider.png', imagePos: [0, 0], isBoss: false },

        { name: 'Fire Mage', location: 7, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Water Mage', location: 7, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Zombie', location: 8, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Burning Zombie', location: 8, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Ghost', location: 9, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Crying Ghost', location: 9, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Dullahan', location: 10, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Minor Rank Demon', location: 11, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Middle Rank Demon', location: 11, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Higher Rank Demon', location: 11, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Skeleton', location: 12, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Decrepit Skeleton', location: 12, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Burnt Skeleton', location: 12, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Fish-Man', location: 15, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Vampire', location: 14, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Noble Vampire', location: 16, imageUrl: '', imagePos: [0, 0], isBoss: false },
        { name: 'Vampire Lord', location: 16, imageUrl: '', imagePos: [0, 0], isBoss: false },
    ],
    LOCATIONS: {
        // 0     1          2          3                 4                 5
        // NAME, MIN LEVEL, MAX LEVEL, MAX DROP QUALITY, MISSION REQUIRED, BACKGROUND
        0: ["White Light", 1, 4, 0, 0, "0.jpg"],

        1: ["Shadow Forest", 4, 7, 1, 1, "1.jpg"],

        2: ["Lost Path", 7, 9, 1, 2, "2.jpg"],

        3: ["Galar Town", 9, 12, 2, 3, "3.jpg"],

        4: ["Ancient Ruins", 12, 15, 2, 4, "4.jpg"],

        5: ["Secluded Valley", 15, 19, 3, 5, "5.jpg"],
        6: ["Verdant Highlands", 19, 22, 3, 6, "6.jpg"],
        7: ["Eldoria City", 22, 25, 3, 7, "7.jpg"],
        8: ["Central V", 25, 27, 4, 8, "8.jpg"],
        9: ["The Red Portal", 27, 29, 4, 9, "9.jpg"],
        10: ["The Corrupted World", 29, 30, 4, 10, "10.jpg"],
        11: ["The Corrupted Dungeon", 29, 30, 5, 10, "11.jpg"],
        12: ["The Black Portal", 30, 31, 5, 14, "12.jpg"],
        13: ["Elysia City", 31, 32, 5, 14, "13.jpg"],
        14: ["Vampire Manor", 32, 33, 5, 19, "14.jpg"],
        15: ["The Red River", 33, 34, 5, 20, "15.jpg"],
        16: ["The Immortal Valley", 34, 35, 5, 20, "16.jpg"],
        17: ["Vampire Castle", 35, 35, 5, 20, "17.jpg"]
    },
    CODES: ["", "N4M3rs", "Wiz478", "1LUV17", "F0RC3D", "R3T0RN", "S4Vn0w", "H4d65M", "R3SET"],
};

GLOBALS.MISSIONS = {
    LIST: [
        {
            NAME: "The Abyssal Awakening", //MISSION 1
            LEVEL: 1,
            REWARDS: [200, 0, "Normal"],
            LOCATION: 0,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: -1
        },
        {
            NAME: "The Unknown Crossing", //MISSION 2
            LEVEL: 4,
            REWARDS: [250, 0, "Common"],
            LOCATION: 1,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 0
        },
        {
            NAME: "Encountering the Unknown", //MISSION 3
            LEVEL: 7,
            REWARDS: [350, 0, "Common"],
            LOCATION: 2,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 1
        },
        {
            NAME: "Galar Town", //MISSION 4
            LEVEL: 9,
            REWARDS: [450, 0, "Uncommon"],
            LOCATION: 3,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 2
        },
        {
            NAME: "Exploring the town", //MISSION 5
            LEVEL: 11,
            REWARDS: [500, 0, "Uncommon"],
            LOCATION: 3,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 3
        },
        {
            NAME: "The Mysterious Prophecy", //MISSION 6
            LEVEL: 12,
            REWARDS: [2, 0, "Uncommon"],
            LOCATION: 4,
            OBJECTIVE: 20,
            TYPE: 2,
            REQUIRED: 4
        },
        {
            NAME: "A Moment of Serenity", //MISSION 7
            LEVEL: 15,
            REWARDS: [500, 0, "Rare"],
            LOCATION: 5,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 5
        },
        {
            NAME: "Mission 8", 
            LEVEL: 19,
            REWARDS: [500, 0, "Rare"],
            LOCATION: 6,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 6
        },
        {
            NAME: "Mission 9",
            LEVEL: 22,
            REWARDS: [500, 0, "Rare"],
            LOCATION: 7,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 7
        },
        {
            NAME: "Mission 10",
            LEVEL: 25,
            REWARDS: [500, 0, "Epic"],
            LOCATION: 8,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 8
        },
        {
            NAME: "Mission 11",
            LEVEL: 27,
            REWARDS: [500, 0, "Epic"],
            LOCATION: 9,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 9
        },
        {
            NAME: "Mission 12",
            LEVEL: 29,
            REWARDS: [500, 0, "Epic"],
            LOCATION: 10,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 10
        },
        {
            NAME: "Mission 13",
            LEVEL: 30,
            REWARDS: [0, 0, "Exotic"],
            LOCATION: 11,
            OBJECTIVE: 10,
            TYPE: 2,
            REQUIRED: 11
        },
        {
            NAME: "Mission 14",
            LEVEL: 30,
            REWARDS: [0, 2, "Exotic"],
            LOCATION: 11,
            OBJECTIVE: 25,
            TYPE: 2,
            REQUIRED: 12
        },
        {
            NAME: "Mission 15",
            LEVEL: 30,
            REWARDS: [1, 0, "Exotic"],
            LOCATION: 11,
            OBJECTIVE: 50,
            TYPE: 2,
            REQUIRED: 13
        },
        {
            NAME: "Mission 16",
            LEVEL: 30,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 12,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 14
        },
        {
            NAME: "Mission 17",
            LEVEL: 30,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 12,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 15
        },
        {
            NAME: "Mission 18",
            LEVEL: 31,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 13,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 16
        },
        {
            NAME: "Mission 19",
            LEVEL: 31,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 13,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 17
        },
        {
            NAME: "Mission 20",
            LEVEL: 32,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 14,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 18
        },
        {
            NAME: "Mission 21",
            LEVEL: 32,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 14,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 19
        },
        {
            NAME: "Mission 22",
            LEVEL: 33,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 15,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 20
        },
        {
            NAME: "Mission 23",
            LEVEL: 33,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 15,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 21
        },
        {
            NAME: "Mission 24",
            LEVEL: 34,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 16,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 22
        },
        {
            NAME: "Mission 25",
            LEVEL: 34,
            REWARDS: [500, 0, "Exotic"],
            LOCATION: 16,
            OBJECTIVE: 10,
            TYPE: 1,
            REQUIRED: 23
        },
        {
            NAME: "Mission 26",
            LEVEL: 35,
            REWARDS: [0, 0, "Exotic"],
            LOCATION: 17,
            OBJECTIVE: 10,
            TYPE: 2,
            REQUIRED: 24
        },
        {
            NAME: "Mission 27",
            LEVEL: 35,
            REWARDS: [1, 2, "Legendary"],
            LOCATION: 17,
            OBJECTIVE: 25,
            TYPE: 2,
            REQUIRED: 25
        },
        {
            NAME: "Mission 28",
            LEVEL: 35,
            REWARDS: [2, 0, "Legendary"],
            LOCATION: 17,
            OBJECTIVE: 50,
            TYPE: 2,
            REQUIRED: 26
        },
    ],
    CHOICES: {
        0: { // MISSION 1
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
        1: { // MISSION 2
            0: [
                "Whatever that blinding light was, it seems that you have reached the end.",
                ["continue"]
            ],
            1: [
                "But one question remains, where are you ?",
                [["It seems that i'll get isekai'd to another world.", [true, 2]], ["Maybe i'm going to heaven... And there may be a harem waiting for me ?", ["harem", 2]]]
            ],
            2: [
                "The only things you see are trees. an unknown, dark and creepy forest with no one in sight.",
                [["You decide to leave this place right now, even at the risk of losing your life in the unknown.", [true, 3]], ["You decide to stay here, till someone comes to rescue you.", [false, 4]]]
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
        2: { // MISSION 3
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
        3: { // MISSION 4
            0: [
                "Driven by your sharp curiosity rather than caged by trepidation, you persist on your journey of exploration. The thought of hostile encounters eases as you find this new world to be more inviting than imagined.",
                ["continue"]
            ],
            1: [
                "Eventually, the shimmering outline of a city materializes in your line of sight. As you approach this bustling metropolis, you find inhabitants of this world who hold striking resemblances to the races you knew - humans, dwarves, and even elves!",
                [
                    ["Proceed into the city, prepared for any challenge.", [true, 2]],
                    ["Rest in the nearby forest before daring to enter the city.", [false, 3]]
                ]
            ],
            2: [
                "Taking a deep, bolstering breath, you indulge in the city's vibrancy. Multitudes of different races enliven the streets, engulfing you in an extraordinary display of foreign trade and dialogue. The initial disorientation erodes swiftly, replaced by a steadily building curiosity about this novel environment.",
                ["end"]
            ],
            3: [
                "Deciding that caution is the better part of valor, you opt to maintain a careful distance from the city. After all, you are a solitary wanderer in an uncharted land.<br>Instead, you choose to take a rest in the seclusion of the forest, gathering your thoughts and bolstering your courage before venturing into the heart of this unknown city.",
                ["continue"]
            ],
            4: [
                "After a peaceful rest under the foreign yet comforting canopy of the forest, you feel rejuvenated, ready to face the next part of your journey. With newfound resolve, you decide to finally head for the city.",
                ["end"]
            ]
        },
        4: { // MISSION 5
            0: [
                "As you step into the city, the walls around you resonate with the hustle and bustle of city life. This city and it's people, a cosmopolitan canvas of many races and cultures, quickly accepts you.",
                [["This place seems great!", [true, 1]], ["This place... feels weird.", [false, 1]]]
            ],
            1: [
                "Each step immerses you deeper into this city's heartbeat. Among the marketplace conversations, local tavern camaraderie, and city nightlife, you feel a sense of belonging.",
                [["Join the crowd and head to the marketplace.", [true, 2]], ["Visit a local tavern to quench your thirst.", [false, 6]]]
            ],
            2: [
                "Choosing to mingle in the marketplace, the lively banter of vendors peddling their wares entertains you. Their strange yet fascinating products catch your eye.",
                [["An intriguing day at the market!", [true, 3]]]
            ],
            3: [
                "In the midst of your enchantment, you feel a sudden jolt. Looking down, you find your satchel missing! A thief bumps into you and, just as swiftly, disappears into the crowd with your belongings.",
                [["Chase after the thief!", ["lawbringer", 4]], ["Let it go and learn from the experience.", ["loser", 5]]]
            ],
            4: [
                "You make a quick decision and dash after the thief. After a breathless chase, you corner him in an alley. You manage to retrieve your satchel - a hard-earned victory in this foreign city.",
                [["Phew. That was intense!", [true, 7]]]
            ],
            5: [
                "Accepting the loss of your satchel, you learn a valuable lesson about vigilance. The city, while welcoming, also has its pitfalls. This fuels you to become stronger and warier.",
                [["A bitter lesson, but a lesson nonetheless.", [true, 7]]]
            ],
            6: [
                "Opting for the tavern over the crowded marketplace, you find a cozy corner and a welcoming barkeep. The warm glow of the hearth accompanies the laughter and music that fill the place.",
                [["I could get used to this.", [true, 7]]]
            ],
            7: [
                "The day, filled with excitement and learning, comes to an end. As you retreat to your room for a rest, you feel an unmistakable part of the tapestry of this vibrant city. Your dreams are filled with anticipation of tomorrow's adventures.",
                [["What a day! Ready for the next adventure.", [true, 8]]]
            ],
            8: [
                "Whether your day was marked by the chase of a thief or the warmth of a tavern, it was but the start of your grand adventure. Tomorrow, you resolve to further explore the city and its myriad opportunities.",
                ["end"]
            ]
        },
        5: { // MISSION 6
            0: [
                "As you step out of the cozy tavern, a sense of unease creeps over you. The city seems quieter than usual, and an unsettling chill runs down your spine. The bustling metropolis of your past days now feels like a distant memory.",
                ["continue"]
            ],
            1: [
                "You've heard rumors about strange occurrences in the outskirts of the city - whispers of ancient ruins and cryptic prophecies. Your curiosity piqued, you decide to venture beyond the city walls.",
                [["Decide to explore these rumored ruins alone.", ["loner", 4]], ["Gather a group of adventurers for safety.", ["companionship", 3]]]
            ],
            2: [
                "Taking a deep breath, you set off on your journey, leaving the comforting city behind. The path is winding and treacherous, but your determination propels you forward.",
                ["continue"]
            ],
            3: [
                "Gathering a group of seasoned adventurers adds to your sense of security. Together, you embark on a journey filled with wonder and potential danger. Through the twists and turns of the forest, you reach the rumored ruins.",
                [["The journey has been long but rewarding!", [true, 4]]]
            ],
            4: [
                "Upon reaching the ancient ruins, you find yourself in awe of their grandeur. The crumbling stones carry tales of civilizations long past. As you delve deeper into the ruins, your heart races with anticipation.",
                ["continue"]
            ],
            5: [
                "Suddenly, you come across an inscription on a moss-covered stone. It speaks of an impending disaster, foretold by an ancient prophecy. The ominous words send chills down your spine.",
                [["Translate the inscription and uncover its meaning!", [true, 6]], ["Leave the inscription undisturbed.", ["ignore", 7]]]
            ],
            6: [
                "Your translation reveals a prophecy that speaks of a great darkness threatening to engulf the world. The only hope lies in finding the 'Crystal of Darkness' hidden deep within the ruins.",
                [["Search for the Crystal of Darkness!", [true, 8]]]
            ],
            7: [
                "Ignoring the inscription and pressing on, you continue your exploration of the ancient ruins. The sense of unease lingers, but the allure of discovery keeps you going.",
                ["end"]
            ],
            8: [
                "Following the cryptic clues left by the ancient civilization, your are able to finally locate the Crystal of Darkness. With a feeling of triumph and relief, you grasp the crystal in your hands.",
                [["The prophecy has been thwarted!", [true, 9]]]
            ],
            9: [
                "Your adventure has come to an end, but the memories of this day will remain etched in your mind forever. As you make your way back to the city, you can't help but wonder what other secrets lie hidden within these ancient ruins and this world.",
                ["end"]
            ]
        },
        6: { // MISSION 7
            0: [
                "You emerge from the ancient ruins, your heart pounding with excitement. As you take a moment to catch your breath, the sight before you is a welcome relief.",
                ["continue"]
            ],
            1: [
                "As you take in the view, your thoughts turn to the mysterious crystal you've discovered. You can't help but wonder about its true nature and purpose. Maybe someone in the city can help you.",
                [["Return to the city to find information about the Crystal.", [true, 2]]]
            ],
            2: [
                "You enter the bustling city, your mind preoccupied with thoughts of the crystal. As you navigate through the crowded streets, you come across a friendly shopkeeper that tells you someone called the Sage in the north might know something about the Crystal.",
                ["continue"]
            ],
            3: [
                "As you continue your journey after leaving the city, a secluded and verdant valley unfolds before you. The tranquility of this scene is a stark contrast to the chaos of the ruins you saw. You can hear the soothing sound of water cascading down from the cliffs above, forming a pristine lake that shimmers in the natural sunlight.",
                ["continue"]
            ],
            4: [
                "Leaving the tranquility of the valley behind, you embark on a quest to seek out the sage you've heard of. Deciding to leave the crystal behind for now, you explore the verdant valley. The lush greenery and calm lake offer a soothing respite from the rigors of your journey.",
                ["continue"]
            ],
            5: [
                "As you wander through the valley, you come across various creatures - some friendly, others not so much. You encounter a group of villagers who are being terrorized by a band of goblins. They beg for your help in driving them away.",
                [["Decide to aid the villagers and prove your courage.", ["goblin_slayer", 6]], ["Yeah.. not sure about helping anyone for now, let's move on.", ["guilt", 8]]]
            ],
            6: [
                "With a sense of determination, you charge towards the goblins. The battle is fierce, but your quick thinking and strategic prowess enable you to emerge victorious.",
                [["You continue on your quest to find the Sage Tower.", [true, 7]]]
            ],
            7: [
                "Your courage and determination earn you a reputation among the villagers, who share tales of your deeds far and wide. With renewed vigor, you press onward in your quest to seek out the sage and uncover the secrets of the mysterious crystal.",
                ["end"]
            ],
            8: [
                "You choose to ignore the pleas for help from the villagers, continuing on your quest to find the sage with a heavy conscience.",
                ["end"]
            ]
        },
        7: { // MISSION 8
            0: [
                "WIP",
                ["end"]
            ]
        },
        8: { // MISSION 9
            0: [
                "WIP",
                ["end"]
            ]
        },
        9: { // MISSION 10
            0: [
                "WIP",
                ["end"]
            ]
        },
        10: { // MISSION 11
            0: [
                "WIP",
                ["end"]
            ]
        },
        11: { // MISSION 12
            0: [
                "WIP",
                ["end"]
            ]
        },
        12: { // MISSION 13
            0: [
                "WIP",
                ["end"]
            ]
        },
        13: { // MISSION 14
            0: [
                "WIP",
                ["end"]
            ]
        },
        14: { // MISSION 15
            0: [
                "WIP",
                ["end"]
            ]
        },
        15: { // MISSION 16
            0: [
                "WIP",
                ["end"]
            ]
        },
        16: { // MISSION 17
            0: [
                "WIP",
                ["end"]
            ]
        },
        17: { // MISSION 18
            0: [
                "WIP",
                ["end"]
            ]
        },
        18: { // MISSION 19
            0: [
                "WIP",
                ["end"]
            ]
        },
        19: { // MISSION 20
            0: [
                "WIP",
                ["end"]
            ]
        },
        20: { // MISSION 21
            0: [
                "WIP",
                ["end"]
            ]
        },
        21: { // MISSION 22
            0: [
                "WIP",
                ["end"]
            ]
        },
        22: { // MISSION 23
            0: [
                "WIP",
                ["end"]
            ]
        },
        23: { // MISSION 24
            0: [
                "WIP",
                ["end"]
            ]
        },
        24: { // MISSION 25
            0: [
                "WIP",
                ["end"]
            ]
        },
        25: { // MISSION 26
            0: [
                "WIP",
                ["end"]
            ]
        },
        26: { // MISSION 27
            0: [
                "WIP",
                ["end"]
            ]
        },
        27: { // MISSION 28
            0: [
                "WIP",
                ["end"]
            ]
        },
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
    DungeonsCleared: 0,
    AutoRemove: [0, 0, 0, 0, 0, 0],
    TotalMissions: 0,
    class: "none",
    MaxLevelReached: 1,
    Introduction: false,
    Choices: [],
};