// Load sound files
const kick = new Tone.Player("assets/sounds/kick.wav").toDestination();
const snare = new Tone.Player("assets/sounds/snare.wav").toDestination();
const hat = new Tone.Player("assets/sounds/hat.wav").toDestination();
const crash = new Tone.Player("assets/sounds/crash.wav").toDestination();

const currentPadText = document.getElementById("current-pad-text");
const startBtn = document.getElementById("start-btn");
const mainContentContainer = document.getElementById("main-content-container");

const padKeyMap = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    "q": 5,
    "w": 6,
    "e": 7,
    "r": 8,
    "a": 9,
    "s": 10,
    "d": 11,
    "f": 12,
    "z": 13,
    "x": 14,
    "c": 15,
    "v": 16,
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
    startBtn.classList.add("hidden");
  });

function updateValue(slider) {
    if (slider.id === 'vol-slider') document.getElementById('slider-value-vol').textContent = slider.value;
    if(slider.id === 'rev-slider') document.getElementById('slider-value-rev').textContent = slider.value;
    if(slider.id === 'dist-slider') document.getElementById('slider-value-dist').textContent = slider.value;
}

// set current pad text
const setCurrentPadText = (pad) => {
    currentPadText.textContent = padNameMap[pad];
}

// play pad sound
const playPadSound = (pad) => {
    switch (pad) {
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
}

// keyboard event listener
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const padKey = padKeyMap[key];
    if (padKey !== undefined) {
        const pad = document.getElementById(`pad-${padKey}`);
        pad.classList.add('active');

        // set current pad text
        setCurrentPadText(padKey);

        // play pad sound
        playPadSound(padKey);
    }
});

// keyup listener
document.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    const padKey = padKeyMap[key];
    if (padKey !== undefined) {
        const pad = document.getElementById(`pad-${padKey}`);
        pad.classList.remove('active');
    }
});