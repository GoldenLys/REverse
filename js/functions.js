// Save and load functions
function save() {
  localStorage.setItem("Alpha", JSON.stringify(Game));
  localStorage.setItem("Alpha-Backup", JSON.stringify(Game.username));
}

function BackupData() {
  localStorage.setItem("Alpha-Backup", JSON.stringify(Game.username));
}

function load() {
  let savegame = JSON.parse(localStorage.getItem("Alpha"));
  for (var property in savegame) {
    if (typeof savegame[property] !== "undefined")
      Game[property] = savegame[property];
  }
  loadBackup();
}

function loadBackup() {
  let Backup = JSON.parse(localStorage.getItem("Alpha-Backup"));
  Game.username = Backup;
}

function exportSave() {
  window.getSelection().removeAllRanges();
  NOTICE("Save exported", "Your save is now copied in your clipboard.");
  $("#exportBody").html("<textarea id='saveCode'>" + btoa(JSON.stringify(Game)) + "</textarea>");
  var textField = document.getElementById("saveCode");
  textField.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  $("#exportBody").html("");
}

function importSave() {
  var save = prompt("Paste your save code here");
  if (save) restoreSave(save);
}

function restoreSave(save) {
  try {
    var decoded = atob(save);
    JSON.parse(decoded);
    if (decoded) {
      localStorage.setItem("Alpha", decoded);
      load();
    } else {
      $("#codereturn").html("ERROR: Invalid Save Data");
    }
  } catch (err) {
    $("#codereturn").html("ERROR: Invalid Save Data");
  }
}

function Reset() {
  POPUP("Confirm", `Do you really want to reset all your stats ?`, 5);
}

function confirmReset() {
  localStorage.clear();
  location.reload();
}

//MISC FUNCTIONS

function fix(x, type) {
  if (type == 0) return numeral(x).format("0");
  if (type == 1) return numeral(x).format("0,0");
  if (type == 2) return numeral(x).format("0%");
  if (type == 3) return numeral(x).format("0.0%");
  if (type == 4) return numeral(x).format("0.0a");
  if (type == "auto") {
    if (x <= 1000) return numeral(x).format("0a");
    if (x > 1000) return numeral(x).format("0.0a");
    if (x > 10000) return numeral(x).format("0.00a");
  }
}

function getDate() {
  var today = new Date();
  var date = today.toLocaleDateString();
  var time = today.toLocaleTimeString();
  CurrentDate = date + " at " + time;
  return CurrentDate;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const toHHMMSS = function (number) {
  let CONFIG = {
    seconds: parseInt(number, 10),
    texts: [" hour", " minute", " second"],
    time: [0, 0, 0],
    calc: []
  };

  for (let TYPE in CONFIG.time) {
    CONFIG.calc = [Math.floor(CONFIG.seconds / 3600), Math.floor((CONFIG.seconds - CONFIG.time[0] * 3600) / 60), Math.floor(CONFIG.seconds - CONFIG.time[0] * 3600 - CONFIG.time[1] * 60)];
    CONFIG.time[TYPE] = CONFIG.calc[TYPE];
    CONFIG.texts[TYPE] = CONFIG.time[TYPE] === 1 ? CONFIG.time[TYPE] + CONFIG.texts[TYPE] : CONFIG.time[TYPE] + CONFIG.texts[TYPE] + "s";
    if (CONFIG.time[TYPE] === 0 && TYPE != 2) CONFIG.texts[TYPE] = ``;
  }

  return `${CONFIG.texts[0]} ${CONFIG.texts[1]} ${CONFIG.texts[2]}`;
};

//UI FUNCTIONS

const OPEN_MENU = function (MENU, STATUS) {
  CLOSE_MENUS();
  if (STATUS === "active") {
    $("#DIV-" + MENU).show();
    $("#DIV-COMBAT").hide();
    $(".BUTTONS_ACTIONS").hide();
  }
  else {
    $("#DIV-" + MENU).hide();
    $("#DIV-COMBAT").show();
    $(".BUTTONS_ACTIONS").show();
  }
  TOP10();
  UPDATE_STATS();
  UpdateGame();
};

const CLOSE_MENUS = function () {
  let MENUS = ["INVENTORY", "PRESTIGE", "STATS", "LEADERBOARD", "SETTINGS", "CREDITS"];
  for (let M in MENUS) {
    $("#DIV-" + MENUS[M]).hide();
  }
  $("#DIV-COMBAT").show();
  $(".BUTTONS_ACTIONS").show();
};

function SelectTAB(TAB) {
  let TABS = [["EXPLORE", "exploration"], ["MISSIONS", "missions"]];
  for (let T in TABS) {
    if (TABS[T][0] != TAB) { $("#DIV-" + TABS[T][0]).hide(); $("#" + TABS[T][1]).removeClass("active"); }
    else { $("#DIV-" + TABS[T][0]).show(); $("#" + TABS[T][1]).addClass("active"); }
  }
}

function GetEnemyHPPercent() {
  var value = (100 / Game.Enemy[4]) * Game.Enemy[5];
  if (value <= 0) value = 0;
  if (value > 100) value = 100;
  return value;
}

function GetPlayerHPPercent() {
  var value = (100 / APP.CoreBaseLife) * APP.CoreLife;
  if (value <= 0) value = 0;
  if (value > 100) value = 100;
  return value;
}

function GetEXPPercent() {
  value = (100 * (Game.xp[0] - CalcEXP(Game.Level - 1))) / (CalcEXP(Game.Level) - CalcEXP(Game.Level - 1));
  if (value < 1) value = 1;
  if (value > 100) value = 100;
  if (value > 99 && Game.xp[0] < Game.xp[1]) value = 99;
  return value;
}

//GAME FUNCTIONS

function ChangeAvatar() {
  if (Game.Avatar < 50) Game.Avatar++; else Game.Avatar = 1;
  UpdateUI();
}

function CheckCode(debug) {
  CXD = firebase.database().ref("codes");
  CXD.on("child_added", function (code) {
    APP.codes[code.key] = code.val();
  });
  var code = $("#promocode").val();
  if (code != null) {
    if (code === APP.codes[1] || code === APP.codes[2] || code === APP.codes[3] || code === APP.codes[4] || code === APP.codes[5] || code === APP.codes[6] || code === APP.codes[7] || code === APP.codes[8] || code === APP.codes[9] || code === APP.codes[10]) {
      if (code === APP.codes[1]) {
        $("#codereturn").html("Code Accepted, name change.");
        NewUserData(Game.username);
      }
      if (code === APP.codes[2]) {
        $("#codereturn").html("Code Accepted, raising all Armor slots by 1.");
        for (var UPC = 0; UPC < 4; UPC++) {
          Game.MaxUPC[UPC]++;
        }
      }
      if (code === APP.codes[3]) {
        $("#codereturn").html("Code Accepted, you are now at max level.");
        Game.Level = APP.MaxLevel;
      }
      if (code === APP.codes[4]) {
        $("#codereturn").html("Code Accepted, you just advanced to </i> <i class='globe icon'></i>" + (Game.Simulation + 1));
        Game.Level = APP.MaxLevel;
        Game.Armors[1][4] = APP.MaxScore;
        Game.Armors[2][4] = APP.MaxScore;
        Game.Armors[3][4] = APP.MaxScore;
        Game.Armors[4][4] = APP.MaxScore;
        Game.Weapons.Main[3] = APP.MaxScore;
        Game.Weapons.Special[3] = APP.MaxScore;
        ChangeWT();
      }
      if (code === APP.codes[5]) {
        if (Game.Simulation > 1) {
          $("#codereturn").html("Code Accepted, you just lowered to <i class='globe icon'></i> " + (Game.Simulation - 1));
          Game.Simulation--;
        } else {
          invalidCode(3);
        }
      }
      if (code === APP.codes[6]) {
        $("#codereturn").html("Code Accepted, save exported to your clipboard.");
        exportSave();
      }
      if (code === APP.codes[7]) {
        $("#codereturn").html("Code Accepted, external save imported to your current save.");
        importSave();
      }
      if (code === APP.codes[8]) {
        $("#codereturn").html("Code Accepted, cloud save done.");
        writeUserData();
        APP.lastCloudSave = 0;
      }
      if (code === APP.codes[9]) {
        $("#codereturn").html("Code Accepted, Finished the story.");
        Game.Level = APP.MaxLevel;
        Game.Armors[1][4] = APP.MaxScore;
        Game.Armors[2][4] = APP.MaxScore;
        Game.Armors[3][4] = APP.MaxScore;
        Game.Armors[4][4] = APP.MaxScore;
        Game.Weapons.Main[3] = APP.MaxScore;
        Game.Weapons.Special[3] = APP.MaxScore;
        Game.MissionStarted = [false, 0, 0, 0];
        for (var Mission in GLOBALS.MISSIONS) { Game.MissionsCompleted[Mission] = 1; }
      }
      if (code === APP.codes[10]) {
        $("#codereturn").html("Code Accepted, Reset save.");
        Game.username = "Default";
        Backup = "Default";
        save();
        confirmReset();
      }
    } else {
      if (debug != 1) {
        CheckCode(1);
      }
      invalidCode(1);
    }
  } else {
    invalidCode(2);
  }
  APP.codes = [];
  UpdateGame();
}

function invalidCode(error) {
  $("#codereturn").html("Invalid code ! (error " + error + ")");
}

function helpScore() {
  POPUP("Score Tutorial", "1) It's worked out from the Armors you have, so try to pick the Armors that gets you the highest score possible.<br>That way you'll progress through the Dimensions much faster, even if you take a slight hit on your stats. <br><br>2) Your total armor dictates the score for the loot that drops.<br><br>3) Your score is limited by your actual dimension and the maximum score can be seen in the statistics.");
}

function GenExplorationMenu() {
  $("#DIV-EXPLORE").html("");
  let QUALITIES = ["Normal", "Common", "Uncommon", "Rare", "Epic", "Exotic", "Divine"];

  for (var E in GLOBALS.LOCATIONS) {
    let QUALITY = APP.ScoreModeEnabled == 0 ? QUALITIES[GLOBALS.LOCATIONS[E][3]] : "Divine";
    var MINLEVEL = Game.Level >= GLOBALS.LOCATIONS[E][1] ? "pw green" : "pw red";
    var MAXLEVEL = Game.Level >= GLOBALS.LOCATIONS[E][2] ? "pw green" : "pw red";
    let LEVEL = APP.ScoreModeEnabled == 0 ? `<span class="${MINLEVEL}">${GLOBALS.LOCATIONS[E][1]} </span>-<span class="${MAXLEVEL}"> ${GLOBALS.LOCATIONS[E][2]}</span>` : "<span class='pw green'>" + APP.MaxLevel + "</span>";
    var UNLOCKED = Game.Level >= GLOBALS.LOCATIONS[E][1] ? "pw green bold" : "pw red bold";
    if (Game.MissionsCompleted[GLOBALS.LOCATIONS[E][4]] == 0) UNLOCKED = "pw red bold";
    var UNLOCKTEXT = Game.MissionsCompleted[GLOBALS.LOCATIONS[E][4]] == 1 ? "<span class='pw green'>" + GLOBALS.MISSIONS[GLOBALS.LOCATIONS[E][4]][0] + " - Finished</span>" : "<span class='pw red'>" + GLOBALS.MISSIONS[GLOBALS.LOCATIONS[E][4]][0] + " - Unfinished</span>";

    let BTN = Game.MissionsCompleted[GLOBALS.LOCATIONS[E][4]] == 1 ? "<div class='pw fluid darkgrey button' onclick='explore(" + E + ");' >Travel <i class='" + UNLOCKED + " fal fa-arrow-right'></i></div>" : "";
    if (Game.MissionStarted[0] || Game.Location == E) BTN = "";
    let LOCATION_COLOR = Game.Location != E ? "pw segment dark" : "pw segment active";

    if (GLOBALS.LOCATIONS[E][1] < Game.Level + 1 && E != 11 && E != 17) {
      let CONTENT = ("<div class='" + LOCATION_COLOR + "'><h3 class='text-center'>" + GLOBALS.LOCATIONS[E][0] + "<span class='pw white'> - Lv. " + LEVEL + "</span></h3>\
<div class='pw label green'><i class='fas fa-ballot-check icon'></i> " + UNLOCKTEXT + "<br>\
<i class='fas fa-sack icon'></i> <span class='" + QUALITY + "'>" + QUALITY + "</span></div>\
" + BTN + "</div>");

      $("#DIV-EXPLORE").append(CONTENT);
    }
  }
}

function hideRewards() {
  if (Game.isInFight != 0) Game.isInFight = 0;
  UpdateGame();
  CompleteMission();
}

function explore(loc) {
  if (GLOBALS.LOCATIONS[loc][1] <= Game.Level && !Game.MissionStarted[0]) {
    if (Game.MissionsCompleted[GLOBALS.LOCATIONS[loc][4]] == 1) {
      Game.Location = loc;
      Game.isInFight = 0;
      Game.LastEscape = 30;
      GenExplorationMenu();
      UpdateGame();
    }
  }
}

function UpdatePage() {
  location.reload();
}

function rgbToHex(rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) hex = "0" + hex;
  if (hex == 0) hex = "00";
  return hex;
}

function fullColorHex(r, g, b) {
  let red = rgbToHex(r);
  let green = rgbToHex(g);
  let blue = rgbToHex(b);
  return red + green + blue;
}

function CalcEXP(level) {
  let exp = (level * 25) + (500 * (level / 3.5));
  for (let LE = 0; LE < (level + 1); LE++) {
    if (LE < 30) exp += exp * (15 / 100); else exp += exp * (25 / 100);
  }
  if (level <= 0) exp = 0;
  if (level == 1) exp = 100;
  return Math.round(exp);
}

function ChangeStep(type) {
  //0 = BACK & 1 = NEXT
  if (type == 0 && APP.WelcomeData[0] > 1) APP.WelcomeData[0]--;
  if (type == 1) APP.WelcomeData[0]++;

  for (var L = 1; L < 6; L++) {
    $("#step" + L).attr("class", "step");
    $("#tutorial-" + L).hide();
  }

  for (var L2 = 1; L2 < APP.WelcomeData[0] + 1; L2++) {
    $("#step" + L2).attr("class", "completed step");
  }
  $("#step" + APP.WelcomeData[0]).attr("class", "active step");
  $("#tutorial-" + APP.WelcomeData[0]).show();
  if (APP.WelcomeData[0] > 1) { $("#WelcomePrevious").show(); } else { $("#WelcomePrevious").hide(); }
}

function WelcomeNext() {

  if (APP.WelcomeData[0] == 5) {
    $("#GAME").show();
    $("#INTRODUCTION").hide();
    $(".footer").show();
    if (Game.username == "Default") Game.username = APP.WelcomeData[1];
    Game.isInFight = 0;
    LOGIN("FIRST_TIME");
    save();
  }

  if (APP.WelcomeData[0] == 4) {
    if (APP.WelcomeData[2] == "Warrior") Game.Upgrades = [0, 5, 0];
    if (APP.WelcomeData[2] == "Paladin") Game.Upgrades = [0, 0, 5];
    if (APP.WelcomeData[2] == "Ninja") Game.Upgrades = [5, 0, 0];
    if (APP.WelcomeData[2] != "Warrior" && APP.WelcomeData[2] != "Paladin" && APP.WelcomeData[2] != "Ninja") { $("#namehelp").html("You need to select a class !"); } else {
      ChangeStep(1);
      Game.class = APP.WelcomeData[2];
      $("#namehelp").html("");

      $("#WELCOME_DATA").html(`
<img class='pw centered medium image' src='images/avatars/avatar${Game.Avatar}.jpg'>
${APP.WelcomeData[1]}<div class='pw inline label'>Level 1</div>
<div class="pw alpha inline label">${APP.WelcomeData[2]}</div>
`);
      $("#WelcomeNext").html("Start <i class='fal fa-arrow-right'></i>");
    }
  }

  if (APP.WelcomeData[0] == 3) ChangeStep(1);

  if (APP.WelcomeData[0] == 2) {
    NICKNAME = $("#PlayerName").val();
    if (NICKNAME != null) {
      if (NICKNAME == null || NICKNAME == "" || NICKNAME == " " || NICKNAME == "_" || NICKNAME.length < 3 || NICKNAME == "null") {
        ErrorName();
      } else {
        NICKNAME = NICKNAME.replace(/[^a-zA-Z0-9]/g, '_');
        if (NICKNAME == "Neo" || NICKNAME == "NEO" || NICKNAME == "neo" || NICKNAME == "GoldenLys" || NICKNAME == "Purpy" || NICKNAME == "Purple" || NICKNAME == "Purple_Wizard") NICKNAME = "Adventurer" + random(10000, 999999);
        Backup = APP.WelcomeData[1] = NICKNAME;
        ChangeStep(1);
        $("#namehelp").html("");
      }
    } else {
      ErrorName();
    }
  }
  if (APP.WelcomeData[0] == 1) ChangeStep(1);
}

function ErrorName() {
  $("#namehelp").html("You need to write a username !");
}

const OpenLink = function (url) { if (url != "#") window.open(url, '_blank').focus(); };


var NOTICE_TIMER = [];
const NOTICE = function (title, content) {
  $("#notice-title").html(title);
  $("#notice-text").html(content);
  $("#NOTICE").attr("class", "notice active");
  NOTICE_TIMER = [5, setInterval(NOTICE_TIMING, 1000)];
  NOTICE_TIMING();
};

const NOTICE_TIMING = function () {

  let PERCENT = (100 / 5) * NOTICE_TIMER[0];
  $("#notice-countdown").attr("style", `width: calc(${PERCENT}% - 20px);`);
  if (NOTICE_TIMER[0] > 0) NOTICE_TIMER[0]--;
  else {
    clearInterval(NOTICE_TIMER[1]);
    $("#NOTICE").attr("class", "notice");
    $("#notice-title").html("");
    $("#notice-text").html("");
  }
};

const POPUP = function (title, content, buttons) {
  let buttons_type = [
  /* DEFAULT                    */  `<div id="POPUP_CLOSE" class="pw fluid red button"><i class="fal fa-times"></i> Close</div>`,
  /* DESTROY WEAPON  */ `<div class="pw fluid buttons"><div class='pw red button' onclick='DestroyWeapon("${APP.ToDelete.type}");'><i class='fas fa-trash'></i> Confirm</div><div id="POPUP_CLOSE" class="pw grey button"><i class="fal fa-times"></i> Cancel</div></div>`,
  /* CONFIRM RIFT          */  `<div class="pw fluid buttons"><div id="ConfirmRift" onclick="ConfirmWT();" class="pw green button"><i class="fal fa-check"></i> Yes</div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> No</div></div>`,
  /* DESTROY ARMOR    */  `<div class="pw fluid buttons"><div class='pw red button' onclick='DestroyCore(${APP.ToDelete.type});'><i class='fas fa-trash'></i> Confirm</div><div id="POPUP_CLOSE" class="pw grey button"><i class="fal fa-times"></i> Cancel</div></div>`,
  /* INSTALL RELIC          */  `<div class="pw fluid buttons"><div id='replace-btn' onclick='InstallRelic(${APP.ToAdd[0]}, ${APP.ToAdd[1]});' class='pw alpha button'><i class="fal fa-check"></i> Replace Relic </div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> Cancel</div></div>`,
  /* RESET SAVE             */  `<div class="pw fluid buttons"><div class="pw alpha button" onclick="confirmReset();" ><i class="fal fa-check"></i> Yes</div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> Cancel</div></div>`,
  /* CONFIRM ARMOR    */ `<div class="pw fluid buttons"><div id='replace-btn' onclick='DefineCore(${APP.ToAdd[0]}, ${APP.ToAdd[1]});' class='pw alpha button'><i class="fal fa-check"></i> Replace the ${GLOBALS.ARMORS_TYPE[APP.ToAdd[0]]}</div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> Cancel</div></div>`,
  /* CONFIRM WEAPON  */ `<div class="pw fluid buttons"><div id='replace-btn' onclick='DefineWeapon("${APP.ToAdd[0]}", ${APP.ToAdd[1]});' class='pw alpha button'><i class="fal fa-check"></i> Replace the ${APP.ToAdd[0]} Weapon</div><div id="POPUP_CLOSE" class="pw red button"><i class="fal fa-times"></i> Cancel</div></div>`,
  ];
  if (typeof (buttons) === 'undefined') $("#popup-buttons").html(buttons_type[0]);
  else $("#popup-buttons").html(buttons_type[buttons]);
  $("#popup-title").html(title);
  $("#popup-text").html(content);
  $("#POPUP").attr("class", "popup active");
  $("#POPUP_CLOSE").on("click", function () { POPUP_CLOSE(); });
};

const POPUP_CLOSE = function () {
  $("#POPUP").attr("class", "popup");
  $("#popup-title").html("");
  $("#popup-text").html("");
  hideRewards();
};

const LOGIN = function (state) {
  let text = state === "RETURN" ? `<b>Welcome back to <span class='pw alpha'>${GLOBALS.NAME}</span>, ${Game.username}</b><br>Would you like to login ?` : `<b>Hello ${Game.username} !</b><br>It's your first time playing ${GLOBALS.NAME}, would you like to login ?`;
  $("#wb-title").html(GLOBALS.NAME);
  $("#wb-text").html(text);
  $("#LOGIN-NOTICE").attr("class", "popup active");
};

//THEME FUNCTIONS

function ResetTheme(code) {
  if (code != 2) Game.Theme = "19 241 210";
  $('body').attr("style", `--ALPHA: ${Game.Theme};`);
  if (code == 1) save();
}

function ThemeDefine() {
  $('body').attr("style", `--ALPHA: ${Game.Theme};`);
  UpdateGame();
}

const LATEST_LOCATION_UNLOCKED = function () {
  let RESULT = 0;
  for (let LOCATION in GLOBALS.LOCATIONS) {
    if (GLOBALS.LOCATIONS[LOCATION][1] <= Game.Level && Game.MissionsCompleted[GLOBALS.LOCATIONS[LOCATION][4]] && GLOBALS.LOCATIONS[LOCATION][3] != 2) RESULT = LOCATION;
  }
  return RESULT;
};