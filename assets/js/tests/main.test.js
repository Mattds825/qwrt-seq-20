// const Tone = require('tone');
// import * as Tone from 'tone';

global.Tone = {
    Player: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn(), chain: jest.fn() };
      }),
      Synth: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn(), chain: jest.fn() };
      }),
      Volume: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn(), chain: jest.fn() };
      }),
      Distortion: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn(), chain: jest.fn() };
      }),
      Reverb: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn(), chain: jest.fn() };
      }),
      Filter: jest.fn().mockImplementation(() => {
        return { toDestination: jest.fn(), chain: jest.fn() };
      }),
      Sequence: jest.fn().mockImplementation(() => {
        return { start: jest.fn(), chain: jest.fn() };
      }),
      Transport: {
        start: jest.fn(),
        bpm: {
          value: 82,
        },
      },
      start: jest.fn().mockResolvedValue(),
};

const main = require("../main");

describe("startBtn functionality", () => {
  test("startBtn should start the audio context", async () => {
    const startBtn = document.getElementById("start-btn");
    const startText = document.getElementById("start-text");
    const mainContentContainer = document.getElementById(
      "main-content-container"
    );

    // Mock Tone.start() to resolve immediately
    // jest.spyOn(Tone, 'start').mockResolvedValue();

    // Simulate click event
    startBtn.click();

    // Check if the main content container is visible
    expect(mainContentContainer.style.display).toBe("block");

    // check if the start button classList contains hidden
    expect(startBtn.classList.contains("hidden")).toBe(true);

    // check if the start text classList contains hidden
    expect(startText.classList.contains("hidden")).toBe(true);
  });
});

describe("Initialization of variables in main.js", () => {
  // test('kick should be an instance of Tone.Player', () => {
  //     console.log("testing kick",typeof(kick));
  //     // expect(kick).toBeInstanceOf(Tone.Player);
  //     expect(typeof(kick)).toBe('object');
  // });
  // test('snare should be an instance of Tone.Player', () => {
  //     expect(snare).toBeInstanceOf(Tone.Player);
  // });
  // test('hat should be an instance of Tone.Player', () => {
  //     expect(hat).toBeInstanceOf(Tone.Player);
  // });
  // test('crash should be an instance of Tone.Player', () => {
  //     expect(crash).toBeInstanceOf(Tone.Player);
});

// beforeEach(()=>{
//     let fs = require("fs"); // Load the File System to execute our tests part of NodeJS
//     let fileContents = fs.readFileSync("index.html", "utf-8"); // Load the contents of the file

//     document.open(); // Open a new document
//     document.write(fileContents); // Write the contents of the file
//     document.close(); // Close the document

// });

// beforeAll(() => {
//     // Load sound files
//     kick = new Tone.Player("assets/sounds/kick.wav").toDestination();
//     snare = new Tone.Player("assets/sounds/snare.wav").toDestination();
//     hat = new Tone.Player("assets/sounds/hat.wav").toDestination();
//     crash = new Tone.Player("assets/sounds/crash.wav").toDestination();

//     fxLaugh = new Tone.Player("assets/sounds/fx-laugh.wav").toDestination();
//     fxListen = new Tone.Player("assets/sounds/fx-listen.wav").toDestination();
//     fxTape = new Tone.Player("assets/sounds/fx-tape.wav").toDestination();
//     fxWoodblock = new Tone.Player("assets/sounds/fx-woodblock.wav").toDestination();

//     // Create synths
//     synth1 = new Tone.Synth().toDestination();
//     synth2 = new Tone.Synth().toDestination();
//     synth3 = new Tone.Synth().toDestination();
//     synth4 = new Tone.Synth().toDestination();

//     // Create bass synths
//     bass1 = new Tone.Synth().toDestination();
//     bass2 = new Tone.Synth().toDestination();
//     bass3 = new Tone.Synth().toDestination();
//     bass4 = new Tone.Synth().toDestination();

//     // Volume control
//     volume = new Tone.Volume({ volume: 0 }).toDestination();

//     // Distortion effect
//     distortion = new Tone.Distortion({ distortion: 0, oversample: "2x" });

//     // Reverb effect
//     reverb = new Tone.Reverb({ decay: 5, preDelay: 0.01, wet: 0.5 });

//     // Low-pass filter
//     filter = new Tone.Filter({ frequency: 5000, type: "lowpass", rolloff: -24 });
// });
