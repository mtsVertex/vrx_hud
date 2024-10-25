$(document).ready(function() {

    togglehud(true)

     // Test //
    // editcarhud(50, 'Zajebista ulica', 'Ulica', 46)
    // updateStats('.health', 50)
    // updateStats('.armor', 25)
    // updateStats('.hunger', 77)
    // updateStats('.thirst', 65)
    // updateStats('.voice', 75)
    // updateid(777)

    window.addEventListener('message', function(event) {
        let action = event.data.action;

        if (action === 'updateHud') {
            updateStats('.health', event.data.health);
            updateStats('.armor', event.data.armor);
            updateStats('.hunger', event.data.hunger);
            updateStats('.thirst', event.data.thirst);
            updateStats('.voice', event.data.voice);
        }

        if (action === 'toggleHud') {
            togglehud(event.data.show);
        }

        if (action === 'updatePlayerID') {
            updateid(event.data.id);
        }

        if (action === 'updateVoice') {
            updateVoice(event.data.arr);
        }
    });

    function updateStats(stats, value) {
        $(stats).css('background', `linear-gradient(180deg, #2b2b2b 0%, #2b2b2b ${100 - value}%, #464646 ${100 - value}%, #464646 100%)`);
    }

    function togglehud(toggle) {
        if (toggle) {
            $('.hud-container').animate({ right: '0vw' }, 500);
        } else {
            $('.hud-container').animate({ right: '-20vw' }, 500);
        }
    }

    function editcarhud(speed, street, zone, fuel) {
        $('.speed-digits').text(speed);
        $('.street').text(street);
        $('.zone').text(zone);
        updateStats('.fuel', fuel);
    }

    function updateid(id) {
        $('.id-text').text(id);
    }

    function togglecarhud(toggle) {
        if (toggle) {
            $('.carhud-container').animate({ bottom: '1vw' }, 500);
        } else {
            $('.carhud-container').animate({ bottom: '-20vw' }, 500);
        }
    }

    function updateVoice(arr) {
        let fillPercentage;
        switch (arr.volume) {
            case 'Whisper':
                fillPercentage = 33;
                break;
            case 'Normal':
                fillPercentage = 50;
                break;
            case 'Shouting':
                fillPercentage = 100;
                break;
            default:
                fillPercentage = 33;
                break;
        }

        if (arr.talking) {
            $('.x.voice i').css('color', '#fff');
        } else {
            $('.x.voice i').css('color', 'rgb(197, 197, 197)');
        }

        $('.x.voice').css({
            'background': '#2b2b2b',
            'background-image': `linear-gradient(0deg, #464646 ${fillPercentage}%, transparent ${fillPercentage}%)`
        });
    }
});
