let startTime;
let running = false;
let interval;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('laps');

function startStop() {
    if (!running) {
        start();
        startStopButton.textContent = 'Stop';
    } else {
        stop();
        startStopButton.textContent = 'Start';
    }
}

function start() {
    running = true;
    startTime = Date.now() - (interval || 0);
    interval = setInterval(updateDisplay, 10);
}

function stop() {
    running = false;
    clearInterval(interval);
}

function reset() {
    stop();
    interval = null;
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
    startStopButton.textContent = 'Start';
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

function pad(value) {
    return value < 10 ? `0${value}` : value;
}

function lap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        const formattedTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = formattedTime;
        lapsList.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
