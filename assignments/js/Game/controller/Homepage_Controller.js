//hide success game end
$('#success_game_end_container').css('visibility', 'hidden');
//hide failed game end
$('#failed_game_end_container').css('visibility', 'hidden');

$(window).on('load', function () {
    //hide game
    $('#game_container').css('visibility', 'hidden');
    //hide about
    $('#about_container').css('visibility', 'hidden');
    //play background music
    bgm.play();
});

function buttonClickEffect() {
    document.getElementById('click_effect').play();
}

$('#btnStartGame').click(function () {
    //play button click effect
    buttonClickEffect();
    //hide homepage & show game
    $('#home_container').css('visibility', 'hidden');
    $('#game_container').css('visibility', 'visible');
    //show titles
    $('#enter_ctrl').css('visibility', 'visible');
});

$('#btnAbout').click(function () {
    //play button click effect
    buttonClickEffect();
    //show about details
    $('#about_container').css('visibility', 'visible');
});

$('#btnCloseAbout').click(function () {
    //hide about details
    $('#about_container').css('visibility', 'hidden');
});