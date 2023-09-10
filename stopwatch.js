const getSeconds = document.getElementById('seconds');
const getMinutes = document.getElementById('minutes');
const getHours = document.getElementById('hours');
let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId;

const startTime = () => {
    countTime();
}

const pauseTime = () => {
    // console.log('btn clicked');
    clearInterval(intervalId);
}

const resetTime = () => {
    window.location.reload();
}



const countTime = () => {
    intervalId = setInterval(() => {
        seconds++;
        console.log(seconds);
        getSeconds.innerText = seconds < 10 ? `0${seconds}` : seconds;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
            getMinutes.innerText = minutes < 10 ? `0${minutes}` : minutes;

            if (minutes === 60) {
                minutes = 0;
                hours++;
                getHours.innerText = hours < 10 ? `0${hours}` : hours;
            }
        }

    }, 1000);
};
