var time_ele = document.getElementsByClassName("time")[0];
var start_btn = document.getElementById("start");
var lap_btn = document.getElementById("lap");
var stop_btn = document.getElementById("stop");
var reset_btn = document.getElementById("reset");


let milliseconds = 0;
let interval = null;
let ctr = 0;

start_btn.addEventListener("click", start);
lap_btn.addEventListener("click", lap);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);

function timer() {
    milliseconds++;

    let mins = Math.floor(milliseconds / (1000 * 60));
    let secs = Math.floor((milliseconds - (mins * 1000 * 60)) / 1000);
    let msecs = milliseconds % 1000;

    if (msecs < 10)
        msecs = '00' + msecs;
    else if (msecs < 100)
        msecs = '0' + msecs;

    if (secs < 10)
        secs = '0' + secs;

    if (mins < 10)
        mins = '0' + mins;

    time_ele.innerHTML = `${mins}:${secs}:${msecs}`;
}


function start() {
    if (interval) {
        return;
    }

    interval = setInterval(timer, 1); // Update every millisecond
}

function lap() {
    ctr++;
    let lapElement = document.createElement('h4');
    lapElement.textContent = "Lap " + ctr + ":  " + time_ele.innerHTML;
    document.querySelector('.lapping').appendChild(lapElement);
}



function stop() {
    clearInterval(interval);
    interval = null;
}

function reset() {
    stop();
    milliseconds = 0;
    ctr = 0;
    time_ele.innerHTML = "00:00:000";
}
