# Automated Testing

## HTML Validator

## CSS Validator 

## JS Validator

## Jest Testing

- A lot of difficulties with Jest testing because I am using the Web Audio API through tone.js

- Solution is to mock the Tone object, this is becoming difficult without explicit types
    - typescript would help here

# Manual Testing

The following is a list of extensive manual tests functionality and accessibility on both Desktop, Tablet and Mobile
## Desktop Tests

### Functionality Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Start button | Start button should initialize the audio context and show the drum machine aswell as hiding itself | Clicking the Start Button |  |  |
| 2. Pads - Play | When the mode is set to “Play” when the user clicks on a pad it should play the correct sound file, it also sets the pad as the currently selected pad |  |  |  |
| 3. Pads - Edit | When the mode is set to Edit, and the user clicks a pad, thew corresponding step should be toggled for the set sequence. The is played in the sequence when the user clicks play |  |  |  |
| 4. Pads - Select | When the mode is set to select, and the user clicks a pad, the pad should be set as the selected pad so the user can make edits to it or its steps but the sound should not play |  |  |  |
| 5. Edit Button | This should set the mode to “Edit” and the step indicators should be shown on each pad, clicking it again brings the user back to “Play” mode |  |  |  |
| 6. Select Button | This should set the mode to “select”, clicking it again should bring the user back to “Play” mode |  |  |  |
| 7. Play/Pause Button | The should start the sequence playback on click with correct bpm and play step that is in the selected pad sequences. if the sequence is playing is should pause |  |  |  |
| 8. Clear Button | clear the entire sequence if there is one |  |  |  |
| 9. Mute Button | This should mute on pads on click. You should not be able to hear them while the sequence is playing |  |  |  |
| 10. Pad Volume Select | This sets the individual volume for the currently selected pad |  |  |  |
| 11. Pad Sequence Select | This allows the user to set and set either A or B sequence for each pad. allowing more complex compositions and live sequence switching for each pad |  |  |  |
| 12. Pad Mute select | This mutes the currently selected pad during sequence playback  |  |  |  |
| 13. Pad Solo Select | This solos the currently selected pad during sequence playback |  |  |  |
| 14. Bpm Slider | This slider allows users to change the bpm that the sequence will be played in |  |  |  |
| 15. Volume/Mix Slider | This slider changes the intensity and volume of the applied effects |  |  |  |
| 16. Filter Slider | This slider changes the frequency of a lowpass filter on the sound output |  |  |  |
| 17. Distortion Slider | This slider applies a percentage of distortion to the sound output |  |  |  |
| 18. Keys Binding - Pads | Keybinding applied to first for keys in keyboard (1…4,q…r,a…f,z…x) should act the same way as clicking each of the pads in the 4x4 grid (refer to tests 2-4) |  |  |  |
| 19. Key Binding - Buttons | each button should have a corresponding keybinding to trigger the same function
- “/” key bound to edit button (test 5)
- “p” key bound to select button (test 6)
- space-bar bound to play button and pause button (test 7)
- backspace/delete bound to clear sequence button (test 6)
- “m” key bound to Mute button (test 9) |  |  |  |
| 20. Key Binding -
Pad Mute/Solo | - “i” key bound to pad solo button (test 13) for the currently selected pad  
- “n” key bound to the pad mute button (test 12) for the currently selected pads |  |  |  |
| 21. Muti Keypress | The user should be able to press multiple keys at once and all the corresponding sound keys should play |  |  |  |
| 22. Settings Modal - Gear Icon | Should open the Modal overlay with the correct layout depending on the device |  |  |  |
| 22. Selected Pad info | when a pad is selected the pad specific button and selects should reflect the state of that pad |  |  |  |
| 23. Correct Steps For Each Pad | When the user enters edit mode, the correct steps should be shown as active based on the pad state |  |  |  |

### Accessibility and Layout Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Hover on Pads | The pads should darken to show the user when they are hovering over a pad |  |  |  |
| 2. Hover on Buttons | The buttons should darken to show the user when they are hovering over a buttons |  |  |  |
| 3. Mode Displayed | The correct mode should be displayed to the user |  |  |  |
| 4. Visual Button Press Feedback | When the user clicks key that corresponds to a button or pad it should highlight of give visual feedback on press down  |  |  |  |
| 5. Visual Keypress Feedback | When the user clicks key that corresponds to a button or pad it should highlight of give visual feedback on click down  |  |  |  |
| 6. Visual Pad Selects Feedback | When is select mode the individual pads steps should give feedback as to weather the step is on or off (glows blue when on) |  |  |  |
| 7. Setting Modal Appear and Disappear | The modal should fade in and out when clicking the gear icon and the “x” icon in the modal respectively |  |  |  |
| 8. Keybinding prompts on pads | User should be shown prompts on each pad as to the corresponding keybinding |  |  |  |
| 9. Settings Modal - Visual Pad Selects Feedback  | The user should receive visual feedback when changing the Pad Effects, including:
- pad volume
- pad sequence (A/B)
- pad solo
- pad mute |  |  |  |

## Tablet Tests

Pretty much identical to the Desktop Tests when the tablet is in landscape mode, when in portrait the tests reflect what can be found in the Mobile Test section. Although usually the user would only rely on touch, the keybinding tests were kept in the use case that the user connects a keyboard to the tablet. A test for multi touch pad clicks was also added (Functionality test 22).

### Functionality Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Start button | Start button should initialize the audio context and show the drum machine aswell as hiding itself | Clicking the Start Button |  |  |
| 2. Pads - Play | When the mode is set to “Play” when the user clicks on a pad it should play the correct sound file, it also sets the pad as the currently selected pad |  |  |  |
| 3. Pads - Edit | When the mode is set to Edit, and the user clicks a pad, thew corresponding step should be toggled for the set sequence. The is played in the sequence when the user clicks play |  |  |  |
| 4. Pads - Select | When the mode is set to select, and the user clicks a pad, the pad should be set as the selected pad so the user can make edits to it or its steps but the sound should not play |  |  |  |
| 5. Edit Button | This should set the mode to “Edit” and the step indicators should be shown on each pad, clicking it again brings the user back to “Play” mode |  |  |  |
| 6. Select Button | This should set the mode to “select”, clicking it again should bring the user back to “Play” mode |  |  |  |
| 7. Play/Pause Button | The should start the sequence playback on click with correct bpm and play step that is in the selected pad sequences. if the sequence is playing is should pause |  |  |  |
| 8. Clear Button | clear the entire sequence if there is one |  |  |  |
| 9. Mute Button | This should mute on pads on click. You should not be able to hear them while the sequence is playing |  |  |  |
| 10. Pad Volume Select | This sets the individual volume for the currently selected pad |  |  |  |
| 11. Pad Sequence Select | This allows the user to set and set either A or B sequence for each pad. allowing more complex compositions and live sequence switching for each pad |  |  |  |
| 12. Pad Mute select | This mutes the currently selected pad during sequence playback  |  |  |  |
| 13. Pad Solo Select | This solos the currently selected pad during sequence playback |  |  |  |
| 14. Bpm Slider | This slider allows users to change the bpm that the sequence will be played in |  |  |  |
| 15. Volume/Mix Slider | This slider changes the intensity and volume of the applied effects |  |  |  |
| 16. Filter Slider | This slider changes the frequency of a lowpass filter on the sound output |  |  |  |
| 17. Distortion Slider | This slider applies a percentage of distortion to the sound output |  |  |  |
| 18. Keys Binding - Pads | Keybinding applied to first for keys in keyboard (1…4,q…r,a…f,z…x) should act the same way as clicking each of the pads in the 4x4 grid (refer to tests 2-4) |  |  |  |
| 19. Key Binding - Buttons | each button should have a corresponding keybinding to trigger the same function
- “/” key bound to edit button (test 5)
- “p” key bound to select button (test 6)
- space-bar bound to play button and pause button (test 7)
- backspace/delete bound to clear sequence button (test 6)
- “m” key bound to Mute button (test 9) |  |  |  |
| 20. Key Binding -
Pad Mute/Solo | - “i” key bound to pad solo button (test 13) for the currently selected pad  
- “n” key bound to the pad mute button (test 12) for the currently selected pads |  |  |  |
| 21. Muti Keypress | The user should be able to press multiple keys at once and all the corresponding sound keys should play |  |  |  |
| 22. Muti Pad Touch | The user should be able to click multiple pads at once and all the corresponding sound keys should play |  |  |  |
| 23. Settings Modal - Gear Icon | Should open the Modal overlay with the correct layout depending on the device |  |  |  |
| 24. Selected Pad info | when a pad is selected the pad specific button and selects should reflect the state of that pad |  |  |  |
| 25. Correct Steps For Each Pad | When the user enters edit mode, the correct steps should be shown as active based on the pad state |  |  |  |

### Accessibility and Layout Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Hover on Pads | The pads should darken to show the user when they are hovering over a pad |  |  |  |
| 2. Hover on Buttons | The buttons should darken to show the user when they are hovering over a buttons |  |  |  |
| 3. Mode Displayed | The correct mode should be displayed to the user |  |  |  |
| 4. Visual Button Press Feedback | When the user clicks key that corresponds to a button or pad it should highlight of give visual feedback on press down  |  |  |  |
| 5. Visual Keypress Feedback | When the user clicks key that corresponds to a button or pad it should highlight of give visual feedback on click down  |  |  |  |
| 6. Visual Pad Selects Feedback | When is select mode the individual pads steps should give feedback as to weather the step is on or off (glows blue when on) |  |  |  |
| 7. Setting Modal Appear and Disappear | The modal should fade in and out when clicking the gear icon and the “x” icon in the modal respectively |  |  |  |
| 8. Keybinding prompts on pads | When in landscape mode the user should be shown prompts on each pad as to the corresponding keybinding |  |  |  |
| 9. Settings Modal - Visual Pad Selects Feedback  | The user should receive visual feedback when changing the Pad Effects, including:
- pad volume
- pad sequence (A/B)
- pad solo
- pad mute |  |  |  |

## Mobile Tests

The biggest differences in the mobile tests lie in the placement of the Pad Effects Section, which is now placed in the settings modal. Also a removal of the keybinding test as there are not many users who will connect their phone to a keyboard and the keybinding prompts are note visible on portrait mode, however the functionality still exists in the code and will still work.

### Functionality Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Start button | Start button should initialize the audio context and show the drum machine aswell as hiding itself | Clicking the Start Button |  |  |
| 2. Pads - Play | When the mode is set to “Play” when the user clicks on a pad it should play the correct sound file, it also sets the pad as the currently selected pad |  |  |  |
| 3. Pads - Edit | When the mode is set to Edit, and the user clicks a pad, thew corresponding step should be toggled for the set sequence. The is played in the sequence when the user clicks play |  |  |  |
| 4. Pads - Select | When the mode is set to select, and the user clicks a pad, the pad should be set as the selected pad so the user can make edits to it or its steps but the sound should not play |  |  |  |
| 5. Edit Button | This should set the mode to “Edit” and the step indicators should be shown on each pad, clicking it again brings the user back to “Play” mode |  |  |  |
| 6. Select Button | This should set the mode to “select”, clicking it again should bring the user back to “Play” mode |  |  |  |
| 7. Play/Pause Button | The should start the sequence playback on click with correct bpm and play step that is in the selected pad sequences. if the sequence is playing is should pause |  |  |  |
| 8. Clear Button | clear the entire sequence if there is one |  |  |  |
| 9. Mute Button | This should mute on pads on click. You should not be able to hear them while the sequence is playing |  |  |  |
| 10. Bpm Slider | This slider allows users to change the bpm that the sequence will be played in |  |  |  |
| 11. Volume/Mix Slider | This slider changes the intensity and volume of the applied effects |  |  |  |
| 12. Filter Slider | This slider changes the frequency of a lowpass filter on the sound output |  |  |  |
| 13. Distortion Slider | This slider applies a percentage of distortion to the sound output |  |  |  |
| 14. Correct Steps For Each Pad | When the user enters edit mode, the correct steps should be shown as active based on the pad state |  |  |  |
| 15. Settings Modal - Gear Icon | Should open the Modal overlay with the correct layout depending on the device |  |  |  |
| 16. Setting Modal  - Pad Volume Select | This sets the individual volume for the currently selected pad |  |  |  |
| 17. Setting Modal - Pad Sequence Select | This allows the user to set and set either A or B sequence for each pad. allowing more complex compositions and live sequence switching for each pad |  |  |  |
| 18. Setting Modal - Pad Mute select | This mutes the currently selected pad during sequence playback  |  |  |  |
| 19. Setting Modal - Pad Solo Select | This solos the currently selected pad during sequence playback |  |  |  |
| 20. Selected Pad info | when a pad is selected the pad specific button and selects should reflect the state of that pad |  |  |  |
| 21. Multi Pad Touch | The user should be able to click multiple pads at once and all the corresponding sound keys should play |  |  |  |

### Accessibility and Layout Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Mode Displayed | The correct mode should be displayed to the user |  |  |  |
| 2. Visual Pad Touch Feedback | When the user clicks key that corresponds to a pad it should highlight of give visual feedback on press down  |  |  |  |
| 3. Visual Button Touch Feedback | When the user clicks key that corresponds to a button it should highlight of give visual feedback on press down  |  |  |  |
| 4. Setting Modal Appear and Disappear | The modal should fade in and out when clicking the gear icon and the “x” icon in the modal respectively |  |  |  |
| 5. Settings Modal - Visual Pad Selects Feedback  | The user should receive visual feedback when changing the Pad Effects, including:
- pad volume
- pad sequence (A/B)
- pad solo
- pad mute |  |  |  |