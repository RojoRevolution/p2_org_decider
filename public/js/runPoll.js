
const runPoll = () => {
    const timer = document.querySelector('.timer');
    const displayMinutes = document.getElementById('minutes');
    const displaySeconds = document.getElementById('seconds');
    const selectMinutes = document.getElementById('selectMinutes');
    const submitBtn = document.getElementById('submitBtn');

    let totalSeconds = 0;
    let secondsElapsed = 0;
    let minutes;


    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        minutes = selectMinutes.value.trim();
        console.log(minutes);
        startTimer();
    })

    const startTimer = () => {
        totalSeconds = minutes * 60;

        if (totalSeconds > 0) {
            setInterval(() => {
                totalSeconds--;
                console.log(totalSeconds);
                displayTimer();
            }, 1000);
        }
        else {
            alert('Minutes must be greater than 0');
        }
    }

    const getFormattedMinutes = () => {
        let minutesLeft = Math.floor(totalSeconds / 60);
        let formattedMinutes;

        if (minutesLeft < 10) {
            formattedMinutes = '0';
        }
        else {
            formattedMinutes = minutesLeft;
        }
        return formattedMinutes;
    }

    const getFormattedSeconds = () => {
        let secondsLeft = totalSeconds % 60;
        let formattedSeconds;

        if (secondsLeft < 10) {
            formattedMinutes = '0' + secondsLeft;
        }
        else {
            formattedSeconds = secondsLeft;
        }
        return formattedSeconds;
    }

    const displayTimer = () => {
        displayMinutes.textContent = getFormattedMinutes();
        displaySeconds.textContenet = getFormattedSeconds();
    }
};

runPoll();