function GenMissions() {
    $("#MissionsList").html("");
    $("#MissionsList2").html("");
    $("#MissionsCPL").html("");
    let TYPES = ["Armor or Weapon", "Gem", "Relic"];
    let LEVEL = "";
    for (var M in GLOBALS.MISSIONS) {
        let Status = Game.MissionsCompleted[M] == 1 ? "<span class='pw green'>Complete</span>" : "<span class='pw red'>Incomplete</span>";
        if (Game.MissionStarted[1] == M) Status = "<span class='pw alpha'>In Progress</span>";
        if (Game.MissionsCompleted[M] == 0 && !Game.MissionStarted[0]) Status = "<span class='pw red'>Not Started</span>";
        let QUALITY = "• 1 <span class='" + GLOBALS.MISSIONS[M][7] + "'>" + GLOBALS.MISSIONS[M][7] + "</span>";
        let UNLOCKED = Game.Level >= GLOBALS.MISSIONS[M][2] ? "pw green" : "pw red";
        let BTN = "<div class='pw fluid darkgrey button' onclick='mission(" + M + ");' >Launch <i class='" + UNLOCKED + " fal fa-arrow-right'></i></div>";
        if (Game.MissionStarted[0] && Game.MissionStarted[1] == M && Game.MissionsCompleted[M] == 0) BTN = "<div class='pw fluid darkgrey button' onclick='ResetMission();' >Cancel mission <i class='pw green fal fa-arrow-right'></i></div>";
        if (Game.MissionsCompleted[M] == 1 && GLOBALS.MISSIONS[M][3] != 2) BTN = "<div class='pw fluid darkgrey button' onclick='MissionStory(" + M + ");' >Story <i class='pw green fal fa-arrow-right'></i></div>";
        let REQLEVEL = Game.Level >= GLOBALS.MISSIONS[M][2] ? "<span class='pw green'>" + GLOBALS.MISSIONS[M][2] + "</span>" : "<span class='pw red'>" + GLOBALS.MISSIONS[M][2] + "</span>";
        if (GLOBALS.MISSIONS[M][3] != 2) {
            if (Game.MissionsCompleted[GLOBALS.MISSIONS[M][9]] == 1 || GLOBALS.MISSIONS[M][9] == -1) {
                let DESCRIPTION = Game.MissionsCompleted[M] == 0 ? "Status : " + Status + "<br><div class='pw label green'>• <span class='pw yellow'>" + fix(GLOBALS.MISSIONS[M][5], 1) + "</span> EXP<br>" + QUALITY + " " + TYPES[GLOBALS.MISSIONS[M][6]] + LEVEL + "</div>" : "Status: <span class='pw green'>Completed</span>";
                let CONTENT = "<div class='pw segment dark text-center'><h3 class='text-center " + UNLOCKED + "'>" + GLOBALS.MISSIONS[M][0] + " - Lv. " + REQLEVEL + "</h3>" + DESCRIPTION + BTN + "</div>";
                if (Game.MissionsCompleted[M] == 0) $("#MissionsList").append(CONTENT);
                if (Game.MissionsCompleted[M] == 1) $("#MissionsCPL").append(CONTENT);
            }
        }
        if (GLOBALS.MISSIONS[M][2] <= Game.Level && GLOBALS.MISSIONS[M][3] == 2) {
            let FRG = GLOBALS.MISSIONS[M][5] > 0 ? "• <i class='pw blue fal fa-dna'></i>" + fix(GLOBALS.MISSIONS[M][5], 1) + " Fragments<br>" : "";
            if (Game.MissionsCompleted[GLOBALS.MISSIONS[M][9]] == 1 || GLOBALS.MISSIONS[M][9] == -1) {
                let CONTENT = "<h3 class='" + UNLOCKED + "'>" + GLOBALS.MISSIONS[M][0] + "</h3><div class='ui pw alpha label'> " + FRG + " " + QUALITY + " " + TYPES[GLOBALS.MISSIONS[M][6]] + LEVEL + "</div>" + BTN + "";
                $("#MissionsList2").append(CONTENT);
            }
        }
    }
}

function MissionStory(id) {
    POPUP("Mission Story", GLOBALS.MISSIONS[id][1]);
}

// START MISSIONS
function mission(id) {
    if (!Game.MissionStarted[0] && Game.Level >= GLOBALS.MISSIONS[id][2]) {
        Game.MissionStarted = [true, id, 0, 0, 0];
        Game.isInFight = 0;
        CLOSE_MENUS();
        GenMissions();
        POPUP("Mission Story", GLOBALS.MISSIONS[id][1]);
        UpdateGame();
    }
}

// END MISSIONS
function CompleteMission() {
    if (Game.MissionStarted[0]) {
        if (GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 1 || GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2) {
            if (Game.MissionStarted[2] >= GLOBALS.MISSIONS[Game.MissionStarted[1]][4]) {
                let TYPES = ["Armor or Weapon", "Gem", "Relic"];
                let REWARDS = GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2 && GLOBALS.MISSIONS[Game.MissionStarted[1]][5] > 0 ? `<div class="pw inline blue label"><i class='pw blue fal fa-dna'></i>${fix(GLOBALS.MISSIONS[Game.MissionStarted[1]][5], 1)}</div>` : `<div class="pw inline alpha label">${fix(GLOBALS.MISSIONS[Game.MissionStarted[1]][5], "auto")} EXP</div>`;
                if (GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 1 && GLOBALS.MISSIONS[Game.MissionStarted[1]][5] > 0) Game.xp[0] += GLOBALS.MISSIONS[Game.MissionStarted[1]][5];
                let DESCRIPTION = `${REWARDS} <div class="pw inline green label">1 <span class='${GLOBALS.MISSIONS[Game.MissionStarted[1]][7]}'>${GLOBALS.MISSIONS[Game.MissionStarted[1]][7]}</span> ${TYPES[GLOBALS.MISSIONS[Game.MissionStarted[1]][6]]}</div>`;
                APP.GOT_REWARDS = 1;
                if (GLOBALS.MISSIONS[Game.MissionStarted[1]][6] == 0 && Game.MissionStarted[3] == 0) { // GIVE ARMOR & WEAPON REWARD
                    newItem(0, APP.Ranking, GLOBALS.MISSIONS[Game.MissionStarted[1]][7]);
                    Game.MissionStarted[3] = 1;
                }
                if (GLOBALS.MISSIONS[Game.MissionStarted[1]][6] == 2) { // GIVE RELIC REWARD
                    if (Game.MissionStarted[3] == 0 && GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2) {
                        newItem("Relic", null, GLOBALS.MISSIONS[Game.MissionStarted[1]][7]);
                        Game.MissionStarted[3] = 1;
                    }
                }
                let TITLE = GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2 ? "<h3 class='pw horizontal divider'>Fortress Cleared</h3>" : "<h3 class='pw horizontal divider'>Mission Completed</h3>";
                if ($("#POPUP").hasClass("active")) $("#popup-text").append(`${TITLE} ${DESCRIPTION}`);
                else NOTICE(TITLE, DESCRIPTION);
                hideMissionRewards();
            }
        }
    }
    GenMissions();
}

function ResetMission() {
    if (Game.MissionStarted[0]) {
        Game.MissionStarted = [false, 0, 0, 0, 0];
        Game.isInFight = 0;
        $("#DIV-COMBAT").show();
        Game.config[3] = 0;
        $("#AutoMissions").attr("data-check", "unchecked");
        NOTICE("Mission Canceled", `You can restart this mission in the <span class="pw alpha">Missions</span> menu.<br>- Auto start mission <span class="pw red">disabled</span>.`);
        if (Game.Location > 0) Game.Location--;
        UpdateGame();
        GenMissions();
    }
}

function hideMissionRewards() {
    if (APP.GOT_REWARDS == 1 && Game.MissionStarted[0]) {
        Game.MissionsCompleted[Game.MissionStarted[1]] = 1;
        if (GLOBALS.MISSIONS[Game.MissionStarted[1]][3] == 2) {
            Game.FortressesCleared++;
            Game.Shards += GLOBALS.MISSIONS[Game.MissionStarted[1]][5];
        }
        Game.MissionStarted = [false, 0, 0, 0, 0];
        APP.GOT_REWARDS = 0;
    }
    UpdateGame();
}
