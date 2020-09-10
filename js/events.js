function DYNAMICS() {
    $("#menu").on("click", "div", function () {
        hideMenuTabs();
        TOP10();
    });

    $("#RESET_THEME").on("click", function () {
        ResetTheme(1);
    });

    $("#attack-btn").on("click", function () {
        MAIN_ATTACK();
    });

    $("#emp-btn").on("click", function () {
        SPECIAL_ATTACK();
    });

    $("#cover-btn").on("click", function () {
        TAKE_COVER();
    });

    $("#run-btn").on("click", function () {
        RUN_AWAY();
    });

    $("#WelcomeNext").on("click", function () {
        WelcomeNext();
    });

    $("#WelcomePrevious").on("click", function () {
        ChangeStep(0);
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

    $("#AVATAR_NEXT").on("click", function () {
        CHANGE_AVATAR(1);
    });

    $("#AVATAR_PREVIOUS").on("click", function () {
        CHANGE_AVATAR(0);
    });

    $("#AVATAR_NEXT_BEGIN").on("click", function () {
        CHANGE_AVATAR(1);
    });

    $("#AVATAR_PREVIOUS_BEGIN").on("click", function () {
        CHANGE_AVATAR(0);
    });

    $("#ChooseWarrior").on("click", function () {
        APP.WelcomeData[2] = "Warrior";
        $("#warrior").attr("class", "pw message selected");
        $("#paladin").attr("class", "pw message");
        $("#ninja").attr("class", "pw message");
    });

    $("#ChoosePaladin").on("click", function () {
        APP.WelcomeData[2] = "Paladin";
        $("#warrior").attr("class", "pw message");
        $("#paladin").attr("class", "pw message selected");
        $("#ninja").attr("class", "pw message");
    });

    $("#ChooseNinja").on("click", function () {
        APP.WelcomeData[2] = "Ninja";
        $("#warrior").attr("class", "pw message");
        $("#paladin").attr("class", "pw message");
        $("#ninja").attr("class", "pw message selected");
    });

    $("#WB-BTN").on("click", function () {
        CLOSE_MENUS();
        $("#DIV-COMBAT").show();
        $(".BUTTONS_ACTIONS").show();
        $("#LOGIN-NOTICE").attr("class", "popup");
        $("#wb-title").html("");
        $("#wb-text").html("");
        APP.Email = "DoNotLogin";
        UpdateGame();
    });

    $("#LOGIN-BTN").on("click", function () {
        $("#LOGIN-NOTICE").attr("class", "popup");
        $("#wb-title").html("");
        $("#wb-text").html("");
        login();
    });

    $("#UPGRADE_0").on("click", function () {
        DIMENSIONAL_UPGRADE(0);
    });

    $("#UPGRADE_1").on("click", function () {
        DIMENSIONAL_UPGRADE(1);
    });

    $("#UPGRADE_2").on("click", function () {
        DIMENSIONAL_UPGRADE(2);
    });

    $("#UPGRADE_3").on("click", function () {
        DIMENSIONAL_UPGRADE(3);
    });

    $("#reset-btn").on("click", function () {
        Reset();
    });

    $("#Reload").on("click", function () {
        location.reload();
    });

    $("#export-btn").on("click", function () {
        exportSave();
    });

    $("#import-btn").on("click", function () {
        importSave();
    });

    $("#missions").on("click", function () {
        $("#exploration").attr("class", "pw button");
        $("#missions").attr("class", "pw button active");
        GenMissions();
        SelectTAB("MISSIONS");
    });

    $("#exploration").on("click", function () {
        $("#exploration").attr("class", "pw button active");
        $("#missions").attr("class", "pw button");
        GenExplorationMenu();
        SelectTAB("EXPLORE");
    });

    $(".link").bind("click", function (e) {
        e.preventDefault();
        OpenLink($(this).attr("data-url"));
    });

    $(".menu li").bind("click", function (e) {
        e.preventDefault();
        let TOGGLE = $(this).hasClass("active") ? "" : "active";
        CLOSE_MENUS();
        $('.link.active').each(function () {
            $(this).attr("class", "link");
        });
        if ($(this).data("menu") != "#") {
            $(this).attr("class", "link " + TOGGLE);
            OPEN_MENU($(this).data("menu"), TOGGLE);
            if ($(this).data("menu") == "INVENTORY") GenInventory();
        }
    });

    $(".pw.dropdown .name").bind("click", function (e) {
        e.preventDefault();
        let TOGGLE = $(this).parent().attr("data-open") === "open" ? "closed" : "open";
        $(this).parent().attr("data-open", TOGGLE);
    });

    $(".pw.checkbox").bind("click", function (e) {
        e.preventDefault();
        let TOGGLE = $(this).attr("data-check") === "checked" ? "unchecked" : "checked";
        let CONFIG = $(this).attr("data-check") === "checked" ? 0 : 1;
        Game.config[$(this).attr("data-id")] = CONFIG;
        $(this).attr("data-check", TOGGLE);
        if ($(this).attr("data-id") == 4) ReadDB();
        if (_.inRange($(this).attr("data-id"), 5, 11)) {
            Game.AutoRemove[$(this).attr("data-id") - 5] = CONFIG;
            UpdateUI();
        }
    });
}
