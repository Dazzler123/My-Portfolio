var bckgrndPositionX = 0;
var moveBckgrndAnimationIndex = 0;

//game score
var score = 0;
$('#score').text(score);
var lastScore = 0;

//wolf barrier
var wolfDivMarginLeft = 1850;
var wolfAnimationIndex = 0;

// rock barrier
var rockDivMarginLeft = 9500;
var rockAnimationIndex = 0;

//add wolf barrier at game startup
$('#game_container').onload = createWolfBarrier();
// //add rock barrier at game startup
$('#game_container').onload = createRockBarrier();

//background music
var bgm = document.getElementById("bgm");
//ninja running sound effect
var runningEffect = document.getElementById("run_bgm");
//success game won sound effect
var wonEffect = document.getElementById('game_won_effect');
//ninja jumping sound effect part 1
var jumpPartOne = document.getElementById("jump_part_one_bgm");
//ninja jumping sound effect part 2
var jumpPartTwo = document.getElementById("jump_part_two_bgm");
//ninja dead sound effect
var deadEffect = document.getElementById('dead_effect');

// ======================================================================

//control instructions blink effect
function blink_text() {
    $('#enter_ctrl').fadeOut(100);
    $('#enter_ctrl').fadeIn(100);
}

enterCtrlBlink = setInterval(blink_text, 500);

//move background image
function moveBackground() {
    //reduce margin left
    bckgrndPositionX = bckgrndPositionX - 20;
    document.getElementById("background").style.backgroundPositionX = bckgrndPositionX + "px";

    //reduce rock margin left
    for (let i = 0; i <= 10; i++) {
        //get current rock
        var currentRockDiv = document.getElementById("rock" + i);
        var tempWolfMarginLeft = getComputedStyle(currentRockDiv).marginLeft;
        //reduce margin left
        var newRockMarginLeft = parseInt(tempWolfMarginLeft) - 20;
        //set new margin left (as a string)
        currentRockDiv.style.marginLeft = newRockMarginLeft.toString() + "px"
    }

    //show game score
    score = score + 1;
    $('#score').text(score);

    // to level 2
    if (bckgrndPositionX <= -9220) {
        console.log("Game Ended Successfully!");
        console.log("Your score : " + score);
        //stop ongoing game
        stopGame();
        //show success game end
        showSuccessEndGame(score);
        // mark latest score
        lastScore = score;
        // start ninja's idle animation
        idleAnimationStart();
        bckgrndPositionX = 0;
        $('#btnContinue').click(function () {
            $('#success_game_end_container').css('visibility', 'hidden');
            // re-position wolfs
            wolfDivMarginLeft = 9700;
            //add rock barrier
            createRockBarrier();
            //set last score
            score = lastScore;
            bckgrndPositionX = 0;
            moveBckgrndAnimationIndex = 0;
            wolfAnimationIndex = 0;
            $('#level_Heading').text("Level 2");
            moveBackground();
            createWolfBarrier();
            wolfAnimation();
            runAnimationStart();
            jumpAnimationStart();
        });
    }

    // to level 3
    if (bckgrndPositionX <= -20700) {
        console.log("Game Ended Successfully!");
        console.log("Your score : " + score);
        // mark latest score
        lastScore = score;
        //stop ongoing game
        stopGame();
        //show success game end
        showSuccessEndGame(score);
        // start ninja's idle animation
        // idleAnimationStart();
        moveBackground();
        runAnimationStart();
        jumpAnimationStart();
    }
}

// adding a wolf as an barrier
function createWolfBarrier() {
    for (var i = 0; i <= 10; i++) {
        var wolf = document.createElement("div");
        wolf.className = "wolf";
        //add to background
        $('#background').append(wolf);
        wolf.style.marginLeft = wolfDivMarginLeft + "px";
        //set an unique id
        wolf.id = "wolf" + i;

        //add a space of 50vw between first 5 present wolf divs
        if (i < 5) {
            wolfDivMarginLeft = wolfDivMarginLeft + 2000;
        }
        //add a space of 30vw between last 5 wolf divs
        if (i >= 5) {
            wolfDivMarginLeft = wolfDivMarginLeft + 1000;
        }
    }
}

// adding a rock as an barrier
function createRockBarrier() {
    for (var i = 0; i <= 10; i++) {
        var rock = document.createElement("div");
        rock.className = "rock";
        //add to background
        $('#background').append(rock);
        rock.style.marginLeft = rockDivMarginLeft + "px";
        //set an unique id
        rock.id = "rock" + i;

        //add a space of 50vw between first 5 present rock divs
        if (i < 5) {
            rockDivMarginLeft = rockDivMarginLeft + 1500;
        }
        //add a space of 30vw between last 5 rock divs
        if (i >= 5) {
            rockDivMarginLeft = rockDivMarginLeft + 700;
        }
    }
}

//wolf running towards the game character animation
function wolfAnimation() {
    for (var i = 0; i < 10; i++) {
        //get current wolf
        var currentWolfDiv = document.getElementById("wolf" + i);
        var currentMarginLeft = getComputedStyle(currentWolfDiv).marginLeft;
        //reduce margin left
        var newMarginLeft = parseInt(currentMarginLeft) - 35;
        //set new margin left (as a string)
        currentWolfDiv.style.marginLeft = newMarginLeft.toString() + "px"

        //stop all when both collides
        if (newMarginLeft <= 150 & newMarginLeft >= -84) {
            if (ninjaMarginTop > 47) {
                //stop ongoing game
                stopGame();
                //run dead animation
                deadAnimationIndex = setInterval(ninjaDeadAnimation, 100);
                //hide collided wolf
                currentWolfDiv.style.visibility = "hidden";
                //show failed end game
                showFailedEndGame();
            }
        }

        // //stop all when both collides (ninja & rock)
        // if (rockDivMarginLeft <= 150 & rockDivMarginLeft >= -84) {
        //     if (ninjaMarginTop > 47) {
        //         //stop ongoing game
        //         stopGame();
        //         //run dead animation
        //         deadAnimationIndex = setInterval(ninjaDeadAnimation, 100);
        //         // //hide collided wolf
        //         // currentWolfDiv.style.visibility = "hidden";
        //         //show failed end game
        //         setFailedEndGame();
        //     }
        // }
    }
}


function stopGame() {
    //stop wolf running animation
    clearInterval(wolfAnimationIndex);

    //stop ninja running animation
    clearInterval(runAnimationIndex);
    runAnimationIndex = 0;

    //stop ninja jumping animation
    clearInterval(jumpAnimationIndex);
    jumpAnimationIndex = 0;

    //stop background moving animation
    clearInterval(moveBckgrndAnimationIndex);
    moveBckgrndAnimationIndex = 0;

    //stop running sound effect
    runningEffect.pause();

    //clear keycode
    keyCode = null;
}

$('#btnTryAgain').click(function () {
    tryAgainGame();
});

$('#btnRetry').click(function () {
    tryAgainGame();
});

$('#btnExitGameTwo').click(function () {
    exitGame();
});

$('#btnExitGame').click(function () {
    exitGame();
});

function tryAgainGame() {
    //hide success game end
    $('#success_game_end_container').css('visibility', 'hidden');
    //hide failed game end
    $('#failed_game_end_container').css('visibility', 'hidden');
    //new game
    resetGame();
}

function exitGame() {
    // new game
    resetGame();
    //hide titles
    $('#enter_ctrl').css('visibility', 'hidden');
    //hide success game end
    $('#success_game_end_container').css('visibility', 'hidden');
    //hide failed game end
    $('#failed_game_end_container').css('visibility', 'hidden');
    //hide game & show homepage
    $('#game_container').css('visibility', 'hidden');
    $('#home_container').css('visibility', 'visible');
}

function resetGame() {
    //stop current process
    stopGame();
    //show titles
    $('#enter_ctrl').css('visibility', 'visible');
    //set new score
    score = 0;
    $('#score').text(score);

    // idleAnimationStart();

    //remove all wolfs
    removeWolfs();

    ninjaMarginLeft = 4;
    runImageNum = 0;
    bckgrndPositionX = 0;
    moveBckgrndAnimationIndex = 0;

    idleImageNum = 0;
    idleAnimationIndex = 0

    runImageNum = 0;
    runAnimationIndex = 0;

    jumpImageNum = 0;
    jumpAnimationIndex = 0;

    deadImageNum = 1;
    deadAnimationIndex = 0;

    //wolf barrier
    wolfDivMarginLeft = 1850;
    wolfAnimationIndex = 0;

    //create new wolfs
    createWolfBarrier();

    if (keyCode == 13) {
        //hide enter ctrl title
        $('#enter_ctrl').css('visibility', 'hidden');
        console.log("inside");

        //start ninja running animation
        if (runImageNum == 0) {
            runAnimationStart();
        }
        //start wolf running animation
        if (wolfAnimationIndex == 0) {
            wolfAnimationIndex = setInterval(wolfAnimation, 100);
        }
    }
    if (moveBckgrndAnimationIndex == 0 & keyCode == 13) {
        moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
    }
    if (keyCode == 32) {
        if (jumpAnimationIndex == 0) {
            jumpAnimationStart();
        }
    }
}

function removeWolfs() {
    for (var i = 0; i <= 10; i++) {
        var currentWolfDiv = document.getElementById("wolf" + i);
        //remove from background
        $(currentWolfDiv).remove();
    }
}

function showSuccessEndGame() {
    $('#success_game_end_container').css('visibility', 'visible');
    //play sound effect
    wonEffect.play();
    // set score
    $('#success_score').text("Your score : " + score);
}

function showFailedEndGame() {
    $('#failed_game_end_container').css('visibility', 'visible');
    // set score
    $('#failed_score').text("Your score : " + score);
}
