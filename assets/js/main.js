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

// create effects
let currVolume = 0;
let currDistortion = 0;
let currReverb = 0;
let currFrequency = 5000;

// volume control
const volume = new Tone.Volume({
  volume: currVolume,
}).toDestination();

// distortion effect
const distortion = new Tone.Distortion({
  distortion: 0, // Start with 50% distortion
  oversample: "2x",
});

// reverb effect
const reverb = new Tone.Reverb({
  decay: 5,
  preDelay: 0.01,
  wet: 0.5,
});

//low-pass filter
const filter = new Tone.Filter({
  frequency: currFrequency,
  type: "lowpass",
  rolloff: -24,
});

// Track steps configuration for tracks 1-16
const steps = {
  0: Array(16).fill(false),
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
};

const resetAllPadColors = () => {
  for (let i = 0; i < 16; i++) {
    const currPadText = document.getElementById(`pad-${i + 1}`);
    currPadText.style.color = "white";
  }
};

// Create Sequence
const seq = new Tone.Sequence(
  (time, col) => {
    // duration of 1 step = 60/bpm/4
    // set the text color of pad to blue for the length of the step
    resetAllPadColors();
    const currPadText = document.getElementById(`pad-${col + 1}`);
    const secondaryColor = getComputedStyle(document.body).getPropertyValue(
      "--secondary-color"
    );
    currPadText.style.color = secondaryColor;

    for (let i = 0; i < 16; i++) {
      if (steps[i][col]) {
        //check if pad is not muted
        if (!padsData[i].muted) {
          //check if is a synth pad
          if ([0, 1, 2, 3, 4, 5, 6, 7].includes(i)) {
            1;
            padsData[i].sound.triggerAttackRelease(padsData[i].key, "8n");
          } else {
            padsData[i].sound.start(time);
          }
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
const settingsBtn = document.getElementById("settings-btn");
const closeSettingsModalBtn = document.getElementById(
  "close-settings-modal-btn"
);
const restAudioBtn = document.getElementById("reset-audio-btn");
const settingsModalContainer = document.getElementById(
  "settings-modal-container"
);
const padEffectInnerSelects = document.querySelectorAll(
  ".pad-effect-inner-select"
);
const padSoloBtn = document.getElementById("pad-solo-btn");
const padMuteBtn = document.getElementById("pad-mute-btn");
const activeStepIndicators = document.querySelectorAll(
  ".step-active-indicator"
);

let isEditing = false;
let isPlaying = false;
let currentSelectedPad = undefined;

const padsData = [
  {
    id: 1,
    name: "Synth 1",
    sound: synth1,
    key: "C4",
    volume: 0,
    muted: false,
  },
  {
    id: 2,
    name: "Synth 2",
    sound: synth2,
    key: "D4",
    volume: 0,
    muted: false,
  },
  {
    id: 3,
    name: "Synth 3",
    sound: synth3,
    key: "E4",
    volume: 0,
    muted: false,
  },
  {
    id: 4,
    name: "Synth 4",
    sound: synth4,
    key: "F4",
    volume: 0,
    muted: false,
  },
  {
    id: 5,
    name: "Bass 1",
    sound: bass1,
    key: "C2",
    volume: 0,
    muted: false,
  },
  {
    id: 6,
    name: "Bass 2",
    sound: bass2,
    key: "D2",
    volume: 0,
    muted: false,
  },
  {
    id: 7,
    name: "Bass 3",
    sound: bass3,
    key: "E2",
    volume: 0,
    muted: false,
  },
  {
    id: 8,
    name: "Bass 4",
    sound: bass4,
    key: "F2",
    volume: 0,
    muted: false,
  },
  {
    id: 9,
    name: "FX 1",
    sound: fxLaugh,
    key: "C4",
    volume: 0,
    muted: false,
  },
  {
    id: 10,
    name: "FX 2",
    sound: fxListen,
    key: "D4",
    volume: 0,
    muted: false,
  },
  {
    id: 11,
    name: "FX 3",
    sound: fxTape,
    key: "E4",
    volume: 0,
    muted: false,
  },
  {
    id: 12,
    name: "FX 4",
    sound: fxWoodblock,
    key: "F4",
    volume: 0,
    muted: false,
  },
  {
    id: 13,
    name: "Drums | Kick",
    sound: kick,
    key: "C2",
    volume: 0,
    muted: false,
  },
  {
    id: 14,
    name: "Drums | Snare",
    sound: snare,
    key: "D2",
    volume: 0,
    muted: false,
  },
  {
    id: 15,
    name: "Drums | Hat",
    sound: hat,
    key: "E2",
    volume: 0,
    muted: false,
  },
  {
    id: 16,
    name: "Drums | Crash",
    sound: crash,
    key: "F2",
    volume: 0,
    muted: false,
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
  i: "pad-solo",
  I: "pad-solo",
  n: "pad-mute",
  N: "pad-mute",
};

//chain effects to every sounds sounrce
Object.entries(padsData).forEach(([key, value]) => {
  value.sound.chain(filter, distortion, volume);
});

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
  if (slider.id === "vol-slider") {
    document.getElementById("slider-value-vol").textContent = slider.value;
    currVolume = (slider.value / 100) * (12 - -12) - 12;
    volume.volume.value = currVolume;
  }
  if (slider.id === "filter-slider") {
    document.getElementById("slider-value-filter").textContent = slider.value;
    currFrequency = slider.value;
    filter.frequency.value = currFrequency;
  }
  if (slider.id === "dist-slider") {
    document.getElementById("slider-value-dist").textContent = slider.value;
    currDistortion = slider.value;
    distortion.distortion = currDistortion;
  }
}

// set current pad text
const setCurrentPadText = (pad) => {
  // get name from padsData array
  currentPadText.textContent = padsData[pad - 1].name;
};

//get maxAmount from volume
const getMaxAmountFromVolume = (volume) => {
  if (volume === 0) return 3;
  if (volume === -16) return 2;
  if (volume === -32) return 1;
  if (volume === -64) return 0;
  return 0;
};

// set up the pad effects container for current pad
const setPadEffects = (pad) => {
  let padVolume = padsData[pad - 1].volume;
  let maxPadVolume = getMaxAmountFromVolume(padVolume);
  padEffectInnerSelects.forEach((select) => {
    // set up the volume inner selects
    // check if select.id starts with pad-effect-inner-select-vol
    if (select.id.startsWith("pad-effect-inner-select-vol")) {
      let amount = select.id.charAt(select.id.length - 1);
      if (amount <= maxPadVolume) {
        select.classList.add("active");
      } else {
        select.classList.remove("active");
      }
    }
  });
};

// play pad sound
const playPadSound = (pad) => {
  console.log("ended");
  const padElement = document.getElementById(`pad-${pad}`);
  padElement.classList.add("active");
  setPadEffects(pad);
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

// btn touch down event listener
const btnTouchStart = (pad) => {
  console.log("ended");
  const padElement = document.getElementById(`pad-${pad}`);
  padElement.classList.add("active");
  playPadSound(pad);
  setCurrentPadText(pad);
};

// toggle play/stop sequence
const togglePlaySequence = () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    Tone.Transport.start();
    seq.start(0);
  } else {
    Tone.Transport.stop();
    seq.stop();
    resetAllPadColors();
  }

  const PlayButtonText = document.querySelector("#pad-play p");
  PlayButtonText.textContent = isPlaying ? "Pause" : "Play";
};

// toggle step
const toggleStep = (track, step) => {
  // subtract 1 from track and step to match array index
  steps[track - 1][step - 1] = !steps[track - 1][step - 1];
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
  console.log(currentSelectedPad);
  // set .active for step indicators of current selected pad that are aactive in the sequence
  steps[currentSelectedPad - 1].forEach((step, index) => {
    if (step) {
      console.log(step);
      const stepIndicator = document.querySelector(
        `#pad-${index + 1} .step-active-indicator`
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
  for (let i = 0; i < 16; i++) {
    steps[i] = Array(16).fill(false);
    const stepIndicators = document.querySelectorAll(
      `#pad-${i + 1} .step-active-indicator`
    );
    stepIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });
  }
};

// toggle pad mute
const togglePadMute = () => {
  // can only edit if there is a current selected pad
  if (currentSelectedPad === undefined) return;

  padsData[currentSelectedPad - 1].muted = !padsData[currentSelectedPad - 1].muted;

  // set pad mute btn p child text color to blue
  padMuteBtn.children[0].style.color = padsData[currentSelectedPad - 1].muted
    ? "var(--secondary-color)"
    : "white";
};

// edit pad volume
/**
 * @param {*} amount a value between 0 and 3
 * if 0 set currentPad volume to -64
 * if 1 set currentPad volume to -32
 * if 2 set currentPad volume to -16
 * if 3 set currentPad volume to 0
 */
const editPadVolume = (amount) => {
  switch (Number(amount)) {
    case 0:
      padsData[currentSelectedPad - 1].volume = -64;
      padsData[currentSelectedPad - 1].sound.volume.value = -64;
      break;
    case 1:
      padsData[currentSelectedPad - 1].volume = -32;
      padsData[currentSelectedPad - 1].sound.volume.value = -32;
      break;
    case 2:
      padsData[currentSelectedPad - 1].volume = -16;
      padsData[currentSelectedPad - 1].sound.volume.value = -16;
      break;
    case 3:
      padsData[currentSelectedPad - 1].volume = 0;
      padsData[currentSelectedPad - 1].sound.volume.value = 0;
      break;
    default:
      break;
  }
};

// keyboard event listener
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const padKey = padKeyMap[key];
  if (padKey !== undefined) {
    const pad = document.getElementById(`pad-${padKey}`);
    // toggle edit mode if '/' key is pressed
    // toggle play sequence if 'Space' key is pressed
    // clear steps if 'P' key is pressed
    // toggle pad mute  if 'N' key is pressed
    if (padKey === "edit") {
      toggleEditMode();
    } else if (padKey === "play") {
      togglePlaySequence();
    } else if (padKey === "clear") {
      clearSteps();
    }else if(padKey === "pad-mute"){
      togglePadMute();
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
    if (!isEditing && !["edit", "play", "clear"].includes(padKey))
      currentSelectedPad = padKey;
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

// settings button opens settings modal
settingsBtn.addEventListener("click", () => {
  settingsModalContainer.style.display = "flex";
});

// close settings modal
closeSettingsModalBtn.addEventListener("click", () => {
  settingsModalContainer.style.display = "none";
});

// reset audio button
restAudioBtn.addEventListener("click", () => {
  Tone.getContext()._context.resume();
});

// add event listener to pad effect inner selects
padEffectInnerSelects.forEach((select) => {
  select.addEventListener("click", (event) => {
    // can only edit if there is a current selected pad
    if (currentSelectedPad === undefined) return;

    // check if select.id starts with pad-effect-inner-select-vol or  pad-effect-inner-select-seq
    if (select.id.startsWith("pad-effect-inner-select-vol")) {
      let amount = select.id.charAt(select.id.length - 1);
      // set current effect inner select to active if not already active
      if (select.classList.contains("active")) {
        for (let i = 3; i > amount; i--) {
          let innerSelect = document.querySelector(
            `#pad-effect-inner-select-vol-${i}`
          );
          if (innerSelect.classList.contains("active")) {
            innerSelect.classList.remove("active");
          }
        }
      } else {
        for (let i = 0; i < amount; i++) {
          let innerSelect = document.querySelector(
            `#pad-effect-inner-select-vol-${i}`
          );
          if (!innerSelect.classList.contains("active")) {
            innerSelect.classList.add("active");
          }
        }
        select.classList.add("active");
      }
      editPadVolume(amount);
    } else if (select.id.startsWith("pad-effect-inner-select-seq")) {
    }
  });
});

// add event listener to pad solo button
padSoloBtn.addEventListener("click", () => {
  
});

// add event listener to pad mute button
padMuteBtn.addEventListener("click", () => {
  togglePadMute();
});

//disbale dobule tap zoom
document.addEventListener(
  "dblclick",
  function (e) {
    e.preventDefault();
  },
  false
);
