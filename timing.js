var hoursDisplay = document.getElementById('hours');
var minutesDisplay = document.getElementById('minutes');
var secondsDisplay = document.getElementById('seconds');
var startButton = document.getElementById('startButton');
var stopButton = document.getElementById('stopButton');
var setTimeButton = document.getElementById('setTimeButton');
var setHoursInput = document.getElementById('setHours');
var setMinutesInput = document.getElementById('setMinutes');
var setSecondsInput = document.getElementById('setSeconds');
var intervalId;
var totalTime = 0;

function setTimer() {
  var hours = parseInt(setHoursInput.value) || 0;
  var minutes = parseInt(setMinutesInput.value) || 0;
  var seconds = parseInt(setSecondsInput.value) || 0;

  hoursDisplay.textContent = formatTime(hours);
  minutesDisplay.textContent = formatTime(minutes);
  secondsDisplay.textContent = formatTime(seconds);
}

function startTimer() {
  if (!intervalId) {
    var hours = parseInt(hoursDisplay.textContent);
    var minutes = parseInt(minutesDisplay.textContent);
    var seconds = parseInt(secondsDisplay.textContent);

    totalTime = (hours * 3600) + (minutes * 60) + seconds;

    if (totalTime > 0) {
      startButton.disabled = true;
      stopButton.disabled = false;
      intervalId = setInterval(updateTimer, 1000);
    }
  }
}

function updateTimer() {
  if (totalTime > 0) {
    totalTime--;
    var hours = Math.floor(totalTime / 3600);
    var minutes = Math.floor((totalTime % 3600) / 60);
    var seconds = totalTime % 60;

    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
  } else {
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabled = false;
    stopButton.disabled = true;
    alert('時間到！');
  }
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  startButton.disabled = false;
  stopButton.disabled = true;
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

