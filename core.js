var APP = {
  NAME: "AlphaRPG",
  VERSION: 2.3,
  WelcomeData: [1, "Neo", "None"],
  code: {},
  WeaponsPower: 10,
  SpecialPower: 20,
  Ranking: 0,
  PowerMult: 1,
  LifeMult: 1,
  lastCloudSave: 0,
  NewArmorID: 0,
  CoreLife: 100,
  CoreBaseLife: 100,
  Leader: 0,
  MaxLevel: 35,
  MaxScore: 350,
  TotalMissions: 0,
  LastMission: 0,
  ScoreModeEnabled: 0,
  LoggedIn: 0,
  Email: "none"
};

const Relicname = ["Ares Relic", "Yggdrasil Relic", "Vulcan Relic", "Recon Relic"];
const CoreNames = {
  Normal: ['Poor', 'Tiny', 'Cursed', 'Ruined', 'Damaged', 'Frozen', 'Rusty', 'Single'],
  Common: ['Cheap', 'Small', 'Lower', 'Minor', 'Weak', 'Used', 'Slow', 'Dual'],
  Uncommon: ['Acceptable', 'Big', 'Expensive', 'Strong', 'Higher', 'Clean', 'Quad', 'Fresh'],
  Rare: ['Lucky', 'Good', 'Premium', 'Shadow', 'Light', 'Fast', 'Hexa', 'Powerful'],
  Epic: ['Master', 'Expert', 'Guardian', 'OC', 'Defender', 'Avenger', 'Advanced', 'Octo'],
  Exotic: ['Exotic', 'Magic', 'Sacred', 'Blessed', 'Relic', 'Alpha', 'Destiny', 'Deca'],
  Divine: ['Unreal', 'Paradise', 'Future', 'Godly', 'Holy', 'Heaven', 'Fairy', 'Fantasm'],
};
var Backup = "Default";
var Game = {
  username: "Default",
  Armors: {
    //  STATUS, NAME, CLASS, ARMOR, LEVEL, GemS
    1: [true, "Basic Armor", "Normal", 100, 1, 0],
    2: [false, "Basic Armor", "Normal", 100, 1, 0],
    3: [false, "Basic Armor", "Normal", 100, 1, 0],
    4: [false, "Basic Armor", "Normal", 100, 1, 0],
  },
  Weapons: {
    Main: ["Training Sword", "Normal", 0, 1, 10], //NAME, CLASS, GemS, LEVEL, POWER
    Special: ["Training Dagger", "Normal", 0, 1, 10],
  },
  RLS: {//RELIC NAME, CLASS, TYPE, VALUE
    1: ["Normal", 0, 0],
    2: ["Normal", 0, 0],
    3: ["Normal", 0, 0],
    4: ["Normal", 0, 0],
  },
  ArmorUpgrades: [null, 0, 0, 0, 0],
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
  Simulation: 1,
  WTMult: [0, 0, 0, 1], //POWER, LIFE, XP, DIFFICULTY
  Avatar: random(1, 39),
  config: [1, 1, 0, 1, 0],
  LastEscape: 0,
  Sprite: 0,
  MissionsCompleted: [],
  Location: 0,
  PlayTime: 0,
  MissionStarted: [false, 0, 0, 0, 0], //TOGGLE, MISSION ID, PROGRESSION, OBTAINED REWARD, LOCK WIN
  DefeatedByLocation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  FP: 0,
  AutoRemove: [0, 0, 0, 0, 0, 0],
  TotalMissions: 0,
  class: "none",
};

const Missions = {
  0: ["White Light", 'You wake up in an unknown world where a white light dazzles you..<br> this place seems weird, you want to leave it as quick as possible.', 1, 1, 10, 200, 0, "Normal", 0, -1],
  1: ["Lost Path", 'You discovered a little path hidden in the shadows<br> and decided to explore it in the hope of finding informations to return in your world.', 4, 1, 10, 250, 0, "Common", 1, 0],
  2: ["Shadow Forest", 'You arrive at the end of the path and now enter a dark forest..<br>There seems to be light in the distance.', 7, 1, 10, 500, 0, "Common", 2, 1],
  3: ["Galarius City", 'You reach a city with a lot of different races.<br>You can see humans, elves and even dwarves.<br>Maybe you will find help here or just someone that can explain you how to get back to your world.', 9, 1, 10, 750, 0, "Uncommon", 3, 2],
  4: ["Endless mountain", 'One of the locals advises you to go north and reach the royal capital through the mountains..<br> So here you are in the so called endless mountain.', 12, 1, 10, 1000, 0, "Uncommon", 4, 3],
  5: ["Dark Cave", 'You arrive at the entrance of a dark cave,<br> it seems narrow but it is much faster and less dangerous than the mountain.', 15, 1, 10, 1500, 0, "Rare", 5, 4],
  6: ["Empire Road", 'You finally reached the end of this cave, tired but in one piece,<br> you can already see a big city at the end of the road..', 19, 1, 10, 2500, 0, "Rare", 6, 5],
  7: ["Imperium City", 'You\'re now in the Capital, the king heard about your story and asked for an immediate hearing.', 22, 1, 10, 3000, 0, "Rare", 7, 6],
  8: ["Central V", 'You discuss with the king to find a way to return to your world..<br>He tells you that the only way is the Red Portal but suddenly..<br> The city is attacked by the demon army, you need to get out of here quick.', 25, 1, 10, 5000, 0, "Epic", 8, 7],
  9: ["The Red Portal", 'The red portal is near and it seems that the portal is really hot.. Burning like the hells gate. But you do not really have any other choice.', 27, 1, 10, 7500, 0, "Epic", 9, 8],
  10: ["Corrupted World", 'You have successfully passed the portal.. but where are you now ?', 29, 1, 10, 10000, 0, "Epic", 10, 9],
  11: ["Corrupted Fortress", 'You see a huge fortress with nothing good inside, you must clean this place.', 30, 2, 10, 0, 0, "Exotic", 11, 10],
  12: ["Corrupted Fortress - Basement", 'There is a door in the fortress which leads to another level, clean this place too.', 30, 2, 25, 0, 2, "Exotic", 11, 11],
  13: ["Corrupted Fortress - Core", 'This is the last floor, the core of the Fortress, where the corruption started.. Destroy it.', 30, 2, 50, 1, 0, "Exotic", 11, 12],
  14: ["The Black Portal", 'Just after you destroyed the fortress core, another portal appeared..<br><br> A new story begins.', 30, 1, 10, 15000, 0, "Exotic", 12, 11],
  15: ["The Black Portal 2", 'The passage becomes darker and darker, you keep moving forward and perceive a light in the distance..', 30, 1, 10, 20000, 0, "Exotic", 12, 14],
  16: ["Light of Elysia", 'You\'ve just landed in a new world, in the city of Elysia. This world seems really beautiful, and so you decide to explore it.', 31, 1, 10, 25000, 0, "Exotic", 13, 15],
  17: ["Red Moon at Elysia", 'The city really is lively and in this world there are only humans and so far peace reigns, you decide to visit a bit the city this night, after all ..<br> This city is really big. Suddenly you hear a cry, you go to that shout and in the shadow of an alley you see a man sucking the blood of a woman.. a vampire is right there.', 31, 1, 10, 50000, 0, "Exotic", 13, 16],
  18: ["Vampire Manor", 'One of the vampires to confess the location of a vampire hideout, you will surely find informations there.', 32, 1, 10, 75000, 0, "Exotic", 14, 17],
  19: ["Funeral Chamber of the Manor", 'It seems to be the right place, it\'s full of vampires and one of them emits a strong power.', 32, 1, 10, 100000, 0, "Exotic", 14, 18],
  20: ["The New World", 'The city is now in peace, you follow the Red River to continue the exploration of this new world.', 33, 1, 10, 125000, 0, "Exotic", 15, 19],
  21: ["The Red River", 'During your daily hunt you find a merchant who keeps saying that the vampire attack in the city was only the beginning.<br> He also tells you that a rumor says that the castle is hidden in the mountains.<br> You will investigate on the spot to finally lead a quiet life', 33, 1, 10, 150000, 0, "Exotic", 15, 20],
  22: ["The mountains", "After searching for 5 days in the mountains, you find a bridge filled with corpses ..<br>Without any hesitation you enter the territory of vampires.", 34, 1, 10, 175000, 0, "Exotic", 16, 21],
  23: ["The Immortal Bridge", "These vampires seems a more difficult to kill than the ones in the city but you keep fighting and see a huge castle at the end of the bridge.", 34, 1, 10, 175000, 0, "Exotic", 16, 22],
  24: ["Vampire Castle", 'This is it, the Vampire Castle.<br>Now that you have arrived here you take the opportunity to clean the castle.', 35, 2, 10, 0, 0, "Exotic", 17, 23],
  25: ["Vampire Castle - Tower", 'You discover that one of the tower of the castle held prisoners, you must go and save them all.', 35, 2, 25, 1, 2, "Divine", 17, 24],
  26: ["Vampire Castle - Core", 'You have reached the heart of the castle, by destroying the heart, the world will finally be at peace.<br> But before this happy end, you will need to kill the remaining vampires.', 35, 2, 50, 2, 0, "Divine", 17, 25],
  //NAME, DESC, LEVEL, TYPE, REQ KILLS, EXP, REWARD TYPE, QUALITY, LOCATION, REQ MISSION
};

const Ennemies = {
  0: ["Kind Soul", "Evil Soul"],
  1: ["Fire Fairy", "Water Fairy", "Grass Fairy"],
  2: ["Wolf", " White Wolf", "African Wolf"],
  3: ["Gray Rat", "Brown Rat"],
  4: ["Stone Golem", "Water Golem"],
  5: ["Blue Slime", "Black Slime", "Yellow Slime"],
  6: ["Black Spider", "Red Spider"],
  7: ["Fire Mage", "Water Mage"],
  8: ["Zombie", "Burning Zombie"],
  9: ["Ghost", "Crying Ghost"],
  10: ["White Knight", "Red Knight"],
  11: ["Minor Rank Demon", "Middle Rank Demon", "Higher Rank Demon"],
  12: ["Skeleton", "Decrepit Skeleton", "Burnt Skeleton"],
  13: ["Jack-o'-lantern", "Jack-o'-lantern"],
  14: ["Vampire"],
  15: ["Fish-Man", "Fish-Man", "Fish-Man"],
  16: ["Vampire Lord", "Vampire"],
  17: ["Vampire Lord", "Noble Vampire"],
};

const BossNames = [
  'Pure Soul', 'Fairy Queen', 'Alpha Wolf', 'Huge Rat',
  'Poison Golem', 'Pink Slime', 'Albino Spider', 'Black Mage',
  'Ghoul', 'Poltergeist', 'Knight Commander', 'Demon Lord', 'Powerful Skeleton',
  "Jack-o'-lantern", 'Vampire Lord', 'Big Fish-Man', 'Noble Vampire', 'Vampire King',
];

const POS = {
  0: ["The White Light", 1, 4, 0, 0, { lootables: ["Truc", "Potion"], }], //NAME, MINLEVEL, MAXLEVEL, MAX DROP QUALITY, MISSION COMPLETE
  1: ["The Lost Path", 4, 7, 1, 1, { lootables: ["Truc", "Potion"], }],
  2: ["The Shadow Forest", 7, 9, 1, 2, { lootables: ["Truc", "Potion"], }],
  3: ["Galarius City", 9, 12, 2, 3, { lootables: ["Truc", "Potion"], }],
  4: ["The Endless Mountain", 12, 15, 2, 4, { lootables: ["Truc", "Potion"], }],
  5: ["The Dark Cave", 15, 19, 3, 5, { lootables: ["Truc", "Potion"], }],
  6: ["Empire Road", 19, 22, 3, 6, { lootables: ["Truc", "Potion"], }],
  7: ["Imperium City", 22, 25, 3, 7, { lootables: ["Truc", "Potion"], }],
  8: ["Central V", 25, 27, 4, 8, { lootables: ["Truc", "Potion"], }],
  9: ["The Red Portal", 27, 29, 4, 9, { lootables: ["Truc", "Potion"], }],
  10: ["The Corrupted World", 29, 30, 4, 10, { lootables: ["Truc", "Potion"], }],
  11: ["The Corrupted Fortress", 29, 30, 5, 10, { lootables: ["Truc", "Potion"], }],
  12: ["The Black Portal", 30, 31, 5, 14, { lootables: ["Truc", "Potion"], }],
  13: ["Elysia City", 31, 32, 5, 14, { lootables: ["Truc", "Potion"], }],
  14: ["Vampire Manor", 32, 33, 5, 20, { lootables: ["Truc", "Potion"], }],
  15: ["The Red River", 33, 34, 5, 20, { lootables: ["Truc", "Potion"], }],
  16: ["The Immortal Bridge", 34, 35, 5, 20, { lootables: ["Truc", "Potion"], }],
  17: ["Vampire Castle", 35, 35, 5, 20, { lootables: ["Truc", "Potion"], }],
};

function test() {
  return POS[Game.Location][5].lootables[Math.floor(Math.random() * POS[Game.Location][5].lootables.length)];
}

(function () {
  if (location.href.match(/(goldenlys.github.io).*/)) window.oncontextmenu = (e) => { e.preventDefault(); };
  ResetTheme(0);
  if (localStorage.getItem("Alpha") != null) load();
  if (localStorage.getItem("Alpha-Backup") != null) loadBackup();
  if (Game.username != "Default") {
    $("#GAME").show();
    $("#STARTING-DIV").hide();
    $(".footer").show();
    UpdateGame();
    GenMissions();
  }
  setInterval(UpdateEngine, 1000);
  ClickEvents();
  filter(0);
  $('.ui.accordion').accordion();
  $('.ui.checkbox').checkbox();
  if (Game.config[0] == 1) $("#AlertToggle").checkbox("check"); else $("#AlertToggle").checkbox("uncheck");
  if (Game.config[1] == 1) $("#AlertToggle2").checkbox("check"); else $("#AlertToggle2").checkbox("uncheck");
  if (Game.AutoRemove[0] == 1) $("#RM1").checkbox("check"); else $("#RM1").checkbox("uncheck");
  if (Game.AutoRemove[1] == 1) $("#RM2").checkbox("check"); else $("#RM2").checkbox("uncheck");
  if (Game.AutoRemove[2] == 1) $("#RM3").checkbox("check"); else $("#RM3").checkbox("uncheck");
  if (Game.AutoRemove[3] == 1) $("#RM4").checkbox("check"); else $("#RM4").checkbox("uncheck");
  if (Game.AutoRemove[4] == 1) $("#RM5").checkbox("check"); else $("#RM5").checkbox("uncheck");
  if (Game.AutoRemove[5] == 1) $("#RM6").checkbox("check"); else $("#RM6").checkbox("uncheck");
  if (Game.config[2] == 1) $("#SkipRewards").checkbox("check"); else $("#SkipRewards").checkbox("uncheck");
  if (Game.config[3] == 1) $("#AutoMissions").checkbox("check"); else $("#AutoMissions").checkbox("uncheck");
  if (Game.config[4] == 1) $("#OnlyMyVersion").checkbox("check"); else $("#OnlyMyVersion").checkbox("uncheck");
  $("#redNum").val("0");
  $("#greenNum").val("0");
  $("#blueNum").val("0");
  $("#VERSION_TEXT").html("AlphaRPG v" + APP.VERSION);
  ResetLeaderBoard();
  CLOSE_MENUS();
  UpdateUI();
})();

function GetWBcontent(reason) {
  if (reason == "retour") {
    $("#wb-title").html("AlphaRPG");
    $("#wb-texttitle").html("Welcome back to <span class='glow'>AlphaRPG</span>, " + Game.username);
    $("#wb-text").html("Would you like to login ?");
    $("#modal-5").modal("show");
  } else {
    $("#wb-title").html("AlphaRPG");
    $("#wb-texttitle").html("Hello " + Game.username + " !");
    $("#wb-text").html("It's your first time playing AlphaRPG, would you like to login ?");
    $("#modal-5").modal("show");
  }
}

function UpdateEngine() {
  if (Game.username != "Default" && APP.LoggedIn == 0 && APP.Email != "DoNotLogin" && location.href.match(/(goldenlys.github.io).*/)) GetWBcontent("retour");
  UpdateGame();
  Game.PlayTime++;
  if (Game.Level >= APP.MaxLevel && APP.LastMission >= APP.TotalMissions) APP.ScoreModeEnabled = 1; else APP.ScoreModeEnabled = 0;
  if (Ennemies[Game.Location][Game.Enemy[0]] == undefined) Game.Enemy[0] = 0;
  if (Game.Level == 1 && !Game.MissionStarted[0] && Game.MissionsCompleted[0] == 0 && Game.config[3] == 1) mission(0);
  if (Game.isInFight == 1) $("#EnemySprite").html("<img class='ui rounded middle aligned medium image' src='DATA/Monsters/" + Game.Location + "-" + Game.Enemy[0] + ".png'>");
  $("#color-display").css("background-color", "rgb(" + $(red).val() + ", " + $(green).val() + ", " + $(blue).val() + ")");
  if (APP.CoreLife > APP.CoreBaseLife) {
    APP.CoreLife = APP.CoreBaseLife;
    UpdateUI();
  }
  if (Game.isInFight != 2 && APP.CoreLife == null || Game.Enemy[5] == null || Game.Enemy[5] == 0) {
    Game.isInFight = 0;
    UpdateGame();
  }
  if (Game.MissionStarted[0] && Missions[Game.MissionStarted[1]][3] != 2 && Game.Level > POS[Missions[Game.MissionStarted[1]][8]][2]) {
    Game.Level = POS[Missions[Game.MissionStarted[1]][8]][2];
    UpdateGame();
  }
  if (APP.lastCloudSave < 180) APP.lastCloudSave++; else SendStats();
  if (Game.LastEscape > 0) { Game.LastEscape--; $("#NextRetreat").html("Next retreat in " + toHHMMSS(Game.LastEscape) + "."); }
  else { $("#NextRetreat").html(""); }
  if (Game.xp[0] < 0) Game.xp[0] = 0;
  for (UPC = 0; UPC < 4; UPC++) {
    if (Game.MaxUPC[UPC] == undefined) Game.MaxUPC[UPC] = 0;
  }
  if (Game.username == null || Game.username == "" || Game.username == " " || Game.username == "_" || Game.username.length < 3) {
    localStorage.clear();
    Backup = "Default";
    Game.username = Backup;
  }
  else { Game.username = Game.username.replace(/[^a-zA-Z0-9]/g, '_'); }
  if (Backup != "Default" && canSave == 1 && Backup != Game.username) Game.username = Backup;
  if (Game.xp[2] == undefined) Game.xp[2] = 1;
  let LEVEL = "";
  if (APP.ScoreModeEnabled == 0) {
    LEVEL = "Level " + fix(Game.Level, 4);
    SCORE = "Level " + fix(APP.Ranking / 10, 4);
  } else {
    LEVEL = "Score <i class='fad fa-dice-d20'></i> " + fix(APP.Ranking, 4);
    SCORE = "Score <i class='fad fa-dice-d20'></i>" + fix(APP.Ranking, 4);
  }
  if (Game.Level < 1) {
    Game.Level = 1;
    Game.xp[0] = 0;
  }
  if (APP.ScoreModeEnabled == 0 && Game.xp[0] >= Game.xp[1] && Game.Level < APP.MaxLevel) {
    Game.Level++;
    Game.xp[1] = CalcEXP(Game.Level);
  }
  if (Game.Level > APP.MaxLevel) {
    Game.Level = APP.MaxLevel;
    if (APP.ScoreModeEnabled == 0 && Game.Level > Missions[APP.LastMission][2]) {
      Game.Level = Missions[APP.LastMission][2];
      if (Game.Level > POS[Game.Location][2]) Game.Level = POS[Game.Location][2];
    }
  }
  if (Game.Emp > 50) Game.Emp = 50;
  Game.Shards = Math.round(Game.Shards);
  var ONLINEICON = "";
  if (Game.username != "Default" && location.href.match(/(goldenlys.github.io).*/) && Game.username != "Default" && Game.username != null && APP.LoggedIn == 1 && APP.Email != "none") ONLINEICON = "<i class='vert fas fa-circle'></i>";
  else ONLINEICON = "<i class='rouge far fa-circle'></i>";
  $("#Equipment-Title").html("Equipment " + SCORE);
  $("#PlayerID").html("<div class='vert text2'>" + ONLINEICON + "<span style='color:" + Game.Theme + ";'>" + Game.username + "<br><div class='ui horizontal label'>" + LEVEL + "</div></span></div>");
  $("#PlayerSprite").html("<img class='ui small circular image' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'>");
  $("#avatar2").html("<img class='' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'>");
  $("#avatar3").html("<img class='' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'>");
  if ($('#DIV-COMBAT').is(":visible") && Game.isInFight == 1) {
    $("#CLOSE_REWARDS").hide();
    $("#BUTTONS_COMBAT").show();
  }
  if ($('#DIV-REWARDS').is(":visible")) {
    Game.isInFight = 2;
    $("#CLOSE_REWARDS").show();
    $("#BUTTONS_COMBAT").hide();
  }
  if (Game.isInFight == 1 && APP.CoreLife <= 0) LoseFight(); else if (Game.isInFight == 1 && Game.Enemy[5] <= 0) WinFight();
  for (var I in Game.inventory) {
    if (I > Game.MaxInv) {
      Game.inventory.splice(I, 1);
    } else {
      if (APP.ScoreModeEnabled == 0) {
        if (Game.inventory[I].level > Game.Level) { Game.inventory.splice(I, 1); }
      }
    }
    for (var IV2 in Game.inventory) {
      if (Game.inventory[I].id == 1 || Game.inventory[I].id == 3) {
        if (Game.inventory[I].life == Game.inventory[IV2].life && Game.inventory[I].power == Game.inventory[IV2].power && IV2 != I && Game.inventory[I].name == Game.inventory[IV2].name && Game.inventory[I].id != 3) {
          Game.inventory.splice(I, 1);
        }
      }
    }
  }
}

function UpdateGame() {
  let counter = 0;
  for (var M in Missions) { if (Missions[M][3] != 2) counter++; }
  APP.TotalMissions = counter;
  if (Game.Simulation > 50) Game.Simulation = 50;
  let divisor = 0;
  APP.MaxLevel = 35;
  APP.MaxScore = (APP.MaxLevel + (Game.Simulation * 5) - 5);
  for (var D = 1; D < 7; D++) {
    if (Game.Defeated[D] == null) Game.Defeated[D] = 0;
  }
  Game.WTMult[0] = 0;
  Game.WTMult[1] = 0;
  for (var R = 1; R < 5; R++) {
    if (Game.RLS[R][1] == 1) { Game.WTMult[0] += Game.RLS[R][2]; }
    else { Game.WTMult[0] += 0; }
    if (Game.RLS[R][1] == 2) { Game.WTMult[1] += Game.RLS[R][2]; }
    else { Game.WTMult[1] += 0; }
    if (Game.RLS[R][1] == 3) { APP.MaxScore += (Game.RLS[R][2] / 10); }
  }
  if (Game.isInFight == 1 && Game.class == "none") {
    Game.username = "Default";
    Backup = "Default";
    ResetTheme(1);
    save();
  }
  Game.WTMult[2] = (Game.Simulation * 0.03) - 0.03; //EXPMULT
  Game.WTMult[3] = (Game.Simulation * 0.05) + 0.95; //DIFFICULTYMULT
  Backup = Game.username;
  Game.xp[2] = Game.Upgrades[0] * 0.01 + 1;
  APP.PowerMult = Game.Upgrades[1] * 0.01 + 1;
  APP.LifeMult = Game.Upgrades[2] * 0.01 + 1;
  Game.MaxInv = (Game.Simulation * 2) + 18 + (Game.Upgrades[3] * 1);
  if (Game.MissionStarted[4] == undefined) Game.MissionStarted[4] = 0;
  if (Game.isInFight == 0) { APP.CoreLife = APP.CoreBaseLife; GenEnemy(); }
  if (APP.ScoreModeEnabled == 0) {
    Game.xp[1] = CalcEXP(Game.Level);
    if (Game.xp[0] > Game.xp[1] && Game.Level == POS[Game.Location][2]) { Game.xp[0] = CalcEXP(Game.Level - 1); }
    if (Game.xp[0] < CalcEXP(Game.Level - 1) && Game.Level > 1) { Game.xp[0] = CalcEXP(Game.Level - 1); }
    for (let ARMOR in Game.Armors) { if (Game.Armors[ARMOR] > Game.Level) ErrorArmor(ARMOR); }
    if (Game.Weapons.Main[3] > Game.Level) ErrorArmor(5);
    if (Game.Weapons.Special[3] > Game.Level) ErrorArmor(6);
  } else {
    for (let ARMOR in Game.Armors) { if (Game.Armors[ARMOR] > APP.MaxScore) ErrorArmor(ARMOR); }
    if (Game.Weapons.Main[3] > APP.MaxScore) ErrorArmor(5);
    if (Game.Weapons.Special[3] > APP.MaxScore) ErrorArmor(6);
  }
  if (Game.Level >= 10) Game.Armors[2][0] = true; else Game.Armors[2][0] = false;
  if (Game.Level >= 20) Game.Armors[3][0] = true; else Game.Armors[3][0] = false;
  if (Game.Level >= 30) Game.Armors[4][0] = true; else Game.Armors[4][0] = false;
  APP.CoreBaseLife = 0;
  APP.Ranking = 0;
  APP.Ranking += Game.Weapons.Main[3];
  APP.Ranking += Game.Weapons.Special[3];
  divisor = 2;
  for (core = 1; core < 5; core++) {
    if (Game.Armors[core][0]) {
      APP.CoreBaseLife += Game.Armors[core][3];
      APP.Ranking += Game.Armors[core][4];
      divisor++;
      if (Game.Armors[core][5] == undefined) Game.Armors[core][5] = 0;
    }
  }
  if (APP.ScoreModeEnabled == 0 && !Game.MissionStarted[0] && Game.config[3] == 1 && Game.Level == POS[Game.Location][2] && Game.username != "Default" && Game.isInFight == 1) {
    for (M in Missions) {
      if (Game.MissionsCompleted[M] == 0 && Game.MissionsCompleted[Missions[M][9]] == 1 && Missions[M][3] != 2 && Game.Level >= Missions[M][2]) { mission(M); }
    }
  }
  APP.CoreBaseLife = Math.round(APP.CoreBaseLife * (APP.LifeMult + Game.WTMult[1]));
  APP.WeaponsPower = Math.round(Game.Weapons.Main[4] * (APP.PowerMult + Game.WTMult[0]));
  APP.SpecialPower = Math.round((Game.Weapons.Main[4] + Game.Weapons.Special[4]) * (APP.PowerMult + Game.WTMult[0]));
  APP.Ranking = Math.floor((APP.Ranking / divisor) * 10);
  for (var M2 in Missions) { if (Game.MissionsCompleted[M2] == null) Game.MissionsCompleted[M2] = 0; }
  if (Game.MissionStarted[0]) { Game.Location = Missions[Game.MissionStarted[1]][8]; }
  if (Game.isInFight == 1 && Game.MissionStarted[0]) { CompleteMission(); }
  for (var IV in Game.inventory) {
    if (Game.Level < 10 && Game.inventory[IV].class == 'Uncommon') { RemoveItem(IV); }
    if (Game.Level < 15 && Game.inventory[IV].class == 'Rare') { RemoveItem(IV); }
    if (Game.Level < 20 && Game.inventory[IV].class == 'Epic') { RemoveItem(IV); }
    if (Game.Level < 30 && Game.inventory[IV].class == 'Exotic' || Game.inventory[IV].class == 'Divine') { RemoveItem(IV); }
    if (Game.inventory[IV].id == 0) RemoveItem(IV);
    if (IV >= Game.MaxInv) RemoveItem(IV);
    if (Game.inventory[IV] != undefined) {
      if (Game.AutoRemove[0] == 1 && Game.inventory[IV].class == "Normal") RemoveItem(IV);
      else if (Game.AutoRemove[1] == 1 && Game.inventory[IV].class == "Common") RemoveItem(IV);
      else if (Game.AutoRemove[2] == 1 && Game.inventory[IV].class == "Uncommon") RemoveItem(IV);
      else if (Game.AutoRemove[3] == 1 && Game.inventory[IV].class == "Rare") RemoveItem(IV);
      else if (Game.AutoRemove[4] == 1 && Game.inventory[IV].class == "Epic") RemoveItem(IV);
      else if (Game.AutoRemove[5] == 1 && Game.inventory[IV].class == "Exotic") RemoveItem(IV);
    }
  }
  if (!Game.MissionStarted[0]) {
    if (Game.Location == 11 || Game.Location == 17) { Game.Location--; }
  }
  UpdateUI();
  save();
}

function UpdateUI() {
  document.title = "AlphaRPG";
  if (((Game.xp[2] + Game.WTMult[2]) - Math.floor(Game.xp[2] + Game.WTMult[2])) < 1) $("#XPMULTVAL").html("+" + Game.Upgrades[0] + "%"); else $("#XPMULTVAL").html("+" + Game.Upgrades[0] + "%");
  if (((APP.PowerMult + Game.WTMult[0]) - Math.floor(APP.PowerMult + Game.WTMult[0])) < 1) $("#APP.PowerMultVAL").html("+" + Game.Upgrades[1] + "%"); else $("#APP.PowerMultVAL").html("+" + Game.Upgrades[1] + "%");
  if (((APP.LifeMult + Game.WTMult[1]) - Math.floor(APP.LifeMult + Game.WTMult[1])) < 1) $("#APP.LifeMultVAL").html("+" + Game.Upgrades[2] + "%"); else $("#APP.LifeMultVAL").html("+" + Game.Upgrades[2] + "%");
  $("#INVUPGVAL").html(Game.MaxInv);
  $("#ShardsNumber").html("<i class='bleu dna icon'></i>" + fix(Game.Shards, 6) + "</span> Dimensional Fragments");
  if (Game.username == "Default") {
    $("#menu").hide();
    $("#GAME").hide();
    $("#STARTING-DIV").show();
    $(".footer").hide();
    Game.isInFight = 3;
  }
  $("#PlayerXP").progress({ percent: GetEXPPercent() });
  var WTText = Game.Simulation > 1 ? "Dimension <i class='globe icon'></i> " + Game.Simulation + "<br>" : "";
  $("#SHARDSRW").html(fix(Game.Shards, 6));
  if (APP.ScoreModeEnabled == 0) {
    $("#DimensionID").html(WTText);
    $("#PlayerXP").show();
    $("#capacity").html("<span class='vert bold'>" + fix(Game.xp[0], 6) + "</span>/" + fix(Game.xp[1], 6) + " EXP");
  } else $("#DimensionID").html(WTText);
  if (Game.Level >= APP.MaxLevel) {
    $("#PlayerXP").hide();
    $("#capacity").html("Max Level");
  }
  if (Game.Level >= APP.MaxLevel && APP.Ranking >= (((30 + (Game.Simulation * 5)) * 10) - 5) && APP.LastMission >= APP.TotalMissions) {
    $("#WTBTN").show();
    $("#WTUNLOCK").html("<span class='ShadowReset vert'>Dimensional Rift <i class='globe icon'></i>" + (Game.Simulation + 1) + " is opened.");
  } else {
    $("#WTBTN").hide();
    $("#WTUNLOCK").html("");
  }
  var XPMCOL = GetMultPrice(0) > Game.Shards ? "rouge" : "green";
  var POWMCOL = GetMultPrice(1) > Game.Shards ? "rouge" : "green";
  var LIFEMCOL = GetMultPrice(2) > Game.Shards ? "rouge" : "green";
  var INVCOL = GetMultPrice(3) > Game.Shards ? "rouge" : "green";
  $("#XPMULTPRICE").html("<span class='" + XPMCOL + "'><i class='dna icon'></i>" + GetMultPrice(0) + "</span>");
  $("#APP.PowerMultPRICE").html("<span class='" + POWMCOL + "'><i class='dna icon'></i>" + GetMultPrice(1) + "</span>");
  $("#APP.LifeMultPRICE").html("<span class='" + LIFEMCOL + "'><i class='dna icon'></i>" + GetMultPrice(2) + "</span>");
  $("#INVUPGPRICE").html("<span class='" + INVCOL + "'><i class='dna icon'></i>" + GetMultPrice(3) + "</span>");
  for (var i = 0; i < 4; i++) {
    if (GetMultPrice(i) == 999999999) {
      if (i == 0) { XPMCOL = "rouge"; $("#XPMULTPRICE").html("<span class='" + XPMCOL + "'>Maximum reached</span>"); }
      if (i == 1) { POWMCOL = "rouge"; $("#APP.PowerMultPRICE").html("<span class='" + POWMCOL + "'>Maximum reached</span>"); }
      if (i == 2) { LIFEMCOL = "rouge"; $("#APP.LifeMultPRICE").html("<span class='" + LIFEMCOL + "'>Maximum reached</span>"); }
      if (i == 3) { INVCOL = "rouge"; $("#INVUPGPRICE").html("<span class='" + INVCOL + "'>Maximum reached</span>"); }
    }
  }
  var shards = Game.Level < APP.MaxLevel ? "0" : Math.round(APP.Ranking / 10 / 5 - 6);
  var completedstory = APP.LastMission == APP.TotalMissions ? "<span class='vert'>Yes</span>" : "<span class='rouge'>Not Yet</span>";
  $("#WTShards").html("Score Required : <span class='vert'><i class='fad fa-dice-d20'></i>" + (((30 + (Game.Simulation * 5)) * 10) - 5) + "</span><br>Story completed : " + completedstory + "<br>Fragments reward : <span class='vert'>" + shards + "<i class='dna icon'></i></span>");
  $("#CurrWT").html("Current Dimension : <span class='vert'><i class='globe icon'></i>" + Game.Simulation + "</span>");
  for (var D in Game.Defeated) { if (D != 0) { $("#Defeat" + D).html(fix(Game.Defeated[D], 5)); } }
  $("#TOPNEXT").html((PAGE + 1) + " <i class='large arrow alternate circle right outline icon'></i>");
  $("#TOPPREVIOUS").html("<i class='large arrow alternate circle left outline icon'></i> " + (PAGE - 1));
  if (MAXVIEW + 1 <= LastId) $("#TOPNEXT").attr('class', 'ui rainbow5 button'); else $("#TOPNEXT").attr('class', 'ui rainbow5 button dis');
  if (PAGE == 1) $("#TOPPREVIOUS").attr('class', 'ui rainbow5 button dis'); else $("#TOPPREVIOUS").attr('class', 'ui rainbow5 button');
  $("#namestat").html("<img class='ui avatar image' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'><span style='color:" + Game.Theme + ";'>" + Game.username + "</span>");
  $("#playtimestat").html(toHHMMSS(Game.PlayTime));
  $("#Killstat").html(Game.Wins);
  $("#Deathstat").html(Game.Loses);
  $("#Levelstat").html("<span class='vert'>" + fix(Game.Level, 4) + "</span>/" + APP.MaxLevel);
  $("#Classstat").html(Game.class);
  $("#Scorestat").html("<span class='vert'><i class='fad fa-dice-d20'></i>" + fix(APP.Ranking, 4) + "</span>/" + (APP.MaxScore * 10));
  $("#Difficultystat").html(fix(Game.WTMult[3], 9));
  $("#Rankstat").html(APP.Leader + "/" + LastId);
  var DEATHS = Game.Loses == 0 ? 1 : Game.Loses;
  $("#Ratiostat").html(fix(Game.Wins / DEATHS, 7));
  $("#Versionstat").html("v" + APP.VERSION);
  $("#fortressstat").html(Game.FP);
  $("#lifestat").html("<i class='rouge fas fa-heart'></i>" + fix(Math.round(APP.CoreBaseLife / (APP.LifeMult + Game.WTMult[1])), 3) + " (+" + fix(APP.CoreBaseLife - Math.round(APP.CoreBaseLife / (APP.LifeMult + Game.WTMult[1])), 3) + ")");
  $("#powerstat").html("<i class='bleu fas fa-sword'></i>" + fix(Math.round(APP.WeaponsPower / (APP.PowerMult + Game.WTMult[0])), 3) + " (+" + fix(APP.WeaponsPower - Math.round(APP.WeaponsPower / (APP.PowerMult + Game.WTMult[0])), 3) + ")");
  $("#core1stat").html("<i class='rouge fas fa-heart revertmargin'></i>" + (Game.Armors[1][3] - Game.ArmorUpgrades[1]) + "(+" + Game.ArmorUpgrades[1] + ")");
  if (Game.Armors[2][0]) $("#core2stat").html("<i class='rouge fas fa-heart revertmargin'></i>" + (Game.Armors[2][3] - Game.ArmorUpgrades[2]) + "(+" + Game.ArmorUpgrades[2] + ")");
  if (Game.Armors[3][0]) $("#core3stat").html("<i class='rouge fas fa-heart revertmargin'></i>" + (Game.Armors[3][3] - Game.ArmorUpgrades[3]) + "(+" + Game.ArmorUpgrades[3] + ")");
  if (Game.Armors[4][0]) $("#core4stat").html("<i class='rouge fas fa-heart revertmargin'></i>" + (Game.Armors[4][3] - Game.ArmorUpgrades[4]) + "(+" + Game.ArmorUpgrades[4] + ")");
  if (((Game.Level - 5) * 10) >= APP.Ranking) $("#LowScore").html("Using low level armor, upgrade your equipment."); else $("#LowScore").html("");
  var CompletedMissions = 0;
  for (var M in Missions) if (Missions[M][3] != 2 && Game.MissionsCompleted[M] == 1) CompletedMissions++;
  if (Game.isInFight != 2 || Game.isInFight != 3) APP.LastMission = CompletedMissions;
  let hori = "horizontal";
  if (Game.MissionStarted[0]) {
    if (Missions[Game.MissionStarted[1]][3] == 1) $("#MDTL").html("<div class='detail'>Mission</div>Defeat <span class='vert'>" + (Missions[Game.MissionStarted[1]][4] - Game.MissionStarted[2]) + "</span> enemies in <span class='vert'>" + POS[Missions[Game.MissionStarted[1]][8]][0] + "</span>.");
    if (Missions[Game.MissionStarted[1]][3] == 2) $("#MDTL").html("<div class='detail'>Fortress</div>Clear <span class='vert'>" + POS[Missions[Game.MissionStarted[1]][8]][0] + "</span> (" + (Missions[Game.MissionStarted[1]][4] - Game.MissionStarted[2]) + " left).");
  } else {
    $("#MDTL").html("<div class='detail'>Exploration</div><span class='vert'>" + POS[Game.Location][0] + "</span>");
  }
  if ($('#DIV-COMBAT').is(":visible")) $("#DIV-REWARDS").hide();
  $("#CloudTimer").html("Last cloud save " + toHHMMSS(APP.lastCloudSave) + " ago, as <span class='vert'>" + Game.username + "</span>.");
  $("#islots").html("<i class='fas fa-sack'></i>" + (Game.inventory.length) + "/" + Game.MaxInv);
  $("#cash").html(fix(Game.Cash, 3));
  $("#mcount").html("<i class='dropdown icon'></i> " + "Missions completed (" + CompletedMissions + "/" + APP.TotalMissions + ")");
  if (Game.Level >= POS[Game.Location][2] && APP.ScoreModeEnabled == 0 && !Game.MissionStarted[0]) $("#MaxPOSLVL").html("You\'ve reached the maximum level in this area, check the available missions."); else $("#MaxPOSLVL").html("");
  for (var L in POS) $("#defeatloc" + L).html("<div class='ui " + hori + " segments'><div class='ui segment left aligned'>" + POS[L][0] + "</div><div class='ui segment right aligned'>" + fix(Game.DefeatedByLocation[L], 3) + " Defeated</div></div><div class='ui fitted inverted divider'></div>");
  if ($('#DIV-INVENTORY').is(":visible")) {
    $("#DIV-REWARDS").hide();
    $("#DIV-COMBAT").hide();
  }
  if (Game.isInFight == 1) {
    $("#CLOSE_REWARDS").hide();
    $("#BUTTONS_COMBAT").show();
    UpdateCombat();
  }
  GenArmors();
  GenWeapons();
  ResetTheme(2);
}

function GenInventory() {
  $("#INVENTORY-Gem").html("");
  $("#INVENTORY-Relic").html("");
  $("#INVENTORY-Weapon").html("");
  $("#INVENTORY-Armor").html("");
  for (let IV in Game.inventory) {
    let INVENTORY = {
      BOX_SHADOW: { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6, },
      ITEM_TYPES: ["", "Armor", "Gem", "Relic", "Weapon", "Gem"],
      LEVEL_TYPE: ["Level " + Game.inventory[IV].level, "Score <i class='fad fa-dice-d20'></i>" + Math.floor(Game.inventory[IV].level * 10)],
      RELICS_DESC: ["-", "Power bonus of " + fix(Game.inventory[IV].bonus, 9), "Life bonus of " + fix(Game.inventory[IV].bonus, 9), "Max Score +" + fix(Game.inventory[IV].bonus, 3), "Minimal drop quality <span class='" + Game.inventory[IV].bonus + "'>" + Game.inventory[IV].bonus + "</span>"],
    };
    let ITEM = { DESC: "", LEVEL: "" };
    if (Game.inventory[IV] != undefined) {
      var UPS = Game.inventory[IV].ups > 0 ? "<i class='orange fad fa-gem nomargin'></i> " + (Game.inventory[IV].ups) + "<br>" : "";
      if (Game.inventory[IV].id == 1) {
        ITEM.LEVEL = INVENTORY.LEVEL_TYPE[APP.ScoreModeEnabled];
        ITEM.DESC = UPS + "<i class='rouge fas fa-heart nomargin'></i> " + (Game.inventory[IV].life);
      }
      if (Game.inventory[IV].id == 2) ITEM.DESC = "<i class='rouge fas fa-heart nomargin'></i> " + Game.inventory[IV].life;
      if (Game.inventory[IV].id == 3) ITEM.DESC = INVENTORY.RELICS_DESC[Game.inventory[IV].object];
      if (Game.inventory[IV].id == 4) {
        ITEM.LEVEL = INVENTORY.LEVEL_TYPE[APP.ScoreModeEnabled];
        ITEM.DESC = UPS + "<i class='bleu fas fa-sword nomargin'></i> " + (Game.inventory[IV].power);
      }
      if (Game.inventory[IV].id == 5) ITEM.DESC = "<i class='bleu fas fa-sword nomargin'></i> " + Game.inventory[IV].power;
      var IS_LEVEL_SET = ITEM.LEVEL != "" ? "<div class='ui top right attached label'>" + ITEM.LEVEL + "</div>" : "";
      $("#INVENTORY-" + INVENTORY.ITEM_TYPES[Game.inventory[IV].id]).append("<div class='ui card customcard CoreShadow" + INVENTORY.BOX_SHADOW[Game.inventory[IV].class] + "'>\
      <div class='content'>\
      <div class='fullwidth-header text3'>" + INVENTORY.ITEM_TYPES[Game.inventory[IV].id] + "</div>" + IS_LEVEL_SET + "\
      <span class='" + (Game.inventory[IV].class) + "' id='" + IV + "'> " + (Game.inventory[IV].class) + "</span> " + Game.inventory[IV].name + "\
      <br>" + ITEM.DESC + "</div>\
      <div class='extra content'><div class='fluid ui buttons'>\
      <div onclick='EquipItem(" + IV + ", " + Game.inventory[IV].id + ")' class='green ui button'><i class='fal fa-check-square'></i></div>\
      <div onclick='RemoveItem(" + IV + ")' class='red ui button'><i class='fal fa-times-square'></i></div></div></div>\
      </div>");
    }
  }
}

function EquipItem(id, type) {
  if (type == 1) {
    let ARMOR_TYPES = ["", "Helmet", "Armor", "Shield", "Boots"];
    let ARMOR_BUTTON = [];
    for (let ARMOR = 1; ARMOR < 5; ARMOR++) { if (Game.Armors[ARMOR][0]) ARMOR_BUTTON[ARMOR] = "<div onClick='NewCore(" + ARMOR + ", " + id + ");' class='ui rainbow button'>Use as " + ARMOR_TYPES[ARMOR] + "</div>"; }
    NOTIFY("Select an Armor Slot", "<div class='fluid vertical ui buttons'>" + ARMOR_BUTTON[1] + ARMOR_BUTTON[2] + ARMOR_BUTTON[3] + ARMOR_BUTTON[4] + "</div>");
  }

  if (type == 4) {
    var WButton1 = "<div onClick='NewWeapon(0, " + id + ");' class='ui rainbow button'>Use as Main weapon</div>";
    var WButton2 = "<div onClick='NewWeapon(1, " + id + ");' class='ui rainbow button'>Use as Special weapon</div>";
    NOTIFY("Select a Weapon Slot", "<div class='fluid vertical ui buttons'>" + WButton1 + WButton2 + "</div>");
  }

  if (type == 2) {
    var CB1B = Game.Armors[1][0] == true ? "<div onClick='UPCore(1, " + Game.inventory[id].object + ", " + id + ");' class='ui rainbow button'>Upgrade Helmet</div>" : "";
    var CB2B = Game.Armors[2][0] == true ? "<div onClick='UPCore(2, " + Game.inventory[id].object + ", " + id + ");' class='ui rainbow button'>Upgrade Armor</div>" : "";
    var CB3B = Game.Armors[3][0] == true ? "<div onClick='UPCore(3, " + Game.inventory[id].object + ", " + id + ");' class='ui rainbow button'>Upgrade Shield</div>" : "";
    var CB4B = Game.Armors[4][0] == true ? "<div onClick='UPCore(4, " + Game.inventory[id].object + ", " + id + ");' class='ui rainbow button'>Upgrade Boots</div>" : "";
    if (Game.Armors[1][5] >= Game.MaxUPC[0] && Game.Armors[1][0] == true) CB1B = "<div class='ui disabled button'>No Helmet gem slots left.</div>";
    if (Game.Armors[2][5] >= Game.MaxUPC[1] && Game.Armors[2][0] == true) CB2B = "<div class='ui disabled button'>No Armor gem slots left.</div>";
    if (Game.Armors[3][5] >= Game.MaxUPC[2] && Game.Armors[3][0] == true) CB3B = "<div class='ui disabled button'>No Shield gem slots left.</div>";
    if (Game.Armors[4][5] >= Game.MaxUPC[3] && Game.Armors[4][0] == true) CB4B = "<div class='ui disabled button'>No Boots gem slots left.</div>";
    NOTIFY("Select an Armor Slot", "<div class='fluid vertical ui buttons'>" + CB1B + CB2B + CB3B + CB4B + "</div>");
  }

  if (type == 5) {
    var MainUPBTN = Game.Armors[1][0] == true ? "<div onClick='UPWeapon(1, " + id + ");' class='ui rainbow button'>Upgrade Main Weapon</div>" : "";
    var SpecialUPBTN = Game.Armors[2][0] == true ? "<div onClick='UPWeapon(2, " + id + ");' class='ui rainbow button'>Upgrade Special Weapon</div>" : "";
    if (Game.Weapons.Main[2] >= Game.MaxUPC[4]) MainUPBTN = "<div class='ui disabled button'>No Main Weapon gem slots left.</div>";
    if (Game.Weapons.Special[2] >= Game.MaxUPC[5]) SpecialUPBTN = "<div class='ui disabled button'>No Secondary Weapon gem slots left.</div>";
    NOTIFY("Select a Weapon", "<div class='fluid vertical ui buttons'>" + MainUPBTN + SpecialUPBTN + "</div>");
  }

  if (type == 3) {
    var RLCB1 = Game.Armors[1][0] == true ? "<div onClick='ConfirmRelic(1, " + id + ");' class='ui rainbow button'>Apply on Helmet</div>" : "";
    var RLCB2 = Game.Armors[2][0] == true ? "<div onClick='ConfirmRelic(2, " + id + ");' class='ui rainbow button'>Apply on Armor</div>" : "";
    var RLCB3 = Game.Armors[3][0] == true ? "<div onClick='ConfirmRelic(3, " + id + ");' class='ui rainbow button'>Apply on Shield</div>" : "";
    var RLCB4 = Game.Armors[4][0] == true ? "<div onClick='ConfirmRelic(4, " + id + ");' class='ui rainbow button'>Apply on Boots</div>" : "";
    NOTIFY("Select a relic slot", "<div class='fluid vertical ui buttons'>" + RLCB1 + RLCB2 + RLCB3 + RLCB4 + "</div>");
  }
  Game.isInFight = 0;
  UpdateGame();
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
    $("#" + TYPE + "Weapon").attr("class", "ui card customcard CoreShadow" + Class);
    var LEVELTEXT = APP.ScoreModeEnabled == 0 ? "Level " + fix(Math.floor(Game.Weapons[TYPE][3]), 4) : "Score <i class='fad fa-dice-d20'></i>" + fix(Math.floor(Game.Weapons[TYPE][3] * 10), 4);
    var UPWSELECTOR = T == 1 ? 4 : 5;
    var WEAPONUPC = Game.Weapons[TYPE][2] == Game.MaxUPC[UPWSELECTOR] ? "" : "green";
    var UPWTEXT = Game.MaxUPC[UPWSELECTOR] > 0 ? "<i class='orange fad fa-gem'></i><span class='" + WEAPONUPC + "'>" + Game.Weapons[TYPE][2] + "</span>/" + Game.MaxUPC[UPWSELECTOR] + " Gems incrusted" : "";
    $("#" + TYPE + "WeaponGems").html(UPWTEXT);

    if (Class == "E") { $("#" + TYPE + "WeaponSprite").html("<div class='error-img'></div>"); }
    else {
      $("#" + TYPE + "WeaponSprite").html("<img class='ui middle aligned tiny circular image' src='DATA/Weapons/" + TYPE + "-" + Class + ".png'></img>");
    }
    $("#" + TYPE + "WeaponLevel").html(LEVELTEXT);
    $("#" + TYPE + "WeaponText").html(Game.Weapons[TYPE][4]);
    $("#" + TYPE + "WeaponTitle").html("<span class='" + Game.Weapons[TYPE][1] + "'>" + Game.Weapons[TYPE][1] + "</span> " + Game.Weapons[TYPE][0]);
    $("#" + TYPE + "nWeaponText").html(Game.Weapons[TYPE][4]);
  }
}

function GenArmors() {
  let Names = ["", "Helmet", "Armor", "Shield", "Boots"];
  for (var UPC = 1; UPC < 5; UPC++) {
    let Class = 0;
    let RLSTXT = "";
    let core = "core" + UPC;
    Game.Armors[UPC][1] = Game.Armors[UPC][1].replace(/Armor/gi, Names[UPC]);
    if (Game.Armors[UPC][2] == "Common") Class = "1";
    if (Game.Armors[UPC][2] == "Uncommon") Class = "2";
    if (Game.Armors[UPC][2] == "Rare") Class = "3";
    if (Game.Armors[UPC][2] == "Epic") Class = "4";
    if (Game.Armors[UPC][2] == "Exotic") Class = "5";
    if (Game.Armors[UPC][2] == "Divine") Class = "6";
    if (Game.Armors[UPC][2] == "Error") Class = "E";

    $("#" + core).attr("class", "ui card customcard CoreShadow" + Class);
    $("#" + core + "-icon").attr("class", "classBar" + Class);
    $("#" + core + "-title").attr("class", "author text EQUIPMENT-TITLE");

    if (Game.RLS[UPC][1] == 1) RLSTXT = "Power bonus of " + fix(Game.RLS[UPC][2], 9);
    if (Game.RLS[UPC][1] == 2) RLSTXT = "Life bonus of " + fix(Game.RLS[UPC][2], 9);
    if (Game.RLS[UPC][1] == 3) RLSTXT = "Max Score +" + fix(Game.RLS[UPC][2], 3);
    if (Game.RLS[UPC][1] == 4) RLSTXT = "Minimal drop quality <span class='" + Game.RLS[UPC][2] + "'>" + Game.RLS[UPC][2] + "</span>";
    if (Game.RLS[UPC][1] != 0) RLSTXT = "<i class='jaune fas fa-stars'></i>" + RLSTXT;
    var LEVELICON = APP.ScoreModeEnabled == 0 ? "Level" : "Score";
    var LEVELTEXT = APP.ScoreModeEnabled == 0 ? fix(Math.floor(Game.Armors[UPC][4]), 4) : "<i class='fad fa-dice-d20'></i>" + fix(Math.floor(Game.Armors[UPC][4] * 10), 4);
    $("#core" + UPC + "-level").html(LEVELICON + " " + LEVELTEXT);
    var COREUPC = Game.Armors[UPC][5] == Game.MaxUPC[UPC - 1] ? "" : "green";
    var UPCTEXT = Game.MaxUPC[UPC - 1] > 0 ? "<i class='orange fad fa-gem'></i><span class='" + COREUPC + "'>" + Game.Armors[UPC][5] + "</span>/" + Game.MaxUPC[UPC - 1] + " Gems incrusted" : "";
    $("#" + core + "-upc").html("");
    $("#" + core + "-life").html(fix(Game.Armors[UPC][3], 3));
    $("#" + core + "-rarity").html(RLSTXT);
    $("#" + core + "-keys").html(UPCTEXT);

    if (Class == "E") { $("#" + core + "-image").html("<div class='error-img'></div>"); }
    else {
      $("#" + core + "-image").html("<img class='ui middle aligned tiny circular image' style='margin-top: 1em; height: 100px; width: auto;' src='DATA/Armors/" + core + "-" + Class + ".png'></div>");

    }
    $("#" + core + "-title").html("<span class='" + Game.Armors[UPC][2] + "'>" + Game.Armors[UPC][2] + "</span> " + Game.Armors[UPC][1]);
    if (!Game.Armors[UPC][0]) {
      $("#" + core).hide();
      $("#" + core).attr("class", "");
    } else {
      $("#" + core).show();
      $("#" + core).attr("class", "ui card customcard CoreShadow" + Class);
    }
  }
  if (Game.Level < 30) {
    for (var L = 1; L < 5; L++) {
      if (!Game.Armors[L][0]) {
        $("#core5").attr("class", "author text locked");
        $("#core5").html("Next armor unlocked at Lv. " + GetLevelRequired());
      }
    }
  } else $("#core5").html("");
}

//FIGHT ACTIONS
function Protect() {
  if (Game.isInFight != 1) Game.isInFight = 1;
  HealText = "";
  if (APP.CoreLife < APP.CoreBaseLife) {
    var luck = random(1, 100);
    if (luck <= 15) { MINMULT = 65; MAXMULT = 85; }
    else { MINMULT = 40; MAXMULT = 65; }
    if (luck >= 85) { MINMULT = 0; MAXMULT = 0; }
    var rRandPlayerHeal = random((APP.WeaponsPower * MINMULT), (APP.WeaponsPower * MAXMULT)) / 100;
    APP.CoreLife = Math.round(APP.CoreLife + rRandPlayerHeal);
    HealText = "+" + fix(rRandPlayerHeal, 4) + "<i class='rouge fas fa-heart'></i>";
    if (rRandPlayerHeal < 1) HealText = "MISSED";
  }
  var luck2 = random(1, 100);
  if (luck2 >= 75) { MINMULT2 = 0; MAXMULT2 = 10; }
  else { MINMULT2 = 35; MAXMULT2 = 50; }
  var rEnemyPower = random((Game.Enemy[3] * MINMULT2), (Game.Enemy[3] * MAXMULT2)) / 100;
  if (rEnemyPower < 1) DamagesText = "MISSED";
  if (APP.CoreLife >= APP.CoreBaseLife * 0.99) rEnemyPower = 0;
  APP.CoreLife -= rEnemyPower;
  if (APP.CoreLife > APP.CoreBaseLife) APP.CoreLife = APP.CoreBaseLife;
  $("#EnemyDamage").html("");
  $("#PlayerDamage").html(HealText);
  if (Game.isInFight == 1 && APP.CoreLife <= 0) LoseFight(); else if (Game.isInFight == 1 && Game.Enemy[5] <= 0) WinFight();
  UpdateGame();
}

function Attack() {
  if (Game.isInFight != 1) Game.isInFight = 1;
  var luck = random(1, 100);
  var rPlayerPower = random((APP.WeaponsPower * 85), APP.WeaponsPower * 100) / 100;
  if (luck <= random(6, 10)) rPlayerPower = APP.WeaponsPower * 1.15;
  var EDamage = "-" + fix(Math.round(rPlayerPower), 3) + "<i class='rouge fas fa-heart'></i>";
  Game.Enemy[5] = Math.floor(Game.Enemy[5] - rPlayerPower);
  var rEnemyPower = random((Game.Enemy[3] * 65), Game.Enemy[3] * 100) / 100;
  if (luck >= 90) rEnemyPower = 0;
  var DAMAGES = rEnemyPower > 0 ? "-" + fix(Math.round(rEnemyPower), 3) + "<i class='rouge fas fa-heart'></i>" : "MISSED";
  APP.CoreLife -= rEnemyPower;
  $("#EnemyDamage").html(EDamage);
  $("#PlayerDamage").html(DAMAGES);
  if (Game.isInFight == 1 && APP.CoreLife <= 0) LoseFight(); else if (Game.isInFight == 1 && Game.Enemy[5] <= 0) WinFight();
  UpdateGame();
}

function LaunchEMP() {
  if (Game.isInFight != 1) Game.isInFight = 1;
  if (Game.Emp > 0) {
    Game.Emp--;
    var luck = random(0, 100);
    var POWERRANGES = [0.75, 1];
    if (luck <= 10) POWERRANGES = [1, 1.5];
    var rPlayerPower = random(APP.SpecialPower * POWERRANGES[0], APP.SpecialPower * POWERRANGES[1]);
    Game.Enemy[5] = Math.floor(Game.Enemy[5] - rPlayerPower);
    var rEnemyPower = random(0, Game.Enemy[3]);
    APP.CoreLife -= rEnemyPower;
    $("#EnemyDamage").html("-" + fix(Math.round(rPlayerPower), 6) + "<i class='rouge fas fa-heart'></i>");
    $("#PlayerDamage").html("-" + fix(Math.round(rEnemyPower), 6) + "<i class='rouge fas fa-heart'></i>");
  }
  if (Game.isInFight == 1 && APP.CoreLife <= 0) LoseFight(); else if (Game.isInFight == 1 && Game.Enemy[5] <= 0) WinFight();
  UpdateGame();
}

function RunAway() {
  if (Game.LastEscape == 0) {
    Game.LastEscape = 45;
    if (Game.Level <= 25) Game.LastEscape = 35;
    if (Game.Level <= 20) Game.LastEscape = 30;
    if (Game.Level <= 15) Game.LastEscape = 25;
    if (Game.Level <= 10) Game.LastEscape = 20;
    if (Game.Level <= 5) Game.LastEscape = 15;
    APP.CoreLife = APP.CoreBaseLife;
    Game.isInFight = 0;
    if (Game.isInFight == 1 && APP.CoreLife <= 0) LoseFight(); else if (Game.isInFight == 1 && Game.Enemy[5] <= 0) WinFight();
    UpdateGame();
  }
}

//Enemy GENERATION FUNCTION
function GenEnemy() {
  let EnemyLevel = 1;
  let EnemyLifeMult = 1;
  let EnemyPowerMult = 1;
  var BasePower = APP.WeaponsPower / (APP.PowerMult + Game.WTMult[0]);

  let ENEMY_LIFE_MULT = [1.5, 2, 2.5, 3.5, 5, 6, 6.5];
  let ENEMY_POWER_MULT = [0.95, 1, 1, 1, 1, 1, 1];
  var ENEMY_POWER_MAXMULT = [1.1, 1.25, 1.35, 1.5, 1.75, 2, 2.5];
  if (APP.ScoreModeEnabled == 0) {
    if (Game.Level < 30) {
      ENEMY_LIFE_MULT = [1.5, 2, 2.5, 3.5, 5, 6, 6.5];
      ENEMY_POWER_MULT = [0.75, 0.85, 1, 1, 1, 1, 1];
      ENEMY_POWER_MAXMULT = [0.85, 1, 1, 1.10, 1.15, 1.15, 1.15];
    }
    if (Missions[Game.MissionStarted[1]][3] == 2) {
      ENEMY_LIFE_MULT = [0, 0, 6, 7, 8, 15, random(15, 20)];
      ENEMY_POWER_MULT = [1, 1, 1, 1, 1, 1, 1];
      ENEMY_POWER_MAXMULT = [1, 1, 1.1, 1.15, 1.2, 1.25, 1.5];
    }
  } else {
    ENEMY_LIFE_MULT = [2, 2.75, 3.5, 4, 6, 10, 15];
    ENEMY_POWER_MULT = [1, 1, 1, 1, 1, 1, 1];
    ENEMY_POWER_MAXMULT = [1, 1, 1.10, 1.15, 1.20, 1.25, 1.5];
  }

  TIER = APP.Ranking;
  EChance = random(0, 700);
  if (APP.ScoreModeEnabled == 1) EChance = random(300, 700);
  if (Missions[Game.MissionStarted[1]][3] == 2 && EChance < 600) EChance = 600;
  if (Game.isInFight == 0) {
    APP.CoreLife = APP.CoreBaseLife;
    $("#EnemyDesc").html("<br><br>");

    //CLASS NORMAL
    if (EChance >= 0 && EChance < 300) {
      Game.Enemy[1] = 1;
      EnemyLifeMult = ENEMY_LIFE_MULT[0];
      EnemyPowerMult = ENEMY_POWER_MULT[0];
      EnemyPowerMultMax = ENEMY_POWER_MAXMULT[0];
      if (APP.Ranking > 0) EnemyLevel = random((APP.Ranking * 0.85), APP.Ranking);
      if (APP.ScoreModeEnabled == 1) EnemyLevel = random(TIER - 5, TIER);
    }

    //CLASS ADVANCED
    if (EChance >= 300 && EChance < 450) {
      Game.Enemy[1] = 2;
      EnemyLifeMult = ENEMY_LIFE_MULT[1];
      EnemyPowerMult = ENEMY_POWER_MULT[1];
      EnemyPowerMultMax = ENEMY_POWER_MAXMULT[1];
      if (APP.Ranking > 0) EnemyLevel = APP.Ranking;
      if (APP.Ranking > 1) EnemyLevel = random((APP.Ranking * 0.95), APP.Ranking);
      if (APP.ScoreModeEnabled == 1) EnemyLevel = random(TIER - 2, TIER + 5);
    }

    //CLASS SUPERIOR
    if (EChance >= 450 && EChance < 600) {
      Game.Enemy[1] = 3;
      EnemyLifeMult = ENEMY_LIFE_MULT[2];
      EnemyPowerMult = ENEMY_POWER_MULT[2];
      EnemyPowerMultMax = ENEMY_POWER_MAXMULT[2];
      if (APP.Ranking > 0) EnemyLevel = APP.Ranking;
      if (APP.Ranking > 1) EnemyLevel = random(APP.Ranking, APP.Ranking + 1);
      if (APP.ScoreModeEnabled == 1) EnemyLevel = random(TIER - 1, TIER + 10);
    }

    //CLASS VETERAN
    if (EChance >= 600 && EChance < 650) {
      Game.Enemy[1] = 4;
      EnemyLifeMult = ENEMY_LIFE_MULT[3];
      EnemyPowerMult = ENEMY_POWER_MULT[3];
      EnemyPowerMultMax = ENEMY_POWER_MAXMULT[3];
      if (APP.Ranking > 0) EnemyLevel = APP.Ranking;
      if (APP.Ranking > 1) EnemyLevel = random(APP.Ranking + 1, APP.Ranking + 2);
      if (APP.ScoreModeEnabled == 1) EnemyLevel = random(TIER + 5, TIER + 15);
      if (Game.Level < 10) EnemyPowerMult = ENEMY_POWER_MULT[2];
    }

    //CLASS ELITE
    if (EChance >= 650) {
      Game.Enemy[1] = 5;
      EnemyLifeMult = ENEMY_LIFE_MULT[4];
      EnemyPowerMult = ENEMY_POWER_MULT[4];
      EnemyPowerMultMax = ENEMY_POWER_MAXMULT[4];
      if (APP.Ranking > 0) EnemyLevel = APP.Ranking;
      if (APP.Ranking > 1) EnemyLevel = random(APP.Ranking + 2, APP.Ranking + 4);
      if (APP.ScoreModeEnabled == 1) EnemyLevel = random(TIER + 15, TIER + 30);
      if (Game.Level < 10) EnemyPowerMult = ENEMY_POWER_MULT[2];
    }

    if (Game.MissionStarted[2] == Missions[Game.MissionStarted[1]][4] - 1) EChance = 700;

    //CLASS BOSS OR 1:4 GOD
    if (EChance >= 685 && EChance <= 700 && Game.MissionStarted[0]) {
      if (Missions[Game.MissionStarted[1]][3] == 2 || Game.MissionStarted[2] > Missions[Game.MissionStarted[1]][4] - 2) {
        Game.Enemy[1] = 6;
        EnemyLifeMult = ENEMY_LIFE_MULT[5];
        EnemyPowerMult = ENEMY_POWER_MULT[5];
        EnemyPowerMultMax = ENEMY_POWER_MAXMULT[5];
        if (APP.Ranking > 0) EnemyLevel = APP.Ranking + 1;
        if (APP.Ranking > 1) EnemyLevel = random(APP.Ranking + 4, APP.Ranking + 6);
        if (Game.Level < 10) EnemyPowerMult = ENEMY_POWER_MULT[2];
        if (APP.ScoreModeEnabled == 1) {
          EnemyLevel = random(TIER + 20, TIER + 40);
          randomluck = random(1, 5);
          if (randomluck >= 4) {
            Game.Enemy[1] = 7;
            EnemyLifeMult = ENEMY_LIFE_MULT[6];
            EnemyPowerMult = ENEMY_POWER_MULT[6];
            EnemyPowerMultMax = ENEMY_POWER_MAXMULT[6];
          }
        }
      }
    }
    if (EnemyLevel < 1) EnemyLevel = 1;
    if (APP.ScoreModeEnabled == 1) {
      EnemyLevel = EnemyLevel / 10;
      if (EnemyLevel > Game.Level + 20) EnemyLevel = Game.Level + 20;
    } else {
      EnemyLevel = EnemyLevel / 10;
      if (EnemyLevel < POS[Game.Location][1]) EnemyLevel = POS[Game.Location][1];
      if (EnemyLevel > POS[Game.Location][2]) EnemyLevel = POS[Game.Location][2];
    }
    Game.Enemy[2] = EnemyLevel;
    Game.isInFight = 1;
    Game.Enemy[3] = 0;
    Game.Enemy[4] = 0;
    if (Game.Armors[1][0] == 1) Game.Enemy[4] += Math.floor(random((EnemyLevel * 10) * (EnemyLifeMult * 0.5) + 100, (EnemyLevel * 10) * (EnemyLifeMult * 1) + 100));
    if (Game.Armors[2][0] == 1 && EnemyLevel > 9) Game.Enemy[4] += Math.floor(random((EnemyLevel * 10) * (EnemyLifeMult * 0.5) + 100, (EnemyLevel * 10) * (EnemyLifeMult * 1) + 100));
    if (Game.Armors[3][0] == 1 && EnemyLevel > 19) Game.Enemy[4] += Math.floor(random((EnemyLevel * 10) * (EnemyLifeMult * 0.5) + 100, (EnemyLevel * 10) * (EnemyLifeMult * 1) + 100));
    if (Game.Armors[4][0] == 1 && EnemyLevel > 29) Game.Enemy[4] += Math.floor(random((EnemyLevel * 10) * (EnemyLifeMult * 0.5) + 100, (EnemyLevel * 10) * (EnemyLifeMult * 1) + 100));
    Game.Enemy[3] = random(BasePower * EnemyPowerMult, BasePower * EnemyPowerMultMax);
    Game.Enemy[4] *= Game.WTMult[3];
    Game.Enemy[5] = Game.Enemy[4];
    if (Game.Enemy[1] >= 6) Game.Enemy[0] = "boss"; else Game.Enemy[0] = Math.floor(Math.random() * Ennemies[Game.Location].length);
    if (Ennemies[Game.Location][Game.Enemy[0]] == undefined) Game.Enemy[0] = 0;
    $("#EnemyDamage").html("");
    $("#PlayerDamage").html("");
    UpdateGame();
  }
}

//WIN OR LOSE FIGHT
function WinFight() {
  if (Game.MissionStarted[4] == 0 && Game.isInFight == 1) {
    let LOOT_RATES = [50, 15, 45];
    if (Game.MissionStarted[0]) LOOT_RATES = Missions[Game.MissionStarted[1]][3] == 1 ? [5, 7.5, 10] : [40, 20, 30];
    let MIN_LOOT_QUALITY = ["", "Normal", "Common", "Uncommon", "Rare", "Epic", "Exotic", "Divine"];
    var REWARDTEXT = "";
    let COUNTED_LOOTS = 0;
    $("#rewards-loot").html("");

    var EMP = "";
    var LEVELUP = "";

    if (!Game.MissionStarted[0]) {
      expGain = (Game.Enemy[1] * Game.Enemy[2]) * 10 + (Game.Level * 2.5) * Game.xp[2];
      expGain = _.random(expGain * 0.85, expGain);
    } else {
      expGain = Game.Enemy[2] + Game.Level * 15 * Game.xp[2];
      if (Missions[Game.MissionStarted[1]][3] == 2) expGain = _.random(expGain * 0.9, expGain * 1.2);
      else expGain = _.random(expGain * 0.9, expGain);
    }
    if (Game.MissionStarted[0] && Game.Level >= POS[Missions[Game.MissionStarted[1]][8]][2]) expGain = 0;
    Game.Wins++;
    Game.Defeated[Game.Enemy[1]]++;
    Game.DefeatedByLocation[Game.Location]++;
    if (Game.MissionStarted[0]) Game.MissionStarted[2]++;
    if (Game.Level >= POS[Game.Location][2]) expGain = 0;
    Game.xp[0] += Math.round(expGain);
    if (Game.Level < APP.MaxLevel) {
      Game.xp[0] += Math.round(expGain);
      if (Game.xp[0] >= Game.xp[1]) {
        Game.Level++;
        LEVELUP = "<br><font class='bleu'>LEVEL UP ! (<span class='blanc'>" + Game.Level + "</span>)</font><br>";
      }
      UpdateGame();
    }
    //EMP LOOT CHANCE
    var ELOOTCHANCE = random(1, 100);
    EMPCount = random(1, 3);
    if (ELOOTCHANCE <= 25 && Game.Emp < 50) { Game.Emp += EMPCount; EMP = "<br>+<span class='orange'>" + EMPCount + "</span><i class='orange bolt icon'></i>Special Attack"; }

    if (Game.Enemy[1] >= 6 && !Game.MissionStarted[0]) LOOT_RATES[0] = 1;

    //CORE LOOT CHANCE
    var LOOTCHANCE1 = random(1, 100);
    if (LOOTCHANCE1 > 0 && LOOTCHANCE1 <= LOOT_RATES[0] && Game.isInFight != 2) {
      COUNTED_LOOTS++;
      if (APP.ScoreModeEnabled == 0) {
        if (Game.Level >= APP.Ranking) {
          let LOOT_LEVEL = [random(Game.Level - 5, Game.Level + 1), random(Game.Level - 4, Game.Level + 2), random(Game.Level - 3, Game.Level + 2), random(Game.Level - 2, Game.Level + 3), random(Game.Level - 1, Game.Level + 4), Game.Level, Game.Level];
          newItem(0, LOOT_LEVEL[Game.Enemy[1]], MIN_LOOT_QUALITY[Game.Enemy[1]]);
        }
        else newItem(0, random(APP.Ranking, APP.Ranking + 2), "Normal");
      } else {
        if (Missions[Game.MissionStarted[1]][3] == 2) {
          if (Game.Enemy[1] >= 1) {
            if (Game.Enemy[1] == 7) newItem(0, random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Divine");
            else newItem(0, random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Exotic");
          }
        } else {
          if (Game.Enemy[1] == 1 || Game.Enemy[1] == 2 || Game.Enemy[1] == 3 || Game.Enemy[1] == 4) newItem(0, random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Rare");
          if (Game.Enemy[1] == 5) newItem(0, random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Epic");
          if (Game.Enemy[1] == 6) newItem(0, random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Exotic");
          if (Game.Enemy[1] == 7) newItem(0, random((APP.Ranking - 10) + Game.Enemy[1], (APP.Ranking + 5) + Game.Enemy[1]), "Divine");
        }
      }
      let ITEMID = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;
      let TIER = APP.ScoreModeEnabled == 0 ? "Level" : "Score";
      let TIERRANK = APP.ScoreModeEnabled == 0 ? Game.inventory[ITEMID].level : "<i class='fad fa-dice-d20'></i>" + Math.floor(Game.inventory[ITEMID].level * 10);

      var UPS = Game.inventory[ITEMID].ups > 0 ? "" + Game.inventory[ITEMID].ups + "<i class='orange fad fa-gem revertmargin'></i>" : "";
      var LOOTCONTENT = Game.inventory[ITEMID].id == 4 ? "<i class='bleu fas fa-sword revertmargin'></i>" + fix(Game.inventory[ITEMID].power, 5) : "<i class='rouge fas fa-heart revertmargin'></i>" + fix(Game.inventory[ITEMID].life, 5);
      if (ITEMID < Game.MaxInv) $("#rewards-loot").append("<div class='ui comments'><div class='comment " + Game.inventory[ITEMID].class + "-Core'><div class='Bar-" + Game.inventory[ITEMID].class + "'></div><div class='statistic GS'><div class='value'>" + TIER + "</div><div class='label'> " + TIERRANK + "</div></div>" + Game.inventory[ITEMID].name + "<span class='" + Game.inventory[ITEMID].class + "'> " + UPS + "</span><br><span class='" + Game.inventory[ITEMID].class + "'> " + Game.inventory[ITEMID].class + " </span><br>" + LOOTCONTENT + "</div></div>");
    }

    //RELIC LOOT CHANCE
    var LOOTCHANCE2 = _.random(0, 100);
    if (LOOTCHANCE2 > 0 && LOOTCHANCE2 <= LOOT_RATES[1] && Game.isInFight != 2) {
      COUNTED_LOOTS++;
      if (APP.ScoreModeEnabled == 0) {
        if (Game.Level > APP.Ranking) newItem("Relic", null, MIN_LOOT_QUALITY[Game.Enemy[1]]);
        else newItem("Relic", null, "Normal");
      } else {
        if (Missions[Game.MissionStarted[1]][3] == 2) {
          if (Game.Enemy[1] == 7) newItem("Relic", null, "Divine");
          else newItem("Relic", null, "Exotic");
        } else {
          if (Game.Enemy[1] <= 4) newItem("Relic", null, "Rare");
          else newItem("Relic", null, MIN_LOOT_QUALITY[Game.Enemy[1]]);
        }
      }
      let ITEMID = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;
      let DESCRIPTIONS = ["-", "Power bonus of " + fix(Game.inventory[ITEMID].bonus, 9), "Life bonus of " + fix(Game.inventory[ITEMID].bonus, 9), "Max Score +" + fix(Game.inventory[ITEMID].bonus, 3), "Minimal drop quality <span class='" + Game.inventory[ITEMID].bonus + "'>" + Game.inventory[ITEMID].bonus + "</span>"];
      if (ITEMID < Game.MaxInv) $("#rewards-loot").append("<div class='ui comments'><div class='comment " + Game.inventory[ITEMID].class + "-Core'><div class='Bar-" + Game.inventory[ITEMID].class + "'></div>" + Game.inventory[ITEMID].name + "<br><span class='" + Game.inventory[ITEMID].class + "'>" + Game.inventory[ITEMID].class + "</span><br>" + DESCRIPTIONS[Game.inventory[ITEMID].object] + "</div></div>");
    }
    //KEY LOOT CHANCE
    var LOOTCHANCE3 = random(0, 100);
    if (LOOTCHANCE3 > 0 && LOOTCHANCE3 <= LOOT_RATES[2] && Game.Level >= 10 && Game.isInFight != 2) {
      COUNTED_LOOTS++;
      if (APP.ScoreModeEnabled == 0) {
        newItem("Gem", null, MIN_LOOT_QUALITY[Game.Enemy[1]]);
      } else {
        if (Missions[Game.MissionStarted[1]][3] == 2) {
          if (Game.Enemy[1] >= 1) {
            if (Game.Enemy[1] == 7) newItem("Gem", null, "Divine");
            else newItem("Gem", null, "Exotic");
          }
        } else {
          if (Game.Enemy[1] <= 3) newItem("Gem", null, "Uncommon");
          else newItem("Gem", null, MIN_LOOT_QUALITY[Game.Enemy[1]]);
        }
      }
      let ITEMID = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;

      if (Game.inventory[ITEMID].object > 0 && Game.inventory[ITEMID].object < 3) {
        if (Game.inventory[ITEMID].object == 1) descitem = "+<i class='rouge fas fa-heart nomargin'></i>" + fix(Game.inventory[ITEMID].life, 5) + "<br>";
        if (Game.inventory[ITEMID].object == 2) descitem = "+<i class='bleu fas fa-sword nomargin'></i>" + fix(Game.inventory[ITEMID].power, 5) + "<br>";
        if (ITEMID < Game.MaxInv) { $("#rewards-loot").append("<div class='ui comments'><div class='comment " + Game.inventory[ITEMID].class + "-Core'><div class='Bar-" + Game.inventory[ITEMID].class + "'></div>" + Game.inventory[ITEMID].name + "<br><span class='" + Game.inventory[ITEMID].class + "'>" + Game.inventory[ITEMID].class + "</span><br>" + descitem + "</div></div>"); }
      }
    }
    var INVENTORYFULL = (Game.inventory.length - 1) < Game.MaxInv ? "" : "Inventory full, you can\'t recover any new item.";
    $("#rewards-loot").append(INVENTORYFULL);
    if (COUNTED_LOOTS == 0) $("#rewards-loot").html(REWARDTEXT + "<br>" + INVENTORYFULL);
    Game.isInFight = 2;
    var ToAddCash = Math.floor(random(1 * (Game.Enemy[2] - 5), Game.Enemy[1] * Game.Enemy[2]));
    if (ToAddCash < 1) ToAddCash = 1;
    Game.Cash += ToAddCash;

    let THREATS = ["NORMAL", "ADVANCED", "SUPERIOR", "VETERAN", "ELITE", "BOSS", "GOD"];
    let ThreatLevel = THREATS[Game.Enemy[1]];
    $("#EnemyDesc").html("<br><br>");
    $("#rewards-title").html("<span class='vert'> " + Ennemies[Game.Location][Game.Enemy[0]] + " defeated !</span>");
    $("#rewards-desc").html("<br>You have defeated " + fix(Game.Defeated[Game.Enemy[1]], 3) + " <div class='ui small Enemy" + Game.Enemy[1] + " basic label'><span class='Enemy" + Game.Enemy[1] + "'>" + ThreatLevel + "</span></div><br> " + LEVELUP + "+<i class='green dollar icon'></i>" + ToAddCash);
    if (APP.ScoreModeEnabled == 0) {
      $("#rewards-text").html("+<span class='vert bold'>" + fix(Math.floor(expGain), 5) + "</span> EXP " + EMP);
      if (Game.Level >= POS[Game.Location][2]) $("#rewards-text").html(EMP);
      if (Game.MissionStarted[0] && Game.Level >= POS[Missions[Game.MissionStarted[1]][8]][2]) $("#rewards-text").html(EMP);
    }
    else $("#rewards-text").html(EMP);
    if (Game.config[2] == 1) hideRewards();
    else {
      NOTIFY($("#rewards-title").html(), $("#rewards-desc").html() + "<br>" + $("#rewards-text").html() + $("#rewards-loot").html());
      hideRewards();
    }
  }
}

function LoseFight() {
  Game.isInFight = 2;
  Game.Loses++;
  let THREATS = ["", "NORMAL", "ADVANCED", "SUPERIOR", "VETERAN", "ELITE", "BOSS", "GOD"];
  var DEATHS = Game.Loses == 0 ? 1 : Game.Loses;
  var EXP_DESC = APP.ScoreModeEnabled == 0 ? "You lose a part of your experience.<br>" : "";
  NOTIFY("<div class='ui Enemy" + Game.Enemy[1] + " basic label'><span class='Enemy" + Game.Enemy[1] + "'>" + THREATS[Game.Enemy[1]] + "</div> " + Ennemies[Game.Location][Game.Enemy[0]] + " has killed you !", EXP_DESC + "Current Ratio <span class='rouge'>" + fix(Game.Wins / DEATHS, 7));
  Game.xp[0] = 0;
  if (Game.MissionStarted[0] && Missions[Game.MissionStarted[1]][3] == 2) {
    Game.MissionStarted = [false, 0, 0, 0, 0];
    NOTIFY("<span class='rouge'>MISSION FAILED</span>", "You failed to clear the fortress, now returning outside of it.");
    Game.Location = 10;
  }
  hideRewards();
}

function UpdateCombat() {
  let THREATS = ["", "NORMAL", "ADVANCED", "SUPERIOR", "VETERAN", "ELITE", "BOSS", "GOD"];
  var PLAYER_LIFE_COLOR = APP.CoreLife <= APP.CoreBaseLife / 2 ? " orange" : " vert";
  if (APP.CoreLife <= Game.Enemy[3]) PLAYER_LIFE_COLOR = " rouge";
  var ENEMY_LIFE_COLOR = Game.Enemy[5] < Game.Enemy[4] / 2 ? " orange" : " vert";
  if (Game.Enemy[5] < Game.Enemy[4] / 3) ENEMY_LIFE_COLOR = " rouge";
  let TLC = "<span class='Enemy" + Game.Enemy[1] + "'>";
  var LVLTEXT = APP.ScoreModeEnabled == 0 ? " Level " : " Score <i class='fad fa-dice-d20'></i>";
  var TIERTEXT = APP.ScoreModeEnabled == 0 ? Math.round(Game.Enemy[2]) : Math.floor(Game.Enemy[2] * 10);
  var EnemyName = Game.Enemy[1] > 5 ? BossNames[Game.Location] : Ennemies[Game.Location][Game.Enemy[0]];
  $("#EnemyTitle").html("" + TLC + THREATS[Game.Enemy[1]] + "</span> " + TLC + EnemyName + "</span><br><div class='ui horizontal label'>" + LVLTEXT + fix(TIERTEXT, 4) + "</div>");
  $("#EnemyPower").html("<i class='bleu fas fa-sword'></i>" + fix(Game.Enemy[3], 5));
  $("#EnemyLife").html("<i class='rouge fas fa-heart'></i><span class='" + ENEMY_LIFE_COLOR + "'>" + fix(Game.Enemy[5], 5) + "</span>");
  $("#PlayerLife").html("<i class='rouge fas fa-heart'></i><span class='" + PLAYER_LIFE_COLOR + "'>" + fix(APP.CoreLife, 5) + "</span>/" + fix(APP.CoreBaseLife, 5) + " ");
  $("#PlayerPower").html("<i class='bleu fas fa-sword'></i>" + fix(APP.WeaponsPower, 6) + "<br><i class='jaune fas fa-swords'></i>" + fix(APP.SpecialPower, 6));
  $("#emp-btn").html("<i class='fas fa-swords'></i>" + fix(Game.Emp, 4) + " Special Attack");
  if (Game.Emp < 1 || Game.MissionStarted[0] && Missions[Game.MissionStarted[1]][3] == 2) $("#emp-btn").attr("class", "fluid ui huge inverted secondary basic button");
  else $("#emp-btn").attr("class", "fluid ui huge yellow button alphaSDW");
  $("#attack-btn").html("<i class='fas fa-sword'></i></i>Main Attack");
  $("#cover-btn").html("<i class='fas fa-shield'></i>Take cover");
  $("#run-btn").html("<i class='fas fa-running'></i> Run Away");
  $("#PLAYER_PERCENT").attr("style", "stroke-dashoffset: calc(440 - (440 * " + GetPlayerHPPercent() + ") / 100)");
  $("#ENEMY_PERCENT").attr("style", "stroke-dashoffset: calc(440 - (440 * " + GetEnemyHPPercent() + ") / 100)");
  $("#PlayerSprite+h2").html(fix(GetPlayerHPPercent(), 3) + "<span>%</span>");
  $("#EnemySprite+h2").html(fix(GetEnemyHPPercent(), 3) + "<span>%</span>");
  $("#PlayerSprite+h2").attr("class", PLAYER_LIFE_COLOR);
  $("#EnemySprite+h2").attr("class", ENEMY_LIFE_COLOR);
}

//EQUIPMENT & STATS UPGRADES FUNCTIONS
function NewCore(id, n) {
  Game.isInFight = 6;
  let OldCore = Game.Armors[id];
  let BR = "<br>";

  if (Game.config[0] == 1) {
    let OLD_LEVEL = Game.inventory[n].level <= OldCore[4] ? "ShadowReset green" : "ShadowReset rouge";
    let OLD_UPGRADES = Game.inventory[n].ups <= (Game.MaxUPC[id - 1] - OldCore[5]) ? "green" : "rouge";
    let OLD_LIFE = Game.inventory[n].life <= OldCore[3] ? "green" : "rouge";
    let LEVEL = Game.inventory[n].level >= OldCore[4] ? "ShadowReset green" : "ShadowReset rouge";
    let UPPGRADES = Game.inventory[n].ups >= (Game.MaxUPC[id - 1] - OldCore[5]) ? "green" : "rouge";
    let LIFE = Game.inventory[n].life >= OldCore[3] ? "green" : "rouge";
    if (Game.inventory[n].level == Math.floor(OldCore[4])) OLD_LEVEL = ""; LEVEL = "";
    if (Game.inventory[n].ups == (Game.MaxUPC[id - 1] - OldCore[5])) UPPGRADES = ""; OLD_UPGRADES = "";
    if (Game.inventory[n].life == OldCore[2]) OLD_LIFE = ""; LIFE = "";

    if (APP.ScoreModeEnabled == 0) {
      TIER = "Level ";
      TIERRANK = Math.round(Game.inventory[n].level);
      OLDTIERRANK = OldCore[4];
    } else {
      TIER = "Score <i class='fad fa-dice-d20'></i>";
      TIERRANK = Math.floor(Game.inventory[n].level * 10);
      OLDTIERRANK = Math.floor(OldCore[4] * 10);
    }

    $("#OldCore-text").html("<span class='" + OldCore[2] + "'>" + OldCore[1] + BR + "<span class='" + OLD_LEVEL + "'>" + TIER + OLDTIERRANK + "</span></span><br>" +
      "<span class='desc'>Relic Slots : " + "<span class='" + OLD_UPGRADES + "'>" + (Game.MaxUPC[id - 1] - OldCore[5]) + "<i class='jaune fas fa-stars'></i></span></span><br>" +
      "<i class='rouge fas fa-heart'></i><span class='" + OLD_LIFE + "'>" + OldCore[3] + "</span>");

    $("#NewCore-text").html("<span class='" + Game.inventory[n].class + "'>" + Game.inventory[n].name + BR + "<span class='" + LEVEL + "'>" + TIER + TIERRANK + "</span></span><br>" +
      "<span class='desc'>Relic Slots : <span class='" + UPPGRADES + "'>" + Game.inventory[n].ups + "<i class='jaune fas fa-stars'></i></span></span><br>" +
      "<i class='rouge fas fa-heart'></i><span class='" + LIFE + "'>" + Game.inventory[n].life + "</span>");

    $("#confirm-btn").html("<div onclick='Cancelconfirm();' class='ui rainbow button'><i class='red remove icon'></i> Cancel</div><div class='alphadivider'></div><div id='replace-btn' onclick='DefineCore(" + id + ", " + n + ");' class='ui rainbow button'><i class='green check icon'></i> Replace Armor " + id + "</div>");
    $("#modal-4").modal("show");
    $("#confirm3-title").html("Confirm the new armor equipment ?");
  } else DefineCore(id, n);
}

function DefineCore(core, selected) {
  if (Game.config[0] == 1) $("#modal-4").modal("hide");
  if (Game.inventory[selected].life !== undefined) {
    Game.Armors[core] = [true, Game.inventory[selected].name, Game.inventory[selected].class, Game.inventory[selected].life, Game.inventory[selected].level, 0];
    Game.MaxUPC[core - 1] = Game.inventory[selected].ups;
    Game.ArmorUpgrades[core] = 0;
  }
  if (selected <= Game.MaxInv) RemoveItem(selected);
  if ($('#DIV-INVENTORY').is(":visible")) hideModals(); else hideRewards();
  Game.isInFight = 0;
  GenInventory();
  UpdateGame();
}

function NewWeapon(id, n) {
  Game.isInFight = 6;
  let type = ["Main", "Special"];
  let OldCore = Game.Weapons[type[id]];
  let BR = "<br>";

  if (Game.config[0] == 1) {
    var OLD_LEVEL = Game.inventory[n].level <= OldCore[3] ? "ShadowReset green" : "ShadowReset rouge";
    let OLD_UPGRADES = Game.inventory[n].ups <= (Game.MaxUPC[id - 1] - OldCore[2]) ? "green" : "rouge";
    let OLD_POWER = Game.inventory[n].power <= OldCore[4] ? "green" : "rouge";
    let LEVEL = Game.inventory[n].level >= OldCore[3] ? "ShadowReset green" : "ShadowReset rouge";
    let UPGRADES = Game.inventory[n].ups >= (Game.MaxUPC[id - 1] - OldCore[2]) ? "green" : "rouge";
    let POWER = Game.inventory[n].power >= OldCore[4] ? "green" : "rouge";

    if (Game.inventory[n].level == Math.floor(OldCore[4])) { OLD_LEVEL = ""; LEVEL = ""; }
    if (Game.inventory[n].ups == (Game.MaxUPC[id - 1] - OldCore[5])) { UPGRADES = ""; OLD_UPGRADES = ""; }
    if (Game.inventory[n].power == OldCore[3]) { OLD_POWER = ""; POWER = ""; }

    if (APP.ScoreModeEnabled == 0) {
      TIER = "Level ";
      TIERRANK = Math.round(Game.inventory[n].level);
      OLDTIERRANK = OldCore[3];
    } else {
      TIER = "Score <i class='fad fa-dice-d20'></i>";
      TIERRANK = Math.floor(Game.inventory[n].level * 10);
      OLDTIERRANK = Math.floor(OldCore[3] * 10);
    }

    $("#OldCore-text").html("<span class='" + OldCore[1] + "'>" + OldCore[0] + BR + "<span class='" + OLD_LEVEL + "'>" + TIER + OLDTIERRANK + "</span></span><br>" +
      "<span class='desc'>Relic Slots : " + "<span class='" + OLD_UPGRADES + "'>" + (Game.MaxUPC[id - 1] - OldCore[2]) + "<i class='jaune fas fa-stars'></i></span></span><br>" +
      "<i class='bleu fas fa-sword'></i><span class='" + OLD_POWER + "'>" + OldCore[4] + "</span>");

    $("#NewCore-text").html("<span class='" + Game.inventory[n].class + "'>" + Game.inventory[n].name + BR + "<span class='" + LEVEL + "'>" + TIER + TIERRANK + "</span></span><br>" +
      "<span class='desc'>Relic Slots: <span class='" + UPGRADES + "'>" + Game.inventory[n].ups + "<i class='jaune fas fa-stars'></i></span></span><br>" +
      "<i class='bleu fas fa-sword'></i><span class='" + POWER + "'>" + Game.inventory[n].power + "</span>");

    $("#confirm-btn").html(`<div onclick='Cancelconfirm();' class='ui rainbow button'><i class='red remove icon'></i> Cancel</div><div class='alphadivider'></div><div id='replace-btn' onclick='DefineWeapon("` + type[id] + `",` + n + `);' class='ui rainbow button'><i class='green check icon'></i> Replace ` + type[id] + ` Weapon</div>`);
    $("#modal-4").modal("show");
    $("#confirm3-title").html("Use a new weapon");
  } else DefineWeapon(type[id], n);
}

function DefineWeapon(type, selected) {
  let UPC_TYPE = { Main: 1, Special: 2 };
  if (Game.config[0] == 1) $("#modal-4").modal("hide");
  if (Game.inventory[selected].power !== undefined) {
    Game.Weapons[type] = [Game.inventory[selected].name, Game.inventory[selected].class, 0, Game.inventory[selected].level, Game.inventory[selected].power];
    Game.MaxUPC[UPC_TYPE[type] + 3] = Game.inventory[selected].ups;
  }
  if (selected <= Game.MaxInv) RemoveItem(selected);
  if ($('#DIV-INVENTORY').is(":visible")) hideModals(); else hideRewards();
  Game.isInFight = 0;
  GenInventory();
  UpdateGame();
}

function ConfirmRelic(R, id) {
  Game.isInFight = 8;
  var IRCOLOR = "rouge";
  var IRCOLOR2 = "rouge";
  if (Game.RLS[R][1] == Game.inventory[id].object && Game.RLS[R][2] > Game.inventory[id].bonus) IRCOLOR = "green";
  if (Game.RLS[R][1] == 0) { IRCOLOR = "green"; IRCOLOR2 = "green"; }
  if (Game.RLS[R][1] == 0) CDESC = "-";
  if (Game.RLS[R][1] == 1) CDESC = "Power bonus of <span class='" + IRCOLOR + "'>" + fix(Game.RLS[R][2], 9) + "</span>";
  if (Game.RLS[R][1] == 2) CDESC = "Life bonus of <span class='" + IRCOLOR + "'>" + fix(Game.RLS[R][2], 9) + "</span>";
  if (Game.RLS[R][1] == 3) CDESC = "Max Score +<span class='" + IRCOLOR + "'>" + fix(Game.RLS[R][2], 3) + "</span>";
  if (Game.RLS[R][1] == 4) CDESC = "Minimal drop quality <span class='" + Game.RLS[R][2] + "'>" + Game.RLS[R][2] + "</span>";
  if (Game.RLS[R][1] == Game.inventory[id].object && Game.RLS[R][2] < Game.inventory[id].bonus) IRCOLOR2 = "green";
  if (Game.inventory[id].object == 0) { CDESC2 = "-"; }
  if (Game.inventory[id].object == 1) { CDESC2 = "Power bonus of <span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[id].bonus, 9) + "</span>"; }
  if (Game.inventory[id].object == 2) { CDESC2 = "Life bonus of <span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[id].bonus, 9) + "</span>"; }
  if (Game.inventory[id].object == 3) { CDESC2 = "Max Score +<span class='" + IRCOLOR2 + "'>" + fix(Game.inventory[id].bonus, 3) + "</span>"; }
  if (Game.inventory[id].object == 4) { CDESC2 = "Minimal drop quality <span class='" + Game.inventory[id].bonus + "'>" + Game.inventory[id].bonus + "</span>"; }

  if (Game.config[1] == 1) {
    $("#OldRelic-text").html("<span class='" + Game.RLS[R][0] + "'>" + Game.RLS[R][0] + "</span><br>" + CDESC);
    $("#NewRelic-text").html(Game.inventory[id].name + "<br><span class='" + Game.inventory[id].class + "'>" + Game.inventory[id].class + "</span><br>" + CDESC2);
    $("#confirm2-btn").html("<div onclick='Cancelconfirm();' class='ui rainbow button'> Cancel</div><div id='replace-btn' onclick='InstallRelic(" + R + ", " + id + ");' class='ui rainbow button'> Replace Relic </div>");
    $("#modal-3").modal("show");
  }
  else InstallRelic(R, id);
}

function InstallRelic(R, id) {
  Game.RLS[R] = [Game.inventory[id].class, Game.inventory[id].object, Game.inventory[id].bonus];
  if (id <= Game.MaxInv) RemoveItem(id);
  if ($('#DIV-INVENTORY').is(":visible")) hideModals(); else hideRewards();
  if (Game.config[1] == 1) $('#modal-3').modal('hide');
  GenInventory();
}

function ConfirmDestroy(core) {
  DCore = Game.Armors[core];
  var TIER = APP.ScoreModeEnabled == 0 ? "Level " : "Score <i class='fad fa-dice-d20'></i>";
  var DTIERRANK = APP.ScoreModeEnabled == 0 ? Math.round(DCore[4]) : Math.floor(DCore[4] * 10);
  var Names = ["", "Helmet", "Armor", "Shield", "Boots"];
  $("#Destroy-Title").html("Throw your current " + Names[core] + " ?");
  $("#Destroy-text").html("<span class='" + DCore[2] + "'>" + DCore[2] + " " + DCore[1] + "<div class='ui horizontal label'>" + TIER + "" + DTIERRANK + "</div></span><br>" +
    "<span class='desc'>Available slots : " + "" + (Game.MaxUPC[core - 1] - DCore[5]) + "<i class='orange fad fa-gem'></i></span><br>" +
    "<i class='rouge fas fa-heart'></i>" + DCore[3] + "<br>");
  $("#DBTN").html("<div class='ui cu2 button' onclick='DestroyCore(" + core + ");'><i class='rouge trash icon'></i> Confirm</div><div onclick='DCancel();' class='ui cu button'><i class='vert times icon'></i><span class='blanc'>Cancel</span></div>");
  $("#modal-2").modal("show");
}

function ConfirmDestroyWeapon(weapon) {
  WeaponToDelete = Game.Weapons[weapon];
  var TIER = APP.ScoreModeEnabled == 0 ? "Level " : "Score <i class='fad fa-dice-d20'></i>";
  var DTIERRANK = APP.ScoreModeEnabled == 0 ? Math.round(WeaponToDelete[3]) : Math.floor(WeaponToDelete[3] * 10);
  $("#Destroy-Title").html("Throw your current " + weapon + " weapon ?");
  $("#Destroy-text").html("<span class='" + WeaponToDelete[1] + "'>" + WeaponToDelete[1] + " " + WeaponToDelete[0] + "<div class='ui horizontal label'>" + TIER + "" + DTIERRANK + "</div></span><br>" +
    "<i class='bleu fas fa-sword'></i>" + WeaponToDelete[4] + "<br>");
  if (weapon == "Main") weapon = 1; else weapon = 2;
  $("#DBTN").html("<div class='ui cu2 button' onclick=\'DestroyWeapon(" + weapon + ");'><i class='rouge trash icon'></i> Confirm</div><div onclick='DCancel();' class='ui cu button'><i class='vert times icon'></i><span class='blanc'>Cancel</span></div>");
  $("#modal-2").modal("show");
}

function DestroyWeapon(type) {
  if (type == 1) Game.Weapons.Main = ["Training Sword", "Normal", 0, 1, 10 + (Game.Simulation * 1)];
  else Game.Weapons.Special = ["Training Dagger", "Normal", 0, 1, 10 + (Game.Simulation * 1)];
  $('#modal-2').modal('hide');
  GenInventory();
  UpdateGame();
}

function DestroyCore(core) {
  Game.Armors[core] = [true, "Basic Armor", "Normal", 100, 1, 0];
  Game.MaxUPC[core - 1] = 0;
  Game.ArmorUpgrades[core] = 0;
  $('#modal-2').modal('hide');
  GenInventory();
  UpdateGame();
}

function Cancelconfirm() {
  Game.isInFight = 2;
  GenInventory();
  $('#modal-3').modal('hide');
  $('#modal-4').modal('hide');
}

function GET_MAX_UPGRADES(type) {
  if (APP.ScoreModeEnabled == 0) {
    if (type == "Normal") return 0;
    if (type == "Common") return random(0, 1);
    if (type == "Uncommon") return random(1, 2);
    if (type == "Rare") return 2;
    if (type == "Epic") return random(2, 3);
    if (type == "Exotic") return random(3, 4);
    if (type == "Divine") return random(4, 5);
  } else {
    if (type == "Normal") return random(0, 1);
    if (type == "Common") return random(0, 2);
    if (type == "Uncommon") return random(1, 2);
    if (type == "Rare") return random(2, 3);
    if (type == "Epic") return random(3, 4);
    if (type == "Exotic") return random(3, 5);
    if (type == "Divine") return random(5, 6);
  }
}

function UPCore(core, type, nb) {
  let BONUSES = { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6 };
  if (Game.Armors[core][5] < Game.MaxUPC[core - 1]) {
    if (type == 1) Game.Armors[core][3] += Game.inventory[nb].life;
    Game.Armors[core][5]++;
    if (APP.ScoreModeEnabled === 1) {
      if (Game.Armors[core][4] + (BONUSES[Game.inventory[nb].class] / 10) <= APP.MaxScore) { Game.Armors[core][4] += (BONUSES[Game.inventory[nb].class] / 10); }
      else { Game.Armors[core][4] = APP.MaxScore; }
    }
    Game.ArmorUpgrades[core] += Game.inventory[nb].life;
    if (nb < Game.MaxInv) RemoveItem(nb);
  }
  if ($('#DIV-INVENTORY').is(":visible")) { hideModals(); } else { hideRewards(); }
  GenInventory();
  UpdateGame();
}

function UPWeapon(core, nb) {
  let BONUSES = { Normal: 0, Common: 1, Uncommon: 2, Rare: 3, Epic: 4, Exotic: 5, Divine: 6 };
  let weapon = "Main";
  if (core == 2) weapon = "Special";
  if (Game.Weapons[weapon][2] < Game.MaxUPC[core + 3]) {
    Game.Weapons[weapon][4] += Game.inventory[nb].power;
    Game.Weapons[weapon][2]++;
    if (APP.ScoreModeEnabled == 1) {
      if (Game.Weapons[weapon][3] + (BONUSES[Game.inventory[nb].class] / 10) <= APP.MaxScore) Game.Weapons[weapon][3] += (BONUSES[Game.inventory[nb].class] / 10);
      else Game.Weapons[weapon][3] = APP.MaxScore;
    }
    if (nb < Game.MaxInv) RemoveItem(nb);
  }
  if ($('#DIV-INVENTORY').is(":visible")) { hideModals(); } else { hideRewards(); }
  GenInventory();
  UpdateGame();
}

function BuyXPMult() {
  var price = GetMultPrice(0);
  if (Game.Shards >= price && price <= 999999999) {
    Game.Shards -= price;
    Game.Upgrades[0]++;
  }
  UpdateGame();
}

function BuyPowerMult() {
  var price = GetMultPrice(1);
  if (Game.Shards >= price && price <= 999999999) {
    Game.Shards -= price;
    Game.Upgrades[1]++;
  }
  UpdateGame();
}

function BuyLifeMult() {
  var price = GetMultPrice(2);
  if (Game.Shards >= price && price <= 999999999) {
    Game.Shards -= price;
    Game.Upgrades[2]++;
  }
  UpdateGame();
}

function BuyInvSlot() {
  var price = GetMultPrice(3);
  if (Game.Shards >= price && price <= 999999999) {
    Game.Shards -= price;
    Game.Upgrades[3]++;
  }
  UpdateGame();
}

function GetMultPrice(id) {
  if (Game.Upgrades[id] == null) Game.Upgrades[id] = 0;
  var price = 2;
  if (Game.Upgrades[id] >= 10) price = 3;
  if (Game.Upgrades[id] >= 20) price = 4;
  if (Game.Upgrades[id] >= 30) price = 5;
  if (Game.Upgrades[id] >= 40) price = 6;
  if (Game.Upgrades[id] >= 50) price = 8;
  if (Game.Upgrades[id] >= 60) price = 10;
  if (Game.Upgrades[id] >= 70) price = 12;
  if (Game.Upgrades[id] >= 80) price = 15;
  if (Game.Upgrades[id] >= 90) rice = 25;
  if (id == 0 && Game.Upgrades[id] >= 200) price = 999999999;
  if (id == 1 && Game.Upgrades[id] >= 100) price = 999999999;
  if (id == 2 && Game.Upgrades[id] >= 100) price = 999999999;
  if (id == 3 && Game.Upgrades[id] >= 50) price = 999999999;
  return price;
}

function ChangeWT() { $("#modal-7").modal("show"); }

function ConfirmWT() {
  if (Game.Level >= APP.MaxLevel && APP.Ranking >= (((30 + (Game.Simulation * 5)) * 10) - 5) && APP.LastMission >= APP.TotalMissions) {
    Game.Simulation++;
    Game.xp = [0, 0, 0];
    Game.Level = 1;
    Game.Shards += Math.round(APP.Ranking / 10 / 5 - 6);
    APP.LifeMult = 1;
    APP.PowerMult = 1;
    Game.Emp = 0;
    Game.inventory = [];
    Game.MaxUPC = [0, 0, 0, 0, 0, 0];
    Game.Armors[1] = [true, "Basic Armor", "Normal", 100, 1];
    Game.Armors[2] = [false, "Basic Armor", "Normal", 100, 1];
    Game.Armors[3] = [false, "Basic Armor", "Normal", 100, 1];
    Game.Armors[4] = [false, "Basic Armor", "Normal", 100, 1];
    Game.ArmorUpgrades = [null, 0, 0, 0, 0];
    Game.RLS[1] = ["Normal", 0, 0];
    Game.RLS[2] = ["Normal", 0, 0];
    Game.RLS[3] = ["Normal", 0, 0];
    Game.RLS[4] = ["Normal", 0, 0];
    Game.Weapons.Main = ["Training Sword", "Normal", 0, 1, 10 + (Game.Simulation * 1)];
    Game.Weapons.Special = ["Training Dagger", "Normal", 0, 1, 10 + (Game.Simulation * 1)];
    Game.isInFight = 0;
    Game.MissionsCompleted = [];
    Game.Location = 0;
    Game.MissionStarted = [false, 0, 0, 0, 0];
    Game.AutoRemove = [0, 0, 0, 0, 0, 0];
    $("#RM1").checkbox("uncheck");
    $("#RM2").checkbox("uncheck");
    $("#RM3").checkbox("uncheck");
    $("#RM4").checkbox("uncheck");
    $("#RM5").checkbox("uncheck");
    $("#RM6").checkbox("uncheck");
    hideRewards();
    hideMenus();
    hideModals();
    mission(0);
  }
}

//ITEM GENERATION FUNCTION
function newItem(type, level, rarity) {
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

  for (var R in Game.RLS) {//IF PLAYER HAVE A MINIMAL RARITY RELIC THEN USE IT HERE
    if (Game.RLS[R][1] == 4 && BASE_LUCK < ITEM_CONFIG.RARITIES[Game.RLS[R][2]][1]) BASE_LUCK = ITEM_CONFIG.RARITIES[Game.RLS[R][2]][1];
  }
  if (APP.ScoreModeEnabled == 1 && BASE_LUCK < 7000) {//IF IN SCORE MODE REPLACE ALL LOW CLASS ITEMS WITH HIGH CLASS ONES
    let LUCK_PER_TYPES = { 0: 7000, 1: 7000, 2: 7000, 3: 7000, 4: 7000, 5: 8500, 6: 8500, 7: 9850, };
    BASE_LUCK = LUCK_PER_TYPES[Game.Enemy[1]];
    level = level / 10;
    if (level > APP.MaxScore) level = APP.MaxScore;
    if (Game.MissionStarted[0] && Missions[Game.MissionStarted[1]][3] == 2) BASE_LUCK = Game.Enemy == 7 ? 9850 : 9500; //IF IN A FORTRESS GENERATE AN EXOTIC OR BETTER
  } else {
    if (level > Game.Level) level = Game.Level;
    if (level > POS[Game.Location][2]) level = POS[Game.Location][2];
  }
  let MAX_LUCK = ITEM_CONFIG.RARITIES[CLASSES[POS[Game.Location][3]]][1]; //DEFINE THE MAXIMUM DROP QUALITY TO LOCATION MAX
  if (Game.MissionStarted[0] && Missions[Game.MissionStarted[1]][3] == 2) MAX_LUCK = BASE_LUCK; //IF IN A FORTRESS GENERATE AN EXOTIC OR BETTER
  if (_.inRange(Game.Level, 1, 4) && POS[Game.Location][3] > 0) MAX_LUCK = 1999;
  if (_.inRange(Game.Level, 5, 9) && POS[Game.Location][3] > 1) MAX_LUCK = 4999;
  if (_.inRange(Game.Level, 10, 14) && POS[Game.Location][3] > 2) MAX_LUCK = 6999;
  if (_.inRange(Game.Level, 15, 49) && POS[Game.Location][3] > 3) MAX_LUCK = 8499;
  if (_.inRange(Game.Level, 20, 29) && POS[Game.Location][3] > 4) MAX_LUCK = 9499;
  if (_.inRange(Game.Level, 30, 39) && POS[Game.Location][3] > 5) MAX_LUCK = 9849;
  if (_.inRange(Game.Level, 40, 40) && POS[Game.Location][3] > 6) MAX_LUCK = 10000;
  let LUCK = _.random(BASE_LUCK, MAX_LUCK);
  item.class = "Normal";
  if (_.inRange(LUCK, 2000, 4999)) item.class = "Common";
  if (_.inRange(LUCK, 5000, 6999)) item.class = "Uncommon";
  if (_.inRange(LUCK, 7000, 8499)) item.class = "Rare";
  if (_.inRange(LUCK, 8500, 9499)) item.class = "Epic";
  if (_.inRange(LUCK, 9500, 9849)) item.class = "Exotic";
  if (_.inRange(LUCK, 9850, 10000)) item.class = "Divine";

  if (type == "Armor") { //GENERATE AN ARMOR
    item.name = CoreNames[[item.class]][Math.floor(Math.random() * CoreNames[item.class].length)] + " Armor";
    if (level > APP.MaxScore) level = APP.MaxScore;
    item.level = level;
    item.object = 0;
    item.ups = GET_MAX_UPGRADES(item.class);
    if (APP.ScoreModeEnabled == 1) item.life = Math.floor(random((level * 10) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] * 0.75) + 100, (level * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] + 100)); else item.life = Math.floor(random((level * 10) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] * 0.9) + 100, (level * 10) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] + 100));
    item.id = 1; //SET AS ARMOR
  }

  if (type == "Weapon") { //GENERATE A WEAPON
    item.name = CoreNames[[item.class]][Math.floor(Math.random() * CoreNames[item.class].length)] + " Weapon";
    if (level > APP.MaxScore) level = APP.MaxScore;
    item.level = level;
    item.object = 0;
    item.ups = GET_MAX_UPGRADES(item.class);
    if (APP.ScoreModeEnabled == 1) item.power = Math.floor(random((level * 3) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] * 0.75), (level * 3) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] + 5)); else item.power = Math.floor(random((level * 3) * (ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] * 0.9), (level * 3) * ITEM_CONFIG.MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]] + 5));
    item.id = 4; //SET AS WEAPON
  }

  if (type == "Gem") { //GENERATE A GEM
    let MULTIPLIER = _.random(ITEM_CONFIG.GEMS_MULTIPLIERS[item.class][0], ITEM_CONFIG.GEMS_MULTIPLIERS[item.class][1]); //Random number between 0.1% - 2.5%
    let GEMTYPE = _.random(1, 100);
    if (_.inRange(GEMTYPE, 0, 35)) { //GENERATE A POWER GEM
      item.power = Math.floor(MULTIPLIER * ((APP.WeaponsPower / (APP.PowerMult + Game.WTMult[0])) * 0.01) + ITEM_CONFIG.RARITIES[item.class][0]);
      if (item.power < 1) item.power = 1;
      item.life = 0;
      item.name = "Power Gem";
      item.level = ITEM_CONFIG.RARITIES[item.class][0];
      item.object = 2;
      item.id = 5; //SET AS POWER GEM
    }
    if (_.inRange(GEMTYPE, 35, 100)) { //GENERATE A LIFE GEM
      item.life = Math.floor(MULTIPLIER * ((APP.CoreBaseLife / (APP.LifeMult + Game.WTMult[1])) * 0.01) + ITEM_CONFIG.RARITIES[item.class][0]);
      if (item.life < 1) item.life = 1;
      item.power = 0;
      item.name = "Life Gem";
      item.level = ITEM_CONFIG.RARITIES[item.class][0];
      item.object = 1;
      item.id = 2; //SET AS LIFE GEM
    }
  }

  if (type == "Relic") { //GENERATE A RELIC
    let RelicType = _.random(0, 1);
    if (Game.Level > 10) RelicType = _.random(0, 2);
    if (APP.ScoreModeEnabled == 1) RelicType = _.random(0, 3);

    if (RelicType == 0) {
      item.name = Relicname[0];
      item.object = 1;
      item.bonus = ITEM_CONFIG.RELIC_MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]];
    }

    if (RelicType == 1) {
      item.object = 2;
      item.bonus = ITEM_CONFIG.RELIC_MULTIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]];
    }

    if (RelicType == 2) {
      item.object = 3;
      item.bonus = ITEM_CONFIG.RELIC_SCORE_MUTLIPLIERS[ITEM_CONFIG.RARITIES[item.class][0]];
    }

    if (RelicType == 3) {
      item.object = 4;
      item.bonus = CLASSES[_.random(0, ITEM_CONFIG.RARITIES[item.class][0])];
      if (ITEM_CONFIG.RARITIES[item.class][0] > 1) item.bonus = CLASSES[_.random(ITEM_CONFIG.RARITIES[item.class][0] - 2, ITEM_CONFIG.RARITIES[item.class][0])];
      if (ITEM_CONFIG.RARITIES[item.class][0] > 2) item.bonus = CLASSES[_.random(ITEM_CONFIG.RARITIES[item.class][0] - 3, ITEM_CONFIG.RARITIES[item.class][0])];
    }
    item.name = Relicname[RelicType];
    item.id = 3; //SET AS RELIC
  }
  if (type == 'Armor' || type == 'Weapon' || type == 'Gem' || type == 'Relic') if ((Game.inventory.length - 1) < Game.MaxInv) Game.inventory[Game.inventory.length] = item;
}