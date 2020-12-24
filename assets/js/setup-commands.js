function AudioSetup(audio, stopPlay = false, callback = function(){}) {
    var playing = false;

    return function playSound() {
        if (!stopPlay) {
            if (playing) {
                audio.currentTime = 0
                playing = false
            }

            playing = true;
            return audio.play();
        } else {
            if (playing) {
                audio.currentTime = 0
                playing = false
                return audio.pause();
            } else {
                playing = true;
                return audio.play();
            }
        }
    }
}


var playBell = AudioSetup(tibetanBell);
var $bellBtn = document.getElementById('bellBtn');

$bellBtn.addEventListener('click', function bellEffectButton() {
    playBell().then(function() {
        vibrate(200);
    });
});

var playWater = AudioSetup(waterSound, true);
var $waterBtn = document.getElementById('waterBtn');

var $waterStatus = document.querySelector('#waterBtn .status');

$waterBtn.addEventListener('click', function waterEffectButton() {
    playWater();

    if ($waterStatus.innerText === 'ON') {
        $waterStatus.innerText = 'OFF';
    } else {
        $waterStatus.innerText = 'ON';
    }
});

var $candleBtn = document.getElementById('candleBtn');

var $candleStatus = document.querySelector('#candleBtn .status');

$candleBtn.addEventListener('click', function waterEffectButton() {
    $candleBtn.classList.toggle('on');

    if ($candleStatus.innerText === 'ON') {
        $candleStatus.innerText = 'OFF';
    } else {
        $candleStatus.innerText = 'ON';
    }
});

function vibrate(time) {
    if (!window) {
        alert('No Vibration Avaiable')
        return;
    }

    if (!window.navigator) {
        alert('No Vibration Avaiable')
        return;
    }

    if (!window.navigator.vibrate) {
        alert('No Vibration Avaiable')
        return;
    }

    window.navigator.vibrate(time);
}