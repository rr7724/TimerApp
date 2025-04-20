// Timer durations in seconds
const MODES = {
    pomodoro: 25 * 60,
    "short-break": 5 * 60,
    "long-break": 15 * 60,
};

let timerDuration = MODES.pomodoro;
let timeLeft = timerDuration;
let timerInterval = null;
let isRunning = false;
let currentMode = "pomodoro";
let endTime = null;

const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

const modeButtons = document.querySelectorAll(".mode-buttons .button");
const alarmAudio = document.getElementById("alarm-audio");

function updateDisplay(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    hoursSpan.textContent = String(hrs).padStart(2, "0");
    minutesSpan.textContent = String(mins).padStart(2, "0");
    secondsSpan.textContent = String(secs).padStart(2, "0");
}

function switchMode(mode) {
    if (isRunning) {
        stopTimer();
    }
    currentMode = mode;
    timerDuration = MODES[mode];
    timeLeft = timerDuration;
    updateDisplay(timeLeft);
    updateActiveModeButton();
}

function updateActiveModeButton() {
    modeButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.id === currentMode);
    });
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    endTime = Date.now() + timeLeft * 1000;

    timerInterval = setInterval(() => {
        let now = Date.now();
        timeLeft = Math.round((endTime - now) / 1000);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            timeLeft = 0;
            updateDisplay(timeLeft);
            alarmAudio.play();
            return;
        }
        updateDisplay(timeLeft);
    }, 250);
}



function stopTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);

    timeLeft = timerDuration;
    updateDisplay(timeLeft);

    alarmAudio.pause();
    alarmAudio.currentTime = 0; // Reset audio to start
}// Timer durations in seconds

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    timeLeft = timerDuration;
    updateDisplay(timeLeft);
}


// Initial
function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    timeLeft = timerDuration;
    updateDisplay(timeLeft);
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        switchMode(btn.id);
    });
});

// Initialize display
updateDisplay(timeLeft);
updateActiveModeButton();

