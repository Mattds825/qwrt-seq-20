/*-------------------------- Variable Declarations */

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

const currentPadText = document.getElementById("current-pad-text");
const currentModeText = document.getElementById("current-mode-text");
const startBtn = document.getElementById("start-btn");
const startText = document.getElementById("start-text");
const mainContentContainer = document.getElementById("main-content-container");
const playBtn = document.getElementById("pad-play");
const editBtn = document.getElementById("pad-edit");
const padSelectModeBtn = document.getElementById("pad-select-mode");
const clearBtn = document.getElementById("pad-clear");
const muteAllBtn = document.getElementById("pad-mute-all");
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
let isSelecting = false;
let currentSelectedPad = undefined;
let allPadsMuted = false;
let soloData = {
  solo: false,
  soloPad: undefined,
};

/**
 * data for each of the pads
 * @property {id} number
 * @property {name} string
 * @property {sound} Tone.Player
 * @property {key} string
 * @property {volume} number values are -64, -32, -16, 0
 * @property {muted} boolean
 * @property {stepsA} Array
 * @property {stepsB} Array
 * @property {currSeq} string
 * @property {playPadSound} function that plays the pad sound
 * @property {playPadSoundInStep} function that plays the pad sound in a step
 */
const padsData = [
  {
    id: 1,
    name: "Synth 1",
    sound: synth1,
    key: "C4",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => synth1.triggerAttackRelease("C4", "8n"),
    playPadSoundInStep: (time) => synth1.triggerAttackRelease("C4", "8n"),
  },
  {
    id: 2,
    name: "Synth 2",
    sound: synth2,
    key: "D4",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => synth2.triggerAttackRelease("D4", "8n"),
    playPadSoundInStep: (time) => synth2.triggerAttackRelease("D4", "8n"),
  },
  {
    id: 3,
    name: "Synth 3",
    sound: synth3,
    key: "E4",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => synth3.triggerAttackRelease("E4", "8n"),
    playPadSoundInStep: (time) => synth3.triggerAttackRelease("E4", "8n"),
  },

  {
    id: 4,
    name: "Synth 4",
    sound: synth4,
    key: "F4",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => synth4.triggerAttackRelease("F4", "8n"),
    playPadSoundInStep: (time) => synth4.triggerAttackRelease("F4", "8n"),
  },
  {
    id: 5,
    name: "Bass 1",
    sound: bass1,
    key: "C2",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => bass1.triggerAttackRelease("C2", "8n"),
    playPadSoundInStep: (time) => bass1.triggerAttackRelease("C2", "8n"),
  },
  {
    id: 6,
    name: "Bass 2",
    sound: bass2,
    key: "D2",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => bass2.triggerAttackRelease("D2", "8n"),
    playPadSoundInStep: (time) => bass2.triggerAttackRelease("D2", "8n"),
  },
  {
    id: 7,
    name: "Bass 3",
    sound: bass3,
    key: "E2",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => bass3.triggerAttackRelease("E2", "8n"),
    playPadSoundInStep: (time) => bass3.triggerAttackRelease("E2", "8n"),
  },
  {
    id: 8,
    name: "Bass 4",
    sound: bass4,
    key: "F2",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => bass4.triggerAttackRelease("F2", "8n"),
    playPadSoundInStep: (time) => bass4.triggerAttackRelease("F2", "8n"),
  },
  {
    id: 9,
    name: "FX 1",
    sound: fxLaugh,
    key: "C4",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => fxLaugh.start(),
    playPadSoundInStep: (time) => fxLaugh.start(time),
  },
  {
    id: 10,
    name: "FX 2",
    sound: fxListen,
    key: "D4",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => fxListen.start(),
    playPadSoundInStep: (time) => fxListen.start(time),
  },
  {
    id: 11,
    name: "FX 3",
    sound: fxTape,
    key: "E4",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => fxTape.start(),
    playPadSoundInStep: (time) => fxTape.start(time),
  },
  {
    id: 12,
    name: "FX 4",
    sound: fxWoodblock,
    key: "F4",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => fxWoodblock.start(),
    playPadSoundInStep: (time) => fxWoodblock.start(time),
  },
  {
    id: 13,
    name: "Drums | Kick",
    sound: kick,
    key: "C2",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => kick.start(),
    playPadSoundInStep: (time) => kick.start(time),
  },
  {
    id: 14,
    name: "Drums | Snare",
    sound: snare,
    key: "D2",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => snare.start(),
    playPadSoundInStep: (time) => snare.start(time),
  },
  {
    id: 15,
    name: "Drums | Hat",
    sound: hat,
    key: "E2",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => hat.start(),
    playPadSoundInStep: (time) => hat.start(time),
  },
  {
    id: 16,
    name: "Drums | Crash",
    sound: crash,
    key: "F2",
    volume: 0,
    muted: false,
    stepsA: Array(16).fill(false),
    stepsB: Array(16).fill(false),
    currSeq: "A",
    playPadSound: () => crash.start(),
    playPadSoundInStep: (time) => crash.start(time),
  },
];

// keyboard key to pad key map
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
  p: "select",
  backspace: "clear",
  delete: "clear",
  i: "pad-solo",
  I: "pad-solo",
  n: "pad-mute",
  N: "pad-mute",
  m: "mute-all",
  M: "mute-all",
};

// Set initial tempo
Tone.Transport.bpm.value = 82;

//chain effects to every sounds source
Object.entries(padsData).forEach(([key, value]) => {
  value.sound.chain(filter, distortion, volume);
});

/*-------------------------- Functions */

// reset all pad text colors to white
const resetAllPadTextColors = () => {
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
    resetAllPadTextColors();
    const currPadText = document.getElementById(`pad-${col + 1}`);
    const secondaryColor = getComputedStyle(document.body).getPropertyValue(
      "--secondary-color"
    );
    currPadText.style.color = secondaryColor;

    for (let i = 0; i < 16; i++) {
      // use destructed object to get the padsData
      const { id, stepsA, stepsB, sound, currSeq, muted, playPadSoundInStep } =
        padsData[i];

      // create check conditions for playing sound in sequence
      const shouldPlayInSeqA =
        !allPadsMuted &&
        currSeq === "A" &&
        stepsA[col] &&
        !muted &&
        !soloData.solo;
      const shouldPlayInSeqASoloed =
        !allPadsMuted &&
        currSeq === "A" &&
        stepsA[col] &&
        !muted &&
        soloData.solo &&
        id === soloData.soloPad;
      const shouldPlayInSeqB =
        !allPadsMuted &&
        currSeq === "B" &&
        stepsB[col] &&
        !muted &&
        !soloData.solo;
      const shouldPlayInSeqBSoloed =
        !allPadsMuted &&
        currSeq === "B" &&
        stepsB[col] &&
        !muted &&
        soloData.solo &&
        id === soloData.soloPad;

      // play sound in step if conditions are met
      if (
        shouldPlayInSeqA ||
        shouldPlayInSeqASoloed ||
        shouldPlayInSeqB ||
        shouldPlayInSeqBSoloed
      ) {
        playPadSoundInStep(time);
      }
    }
  },
  [...Array(16).keys()],
  "16n"
);



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

// remove active class from all pad-effect-inner-select-seq
const clearPadSequenceInnerSelects = () => {
  document
    .querySelector("#pad-effect-inner-select-seq-A")
    .classList.remove("active");
  document
    .querySelector("#pad-effect-inner-select-seq-B")
    .classList.remove("active");
};

// set up the pad effects container for current pad
const setPadEffects = (pad) => {
  let padVolume = padsData[pad - 1].volume;
  let maxPadVolume = getMaxAmountFromVolume(padVolume);
  let currPadSelectedSeq = padsData[pad - 1].currSeq;
  clearPadSequenceInnerSelects();

  
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
    } else if (select.id.startsWith("pad-effect-inner-select-seq")) {
      let selectedSeq = select.id.charAt(select.id.length - 1);
      if (selectedSeq === currPadSelectedSeq) {
        select.classList.add("active");
      } else {
        if(select.classList.contains("active"))select.classList.remove("active");
      }
    }
  });
};

// toggle pad without sound
const togglePad = (pad) => {
  const padElement = document.getElementById(`pad-${pad}`);
  padElement.classList.add("active");
};

// play pad sound
const playPadSound = (pad) => {
  const padElement = document.getElementById(`pad-${pad}`);
  padElement.classList.add("active");
  setPadEffects(pad);
  padsData[pad - 1].playPadSound();
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
    resetAllPadTextColors();
  }

  const PlayButtonText = document.querySelector("#pad-play p");
  PlayButtonText.textContent = isPlaying ? "Pause" : "Play";
};

// toggle step
const toggleStep = (track, step) => {
  if (padsData[track - 1].currSeq === "A") {
    padsData[track - 1].stepsA[step - 1] =
      !padsData[track - 1].stepsA[step - 1];
  } else if (padsData[track - 1].currSeq === "B") {
    padsData[track - 1].stepsB[step - 1] =
      !padsData[track - 1].stepsB[step - 1];
  }

  const stepIndicator = document.querySelector(
    `#pad-${step} .step-active-indicator`
  );
  stepIndicator.classList.toggle("active");
};

//toggle pad select mode
const togglePadSelectMode = () => {
  // cannot select pad if in edit mode
  if (isEditing) return;

  isSelecting = !isSelecting;

  // set pad select mode btn p child text color to blue
  padSelectModeBtn.children[0].style.color = isSelecting
    ? "var(--secondary-color)"
    : "white";

  currentModeText.textContent = isSelecting ? "Select" : "Play";
};

// clear steps indictors on pads
const clearStepIndicators = () => {
  const stepIndicators = document.querySelectorAll(".step-active-indicator");
  stepIndicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });
};

// set .active for step indicators of current selected pad that are active in the sequence
const fillSteps = (steps) => {
  steps.forEach((step, index) => {
    if (step) {
      const stepIndicator = document.querySelector(
        `#pad-${index + 1} .step-active-indicator`
      );
      stepIndicator.classList.add("active");
    }
  });
};

// toggle edit mode text
const toggleEditMode = () => {
  // can only edit if there is a current selected pad
  if (currentSelectedPad === undefined) return;

  isEditing = !isEditing;
  currentModeText.textContent = isEditing ? "Edit" : "Play";

  // remove .active class from all step indicators
  clearStepIndicators();

  const { stepsA, stepsB, currSeq } = padsData[currentSelectedPad - 1];

  // fill active steps for corresponding sequence
  if (currSeq === "A") {
    fillSteps(stepsA);
  } else if (currSeq === "B") {
    fillSteps(stepsB);
  }
  activeStepIndicators.forEach((indicator) => {
    indicator.classList.toggle("hidden");
  });
};

// clear all steps
const clearAllSteps = () => {
  for (let i = 0; i < 16; i++) {
    padsData[i].stepsA = Array(16).fill(false);
    padsData[i].stepsB = Array(16).fill(false);
    const stepIndicators = document.querySelectorAll(
      `#pad-${i + 1} .step-active-indicator`
    );
    stepIndicators.forEach((indicator) => {
      indicator.classList.remove("active");
    });
  }
};

// toggle mute all pads
const toggleMuteAllPads = () => {
  // toggle allPadsMuted
  // use separate variable to preserve the individual pads muted state
  allPadsMuted = !allPadsMuted;

  // set pad mute btn p child text color to blue
  muteAllBtn.children[0].style.color = allPadsMuted
    ? "var(--secondary-color)"
    : "white";
};

// toggle pad solo
const togglePadSolo = () => {
  if (currentSelectedPad === undefined) return;

  soloData.solo = !soloData.solo;
  soloData.soloPad = soloData.solo ? currentSelectedPad : undefined;

  console.log(soloData.solo, soloData.soloPad);

  // set pad solo btn p child text color to blue
  padSoloBtn.children[0].style.color =
    soloData.soloPad !== undefined ? "var(--secondary-color)" : "white";
};

// toggle pad mute
const togglePadMute = () => {
  // can only edit if there is a current selected pad
  if (currentSelectedPad === undefined) return;

  padsData[currentSelectedPad - 1].muted =
    !padsData[currentSelectedPad - 1].muted;

  // set pad mute btn p child text color to blue
  padMuteBtn.children[0].style.color = padsData[currentSelectedPad - 1].muted
    ? "var(--secondary-color)"
    : "white";
};

const handlePadSequenceSelect = (select) => {
  let selectedSeq = select.id.charAt(select.id.length - 1);
  
  console.log("selecting sequence", selectedSeq);
  // clear all pad-effect-inner-select-seq active classes
  clearPadSequenceInnerSelects();

  // add active class to selected pad-effect-inner-select-seq
  document
    .querySelector(`#pad-effect-inner-select-seq-${selectedSeq}`)
    .classList.add("active");

  // set current selected sequence to selected sequence in padsData
  padsData[currentSelectedPad - 1].currSeq = selectedSeq;

  // clear then fill active steps for corresponding sequence
  clearStepIndicators();
  if (selectedSeq === "A") {
    fillSteps(padsData[currentSelectedPad - 1].stepsA);
    document.querySelector("#pad-effect-inner-select-seq-A").classList.add("active");
    document.querySelector("#pad-effect-inner-select-seq-B").classList.remove("active");
  } else if (selectedSeq === "B") {
    fillSteps(padsData[currentSelectedPad - 1].stepsB);
    document.querySelector("#pad-effect-inner-select-seq-A").classList.add("active");
    document.querySelector("#pad-effect-inner-select-seq-B").classList.remove("active");
  }

  setPadEffects(currentSelectedPad);
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


/**
 * Handles the selection of pad volume by toggling the active state of the inner select elements.
 *
 * @param {HTMLSelectElement} select - The select element that triggered the event.
 */
const handlePadVolumeSelect = (select) => {
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
  setPadEffects(currentSelectedPad);
};


/**
 * Handles the action when a pad is clicked based on the provided pad key.
 *
 * @param {string} padKey - The key representing the pad action. Possible values:
 *   - "edit": Toggles edit mode.
 *   - "select": Toggles pad select mode.
 *   - "play": Toggles play sequence.
 *   - "clear": Clears all steps.
 *   - "pad-mute": Toggles pad mute.
 *   - "pad-solo": Toggles pad solo.
 *   - "mute-all": Toggles mute for all pads.
 *   - Any other string: Represents a sound pad key.
 */
const handlePadClicked = (padKey) => {
  // TODO: use switch statement
  if (padKey !== undefined) {
    if (padKey === "edit") {
      toggleEditMode();
    } else if (padKey === "select") {
      togglePadSelectMode();
    } else if (padKey === "play") {
      togglePlaySequence();
    } else if (padKey === "clear") {
      clearAllSteps();
    } else if (padKey === "pad-mute") {
      togglePadMute();
    } else if (padKey === "pad-solo") {
      togglePadSolo();
    } else if (padKey === "mute-all") {
      toggleMuteAllPads();
    } else {
      // is a sound pad key
      if (isEditing) {
        toggleStep(currentSelectedPad, padKey);
      } else if (isSelecting) {
        // set current pad text
        setCurrentPadText(padKey);
        // toggle the pad without sound
        togglePad(padKey);
      } else {
        // play pad sound

        // set current pad text
        setCurrentPadText(padKey);
        // play pad sound
        playPadSound(padKey);
      }
    }
    // set current selected pad
    if (
      !isEditing &&
      !["edit", "play", "clear", "pad-mute", "pad-solo", "mute-all"].includes(
        padKey
      )
    )
      currentSelectedPad = padKey;
  }
};

/*-------------------Event Listeners and functions triggered from HTML */

// Start audio context
startBtn.addEventListener("click", async () => {
  await Tone.start();
  console.log("Audio context started");
  mainContentContainer.classList.remove("hidden");
  mainContentContainer.style.display = "grid";
  startBtn.classList.add("hidden");
  startText.classList.add("hidden");
});

// keyboard event listener
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const padKey = padKeyMap[key];
  handlePadClicked(padKey);
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

// btn touch up event listener
const btnTouchEnd = (pad) => {
  console.log("started");
  const padElement = document.getElementById(`pad-${pad}`);
  padElement.classList.remove("active");
};

// btn touch down event listener
const btnTouchStart = (pad) => {
  // TODO: check if editing or selecting
  handlePadClicked(pad);
};

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
  clearAllSteps();
});

// settings button opens settings modal
settingsBtn.addEventListener("click", () => {
  settingsModalContainer.style.display = "flex";
  setPadEffects(currentSelectedPad);
});

// close settings modal
closeSettingsModalBtn.addEventListener("click", () => {
  settingsModalContainer.style.display = "none";
});

// reset audio button
restAudioBtn.addEventListener("click", () => {
  Tone.getContext()._context.resume();
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

// add event listener to pad effect inner selects
padEffectInnerSelects.forEach((select) => {
  select.addEventListener("click", (event) => {
    // can only edit if there is a current selected pad
    if (currentSelectedPad === undefined) return;

    // check if select.id starts with pad-effect-inner-select-vol or  pad-effect-inner-select-seq
    if (select.id.startsWith("pad-effect-inner-select-vol")) {
      handlePadVolumeSelect(select);
    } else if (select.id.startsWith("pad-effect-inner-select-seq")) {
      handlePadSequenceSelect(select);
    }
  });
});

// add event listener to pad select mode button
padSelectModeBtn.addEventListener("click", () => {
  togglePadSelectMode();
});

// add event listener to pad solo button
padSoloBtn.addEventListener("click", () => {
  togglePadSolo();
});

// add event listener to pad mute button
padMuteBtn.addEventListener("click", () => {
  togglePadMute();
});

// add event listener to mute all button
muteAllBtn.addEventListener("click", () => {
  toggleMuteAllPads();
});

//disable double tap zoom
document.addEventListener(
  "dblclick",
  function (e) {
    e.preventDefault();
  },
  false
);
