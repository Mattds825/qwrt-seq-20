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

function updateValue(slider) {
    if (slider.id === 'vol-slider') document.getElementById('slider-value-vol').textContent = slider.value;
    if(slider.id === 'rev-slider') document.getElementById('slider-value-rev').textContent = slider.value;
    if(slider.id === 'dist-slider') document.getElementById('slider-value-dist').textContent = slider.value;
}

// keyboard event listener
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const padKey = padKeyMap[key];
    if (padKey !== undefined) {
        const pad = document.getElementById(`pad-${padKey}`);
        pad.classList.add('active');
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