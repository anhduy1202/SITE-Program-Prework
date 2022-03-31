//Elements
const btnDropDown = document.querySelector("#buttonDropdown");
const button5 = document.querySelector("#button5");
const button6 = document.querySelector("#button6");
const score = document.querySelector("#score");
const health = document.querySelector("#health");
let healthVal = parseInt(health.innerHTML);
// global constants
let clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const patternLength = 8;
//Dark, Light mode icon
const moonUrl = "https://cdn.glitch.global/5bb82403-6478-454d-bd14-6a3c56165377/half-moon.png?v=1648489513527";
const sunUrl = "https://cdn.glitch.global/5bb82403-6478-454d-bd14-6a3c56165377/cloudy-day.png?1648490057717";
var mistakes = 0;
var timer = null; //For timer
var timeLeft = 15;
var randomNum;
var pattern = generateRandom();


//Select number of buttons
function chooseButton() {
  switch(btnDropDown.value) {
    case "4":
      button5.classList.add("hide");
      button6.classList.add("hide");
      break;
    case "5":
      console.log("hi");
      button5.classList.remove("hide");
      button6.classList.add("hide");
      break;
    case "6":
      if(button5.classList.contains("hide")) {
         button5.classList.remove("hide");
      }
      button6.classList.remove("hide");
      break;
  }
}


//Use a random secret pattern
function generateRandom() {
  let patternArr = [];
  for (let i = 0; i < patternLength; i++) {
    switch(btnDropDown.value) {
      case "4":
         randomNum = Math.floor(Math.random() * 4) + 1;
        break;
      case "5":
         randomNum = Math.floor(Math.random() * 5) + 1;
        break;
      case "6":
         randomNum = Math.floor(Math.random() * 6) + 1;
        break;
    }
    
    patternArr.push(randomNum);
  }
  return patternArr;
}

//Global Variables
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;
var guessCounter = 0;

function startGame() {
  //Mistakes
  mistakes = 0;
  //initialize game variables
  progress = 0;
  //Random pattern when user start a new game
  pattern = generateRandom();
  gamePlaying = true;
  clueHoldTime = 1000;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}


function stopGame() {
  clearInterval(timer);
  document.querySelector("#clock").innerHTML = "15";
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 500,
  6: 556
};

function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;

  setTimeout(function () {
    stopTone();
  }, len);
}

function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  context.resume();
  clueHoldTime -= 100; //Speed it up
  timeLeft = 15;

  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  clearInterval(timer);
  timer = setInterval(handleTimer,1000);
  
}

function handleTimer() {
    document.getElementById("clock").innerHTML = timeLeft--;
    if (timeLeft < 0) {
      stopGame();
      loseGame();
      timeLeft = 15;
      clearInterval(timer);
    }
}

function loseGame() {
  stopGame();
  score.innerHTML = "0";
  alert("Game Over. You lost.");
  health.innerHTML = 3;
}

function winGame() {
  stopGame();
  alert(`You won!, your score is: ${progress+1}`);
  score.innterHTML = 0;
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    //Guess was correct!
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        //GAME OVER: WIN!
        winGame();
      } else {
        //Pattern correct. Add next segment
        progress++;
        score.innerHTML = String(progress);
        playClueSequence();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  } else {
    //Three strikes
    //GAME OVER: LOSE!
    if (mistakes === 2) {
      loseGame();
    } else {
      mistakes++;
      health.innerHTML = healthVal - mistakes;
      playClueSequence();
    }
  }
}

function toggleDarkMode() {
  let mode = document.querySelector(".container");
  let icon = document.querySelector("#dark-icon");
  console.log(icon.src);
  if (mode.classList.contains("dark")) {
    mode.classList.remove("dark");
    icon.src= moonUrl;
  }else {
    mode.classList.add("dark");
    icon.src = sunUrl;
  }
}
// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
