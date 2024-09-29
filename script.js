let timerInterval;
let totalTime = 0;

const endSound = new Audio('https://raw.githubusercontent.com/cmaroupas/soundfile/main/Tick-DeepFrozenApps-397275646.mp3');

const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const presetButtons = document.querySelectorAll('.preset');

// Timer countdown
function updateTimerDisplay() {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  timerDisplay.textContent = formattedTime;
  document.title = `Timer: ${formattedTime}`;
}

function startCountdown() {
  timerInterval = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval); 
      document.title = 'Time’s Up!';
      endSound.play();
    }
  }, 1000);
}

function startTimer() {
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  totalTime = minutes * 60 + seconds;

  clearInterval(timerInterval); 
  updateTimerDisplay();         
  startCountdown();             
}

function resetTimer() {
  clearInterval(timerInterval);  // Stop countdown timer
  clearInterval(regularTimerInterval);  // Stop regular timer

  totalTime = 0;  // Reset the countdown timer total time
  regularTime = 0;  // Reset the regular timer total time

  updateTimerDisplay();  // Update the display to show "00:00"
  document.title = 'Timer';  // Reset the page title
}

// Preset buttons
presetButtons.forEach(button => {
  button.addEventListener('click', () => {
    clearInterval(timerInterval); 
    totalTime = parseInt(button.getAttribute('data-time'));
    updateTimerDisplay();         
    startCountdown();            
  });
});

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Regular Timer
let regularTimerInterval;
let regularTime = 0;

const startRegularTimerButton = document.getElementById('startRegularTimerButton');
const stopRegularTimerButton = document.getElementById('stopRegularTimerButton');

function updateRegularTimerDisplay() {
  const minutes = Math.floor(regularTime / 60);
  const seconds = regularTime % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  timerDisplay.textContent = formattedTime;
  document.title = `Timer: ${formattedTime}`;
}

function startRegularTimer() {
  clearInterval(regularTimerInterval); // clear any running intervals
  regularTimerInterval = setInterval(() => {
    regularTime++;
    updateRegularTimerDisplay();
  }, 1000);
}

function stopRegularTimer() {
  clearInterval(regularTimerInterval);
}

startRegularTimerButton.addEventListener('click', startRegularTimer);
stopRegularTimerButton.addEventListener('click', stopRegularTimer);
