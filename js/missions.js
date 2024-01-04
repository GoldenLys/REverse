import FUNCTIONS from './index.js';

export function GENERATE_MISSION_VIEW() {
    $("#MISSIONS-CURRENT, #MISSIONS-FORTRESSES, #MISSIONS-COMPLETED").empty();
    const types = ["", language[APP.LANG].MISC.Gem, language[APP.LANG].MISC.Relic];
    let fortresses = 0, missionsCompleted = 0;
    const notYetUnlocked = `<h3 class="text-center pw red">Not yet available<div class="pw subtitle red">Continue the story to unlock this</div></h3>`,
          continueStory = `<h3 class="text-center pw red">Not yet available<div class="pw subtitle red">Continue the story to see your completed missions</div></h3>`;
  
    for (const mission in GLOBALS.MISSIONS.LIST) {
        const missionData = GLOBALS.MISSIONS.LIST[mission];
        const status = Game.MissionsCompleted[mission] == 1 ? `<div class='pw subtitle green'>${language[APP.LANG].STATUS.Complete}</div>` : Game.MissionStarted[1] == mission && Game.MissionStarted[0] ? `<div class='pw subtitle alpha'>${language[APP.LANG].STATUS.InProgress}</div>` : Game.MissionsCompleted[mission] == 0 && !Game.MissionStarted[0] ? `<div class='pw subtitle red'>${language[APP.LANG].STATUS.NotStarted}</div>` : "";
        var quality = types[missionData.REWARDS[1]] === language[APP.LANG].MISC.Relic ? language[APP.LANG].MISC.LootRelic : types[missionData.REWARDS[1]] === language[APP.LANG].MISC.Gem ? language[APP.LANG].MISC.LootGem : language[APP.LANG].MISC.LootItem;
        quality = quality.split("[QUALITY]").join("<span class='" + GLOBALS.MISSIONS.LIST[mission].REWARDS[2] + "'>" + language[APP.LANG].QUALITIES[GLOBALS.MISSIONS.LIST[mission].REWARDS[2]] + "</span>");
        const unlocked = Game.Level >= missionData.LEVEL ? "pw green" : "pw red";

        let btn;
        if (Game.MissionStarted[0] && Game.MissionStarted[1] == mission && Game.MissionsCompleted[mission] == 0) {
            btn = `<div class='pw fluid darkgrey button' onclick='FUNCTIONS.MISSIONS.RESET_MISSION();'>${language[APP.LANG].ACTIONS.CancelMission} <i class='pw green fal fa-arrow-right'></i></div>`;
        } else if (Game.MissionsCompleted[mission] == 1 && missionData.TYPE != 2) {
            btn = `<div class='pw fluid darkgrey button' onclick='FUNCTIONS.MISSIONS.REPLAY_STORY(${mission});'>${language[APP.LANG].ACTIONS.Story} <i class='pw green fal fa-arrow-right'></i></div>`;
        } else if (Game.MissionsCompleted[mission] == 0 && Game.MissionStarted[0] === false) {
            btn = `<div class='pw fluid darkgrey button' onclick='FUNCTIONS.MISSIONS.LAUNCH_MISSION(${mission});'>${language[APP.LANG].ACTIONS.LaunchMission} <i class='${unlocked} fal fa-arrow-right'></i></div>`;
        }

        const reqLevel = Game.Level >= missionData.LEVEL ? `<span class='pw green'>${missionData.LEVEL}</span>` : `<span class='pw red'>${missionData.LEVEL}</span>`;
        if (missionData.TYPE !== 2 && (Game.MissionsCompleted[missionData.REQUIRED] == 1 || missionData.REQUIRED == -1)) {
            missionsCompleted++;
            const description = Game.MissionsCompleted[mission] == 0 ? `<div class='pw inline label'><span class='pw yellow'>${FUNCTIONS.MAIN.FORMAT_NUMBER(missionData.REWARDS[0], 1)}</span> ${language[APP.LANG].MISC.EXP}</div><div class='pw inline label'>${quality}</div>` : "";
            const content = `<div class='pw segment margin dark text-center'><h3 class='text-center ${unlocked}'>${missionData.NAME} - ${language[APP.LANG].MISC.Lv} ${reqLevel} ${status}</h3>${description}${btn}</div>`;
            if (Game.MissionsCompleted[mission] == 0) {
                $("#MISSIONS-CURRENT").append(content);
            } else if (Game.MissionsCompleted[mission] == 1) {
                $("#MISSIONS-COMPLETED").append(content);
            }
        }

        if (missionData.LEVEL <= Game.Level && missionData.TYPE == 2 && (Game.MissionsCompleted[missionData.REQUIRED] == 1 || missionData.REQUIRED == -1)) {
            fortresses++;
            const content = `<h3 class='${unlocked}'>${missionData.NAME}</h3><div class='ui pw alpha label'>${missionData.REWARDS[0] > 0 ? `<i class='pw blue fal fa-dna'></i>${FUNCTIONS.MAIN.FORMAT_NUMBER(missionData.REWARDS[0], 1)} Fragment${missionData.REWARDS[0] > 1 ? "s" : ""}<br>` : ""}${quality}</div>${btn}`;
            $("#MISSIONS-FORTRESSES").append(content);
        }
    }

    if (fortresses === 0) $("#MISSIONS-FORTRESSES").append(notYetUnlocked);
    if (missionsCompleted === 0) $("#MISSIONS-COMPLETED").append(continueStory);
}

export function LAUNCH_MISSION(MISSION) {
    if (!Game.MissionStarted[0] && Game.Level >= GLOBALS.MISSIONS.LIST[MISSION].LEVEL) {
        Game.MissionStarted = [true, MISSION, 0, 0, 0];
        Game.Choices[Game.MissionStarted[1]] = Game.Choices[Game.MissionStarted[1]] == "undefined" || Game.Choices[Game.MissionStarted[1]] == null ? [[null]] : Game.Choices[Game.MissionStarted[1]];
        Game.Location = GLOBALS.MISSIONS.LIST[MISSION].LOCATION;
        Game.isInFight = false;
        FUNCTIONS.MAIN.CLOSE_MENUS();
        GENERATE_MISSION_VIEW();
        TOGGLE_STORY(MISSION)
        FUNCTIONS.APP.UpdateGame();
    }
}

export function TOGGLE_STORY(id, replay) {
    replay = replay || false;
    if ($("#GAME").hasClass("story")) {
        APP.StoryView = false;
        $("#BACKGROUND").attr("style", `background: center / cover no-repeat url("https://purplewizard.space/REverse/images/Locations/${GLOBALS.LOCATIONS[Game.Location][6]}");`);
        $("#GAME").removeClass("story");
        $("#BACKGROUND").removeClass("story-bg");
        FUNCTIONS.MAIN.CLOSE_MENUS();
    } else {
        APP.StoryView = true;
        $("#GAME").addClass("story");
        $("#BACKGROUND").addClass("story-bg");
        FUNCTIONS.MAIN.OPEN_MENU("STORY", "active");
        $("#BACKGROUND").attr("style", `background: center / cover no-repeat url("https://purplewizard.space/REverse/images/Locations/${GLOBALS.LOCATIONS[GLOBALS.MISSIONS.LIST[id].LOCATION][6]}");`);
        $("#story-title").html(GLOBALS.MISSIONS.LIST[id].NAME);
        $("#story-text").html("<div class='pw subtitle'>" + GLOBALS.MISSIONS.CHOICES[id][0][0] + "</div>");
        if (!replay) DEFINE_STORY_CHOICES();
    }
}

export function STORY_CHOICE(choice, consequence) {
    let CURRENT_CHOICE = GET_LAST_STORY_CHOICE(Game.MissionStarted[1]);
    let divider = $("#story-text div").length > 0 ? "<div class='pw divider'></div>" : "";
    Game.Choices[Game.MissionStarted[1]][consequence] = Game.Choices[Game.MissionStarted[1]][consequence] == "undefined" || Game.Choices[Game.MissionStarted[1]][consequence] == null ? [null] : Game.Choices[Game.MissionStarted[1]][consequence];
    if (GLOBALS.MISSIONS.CHOICES[Game.MissionStarted[1]][CURRENT_CHOICE][1][0] !== "continue") $("#story-text").append("<div class='pw subtitle dark'>" + GLOBALS.MISSIONS.CHOICES[Game.MissionStarted[1]][CURRENT_CHOICE][1][0][0] + "</div>");
    Game.Choices[Game.MissionStarted[1]][CURRENT_CHOICE] = choice;
    if (GLOBALS.MISSIONS.CHOICES[Game.MissionStarted[1]][CURRENT_CHOICE][1][0] !== "end") Game.Choices[Game.MissionStarted[1]][Number(CURRENT_CHOICE) + 1] = null; 
    if (GLOBALS.MISSIONS.CHOICES[Game.MissionStarted[1]][CURRENT_CHOICE][1][0] == "end") Game.Choices[Game.MissionStarted[1]][CURRENT_CHOICE] = "end";
    $("#story-text").append(divider + "<div class='pw subtitle'>" + GLOBALS.MISSIONS.CHOICES[Game.MissionStarted[1]][consequence][0] + "</div>");
    DEFINE_STORY_CHOICES();
}

export function END_STORY() {
    let CURRENT_CHOICE = GET_LAST_STORY_CHOICE(Game.MissionStarted[1]);
    Game.Choices[Game.MissionStarted[1]][CURRENT_CHOICE] = "end";
    FUNCTIONS.MAIN.CLOSE_MENUS();
}

function DEFINE_STORY_CHOICES() {
    let CURRENT_CHOICE = GET_LAST_STORY_CHOICE(Game.MissionStarted[1]);
    $("#story-buttons").html("");
    let CHOICES = GLOBALS.MISSIONS.CHOICES[Game.MissionStarted[1]][CURRENT_CHOICE][1];
    for (var CHOICE in CHOICES) {
        if (CHOICES[CHOICE] == "end") $("#story-buttons").append(`<div onclick="FUNCTIONS.MISSIONS.END_STORY()" class="pw darkgrey button">Close <i class="fa-thin fa-square-check fa-fade"></i></div>`);
        else if (CHOICES[CHOICE] == "continue") $("#story-buttons").append(`<div onclick="FUNCTIONS.MISSIONS.STORY_CHOICE('continue', ${Number(CURRENT_CHOICE)+1})" class="pw darkgrey button">Continue <i class="fa-thin fa-square-arrow-right fa-fade"></i></div>`);
        else $("#story-buttons").append(`<div onclick="FUNCTIONS.MISSIONS.STORY_CHOICE('${CHOICE}', ${CHOICES[CHOICE][1][1]})" class="pw darkgrey button">${CHOICES[CHOICE][0]}</div>`);
    }
    FUNCTIONS.EVENTS.DYNAMICS()
}

export function REPLAY_STORY(mission) {
    TOGGLE_STORY(mission, true);
    $("#story-text").html("");
    for (var STORY_POINT in GLOBALS.MISSIONS.CHOICES[mission]) {
        let divider = $("#story-text div").length > 0 ? "<div class='pw divider'></div>" : "";
        let CHOICES = GLOBALS.MISSIONS.CHOICES[mission][STORY_POINT][1];
        Game.MissionStarted[1] = mission;
        if (Game.Choices[mission]?.[STORY_POINT] ?? false) {
            $("#story-text").append(divider + "<div class='pw subtitle'>" + GLOBALS.MISSIONS.CHOICES[mission][STORY_POINT][0] + "</div>");
            if (CHOICES[0] != "end" && CHOICES[0] != "continue") $("#story-text").append("<div class='pw subtitle dark'>" + CHOICES[Game.Choices[mission][STORY_POINT]][0] + "</div>");
        }
    }
    $("#story-buttons").html(`<div class="pw darkgrey button" data-link="return_to_game">Close <i class="fa-thin fa-square-x fa-beat-fade"></i></div>`);
    FUNCTIONS.EVENTS.DYNAMICS()
}

export function END_MISSION() {
    if (!Game.MissionStarted[0]) return;

    const mission = GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]];
    if (![1, 2].includes(mission.TYPE) || Game.MissionStarted[2] < mission.OBJECTIVE) return;
    const TYPES = ["Armor or Weapon", "Gem", "Relic"];
    const REWARDS = mission.TYPE === 2 && mission.REWARDS[0] > 0 ?
        `<div class="pw inline blue label"><i class='pw blue fal fa-dna'></i>${FUNCTIONS.MAIN.FORMAT_NUMBER(mission.REWARDS[0], 1)}</div>` :
        `<div class="pw inline alpha label">${FUNCTIONS.MAIN.FORMAT_NUMBER(mission.REWARDS[0], "auto")} XP</div>`;

    Game.xp[0] += mission.TYPE === 1 && mission.REWARDS[0] > 0 ? mission.REWARDS[0] : 0;

    const DESCRIPTION = `${REWARDS} <div class="pw inline green label">1 <span class='${mission.REWARDS[2]}'>${mission.REWARDS[2]}</span> ${TYPES[mission.REWARDS[1]]}</div>`;
    APP.GOT_REWARDS = 1;
    if (mission.REWARDS[1] === 0 && Game.MissionStarted[3] === 0) FUNCTIONS.INVENTORY.newItem(0, APP.Ranking, mission.REWARDS[2]), Game.MissionStarted[3] = 1;
    if (mission[6] === 2 && Game.MissionStarted[3] === 0 && mission.TYPE === 2) FUNCTIONS.INVENTORY.newItem("Relic", null, mission.REWARDS[2]), Game.MissionStarted[3] = 1;
    const TITLE = mission.TYPE === 2 ?
        "<h3 class='pw horizontal divider'>Fortress Cleared</h3>" :
        "<h3 class='pw horizontal divider'>Mission Completed</h3>";

    $("#POPUP").hasClass("active") ? $("#popup-text").append(`${TITLE} ${DESCRIPTION}`) : FUNCTIONS.MAIN.NOTICE(TITLE, DESCRIPTION);
    if (APP.GOT_REWARDS == 1 && Game.MissionStarted[0]) {
        // HIDE MISSION REWARDS
        Game.MissionsCompleted[Game.MissionStarted[1]] = 1;
        if (GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].TYPE == 2) {
            Game.FortressesCleared++;
            Game.Shards += GLOBALS.MISSIONS.LIST[Game.MissionStarted[1]].REWARDS[0];
        }
        Game.MissionStarted = [false, 0, 0, 0, 0];
        APP.GOT_REWARDS = 0;
    }
    FUNCTIONS.APP.UpdateGame();
    GENERATE_MISSION_VIEW();
}

export function RESET_MISSION() {
    if (Game.MissionStarted[0]) {
        Game.Choices[Game.MissionStarted[1]] = [];
        Game.MissionStarted = [false, 0, 0, 0, 0];
        Game.isInFight = false;
        $("#DIV-COMBAT").show();
        Game.config[3] = 0;
        $("#AutoMissions").attr("data-check", "unchecked");
        FUNCTIONS.MAIN.NOTICE("Mission Canceled", `You can restart this mission in the <span class="pw alpha">Missions</span> menu.<br>- Auto start mission <span class="pw red">disabled</span>.`);
        if (Game.Location > 0) Game.Location--;
        FUNCTIONS.APP.UpdateGame();
        GENERATE_MISSION_VIEW();
    }
}

export function GET_LAST_STORY_CHOICE(MISSION) {
    const CHOICES = Game.Choices[MISSION];
    const LAST_CHOICE = Object.keys(CHOICES).pop();
    return LAST_CHOICE || 0;
}

export function GET_TOTAL_STORY_CHOICE_FOR_MISSION(MISSION) {
    const CHOICES = GLOBALS.MISSIONS.CHOICES[MISSION];
    const TOTAL_CHOICES_COUNT = Object.keys(CHOICES).pop();
    return TOTAL_CHOICES_COUNT;
}

export function IS_STORY_FINISHED(STORY) {
    const CHOICES_LIST = Game.Choices[STORY]; // get the nested array to check
    return CHOICES_LIST.includes("end"); // check if the string "end" is present in the array
}