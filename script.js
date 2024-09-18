let timerInterval;
let totalTime = 0;


const endSound = new Audio('https://raw.githubusercontent.com/cmaroupas/soundfile/main/Tick-DeepFrozenApps-397275646.mp3');

const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const presetButtons = document.querySelectorAll('.preset');


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
  clearInterval(timerInterval);
  totalTime = 0;
  updateTimerDisplay();
  document.title = 'Timer'; 
}


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
