// Save and load functions
var canSave = 1;

function save() {
  if (canSave == 1) {
    localStorage.setItem("Alpha", JSON.stringify(Game));
    localStorage.setItem("Alpha-Backup", JSON.stringify(Game.username));
  }
}

function BackupData() {
  localStorage.setItem("Alpha-Backup", JSON.stringify(Game.username));
}

function loadBackup() {
  var Backup = JSON.parse(localStorage.getItem("Alpha-Backup"));
  Game.username = Backup;
  UpdateGame();
}

function load() {
  var savegame = JSON.parse(localStorage.getItem("Alpha"));

  for (var property in savegame) {
    if (typeof savegame[property] !== "undefined")
      Game[property] = savegame[property];
  }
}

function exportSave() {
  window.getSelection().removeAllRanges();
  showmessage("Save exported", "Your save is now copied in your clipboard.");
  $("#exportBody").html("<textarea id='saveCode'>" + btoa(JSON.stringify(Game)) + "</textarea>");
  var textField = document.getElementById("saveCode");
  textField.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  $("#exportBody").html("");
}

function exportTheme() {
  window.getSelection().removeAllRanges();
  showmessage("Theme exported", "This theme is now copied in your clipboard.");
  $("#exportBody").html("<textarea id='saveCode'>" + btoa(JSON.stringify(Game.Theme)) + "</textarea>");
  var textField = document.getElementById("saveCode");
  textField.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  $("#exportBody").html("");
}

function importTheme() {
  var save = prompt("Paste your theme code here");
  if (save) {
    try {
      var decoded = atob(save);
      if (decoded) {
        Game.Theme = JSON.parse([decoded]);
        UpdateUI();
      } else {
        $("#codereturn").html("ERROR: Invalid Theme");
      }
    } catch (err) {
      $("#codereturn").html("ERROR: Invalid Theme");
    }
  }
}

function importSave() {
  var save = prompt("Paste your save code here");
  if (save) {
    restoreSave(save);
  }
}

function restoreSave(save) {
  try {
    var decoded = atob(save);
    JSON.parse(decoded);
    if (decoded) {
      localStorage.setItem("Alpha", decoded);
      canSave = 0;
      location.reload();
    } else {
      $("#codereturn").html("ERROR: Invalid Save Data");
    }
  } catch (err) {
    $("#codereturn").html("ERROR: Invalid Save Data");
  }
}

function Reset() {
  $("#modal-6").modal("show");
}

function confirmReset() {
  canSave = 0;
  localStorage.clear();
  location.reload();
}

//MISC FUNCTIONS

function fix(x, type) {
  if (type == 0) return numeral(x).format("0ib");
  if (type == 1)
    if (x == 0.5) {
      return "0.5B";
    } else return numeral(x).format("0.0ib");
  if (type == 2) return numeral(x).format("0.00ib");
  if (type == 3) return numeral(x).format("0,0");
  if (type == 4) return numeral(x).format("0");
  if (type == 5) {
    if (x < 1000) return numeral(x).format("0a");
    else
      return numeral(x).format("0.0a");
  }
  if (type == 6) {
    if (x <= 1000) return numeral(x).format("0a");
    if (x > 1000) return numeral(x).format("0.0a");
    if (x > 10000) return numeral(x).format("0.00a");
  }
  if (type == 7) return numeral(x).format("0.0a");
  if (type == 8) return numeral(x).format("0.00%");
  if (type == 9) return numeral(x).format("0%");
  if (type == 10) return numeral(x).format("0.0%");
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

function toHHMMSS(id) {
  var sec_num = parseInt(id, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  var secondstext = 0;
  var minutestext = 0;
  var hourstext = 0;
  if (hours > 0) {
    hourstext = hours + " hours ";
  } else {
    hourstext = "";
  }
  if (minutes > 0) {
    minutestext = minutes + " minutes ";
  } else {
    minutestext = "";
  }
  if (seconds > 0) {
    secondstext = seconds + " seconds ";
  } else {
    if (minutes > 0) {
      secondstext = "";
    } else {
      secondstext = "0 seconds";
    }
  }
  if (hours == 1) {
    hourstext = hours + " hour ";
  }
  if (minutes == 1) {
    minutestext = minutes + " minute ";
  }
  if (seconds == 1) {
    secondstext = seconds + " second ";
  }
  var time = hourstext + minutestext + secondstext;
  return time;
}

var config = {
  apiKey: "AIzaSyAsKlY89gHACvQHywLv04xtxPBvhRGoNYo",
  authDomain: "matrix-731a7.firebaseapp.com",
  databaseURL: "https://matrix-731a7.firebaseio.com",
  projectId: "matrix-731a7",
  storageBucket: "matrix-731a7.appspot.com",
  messagingSenderId: "752237806136",
  appId: "1:752237806136:web:08da7c06397b384b201ccd",
  measurementId: "G-FK9048JSDP"
};

firebase.initializeApp(config);
firebase.analytics();
var provider = new firebase.auth.GoogleAuthProvider();

(function () {
  // Using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
})();

function login() {
  firebase.auth().signInWithPopup(provider).then(function (result) {
    var token = result.credential.accessToken;
    var user = result.user;
    Email = user.email;
    $("#modal-5").modal("hide");
    isTabActive = "None";
    Game.isInFight = 0;
  });
  LoggedIn = 1;
  SendStats();
  UpdateGame();
}

var PAGE = 1;
var MAXVIEW = 10;
var MINVIEW = 1;
var LastId = 0;
var LeaderFilter = 0;

function filter(f) {
  LeaderFilter = f;
  UpdateGame();
  TOP10();
}

function ResetLeaderBoard() {
  $("#LEADERBOARD").html("<thead><tr class='shadow'><th class='ui center aligned'></th><th class='ui center aligned'>Name</th><th class='ui center aligned'><a onclick='filter(1);'>Ranking</a></th><th class='ui center aligned'><a onclick='filter(0);'>Dimension</a></th><th class='ui center aligned'>Power</th><th class='ui center aligned'>Life</th><th class='ui center aligned'>Ratio (K/D)</th>");
}

function writeUserData() {
  if (location.href.match(/(goldenlys.github.io).*/) && Game.username != "Default" && Game.username != null && LoggedIn == 1) {
    firebase.database().ref('users/' + Game.username).set({
      Name: Game.username,
      Email: Email,
      Order: (-1 * Ranking) - (100000 * Game.Simulation),
      Order2: -1 * Ranking,
      Level: Game.Level,
      Ranking: Ranking,
      WT: Game.Simulation,
      CorePower: WeaponsPower,
      CoreLife: CoreBaseLife,
      Kills: Game.Wins,
      Deaths: Game.Loses,
      Avatar: Game.Avatar,
      Defeated: Game.Defeated,
      Version: version,
      Theme: Game.Theme[0],
    });
  }
}

function NewUserData(old) {
  if (old != "Default" && old == Game.username) {
    firebase.database().ref('users/' + old).set(null);
    var newname = prompt("Please write a new name");

    Game.username = newname;
    Backup = newname;
  }
}

function ReadDB() {
  var ref = firebase.database().ref("users");
  var CXD = firebase.database().ref("codes");
  CXD.on("child_added", function () { });
  Leader = 0;
  id = 0;
  ResetLeaderBoard();
  if (LeaderFilter == 0) {
    ref.orderByChild("Order").limitToLast(100000).on("child_added", function (snapshot) {
      if (Game.config[4] == 0) {
        UpdateDB(snapshot);
      } else {
        if (snapshot.val().Version >= version) {
          UpdateDB(snapshot);
        }
      }
    });
  } else {
    ref.orderByChild("Order2").limitToLast(100000).on("child_added", function (snapshot) {
      if (snapshot.val().Version > 1.15) {
        if (Game.config[4] == 0) {
          UpdateDB(snapshot);
        } else {
          if (snapshot.val().Version >= version) {
            UpdateDB(snapshot);
          }
        }
      }
    });
  }
}

function UpdateDB(snapshot) {
  id++;
  var isPlayer = "";
  if (snapshot.key === Game.username + " " || snapshot.key === Game.username) {
    Leader = id;
  }
  if (id >= MINVIEW && id <= MAXVIEW) {
    if (snapshot.val().Version > 1.09) {
      if (snapshot.val().Avatar == undefined) {
        Avatar = 1;
      } else {
        Avatar = snapshot.val().Avatar;
      }
      if (snapshot.val().Theme == undefined) {
        Theme = $("*").css("--white");
      } else {
        Theme = snapshot.val().Theme;
      }
      if (id == Leader) { isPlayer = "fight"; }
      var DEATHS = snapshot.val().Deaths == 0 ? 1 : snapshot.val().Deaths;
      $("#LEADERBOARD").append("<tr id='leader-" + id + "' class='" + isPlayer + "'>" +
        "<td class='center aligned'>#" + id + "</td>" +
        "<td class='center aligned' style='color:" + Theme + ";'><img class='ui mini avatar image' src='DATA/avatars/avatar" + Avatar + ".jpg'>" + snapshot.key + "</td>" +
        "<td class='center aligned'><i class='fad fa-dice-d20'></i>" + fix(snapshot.val().Ranking, 4) + " (" + fix(snapshot.val().Level, 4) + ") " + "</td>" +
        "<td class='center aligned'>" + fix(snapshot.val().WT, 3) + "</td>" +
        "<td class='center aligned'>" + fix(snapshot.val().CorePower, 5) + "</td>" +
        "<td class='center aligned'>" + fix(snapshot.val().CoreLife, 5) + "</td>" +
        "<td class='center aligned'>" + fix(snapshot.val().Kills / DEATHS, 7) + "</td>" +
        "</tr>");
    } else {
      id--;
    }
  }
  LastId = id;
  if (Leader == 0) {
    Leader = "Unranked";
  }
}

//UI FUNCTIONS
function hideMenuTabs() {
  for (var id = 0; id < 10; id++) {
    $("#CATEGORIE-" + id).hide();
    $("#C" + id).removeClass("active");
    $("#C" + id).addClass("");
  }
}

function ClickEvents() {
  $("#menu").on("click", "div", function () {
    var id = $(this).data("id");
    hideMenuTabs();
    $("#CATEGORIE-" + id).show();
    $("#C" + id).addClass("active");
    $("#C" + id).removeClass("");
    TOP10();
  });
  $("#themeBTN1").on("click", function () {
    ThemeDefine(1);
  });
  $("#themeBTN2").on("click", function () {
    ThemeDefine(2);
  });
  $("#themeBTN3").on("click", function () {
    ThemeDefine(3);
  });
  $("#themeBTN4").on("click", function () {
    ThemeDefine(4);
  });
  $("#themeBTN5").on("click", function () {
    ThemeDefine(5);
  });
  $("#themeBTNR").on("click", function () {
    ResetTheme(1);
  });
  $("#attack-btn").on("click", function () {
    Attack();
  });
  $("#emp-btn").on("click", function () {
    LaunchEMP();
  });
  $("#cover-btn").on("click", function () {
    Protect();
  });
  $("#run-btn").on("click", function () {
    RunAway();
  });
  $("#WelcomeNext").on("click", function () {
    WelcomeNext();
  });
  $("#WelcomePrevious").on("click", function () {
    ChangeStep(0);
  });
  $("#closeMSG").on("click", function () {
    hideModals();
  });
  $("#WTBTN").on("click", function () {
    ChangeWT();
  });
  $("#CheckCode").on("click", function () {
    CheckCode();
  });
  $("#TOP10").on("click", function () {
    TOP10();
  });
  $("#TOPNEXT").on("click", function () {
    TOPNEXT();
  });
  $("#TOPPREVIOUS").on("click", function () {
    TOPPREVIOUS();
  });
  $("#ChangeAvatar").on("click", function () {
    ChangeAvatar();
  });
  $("#ChangeAvatarBegin").on("click", function () {
    ChangeAvatar();
  });
  $("#ChooseWarrior").on("click", function () {
    WelcomeData[2] = "Warrior";
    $("#warrior").attr("class", "ui fluid custom card");
    $("#paladin").attr("class", "ui fluid card");
    $("#ninja").attr("class", "ui fluid card");
  });
  $("#ChoosePaladin").on("click", function () {
    WelcomeData[2] = "Paladin";
    $("#warrior").attr("class", "ui fluid card");
    $("#paladin").attr("class", "ui fluid custom card");
    $("#ninja").attr("class", "ui fluid card");
  });
  $("#ChooseNinja").on("click", function () {
    WelcomeData[2] = "Ninja";
    $("#warrior").attr("class", "ui fluid card");
    $("#paladin").attr("class", "ui fluid card");
    $("#ninja").attr("class", "ui fluid custom card");
  });
  $("#WB-BTN").on("click", function () {
    $("#modal-5").modal("hide");
    $("#modal-5").modal("hide");
    isTabActive = "None";
    Game.isInFight = 0;
    UpdateGame();
  });
  $("#LOGIN-BTN").on("click", function () {
    $("#modal-5").modal("hide");
    login();
  });
  $("#xpm-btn").on("click", function () {
    BuyXPMult();
  });
  $("#pm-btn").on("click", function () {
    BuyPowerMult();
  });
  $("#lpm-btn").on("click", function () {
    BuyLifeMult();
  });
  $("#invu-btn").on("click", function () {
    BuyInvSlot();
  });
  $("#reset-btn").on("click", function () {
    Reset();
  });
  $("#Reload").on("click", function () {
    location.reload();
  });
  $("#Dcore1").on("click", function () {
    ConfirmDestroy(1);
  });
  $("#Dcore2").on("click", function () {
    ConfirmDestroy(2);
  });
  $("#Dcore3").on("click", function () {
    ConfirmDestroy(3);
  });
  $("#Dcore4").on("click", function () {
    ConfirmDestroy(4);
  });
  $("#DWeapon1").on("click", function () {
    ConfirmDestroyWeapon("Main");
  });
  $("#DWeapon2").on("click", function () {
    ConfirmDestroyWeapon("Special");
  });
  $("#export-btn").on("click", function () {
    exportSave();
  });
  $("#import-btn").on("click", function () {
    importSave();
  });
  $("#exportt-btn").on("click", function () {
    exportTheme();
  });
  $("#importt-btn").on("click", function () {
    importTheme();
  });
  $("#miscs-btn").on("click", function () {
    ShowMiscsMenu();
  });
  $("#prestige-btn").on("click", function () {
    ShowScoreMenu();
  });
  $("#missions-btn").on("click", function () {
    ShowMissionsMenu();
  });
  $("#exploration-btn").on("click", function () {
    ShowExplorationMenu();
  });
  $("#inventory-btn").on("click", function () {
    ShowInventoryMenu();
  });
  $("#stats-btn").on("click", function () {
    ShowStatsMenu();
  });
  $("#leaderboard-btn").on("click", function () {
    ShowLeaderboard();
  });
  $("#settings-btn").on("click", function () {
    ShowSettings();
  });
  $("#discord-btn").on("click", function () {
    window.open('https://discordapp.com/invite/SBuYeHh', '_blank');
  });
  $("#discord-btn2").on("click", function () {
    window.open('https://discordapp.com/invite/SBuYeHh', '_blank');
  });
  $("#AlertToggle").on("click", function () {
    if (Game.config[0] == 0) Game.config[0] = 1; else Game.config[0] = 0;
    UpdateGame();
  });
  $("#AlertToggle2").on("click", function () {
    if (Game.config[1] == 0) Game.config[1] = 1; else Game.config[1] = 0;
    UpdateGame();
  });
  $("#SkipRewards").on("click", function () {
    if (Game.config[2] == 0) Game.config[2] = 1; else Game.config[2] = 0;
    UpdateGame();
  });
  $("#AutoMissions").on("click", function () {
    if (Game.config[3] == 0) Game.config[3] = 1; else Game.config[3] = 0;
    UpdateGame();
  });
  $("#OnlyMyVersion").on("click", function () {
    if (Game.config[4] == 0) Game.config[4] = 1; else Game.config[4] = 0;
    ReadDB();
    UpdateGame();
  });
  $("#RM1").on("click", function () {
    if (Game.AutoRemove[0] == 0) Game.AutoRemove[0] = 1; else Game.AutoRemove[0] = 0;
    UpdateUI();
  });
  $("#RM2").on("click", function () {
    if (Game.AutoRemove[1] == 0) Game.AutoRemove[1] = 1; else Game.AutoRemove[1] = 0;
    UpdateUI();
  });
  $("#RM3").on("click", function () {
    if (Game.AutoRemove[2] == 0) Game.AutoRemove[2] = 1; else Game.AutoRemove[2] = 0;
    UpdateUI();
  });
  $("#RM4").on("click", function () {
    if (Game.AutoRemove[3] == 0) Game.AutoRemove[3] = 1; else Game.AutoRemove[3] = 0;
    UpdateUI();
  });
  $("#RM5").on("click", function () {
    if (Game.AutoRemove[4] == 0) Game.AutoRemove[4] = 1; else Game.AutoRemove[4] = 0;
    UpdateUI();
  });
  $("#RM6").on("click", function () {
    if (Game.AutoRemove[5] == 0) Game.AutoRemove[5] = 1; else Game.AutoRemove[5] = 0;
    UpdateUI();
  });
  $("#redNum").change(function () {
    if ($("#redNum").val() < 0) {
      $("#redNum").val("0");
    }
    $("#red").val($("#redNum").val());
    document.documentElement.style.setProperty('--temp1', "rgb(" + $("#redNum").val() + ", 0, 0)");
  });
  $("#red").change(function () {
    $("#redNum").val($("#red").val());
    document.documentElement.style.setProperty('--temp1', "rgb(" + $("#red").val() + ", 0, 0)");
  });
  $("#greenNum").change(function () {
    if ($("#greenNum").val() < 0) {
      $("#greenNum").val("0");
    }
    $("#green").val($("#greenNum").val());
    document.documentElement.style.setProperty('--temp2', "rgb(0, " + $("#greenNum").val() + ", 0)");

  });
  $("#green").change(function () {
    $("#greenNum").val($("#green").val());
    document.documentElement.style.setProperty('--temp2', "rgb(0, " + $("#green").val() + ", 0)");
  });
  $("#blueNum").change(function () {
    if ($("blueNum").val() < 0) {
      $("#blueNum").val("0");
    }
    $("#blue").val($("#blueNum").val());
    document.documentElement.style.setProperty('--temp3', "rgb(0, 0, " + $("#blueNum").val() + ")");
  });
  $("#blue").change(function () {
    $("#blueNum").val($("#blue").val());
    document.documentElement.style.setProperty('--temp3', "rgb(0, 0, " + $("#blue").val() + ")");
  });
}

function hideModals() {
  for (var id = 1; id < 10; id++) {
    ReadDB();
    $("#modal-" + id).modal("hide");
  }
}

function showmessage(title, message) {
  $("#message-title").html(title);
  $("#message-text").html(message);
  $("#modal-1").modal("setting", "closable", false).modal("show");
}

function GetEnnemyHPPercent() {
  var value = (100 / Game.Ennemy[4]) * Game.Ennemy[5];
  if (value < 1) value = 1;
  if (value > 100) value = 100;
  return value;
}

function GetPlayerHPPercent() {
  var value = (100 / CoreBaseLife) * CoreLife;
  if (value < 1) value = 1;
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

//THEME FUNCTIONS

function ResetTheme(code) {
  if (code != 2) Game.Theme = ["#00ffff", "#ffffff", "#262630bf", "#262630", "#101115"];
  document.documentElement.style.setProperty('--green', Game.Theme[0]);
  document.documentElement.style.setProperty('--white', Game.Theme[1]);
  document.documentElement.style.setProperty('--darkgrey5', Game.Theme[2]);
  document.documentElement.style.setProperty('--darkgrey', Game.Theme[3]);
  document.documentElement.style.setProperty('--black', Game.Theme[4]);
  if (code == 1) save();
}

function ThemeDefine(id) {
  if (id == 1) {
    Game.Theme[0] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val());
    document.documentElement.style.setProperty('--green', Game.Theme[0]);
  }
  if (id == 2) {
    Game.Theme[3] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val());
    document.documentElement.style.setProperty('--white', Game.Theme[1]);
  }
  if (id == 3) {
    Game.Theme[4] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val()) + "a6";
    Game.Theme[5] = "#" + fullColorHex($(red).val(), $(green).val(), $(blue).val());
    document.documentElement.style.setProperty('--darkgrey5', Game.Theme[2]);
    document.documentElement.style.setProperty('--darkgrey', Game.Theme[3]);
  }
  UpdateGame();
}

//GAME FUNCTIONS

function ChangeAvatar() {
  if (Game.Avatar < 39) Game.Avatar++; else Game.Avatar = 1;
  UpdateUI();
}

function CheckCode(debug) {
  CXD = firebase.database().ref("codes");
  CXD.on("child_added", function (code) {
    codes[code.key] = code.val();
  });
  var code = $("#promocode").val();
  if (code != null) {
    if (code === codes[1] || code === codes[2] || code === codes[3] || code === codes[4] || code === codes[5] || code === codes[6] || code === codes[7] || code === codes[8] || code === codes[9] || code === codes[10]) {
      if (code === codes[1]) {
        $("#codereturn").html("Code Accepted, name change.");
        NewUserData(Game.username);
      }
      if (code === codes[2]) {
        $("#codereturn").html("Code Accepted, raising all Armor slots by 1.");
        for (var UPC = 0; UPC < 4; UPC++) {
          Game.MaxUPC[UPC]++;
        }
      }
      if (code === codes[3]) {
        $("#codereturn").html("Code Accepted, you are now at max level.");
        Game.Level = MaxLevel;
      }
      if (code === codes[4]) {
        $("#codereturn").html("Code Accepted, you just advanced to </i> <i class='globe icon'></i>" + (Game.Simulation + 1));
        Game.Level = MaxLevel;
        Game.Armors[1][4] = MaxScore;
        Game.Armors[2][4] = MaxScore;
        Game.Armors[3][4] = MaxScore;
        Game.Armors[4][4] = MaxScore;
        Game.Weapons.Main[3] = MaxScore;
        Game.Weapons.Special[3] = MaxScore;
        ChangeWT();
      }
      if (code === codes[5]) {
        if (Game.Simulation > 1) {
          $("#codereturn").html("Code Accepted, you just lowered to <i class='globe icon'></i> " + (Game.Simulation - 1));
          Game.Simulation--;
        } else {
          invalidCode(3);
        }
      }
      if (code === codes[6]) {
        $("#codereturn").html("Code Accepted, save exported to your clipboard.");
        exportSave();
      }
      if (code === codes[7]) {
        $("#codereturn").html("Code Accepted, external save imported to your current save.");
        importSave();
      }
      if (code === codes[8]) {
        $("#codereturn").html("Code Accepted, cloud save done.");
        writeUserData();
        lastCloudSave = 0;
      }
      if (code === codes[9]) {
        $("#codereturn").html("Code Accepted, Finished the story.");
        Game.Level = MaxLevel;
        Game.Armors[1][4] = MaxScore;
        Game.Armors[2][4] = MaxScore;
        Game.Armors[3][4] = MaxScore;
        Game.Armors[4][4] = MaxScore;
        Game.Weapons.Main[3] = MaxScore;
        Game.Weapons.Special[3] = MaxScore;
        Game.MissionStarted = [false, 0, 0, 0];
        for (var Mission in Missions) { Game.MissionsCompleted[Mission] = 1; }
      }
      if (code === codes[10]) {
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
  codes = [];
  UpdateGame();
}

function invalidCode(error) {
  $("#codereturn").html("Invalid code ! (error " + error + ")");
}

function TOP10() {
  MAXVIEW = 10;
  MINVIEW = 1;
  PAGE = 1;
  UpdateUI();
  ReadDB();
}

function TOPPREVIOUS() {
  if (MAXVIEW > 10) {
    MAXVIEW -= 10;
    MINVIEW -= 10;
    PAGE--;
    UpdateUI();
    ReadDB();
  }
}

function TOPNEXT() {
  if (MAXVIEW + 1 <= LastId) {
    if (MAXVIEW < 10000) {
      MAXVIEW += 10;
      MINVIEW += 10;
      PAGE++;
      UpdateUI();
      ReadDB();
    }
  } else {
    UpdateUI();
  }
}

function helpScore() {
  showmessage("Score Tutorial", "1) It's worked out from the Armors you have, so try to pick the Armors that gets you the highest score possible. That way you'll progress through the Dimensions much faster, even if you take a slight hit on your stats. <br><br>2) Your total armor dictates the score for the loot that drops.<br><br>3) Your score is limited by your actual dimension and the maximum score can be seen in the statistics.");
}

function DCancel() {
  $('#modal-2').modal('hide');
}

function hideMenus() {
  $("#combat").hide();
  $("#gamemenu").hide();
  $("#prestige").hide();
  $("#statistics").hide();
  $("#leaderboard1").hide();
  $("#settings").hide();
  $("#cores").hide();
  $(".customB").hide();
}

function closeTabs() {
  hideMenus();
  $("#missions").hide();
  $("#exploration").hide();
  $("#inventory").hide();
  $("#miscs").hide();
  if (isTabActive == "None") {
    $("#combat").show();
    $(".customB").show();
  } else {
    $("#combat").hide();
    $(".customB").hide();
  }
  if (Game.isInFight == 2) {
    hideRewards();
  }
  $("#missions-btn").removeClass("active");
  $("#exploration-btn").removeClass("active");
  $("#inventory-btn").removeClass("active");
  $("#miscs-btn").removeClass("active");
}

function ShowMissionsMenu() {
  if (isTabActive != "Missions") { isTabActive = "Missions"; closeTabs(); $("#missions-btn").addClass("active"); $("#missions").show(); GenMissions(); }
  else { isTabActive = "None"; closeTabs(); }
}

function ShowExplorationMenu() {
  if (isTabActive != "Exploration") { isTabActive = "Exploration"; closeTabs(); $("#exploration-btn").addClass("active"); $("#exploration").show(); GenExplorationMenu(); }
  else { isTabActive = "None"; closeTabs(); }
}

function ShowInventoryMenu() {
  if (isTabActive != "Inventory") { isTabActive = "Inventory"; closeTabs(); $("#inventory-btn").addClass("active"); $("#inventory").show(); }
  else { isTabActive = "None"; closeTabs(); }
  UpdateUI();
}

function ShowMiscsMenu() {
  if (isTabActive == "Miscs" || isTabActive == "Dimension" || isTabActive == "Stats" || isTabActive == "Leaderboard" || isTabActive == "Settings") { isTabActive = "None"; closeTabs(); }
  else { isTabActive = "Miscs"; closeTabs(); $("#miscs-btn").addClass("active"); $("#miscs").show(); }
}

function ShowScoreMenu() {
  closeTabs();
  $("#miscs-btn").addClass("active");
  isTabActive = "Dimension";
  $("#prestige").show();
}

function ShowStatsMenu() {
  UpdateGame();
  closeTabs();
  $("#miscs-btn").addClass("active");
  isTabActive = "Stats";
  $("#statistics").show();
}

function ShowLeaderboard() {
  TOP10();
  UpdateGame();
  closeTabs();
  $("#miscs-btn").addClass("active");
  isTabActive = "Leaderboard";
  $("#leaderboard1").show();
}

function ShowSettings() {
  UpdateGame();
  closeTabs();
  $("#miscs-btn").addClass("active");
  isTabActive = "Settings";
  $("#settings").show();
}

function GenExplorationMenu() {
  $("#exploration").html("");
  var QUALITY = "";
  var BTN = "";
  var LEVEL = "";
  for (var E in POS) {
    if (POS[E][3] == 0) {
      QUALITY = "Normal";
    }
    if (POS[E][3] == 1) {
      QUALITY = "Common";
    }
    if (POS[E][3] == 2) {
      QUALITY = "Uncommon";
    }
    if (POS[E][3] == 3) {
      QUALITY = "Rare";
    }
    if (POS[E][3] == 4) {
      QUALITY = "Epic";
    }
    if (POS[E][3] == 5) {
      QUALITY = "Exotic";
    }
    if (POS[E][3] == 6) {
      QUALITY = "Divine";
    }

    var MINLEVEL = Game.Level >= POS[E][1] ? "<span class='green'>" + POS[E][1] + "</span>" : "<span class='rouge'>" + POS[E][1] + "</span>";
    var MAXLEVEL = Game.Level >= POS[E][2] ? "<span class='green'>" + POS[E][2] + "</span>" : "<span class='rouge'>" + POS[E][2] + "</span>";
    var UNLOCKED = Game.Level >= POS[E][1] ? "green" : "red";
    var UNLOCKTEXT = Game.MissionsCompleted[POS[E][4]] == 1 ? "<span class='green'>" + Missions[POS[E][4]][0] + " - Finished</span>" : "<span class='rouge'>" + Missions[POS[E][4]][0] + " - Unfinished</span>";


    if (ScoreModeEnabled == 0) {
      LEVEL = MINLEVEL + "-" + MAXLEVEL;
    } else {
      LEVEL = "<span class='green'>" + 30 + "</span>";
      QUALITY = "Divine";
    }
    if (Game.MissionsCompleted[POS[E][4]] == 1) {
      BTN = "<div class='fluid ui right floated icon rainbow button' onclick='explore(" + E + ");' >Travel <i class='" + UNLOCKED + " right arrow icon'></i></div>";
    } else {
      BTN = "";
    }

    if (Game.MissionStarted[0] == true) { BTN = ""; }

    if (Game.Location == E) { BTN = ""; }

    if (POS[E][1] < Game.Level + 1 && E != 11 && E != 17) {
      $("#exploration").append(
        "<div class='ui segment AL-M'><h3 class='ui left floated header text2 " + UNLOCKED + "'>" + POS[E][0] + "</h3>" +
        "<div class='ui clearing divider'></div><div class='ui horizontal segments'><div class='ui segment'>" +
        "Mission required : " + UNLOCKTEXT + "<br>" +
        "Ennemy level : " + LEVEL + "<br>Highest loot quality : <span class='" + QUALITY + "'>" + QUALITY + "</span></div><div class='ui segment'>" + BTN + "</div>" +
        "</div></div>");
    }
  }
}

function GenMissions() {
  $("#MissionsList").html("");
  $("#MissionsList2").html("");
  $("#MissionsCPL").html("");
  var QUALITY = "";
  var TYPE = "";
  var LEVEL = "";
  var BTN = "";
  for (var M in Missions) {

    if (Missions[M][6] == 0) { TYPE = "Armor or Weapon"; LEVEL = ""; }
    if (Missions[M][6] == 1) { TYPE = "Gem"; LEVEL = ""; }
    if (Missions[M][6] == 2) { TYPE = "Relic"; }
    QUALITY = "1 <span class='" + Missions[M][7] + "'>" + Missions[M][7] + "</span>";
    var UNLOCKED = Game.Level >= Missions[M][2] ? "green" : "red";
    if (Game.MissionStarted[0] == true) {
      BTN = "";
      if (Game.MissionStarted[1] == M) {
        Status = "<span class='green'>In Progress</span>";
        BTN = "";
      }
    }
    else { BTN = "<br><div class='fluid ui icon rainbow button' onclick='mission(" + M + ");' >Launch <i class='" + UNLOCKED + " right arrow icon'></i></div>"; }

    var Status = Game.MissionsCompleted[M] == 1 ? "<span class='green'>Complete</span>" : "<span class='rouge'>Incomplete</span>";
    if (Game.MissionStarted[0] == true && Game.MissionStarted[1] == M && Game.MissionsCompleted[M] == 0) {
      Status = "<span class='jaune'>In Progress</span>";
      BTN = "<br><div class='fluid ui icon rainbow button' onclick='ResetMission();' >Cancel mission <i class='green right arrow icon'></i></div>";
    }
    if (Game.MissionStarted[0] == true && Game.MissionsCompleted[M] == 1 && Missions[M][3] != 2) {
      BTN = "<br><div class='fluid ui icon rainbow button' onclick='MissionStory(" + M + ");' >Story <i class='green right arrow icon'></i></div>";
    }

    var REQLEVEL = Game.Level >= Missions[M][2] ? "<span class='green'>" + Missions[M][2] + "</span>" : "<span class='rouge'>" + Missions[M][2] + "</span>";

    if (Missions[M][3] != 2) {
      if (Game.MissionsCompleted[Missions[M][9]] == 1 || Missions[M][9] == -1) {
        var DESCRIPTION = Game.MissionsCompleted[M] == 0 ? "<div class='ui segment'>" + "Level Required : " + REQLEVEL + "<br><div class='ui green label'><span class='jaune'>" + fix(Missions[M][5], 3) + "</span> EXP<br>" + QUALITY + " " + TYPE + LEVEL + "</div></div>" : "<div class='ui segment'>Level : " + REQLEVEL + "</div>";
        var CONTENT = (
          "<div class='ui segment AL-M'><h3 class='ui left floated header text2 " + UNLOCKED + "'>" + Missions[M][0] + "</h3>" +
          "<div class='ui clearing divider'></div><div class='ui horizontal segments'>" + DESCRIPTION + "<div class='ui segment'>Status : " + Status + BTN + "</div>" +
          "</div></div>"
        );

        if (Game.MissionsCompleted[M] == 0) {
          $("#MissionsList").append(CONTENT);
        }

        if (Game.MissionsCompleted[M] == 1) {
          $("#MissionsCPL").append(CONTENT);
        }
      }
    }

    if (Missions[M][2] <= Game.Level && Missions[M][3] == 2) {

      var FRG = Missions[M][5] > 0 ? "<br> - <i class='bleu dna icon'></i>" + fix(Missions[M][5], 3) + " Fragments" : "";
      if (Game.MissionsCompleted[Missions[M][9]] == 1 || Missions[M][9] == -1) {
        var CNTENT = ("<div class='ui segment'><h3 class='ui left floated header text2 " + UNLOCKED + "'>" + Missions[M][0] + "</h3>" +
          "<div class='ui clearing divider'></div><div class='ui horizontal segments'><div class='ui segment'>" +
          "Level Required : " + REQLEVEL + "<br><div class='ui green label'> " + FRG + " <br> - " + QUALITY + " " + TYPE + LEVEL + "</div></div><div class='ui segment'>" + BTN + "</div>" +
          "</div></div>");

        $("#MissionsList2").append(CNTENT);
      }
    }
  }
}

function ResetMission() {
  if (Game.MissionStarted[0] == true) {
    Game.MissionStarted = [false, 0, 0, 0, 0];
    $("#combat").show();
    $("#missions").hide();
    Game.config[3] = 0;
    $("#AutoMissions").checkbox("uncheck");
    showmessage("Mission Canceled", "You can restart this mission in the 'mission' menu.<br>- Auto start mission <span class='rouge'>disabled</span>.");
    if (Game.Location > 0) {
      Game.Location--;
    }
    UpdateGame();
  }
}

function MissionStory(id) {
  showmessage("Mission Story", Missions[id][1]);
}

function mission(id) {
  if (Game.MissionStarted[0] == false && Game.Level >= Missions[id][2]) {
    Game.MissionStarted = [true, id, 0, 0, 0];
    Game.isInFight = 0;
    isTabActive = "None";
    closeTabs();
    showmessage("Mission Story", Missions[id][1]);
    UpdateGame();
  }
}

var TSK = 0;

function CompleteMission() {
  var TIER = "";
  var TIERRANK = "";
  var LEVELUP = "";
  if (Game.MissionStarted[0] == true && Game.isInFight == 1) {
    if (Missions[Game.MissionStarted[1]][3] == 1 || Missions[Game.MissionStarted[1]][3] == 2) {
      if (Game.MissionStarted[2] >= Missions[Game.MissionStarted[1]][4]) {
        Game.isInFight = 2;
        Game.MissionStarted[4] = 1;
        TSK = 1;

        if (Game.Level < MaxLevel) {
          Game.xp[0] += Missions[Game.MissionStarted[1]][5];
          if (Game.xp[0] >= Game.xp[1]) {
            Game.xp[0] -= Game.xp[1];
            Game.Level++;
            UpdateUI();
            LEVELUP = "<font class='bleu'>LEVEL UP ! (<span class='blanc'>" + Game.Level + "</span>)</font><br>";
          }
        }

        if (Missions[Game.MissionStarted[1]][6] == 0) {//CORE REWARD
          if (Game.MissionStarted[3] == 0) {
            if (Game.MissionStarted[0] == true) {
              newItem(0, Ranking, Missions[Game.MissionStarted[1]][7]);
              Game.MissionStarted[3] = 1;
            } else {
              newItem(0, Game.Level, Missions[Game.MissionStarted[1]][7]);
              Game.MissionStarted[3] = 1;
            }
          }
          if (ScoreModeEnabled == 0) {
            TIER = "Level";
            TIERRANK = Game.inventory[Game.inventory.length - 1].level;
          } else {
            TIER = "Score";
            TIERRANK = "<i class='fad fa-dice-d20'></i>" + Math.floor(Game.inventory[Game.inventory.length - 1].level * 10);
          }
          var UPS = Game.inventory[Game.inventory.length - 1].ups > 0 ? "" + Game.inventory[Game.inventory.length - 1].ups + "<i class='orange fad fa-gem'></i>" : "";
          var LOOTCONTENT = Game.inventory[Game.inventory.length - 1].id == 4 ? "<i class='bleu fas fa-sword revertmargin'></i>" + fix(Game.inventory[Game.inventory.length - 1].power, 5) : "<i class='rouge fas fa-heart revertmargin'></i>" + fix(Game.inventory[Game.inventory.length - 1].life, 5);
          $("#rewards-loot").html("<div class='ui comments'><div class='comment CoreClass" + Game.inventory[Game.inventory.length - 1].type + "'><div class='classBar" + Game.inventory[Game.inventory.length - 1].type + "'></div><div class='statistic GS'><div class='value'>" + TIER + "</div><div class='label'> " + TIERRANK + "</div></div>" + Game.inventory[Game.inventory.length - 1].name + "<span class='" + Game.inventory[Game.inventory.length - 1].class + "'> " + UPS + "</span><br><span class='" + Game.inventory[Game.inventory.length - 1].class + "'> " + Game.inventory[Game.inventory.length - 1].class + " </span><br>" + LOOTCONTENT + "</div></div>");
        }
        if (Missions[Game.MissionStarted[1]][6] == 2) {//RELIC REWARD 
          if (Game.MissionStarted[3] == 0) {
            if (Game.MissionStarted[0] == true && Missions[Game.MissionStarted[1]][3] == 2) {
              newItem("Relic", null, Missions[Game.MissionStarted[1]][7]);
              Game.MissionStarted[3] = 1;
            } else {
              newItem("Relic", null, Missions[Game.MissionStarted[1]][7]);
              Game.MissionStarted[3] = 1;
            }
          }
        }

        if (Missions[Game.MissionStarted[1]][6] == 2) {
          var IV = Game.inventory.length - 1;
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
            DESC = "Minimal drop quality <span class='" + Game.inventory[IV].bonus + "'>" + Game.inventory[IV].bonus + "</span>";
          }
          $("#rewards-loot").append("<div class='ui comments'><div class='comment CoreClass" + Game.inventory[IV].type + "'><div class='classBar" + Game.inventory[IV].type + "'></div>" + Game.inventory[IV].name + "<br><span class='" + (Game.inventory[IV].class) + "' id='" + IV + "'> " + (Game.inventory[IV].class) + "</span><br>" + DESC + "</div></div>");
        }

        if (Missions[Game.MissionStarted[1]][3] == 1) {
          $("#rewards-title").html("<span class='vert'>Successfully completed the mission !</span>");
        } else {
          $("#rewards-title").html("<span class='vert'>Fortress cleared !</span>");
        }
        var FRGR = Missions[Game.MissionStarted[1]][5] > 0 ? "+<i class='bleu dna icon'></i><span class='bleu bold'>" + fix(Missions[Game.MissionStarted[1]][5], 3) + "</span> Fragments " : "";
        $("#btn-CRW").html("<div onclick='hideMissionRewards();' class='fluid ui closing button'><i class='times icon'></i>Finish</div>");
        $("#rewards-desc").html("");
        if (Missions[Game.MissionStarted[1]][3] == 2) { $("#rewards-text").html(LEVELUP + FRGR); } else {
          $("#rewards-text").html(LEVELUP + "+<span class='vert bold'>" + fix(Math.floor(Missions[Game.MissionStarted[1]][5]), 5) + "</span> EXP ");
        }
        $("#combat").hide();
        $("#btn-CRW").show();
        $("#btn-ACT").hide();
        $("#rewards").show();
      }
    }
  }
}

function hideMissionRewards() {
  if (Game.config[0] == 1) {
    $("#modal-4").modal("hide");
  }
  if (TSK == 1) {
    Game.MissionsCompleted[Game.MissionStarted[1]] = 1;
    if (Missions[Game.MissionStarted[1]][3] == 2) { Game.FP++; Game.Shards += Missions[Game.MissionStarted[1]][5]; }
    Game.MissionStarted = [false, 0, 0, 0, 0];
    TSK = 0;
  }
  Game.isInFight = 0;
  $("#rewards").hide();
  $("#combat").show();
  UpdateGame();
}

function hideRewards() {
  if (Game.config[0] == 1) {
    $("#modal-4").modal("hide");
  }
  Game.isInFight = 0;
  $("#rewards").hide();
  if (isTabActive == "None") {
    $("#combat").show();
  }
  UpdateGame();
  CompleteMission();
}

function explore(loc) {
  if (POS[loc][1] <= Game.Level && Game.MissionStarted[0] == false) {
    if (Game.MissionsCompleted[POS[loc][4]] == 1) {
      Game.Location = loc;
      Game.isInFight = 0;
      isTabActive = "None";
      closeTabs();
      UpdateGame();
    }
  }
}

function UpdatePage() {
  location.reload();
}

function rgbToHex(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  if (hex == 0) {
    hex = "00";
  }
  return hex;
}

function fullColorHex(r, g, b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red + green + blue;
}

function CalcEXP(level) {
  let exp = (level * 25) + (500 * (level / 3.5));

  for (T = 0; T < (level + 1); T++) {
    if (T < 30) {
      exp += exp * (15 / 100);
    } else {
      exp += exp * (25 / 100);
    }
  }
  if (level == 0) exp = 0;
  if (level == 1) exp = 100;
  return Math.round(exp);
}

function ErrorArmor(ARM) {
  if (ARM < 5) {
    Game.Armors[ARM] = [true, "Error", "Error", 100, 1, 0];
    Game.ArmorUpgrades[ARM] = 0;
    Game.MaxUPC[ARM - 1] = 0;
  } else {
    if (ARM == 5) Game.Weapons.Main = ["Error", "Error", 0, 1, 10];
    if (ARM == 6) Game.Weapons.Special = ["Error", "Error", 0, 1, 10];
  }
  UpdateGame();
}

function UpdateLoadingText(statu) {
  if (statu !== 0 && statu !== 1 && statu !== 2 && statu !== 3) statu = 0;
  var texts = ["Hi", "Welcome", "To", "AlphaRPG"];

  $(".loading-text").html(texts[statu]);
  if (statu < 3) statu++; else statu = 0;

  if (loadState == 0) {
    setTimeout(function () {
      UpdateLoadingText(statu);
    }, 1000);
  } else if (loadState < 3) {
    setTimeout(function () {
      UpdateLoadingText(statu);
    }, 500);
  }
}

function ChangeStep(type) {
  //0 = BACK & 1 = NEXT
  if (type == 0 && WelcomeData[0] > 1) WelcomeData[0]--;
  if (type == 1) WelcomeData[0]++;

  for (var L = 1; L < 6; L++) {
    $("#step" + L).attr("class", "step");
    $("#tutorial-" + L).hide();
  }

  for (var L2 = 1; L2 < WelcomeData[0] + 1; L2++) {
    $("#step" + L2).attr("class", "completed step");
  }
  $("#step" + WelcomeData[0]).attr("class", "active step");
  $("#tutorial-" + WelcomeData[0]).show();
  if (WelcomeData[0] > 1) { $("#WelcomePrevious").show(); } else { $("#WelcomePrevious").hide(); }
}

function WelcomeNext() {
  isTabActive = "Login";

  if (WelcomeData[0] == 5) {
    $("#CATEGORIE-1").show();
    $("#begin").hide();
    $(".footer").show();
    if (Game.username == "Default") Game.username = WelcomeData[1];
    Game.isInFight = 0;
    GetWBcontent("firstlogin");
    save();
  }

  if (WelcomeData[0] == 4) {
    if (WelcomeData[2] == "Warrior") { Game.Upgrades = [0, 5, 0]; }
    if (WelcomeData[2] == "Paladin") { Game.Upgrades = [0, 0, 5]; }
    if (WelcomeData[2] == "Ninja") { Game.Upgrades = [5, 0, 0]; }
    if (WelcomeData[2] != "Warrior" && WelcomeData[2] != "Paladin" && WelcomeData[2] != "Ninja") { $("#namehelp").html("You need to select a class !"); } else {
      ChangeStep(1);
      Game.class = WelcomeData[2];
      $("#namehelp").html("");
      $("#WelcomeName").html(WelcomeData[1]);
      $("#WelcomeName").html("<img class='ui avatar image' src='DATA/avatars/avatar" + Game.Avatar + ".jpg'><span>" + WelcomeData[1] + "<div class='ui horizontal label'>Level 1</div></span>");
      $("#WelcomeClass").html("Class : " + WelcomeData[2]);
      $("#WelcomeNext").html("Start <i class='right arrow icon'></i>");
    }
  }

  if (WelcomeData[0] == 3) ChangeStep(1);

  if (WelcomeData[0] == 2) {
    NICKNAME = $("#PlayerName").val();
    if (NICKNAME != null) {
      if (NICKNAME == null || NICKNAME == "" || NICKNAME == " " || NICKNAME == "_" || NICKNAME.length < 3 || NICKNAME == "null") {
        ErrorName();
      } else {
        NICKNAME = NICKNAME.replace(/[^a-zA-Z0-9]/g, '_');
        if (NICKNAME == "Neo" || NICKNAME == "NEO" || NICKNAME == "neo" || NICKNAME == "GoldenLys" || NICKNAME == "Purpy" || NICKNAME == "Purple" || NICKNAME == "Purple_Wizard") NICKNAME = "Adventurer" + random(10000, 999999);
        Backup = WelcomeData[1] = NICKNAME;
        ChangeStep(1);
        $("#namehelp").html("");
      }
    } else {
      ErrorName();
    }
  }

  if (WelcomeData[0] == 1) ChangeStep(1);
}

function ErrorName() {
  $("#namehelp").html("You need to write a username !");
}
