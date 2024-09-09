// Load sound files
const kick = new Tone.Player("assets/sounds/kick.wav").toDestination();
const snare = new Tone.Player("assets/sounds/snare.wav").toDestination();
const hat = new Tone.Player("assets/sounds/hat.wav").toDestination();
const crash = new Tone.Player("assets/sounds/crash.wav").toDestination();

const fxLaugh = new Tone.Player("assets/sounds/fx-laugh.wav").toDestination();
const fxListen = new Tone.Player("assets/sounds/fx-listen.wav").toDestination();
const fxTape = new Tone.Player("assets/sounds/fx-tape.wav").toDestination();
const fxWoodblock = new Tone.Player(
  "assets/sounds/fx-woodblock.wav"
).toDestination();

//create synths
const synth1 = new Tone.Synth().toDestination();
const synth2 = new Tone.Synth().toDestination();
const synth3 = new Tone.Synth().toDestination();
const synth4 = new Tone.Synth().toDestination();

let synth1key = "C4";
let synth2key = "D4";
let synth3key = "E4";
let synth4key = "F4";

// create bass synths
const bass1 = new Tone.Synth().toDestination();
const bass2 = new Tone.Synth().toDestination();
const bass3 = new Tone.Synth().toDestination();
const bass4 = new Tone.Synth().toDestination();

let bass1key = "C2";
let bass2key = "D2";
let bass3key = "E2";
let bass4key = "F2";

// Track steps configuration for tracks 1-16
const steps = {
  1: Array(16).fill(false),
  2: Array(16).fill(false),
  3: Array(16).fill(false),
  4: Array(16).fill(false),
  5: Array(16).fill(false),
  6: Array(16).fill(false),
  7: Array(16).fill(false),
  8: Array(16).fill(false),
  9: Array(16).fill(false),
  10: Array(16).fill(false),
  11: Array(16).fill(false),
  12: Array(16).fill(false),
  13: Array(16).fill(false),
  14: Array(16).fill(false),
  15: Array(16).fill(false),
  16: Array(16).fill(false),
};

// Create Sequence
const seq = new Tone.Sequence(
  (time, col) => {
    for (let i = 1; i <= 16; i++) {
      if (steps[i][col]) {
        //check if is a synth pad
        if ([1, 2, 3, 4, 5, 6, 7, 8].includes(i)) {
          padsData[i - 1].sound.triggerAttackRelease(padsData[i - 1].key, "8n");
        } else {
          padsData[i - 1].sound.start(time);
        }
      }
    }
  },
  [...Array(16).keys()],
  "16n"
);

// Set initial tempo
Tone.Transport.bpm.value = 82;

const currentPadText = document.getElementById("current-pad-text");
const currentModeText = document.getElementById("current-mode-text");
const startBtn = document.getElementById("start-btn");
const startText = document.getElementById("start-text");
const mainContentContainer = document.getElementById("main-content-container");
const playBtn = document.getElementById("pad-play");
const editBtn = document.getElementById("pad-edit");
const undoBtn = document.getElementById("pad-undo");
const clearBtn = document.getElementById("pad-clear");
const activeStepIndicators = document.querySelectorAll(
  ".step-active-indicator"
);

let isEditing = false;
let isPlaying = false;
let currentSelectedPad = undefined;

// TODO: make an array of pad objects to store all the pad's data

const padsData = [
  {
    id: 1,
    name: "Synth 1",
    sound: synth1,
    key: "C4",
  },
  {
    id: 2,
    name: "Synth 2",
    sound: synth2,
    key: "D4",
  },
  {
    id: 3,
    name: "Synth 3",
    sound: synth3,
    key: "E4",
  },
  {
    id: 4,
    name: "Synth 4",
    sound: synth4,
    key: "F4",
  },
  {
    id: 5,
    name: "Bass 1",
    sound: bass1,
    key: "C2",
  },
  {
    id: 6,
    name: "Bass 2",
    sound: bass2,
    key: "D2",
  },
  {
    id: 7,
    name: "Bass 3",
    sound: bass3,
    key: "E2",
  },
  {
    id: 8,
    name: "Bass 4",
    sound: bass4,
    key: "F2",
  },
  {
    id: 9,
    name: "FX 1",
    sound: fxLaugh,
    key: "C4",
  },
  {
    id: 10,
    name: "FX 2",
    sound: fxListen,
    key: "D4",
  },
  {
    id: 11,
    name: "FX 3",
    sound: fxTape,
    key: "E4",
  },
  {
    id: 12,
    name: "FX 4",
    sound: fxWoodblock,
    key: "F4",
  },
  {
    id: 13,
    name: "Drums | Kick",
    sound: kick,
    key: "C2",
  },
  {
    id: 14,
    name: "Drums | Snare",
    sound: snare,
    key: "D2",
  },
  {
    id: 15,
    name: "Drums | Hat",
    sound: hat,
    key: "E2",
  },
  {
    id: 16,
    name: "Drums | Crash",
    sound: crash,
    key: "F2",
  },
];

const padKeyMap = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  q: 5,
  w: 6,
  e: 7,
  r: 8,
  a: 9,
  s: 10,
  d: 11,
  f: 12,
  z: 13,
  x: 14,
  c: 15,
  v: 16,
  "/": "edit",
  " ": "play",
  p: "clear",
  P: "clear",
};

const padNameMap = {
  1: "Synth 1",
  2: "Synth 2",
  3: "Synth 3",
  4: "Synth 4",
  5: "Bass 1",
  6: "Bass 2",
  7: "Bass 3",
  8: "Bass 4",
  9: "FX 1",
  10: "FX 2",
  11: "FX 3",
  12: "FX 4",
  13: "Drums | Kick",
  14: "Drums | Snare",
  15: "Drums | Hat",
  16: "Drums | Crash",
};

// Start audio context
startBtn.addEventListener("click", async () => {
  await Tone.start();
  console.log("Audio context started");
  mainContentContainer.classList.remove("hidden");
  mainContentContainer.style.display = "grid";
  startBtn.classList.add("hidden");
  startText.classList.add("hidden");
});

// update slider values
function updateValue(slider) {
  if (slider.id === "tempo-slider") {
    document.getElementById("slider-value-tempo").textContent = slider.value;
    Tone.Transport.bpm.value = slider.value;
  }
  if (slider.id === "vol-slider")
    document.getElementById("slider-value-vol").textContent = slider.value;
  if (slider.id === "rev-slider")
    document.getElementById("slider-value-rev").textContent = slider.value;
  if (slider.id === "dist-slider")
    document.getElementById("slider-value-dist").textContent = slider.value;
}

// set current pad text
const setCurrentPadText = (pad) => {
  currentPadText.textContent = padNameMap[pad];
};

// play pad sound
const playPadSound = (pad) => {
  console.log("ended");
  const padElement = document.getElementById(`pad-${pad}`);
  padElement.classList.add("active");
  switch (pad) {
    case 1:
      synth1.triggerAttackRelease(synth1key, "8n");
      break;
    case 2:
      synth2.triggerAttackRelease(synth2key, "8n");
      break;
    case 3:
      synth3.triggerAttackRelease(synth3key, "8n");
      break;
    case 4:
      synth4.triggerAttackRelease(synth4key, "8n");
      break;
    case 5:
      bass1.triggerAttackRelease(bass1key, "8n");
      break;
    case 6:
      bass2.triggerAttackRelease(bass2key, "8n");
      break;
    case 7:
      bass3.triggerAttackRelease(bass3key, "8n");
      break;
    case 8:
      bass4.triggerAttackRelease(bass4key, "8n");
      break;
    case 9:
      fxLaugh.start();
      break;
    case 10:
      fxListen.start();
      break;
    case 11:
      fxTape.start();
      break;
    case 12:
      fxWoodblock.start();
      break;
    case 13:
      kick.start();
      break;
    case 14:
      snare.start();
      break;
    case 15:
      hat.start();
      break;
    case 16:
      crash.start();
      break;
    default:
      break;
  }
};

// btn touch up event listener
const btnTouchEnd = (pad) => {
  console.log("started");
  const padElement = document.getElementById(`pad-${pad}`);
  padElement.classList.remove("active");
};

const togglePlaySequence = () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    Tone.Transport.start();
    seq.start(0);
  } else {
    Tone.Transport.stop();
    seq.stop();
  }

  const PlayButtonText = document.querySelector("#pad-play p");
  PlayButtonText.textContent = isPlaying ? "Pause" : "Play";
};

// toggle step
const toggleStep = (track, step) => {
  steps[track][step] = !steps[track][step];
  const stepIndicator = document.querySelector(
    `#pad-${step} .step-active-indicator`
  );
  stepIndicator.classList.toggle("active");
};

// toggle edit mode text
const toggleEditMode = () => {
  isEditing = !isEditing;
  currentModeText.textContent = isEditing ? "Edit" : "Play";

  // remove .active class from all step indicators
  const stepIndicators = document.querySelectorAll(".step-active-indicator");
  stepIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });
    // set .active for step indicators of current selected pad that are aactive in the sequence
    steps[currentSelectedPad].forEach((step, index) => {
      if (step) {
        console.log(step);
        const stepIndicator = document.querySelector(
          `#pad-${index} .step-active-indicator`
        );
        stepIndicator.classList.add("active");
      }
    });



  // togle hidden class on active step indicators
  activeStepIndicators.forEach((indicator) => {
    indicator.classList.toggle("hidden");
  });
};

// clear all steps
const clearSteps = () => {
  for (let i = 1; i <= 16; i++) {
    steps[i] = Array(16).fill(false);
    const stepIndicators = document.querySelectorAll(
      `#pad-${i} .step-active-indicator`
    );
    stepIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });
  }
};

// keyboard event listener
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const padKey = padKeyMap[key];
  if (padKey !== undefined) {
    const pad = document.getElementById(`pad-${padKey}`);
    // pad.classList.add("active");
    // toggle edit mode if / key is pressed
    if (padKey === "edit") {
      toggleEditMode();
    } else if (padKey === "play") {
      togglePlaySequence();
    } else if (padKey === "clear") {
      clearSteps();
    } else {
      // is a sound pad key
      if (isEditing) {
        toggleStep(currentSelectedPad, padKey);
      } else {
        // set current pad text
        setCurrentPadText(padKey);

        // play pad sound
        playPadSound(padKey);
      }
    }

    // set current selected pad
    if (!isEditing && !["edit","play","clear"].includes(padKey)) currentSelectedPad = padKey;
  }
});

// keyup listener
document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  const padKey = padKeyMap[key];
  if (padKey !== undefined) {
    const pad = document.getElementById(`pad-${padKey}`);
    pad.classList.remove("active");
  }
});

// play button plays sequence
playBtn.addEventListener("click", () => {
  togglePlaySequence();
});

//edit button toggles editing mode
editBtn.addEventListener("click", () => {
  toggleEditMode();
});

//clear button clears all steps
clearBtn.addEventListener("click", () => {
  clearSteps();
});

//disbale dobule tap zoom
document.addEventListener(
  "dblclick",
  function (e) {
    e.preventDefault();
  },
  false
);
