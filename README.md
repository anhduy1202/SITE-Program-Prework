# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Daniel Truong (Quoc Truong)

Time spent: **11** hours spent in total

Link to project: https://glitch.com/edit/#!/boundless-fuzzy-grade

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following 6 features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following 4 features are implemented:

- [x] Adding darkmode/lightmode for the game
- [x] Having a dropdown menu so user can select number of buttons  
- [x] Keeping track of user's score and reset it to 0 when user loses/done
- [x] Keeping track of user's health so they know how many chances they have left 

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
### Darkmode/Lightmode
![](https://im5.ezgif.com/tmp/ezgif-5-192c222fcb.gif)
### Lose Game
![](https://im5.ezgif.com/tmp/ezgif-5-b0c125c2e1.gif)
### Win Game
![](https://im5.ezgif.com/tmp/ezgif-5-5023d618ab.gif)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

I only used https://www.w3schools.com to review some JavaScript syntax

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

A challenge that I encountered during this pre-work is proably the timer feature since there're many edge cases that I need to handle during the proces of making it as well as the core functionality of this feature, some of it was:
* Deciding when to use clearInterval(), setInterval() : The main problem I was having with this is after every rounds, setInterval() seems to be stacked up along in the event loop such that it makes the timer goes faster after each rounds. I managed to research on w3School and found out that setInterval() will return an interval ID such that I can use that ID in order to use the clearInterval() accurately
* Handling every possible edge cases: During the proces of completing this feature, after each testing I run, there'll always be edge cases that made the timer become inaccurate, some of those edge cases are: timer should reset when user win/lose game, timer should NOT reset when user pause the game, timer should stop when it reaches 0, user should lose the game when timer reaches 0. I overcome this by carefully list out every edge cases that I initially can think of before debugging and after I finished with my list then I can started to test out other feature and if another edge cases of the timer appear, I'll handle it right away.
 

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

After completing my submission, I'm curious whether using OOP pattern for this project will make the file + folder architectures become any more cleaner or readable since at the moment every lines of code is in its own file. Therefore, I'm curious to explore about refactoring the code using multiple files for each "components" of the game. Personally, I'm a React enthusiast so I'd love to know Vanilla Javascript can share the similar pattern of reusing components as React did since I really enjoy thinking each features of the web as a separate component. Moreover, I'd love to know how to write testing for a HTML/CSS/JS project since for React, there're React-testing-library, Jest, Cypress,.. that supports testing each components so for a Vanilla JS website, I'd love to know whether web developer have testing for a large scale app before deploying it.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I'd spent more hours on working this project, I'd refactor the code following OOP principles where I'll have a class for each features such as: Timer, Sound, Square with its properties are the corresponding DOM elemetns and inside those class I'll create another JS files that support the functionality of that object and at the end the class files will be much more readable and easier to maintain.

Moreover, I'd add the high score feature that keeps track of user highest score, and i think it can be done by storing user highest winning scores in local storage such that when user win the second times, we'll compare that value with the current highest winning score in local storage and if the current high score is smaller than we'll keep the high score the same value as our local storage, and in case it's higher then we'll store that new highscore in local storage as well as updating the high score UI of our game.


## Interview Recording URL Link

[My 5-minute Interview Recording](https://youtu.be/G_LgD3RgXG8)


## License

    Copyright [Daniel Truong]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
