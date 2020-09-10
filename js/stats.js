const UPDATE_STATS = function () {
    let DEATHS = Game.Loses == 0 ? 1 : Game.Loses;
    // GENERAL
    $("#namestat").html("<img class='pw mini image' src='images/avatars/avatar" + Game.Avatar + ".jpg'><span style='color: rgb(" + Game.Theme + ");'>" + Game.username + "</span>");
    $("#playtimestat").html(toHHMMSS(Game.PlayTime));
    $("#Levelstat").html("<span class='pw alpha'>" + fix(Game.Level, 0) + "</span>/" + APP.MaxLevel);
    $("#Classstat").html(Game.class);
    $("#Scorestat").html("<span class='pw alpha'><i class='fad fa-dice-d20'></i>" + fix(APP.Ranking, 0) + "</span>/" + (APP.MaxScore * 10));
    $("#Difficultystat").html(fix(Game.DIMENSION_MULTIPLIERS[3], 2));
    $("#Rankstat").html(APP.Leader + "/" + APP.LastId);
    $("#Ratiostat").html(fix(Game.Wins / DEATHS, 4));
    $("#Versionstat").html("v" + GLOBALS.VERSION);
    $("#fortressstat").html(Game.FortressesCleared);
    $("#lifestat").html("<i class='pw red fas fa-heart'></i>" + fix(Math.round(APP.CoreBaseLife / (APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1])), 1) + " <span class='pw inline label'>+" + fix(APP.CoreBaseLife - Math.round(APP.CoreBaseLife / (APP.LifeMult + Game.DIMENSION_MULTIPLIERS[1])), 1) + "</span>");
    $("#powerstat").html("<i class='pw blue fas fa-sword'></i>" + fix(Math.round(APP.WeaponsPower / (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0])), 1) + " <span class='pw inline label'>+" + fix(APP.WeaponsPower - Math.round(APP.WeaponsPower / (APP.PowerMult + Game.DIMENSION_MULTIPLIERS[0])), 1) + "</span>");
    // WEAPONS
    $("#mainweaponstat").html("<i class='pw blue fas fa-sword'></i>" + (Game.Weapons.Main[4] - Game.WeaponUpgrades.Main) + "<span class='pw inline label'>+" + Game.WeaponUpgrades.Main + "</span>");
    $("#specialweaponstat").html("<i class='pw blue fas fa-sword'></i>" + (Game.Weapons.Special[4] - Game.WeaponUpgrades.Special) + "<span class='pw inline label'>+" + Game.WeaponUpgrades.Special + "</span>");
    // ARMOR
    $("#armor1stat").html("<i class='pw red fas fa-heart'></i>" + (Game.Armors[1][3] - Game.ArmorUpgrades[1]) + "<span class='pw inline label'>+" + Game.ArmorUpgrades[1] + "</span>");
    if (Game.Armors[2][0]) $("#armor2stat").html("<i class='pw red fas fa-heart'></i>" + (Game.Armors[2][3] - Game.ArmorUpgrades[2]) + "<span class='pw inline label'>+" + Game.ArmorUpgrades[2] + "</span>"); else $("#armor2stat").html("Not yet unlocked.");
    if (Game.Armors[3][0]) $("#armor3stat").html("<i class='pw red fas fa-heart'></i>" + (Game.Armors[3][3] - Game.ArmorUpgrades[3]) + "<span class='pw inline label'>+" + Game.ArmorUpgrades[3] + "</span>"); else $("#armor3stat").html("Not yet unlocked.");
    if (Game.Armors[4][0]) $("#armor4stat").html("<i class='pw red fas fa-heart'></i>" + (Game.Armors[4][3] - Game.ArmorUpgrades[4]) + "<span class='pw inline label'>+" + Game.ArmorUpgrades[4] + "</span>"); else $("#armor4stat").html("Not yet unlocked.");
    // LOCATIONS
    $("#locations-stats").html("");
    for (var L in GLOBALS.LOCATIONS) $("#locations-stats").append(`<div class="pw dark horizontal segments" id="defeatloc${L}"><div class='pw segment text-left'>${GLOBALS.LOCATIONS[L][0]}</div><div class='pw segment text-right'>${fix(Game.DefeatedByLocation[L], 1)} Defeated</div></div>`);
    // KILLS
    for (var D in Game.Defeated) { if (D != 0) { $("#Defeat" + D).html(fix(Game.Defeated[D], "auto")); } }
    $("#Killstat").html(Game.Wins);
    $("#Deathstat").html(Game.Loses);
};

const firebaseConfig = {
    apiKey: "AIzaSyAsKlY89gHACvQHywLv04xtxPBvhRGoNYo",
    authDomain: "matrix-731a7.firebaseapp.com",
    databaseURL: "https://matrix-731a7.firebaseio.com",
    projectId: "matrix-731a7",
    storageBucket: "matrix-731a7.appspot.com",
    messagingSenderId: "752237806136",
    appId: "1:752237806136:web:08da7c06397b384b201ccd",
    measurementId: "G-FK9048JSDP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
var database = firebase.database();

function login() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        APP.Email = user.email;
        POPUP_CLOSE();
    });
    APP.LoggedIn = 1;
    SendStats();
    UpdateGame();
}

function filter(f) {
    APP.LeaderFilter = f;
    UpdateGame();
    TOP10();
}

function ResetLeaderBoard() {
    $("#LEADERBOARD").html(`<div class="pw horizontal segments dark">\
        <div class="pw segment">Rank</div>\
        <div class="pw segment">Name</div>\
        <div class="pw segment"><a class="link" data-url="#" onclick="filter(1);">Ranking</a></div>\
        <div class="pw segment"><a  class="link" data-url="#" onclick="filter(0);">Dimension</a></div>\
        <div class="pw segment">Power</div>\
        <div class="pw segment">Life</div>\
        <div class="pw segment">Ratio (K/D)</div>\
        </div>`
    );
}

function writeUserData() {
    if (location.href.match(/(purplewizard.space).*/) && Game.username != "Default" && Game.username != null && APP.LoggedIn == 1) {
        database.ref('users/' + Game.username).set({
            Name: Game.username,
            Email: APP.Email,
            Order: (-1 * APP.Ranking) - (100000 * Game.Simulation),
            Order2: -1 * APP.Ranking,
            Level: Game.Level,
            Ranking: APP.Ranking,
            WT: Game.Simulation,
            CorePower: APP.WeaponsPower,
            CoreLife: APP.CoreBaseLife,
            Kills: Game.Wins,
            Deaths: Game.Loses,
            Avatar: Game.Avatar,
            Defeated: Game.Defeated,
            Version: GLOBALS.VERSION.substring(0, 3),
            Theme: Game.Theme,
        });
    }
}

function NewUserData(old) {
    if (old != "Default" && old == Game.username) {
        database.ref('users/' + old).set(null);
        var newname = prompt("Please write a new name");
        Game.username = newname;
        Backup = newname;
    }
}

function ReadDB() {
    var ref = database.ref("users");
    var CXD = database.ref("codes");
    CXD.on("child_added", function () { });
    APP.Leader = 0;
    id = 0;
    ResetLeaderBoard();
    if (APP.LeaderFilter == 0) {
        ref.orderByChild("Order").limitToLast(100000).on("child_added", function (snapshot) {
            if (Game.config[4] == 0) UpdateDB(snapshot);
            else if (snapshot.val().Version >= GLOBALS.VERSION.substring(0, 3)) UpdateDB(snapshot);
        });
    } else {
        ref.orderByChild("Order2").limitToLast(100000).on("child_added", function (snapshot) {
            if (snapshot.val().Version > 1.15) {
                if (Game.config[4] == 0) UpdateDB(snapshot);
                else if (snapshot.val().Version >= GLOBALS.VERSION.substring(0, 3)) UpdateDB(snapshot);
            }
        });
    }
}

function UpdateDB(snapshot) {
    id++;
    let Avatar = snapshot.val().Avatar;
    let Theme = snapshot.val().Theme;
    if (snapshot.key === Game.username + " " || snapshot.key === Game.username) APP.Leader = id;
    if (id >= APP.LEADERBOARD.RANGES[0] && id <= APP.LEADERBOARD.RANGES[1]) {
        if (snapshot.val().Version > 1.09) {
            if (typeof (snapshot.val().Avatar) === 'undefined') Avatar = 1;
            if (typeof (snapshot.val().Theme) === 'undefined') Theme = $("*").css("--white");
            let isPlayer = id == APP.Leader ? "light" : "dark";
            var DEATHS = snapshot.val().Deaths == 0 ? 1 : snapshot.val().Deaths;
            $("#LEADERBOARD").append("<div id='leader-" + id + "' class='pw horizontal segments " + isPlayer + "'>" +
                `<div class='pw segment'>#${id}</div>` +
                `<div class='pw segment avatar' style='color:rgb(${Theme});'><img class='pw mini centered image' src='images/avatars/avatar${Avatar}.jpg'>${snapshot.key}</div>` +
                `<div class='pw segment'><i class='fad fa-dice-d20'></i>${fix(snapshot.val().Ranking, 0)} (${fix(snapshot.val().Level, 0)})</div>` +
                `<div class='pw segment'>${fix(snapshot.val().WT, 1)}</div>` +
                `<div class='pw segment'>${fix(snapshot.val().CorePower, "auto")}</div>` +
                `<div class='pw segment'>${fix(snapshot.val().CoreLife, "auto")}</div>` +
                `<div class='pw segment'>${fix(snapshot.val().Kills / DEATHS, 4)}</div>` +
                "</div>"
            );
        } else id--;
    }
    APP.LastId = id;
    if (APP.Leader == 0) APP.Leader = "Unranked";
}

function SendStats() {
    save();
    if (APP.LoggedIn == 1) writeUserData();
    APP.lastCloudSave = 0;
}

function TOP10() {
    APP.LEADERBOARD.RANGES[1] = 10;
    APP.LEADERBOARD.RANGES[0] = 1;
    APP.LEADERBOARD.PAGE = 1;
    UpdateUI();
    ReadDB();
}

function TOPPREVIOUS() {
    if (APP.LEADERBOARD.RANGES[1] > 10) {
        APP.LEADERBOARD.RANGES[1] -= 10;
        APP.LEADERBOARD.RANGES[0] -= 10;
        APP.LEADERBOARD.PAGE--;
        UpdateUI();
        ReadDB();
    }
}

function TOPNEXT() {
    if (APP.LEADERBOARD.RANGES[1] + 1 <= APP.LastId) {
        if (APP.LEADERBOARD.RANGES[1] < 10000) {
            APP.LEADERBOARD.RANGES[1] += 10;
            APP.LEADERBOARD.RANGES[0] += 10;
            APP.LEADERBOARD.PAGE++;
            UpdateUI();
            ReadDB();
        }
    } else UpdateUI();
}

function CheckCode(debug) {
    CXD = database.ref("codes");
    CXD.on("child_added", function (code) {
        APP.codes[code.key] = code.val();
    });
    var code = $("#promocode").val();
    if (code != null) {
        if (code === APP.codes[1]) {
            $("#codereturn").html("Code Accepted, name change.");
            NewUserData(Game.username);
        }
        else if (code === APP.codes[2]) {
            $("#codereturn").html("Code Accepted, raising all Armor slots by 1.");
            for (var UPC = 0; UPC < 4; UPC++) {
                Game.MaxUPC[UPC]++;
            }
        }
        else if (code === APP.codes[3]) {
            $("#codereturn").html("Code Accepted, you are now at max level.");
            Game.Level = APP.MaxLevel;
        }
        else if (code === APP.codes[4]) {
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
        else if (code === APP.codes[5]) {
            if (Game.Simulation > 1) {
                $("#codereturn").html("Code Accepted, you just lowered to <i class='globe icon'></i> " + (Game.Simulation - 1));
                Game.Simulation--;
            } else invalidCode(3);
        }
        else if (code === APP.codes[6]) {
            $("#codereturn").html("Code Accepted, save exported to your clipboard.");
            exportSave();
        }
        else if (code === APP.codes[7]) {
            $("#codereturn").html("Code Accepted, external save imported to your current save.");
            importSave();
        }
        else if (code === APP.codes[8]) {
            $("#codereturn").html("Code Accepted, cloud save done.");
            writeUserData();
            APP.lastCloudSave = 0;
        }
        else if (code === APP.codes[9]) {
            $("#codereturn").html("Code Accepted, Finished the story.");
            Game.Level = APP.MaxLevel;
            Game.Armors[1][4] = APP.MaxScore;
            Game.Armors[2][4] = APP.MaxScore;
            Game.Armors[3][4] = APP.MaxScore;
            Game.Armors[4][4] = APP.MaxScore;
            Game.Weapons.Main[3] = APP.MaxScore;
            Game.Weapons.Special[3] = APP.MaxScore;
            Game.MissionStarted = [false, 0, 0, 0];
            for (var Mission in GLOBALS.MISSIONS) {
                Game.MissionsCompleted[Mission] = 1;
            }
        }
        else if (code === APP.codes[10]) {
            $("#codereturn").html("Code Accepted, Reset save.");
            Game.username = "Default";
            Backup = "Default";
            save();
            confirmReset();
        } else {
            if (debug != 1) CheckCode(1);
            invalidCode(1);
        }
    } else invalidCode(2);
    APP.codes = [];
    UpdateGame();
}

function invalidCode(error) {
    $("#codereturn").html("Invalid code ! (error " + error + ")");
}
