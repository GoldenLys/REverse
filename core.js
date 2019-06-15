// TUTORIAL TEXTS - WHEN THE GAME WILL BE NEARLY FINISHED
// MONEY LOOTED ALONG WITH A SHOP SYSTEM ?
// NEW MISSIONS - GUILD PROMOTIONS : 2 ELITES & 1 BOSS TO PROMOTE TO F-A OR S Rank which will increase your rewards. (money/exp)
// SEPARATE DAMAGES FROM CORES AND CREATE PRE MADE WEAPONS EG : Sword Of Aztral : 500 Damage which some can be looted in certains areas

var url = window.location.href;
var version = "1.5"; //!\ ONLY 1.X /!\\
var loadState = 0;
var codes = {};
var REWARDSW8 = 0;
var Relicname = ["Ares Relic", "Yggdrasil Relic", "Vulcan Relic", "Recon Relic", "Sniper Relic", "Hunter Relic", "Pathfinder Relic"];
var CoreNames = {
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
  lastCloudSave: 0,
  cores: [false, true, false, false, false],
  core1: ["Basic Armor", "Normal", 100, 10, 1, 0], //NAME, CLASS, LIFE, POWER, LEVEL, UPC
  core2: ["Basic Armor", "Normal", 100, 10, 1, 0],
  core3: ["Basic Armor", "Normal", 100, 10, 1, 0],
  core4: ["Basic Armor", "Normal", 100, 10, 1, 0],
  RLS: {//RELIC NAME, CLASS, TYPE, VALUE
    1: ["Alpha Relic", "Normal", 0, 0],
    2: ["Alpha Relic", "Normal", 0, 0],
    3: ["Alpha Relic", "Normal", 0, 0],
    4: ["Alpha Relic", "Normal", 0, 0],
  },
  core1K: [0, 0],
  core2K: [0, 0],
  core3K: [0, 0],
  core4K: [0, 0],
  MaxUPC: [0, 0, 0, 0],
  xp: [0, 100, 1],
  Level: 1,
  Ennemy: [], //NAME, CLASS, LEVEL, POWER, LIFE, CURRENTLIFE
  CoreLife: 100,
  CoreBaseLife: 100,
  CorePower: 10,
  Loses: 0,
  Wins: 0,
  isInFight: 0,
  Ranking: 0,
  MarketTimer: 0,
  Emp: 0,
  Shards: 10,
  Defeated: [null, 0, 0, 0, 0, 0, 0, 0],
  PowerMult: 1,
  LifeMult: 1,
  MaxLevel: 35,
  inventory: [],
  MaxInv: 20,
  Theme: [],
  Upgrades: [0, 0, 0, 0],
  Simulation: 1,
  WTMult: [0, 0, 0, 1], //POWER, LIFE, XP, DIFFICULTY
  Avatar: random(1, 34),
  confirmations: 1,
  conf2: 1,
  conf3: 0,
  conf4: 1,
  conf5: 1,
  NCore: 0,
  Leader: 0,
  LastEscape: 0,
  MaxScore: 350,
  MissionsCompleted: [],
  Location: 0,
  PlayTime: 0,
  MissionStarted: [false, 0, 0, 0], //TOGGLE, MISSION ID, PROGRESSION, OBTAINED REWARD
  FNMission: 0,
  DefeatedByLocation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  FP: 0,
  ATR: [0, 0, 0, 0, 0, 0],
  TotalMissions: 0,
};
var Missions = {
  0: ["White Light", 'You woke up in an unknown world where a white light dazzles you..<br> this place seems weird, you want to leave it as quick as possible.', 1, 1, 10, 200, 0, 1, 0, -1],
  1: ["Lost Path", 'You discovered a little path hidden in the shadows<br> and decided to explore it in the hope of finding informations to return in your world.', 4, 1, 10, 250, 0, 2000, 1, 0],
  2: ["Shadow Forest", 'You arrive at the end of the path and now enter a dark forest..<br>There seems to be light in the distance.', 7, 1, 10, 500, 0, 2000, 2, 1],
  3: ["Galarius City", 'You reach a city with a lot of different races.<br>You can see humans, elves and even dwarves.<br>Maybe you will find help here or just someone that can explain you how to get back to your world.', 9, 1, 10, 750, 0, 5000, 3, 2],
  4: ["Endless mountain", 'One of the locals advises you to go north and reach the royal capital through the mountains..<br> So here you are in the so called endless mountain.', 12, 1, 10, 1000, 0, 5000, 4, 3],
  5: ["Dark Cave", 'You arrive at the entrance of a dark cave,<br> it seems narrow but it is much faster and less dangerous than the mountain.', 15, 1, 10, 1500, 0, 7000, 5, 4],
  6: ["Empire Road", 'You finally reached the end of this cave, tired but in one piece,<br> you can already see a big city at the end of the road..', 19, 1, 10, 2500, 0, 7000, 6, 5],
  7: ["Imperium City", 'You\'re now in the Capital, the king heard about your story and asked for an immediate hearing.', 22, 1, 10, 3000, 0, 7000, 7, 6],
  8: ["Central V", 'You discuss with the king to find a way to return to your world..<br>He tells you that the only way is the Red Portal but suddenly..<br> The city is attacked by the demon army, you need to get out of here quick.', 25, 1, 10, 5000, 0, 8500, 8, 7],
  9: ["The Red Portal", 'The red portal is near and it seems that the portal is really hot.. Burning like the hells gate. But you do not really have any other choice.', 27, 1, 10, 7500, 0, 8500, 9, 8],
  10: ["Corrupted World", 'You have successfully passed the portal.. but where are you now ?', 29, 1, 10, 10000, 0, 8500, 10, 9],
  11: ["Corrupted Fortress", 'You see a huge fortress with nothing good inside, you must clean this place.', 30, 2, 10, 0, 0, 9500, 11, 10],
  12: ["Corrupted Fortress - Basement", 'There is a door in the fortress which leads to another level, clean this place too.', 30, 2, 25, 0, 2, 9500, 11, 11],
  13: ["Corrupted Fortress - Core", 'This is the last floor, the Core of the Fortress, where the corruption started.. Destroy it.', 30, 2, 50, 1, 0, 9500, 11, 12],
  14: ["The Black Portal", 'Just after you destroyed the fortress core, another portal appeared..<br><br> A new story begins.', 30, 1, 10, 15000, 0, 9500, 12, 11],
  15: ["The Black Portal 2", 'The passage becomes darker and darker, you keep moving forward and perceive a light in the distance..', 30, 1, 10, 20000, 0, 9500, 12, 14],
  16: ["Light of Elysia", 'You\'ve just landed in a new world, in the city of Elysia. This world seems really beautiful, and so you decide to explore it.', 31, 1, 10, 25000, 0, 9500, 13, 15],
  17: ["Red Moon at Elysia", 'The city really is lively and in this world there are only humans and so far peace reigns, you decide to visit a bit the city this night, after all ..<br> This city is really big. Suddenly you hear a cry, you go to that shout and in the shadow of an alley you see a man sucking the blood of a woman.. a vampire is right there.', 31, 1, 10, 50000, 0, 9500, 13, 16],
  18: ["Vampire Manor", 'One of the vampires to confess the location of a vampire hideout, you will surely find informations there.', 32, 1, 10, 75000, 0, 9500, 14, 17],
  19: ["Funeral Chamber of the Manor", 'It seems to be the right place, it\'s full of vampires and one of them emits a strong power.', 32, 1, 10, 100000, 0, 9500, 14, 18],
  20: ["The New World", 'The city is now in peace, you follow the Red River to continue the exploration of this new world.', 33, 1, 10, 125000, 0, 9500, 15, 19],
  21: ["The Red River", 'During your daily hunt you find a merchant who keeps saying that the vampire attack in the city was only the beginning.<br> He also tells you that a rumor says that the castle is hidden in the mountains.<br> You will investigate on the spot to finally lead a quiet life', 33, 1, 10, 150000, 0, 9500, 15, 20],
  22: ["The mountains", "After searching for 5 days in the mountains, you find a bridge filled with corpses ..<br>Without any hesitation you enter the territory of vampires.", 34, 1, 10, 175000, 0, 9500, 16, 21],
  23: ["The Immortal Bridge", "These vampires seems a more difficult to kill than the ones in the city but you keep fighting and see a huge castle at the end of the bridge.", 34, 1, 10, 175000, 0, 9500, 16, 22],
  24: ["Vampire Castle", 'This is it, the Vampire Castle.<br>Now that you have arrived here you take the opportunity to clean the castle.', 35, 2, 10, 0, 0, 9500, 11, 23],
  25: ["Vampire Castle - Tower", 'You discover that one of the tower of the castle held prisoners, you must go and save them all.', 35, 2, 25, 1, 2, 9850, 11, 24],
  26: ["Vampire Castle - Core", 'You have reached the heart of the castle, by destroying the heart, the world will finally be at peace.<br> But before this happy end, you will need to kill the remaining vampires.', 35, 2, 50, 2, 0, 9850, 11, 25],
  //NAME, DESC, LEVEL, TYPE, REQ KILLS, EXP, REWARD TYPE, QUALITY, LOCATION, REQ MISSION
};
var Ennemies = {
  0: ["White Spirit", "Black Spirit"],
  1: ["Beautiful Fairy", "Aggressive Fairy", "Powerful Fairy", "Guardian Fairy", "Old Fairy"],
  2: ["Angry Wolf", "Baby Wolf", "Wolf", "Bear", "Huge Bear"],
  3: ["Thief", "Pickpocket", "Big Rat", "Assassin"],
  4: ["Harpy", "Troll", "Rattlesnake", "Hawk"],
  5: ["Cyclops", "Bat", "Goblin", "Slime"],
  6: ["Spider", "Snake", "Chimera", "Centaur"],
  7: ["Demonized Citizen", "Assassin", "Demonized Guard", "Vampire"],
  8: ["Slow Zombie", "Zombie", "Sleeping Zombie", "Baby Zombie"],
  9: ["Salamander", "Phoenix", "Hellhound", "Firebird"],
  10: ["Corrupted Demon", "Corrupted Goblin", "Corrupted Orc", "Corrupted Zombie"],
  11: ["Corrupted Goblin", "Corrupted Demon", "Corrupted Zombie", "Corrupted Ghost"],
  12: ["Elysian Guard", "Drunk Elysian Guard", "Angry Elysian Guard", "Patrolling Elysian Guard"],
  13: ["Lesser Vampire", "Thirsty Lesser Vampire", "Angry Lesser Vampire", "Bloody Lesser Vampire"],
  14: ["Higher Vampire", "Noble Vampire", "Angry Noble Vampire", "Bloody Higher Vampire"],
  15: ["Squirrel", "Boar", "Deer", "Salmon", "Carp"],
  16: ["Vampire Guard", "Vampire Knight", "Higher Vampire", "Noble Vampire"],
  17: ["Pure Blood Vampire", "Noble Vampire", "Vampire Knight", "Vampire Count"],
};

var BossNames = ['Pure Spirit', 'Fairy Queen', 'Ancestral Bear', 'Wanted Criminal', 'Yeti', 'Rat Snake', 'Cerberus', 'Demon Lord', 'Ghoul', 'Dragon', 'Ifrit', 'Demon Lord', 'Devil', 'Captain of the Elysian Guard', 'Higher Vampire', "Pure Blood Vampire", "Crocodile", "Commander of the Vampire Knights", "Dhampir King"];

var POS = {
  0: ["The White Light", 1, 4, 0, 0], //NAME, MINLEVEL, MAXLEVEL, MAX DROP QUALITY, MISSION COMPLETE
  1: ["The Lost Path", 4, 7, 1, 1],
  2: ["The Shadow Forest", 7, 9, 1, 2],
  3: ["Galarius City", 9, 12, 2, 3],
  4: ["The Endless Mountain", 12, 15, 2, 4],
  5: ["The Dark Cave", 15, 19, 3, 5],
  6: ["Empire Road", 19, 22, 3, 6],
  7: ["Imperium City", 22, 25, 3, 7],
  8: ["Central V", 25, 27, 4, 8],
  9: ["The Red Portal", 27, 29, 4, 9],
  10: ["The Corrupted World", 29, 30, 4, 10],
  11: ["The Corrupted Fortress", 29, 30, 5, 10],
  12: ["The Black Portal", 30, 31, 5, 14],
  13: ["Elysia City", 31, 32, 5, 14],
  14: ["Vampire Manor", 32, 33, 5, 20],
  15: ["The Red River", 33, 34, 5, 20],
  16: ["The Immortal Bridge", 34, 35, 5, 20],
  17: ["Vampire Castle", 35, 35, 5, 20],
};

(function () {
  ResetTheme(0);
  if (localStorage.getItem("Matrix2") != null) {
    load();
  }
  if (localStorage.getItem("Matrix2-Backup") != null) {
    loadBackup();
  }
  if (Game.username != "Default") {
    $("#menu").show();
    $('.ui.sidebar').sidebar({ dimPage: false, mobileTransition: 'scale down', transition: 'scale down' }).sidebar('hide');
    $("#sidebar-btn").on("click", function () { $('.ui.sidebar').sidebar('toggle'); $("#guild-btn").hide(); $(".brand-logo").hide(); });
    $("#CATEGORIE-1").show();
    $("#begin").hide();
    UpdateGame();
    SendStats();
  }
  if (Game.isInFight == 2) {
    Game.isInFight = 0;
  }
  //setInterval(draw, 60);
  setInterval(UpdateEngine, 1000);
  setInterval(UpdatePage, 1000 * 60 * 60);
  ClickEvents();
  filter(0);
  $('.ui.accordion').accordion();
  $('.ui.checkbox').checkbox();
  if (Game.ATR[0] == 1) {
    $("#RM1").checkbox("check");
  } else {
    $("#RM1").checkbox("uncheck");
  }
  if (Game.ATR[1] == 1) {
    $("#RM2").checkbox("check");
  } else {
    $("#RM2").checkbox("uncheck");
  }
  if (Game.ATR[2] == 1) {
    $("#RM3").checkbox("check");
  } else {
    $("#RM3").checkbox("uncheck");
  }
  if (Game.ATR[3] == 1) {
    $("#RM4").checkbox("check");
  } else {
    $("#RM4").checkbox("uncheck");
  }
  if (Game.ATR[4] == 1) {
    $("#RM5").checkbox("check");
  } else {
    $("#RM5").checkbox("uncheck");
  }
  if (Game.ATR[5] == 1) {
    $("#RM6").checkbox("check");
  } else {
    $("#RM6").checkbox("uncheck");
  }
  if (Game.conf3 == 1) {
    $("#SkipRewards").checkbox("check");
  } else {
    $("#SkipRewards").checkbox("uncheck");
  }
  if (Game.conf4 == 1) {
    $("#AutoMissions").checkbox("check");
  } else {
    $("#AutoMissions").checkbox("uncheck");
  }
  if (Game.conf5 == 1) {
    $("#OnlyMyVersion").checkbox("check");
  } else {
    $("#OnlyMyVersion").checkbox("uncheck");
  }
  $("#redNum").val("0");
  $("#greenNum").val("0");
  $("#blueNum").val("0");
  $("#vloader").html("AlphaRPG v" + version);
  ResetLeaderBoard();
  UpdateEngine();
  UpdateUI();
})();

function UpdateEngine() {
  if (loadState < 3) {
    loadState++;
    $("#loading").show();
    $("#main").hide();
    $("#q").hide();
  }
  if (loadState == 3) {
    $("#loading").hide();
    $("#main").show();
    $("#q").show();
    loadState++;
    UpdateGame();
  }
  $("#color-display").css("background-color", "rgb(" + $(red).val() + ", " + $(green).val() + ", " + $(blue).val() + ")");
  if (Game.CoreLife > Game.CoreBaseLife) {
    Game.CoreLife = Game.CoreBaseLife;
    UpdateUI();
  }
  if (Game.isInFight != 2 && Game.CoreLife == null || Game.Ennemy[5] == null) {
    Game.isInFight = 0;
    UpdateGame();
  }
  if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] != 2 && Game.Level > POS[Missions[Game.MissionStarted[1]][8]][2]) {
    Game.Level = POS[Missions[Game.MissionStarted[1]][8]][2];
    UpdateGame();
  }
  if (Game.lastCloudSave < 180) { Game.lastCloudSave++; }
  else { SendStats(); }
  if (Game.LastEscape > 0) { Game.LastEscape--; $("#NextRetreat").html("Next retreat in " + toHHMMSS(Game.LastEscape) + "."); }
  else { $("#NextRetreat").html(""); }
  $("#CloudTimer").html("Last cloud save " + toHHMMSS(Game.lastCloudSave) + " ago, as <span class='vert'>" + Game.username + "</span>.");
  if (Game.xp[0] < 0) { Game.xp[0] = 0; }
  for (UPC = 0; UPC < 4; UPC++) {
    if (Game.MaxUPC[UPC] == undefined) { Game.MaxUPC[UPC] = 0; }
  }
  if (Game.username == null || Game.username == "" || Game.username == " " || Game.username == "_" || Game.username.length < 3) {
    localStorage.clear();
    Backup = "Default";
    Game.username = Backup;
  }
  else { Game.username = Game.username.replace(/[^a-zA-Z0-9]/g, '_'); }
  if (Backup != "Default" && canSave == 1 && Backup != Game.username) { Game.username = Backup; }
  if (Game.xp[2] == undefined) { Game.xp[2] = 1; }
  if (url.match(/mobile/gi)) {
    $("#PlayerID").html("<img class='ui avatar image' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'><span class='text2' style='color:" + Game.Theme[0] + ";'>" + Game.username + "</span>");
    $("#avatar2").html("<img class='' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'>");
    $("#avatar3").html("<img class='' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'>");
    $("#market-btn").attr('style', '');
  } else {
    $("#PlayerID").html("<img class='ui avatar image' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'><span class='text2' style='color:" + Game.Theme[0] + ";'>" + Game.username + "</span>");
    $("#avatar2").html("<img class='' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'>");
    $("#avatar3").html("<img class='' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'>");
    $("#market-btn").attr('style', 'border-right:none;');
  }
  if (Game.Level < 1) {
    Game.Level = 1;
    Game.xp[0] = 0;
  }
  if (Game.Level < Game.MaxLevel && Game.FNMission < Game.TotalMissions) {
    if (Game.xp[0] >= Game.xp[1]) {
      Game.Level++;
    }
  }

  if ($('#combat').is(":visible") && Game.isInFight != 0) {
    Game.isInFight = 1;
    $("#btn-CRW").hide();
    $("#btn-ACT").show();
  }
  if ($('#rewards').is(":visible") && Game.isInFight == 2) {
    $("#btn-CRW").show();
    $("#btn-ACT").hide();
  }
  if (Game.isInFight == 1 && Game.CoreLife <= 0) {
    LoseFight();
  } else {
    if (Game.isInFight == 1 && Game.Ennemy[5] <= 0) {
      WinFight();
    }
  }
  if (Game.Level == 1 && Game.MissionStarted[0] == false && Game.MissionsCompleted[0] == 0 && Game.isInFight != 3) {
    mission(0);
  }
  Game.PlayTime++;
  for (var I in Game.inventory) {
    if (Game.inventory[I].level > Game.Level) { Game.inventory.splice(I, 1); }
    if (I > Game.MaxInv) {
      Game.inventory.splice(I, 1);
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
  var counter = 0;
  for (var M in Missions) { if (Missions[M][3] != 2) { counter++; } }
  Game.TotalMissions = counter;
  if (Game.Simulation > 50) {
    Game.Simulation = 50;
  }
  var divisor = 0;
  Game.MaxLevel = 35;
  Game.MaxScore = (Game.MaxLevel + (Game.Simulation * 5) - 5);
  for (var D = 1; D < 7; D++) {
    if (Game.Defeated[D] == null) {
      Game.Defeated[D] = 0;
    }
  }
  Game.WTMult[0] = 0;
  Game.WTMult[1] = 0;
  for (var R = 1; R < 5; R++) {
    if (Game.RLS[R][2] == 1) {
      Game.WTMult[0] += Game.RLS[R][3];
    } else {
      Game.WTMult[0] += 0;
    }
    if (Game.RLS[R][2] == 2) {
      Game.WTMult[1] += Game.RLS[R][3];
    } else {
      Game.WTMult[1] += 0;
    }
    if (Game.RLS[R][2] == 3) {
      Game.MaxScore += (Game.RLS[R][3] / 10);
    }
  }
  Game.WTMult[2] = (Game.Simulation * 0.03) - 0.03; //EXPMULT
  Game.WTMult[3] = (Game.Simulation * 0.05) + 0.95; //DIFFICULTYMULT
  Backup = Game.username;
  Game.xp[2] = Game.Upgrades[0] * 0.01 + 1;
  Game.PowerMult = Game.Upgrades[1] * 0.01 + 1;
  Game.LifeMult = Game.Upgrades[2] * 0.01 + 1;
  Game.MaxInv = (Game.Simulation * 2) + 18 + (Game.Upgrades[3] * 1);
  if (Game.isInFight == 0) {
    Game.CoreLife = Game.CoreBaseLife;
    GenEnnemy();
  }
  if (Game.Level < Game.MaxLevel && Game.FNMission <= Game.TotalMissions) {

    Game.xp[1] = CalcEXP(Game.Level);

    if (Game.xp[0] > Game.xp[1] && Game.Level == POS[Game.Location][2]) {
      Game.xp[0] = CalcEXP(Game.Level - 1);
    }
    if (Game.xp[0] < CalcEXP(Game.Level - 1) && Game.Level > 1) {
      Game.xp[0] = CalcEXP(Game.Level - 1);
    }
    if (Game.core1[4] > Game.Level) {
      ErrorArmor(1);
    }
    if (Game.core2[4] > Game.Level) {
      ErrorArmor(2);
    }
    if (Game.core3[4] > Game.Level) {
      ErrorArmor(3);
    }
    if (Game.core4[4] > Game.Level) {
      ErrorArmor(4);
    }
  } else {
    Game.xp[1] = 1;
    Game.xp[0] = 1;
    Game.Level = Game.MaxLevel;
    if (Game.core1[4] > Game.MaxScore) {
      ErrorArmor(1);
    }
    if (Game.core2[4] > Game.MaxScore) {
      ErrorArmor(2);
    }
    if (Game.core3[4] > Game.MaxScore) {
      ErrorArmor(3);
    }
    if (Game.core4[4] > Game.MaxScore) {
      ErrorArmor(4);
    }
  }
  if (Game.Level >= 10) {
    Game.cores[2] = true;
  } else {
    Game.cores[2] = false;
  }
  if (Game.Level >= 20) {
    Game.cores[3] = true;
  } else {
    Game.cores[3] = false;
  }
  if (Game.Level >= 30) {
    Game.cores[4] = true;
  } else {
    Game.cores[4] = false;
  }
  Game.CoreBaseLife = 0;
  Game.CorePower = 0;
  Game.Ranking = 0;
  for (core = 1; core < 5; core++) {
    if (core == 1 && Game.cores[1] == true) {
      Game.CorePower += Game.core1[3];
      Game.CoreBaseLife += Game.core1[2];
      Game.Ranking += Game.core1[4];
      divisor++;
      if (Game.core1[5] == undefined) {
        Game.core1[5] = 0;
      }
    }
    if (core == 2 && Game.cores[2] == true) {
      Game.CorePower += Game.core2[3];
      Game.CoreBaseLife += Game.core2[2];
      Game.Ranking += Game.core2[4];
      divisor++;
      if (Game.core2[5] == undefined) {
        Game.core2[5] = 0;
      }
    }
    if (core == 3 && Game.cores[3] == true) {
      Game.CorePower += Game.core3[3];
      Game.CoreBaseLife += Game.core3[2];
      Game.Ranking += Game.core3[4];
      divisor++;
      if (Game.core3[5] == undefined) {
        Game.core3[5] = 0;
      }
    }
    if (core == 4 && Game.cores[4] == true) {
      Game.CorePower += Game.core4[3];
      Game.CoreBaseLife += Game.core4[2];
      Game.Ranking += Game.core4[4];
      divisor++;
      if (Game.core4[5] == undefined) {
        Game.core4[5] = 0;
      }
    }
  }
  if (Game.MissionStarted[0] == false && Game.conf4 == 1 && Game.Level >= POS[Game.Location][2] && Game.username != "Default" && loadState >= 3) {
    for (M in Missions) {
      if (Game.FNMission < Game.TotalMissions && Game.Level >= Missions[M][2] && Game.MissionsCompleted[M] == 0) {
        if (Game.MissionsCompleted[Missions[M][9]] == 1 || Missions[M][9] == -1) {
          if (Missions[M][3] != 2) {
            mission(M);
          }
        }
      }
    }
  }
  Game.CoreBaseLife = Math.round(Game.CoreBaseLife * (Game.LifeMult + Game.WTMult[1]));
  Game.CorePower = Math.round(Game.CorePower * (Game.PowerMult + Game.WTMult[0]));
  Game.Ranking = Math.floor((Game.Ranking / divisor) * 10);
  for (var M2 in Missions) { if (Game.MissionsCompleted[M2] == null) { Game.MissionsCompleted[M2] = 0; } }
  if (Game.MissionStarted[0] == true) { Game.Location = Missions[Game.MissionStarted[1]][8]; }
  if (Game.isInFight != 2) { CompleteMission(); }
  for (var IV in Game.inventory) {
    if (Game.Level < 10) {
      if (Game.inventory[IV].class == 'Uncommon' || Game.inventory[IV].class == 'Rare' || Game.inventory[IV].class == 'Epic' || Game.inventory[IV].class == 'Exotic' || Game.inventory[IV].class == 'Divine') { RemoveItem(IV); }
    }
    if (Game.Level < 15) {
      if (Game.inventory[IV].class == 'Rare' || Game.inventory[IV].class == 'Epic' || Game.inventory[IV].class == 'Exotic' || Game.inventory[IV].class == 'Divine') { RemoveItem(IV); }
    }
    if (Game.Level < 20) {
      if (Game.inventory[IV].class == 'Epic' || Game.inventory[IV].class == 'Exotic' || Game.inventory[IV].class == 'Divine') { RemoveItem(IV); }
    }
    if (Game.Level < 30) {
      if (Game.inventory[IV].class == 'Exotic' || Game.inventory[IV].class == 'Divine') { RemoveItem(IV); }
    }

    if (Game.inventory[IV].id == 0) {
      RemoveItem(IV);
    }
    if (IV >= Game.MaxInv) { RemoveItem(IV); }
    if (Game.inventory[IV] != undefined) {
      if (Game.ATR[0] == 1 && Game.inventory[IV].class == "Normal") {
        RemoveItem(IV);
      }
    }
    if (Game.inventory[IV] != undefined) {
      if (Game.ATR[1] == 1 && Game.inventory[IV].class == "Common") {
        RemoveItem(IV);
      }
    }
    if (Game.inventory[IV] != undefined) {
      if (Game.ATR[2] == 1 && Game.inventory[IV].class == "Uncommon") {
        RemoveItem(IV);
      }
    }
    if (Game.inventory[IV] != undefined) {
      if (Game.ATR[3] == 1 && Game.inventory[IV].class == "Rare") {
        RemoveItem(IV);
      }
    }
    if (Game.inventory[IV] != undefined) {
      if (Game.ATR[4] == 1 && Game.inventory[IV].class == "Epic") {
        RemoveItem(IV);
      }
    }
    if (Game.inventory[IV] != undefined) {
      if (Game.ATR[5] == 1 && Game.inventory[IV].class == "Exotic") {
        RemoveItem(IV);
      }
    }
  }
  if (Game.MissionStarted[0] == false) {
    if (Game.Location == 11 || Game.Location == 17) { Game.Location--; }
  }
  if ($('#inventory').is(":visible") && Game.isInFight != 0) {
    Game.isInFight = 16;
  }
  UpdateUI();
  save();
}

function UpdateUI() {
  document.title = "AlphaRPG";
  if (((Game.xp[2] + Game.WTMult[2]) - Math.floor(Game.xp[2] + Game.WTMult[2])) < 1) {
    $("#XPMULTVAL").html("+" + Game.Upgrades[0] + "%");
  } else {
    $("#XPMULTVAL").html("+" + Game.Upgrades[0] + "%");
  }
  if (((Game.PowerMult + Game.WTMult[0]) - Math.floor(Game.PowerMult + Game.WTMult[0])) < 1) {
    $("#POWERMULTVAL").html("+" + Game.Upgrades[1] + "%");
  } else {
    $("#POWERMULTVAL").html("+" + Game.Upgrades[1] + "%");
  }
  if (((Game.LifeMult + Game.WTMult[1]) - Math.floor(Game.LifeMult + Game.WTMult[1])) < 1) {
    $("#LIFEMULTVAL").html("+" + Game.Upgrades[2] + "%");
  } else {
    $("#LIFEMULTVAL").html("+" + Game.Upgrades[2] + "%");
  }
  $("#INVUPGVAL").html(Game.MaxInv);
  $("#ShardsNumber").html("<i class='bleu dna icon'></i>" + fix(Game.Shards, 7) + "</span> Fragments");
  if (Game.username == "Default") {
    $("#menu").hide();
    $("#CATEGORIE-1").hide();
    $("#begin").show();
    Game.isInFight = 3;
  }
  $("#PlayerXP").progress({ percent: GetEXPPercent() });
  $("#EXPProgress").html(fix(GetEXPPercent(), 7) + "%");
  if (Game.Simulation > 1) {
    WTText = "Dimension <i class='globe icon'></i> " + Game.Simulation + "<br>";
  } else { WTText = ""; }
  if (Game.Shards >= 3) { $("#SHARDSRW").html("<i class='bleu dna icon'></i><span class='bleu'>" + fix(Game.Shards, 7) + "</span> dimensional fragments available."); } else { $("#SHARDSRW").html(""); }
  if (Game.MaxLevel > Game.Level || Game.FNMission < Game.TotalMissions) {
    $("#DimensionID").html(WTText);
    $("#PlayerLevel").html("Level " + fix(Game.Level, 4));
    $("#PlayerXP").show();
    $("#capacity").html("<span class='vert bold'>" + fix(Game.xp[0], 3) + "</span>/" + fix(Game.xp[1], 3) + " EXP");
  } else {
    $("#DimensionID").html(WTText);
    $("#PlayerLevel").html("Score <i class='gem icon'></i> " + fix(Game.Ranking, 4));
  }
  if (Game.Level >= Game.MaxLevel) {
    $("#PlayerXP").hide();
    $("#capacity").html("");
  }
  if (Game.Level >= Game.MaxLevel && Game.Ranking >= (((30 + (Game.Simulation * 5)) * 10) - 5) && Game.FNMission >= Game.TotalMissions) {
    $("#WTBTN").show();
    $("#WTUNLOCK").html("<span class='ShadowReset vert'>Dimension <i class='globe icon'></i>" + (Game.Simulation + 1) + " available.");
  } else {
    $("#WTBTN").hide();
    $("#WTUNLOCK").html("");
  }
  var XPMCOL = GetMultPrice(0) > Game.Shards ? "rouge" : "green";
  var POWMCOL = GetMultPrice(1) > Game.Shards ? "rouge" : "green";
  var LIFEMCOL = GetMultPrice(2) > Game.Shards ? "rouge" : "green";
  var INVCOL = GetMultPrice(3) > Game.Shards ? "rouge" : "green";
  $("#XPMULTPRICE").html("<span class='" + XPMCOL + "'>" + GetMultPrice(0) + "<i class='dna icon'></i></span>");
  $("#POWERMULTPRICE").html("<span class='" + POWMCOL + "'>" + GetMultPrice(1) + "<i class='dna icon'></i></span>");
  $("#LIFEMULTPRICE").html("<span class='" + LIFEMCOL + "'>" + GetMultPrice(2) + "<i class='dna icon'></i></span>");
  $("#INVUPGPRICE").html("<span class='" + INVCOL + "'>" + GetMultPrice(3) + "<i class='dna icon'></i></span>");
  var shards = Game.Level < Game.MaxLevel ? "0" : Math.round(Game.Ranking / 10 / 5 - 6);
  var completedstory = Game.FNMission == Game.TotalMissions ? "<span class='vert'>Yes</span>" : "<span class='rouge'>No</span>";
  $("#WTShards").html("Score Required : <span class='vert'><i class='gem icon'></i>" + (((30 + (Game.Simulation * 5)) * 10) - 5) + "</span><br>Story completed : " + completedstory + "<br>Fragments reward : <span class='vert'>" + shards + "<i class='dna icon'></i></span>");
  $("#CurrWT").html("Current Dimension : <span class='vert'><i class='globe icon'></i>" + Game.Simulation + "</span>");
  $("#Defeat1").html(fix(Game.Defeated[1], 5));
  $("#Defeat2").html(fix(Game.Defeated[2], 5));
  $("#Defeat3").html(fix(Game.Defeated[3], 5));
  $("#Defeat4").html(fix(Game.Defeated[4], 5));
  $("#Defeat5").html(fix(Game.Defeated[5], 5));
  $("#Defeat6").html(fix(Game.Defeated[6], 5));
  $("#Defeat7").html(fix(Game.Defeated[7], 5));
  if (Game.confirmations == 1) {
    $("#AlertToggle").checkbox("check");
  } else {
    $("#AlertToggle").checkbox("uncheck");
  }
  if (Game.conf2 == 1) {
    $("#AlertToggle2").checkbox("check");
  } else {
    $("#AlertToggle2").checkbox("uncheck");
  }
  $("#TOPNEXT").html("PAGE " + (PAGE + 1) + " <i class='large arrow alternate circle right outline icon'></i>");
  $("#TOP10").html("TOP 10");
  $("#TOPPREVIOUS").html("<i class='large arrow alternate circle left outline icon'></i> PAGE " + (PAGE - 1) + "");
  if (MAXVIEW + 1 <= LastId) {
    $("#TOPNEXT").attr('class', 'ui rainbow5 button');
  } else {
    $("#TOPNEXT").attr('class', 'ui rainbow5 button dis');
  }
  if (PAGE == 1) {
    $("#TOPPREVIOUS").attr('class', 'ui rainbow5 button dis');
  } else {
    $("#TOPPREVIOUS").attr('class', 'ui rainbow5 button');
  }
  $("#namestat").html("<img class='ui avatar image' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'><span style='color:" + Game.Theme[0] + ";'>" + Game.username + "</span>");
  $("#playtimestat").html(toHHMMSS(Game.PlayTime));
  $("#Killstat").html(Game.Wins);
  $("#Deathstat").html(Game.Loses);
  $("#Levelstat").html("<span class='vert'>" + fix(Game.Level, 4) + "</span>/" + Game.MaxLevel);
  $("#Scorestat").html("<span class='vert'><i class='small gem icon'></i>" + fix(Game.Ranking, 4) + "</span>/" + (Game.MaxScore * 10));
  $("#Difficultystat").html(fix(Game.WTMult[3], 9));
  $("#Rankstat").html(Game.Leader + "/" + LastId);
  $("#Ratiostat").html(fix(Game.Wins / (Game.Loses + 1), 7));
  $("#Versionstat").html("v" + version);
  $("#fortressstat").html(Game.FP);
  $("#lifestat").html(fix(Math.round(Game.CoreBaseLife / (Game.LifeMult + Game.WTMult[1])), 3) + "<i class='red heart icon'></i> (+" + fix(Game.CoreBaseLife - Math.round(Game.CoreBaseLife / (Game.LifeMult + Game.WTMult[1])), 3) + ")");
  $("#powerstat").html(fix(Math.round(Game.CorePower / (Game.PowerMult + Game.WTMult[0])), 3) + "<i class='blue crosshairs icon'></i> (+" + fix(Game.CorePower - Math.round(Game.CorePower / (Game.PowerMult + Game.WTMult[0])), 3) + ")");
  $("#core1stat").html("" + (Game.core1[2] - Game.core1K[1]) + "(+" + Game.core1K[1] + ")<i class='red heart icon'></i> " + (Game.core1[3] - Game.core1K[0]) + "(+" + Game.core1K[0] + ")<i class='blue crosshairs icon'></i>");
  if (Game.cores[2] == true) {
    $("#core2stat").html("" + (Game.core2[2] - Game.core2K[1]) + "(+" + Game.core2K[1] + ")<i class='red heart icon'></i> " + (Game.core2[3] - Game.core2K[0]) + "(+" + Game.core2K[0] + ")<i class='blue crosshairs icon'></i>");
  }
  if (Game.cores[3] == true) {
    $("#core3stat").html("" + (Game.core3[2] - Game.core3K[1]) + "(+" + Game.core3K[1] + ")<i class='red heart icon'></i> " + (Game.core3[3] - Game.core3K[0]) + "(+" + Game.core3K[0] + ")<i class='blue crosshairs icon'></i>");
  }
  if (Game.cores[4] == true) {
    $("#core4stat").html("" + (Game.core4[2] - Game.core4K[1]) + "(+" + Game.core4K[1] + ")<i class='red heart icon'></i> " + (Game.core4[3] - Game.core4K[0]) + "(+" + Game.core4K[0] + ")<i class='blue crosshairs icon'></i>");
  }
  if (((Game.Level - 5) * 10) >= Game.Ranking) {
    $("#LowScore").html("Using low level armor, upgrade your equipment.");
  } else {
    $("#LowScore").html("");
  }
  var CompletedMissions = 0;
  for (var M in Missions) {
    if (Missions[M][3] != 2) {
      if (Game.MissionsCompleted[M] == 1) {
        CompletedMissions++;
      }
    }
  }
  if (Game.isInFight != 2 || Game.isInFight != 3) {
    Game.FNMission = CompletedMissions;
  }
  var MTEXT = "";
  var hori = "";
  if (url.match(/mobile/gi)) {
    MTEXT = "";
    hori = "";
  } else {
    MTEXT = " <span class='desc'>(Escape)</span>";
    hori = "horizontal";
  }
  if (Game.MissionStarted[0] == true) {
    if (Game.isInFight == 1) {
      $("#btn-CRW").hide();
      $("#btn-ACT").show();
      $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Menu" + MTEXT);
    }
    if (Missions[Game.MissionStarted[1]][3] == 1) {
      $("#MDTL").html("Mission<div class='detail'>Defeat <span class='vert'>" + (Missions[Game.MissionStarted[1]][4] - Game.MissionStarted[2]) + "</span> enemies in <span class='vert'>" + POS[Missions[Game.MissionStarted[1]][8]][0] + "</span>.</div>");
    }
    if (Missions[Game.MissionStarted[1]][3] == 2) {
      $("#MDTL").html("Fortress<div class='detail'>Clear <span class='vert'>" + POS[Missions[Game.MissionStarted[1]][8]][0] + "</span> (" + (Missions[Game.MissionStarted[1]][4] - Game.MissionStarted[2]) + " left).</div>");
    }
  } else {
    if (Game.isInFight == 1) {
      $("#btn-CRW").hide();
      $("#btn-ACT").show();
      $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Menu" + MTEXT);
    }
    $("#MDTL").html("Exploration<div class='detail'> <span class='vert'>" + POS[Game.Location][0] + "</span></div>");
  }
  if ($('#combat').is(":visible")) {
    $("#rewards").hide();
  }
  if ($('#inventory').is(":visible")) {
    $("#gotomenu-btn").html("<i class='angle left icon ICR'></i>Inventory " + (Game.inventory.length) + "/" + Game.MaxInv + MTEXT);
  }
  $("#mcount").html(CompletedMissions + "/" + Game.TotalMissions + " Missions completed.");
  if (Game.Level >= POS[Game.Location][2] && Game.MaxLevel > Game.Level && Game.FNMission <= Game.TotalMissions && Game.MissionStarted[0] == false) {
    $("#MaxPOSLVL").html("You\'ve reached the maximum level in this area, check the available missions.");
  } else {
    $("#MaxPOSLVL").html("");
  }
  if (Game.isInFight == 1) {
    $("#cores").show();
  }
  for (var L in POS) {
    $("#defeatloc" + L).html("<div class='ui " + hori + " segments'><div class='ui segment left aligned'>" + POS[L][0] + "</div><div class='ui segment right aligned'>" + fix(Game.DefeatedByLocation[L], 3) + " Defeated</div></div><div class='ui fitted inverted divider'></div>");
  }
  if ($('#inventory').is(":visible")) {
    $("#rewards").hide();
    $("#combat").hide();
  }
  UpdateCombat();
  Shortcuts();
  GenCores();
  GenInventory();
  ResetTheme(2);
}

function GenInventory() {
  $("#inv1").html("");
  $("#inv2").html("");
  $("#inv3").html("");

  for (var IV in Game.inventory) {
    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      TIER = "Level";
      TIERRANK = Game.inventory[IV].level;
    } else {
      TIER = "Score";
      TIERRANK = "<i class='gem icon'></i>" + Math.floor(Game.inventory[IV].level * 10);
    }
    BTN = "<div class='ui right floated vertical buttons'><div onclick='EquipItem(" + IV + ", " + Game.inventory[IV].id + ")' class='green ui button'>Equip</div><div onclick='RemoveItem(" + IV + ")' class='red ui button'>Remove</div></div>";

    if (Game.inventory[IV].id == 1) { //SHOW CORE IN INVENTORY
      var UPS = Game.inventory[IV].ups > 0 ? " " + (Game.inventory[IV].ups) + "<i class='key icon'></i>" : "";
      $("#inv1").append("<div class='ui gren segment'>" + BTN + "<div class='invL'>" + TIER + "<br>" + TIERRANK + "</div>" + Game.inventory[IV].name + UPS + "<br><span class='" + (Game.inventory[IV].class) + "' id='" + IV + "'> " + (Game.inventory[IV].class) + "</span><br>" + (Game.inventory[IV].life) + "<i class='red heart icon'></i> " + (Game.inventory[IV].power) + "<i class='blue crosshairs icon'></i></div><br>");
    }

    if (Game.inventory[IV].id == 2) { //SHOW KEY IN INVENTORY 
      var BONUS = Game.inventory[IV].object == 1 ? Game.inventory[IV].life + "<i class='red heart icon'></i>" : Game.inventory[IV].power + "<i class='blue crosshairs icon'></i>";
      $("#inv2").append("<div class='ui gren segment'>" + BTN + "<span class='" + (Game.inventory[IV].class) + "' id='" + IV + "'> " + (Game.inventory[IV].class) + "</span><br> " + Game.inventory[IV].name + "<br>" + BONUS + "</div><br>");
    }

    if (Game.inventory[IV].id == 3) { //SHOW RELIC IN INVENTORY
      if (Game.inventory[IV].object == 0) {
        DESC = "-";
      }
      if (Game.inventory[IV].object == 1) {
        DESC = "Power bonus of " + fix(Game.inventory[IV].bonus, 9);
      }
      if (Game.inventory[IV].object == 2) {
        DESC = "Life bonus of " + fix(Game.inventory[IV].bonus, 9);
      }
      if (Game.inventory[IV].object == 3) {
        DESC = "Max Score increased by " + fix(Game.inventory[IV].bonus, 3);
      }
      if (Game.inventory[IV].object == 4) {
        if (Game.inventory[IV].bonus == 1) {
          DESCT = "<span class='Normal'>Normal</span>";
        }
        if (Game.inventory[IV].bonus == 2000) {
          DESCT = "<span class='Common'>Common</span>";
        }
        if (Game.inventory[IV].bonus == 5000) {
          DESCT = "<span class='Uncommon'>Uncommon</span>";
        }
        if (Game.inventory[IV].bonus == 7000) {
          DESCT = "<span class='Rare'>Rare</span>";
        }
        if (Game.inventory[IV].bonus == 8500) {
          DESCT = "<span class='Epic'>Epic</span>";
        }
        if (Game.inventory[IV].bonus == 9500) {
          DESCT = "<span class='Exotic'>Exotic</span>";
        }
        if (Game.inventory[IV].bonus == 9850) {
          DESCT = "<span class='Divine'>Divine</span>";
        }
        DESC = "Minimal drop quality " + DESCT;
      }
      $("#inv3").append("<div class='ui gren segment'>" + BTN + Game.inventory[IV].name + "<br><span class='" + (Game.inventory[IV].class) + "' id='" + IV + "'> " + (Game.inventory[IV].class) + "</span><br>" + DESC + "</div><br>");
    }
  }
}

function EquipItem(id, type) {
  if (type == 1) {
    var CoreButton1 = Game.cores[1] == true ? "<div onClick='NewCore(1, " + id + ");' class='ui rainbow button'>Install armor 1</div>" : "";
    var CoreButton2 = Game.cores[2] == true ? "<div onClick='NewCore(2, " + id + ");' class='ui rainbow button'>Install armor 2</div>" : "";
    var CoreButton3 = Game.cores[3] == true ? "<div onClick='NewCore(3, " + id + ");' class='ui rainbow button'>Install armor 3</div>" : "";
    var CoreButton4 = Game.cores[4] == true ? "<div onClick='NewCore(4, " + id + ");' class='ui rainbow button'>Install armor 4</div>" : "";
    showmessage("Select an Armor Slot", "<div class='fluid vertical ui buttons'>" + CoreButton1 + CoreButton2 + CoreButton3 + CoreButton4 + "</div>");
  }

  if (type == 2) {
    var CB1B = Game.cores[1] == true ? "<div onClick='UPCore(1, " + Game.inventory[id].object + ", " + id + ");' class='ui rainbow button'>Upgrade armor 1</div>" : "";
    var CB2B = Game.cores[2] == true ? "<div onClick='UPCore(2, " + Game.inventory[id].object + ", " + id + ");' class='ui rainbow button'>Upgrade armor 2</div>" : "";
    var CB3B = Game.cores[3] == true ? "<div onClick='UPCore(3, " + Game.inventory[id].object + ", " + id + ");' class='ui rainbow button'>Upgrade armor 3</div>" : "";
    var CB4B = Game.cores[4] == true ? "<div onClick='UPCore(4, " + Game.inventory[id].object + ", " + id + ");' class='ui rainbow button'>Upgrade armor 4</div>" : "";
    if (Game.core1[5] >= Game.MaxUPC[0] && Game.cores[1] == true) {
      CB1B = "<div class='ui disabled button'>Armor 1 keys full.</div>";
    }
    if (Game.core2[5] >= Game.MaxUPC[1] && Game.cores[2] == true) {
      CB2B = "<div class='ui disabled button'>Armor 2 keys full.</div>";
    }
    if (Game.core3[5] >= Game.MaxUPC[2] && Game.cores[3] == true) {
      CB3B = "<div class='ui disabled button'>Armor 3 keys full.</div>";
    }
    if (Game.core4[5] >= Game.MaxUPC[3] && Game.cores[4] == true) {
      CB4B = "<div class='ui disabled button'>Armor 4 keys full.</div>";
    }
    showmessage("Select an  Armor Slot", "<div class='fluid vertical ui buttons'>" + CB1B + CB2B + CB3B + CB4B + "</div>");
  }

  if (type == 3) {
    os = Game.inventory[id];
    var RLCB1 = Game.cores[1] == true ? "<div onClick='ConfirmRelic(1, " + id + ");' class='ui rainbow button'>Armor 1</div>" : "";
    var RLCB2 = Game.cores[2] == true ? "<div onClick='ConfirmRelic(2, " + id + ");' class='ui rainbow button'>Armor 2</div>" : "";
    var RLCB3 = Game.cores[3] == true ? "<div onClick='ConfirmRelic(3, " + id + ");' class='ui rainbow button'>Armor 3</div>" : "";
    var RLCB4 = Game.cores[4] == true ? "<div onClick='ConfirmRelic(4, " + id + ");' class='ui rainbow button'>Armor 4</div>" : "";
    showmessage("Select a relic slot", "<div class='fluid vertical ui buttons'>" + RLCB1 + RLCB2 + RLCB3 + RLCB4 + "</div>");
  }
  Game.isInFight = 0;
  UpdateGame();
}

function RemoveItem(id) {
  if (id < Game.MaxInv) {
    Game.inventory[id].id = 0;
    if (id >= Game.inventory.length) {
      Game.inventory.splice(id - 1, 1);
    } else {
      Game.inventory.splice(id, 1);
    }
  } else {
    Game.inventory.splice(id, 1);
  }

  UpdateGame();
}

function SendStats() {
  writeUserData(Game.username);
  Game.lastCloudSave = 0;
  UpdateUI();
}

function GetLevelRequired() {
  if (Game.Level >= 1 && Game.Level < 10) {
    value = 10;
  }
  if (Game.Level >= 10 && Game.Level < 20) {
    value = 20;
  }
  if (Game.Level >= 20 && Game.Level < 30) {
    value = 30;
  }
  if (Game.Level >= 30) {
    value = 0;
  }
  return value;
}

function GenCores() {
  var Class = 0;
  for (var UPC = 1; UPC < 5; UPC++) {
    if (UPC == 1) {
      core = "core1";
      coreId = Game.core1;
      RLSid = Game.RLS[1];
    }
    if (UPC == 2) {
      core = "core2";
      coreId = Game.core2;
      RLSid = Game.RLS[2];
    }
    if (UPC == 3) {
      core = "core3";
      coreId = Game.core3;
      RLSid = Game.RLS[3];
    }
    if (UPC == 4) {
      core = "core4";
      coreId = Game.core4;
      RLSid = Game.RLS[4];
    }

    if (coreId[1] == "Normal") {
      Class = "0";
    }
    if (coreId[1] == "Common") {
      Class = "1";
    }
    if (coreId[1] == "Uncommon") {
      Class = "2";
    }
    if (coreId[1] == "Rare") {
      Class = "3";
    }
    if (coreId[1] == "Epic") {
      Class = "4";
    }
    if (coreId[1] == "Exotic") {
      Class = "5";
    }
    if (coreId[1] == "Divine") {
      Class = "6";
    }
    if (coreId[1] == "Error") {
      Class = "E";
    }

    $("#" + core).attr("class", "comment CoreClass" + Class);
    $("#" + core + "-icon").attr("class", "classBar" + Class);
    $("#" + core + "-title").attr("class", "author text");

    var RLSTXT = "TEST" + RLSid[1];
    if (RLSid[2] == 0) {
      RLSTXT = "-";
    }
    if (RLSid[2] == 1) {
      RLSTXT = "Power bonus of " + fix(RLSid[3], 9);
    }
    if (RLSid[2] == 2) {
      RLSTXT = "Life bonus of " + fix(RLSid[3], 9);
    }
    if (RLSid[2] == 3) {
      RLSTXT = "Max Score increased by " + fix(RLSid[3], 3);
    }
    if (RLSid[2] == 4) {
      if (RLSid[3] == 1) {
        DESCT = "<span class='Normal'>Normal</span>";
      }
      if (RLSid[3] == 2000) {
        DESCT = "<span class='Common'>Common</span>";
      }
      if (RLSid[3] == 5000) {
        DESCT = "<span class='Uncommon'>Uncommon</span>";
      }
      if (RLSid[3] == 7000) {
        DESCT = "<span class='Rare'>Rare</span>";
      }
      if (RLSid[3] == 8500) {
        DESCT = "<span class='Epic'>Epic</span>";
      }
      if (RLSid[3] == 9500) {
        DESCT = "<span class='Exotic'>Exotic</span>";
      }
      if (RLSid[3] == 9850) {
        DESCT = "<span class='Divine'>Divine</span>";
      }
      RLSTXT = "Minimal drop quality " + DESCT;
    }


    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      LEVELICON = "Level";
    } else {
      LEVELICON = "Score";
    }
    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      LEVELTEXT = "" + fix(Math.floor(coreId[4]), 4);
    } else {
      LEVELTEXT = "<i class='gem icon'></i>" + fix(Math.floor(coreId[4] * 10), 4);
    }
    $("#GS" + UPC + "T").html(LEVELICON + " " + LEVELTEXT);
    var COREUPC = coreId[5] == Game.MaxUPC[UPC - 1] ? "" : "green";
    var UPCTEXT = Game.MaxUPC[UPC - 1] > 0 ? "<span class='" + COREUPC + "'>" + coreId[5] + "</span>/" + Game.MaxUPC[UPC - 1] + "<i class='key icon'></i>" : "";
    $("#" + core + "-upc").html("");
    $("#" + core + "-text").html(fix(coreId[2], 3) + "<i class='red heart icon'></i> " + fix(coreId[3], 5) + "<i class='blue crosshairs icon'></i>");
    $("#" + core + "-rarity").html(RLSTXT);
    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      $("#" + core + "-title").html(coreId[0] + " " + UPCTEXT + "<br><span class='" + coreId[1] + "'>" + coreId[1] + "</span>");
    } else {
      $("#" + core + "-title").html(coreId[0] + " " + UPCTEXT + "<br><span class='" + coreId[1] + "'>" + coreId[1] + "</span>");
    }
    if (Game.cores[UPC] == false) {
      $("#" + core).hide();
    } else {
      $("#" + core).show();
    }
  }
  if (Game.Level < 30) {
    for (var L = 1; L < 5; L++) {
      if (Game.cores[L] == false) {
        $("#core5-title").attr("class", "author text locked");
        $("#core5-title").html("Next armor unlocked at Lv. " + GetLevelRequired());
        $("#core5-text").html("");
        $("#core5-icon").attr("class", "classBarU");
      }
    }
  } else {
    $("#core5").html("");
  }
}

function UpdateName() {
  NICKNAME = $("#PlayerName").val();
  if (NICKNAME != null) {
    if (NICKNAME == null || NICKNAME == "" || NICKNAME == " " || NICKNAME == "_" || NICKNAME.length < 3 || NICKNAME == "null") {
      ErrorName();
    } else {
      NICKNAME = NICKNAME.replace(/[^a-zA-Z0-9]/g, '_');
      if (NICKNAME == "Neo" || NICKNAME == "NEO" || NICKNAME == "neo" || NICKNAME == "GoldenLys") {
        NICKNAME = "P-" + random(10000, 999999);
      }
      Backup = Game.username = NICKNAME;
      $("#menu").show();
      $("#CATEGORIE-1").show();
      $("#begin").hide();
      save();
      Game.isInFight = 0;
      SendStats();
    }
  } else {
    ErrorName();
  }
}

function ErrorName() {
  $("#namehelp").html("You need to write a username ! (3-16 characters with only numbers and letters)<br>Type 'Neo' to generate one.");
}

//FIGHT ACTIONS

function Protect() {
  HealText = "";
  if (Game.CoreLife < Game.CoreBaseLife) {
    var luck = random(1, 100);
    if (luck <= 15) {
      MINMULT = 65;
      MAXMULT = 75;
    } else {
      MINMULT = 20;
      MAXMULT = 50;
    }
    if (luck >= 85) {
      MINMULT = 0;
      MAXMULT = 0;
    }
    var rRandPlayerHeal = random((Game.CorePower * MINMULT), (Game.CorePower * MAXMULT)) / 100;
    Game.CoreLife = Math.round(Game.CoreLife + rRandPlayerHeal);
    HealText = "You restored <a class='ui circular small label'>+" + fix(rRandPlayerHeal, 4) + "<i class='red heart icon'></i></a> of life.";
    if (rRandPlayerHeal < 1) { HealText = ""; }
  }
  var luck2 = random(1, 100);
  if (luck2 >= 75) {
    MINMULT2 = 0;
    MAXMULT2 = 10;
  } else {
    MINMULT2 = 35;
    MAXMULT2 = 50;
  } //10% ENNEMY ATTACK FAILS 
  var rEnnemyPower = random((Game.Ennemy[3] * MINMULT2), (Game.Ennemy[3] * MAXMULT2)) / 100;
  var DamagesText = "You took <span class='rouge'><a class='ui circular small label'>-" + fix(Math.round(rEnnemyPower), 3) + "<i class='red heart icon'></i></a></span> damages.<br>";
  if (rEnnemyPower < 1) { DamagesText = ""; }
  if (Game.CoreLife >= Game.CoreBaseLife * 0.99) {
    rEnnemyPower = 0;
    DamagesText = "You dodged the attack!";
  }
  Game.CoreLife -= rEnnemyPower;
  if (Game.isInFight == 1 && Game.CoreLife <= 0) { LoseFight(); }
  else { if (Game.isInFight == 1 && Game.Ennemy[5] <= 0) { WinFight(); } }
  if (Game.CoreLife > Game.CoreBaseLife) { Game.CoreLife = Game.CoreBaseLife; }
  $("#EnnemyDesc").html(DamagesText + HealText);
  UpdateGame();
}

function Attack() {
  TEST1 = "<br>";
  TEST2 = "<br>";
  var luck = random(1, 100);
  var rPlayerPower = random((Game.CorePower * 85), Game.CorePower * 100) / 100;
  if (luck <= random(6, 10)) {
    rPlayerPower = Game.CorePower * 1.15;
    TEST1 = "Critical hit of <a class='ui circular small label'>-" + fix(rPlayerPower, 3) + "<i class='red heart icon'></i></a> damages !";
  } else {
    TEST1 = "You did <a class='ui circular small label'>-" + fix(Math.round(rPlayerPower), 3) + "<i class='red heart icon'></i></a> damages.";
  }
  Game.Ennemy[5] = Math.floor(Game.Ennemy[5] - rPlayerPower);

  var rEnnemyPower = random((Game.Ennemy[3] * 65), Game.Ennemy[3] * 100) / 100;
  if (luck >= 90) {
    rEnnemyPower = 0;
    TEST2 = "<br>You dodged the attack!";
  } else {
    TEST2 = "<br>You took <a class='ui circular small label'>-" + fix(Math.round(rEnnemyPower), 3) + "<i class='red heart icon'></i></a> damages.";
  }
  Game.CoreLife -= rEnnemyPower;

  if (Game.isInFight == 1 && Game.CoreLife <= 0) {
    LoseFight();
  } else {
    if (Game.isInFight == 1 && Game.Ennemy[5] <= 0) {
      WinFight();
    }
  }

  $("#EnnemyDesc").html(TEST1 + TEST2);
  UpdateGame();
}

function LaunchEMP() {
  if (Game.Emp > 0) {
    Game.Emp--;
    var luck = random(0, 100);
    MINPOWER = 1.25;
    MAXPOWER = 2;
    if (luck <= 10) {
      MINPOWER = 2;
      MAXPOWER = 2.5;
    }
    var rPlayerPower = random(Game.CorePower * MINPOWER, Game.CorePower * MAXPOWER);
    Game.Ennemy[5] = Math.floor(Game.Ennemy[5] - rPlayerPower);

    var rEnnemyPower = random(0, Game.Ennemy[3]);
    Game.CoreLife -= rEnnemyPower;

    if (Game.isInFight == 1 && Game.CoreLife <= 0) {
      LoseFight();
    } else {
      if (Game.isInFight == 1 && Game.Ennemy[5] <= 0) {
        WinFight();
      }
    }

    $("#EnnemyDesc").html(
      "You did <a class='ui circular small label'>-" + fix(Math.round(rPlayerPower), 5) +
      "<i class='red heart icon'></i></a> damages.<br>You took <a class='ui circular small label'>-" + fix(Math.round(rEnnemyPower), 3) + "<i class='red heart icon'></i></a> damages."
    );
  }
  UpdateGame();
}

function RunAway() {
  if (Game.LastEscape <= 0) {
    Game.LastEscape = 45;
    if (Game.Level <= 25) {
      Game.LastEscape = 35;
    }
    if (Game.Level <= 20) {
      Game.LastEscape = 30;
    }
    if (Game.Level <= 15) {
      Game.LastEscape = 25;
    }
    if (Game.Level <= 10) {
      Game.LastEscape = 20;
    }
    if (Game.Level <= 5) {
      Game.LastEscape = 15;
    }
    Game.CoreLife = Game.CoreBaseLife;
    if (Game.isInFight == 1 && Game.CoreLife <= 0) {
      LoseFight();
    } else {
      if (Game.isInFight == 1 && Game.Ennemy[5] <= 0) {
        WinFight();
      }
    }
    Game.isInFight = 0;
    UpdateGame();
  }
}

//ENNEMY GENERATION FUNCTION

function GenEnnemy() {
  var EnnemyLevel = 1;
  var EnnemyLifeMult = 1;
  var EnnemyPowerMult = 1;
  var BasePower = Game.CorePower / (Game.PowerMult + Game.WTMult[0]);
  if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
    if (Game.Level < 30) {
      LifeMult = [1.5, 2, 2.5, 3.5, 5, 6, 6.5];
      PowerMult = [0.75, 0.85, 1, 1, 1, 1, 1];
      MaxPowerMult = [0.85, 1, 1, 1.10, 1.15, 1.20, 1.25];
    } else {
      LifeMult = [1.5, 2, 2.5, 3.5, 5, 6, 6.5];
      PowerMult = [0.95, 1, 1, 1, 1, 1, 1];
      MaxPowerMult = [1.1, 1.25, 1.35, 1.5, 1.75, 2, 2.5];
    }
  } else {
    LifeMult = [2, 2.75, 3.5, 4, 6, 10, 15];
    PowerMult = [1, 1, 1, 1, 1, 1, 1];
    MaxPowerMult = [1, 1, 1.10, 1.15, 1.20, 1.25, 1.5];
  }

  if (Missions[Game.MissionStarted[1]][3] == 2) {
    LifeMult = [0, 0, 6, 7, 8, 15, random(15, 20)];
    PowerMult = [1, 1, 1, 1, 1, 1, 1];
    MaxPowerMult = [1, 1, 1.1, 1.15, 1.2, 1.25, 1.5];
  }

  TIER = Game.Ranking;
  EChance = random(0, 700);
  if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
    EChance = random(300, 700);
  }
  if (Missions[Game.MissionStarted[1]][3] == 2) {
    if (EChance < 600) {
      EChance = 600;
    }
  }
  if (Game.isInFight == 0) {
    Game.CoreLife = Game.CoreBaseLife;
    $("#EnnemyDesc").html("<br><br>");

    //CLASS NORMAL
    if (EChance >= 0 && EChance < 300) {
      Game.Ennemy[1] = 1;
      EnnemyLifeMult = LifeMult[0];
      EnnemyPowerMult = PowerMult[0];
      EnnemyPowerMultMax = MaxPowerMult[0];
      if (Game.Ranking > 0) {
        EnnemyLevel = random((Game.Ranking * 0.85), Game.Ranking);
      }
      if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
        EnnemyLevel = random(TIER - 5, TIER);
      }
    }

    //CLASS ADVANCED
    if (EChance >= 300 && EChance < 450) {
      Game.Ennemy[1] = 2;
      EnnemyLifeMult = LifeMult[1];
      EnnemyPowerMult = PowerMult[1];
      EnnemyPowerMultMax = MaxPowerMult[1];
      if (Game.Ranking > 0) {
        EnnemyLevel = Game.Ranking;
      }
      if (Game.Ranking > 1) {
        EnnemyLevel = random((Game.Ranking * 0.95), Game.Ranking);
      }
      if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
        EnnemyLevel = random(TIER - 2, TIER + 5);
      }
    }

    //CLASS SUPERIOR
    if (EChance >= 450 && EChance < 600) {
      Game.Ennemy[1] = 3;
      EnnemyLifeMult = LifeMult[2];
      EnnemyPowerMult = PowerMult[2];
      EnnemyPowerMultMax = MaxPowerMult[2];
      if (Game.Ranking > 0) {
        EnnemyLevel = Game.Ranking;
      }
      if (Game.Ranking > 1) {
        EnnemyLevel = random(Game.Ranking, Game.Ranking + 1);
      }
      if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
        EnnemyLevel = random(TIER - 1, TIER + 10);
      }
    }

    //CLASS VETERAN
    if (EChance >= 600 && EChance < 650) {
      Game.Ennemy[1] = 4;
      EnnemyLifeMult = LifeMult[3];
      EnnemyPowerMult = PowerMult[3];
      EnnemyPowerMultMax = MaxPowerMult[3];
      if (Game.Ranking > 0) {
        EnnemyLevel = Game.Ranking;
      }
      if (Game.Ranking > 1) {
        EnnemyLevel = random(Game.Ranking + 1, Game.Ranking + 2);
      }
      if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
        EnnemyLevel = random(TIER + 5, TIER + 15);
      }
      if (Game.Level < 10) {
        EnnemyPowerMult = PowerMult[2];
      }
    }

    //CLASS ELITE
    if (EChance >= 650) {
      Game.Ennemy[1] = 5;
      EnnemyLifeMult = LifeMult[4];
      EnnemyPowerMult = PowerMult[4];
      EnnemyPowerMultMax = MaxPowerMult[4];
      if (Game.Ranking > 0) {
        EnnemyLevel = Game.Ranking;
      }
      if (Game.Ranking > 1) {
        EnnemyLevel = random(Game.Ranking + 2, Game.Ranking + 4);
      }
      if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
        EnnemyLevel = random(TIER + 15, TIER + 30);
      }
      if (Game.Level < 10) {
        EnnemyPowerMult = PowerMult[2];
      }
    }

    if (Game.MissionStarted[2] == Missions[Game.MissionStarted[1]][4] - 1) {
      EChance = 700;
    }

    //CLASS BOSS OR 1:4 GOD
    if (EChance >= 685 && EChance <= 700 && Game.MissionStarted[0] == true) {
      if (Missions[Game.MissionStarted[1]][3] == 2 || Game.MissionStarted[2] > Missions[Game.MissionStarted[1]][4] - 2) {
        Game.Ennemy[1] = 6;
        EnnemyLifeMult = LifeMult[5];
        EnnemyPowerMult = PowerMult[5];
        EnnemyPowerMultMax = MaxPowerMult[5];
        if (Game.Ranking > 0) {
          EnnemyLevel = Game.Ranking + 1;
        }
        if (Game.Ranking > 1) {
          EnnemyLevel = random(Game.Ranking + 4, Game.Ranking + 6);
        }
        if (Game.Level < 10) {
          EnnemyPowerMult = PowerMult[2];
        }
        if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
          EnnemyLevel = random(TIER + 20, TIER + 40);
          randomluck = random(1, 5);
          if (randomluck >= 4) {
            Game.Ennemy[1] = 7;
            EnnemyLifeMult = LifeMult[6];
            EnnemyPowerMult = PowerMult[6];
            EnnemyPowerMultMax = MaxPowerMult[6];
          }
        }
      }
    }
    if (EnnemyLevel < 1) { EnnemyLevel = 1; }
    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      EnnemyLevel = EnnemyLevel / 10;
      if (EnnemyLevel > Game.Level + 20) { EnnemyLevel = Game.Level + 20; }
    } else {
      EnnemyLevel = EnnemyLevel / 10;
      if (EnnemyLevel < POS[Game.Location][1]) {
        EnnemyLevel = POS[Game.Location][1];
      }
      if (EnnemyLevel > POS[Game.Location][2]) {
        EnnemyLevel = POS[Game.Location][2];
      }
    }

    Game.Ennemy[2] = EnnemyLevel;
    Game.isInFight = 1;
    Game.Ennemy[3] = 0;
    Game.Ennemy[4] = 0;
    if (Game.cores[1] == 1) {
      Game.Ennemy[4] += Math.floor(random((EnnemyLevel * 10) * (EnnemyLifeMult * 0.5) + 100, (EnnemyLevel * 10) * (EnnemyLifeMult * 1) + 100));
    }
    if (Game.cores[2] == 1 && EnnemyLevel > 9) {
      Game.Ennemy[4] += Math.floor(random((EnnemyLevel * 10) * (EnnemyLifeMult * 0.5) + 100, (EnnemyLevel * 10) * (EnnemyLifeMult * 1) + 100));
    }
    if (Game.cores[3] == 1 && EnnemyLevel > 19) {
      Game.Ennemy[4] += Math.floor(random((EnnemyLevel * 10) * (EnnemyLifeMult * 0.5) + 100, (EnnemyLevel * 10) * (EnnemyLifeMult * 1) + 100));
    }
    if (Game.cores[4] == 1 && EnnemyLevel > 29) {
      Game.Ennemy[4] += Math.floor(random((EnnemyLevel * 10) * (EnnemyLifeMult * 0.5) + 100, (EnnemyLevel * 10) * (EnnemyLifeMult * 1) + 100));
    }
    Game.Ennemy[3] = random(BasePower * EnnemyPowerMult, BasePower * EnnemyPowerMultMax);
    Game.Ennemy[4] *= Game.WTMult[3];
    Game.Ennemy[5] = Game.Ennemy[4];
    if (Game.Ennemy[1] >= 6) {
      Game.Ennemy[0] = BossNames[Game.Location];
    } else {
      Game.Ennemy[0] = Ennemies[Game.Location][Math.floor(Math.random() * Ennemies[Game.Location].length)];
    }
    UpdateGame();
  }
}
//WIN OR LOSE FIGHT
function WinFight() {
  var CORELOOT = 35;
  var RELICLOOT = 15;
  var KEYLOOT = 45;
  var EMP = "";
  var LEVELUP = "";
  var descos = "";
  var THEREISLOOT = 0;
  $("#rewards-loot").html("");
  if (Game.MissionStarted[0] == false) {
    expGain = (Game.Ennemy[1] * Game.Ennemy[2]) * 10 + (Game.Level * 2.5) * Game.xp[2];
    expGain = random(expGain * 0.85, expGain);
  } else {
    expGain = Game.Ennemy[2] + Game.Level * 15 * Game.xp[2];
    if (Missions[Game.MissionStarted[1]][3] == 2) { expGain = random(expGain * 0.9, expGain * 1.2); }
    else { expGain = random(expGain * 0.9, expGain); }
  }
  if (expGain < 1 || ((Game.Level - 5) * 10) >= Game.Ranking || Game.Level >= POS[Game.Location][2]) { expGain = 0; }
  if (Game.MissionStarted[0] == true && Game.Level >= POS[Missions[Game.MissionStarted[1]][8]][2]) { expGain = 0; }
  Game.Wins++;
  Game.Defeated[Game.Ennemy[1]]++;
  Game.DefeatedByLocation[Game.Location]++;
  if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 1) {
    Game.MissionStarted[2]++;
    CORELOOT = 0; RELICLOOT = 10; KEYLOOT = 10;
  }
  if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 2) {
    Game.MissionStarted[2]++;
    CORELOOT = 25; RELICLOOT = 20; KEYLOOT = 30;
  }
  Game.xp[0] += Math.round(expGain);
  if (Game.Level < Game.MaxLevel) {
    Game.xp[0] += Math.round(expGain);
    if (Game.xp[0] >= Game.xp[1]) {
      Game.Level++;
      LEVELUP = "<br><font class='bleu'>LEVEL UP ! (<span class='blanc'>" + Game.Level + "</span>)</font>";
    }
    UpdateGame();
  }
  var REWARDTEXT = Game.MissionStarted[0] == true ? "" : "Nothing was dropped.";
  //EMP LOOT CHANCE
  var ELOOTCHANCE = random(1, 100);
  EMPCount = random(1, 3);
  if (ELOOTCHANCE <= 25 && Game.Emp < 50) { Game.Emp += EMPCount; EMP = "<br>+<span class='orange'>" + EMPCount + "</span><i class='orange bolt icon'></i>Special Attack"; }

  if (Game.Ennemy[1] >= 6 && Game.MissionStarted[0] == false) { CORELOOT = 1; }
  //CORE LOOT CHANCE
  var LOOTCHANCE1 = random(1, 100);
  if (LOOTCHANCE1 > 0 && LOOTCHANCE1 <= CORELOOT && Game.isInFight != 2) {
    THEREISLOOT++;
    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      if (Game.Level >= Game.Ranking) {
        if (Game.Ennemy[1] == 1) { newItem(0, random(Game.Level - 5, Game.Level + 1), 1); }
        if (Game.Ennemy[1] == 2) { newItem(0, random(Game.Level - 4, Game.Level + 2), 2001); }
        if (Game.Ennemy[1] == 3) { newItem(0, random(Game.Level - 3, Game.Level + 3), 5001); }
        if (Game.Ennemy[1] == 4) { newItem(0, random(Game.Level - 2, Game.Level + 4), 7001); }
        if (Game.Ennemy[1] == 5) { newItem(0, random(Game.Level - 1, Game.Level + 5), 8501); }
        if (Game.Ennemy[1] == 6) { newItem(0, Game.Level, 9501); }
        if (Game.Ennemy[1] == 7) { newItem(0, Game.Level, 9851); }
      }
      else { newItem(0, random(Game.Ranking, Game.Ranking + 2), 1); }
    } else {
      if (Missions[Game.MissionStarted[1]][3] == 2) {
        if (Game.Ennemy[1] >= 1) {
          if (Game.Ennemy[1] == 7) {
            newItem(0, random((Game.Ranking - 10) + Game.Ennemy[1], (Game.Ranking + 5) + Game.Ennemy[1]), 9851);
          } else {
            newItem(0, random((Game.Ranking - 10) + Game.Ennemy[1], (Game.Ranking + 5) + Game.Ennemy[1]), 9501);
          }
        }
      } else {
        if (Game.Ennemy[1] == 1 || Game.Ennemy[1] == 2 || Game.Ennemy[1] == 3 || Game.Ennemy[1] == 4) {
          newItem(0, random((Game.Ranking - 10) + Game.Ennemy[1], (Game.Ranking + 5) + Game.Ennemy[1]), 7001);
        }
        if (Game.Ennemy[1] == 5) {
          newItem(0, random((Game.Ranking - 10) + Game.Ennemy[1], (Game.Ranking + 5) + Game.Ennemy[1]), 8501);
        }
        if (Game.Ennemy[1] == 6) {
          newItem(0, random((Game.Ranking - 10) + Game.Ennemy[1], (Game.Ranking + 5) + Game.Ennemy[1]), 9501);
        }
        if (Game.Ennemy[1] == 7) {
          newItem(0, random((Game.Ranking - 10) + Game.Ennemy[1], (Game.Ranking + 5) + Game.Ennemy[1]), 9851);
        }
      }
    }
    var IF2 = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;
    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      TIER = "Level";
      TIERRANK = Game.inventory[IF2].level;
    } else {
      TIER = "Score";
      TIERRANK = "<i class='gem icon'></i>" + Math.floor(Game.inventory[IF2].level * 10);
    }
    var UPS = Game.inventory[IF2].ups > 0 ? "" + Game.inventory[IF2].ups + "<i class='key icon'></i>" : "";
    if (IF2 < Game.MaxInv) { $("#rewards-loot").append("<div class='ui comments'><div class='comment CoreClass" + Game.inventory[IF2].type + "'><div class='classBar" + Game.inventory[IF2].type + "'></div><div class='statistic GS'><div class='value'>" + TIER + "</div><div class='label'> " + TIERRANK + "</div></div>" + Game.inventory[IF2].name + "<span class='" + Game.inventory[IF2].class + "'> " + UPS + "</span><br><span class='" + Game.inventory[IF2].class + "'> " + Game.inventory[IF2].class + " </span><br> " + fix(Game.inventory[IF2].life, 5) + "<i class='red heart icon'></i> " + fix(Game.inventory[IF2].power, 5) + "<i class='blue crosshairs icon'></i></div></div>"); }
  }
  //RELIC LOOT CHANCE
  var LOOTCHANCE2 = random(0, 100);
  if (LOOTCHANCE2 > 0 && LOOTCHANCE2 <= RELICLOOT && Game.isInFight != 2) {
    THEREISLOOT++;
    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      if (Game.Level > Game.Ranking) {
        if (Game.Ennemy[1] == 1) { NewRelic(1); }
        if (Game.Ennemy[1] == 2) { NewRelic(2001); }
        if (Game.Ennemy[1] == 3) { NewRelic(5001); }
        if (Game.Ennemy[1] == 4) { NewRelic(7001); }
        if (Game.Ennemy[1] == 5) { NewRelic(8501); }
        if (Game.Ennemy[1] == 6) { NewRelic(9501); }
        if (Game.Ennemy[1] == 7) { NewRelic(9850); }
      } else { NewRelic(1); }
    } else {
      if (Missions[Game.MissionStarted[1]][3] == 2) {
        if (Game.Ennemy[1] >= 1) {
          if (Game.Ennemy[1] == 7) { NewRelic(9851); }
          else { NewRelic(9501); }
        }
      } else {
        if (Game.Ennemy[1] == 1 || Game.Ennemy[1] == 2 || Game.Ennemy[1] == 3 || Game.Ennemy[1] == 4) { NewRelic(7001); }
        if (Game.Ennemy[1] == 5) { NewRelic(8501); }
        if (Game.Ennemy[1] == 6) { NewRelic(9501); }
        if (Game.Ennemy[1] == 7) { NewRelic(9851); }
      }
    }
    var IF = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;
    if (Game.inventory[IF].object == 1) { descos = "Power bonus of " + fix(Game.inventory[IF].bonus, 9); }
    if (Game.inventory[IF].object == 2) { descos = "Life bonus of " + fix(Game.inventory[IF].bonus, 9); }
    if (Game.inventory[IF].object == 3) { descos = "Max Score bonus of " + fix(Game.inventory[IF].bonus, 3); }
    if (Game.inventory[IF].object == 4) {
      if (Game.inventory[IF].bonus == 1) { DROPBONUS = "<span class='Normal'>Normal</span>"; }
      if (Game.inventory[IF].bonus == 2000) { DROPBONUS = "<span class='Common'>Common</span>"; }
      if (Game.inventory[IF].bonus == 5000) { DROPBONUS = "<span class='Uncommon'>Uncommon</span>"; }
      if (Game.inventory[IF].bonus == 7000) { DROPBONUS = "<span class='Rare'>Rare</span>"; }
      if (Game.inventory[IF].bonus == 8500) { DROPBONUS = "<span class='Epic'>Epic</span>"; }
      if (Game.inventory[IF].bonus == 9500) { DROPBONUS = "<span class='Exotic'>Exotic</span>"; }
      if (Game.inventory[IF].bonus == 9850) {
        DROPBONUS = "<span class='Divine'>Divine</span>";
      }
      descos = "Minimal drop quality " + DROPBONUS;
    }
    if (IF < Game.MaxInv) { $("#rewards-loot").append("<div class='ui comments'><div class='comment CoreClass" + Game.inventory[IF].type + "'><div class='classBar" + Game.inventory[IF].type + "'></div>" + Game.inventory[IF].name + "<br><span class='" + Game.inventory[IF].class + "'>" + Game.inventory[IF].class + "</span><br>" + descos + "</div></div>"); }
  }
  //KEY LOOT CHANCE
  var LOOTCHANCE3 = random(0, 100);
  if (LOOTCHANCE3 > 0 && LOOTCHANCE3 <= KEYLOOT && Game.Level >= 10 && Game.isInFight != 2) {
    THEREISLOOT++;
    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      if (Game.Ennemy[1] == 1) { newItem(1, null, 100); }
      if (Game.Ennemy[1] == 2) { newItem(1, null, 3001); }
      if (Game.Ennemy[1] == 3) { newItem(1, null, 7501); }
      if (Game.Ennemy[1] == 4) { newItem(1, null, 15001); }
      if (Game.Ennemy[1] == 5) { newItem(1, null, 19501); }
      if (Game.Ennemy[1] == 6) { newItem(1, null, 22501); }
      if (Game.Ennemy[1] == 7) { newItem(1, null, 24001); }
    } else {
      if (Missions[Game.MissionStarted[1]][3] == 2) {
        if (Game.Ennemy[1] >= 1) {
          if (Game.Ennemy[1] == 7) { newItem(1, null, 24001); }
          else { newItem(1, null, 22501); }
        }
      } else {
        if (Game.Ennemy[1] == 1 || Game.Ennemy[1] == 2 || Game.Ennemy[1] == 3) { newItem(1, null, 7501); }
        if (Game.Ennemy[1] == 4) { newItem(1, null, 15001); }
        if (Game.Ennemy[1] == 5) { newItem(1, null, 19501); }
        if (Game.Ennemy[1] == 6) { newItem(1, null, 22501); }
        if (Game.Ennemy[1] == 7) { newItem(1, null, 24001); }
      }
    }
    var IF3 = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length - 1) : Game.MaxInv;
    if (Game.core1[5] >= Game.MaxUPC[0] && Game.cores[1] == true) {
      CoreButton1B = "<div class='ui disabled button'>Armor 1 keys full.</div>";
    }
    if (Game.core2[5] >= Game.MaxUPC[1] && Game.cores[2] == true) {
      CoreButton2B = "<div class='ui disabled button'>Armor 2 keys full.</div>";
    }
    if (Game.core3[5] >= Game.MaxUPC[2] && Game.cores[3] == true) {
      CoreButton3B = "<div class='ui disabled button'>Armor 3 keys full.</div>";
    }
    if (Game.core4[5] >= Game.MaxUPC[3] && Game.cores[4] == true) {
      CoreButton4B = "<div class='ui disabled button'>Armor 4 keys full.</div>";
    }
    if (Game.inventory[IF3].object > 0 && Game.inventory[IF3].object < 3) {
      if (Game.inventory[IF3].object == 1) {
        descitem = "+" + fix(Game.inventory[IF3].life, 5) + "<i class='red heart icon'></i><br>";
      }
      if (Game.inventory[IF3].object == 2) {
        descitem = "+" + fix(Game.inventory[IF3].power, 5) + "<i class='blue crosshairs icon'></i><br>";
      }
      if (IF3 < Game.MaxInv) { $("#rewards-loot").append("<div class='ui comments'><div class='comment CoreClass" + Game.inventory[IF3].type + "'><div class='classBar" + Game.inventory[IF3].type + "'></div>" + Game.inventory[IF3].name + "<br><span class='" + Game.inventory[IF3].class + "'>" + Game.inventory[IF3].class + "</span><br>" + descitem + "</div></div>"); }
    }
  }
  var INVENTORYFULL = (Game.inventory.length - 1) < Game.MaxInv ? (Game.inventory.length) + "/" + Game.MaxInv + " items in inventory." : "Inventory full, you can\'t recover any new item.";
  $("#rewards-loot").append(INVENTORYFULL);
  if (THEREISLOOT == 0) { $("#rewards-loot").html(REWARDTEXT + "<br>" + INVENTORYFULL); }
  Game.isInFight = 2;

  if (Game.Ennemy[1] == 1) { Class = "Ennemy1"; ThreatLevel = "NORMAL"; }
  if (Game.Ennemy[1] == 2) { Class = "Ennemy2"; ThreatLevel = "ADVANCED"; }
  if (Game.Ennemy[1] == 3) { Class = "Ennemy3"; ThreatLevel = "SUPERIOR"; }
  if (Game.Ennemy[1] == 4) { Class = "Ennemy4"; ThreatLevel = "VETERAN"; }
  if (Game.Ennemy[1] == 5) { Class = "Ennemy5"; ThreatLevel = "ELITE"; }
  if (Game.Ennemy[1] == 6) { Class = "Ennemy6"; ThreatLevel = "BOSS"; }
  if (Game.Ennemy[1] == 7) { Class = "Ennemy7"; ThreatLevel = "GOD"; }
  $("#EnnemyDesc").html("<br><br>");
  var btncntnt = url.match(/mobile/gi) ? "<i class='times icon'></i>Close" : "<i class='times icon ICR'></i>Close <span class='desc'>(F)</span>";
  $("#btn-CRW").html("<div onclick='hideRewards();' class='big ui bottom attached labeled icon closing button'>" + btncntnt + "</div>");
  $("#btn-CRW").show();
  $("#btn-ACT").hide();
  $("#rewards-title").html("<span class='vert'> " + Game.Ennemy[0] + " defeated !</span>");
  $("#rewards-desc").html("<br>You have defeated " + fix(Game.Defeated[Game.Ennemy[1]], 3) + " <div class='ui small " + Class + " basic label'><span class='" + Class + "'>" + ThreatLevel + "</span></div><br> " + LEVELUP);
  if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
    //IF PLAYER ISNT IN endgame MODE
    $("#rewards-text").html("+<span class='vert bold'>" + fix(Math.floor(expGain), 5) + "</span> EXP " + EMP);
    //IF NOT IN MISSION & LEVEL EQUAL/SUPERIOR TO ACTUAL MAXIMUM LOCATION LEVEL
    if (Game.Level >= POS[Game.Location][2]) { $("#rewards-text").html("<span class='rouge'>No more EXP in this area, start the next mission.</span>" + EMP); }
    //IF IN MISSION & LEVEL EQUAL/SUPERIOR TO ACTUAL MAXIMUM LOCATION LEVEL
    if (Game.MissionStarted[0] == true && Game.Level >= POS[Missions[Game.MissionStarted[1]][8]][2]) { $("#rewards-text").html(EMP); }
  }
  else { $("#rewards-text").html(EMP); }
  $("#rewards").show();
  $("#combat").hide();
  if (Game.conf3 == 1) { hideRewards(); }
}

function LoseFight() {
  Game.isInFight = 2;
  Game.Loses++;
  $("#EnnemyDesc").html("<br><br>");
  if (Game.Ennemy[1] == 1) {
    Class = "Ennemy1";
    ThreatLevel = "NORMAL";
  }
  if (Game.Ennemy[1] == 2) {
    Class = "Ennemy2";
    ThreatLevel = "ADVANCED";
  }
  if (Game.Ennemy[1] == 3) {
    Class = "Ennemy3";
    ThreatLevel = "SUPERIOR";
  }
  if (Game.Ennemy[1] == 4) {
    Class = "Ennemy4";
    ThreatLevel = "VETERAN";
  }
  if (Game.Ennemy[1] == 5) {
    Class = "Ennemy5";
    ThreatLevel = "ELITE";
  }
  if (Game.Ennemy[1] == 6) {
    Class = "Ennemy6";
    ThreatLevel = "BOSS";
  }
  if (Game.Ennemy[1] == 7) {
    Class = "Ennemy7";
    ThreatLevel = "GOD";
  }
  $("#rewards-title").html("<span class='rouge'>" + Game.Ennemy[0] + " killed you !</span>");
  $("#rewards-desc").html("");
  var MOBILETEXT5 = url.match(/mobile/gi) ? "" : "<span class='desc vert'>(F)</span>";
  if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
    $("#rewards-text").html("You lose all your EXP.<br>Current Ratio <span class='rouge'>" + fix(Game.Wins / Game.Loses, 7));
    $("#btn-CRW").html("<div onclick='hideRewards();' id='btn-hide' class='fluid ui rainbow button'><i class='green recycle icon'></i> Respawn " + MOBILETEXT5 + "</div>");
  } else {
    $("#rewards-text").html("Current Ratio <span class='rouge'>" + fix(Game.Wins / Game.Loses, 7) + "</span>");
    $("#btn-CRW").html("<div onclick='hideRewards();' id='btn-hide' class='fluid ui rainbow button'><i class='green recycle icon'></i> Respawn " + MOBILETEXT5 + "</div>");
  }
  $("#rewards-loot").html("");
  $("#rewards").show();
  $("#combat").hide();
  $("#btn-ACT").hide();
  $("#btn-CRW").show();
  Game.xp[0] = 0;
  if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 2) {
    Game.MissionStarted = [false, 0, 0, 0];
    showmessage("<span class='rouge'>MISSION FAILED</span>", "You failed to clear the fortress, now returning outside of it.");
    Game.Location = 10;
    hideRewards();
  }
}

function UpdateCombat() {
  TC = "Ennemy1";
  TLC = "<span class='Ennemy1'>";
  ThreatLevel = "NORMAL";
  lifetext = Game.CoreLife <= Game.Ennemy[3] ? " rouge" : " ";
  EnnemyText = Game.Ennemy[5] < Game.Ennemy[4] / 2 ? " rouge" : " ";
  if (Game.Ennemy[1] == 2) {
    TC = "Ennemy2";
    TLC = "<span class='Ennemy2'>";
    ThreatLevel = "ADVANCED";
  }
  if (Game.Ennemy[1] == 3) {
    TC = "Ennemy3";
    TLC = "<span class='Ennemy3'>";
    ThreatLevel = "SUPERIOR";
  }
  if (Game.Ennemy[1] == 4) {
    TC = "Ennemy4";
    TLC = "<span class='Ennemy4'>";
    ThreatLevel = "VETERAN";
  }
  if (Game.Ennemy[1] == 5) {
    TC = "Ennemy5";
    TLC = "<span class='Ennemy5'>";
    ThreatLevel = "ELITE";
  }
  if (Game.Ennemy[1] == 6) {
    TC = "Ennemy6";
    TLC = "<span class='Ennemy6'>";
    ThreatLevel = "BOSS";
  }
  if (Game.Ennemy[1] == 7) {
    TC = "Ennemy7";
    TLC = "<span class='Ennemy7'>";
    ThreatLevel = "GOD";
  }
  if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
    LVLTEXT = " Level ";
    TIERTEXT = Math.round(Game.Ennemy[2]);
  } else {
    LVLTEXT = " Score <i class='gem icon'></i>";
    TIERTEXT = Math.floor(Game.Ennemy[2] * 10);
  }


  var EnnemyName = Game.Ennemy[1] > 5 ? Game.Ennemy[0] : "" + Game.Ennemy[0];
  $("#EnnemyTitle").html("<div class='ui " + TC + " basic label'>" + TLC + ThreatLevel + "</span></div> " + TLC + EnnemyName + "</span><br>" + LVLTEXT + fix(TIERTEXT, 4));
  $("#EnnemyText").html("<span class='" + EnnemyText + "'>" + fix(Game.Ennemy[5], 5) + "</span> <i class='red heart icon'></i><br>" + fix(Game.Ennemy[3], 5) + " <i class='blue crosshairs icon'></i>");
  $("#PlayerText").html("<span class='" + lifetext + "'>" + fix(Game.CoreLife, 5) + "</span>/" + fix(Game.CoreBaseLife, 5) + " <i class='red heart icon'></i><br>" + fix(Game.CorePower, 5) + " <i class='blue crosshairs icon'></i>");
  $("#EnnemyHP").progress({
    className: {
      active: "",
      error: "",
      success: "",
      warning: ""
    }
  });
  var MOBILETEXT = url.match(/mobile/gi) ? "Special Attack" : "Special Attack (E)";
  if (Game.Emp > 0) {
    $("#emp-btn").show();
    $("#emp-btn").html("<i class='bolt icon'></i>" + fix(Game.Emp, 4) + " " + MOBILETEXT);
    if (url.match(/mobile/gi)) {
      $("#emp-btn").attr("class", "ui big orange button alphaSDW");
    } else {
      $("#emp-btn").attr("class", "ui huge orange button alphaSDW");
    }
  } else {
    $("#emp-btn").hide();
    $("#emp-btn").attr("class", "");
  }
  if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 2) {
    $("#emp-btn").hide();
    $("#emp-btn").attr("class", "");
  }
  var MOBILETEXT2 = url.match(/mobile/gi) ? "<i class='crosshairs icon'></i>Attack" : "<i class='crosshairs icon ICR'></i>Attack <span class='desc'>(SPACE)</span>";
  $("#attack-btn").html(MOBILETEXT2);
  var MOBILETEXT3 = url.match(/mobile/gi) ? "<i class='shield alternate icon'></i>Take cover" : "<i class='shield alternate icon ICR'></i>Take cover <span class='desc'>(R)</span>";
  $("#cover-btn").html(MOBILETEXT3);
  var MOBILETEXT4 = url.match(/mobile/gi) ? "<i class='eye slash outline icon'></i> Run Away" : "<i class='eye slash outline icon ICR'></i> Run Away <span class='desc'>(F)</span>";
  $("#run-btn").html("" + MOBILETEXT4);
  $("#EnnemyHP").progress({
    percent: GetEnnemyHPPercent()
  });
  $("#PlayerHP").progress({
    percent: GetPlayerHPPercent()
  });
}

//ITEM GENERATION FUNCTION

function NewRelic(luck) {
  var os = {};
  var Mult = [random(1, 3) / 100, random(3, 5) / 100, random(5, 9) / 100, random(10, 14) / 100, random(15, 19) / 100, random(20, 24) / 100, random(25, 30) / 100];
  var MultScore = [random(1, 5), random(1, 10), random(5, 14), random(5, 19), random(10, 24), random(15, 49), random(20, 100)];
  var MultDrop = [1, 2000, 5000, 7000, 8500, 9500, 9850];

  for (var R in Game.RLS) {
    if (Game.RLS[R][2] == 4) {
      if (Game.RLS[R][3] == 1) {
        luck = 1;
      }
      if (Game.RLS[R][3] == 2000) {
        luck = 2001;
      }
      if (Game.RLS[R][3] == 5000) {
        luck = 5001;
      }
      if (Game.RLS[R][3] == 7000) {
        luck = 7001;
      }
      if (Game.RLS[R][3] == 8500) {
        luck = 8501;
      }
      if (Game.RLS[R][3] == 9500) {
        luck = 9501;
      }
      if (Game.RLS[R][3] == 9850) {
        luck = 9851;
      }
    }
  }

  if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
    if (Game.Ennemy[1] <= 4 && luck < 7001) {
      luck = 7001;
    }
    if (Game.Ennemy[1] == 5 && luck < 8501) {
      luck = 9851;
    }
    if (Game.Ennemy[1] == 6 && luck < 9501) {
      luck = 9501;
    }
    if (Game.Ennemy[1] == 7 && luck < 9851) {
      luck = 9851;
    }
  }

  if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 2) {
    if (Game.Ennemy[1] >= 1 && luck < 9501) {
      luck = 9501;
    }
    if (Game.Ennemy[1] == 7 && luck < 9851) {
      luck = 9851;
    }
  }

  if (luck > 10000) {
    luck = 10000;
  }
  var chance = random(luck, 10000);
  if (chance > 0) {
    os.class = 'Normal';
    os.type = 0;
  }
  if (chance > 2000 && chance <= 5000) {
    os.class = 'Common';
    os.type = 1;
  }
  if (chance > 5000 && chance <= 7000) {
    os.class = 'Uncommon';
    os.type = 2;
  }
  if (chance > 7000 && chance <= 8500) {
    os.class = 'Rare';
    os.type = 3;
  }
  if (chance > 8500 && chance <= 9500) {
    os.class = 'Epic';
    os.type = 4;
  }

  if (chance > 9500 && chance <= 9850) {
    os.class = 'Exotic';
    os.type = 5;
  }

  if (chance > 9850 && chance <= 10000) {
    os.class = 'Divine';
    os.type = 6;
  }

  if (Game.Level < 5) {
    os.type = 0;
    os.class = "Normal";
  }

  if (Game.Level < 10) {
    if (os.class == 'Uncommon' || os.class == 'Rare' || os.class == 'Epic' || os.class == 'Exotic' || os.class == 'Divine') {
      os.type = 1;
      os.class = "Common";
    }
  }

  if (Game.Level < 15) {
    if (os.class == 'Rare' || os.class == 'Epic' || os.class == 'Exotic' || os.class == 'Divine') {
      os.type = 2;
      os.class = "Uncommon";
    }
  }

  if (Game.Level < 20) {
    if (os.class == 'Epic' || os.class == 'Exotic' || os.class == 'Divine') {
      os.type = 3;
      os.class = "Rare";
    }
  }

  if (Game.Level < 30) {
    if (os.class == 'Exotic' || os.class == 'Divine') {
      os.type = 4;
      os.class = "Epic";
    }
  }
  if (Game.Level >= 30) {
    if (os.class == 'Exotic') {
      os.type = 5;
      os.class = "Exotic";
    }
    if (os.class == 'Divine') {
      os.type = 6;
      os.class = "Divine";
    }
  }

  if (os.type > POS[Game.Location][3]) {
    os.type = POS[Game.Location][3];
  }

  var RandomT = random(1, 2);
  if (Game.Level > 10) {
    RandomT = random(1, 3);
  }
  if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
    RandomT = random(1, 4);
  }

  if (RandomT == 1) {
    os.name = Relicname[0];
    os.object = 1;
    os.bonus = Mult[os.type];
  }
  if (RandomT == 2) {
    os.name = Relicname[1];
    os.object = 2;
    os.bonus = Mult[os.type];
  }
  if (RandomT == 3) {
    os.name = Relicname[3];
    os.object = 4;
    os.bonus = MultDrop[random(0, os.type)];
    if (os.type > 1) {
      os.bonus = MultDrop[random(os.type - 2, os.type)];
    }
    if (os.type > 2) {
      os.bonus = MultDrop[random(os.type - 3, os.type)];
    }
  }
  if (RandomT == 4) {
    os.name = Relicname[2];
    os.object = 3;
    os.bonus = MultScore[os.type];
  }
  os.id = 3;
  if ((Game.inventory.length - 1) < Game.MaxInv) {
    Game.inventory[Game.inventory.length] = os;
  }
}

function newItem(type, level, luck) {
  var item = {};
  var Mult = [random(100, 105) / 100, random(115, 120) / 100, random(125, 130) / 100, random(135, 140) / 100, random(150, 160) / 100, random(175, 185) / 100, random(195, 210) / 100];

  for (var R in Game.RLS) {
    if (Game.RLS[R][2] == 4) {
      if (Game.RLS[R][3] == 1) {
        luck = 1;
      }
      if (Game.RLS[R][3] == 2000) {
        luck = 2001;
      }
      if (Game.RLS[R][3] == 5000) {
        luck = 5001;
      }
      if (Game.RLS[R][3] == 7000) {
        luck = 7001;
      }
      if (Game.RLS[R][3] == 8500) {
        luck = 8501;
      }
      if (Game.RLS[R][3] == 9500) {
        luck = 9501;
      }
      if (Game.RLS[R][3] == 9850) {
        luck = 9851;
      }
    }
  }

  if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
    if (Game.Ennemy[1] <= 4 && luck < 7001) {
      luck = 7001;
    }
    if (Game.Ennemy[1] == 5 && luck < 8501) {
      luck = 9851;
    }
    if (Game.Ennemy[1] == 6 && luck < 9501) {
      luck = 9501;
    }
    if (Game.Ennemy[1] == 7 && luck < 9851) {
      luck = 9851;
    }
  }

  if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 2) {
    if (Game.Ennemy[1] >= 1 && luck < 9501) {
      luck = 9501;
    }
    if (Game.Ennemy[1] == 7 && luck < 9851) {
      luck = 9851;
    }
  }

  if (luck > 10000) {
    luck = 10000;
  }
  var chance = random(luck, 10000);
  if (chance > 0) {
    item.class = 'Normal';
    item.type = 0;
  }
  if (chance > 2000 && chance <= 5000) {
    item.class = 'Common';
    item.type = 1;
  }
  if (chance > 5000 && chance <= 7000) {
    item.class = 'Uncommon';
    item.type = 2;
  }
  if (chance > 7000 && chance <= 8500) {
    item.class = 'Rare';
    item.type = 3;
  }
  if (chance > 8500 && chance <= 9500) {
    item.class = 'Epic';
    item.type = 4;
  }

  if (chance > 9500 && chance <= 10000) {
    item.class = 'Exotic';
    item.type = 5;
  }

  if (chance > 9850 && chance <= 10000) {
    item.class = 'Divine';
    item.type = 6;
  }

  if (Game.Level < 5) {
    item.class = 'Normal';
    item.type = 0;
  }

  if (Game.Level < 10) {
    if (item.class == 'Uncommon' || item.class == 'Rare' || item.class == 'Epic' || item.class == 'Exotic' || item.class == 'Divine') {
      item.class = 'Common';
      item.type = 1;
    }
  }

  if (Game.Level < 15) {
    if (item.class == 'Rare' || item.class == 'Epic' || item.class == 'Exotic' || item.class == 'Divine') {
      item.class = 'Uncommon';
      item.type = 2;
    }
  }

  if (Game.Level < 20) {
    if (item.class == 'Epic' || item.class == 'Exotic' || item.class == 'Divine') {
      item.class = 'Rare';
      item.type = 3;
    }
  }

  if (Game.Level < 30) {
    if (item.class == 'Exotic' || item.class == 'Divine') {
      item.class = 'Epic';
      item.type = 4;
    }
  }

  if (Game.FNMission < Game.TotalMissions) {
    if (item.type > POS[Game.Location][3]) {
      item.type = POS[Game.Location][3];
    }
  }

  if (item.type == 0) {
    item.class = "Normal";
  }
  if (item.type == 1) {
    item.class = "Common";
  }
  if (item.type == 2) {
    item.class = "Uncommon";
  }
  if (item.type == 3) {
    item.class = "Rare";
  }
  if (item.type == 4) {
    item.class = "Epic";
  }
  if (item.type == 5) {
    item.class = "Exotic";
  }
  if (item.type == 6) {
    item.class = "Divine";
  }

  if (level < 1) {
    level = 1;
  }
  if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
    level += random(0, item.type);
    level = level / 10;
    if (level > Game.MaxScore) {
      level = Game.MaxScore;
    }
  }
  if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
    if (level > Game.Level) {
      level = Game.Level;
    }
    if (level > POS[Game.Location][2]) {
      level = POS[Game.Location][2];
    }
  }

  if (type == 0) { //GENERATE A CORE
    item.name = CoreNames[[item.class]][Math.floor(Math.random() * CoreNames[item.class].length)] + " Armor";
    item.level = level;
    item.object = 0;
    item.ups = GetMaxLevel(item.class);
    if (Game.MaxLevel >= Game.Level && Game.FNMission >= Game.TotalMissions) {
      item.life = Math.floor(random((level * 10) * (Mult[item.type] * 0.75) + 100, (level * 10) * Mult[item.type] + 100));
      item.power = Math.floor(random((level * 3) * (Mult[item.type] * 0.75), (level * 3) * Mult[item.type] + 5));
    } else {
      item.life = Math.floor(random((level * 10) * (Mult[item.type] * 0.9) + 100, (level * 10) * Mult[item.type] + 100));
      item.power = Math.floor(random((level * 3) * (Mult[item.type] * 0.9), (level * 3) * Mult[item.type] + 5));
    }
    item.id = 1; //CORE
    if ((Game.inventory.length - 1) < Game.MaxInv && item != Game.inventory[Game.inventory.length - 1]) {
      Game.inventory[Game.inventory.length] = item;
      item = {};
    }
  }

  if (type == 1) { //GENERATE A KEY

    for (var R2 in Game.RLS) {
      if (Game.RLS[R2][2] == 4) {
        if (Game.RLS[R2][3] == 1) {
          luck = 1;
        }
        if (Game.RLS[R2][3] == 2000) {
          luck = 3001;
        }
        if (Game.RLS[R2][3] == 5000) {
          luck = 7501;
        }
        if (Game.RLS[R2][3] == 7000) {
          luck = 15001;
        }
        if (Game.RLS[R2][3] == 8500) {
          luck = 19501;
        }
        if (Game.RLS[R2][3] == 9500) {
          luck = 22501;
        }
        if (Game.RLS[R2][3] == 9850) {
          luck = 24001;
        }
      }
    }

    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      if (Game.Ennemy[1] <= 4 && luck < 15001) {
        luck = 15001;
      }
      if (Game.Ennemy[1] == 5 && luck < 19501) {
        luck = 19501;
      }
      if (Game.Ennemy[1] == 6 && luck < 22501) {
        luck = 22501;
      }
      if (Game.Ennemy[1] == 7 && luck < 24001) {
        luck = 24001;
      }
    }

    if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 2) {
      if (Game.Ennemy[1] >= 1 && luck < 22501) {
        luck = 22501;
      }
      if (Game.Ennemy[1] == 7 && luck < 24001) {
        luck = 24001;
      }
    }

    var multiplier = random(luck, 25000); //Random number between 0.1% - 2.5%
    if (multiplier > 0) {
      item.class = "Normal";
      item.type = "0";
    }
    if (multiplier > 3000) {
      item.class = "Common";
      item.type = "1";
    }
    if (multiplier > 7500) {
      item.class = "Uncommon";
      item.type = "2";
    }
    if (multiplier > 15000) {
      item.class = "Rare";
      item.type = "3";
    }
    if (multiplier > 19500) {
      item.class = "Epic";
      item.type = "4";
    }
    if (multiplier > 22500) {
      item.class = "Exotic";
      item.type = "5";
    }
    if (multiplier > 24000) {
      multiplier = random(24000, 30000);
      item.class = "Divine";
      item.type = "6";
    }

    if (item.type > POS[Game.Location][3]) {
      item.type = POS[Game.Location][3];
    }

    if (item.type == 0) {
      item.class = "Normal";
    }
    if (item.type == 1) {
      item.class = "Common";
    }
    if (item.type == 2) {
      item.class = "Uncommon";
    }
    if (item.type == 3) {
      item.class = "Rare";
    }
    if (item.type == 4) {
      item.class = "Epic";
    }
    if (item.type == 5) {
      item.class = "Exotic";
    }
    if (item.type == 6) {
      item.class = "Divine";
    }

    if (Game.Level < 5) {
      item.class = 'Normal';
      item.type = 0;
    }

    if (Game.Level < 10) {
      if (item.class == 'Uncommon' || item.class == 'Rare' || item.class == 'Epic' || item.class == 'Exotic' || item.class == 'Divine') {
        item.class = 'Common';
        item.type = 1;
        multiplier = 3000;
      }
    }

    if (Game.Level < 15) {
      if (item.class == 'Rare' || item.class == 'Epic' || item.class == 'Exotic' || item.class == 'Divine') {
        item.class = 'Uncommon';
        item.type = 2;
        multiplier = 7500;
      }
    }

    if (Game.Level < 20) {
      if (item.class == 'Epic' || item.class == 'Exotic' || item.class == 'Divine') {
        item.class = 'Rare';
        item.type = 3;
        multiplier = 15000;
      }
    }

    if (Game.Level < 30) {
      if (item.class == 'Exotic' || item.class == 'Divine') {
        item.class = 'Epic';
        item.type = 4;
        multiplier = 19500;
      }
    }

    type = random(1, 100);
    if (type > 0 && type <= 45) { //GENERATE A POWER KEY
      item.power = Math.floor((multiplier / 10000) * ((Game.CorePower / (Game.PowerMult + Game.WTMult[0])) * 0.01) + item.type);
      if (item.power < 1) {
        item.power = 1;
      }
      item.life = 0;
      item.name = "Power Key";
      item.level = fix(item.type, 5);
      item.object = 2;
    }
    if (type > 45 && type <= 100) { //GENERATE A LIFE KEY
      item.life = Math.floor((multiplier / 10000) * ((Game.CoreBaseLife / (Game.LifeMult + Game.WTMult[1])) * 0.01) + item.type);
      if (item.life < 1) {
        item.life = 1;
      }
      item.power = 0;
      item.name = "Life Key";
      item.level = fix(item.type, 5);
      item.object = 1;
    }
    item.id = 2; //KEY
    if ((Game.inventory.length - 1) < Game.MaxInv && item != Game.inventory[Game.inventory.length - 1]) {
      Game.inventory[Game.inventory.length] = item;
      item = {};
    }
  }
}

//EQUIPMENT & STATS UPGRADES FUNCTIONS

function NewCore(id, n) {
  var OldCore = [];
  Game.isInFight = 6;
  Game.NCore = id;
  if (id == 1) {
    OldCore = Game.core1;
  }
  if (id == 2) {
    OldCore = Game.core2;
  }
  if (id == 3) {
    OldCore = Game.core3;
  }
  if (id == 4) {
    OldCore = Game.core4;
  }

  if (Game.confirmations == 1) {

    var olevelcolor = Game.inventory[n].level <= OldCore[4] ? "ShadowReset green" : "ShadowReset rouge";
    var oupscolor = Game.inventory[n].ups <= (Game.MaxUPC[id - 1] - OldCore[5]) ? "green" : "rouge";
    var olifecolor = Game.inventory[n].life <= OldCore[2] ? "green" : "rouge";
    var opowercolor = Game.inventory[n].power <= OldCore[3] ? "green" : "rouge";
    var levelcolor = Game.inventory[n].level >= OldCore[4] ? "ShadowReset green" : "ShadowReset rouge";
    var upscolor = Game.inventory[n].ups >= (Game.MaxUPC[id - 1] - OldCore[5]) ? "green" : "rouge";
    var lifecolor = Game.inventory[n].life >= OldCore[2] ? "green" : "rouge";
    var powercolor = Game.inventory[n].power >= OldCore[3] ? "green" : "rouge";

    if (Game.inventory[n].level == Math.floor(OldCore[4])) {
      olevelcolor = "";
      levelcolor = "";
    }
    if (Game.inventory[n].ups == (Game.MaxUPC[id - 1] - OldCore[5])) {
      upscolor = "";
      oupscolor = "";
    }
    if (Game.inventory[n].life == OldCore[2]) {
      olifecolor = "";
      lifecolor = "";
    }
    if (Game.inventory[n].power == OldCore[3]) {
      opowercolor = "";
      powercolor = "";
    }

    if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
      TIER = "Level ";
      TIERRANK = Math.round(Game.inventory[n].level);
      OLDTIERRANK = OldCore[4];
    } else {
      TIER = "Score <i class='gem icon'></i>";
      TIERRANK = Math.floor(Game.inventory[n].level * 10);
      OLDTIERRANK = Math.floor(OldCore[4] * 10);
    }

    if (url.match(/mobile/gi)) {
      BR = " ";
    } else {
      BR = "<br>";
    }

    $("#OldCore-text").html("<span class='" + OldCore[1] + "'>" + OldCore[0] + BR + "<span class='" + olevelcolor + "'>" + TIER + OLDTIERRANK + "</span></span><br>" +
      "<span class='desc'>Slots : " + "<span class='" + oupscolor + "'>" + (Game.MaxUPC[id - 1] - OldCore[5]) + "<i class='key icon'></i></span></span><br>" +
      "<span class='" + olifecolor + "'>" + OldCore[2] + "</span> <i class='red heart icon'></i><br>" +
      "<span class='" + opowercolor + "'>" + OldCore[3] + "</span> <i class='blue crosshairs icon'></i>");

    $("#NewCore-text").html("<span class='" + Game.inventory[n].class + "'>" + Game.inventory[n].name + BR + "<span class='" + levelcolor + "'>" + TIER + TIERRANK + "</span></span><br>" +
      "<span class='desc'>Slots : <span class='" + upscolor + "'>" + Game.inventory[n].ups + "<i class='key icon'></i></span></span><br>" +
      "<span class='" + lifecolor + "'>" + Game.inventory[n].life + "</span> <i class='red heart icon'></i><br>" +
      "<span class='" + powercolor + "'>" + Game.inventory[n].power + "</span> <i class='blue crosshairs icon'></i>");

    if (url.match(/mobile/gi)) {
      $("#confirm-btn").html("<div onclick='Cancelconfirm();' class='ui rainbow button'><i class='red remove icon'></i> Cancel<span class='vert'> (N)</span></div><div id='replace-btn' onclick='DefineCore(" + id + ", " + n + ");' class='ui rainbow button'><i class='green check icon'></i> Replace Armor " + id + " <span class='vert'>(Y)</span></div>");
    } else {
      $("#confirm-btn").html("<div onclick='Cancelconfirm();' class='ui rainbow button'> Cancel</div><div id='replace-btn' onclick='DefineCore(" + id + ", " + n + ");' class='ui rainbow button'> Replace Armor " + id + "</div>");
    }
    $("#modal-4").modal("show");
  } else {
    if (id == 1) {
      DefineCore(1, n);
    }
    if (id == 2) {
      DefineCore(2, n);
    }
    if (id == 3) {
      DefineCore(3, n);
    }
    if (id == 4) {
      DefineCore(4, n);
    }
  }
}

function ConfirmRelic(R, id) {
  //Relic NAME, CLASS, TYPE1, VALUE1
  Game.isInFight = 8;
  var Bcolor0 = "";
  if (Game.RLS[R][2] == Game.inventory[id].object) {
    if (Game.RLS[R][3] > Game.inventory[id].bonus) {
      Bcolor0 = "green";
    } else {
      Bcolor0 = "rouge";
    }
  }
  if (Game.RLS[R][2] == 0) {
    CDESC = "-";
  }
  if (Game.RLS[R][2] == 1) {
    CDESC = "Power bonus of <span class='" + Bcolor0 + "'>" + fix(Game.RLS[R][3], 9) + "</span>";
  }
  if (Game.RLS[R][2] == 2) {
    CDESC = "Life bonus of <span class='" + Bcolor0 + "'>" + fix(Game.RLS[R][3], 9) + "</span>";
  }
  if (Game.RLS[R][2] == 3) {
    CDESC = "Max Score increased by <span class='" + Bcolor0 + "'>" + fix(Game.RLS[R][3], 3) + "</span>";
  }
  if (Game.RLS[R][2] == 4) {
    if (Game.RLS[R][3] == 1) {
      CDESCT = "<span class='Normal'>Normal</span>";
    }
    if (Game.RLS[R][3] == 2000) {
      CDESCT = "<span class='Common'>Common</span>";
    }
    if (Game.RLS[R][3] == 5000) {
      CDESCT = "<span class='Uncommon'>Uncommon</span>";
    }
    if (Game.RLS[R][3] == 7000) {
      CDESCT = "<span class='Rare'>Rare</span>";
    }
    if (Game.RLS[R][3] == 8500) {
      CDESCT = "<span class='Epic'>Epic</span>";
    }
    if (Game.RLS[R][3] == 9500) {
      CDESCT = "<span class='Exotic'>Exotic</span>";
    }
    if (Game.RLS[R][3] == 9850) {
      CDESCT = "<span class='Divine'>Divine</span>";
    }
    CDESC = "Minimal drop quality " + CDESCT;
  }
  var Bcolor = "";
  if (Game.RLS[R][2] == Game.inventory[id].object) {
    if (Game.RLS[R][3] < Game.inventory[id].bonus) {
      Bcolor = "green";
    } else {
      Bcolor = "rouge";
    }
  }
  if (Game.inventory[id].object == 0) {
    CDESC2 = "-";
  }
  if (Game.inventory[id].object == 1) {
    CDESC2 = "Power bonus of <span class='" + Bcolor + "'>" + fix(Game.inventory[id].bonus, 9) + "</span>";
  }
  if (Game.inventory[id].object == 2) {
    CDESC2 = "Life bonus of <span class='" + Bcolor + "'>" + fix(Game.inventory[id].bonus, 9) + "</span>";
  }
  if (Game.inventory[id].object == 3) {
    CDESC2 = "Max Score increased by <span class='" + Bcolor + "'>" + fix(Game.inventory[id].bonus, 3) + "</span>";
  }
  if (Game.inventory[id].object == 4) {
    if (Game.inventory[id].bonus == 1) {
      CDESCT2 = "<span class='Normal'>Normal</span>";
    }
    if (Game.inventory[id].bonus == 2000) {
      CDESCT2 = "<span class='Common'>Common</span>";
    }
    if (Game.inventory[id].bonus == 5000) {
      CDESCT2 = "<span class='Uncommon'>Uncommon</span>";
    }
    if (Game.inventory[id].bonus == 7000) {
      CDESCT2 = "<span class='Rare'>Rare</span>";
    }
    if (Game.inventory[id].bonus == 8500) {
      CDESCT2 = "<span class='Epic'>Epic</span>";
    }
    if (Game.inventory[id].bonus == 9500) {
      CDESCT2 = "<span class='Exotic'>Exotic</span>";
    }
    if (Game.inventory[id].bonus == 9850) {
      CDESCT2 = "<span class='Divine'>Divine</span>";
    }
    CDESC2 = "Minimal drop quality " + CDESCT2;
  }

  if (Game.conf2 == 1) {
    if (url.match(/mobile/gi)) {
      BR = " ";
    } else {
      BR = "<br>";
    }

    $("#OldRelic-text").html(Game.RLS[R][0] + "<br><span class='" + Game.RLS[R][1] + "'>" + Game.RLS[R][1] + "</span><br>" + CDESC);

    $("#NewRelic-text").html(Game.inventory[id].name + "<br><span class='" + Game.inventory[id].class + "'>" + Game.inventory[id].class + "</span><br>" + CDESC2);

    if (url.match(/mobile/gi)) {
      $("#confirm2-btn").html("<div onclick='Cancelconfirm();' class='ui rainbow button'><i class='red remove icon'></i> Cancel<span class='vert'> (N)</span></div><div id='replace-btn' onclick='InstallRelic(" + R + ", " + id + ");' class='ui rainbow button'><i class='green check icon'></i> Replace Relic <span class='vert'>(Y)</span></div>");
    } else {
      $("#confirm2-btn").html("<div onclick='Cancelconfirm();' class='ui rainbow button'> Cancel</div><div id='replace-btn' onclick='InstallRelic(" + R + ", " + id + ");' class='ui rainbow button'> Replace Relic </div>");
    }
    $("#modal-3").modal("show");
  } else {
    InstallRelic(R, id);
  }
}

function InstallRelic(R, id) {
  for (var RL in Game.RLS) {
    if (Game.RLS[RL][2] == 3) {
      if (Game.core1[4] > Game.MaxScore - (Game.RLS[RL][3] / 10)) {
        Game.core1[4] = Game.MaxScore - (Game.RLS[RL][3] / 10);
      }
      if (Game.core2[4] > Game.MaxScore - (Game.RLS[RL][3] / 10)) {
        Game.core2[4] = Game.MaxScore - (Game.RLS[RL][3] / 10);
      }
      if (Game.core3[4] > Game.MaxScore - (Game.RLS[RL][3] / 10)) {
        Game.core3[4] = Game.MaxScore - (Game.RLS[RL][3] / 10);
      }
      if (Game.core4[4] > Game.MaxScore - (Game.RLS[RL][3] / 10)) {
        Game.core4[4] = Game.MaxScore - (Game.RLS[RL][3] / 10);
      }
    }
  }
  Game.RLS[R][0] = Game.inventory[id].name;
  Game.RLS[R][1] = Game.inventory[id].class;
  Game.RLS[R][2] = Game.inventory[id].object;
  Game.RLS[R][3] = Game.inventory[id].bonus;
  if (id <= Game.MaxInv) {
    RemoveItem(id);
  }
  if (coreId[2] == 2) {
    Game.isInFight = 0;
  }
  if ($('#inventory').is(":visible")) {
    hideModals();
  } else {
    hideRewards();
  }
  if (Game.conf2 == 1) {
    $('#modal-3').modal('hide');
  }
}

function ConfirmDestroy(core) {
  if (core == 1) {
    DCore = Game.core1;
  }
  if (core == 2) {
    DCore = Game.core2;
  }
  if (core == 3) {
    DCore = Game.core3;
  }
  if (core == 4) {
    DCore = Game.core4;
  }

  if (Game.Level < Game.MaxLevel || Game.FNMission < Game.TotalMissions) {
    TIER = "Level ";
    DTIERRANK = Math.round(DCore[4]);
  } else {
    TIER = "Score <i class='gem icon'></i>";
    DTIERRANK = Math.floor(DCore[4] * 10);
  }

  $("#Destroy-text").html("<span class='" + DCore[1] + "'>" + DCore[0] + " " + TIER + "" + DTIERRANK + "</span><br>" +
    "<span class='desc'>Available slots : " + "" + (Game.MaxUPC[core - 1] - DCore[5]) + "<i class='key icon'></i></span><br>" +
    "" + DCore[2] + " <i class='red heart icon'></i><br>" +
    "" + DCore[3] + "  <i class='blue crosshairs icon'></i>");
  if (url.match(/mobile/gi)) {
    $("#DBTN").html("<div class='ui icon cu2 button' onclick='DestroyCore(" + core + ");'><i class='rouge trash icon'></i></div><div onclick='DCancel();' class='ui icon cu button'><i class='green times icon'></i></div>");
  } else {
    $("#DBTN").html("<div class='ui cu2 button' onclick='DestroyCore(" + core + ");'><i class='rouge trash icon'></i> Confirm</div><div onclick='DCancel();' class='ui cu button'><i class='green times icon'></i> Cancel</div>");
  }
  $("#modal-2").modal("show");
}

function DestroyCore(core) {
  if (core == 1) {
    Game.core1 = ["Basic Armor", "Normal", 100 + (Game.Simulation * 5), 10 + (Game.Simulation * 1), 1];
  }
  if (core == 2) {
    Game.core2 = ["Basic Armor", "Normal", 100 + (Game.Simulation * 5), 10 + (Game.Simulation * 1), 1];
  }
  if (core == 3) {
    Game.core3 = ["Basic Armor", "Normal", 100 + (Game.Simulation * 5), 10 + (Game.Simulation * 1), 1];
  }
  if (core == 4) {
    Game.core4 = ["Basic Armor", "Normal", 100 + (Game.Simulation * 5), 10 + (Game.Simulation * 1), 1];
  }
  Game.MaxUPC[core - 1] = 0;
  if (core == 1) {
    Game.core1K = [0, 0];
  }
  if (core == 2) {
    Game.core2K = [0, 0];
  }
  if (core == 3) {
    Game.core3K = [0, 0];
  }
  if (core == 4) {
    Game.core4K = [0, 0];
  }
  $('#modal-2').modal('hide');
  UpdateGame();
}

function Cancelconfirm() {
  Game.isInFight = 2;
  $('#modal-3').modal('hide');
  $('#modal-4').modal('hide');
}

function DefineCore(core, iden) {
  if (core == 1) {
    id = Game.core1;
  }
  if (core == 2) {
    id = Game.core2;
  }
  if (core == 3) {
    id = Game.core3;
  }
  if (core == 4) {
    id = Game.core4;
  }

  if (Game.confirmations == 1) {
    $("#modal-4").modal("hide");
  }
  if (Game.inventory[iden].power !== undefined || Game.inventory[iden].life !== undefined) {
    id[0] = Game.inventory[iden].name;
    id[1] = Game.inventory[iden].class;
    id[2] = Game.inventory[iden].life;
    id[3] = Game.inventory[iden].power;
    id[4] = Game.inventory[iden].level;
    id[5] = 0;
    Game.MaxUPC[core - 1] = Game.inventory[iden].ups;
    if (core == 1) {
      Game.core1K = [0, 0];
    }
    if (core == 2) {
      Game.core2K = [0, 0];
    }
    if (core == 3) {
      Game.core3K = [0, 0];
    }
    if (core == 4) {
      Game.core4K = [0, 0];
    }
  }
  if (core == 1) {
    Game.core1 = id;
  }
  if (core == 2) {
    Game.core2 = id;
  }
  if (core == 3) {
    Game.core3 = id;
  }
  if (core == 4) {
    Game.core4 = id;
  }
  if (iden <= Game.MaxInv) {
    RemoveItem(iden);
  }
  if ($('#inventory').is(":visible")) {
    hideModals();
  } else {
    hideRewards();
  }
  Game.isInFight = 0;
  UpdateGame();
}

function GetMaxLevel(type) {
  if (Game.MaxLevel > Game.Level && Game.FNMission < Game.TotalMissions) {
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
  if (core == 1) {
    id = Game.core1;
  }
  if (core == 2) {
    id = Game.core2;
  }
  if (core == 3) {
    id = Game.core3;
  }
  if (core == 4) {
    id = Game.core4;
  }
  if (id[5] < Game.MaxUPC[core - 1]) {

    if (type == 2) {
      id[3] += Game.inventory[nb].power;
    }
    if (type == 1) {
      id[2] += Game.inventory[nb].life;
    }
    id[5]++;

    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      if (Game.inventory[nb].type == 1) {
        if ((id[4] + 0.1) <= Game.MaxScore) {
          id[4] += 0.1;
        } else {
          id[4] = Game.MaxScore;
        }
      }
    }
    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      if (Game.inventory[nb].type == 2) {
        if ((id[4] + 0.2) <= Game.MaxScore) {
          id[4] += 0.2;
        } else {
          id[4] = Game.MaxScore;
        }
      }
    }
    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      if (Game.inventory[nb].type == 3) {
        if ((id[4] + 0.3) <= Game.MaxScore) {
          id[4] += 0.3;
        } else {
          id[4] = Game.MaxScore;
        }
      }
    }
    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      if (Game.inventory[nb].type == 4) {
        if ((id[4] + 0.4) <= Game.MaxScore) {
          id[4] += 0.4;
        } else {
          id[4] = Game.MaxScore;
        }
      }
    }
    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      if (Game.inventory[nb].type == 5) {
        if ((id[4] + 0.5) <= Game.MaxScore) {
          id[4] += 0.5;
        } else {
          id[4] = Game.MaxScore;
        }
      }
    }
    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      if (Game.inventory[nb].type == 6) {
        if ((id[4] + 0.6) <= Game.MaxScore) {
          id[4] += 0.6;
        } else {
          id[4] = Game.MaxScore;
        }
      }
    }
    if (Game.Level >= Game.MaxLevel && Game.FNMission >= Game.TotalMissions) {
      if (Game.inventory[nb].type == 7) {
        if ((id[4] + 0.7) <= Game.MaxScore) {
          id[4] += 0.7;
        } else {
          id[4] = Game.MaxScore;
        }
      }
    }

    if (core == 1) {
      Game.core1 = id;
      if (type == 2) {
        Game.core1K[0] += Game.inventory[nb].power;
      }
      if (type == 1) {
        Game.core1K[1] += Game.inventory[nb].life;
      }
    }
    if (core == 2) {
      Game.core2 = id;
      if (type == 2) {
        Game.core2K[0] += Game.inventory[nb].power;
      }
      if (type == 1) {
        Game.core2K[1] += Game.inventory[nb].life;
      }
    }
    if (core == 3) {
      Game.core3 = id;
      if (type == 2) {
        Game.core3K[0] += Game.inventory[nb].power;
      }
      if (type == 1) {
        Game.core3K[1] += Game.inventory[nb].life;
      }
    }
    if (core == 4) {
      Game.core4 = id;
      if (type == 2) {
        Game.core4K[0] += Game.inventory[nb].power;
      }
      if (type == 1) {
        Game.core4K[1] += Game.inventory[nb].life;
      }
    }
  }
  if (nb < Game.MaxInv) {
    RemoveItem(nb);
  }
  if ($('#inventory').is(":visible")) {
    hideModals();
  } else {
    hideRewards();
  }
  UpdateGame();
}

function BuyXPMult() {
  var price = GetMultPrice(0);
  if (Game.Shards >= price) {
    Game.Shards -= price;
    Game.Upgrades[0]++;
  }
  UpdateGame();
}

function BuyPowerMult() {
  var price = GetMultPrice(1);
  if (Game.Shards >= price) {
    Game.Shards -= price;
    Game.Upgrades[1]++;
  }
  UpdateGame();
}

function BuyLifeMult() {
  var price = GetMultPrice(2);
  if (Game.Shards >= price) {
    Game.Shards -= price;
    Game.Upgrades[2]++;
  }
  UpdateGame();
}

function BuyInvSlot() {
  var price = GetMultPrice(3);
  if (Game.Shards >= price) {
    Game.Shards -= price;
    Game.Upgrades[3]++;
  }
  UpdateGame();
}

function GetMultPrice(id) {
  if (Game.Upgrades[id] == null) { Game.Upgrades[id] = 0; }
  var price = 2;
  if (Game.Upgrades[id] >= 5) { price = 3; }
  if (Game.Upgrades[id] >= 10) { price = 4; }
  if (Game.Upgrades[id] >= 20) { price = 5; }
  if (Game.Upgrades[id] >= 30) { price = 7.5; }
  if (Game.Upgrades[id] >= 40) { price = 10; }
  if (Game.Upgrades[id] >= 50) { price = 12; }
  if (Game.Upgrades[id] >= 60) { price = 14; }
  if (Game.Upgrades[id] >= 70) { price = 15; }
  if (Game.Upgrades[id] >= 80) { price = 25; }

  if (id == 0 && Game.Upgrades[id] >= 200) { price = 1e999; }
  if (id == 1 && Game.Upgrades[id] >= 100) { price = 1e999; }
  if (id == 2 && Game.Upgrades[id] >= 100) { price = 1e999; }
  if (id == 3 && Game.Upgrades[id] >= 50) { price = 1e999; }
  return price;
}

function ChangeWT() {
  if (Game.Level >= Game.MaxLevel && Game.Ranking >= (((30 + (Game.Simulation * 5)) * 10) - 5) && Game.FNMission >= Game.TotalMissions) {
    Game.Simulation++;
    Game.xp = [0, 0, 0];
    Game.Level = 1;
    Game.Shards = Math.round(Game.Ranking / 10 / 5 - 6);
    Game.LifeMult = 1;
    Game.PowerMult = 1;
    Game.Emp = 0;
    Game.inventory = [];
    //Game.Upgrades = [0, 0, 0, 0];
    Game.MaxUPC = [0, 0, 0, 0];
    Game.core1 = ["Basic Armor", "Normal", 100, 10, 1];
    Game.core2 = ["Basic Armor", "Normal", 100, 10, 1];
    Game.core3 = ["Basic Armor", "Normal", 100, 10, 1];
    Game.core4 = ["Basic Armor", "Normal", 100, 10, 1];
    Game.core1K = [0, 0];
    Game.core2K = [0, 0];
    Game.core3K = [0, 0];
    Game.core4K = [0, 0];
    Game.RLS[1] = ["Alpha Relic", "Normal", 0, 0];
    Game.RLS[2] = ["Alpha Relic", "Normal", 0, 0];
    Game.RLS[3] = ["Alpha Relic", "Normal", 0, 0];
    Game.RLS[4] = ["Alpha Relic", "Normal", 0, 0];
    Game.isInFight = 0;
    Game.MissionsCompleted = [];
    Game.Location = 0;
    Game.MissionStarted = [false, 0, 0, 0];
    Game.ATR[0] = 0;
    Game.ATR[1] = 0;
    Game.ATR[2] = 0;
    Game.ATR[3] = 0;
    Game.ATR[4] = 0;
    Game.ATR[5] = 0;
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