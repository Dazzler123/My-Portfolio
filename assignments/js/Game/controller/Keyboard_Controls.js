var enterCtrlBlink = 0;
var keyCode;

//when keys are pressed
function keyCheck(event) {
    keyCode = event.which;

    //if enter key is pressed
    if (keyCode == 13) {
        //hide enter ctrl title
        $('#enter_ctrl').css('visibility','hidden');

        //start ninja running animation
        if (runImageNum == 0) {
            runAnimationStart();
        }
        //start wolf running animation
        if (wolfAnimationIndex == 0) {
            wolfAnimationIndex = setInterval(wolfAnimation, 100);
        }
    }

    //if escape is pressed
    if (keyCode == 27) {
        //exit from game to homepage
        exitGame();
    }

    if (moveBckgrndAnimationIndex == 0 & keyCode == 13) {
        moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
    }

    if (keyCode == 32) {
        if (jumpAnimationIndex == 0) {
            jumpAnimationStart();
        }
        // if (moveBckgrndAnimationIndex == 0) {
        //     moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
        // }
    }
    // if (moveBckgrndAnimationIndex == 0 & keyCode == 13) {
    //     moveBckgrndAnimationIndex = setInterval(moveBackground, 100);
    // }
    // //start wolf running animation
    // if (wolfAnimationIndex == 0) {
    //     wolfAnimationIndex = setInterval(wolfAnimation, 100);
    // }
}

