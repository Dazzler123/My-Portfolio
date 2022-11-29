var ninja = document.getElementById("character");
var ninjaMarginTop = 53.5;
var ninjaMarginLeft = 4;

var idleImageNum = 0;
var idleAnimationIndex = 0

var runImageNum = 0;
var runAnimationIndex = 0;

var jumpImageNum = 0;
var jumpAnimationIndex = 0;

var deadImageNum = 1;
var deadAnimationIndex = 0;

//start idle animation on load
$('#game_container').onload = idleAnimationStart();

// ========================================================================

function idleAnimation() {
    // after all idle images are loaded
    if (idleImageNum == 10) {
        idleImageNum = 0;
    }
    // set image
    ninja.src = "assets/images/characters/Idle" + idleImageNum + ".png";

    // to next idle image
    idleImageNum++;
}

function idleAnimationStart() {
    idleAnimationIndex = setInterval(idleAnimation, 150);
}

// character running animation
function runAnimation() {
    // after all running images are loaded
    if (runImageNum == 10) {
        runImageNum = 0;
    }
    //set image
    ninja.src = "assets/images/characters/Run" + runImageNum + ".png";

    // to next running image
    runImageNum++;

    //play running sound effect
    runningEffect.play();
}

function runAnimationStart() {
    runAnimationIndex = setInterval(runAnimation, 100);
    //stop idle animation
    clearInterval(idleAnimationIndex);
}

// character jumping animation
function jumpAnimation() {
    //move ninja up
    if (jumpImageNum <= 5) {
        //reduce ninja's margin top by 5
        ninjaMarginTop = ninjaMarginTop - 5;
        //increase ninja's margin left by 2
        ninjaMarginLeft = ninjaMarginLeft + 2;

        ninja.style.marginTop = ninjaMarginTop + "vh";
        ninja.style.marginLeft = ninjaMarginLeft + "vh";
    }

    //play jump up sound effect
    if (jumpImageNum == 1) {
        jumpPartOne.play();
        //pause character running sound effect
        runningEffect.pause();
    }
    //move ninja down
    if (jumpImageNum >= 6) {
        ninjaMarginTop = ninjaMarginTop + 5;
        //reduce ninja's margin left by 2
        ninjaMarginLeft = ninjaMarginLeft - 2;

        ninja.style.marginTop = ninjaMarginTop + "vh";
        ninja.style.marginLeft = ninjaMarginLeft + "vh";
    }

    //play jump land sound effect
    if (jumpImageNum == 9) {
        jumpPartTwo.play();
        //play character running sound effect
        runningEffect.play();
    }

    // after all jumping images are loaded
    if (jumpImageNum == 10) {
        //back to default character margin top
        ninja.style.marginTop = 53.5 + "vh";
        jumpImageNum = 0;
        //stop jump effect
        clearInterval(jumpAnimationIndex);
        jumpAnimationIndex = 0;
        runAnimationIndex = 0;
        //start running again
        runAnimationStart();
    }
    //set image
    ninja.src = "assets/images/characters/Jump" + jumpImageNum + ".png";

    // to next running image
    jumpImageNum++;
}

function jumpAnimationStart() {
    // clearInterval(idleImageNum);
    // runAnimationIndex = 0;
    clearInterval(runAnimationIndex);
    jumpAnimationIndex = setInterval(jumpAnimation, 100);
}

function ninjaDeadAnimation() {
    deadImageNum = deadImageNum + 1;

    if (deadImageNum == 9) {
        //stop loop
        clearInterval(deadAnimationIndex);
        // //reset image
        // deadImageNum = 0;
    }
    //set image
    ninja.src = "assets/images/characters/Dead" + deadImageNum + ".png";

    //play dead sound effect
    if (deadImageNum == 2) {
        deadEffect.play();
    }
}







