
const runPoll = () => {
    const timer = document.querySelector('.timer');
    const displayMinutes = document.getElementById('minutes');
    const displaySeconds = document.getElementById('seconds');
    const selectMinutes = document.getElementById('selectMinutes');
    const submitBtn = document.getElementById('submitBtn');

    let totalSeconds = 0;
    let secondsElapsed = 0;
    let minutes;
    let interval;


    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        console.log(minutes);
        startTimer();
    })

    const startTimer = () => {
        minutes = selectMinutes.value.trim();
        clearInterval(interval);
        totalSeconds = minutes * 60;

        if (totalSeconds > 0) {
            interval = setInterval(() => {
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
        console.log('=====================');
        console.log(`getFormattedMinutes = ${minutesLeft}`);
        console.log('=====================');

        let formattedMinutes = minutesLeft;


        // if (minutesLeft < 10) {
        //     formattedMinutes = minutesLeft;
        //     console.log(`formatted minutes < 10 ${formattedMinutes}`);
        // }
        // else {
        //     formattedMinutes = minutesLeft;
        //     console.log(`formatted minutes !< 10 ${formattedMinutes}`)
        // }
        return formattedMinutes;
    }

    const getFormattedSeconds = () => {
        let secondsLeft = totalSeconds % 60;
        let formattedSeconds;
        console.log('=====================');
        console.log(`getFormattedSeconds = ${secondsLeft}`);
        console.log('=====================');

        if (secondsLeft < 10) {
            formattedSeconds = `:0${secondsLeft}`;

            console.log(`formatted seconds < 10 ${formattedSeconds}`);
        }
        else {
            formattedSeconds = `:${secondsLeft}`;
            console.log(`formatted seconds !< 10 ${formattedSeconds}`);
        }
        console.log({ formattedSeconds });
        return formattedSeconds;
    }

    const displayTimer = () => {
        displayMinutes.textContent = getFormattedMinutes();
        displaySeconds.textContent = getFormattedSeconds();
    }
};

runPoll();