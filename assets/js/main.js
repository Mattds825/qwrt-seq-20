const currentPadText = document.getElementById("current-pad-text");

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
    13: "Drums 1",
    14: "Drums 2",
    15: "Drums 3",
    16: "Drums 4",
  };

function updateValue(slider) {
    if (slider.id === 'vol-slider') document.getElementById('slider-value-vol').textContent = slider.value;
    if(slider.id === 'rev-slider') document.getElementById('slider-value-rev').textContent = slider.value;
    if(slider.id === 'dist-slider') document.getElementById('slider-value-dist').textContent = slider.value;
}

const setCurrentPadText = (pad) => {
    currentPadText.textContent = padNameMap[pad];
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