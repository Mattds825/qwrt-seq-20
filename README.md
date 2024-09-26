# QWRT-SEQ-20

The Goal of this project is to bring an old-school philosophy of making drum machines as simple to get started and play as possible to web technology. Making something that is just one link away from creating something awesome.

16 pads, intuitive keybinding, of the box sounds and endless creative possibilities is the ultimate goal.

## History 

A lot can be said about physical drum machines, but nothing can be said without mentioning some huge names.

### The MPC Revolution 

### The Roland Underground

### The MIDI companions

### The Huge Market 

## Direct Inspirations 

In design and feel I had to go with what I know best and that is the 16 pad layout. Which I find both easy to use to sequence and intuitive to perform live.

My main hardware inspiration include the mpc2000, the sp404mk2 and many other 16 pad sampler

- add images here 


## User Stories

### Casual Live Playing 

This user opens the drum machine website with the intention of quickly jumping into playing some beats. They aren’t looking to tweak complex settings, create advanced loops, or spend time configuring custom kits. Instead, they want to instantly have access to playable drum sounds via the keyboard or mouse, and feel like they can just start making rhythms within seconds. Whether they have five minutes or an hour to spare, the drum machine should offer them a frictionless experience.

**User Requirements:**

- simple and quick to use
    - The interface should be clean and minimal, with no unnecessary clutter or overwhelming options. A clear, recognizable set of drum pads should be prominently displayed, making it immediately obvious how to play sounds.
    - No sign-up, registration, or complicated menus. The user should be able to start playing with as few clicks as possible. Ideally, they should be able to make their first sound within 2-3 seconds of loading the site.
- intuitive keybinding 
- out of the box sounds
    - basic drum sounds (kick, snare, hat, crash), sound effects, bass notes and synth keys
- clear visual feedback\
    - Every action the user takes should result in immediate and clear visual feedback. For example, when they press a key or click a pad, the corresponding drum pad should light up or animate in some way, making it obvious that the input has been registered.

**Key Goals:**

- Immediate playability within seconds of page load.
- Intuitive controls and interactions, especially through keyboard and/or mouse.
- Fun and relaxing experience, providing a frictionless creative outlet.

### Casual/Amateur Sequence Making


This user visits the drum machine website with the intention of not just tapping out beats, but also crafting a sequence that loops over time. They want to explore how different sounds fit together and enjoy making tweaks to their patterns using built-in effects. This user might still be relatively new to music production or simply want to explore different possibilities by creating sequences, experimenting with filters, volume, or adding distortion. They value a playful and exploratory environment where they can easily build, modify, and trigger sequences.

**User Requirements:**

- all the previous
    - Everything from the Casual Live Playing user story must still be available: a simple interface, intuitive keybinding, and high-quality out-of-the-box sounds.
    - The user should be able to seamlessly move from live playing into sequence making, with the same intuitive controls and sound options.
- sequence making
- sequence editing 
- bus effects
    - all pads go through the main effects and can be edited (volume, filter and distortion)
- pad specific effects
    - pads can be individually muted, soloed, change volume
    - This allows the user to create dynamic compositions where, for example, they might mute the kick for a few bars or solo the a pad to create a transition
- each pad has two sequences (A and B)
    - For a more dynamic performance, each drum pad should be capable of holding two sequences: A and B. These two sequences can be triggered independently, allowing the user to switch between different rhythms for each pad during a performance.
    - This feature is perfect for creating variation during live performances or when making longer compositions. For example, the user could create a simpler kick pattern for sequence A and a more complex variation for sequence B, switching between them as needed for transitions or builds in their song.
    - The user should be able to switch between the A and B sequences seamlessly during playback, ensuring smooth transitions for live performance or recording.

**Key Goals:**

- Provide tools for creating structured drum sequences in a user-friendly, visual interface.
- Allow intuitive editing and experimentation with sequences and effects.
- Empower users to add effects and perform with sequences, encouraging creativity while keeping the experience engaging and accessible.

### First Time Drum Machine User

A first-time user visits the drum machine site out of curiosity, perhaps having heard about drum machines or beat-making but without knowing exactly how they work. This user is excited to explore, but may also feel intimidated by the unfamiliar interface. They need an experience that is welcoming, easy to understand, and guides them through the process in a way that is engaging. The experience should gradually introduce them to the various aspects of drum machines—starting with the basics of playing sounds and advancing towards creating their first simple beat

**User Requirements:**

- simple and quick to use
    - The interface should be clean and minimal, with no unnecessary clutter or overwhelming options. A clear, recognizable set of drum pads should be prominently displayed, making it immediately obvious how to play sounds.
    - No sign-up, registration, or complicated menus. The user should be able to start playing with as few clicks as possible. Ideally, they should be able to make their first sound within 2-3 seconds of loading the site.
- intuitive keybinding 
- out of the box sounds
    - basic drum sounds (kick, snare, hat, crash), sound effects, bass notes and synth keys
- instructions
    - Clear, beginner-friendly instructions should be available, explaining the basics of how to use the drum machine. These instructions should be accessible but not intrusive—users should be able to skip them if they prefer to explore on their own.
- defensive design
    - The interface should be designed to prevent the user from making mistakes or getting lost in the app. For example, buttons should have clear labels, and there should be no risk of accidentally deleting progress or getting stuck in a complicated menu.
- clear visual feedback
    - Every action the user takes should result in immediate and clear visual feedback. For example, when they press a key or click a pad, the corresponding drum pad should light up or animate in some way, making it obvious that the input has been registered.

**Key Goals:**

Provide a gentle introduction to the world of drum machines, offering guidance without overwhelming the user.
Ensure a frictionless experience that allows users to explore and experiment while maintaining a sense of control.
Offer clear, immediate feedback to help users understand how their actions affect the sounds they are creating.

## Features

### Polyphonic play

### 16 Step Editing

### Effects 

### Individual Pad Editing 

- Volume
- Solo 
- Mute 

### 2 Sequences per sound 

Allows user to have sequence A and B for each pad, increasing the amount of sequence combinations for performances. 

### Responsive

## UI/UX

### Design Choices

The goal is to have the web app look sleek and modern but still have all the information you need in presented in a coherent.
The use should be also able to customize the background of the drum machine to their liking

### Color Pallet

### Mockups

The basic mockups where first made and then when the design was achieved the design language was followed and additional features where added

there are the initial mockups:

| Mobile   |      Landscape/Desktop      |
|----------|:-------------:|
| <img width="1604" alt="Mockup home screen desktop play mode" src="documentation/mockups/home-screen-mobile-play-basic.png"> |  <img width="1604" alt="Mockup home screen desktop play mode" src="documentation/mockups/home-screen-desktop-play-basic.png"> |
|  <img width="1604" alt="Mockup home screen mobile edit mode" src="documentation/mockups/home-screen-mobile-edit-basic.png">|   <img width="1604" alt="Mockup home screen desktop edit mode" src="documentation/mockups/home-screen-desktop-edit-basic.png">    |


### Accessibility

## Testing

See full testing in the [TESTING.md](./TESTING.md) file

## Credits 

### Technologies Used 

I tried to keep this as minimal as possible

- HTML/CSS/Javascript 
- vanilla JS (no framework)
- all css from scratch 
- Tone.js (third part library for audio processing)
- Sketch: Used to create mockups 


### Code and Resources Used

- [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript) Used for all javascript documentation needs

- [redketchup.io](https://redketchup.io/favicon-generator) used to generate favicon

 - this [solution](https://github.com/Tonejs/Tone.js/issues/767) was used to fix the audio not playing when source changed: 
