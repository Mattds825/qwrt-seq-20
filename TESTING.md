# Automated Testing

## HTML Validator

The ![W3 HTML Validator](https://validator.w3.org/nu/) was used to validate the html

The only errors present are relating to the duplicate id's of the elemnts in the pad effects setion
as this section, however these can be ignorred as they are always onlt in one place at a time becuase of the 
css code and the media queries. this is because on landscape devides the pad effects section is shown in the main drum machine,
while ion portraait devices it is hidden inside a setting modal

the full these can be seen [here](/documentation/tests/html-test.pdf)

## CSS Validator 

[The W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/#validate_by_input) was used to validate the html code in the [style.css](/assets/css/style.css) file

![css validator result](/documentation/tests/css-validator-test.png)

## JS Validator

the [ESLint online playground](https://eslint-online-playground.netlify.app/) was used to validate the JS code to the ESlint standard

**The code passes with no warnings or error.**

The .eslintrc.json file used with eslint config contains the following:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true 
  },
  "extends": [
    "eslint:recommended"
  ],
  "globals": {
    "Tone": "readonly",
    "Toastify": "readonly"    
  },
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "off",
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

To replicate and ensure that the tests pass you must past the main.js code in the [ESLint online playground](https://eslint-online-playground.netlify.app/)
and you must make sure the configuration file type is set to .eslintrc.json and you must paste the code above into the config file

## Jest Testing

- A lot of difficulties with Jest testing because I am using the Web Audio API through tone.js

- Solution is to mock the Tone object, this is becoming difficult without explicit types
    - typescript would help here

Attempts were made to use jest for testing but due to difficulties I was not able to get this working.
There is extensive manual testing below

# Manual Testing

The following is a list of extensive manual tests functionality and accessibility on both Desktop, Tablet and Mobile

## Desktop Tests

Tested on a Macbook on Chrome and Safari and multiple window sizes on an external and the built in monitor

### Functionality Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Start button | Start button should initialize the audio context and show the drum machine aswell as hiding itself | Clicking the Start Button | ![image of pad sound groups](/documentation/features/pad-sounds-breakdown.png)  | Pass |
| 2. Pads - Play | When the mode is set to “Play” when the user clicks on a pad it should play the correct sound file, it also sets the pad as the currently selected pad | Click each pad with the mouse cursor. make sure all sounds are heard and that they appropriately give user feedback interaction | There is a hover and a click interaction. Both are present correctly | Pass |
| 3. Pads - Edit | When the mode is set to Edit, and the user clicks a pad, thew corresponding step should be toggled for the set sequence. The is played in the sequence when the user clicks play | a.  click each pad in edit mode and make sure that the highlight is showing and when playing those steps are heard. b. switching pad sequence from A to B and back should reflect the correct data (this is related to test 11) | This test needs tests 5,  7 and 11 to be working to check the full effects. When a pad is not selected a error message should be shown, refer to accessibility test 12 | a. Pass b. Pass |
| 4. Pads - Select | When the mode is set to select, and the user clicks a pad, the pad should be set as the selected pad so the user can make edits to it or its steps but the sound should not play | a. toggle select mode on and off by clicking the select pad. b. when select mode is on click any pad. Sound should not play | Depends on test 6. This works in live play so you can have the sequence playing and select a pad, make changes to its steps. And all this live and uninterrupted | a. Pass. b. Pass |
| 5. Edit Button | This should set the mode to “Edit” and the step indicators should be shown on each pad, clicking it again brings the user back to “Play” mode | - a. toggle edit mode on and off when clicking the edit button. - b. pads should show correct step indicators |  | a. Pass. b. Pass |
| 6. Select Button | This should set the mode to “select”, clicking it again should bring the user back to “Play” mode | should toggle select mode on and off |  | Pass |
| 7. Play/Pause Button | The should start the sequence playback on click with correct bpm and play step that is in the selected pad sequences. if the sequence is playing is should pause | should play all the correct steps in the pad sequence selected for each pad (test 11) |  | Pass |
| 8. Clear Button | Should show a confirm dialog and if user proceeds, clear the all the steps in all the sequences created | a. click the clear button to see the confirm dialog. b. click the confirm button should clear all the steps. this should be reflected in the step indicator and when playing the sequence |  | a. Pass. b.Pass |
| 9. Mute Button | This should mute all pads on click. You should not be able to hear them while the sequence is playing | create a sequence and press the play button then the mute button | Not the pads should still be audible in play mode when the sequence in not playing | Pass |
| 10. Pad Volume Select | This sets the individual volume for the currently selected pad. The 4 options should reflect 0%, 33%, 66%, 100%, total volume | select a pad and click the 4 volume options. | When a pad is not selected a error message should be shown, refer to accessibility test 12 | Pass |
| 11. Pad Sequence Select | This allows the user to set and set either A or B sequence for each pad. allowing more complex compositions and live sequence switching for each pad | select a pad and enter edit mode, make some changes and then click the seq B button to see the new sequence, toggle steps in that sequence and toggle between both to see the difference  | -Needs to be in edit mode to actually the difference and make changes. -This work seamlessly while playing the sequences allowing for nuanced performances. -When a pad is not selected a error message should be shown, refer to accessibility test 12 | Pass |
| 12. Pad Mute select | This mutes the currently selected pad during sequence playback  | select a pad. make sure it has step filled out and that atleast one other pad has steps. click the play button the play the sequence and then click the mute button, only that pad sound should be muted and the pattern should keep playing | -This work seamlessly while playing the sequences allowing for nuanced performances. -When a pad is not selected a error message should be shown, refer to accessibility test 12 | Pass |
| 13. Pad Solo Select | This solos the currently selected pad during sequence playback | select a pad. make sure it has step filled out and that atleast one other pad has steps. click the play button the play the sequence and then click the mute button, only that pad sound heard now and the pattern should keep playing | -This work seamlessly while playing the sequences allowing for nuanced performances. -When a pad is not selected a error message should be shown, refer to accessibility test 12 | Pass |
| 14. Bpm Slider | This slider allows users to change the bpm that the sequence will be played in. The max should be 240 and min 60  | a. make sure at least on pad has a sequence of steps filled out and click the play button. using the slider should change the bpm and be shown both in sound and in the bpm value in the slider . b. set slider to left most and right most value, should not be able so set slider to lower than 50 or higher that 240  |  | a. Pass. b. Pass |
| 15. Volume/Mix Slider | -This slider changes the intensity and volume of the applied effects. -min is 0 and max is 100 | a.make sure at least on pad has a sequence of steps filled observe output sound intensity change when sliding the volume slider. b. try to set the volume more than 100 or less than 0  | To appreciate the full output change the other effects must also be played around with to see how the volume intensity effects them  | a. Pass. b. Pass |
| 16. Filter Slider | -This slider changes the frequency of a lowpass filter on the sound output. -min is 100 and max is 10000 | a.make sure at least on pad has a sequence of steps filled observe output sound filter frequency change when sliding the filter slider. b. try to set the volume more than 10000 or less than 100  |  | a. Pass. b. Pass (Technically is fails what is said in 16.b but is the correct outcome) |
| 17. Distortion Slider | -This slider applies a percentage of bitcrushing distortion to the sound output. -min is 0 and max is 1 | a.make sure at least on pad has a sequence of steps filled observe output sound distortion amount change when sliding the filter slider. b. try to set the volume more than 1 or less than 0 |  | a.Pass. b.Pass (Technically is fails what is said in 17.b but is the correct outcome) |
| 18. Keys Binding - Pads | Keybinding applied to first for keys in keyboard (1…4,q…r,a…f,z…x) should act the same way as clicking each of the pads in the 4x4 grid (refer to tests 2-4) | this test is a repeat of tests 2,3,4. the difference is the trigger is the key pressed and not the cursor click. it contains all subtests those have  |  | Pass |
| 19. Key Binding - Buttons | each button should have a corresponding keybinding to trigger the same function - “/” key bound to edit button (test 5) - “p” key bound to select button (test 6) - space-bar bound to play button and pause button (test 7) - backspace/delete bound to clear sequence button (test 6) - “m” key bound to Mute button (test 9) | This is a repeat of tests 5,6,7,8,9 the only difference is the button trigger instead of a cursor click |  | Pass |
| 20. Key Binding - Pad Mute/Solo | - “i” key bound to pad solo button (test 13) for the currently selected pad  - “n” key bound to the pad mute button (test 12) for the currently selected pads | this is a repeat of tests 13 and 12 and all that they require and entail but using the mapped button instead of a cursor click |  | Pass |
| 21. Muti Sound Pad Keypress | The user should be able to press multiple keys at once and all the corresponding sound keys should play | Set the drum machine to play mode and within the keys bound to the sound pads try to play more than one simultaneously  | This also works in edit mode. select mode will find the last key pressed to the millisecond | Pass |
| 22. Settings Modal - Gear Icon | Should open the Modal overlay with the correct layout depending on the device | Click the gear icon |  | Pass |
| 22. Selected Pad info | when a pad is selected the pad specific button and selects should reflect the state of that pad | observe the pad effect section buttons and selects to reflect either the default or the user set values for that pad when changing a pad in select mode or playing a pad in play mode |  | Pass |

### Accessibility and Layout Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Hover on Pads | The pads should darken to show the user when they are hovering over a pad | Hover over each sound pad with the mouse cursor |  | Pass |
| 2. Hover on Buttons | The buttons should darken to show the user when they are hovering over a buttons | Hover over each button pad with the mouse cursor |  | Pass |
| 3. Mode Displayed | The correct mode should be displayed to the user | Toggle between Edit, Play and Select mode and observe the Mode text  |  | Pass |
| 4. Visual Button Press Feedback | When the user clicks key that corresponds to a button or pad it should highlight of give visual feedback on press down  | click each sound pad and button pad and observe a visual feedback |  | Pass |
| 5. Visual Keypress Feedback | When the user clicks key that corresponds to a button or pad it should highlight of give visual feedback on click down  | press the keys associated with each sound pad and button pad and observe a visual feedback |  | Pass |
| 6. Visual Pad Steps Feedback | When in edit mode the individual pads steps should give feedback as to weather the step is on or off (glows blue when on) | toggle edit mode and observe that the steps are shown when toggling them on and off  |  | Pass |
| 7. Setting Modal Appear and Disappear | The modal should fade in and out when clicking the gear icon and the “x” icon in the modal respectively | Click the gear icon to show the settings modal and click the “x” icon to close it |  | Pass |
| 8. Keybinding prompts on pads | User should be shown prompts on each pad as to the corresponding keybinding | Observe the keybinding prompts being shown on all the correct button and sound pads when in landscape mode | related to Functionality tests 18 and 19 | Pass |
| 9. Settings Modal - Visual buttons Feedback  | The user should receive visual feedback when hovering or clicking any button in the settings modal | Open the settings modal and hover over the different buttons and observe the visual feedback |  | Pass |
| 10. Setting Modal - Correct Manual  | Inside the settings modal there is a manual button which should open in a new tab and be the correct manual based on the screen orientation | Open the settings modal and click the manual button. Navigate to the new tab and ensure it is the manual made for desktop use |  | Pass |
| 11. Settings Modal - correct content show based on device size | The settings modal should show the manual button, the reset sound button and copyright information but not show the pad settings if the user opens it on a desktop | Open the settings modal and observe the buttons and elements |  | Pass |
| 12. Error Dialog | show an error toast message when a button that requires a pad to be selected is click but no pad is selected .This happens for the edit button and and of the pad effects button are selects | click the edit button when there is no current pad selected, and observe the error toast. the same with the pad effects buttons and selects |  | Pass |
| 13. Confirm Input to clear all steps | Show a confirm message to the user before deleting all the steps when clicking the clear button. the user should be able to click “ok” or “cancel” | create a pattern of sequences and click the cleat button. Observe correct action when clicking “ok” and “cancel”  | Related to test 8 in the Functionality tests | Pass |
| 14. Correct grid layout observed | When in landscape mode the drum machine grid layout is correctly set | observe the drum machine on any screen that has a landscape orientation  | ![](/documentation/layout/landscape-layout.png) | Pass |

## Tablet Tests

Identical to the Desktop Tests when the tablet is in landscape mode, when in portrait the tests reflect what can be found in the Mobile Test section. Although usually the user would only rely on touch, the keybinding tests were kept in the use case that the user connects a keyboard to the tablet. To avoid copy and pasting both tables, all the tests in Desktop and Mobile Tests section where tested on an Ipad and have been shown to Pass

## Mobile Tests

Tested on a Iphone device 

The biggest differences in the mobile tests lie in the placement of the Pad Effects Section, which is now placed in the settings modal. Also a removal of the keybinding test as there are not many users who will connect their phone to a keyboard and the keybinding prompts are note visible on portrait mode, however the functionality still exists in the code and will still works.

### Functionality Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Start button | Start button should initialize the audio context and show the drum machine aswell as hiding itself | Clicking the Start Button |  | Pass |
| 2. Pads - Play | When the mode is set to “Play” when the user clicks on a pad it should play the correct sound file, it also sets the pad as the currently selected pad | tap each pad and make sure all sounds are heard and that they appropriately give user feedback interaction | ![image of pad sound groups](/documentation/features/pad-sounds-breakdown.png)  | Pass |
| 3. Pads - Edit | When the mode is set to Edit, and the user clicks a pad, the corresponding step should be toggled for the set sequence. The step is played as part of sequence when the user clicks play | a.  tap each pad in edit mode and make sure that the highlight is showing and when playing those steps are heard. b. switching pad sequence from A to B and back should reflect the correct data (this is related to test 17) | This test needs tests 5,  7 and 17 to be working to check the full effects .When a pad is not selected a error message should be shown, refer to accessibility test 7 | a.Pass b.Pass |
| 4. Pads - Select | When the mode is set to select, and the user clicks a pad, the pad should be set as the selected pad so the user can make edits to it or its steps but the sound should not play | a. toggle select mode on and off by clicking the select button
b. when select mode is on tap any pad. Sound should not play and the tapped pad should be set as current pad | Depends on test 6. This works in live play so you can have the sequence playing and select a pad, make changes to its steps. And all this live and uninterrupted | a.Pass b.Pass |
| 5. Edit Button | This should set the mode to “Edit” and the step indicators should be shown on each pad, clicking it again brings the user back to “Play” mode | a. toggle edit mode on and off when tapping the edit button. b. pads should show correct step indicators |  | a.Pass b.Pass |
| 6. Select Button | This should set the mode to “select”, clicking it again should bring the user back to “Play” mode | tap the select button |  | Pass |
| 7. Play/Pause Button | The should start the sequence playback on click with correct bpm and play step that is in the selected pad sequences. if the sequence is playing is should pause | tap the play button. |  | Pass |
| 8. Clear Button | clear the entire sequence if there is one | a. tap the clear button to see the confirm dialog. b. tap the confirm button should clear all the steps. this should be reflected in the step indicators and when playing the sequence |  | a. Pass b. Pass |
| 9. Mute Button | This should mute on pads on click. You should not be able to hear them while the sequence is playing | create a sequence and press the play button then the mute button | Note,  the pads should still be audible in play mode when the sequence in not playing | Pass |
| 10. Bpm Slider | This slider allows users to change the bpm that the sequence will be played in. The max should be 240 and min 60  | a. make sure at least on pad has a sequence of steps filled out and click the play button. using the slider should change the bpm and be shown both in sound and in the bpm value in the slider 
b. set slider to left most and right most value, should not be able so set slider to lower than 50 or higher that 240  |  | a. Pass
b. Pass |
| 11. Volume/Mix Slider | -This slider changes the intensity and volume of the applied effects. -min is 0 and max is 100 | a.make sure at least on pad has a sequence of steps filled observe output sound intensity change when sliding the volume slider
b. try to set the volume more than 100 or less than 0  | To appreciate the full output change the other effects must also be played around with to see how the volume intensity effects them  | a. Pass. b. Pass |
| 12. Filter Slider | -This slider changes the frequency of a lowpass filter on the sound output. -min is 100 and max is 10000 | a.make sure at least on pad has a sequence of steps filled observe output sound filter frequency change when sliding the filter slider. b. try to set the volume more than 10000 or less than 100  |  | a. Pass. b. Pass  |
| 13. Distortion Slider | -This slider applies a percentage of bitcrushing distortion to the sound output. -min is 0 and max is 1 | a.make sure at least on pad has a sequence of steps filled observe output sound distortion amount change when sliding the filter slider. b. try to set the volume more than 1 or less than 0 |  | a.Pass. b.Pass |
| 14. Each slider is usable on small | Make sure that each slider is still usable on small screen sizes and the user can set the value to the min and max and values in between | attempt setting a min and max and the middle value for every slider | On smaller devices this can become increasingly difficult in the current layout but it is not beyond the norm and logically will feel better on a larger mobile display | Pass |
| 15. Settings Modal - Gear Icon | Should open the Modal overlay with the correct layout depending on the device | tap the gear icon  |  | Pass |
| 16. Setting Modal  - Pad Volume Select | This sets the individual volume for the currently selected pad | select a pad and click the 4 volume options. | When a pad is not selected a error message should be shown, refer to accessibility test 7 | Pass |
| 17. Setting Modal - Pad Sequence Select | This allows the user to set and set either A or B sequence for each pad. allowing more complex compositions and live sequence switching for each pad | select a pad and enter edit mode, toggle some steps and then click the seq B button to see the new sequence, toggle steps in that sequence and toggle between both to see the difference  | -Needs to be in edit mode to actually the difference and make changes. -This work seamlessly while playing the sequences allowing for nuanced performances. -When a pad is not selected a error message should be shown, refer to accessibility test 7 | Pass |
| 18. Setting Modal - Pad Mute button | This mutes the currently selected pad during sequence playback  | select a pad. make sure it has step filled out and that atleast one other pad has steps. click the play button the play the sequence and then click the mute button, only that pad sound should be muted and the pattern should keep playing | -This work seamlessly while playing the sequences allowing for nuanced performances. -When a pad is not selected a error message should be shown, refer to accessibility test 7 | Pass |
| 19. Setting Modal - Pad Solo button | This solos the currently selected pad during sequence playback | select a pad. make sure it has step filled out and that atleast one other pad has steps. click the play button the play the sequence and then click the mute button, only that pad sound heard now and the pattern should keep playing | -This work seamlessly while playing the sequences allowing for nuanced performances. -When a pad is not selected a error message should be shown, refer to accessibility test 7 | Pass |
| 20. Selected Pad info | when a pad is selected the pad specific button and selects should reflect the state of that pad | set a current pad by tapping it in play or select mode, open the setting menu by tapping the setting icon and observe the pad effect section buttons and selects to reflect either the default or the user set values for that pad when changing a pad in select mode or playing a pad in play mode |  | Pass |
| 21. Multi Pad Touch | The user should be able to click multiple pads at once and all the corresponding sound keys should play | tap two sound pads at the same time |  | Pass |

### Accessibility and Layout Tests

| Test name | Description | Testing method | Comments | Pass/Fail |
| --- | --- | --- | --- | --- |
| 1. Mode Displayed | The correct mode should be displayed to the user |  Toggle between Edit, Play and Select mode and observe the Mode text  | related to functionality tests 5,6 | Pass |
| 2. Visual Pad Touch Feedback | When the user clicks key that corresponds to a pad it should highlight of give visual feedback on press down  | tap any sound pad  |  | Pass |
| 3. Visual Button Touch Feedback | When the user clicks key that corresponds to a button it should highlight of give visual feedback on press down  | tap each of the buttons |  | Pass |
| 4. Setting Modal Appear and Disappear | The modal should fade in and out when clicking the gear icon and the “x” icon in the modal respectively | tap the gear icon |  | Pass |
| 5. Settings Modal - Visual Pad Selects Feedback  | The user should receive visual feedback when changing the Pad Effects, including: pad volume, pad sequence (A/B), pad solo, pad mute | tap the gear icon the view the pad effects section and tap each of the elements available for the user to control | related to functionality tests 16-19 | Pass |
| 6. Settings Modal - correct content show based on device size | The settings modal should show the manual button, the pad effects section, the reset sound button and copyright information but not show the pad settings if the user opens it on a desktop | Open the settings modal and observe the buttons and elements |  | Pass |
| 7. Error Dialog | show an error toast message when a button that requires a pad to be selected is click but no pad is selected .This happens for the edit button and and of the pad effects button are selects | tap the edit button when there is no current pad selected, and observe the error toast. the same with the pad effects buttons and selects |  | Pass |
| 8. Confirm Input to clear all steps | Show a confirm message to the user before deleting all the steps when clicking the clear button. the user should be able to click “ok” or “cancel” | create a pattern of sequences and click the clear button. Observe correct action when clicking “ok” and “cancel”  | Related to test 8 in the Functionality tests | Pass |
| 9. Correct grid layout observed | When in landscape mode the drum machine grid layout is correctly set | observe the drum machine on any screen that has a portrait orientation  | ![image of portrait mode layout](/documentation/layout/portrait-layout.png) | Pass |