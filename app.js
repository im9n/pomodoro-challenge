let cancelId;
let startTime;
let savedTime = 0;
const countdown = 25 * 1000 * 60;

const timerMillis = document.querySelector(".timer__milliseconds");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMinutes = document.querySelector(".timer__minutes");
const startButton = document.querySelector(".stopwatch__start");
const stopButton = document.querySelector(".stopwatch__stop");
const resetButton = document.querySelector(".stopwatch__reset");

function startTimer() {
  startTime = Date.now() + countdown;
  cancelId = setInterval(updateTimer, 1000 / 60);

  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
}

function stopTimer() {
  savedTime += Date.now() - (startTime - countdown);
  console.log(savedTime / 1000);
  clearInterval(cancelId);

  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
}

function resetTimer() {
  timerMillis.innerHTML = "000";
  timerSeconds.innerHTML = "00";
  timerMinutes.innerHTML = "25";
  savedTime = 0;
  startTime = Date.now() + countdown;

  startButton.disabled = false;
  stopButton.disabled = false;
  resetButton.disabled = true;
}

function updateTimer() {
  console.log("this ran");

  const millisUntil = startTime - Date.now() - savedTime;
  const secondsUntil = Math.floor(millisUntil / 1000);
  const minutesUntil = Math.floor(secondsUntil / 60);

  let millisText = millisUntil % 1000;
  let secondsText = secondsUntil % 60;
  let minutesText = minutesUntil;

  if (minutesText.toString().length < 2) {
    minutesText = padStartTime(minutesText, 2);
  }

  if (secondsText.toString().length < 2) {
    secondsText = padStartTime(secondsText, 2);
  }

  if (millisText.toString().length < 3) {
    millisText = padStartTime(millisText, 3);
  }

  timerMillis.innerHTML = millisText;
  timerSeconds.innerHTML = secondsText;
  timerMinutes.innerHTML = minutesText;

  if (millisUntil <= 0) {
    clearInterval(cancelId);
    timerMillis.innerHTML = "000";
    timerSeconds.innerHTML = "00";
    timerMinutes.innerHTML = "00";
  }
}

function padStartTime(number, length) {
  return number.toString().padStart(length, 0);
}
