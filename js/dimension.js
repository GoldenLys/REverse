//PRESTIGE FUNCTIONS
const ChangeWT = function () {
    POPUP("Do you really want to go inside the rift ?", `You will lose your current equipment but gain these benefits: <br>
  • +50 maximum tier score <br>
  • 3% more EXP <br>
  • +2 additional inventory slots <br>
  • ${Math.round(APP.Ranking / 50 - 6)} Dimensional Fragments
  `, 2);
};

const ConfirmWT = function () {
    if (Game.Level >= APP.MaxLevel && APP.Ranking >= (((30 + (Game.Simulation * 5)) * 10) - 5) && APP.LastMission >= APP.TotalMissions) {
        Game.Simulation++;
        Game.xp = [0, 0, 0];
        Game.Level = 1;
        Game.Shards += Math.round(APP.Ranking / 50 - 6);
        APP.LifeMult = 1;
        APP.PowerMult = 1;
        Game.Emp = 0;
        Game.inventory = [];
        Game.MaxUPC = [0, 0, 0, 0, 0, 0];
        Game.Armors = { 1: [true, "Basic Armor", "Normal", 100, 1, 0], 2: [false, "Basic Armor", "Normal", 100, 1, 0], 3: [false, "Basic Armor", "Normal", 100, 1, 0], 4: [false, "Basic Armor", "Normal", 100, 1, 0], };
        Game.ArmorUpgrades = [null, 0, 0, 0, 0];
        Game.RELICS = [[], ["Normal", 5, 0], ["Normal", 5, 0], ["Normal", 5, 0], ["Normal", 5, 0]];
        Game.Weapons.Main = ["Training Sword", "Normal", 0, 1, 10 + (Game.Simulation * 1)];
        Game.Weapons.Special = ["Training Dagger", "Normal", 0, 1, 10 + (Game.Simulation * 1)];
        Game.isInFight = 0;
        Game.MissionsCompleted = [];
        Game.Location = 0;
        Game.MissionStarted = [false, 0, 0, 0, 0];
        Game.AutoRemove = [0, 0, 0, 0, 0, 0];
        $("#RM1").attr("data-check", "unchecked");
        $("#RM2").attr("data-check", "unchecked");
        $("#RM3").attr("data-check", "unchecked");
        $("#RM4").attr("data-check", "unchecked");
        $("#RM5").attr("data-check", "unchecked");
        $("#RM6").attr("data-check", "unchecked");
        hideRewards();
        CLOSE_MENUS();
        POPUP_CLOSE();
        mission(0);
    }
};

const GET_MAX_UPGRADES = function(CLASS) {
    let CONFIG = [
        { Normal: 0, Common: _.random(0, 1), Uncommon: _.random(1, 2), Rare: _.random(2, 2), Epic: _.random(2, 3), Exotic: _.random(3, 4), Divine: _.random(4, 5) },
        { Normal: _.random(0, 1), Common: _.random(0, 2), Uncommon: _.random(1, 2), Rare: _.random(2, 3), Epic: _.random(3, 4), Exotic: _.random(3, 5), Divine: _.random(5, 6) },
    ];
    return CONFIG[APP.ScoreModeEnabled][CLASS];
};

const DIMENSIONAL_UPGRADE = function (TYPE) {
    let COST = GetMultPrice(TYPE);
    if (Game.Shards >= COST && COST !== Infinity) {
        Game.Shards -= COST;
        Game.Upgrades[TYPE]++;
        UpdateGame();
    }
};

const GetMultPrice = function (id) {
    if (typeof Game.Upgrades[id] !== "number") Game.Upgrades[id] = 0;
    let price = 2;
    if (Game.Upgrades[id] >= 10) price = 3;
    if (Game.Upgrades[id] >= 20) price = 4;
    if (Game.Upgrades[id] >= 30) price = 5;
    if (Game.Upgrades[id] >= 40) price = 6;
    if (Game.Upgrades[id] >= 50) price = 8;
    if (Game.Upgrades[id] >= 60) price = 10;
    if (Game.Upgrades[id] >= 70) price = 12;
    if (Game.Upgrades[id] >= 80) price = 15;
    if (Game.Upgrades[id] >= 90) price = 25;
    if (id === 0 && Game.Upgrades[id] >= 200) price = Infinity;
    if (id === 1 && Game.Upgrades[id] >= 100) price = Infinity;
    if (id === 2 && Game.Upgrades[id] >= 100) price = Infinity;
    if (id === 3 && Game.Upgrades[id] >= 50) price = Infinity;
    return price;
};