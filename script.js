const foundObject = { waldo: false, wenda: false, wizard: false };
let timerInterval = null;
let timeElapsed = 0;

document.addEventListener('DOMContentLoaded', function () {
  const img = document.getElementById('waldoImage');
  const customCursor = document.getElementById('customCursor');
  const coordsDisplay = document.getElementById('coords');
  const timerDisplay = document.getElementById('timer');
  const startButton = document.getElementById('start-game');
  const gameContainer = document.getElementById('game-container');

  startButton.addEventListener('click', function () {
    gameContainer.style.display = 'block';
    startButton.style.display = 'none';
    startTimer();
  });

  img.addEventListener('mousemove', function (event) {
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Adjust for the custom cursor size and border
    customCursor.style.left = x - 25 + 'px'; // Half the size of the cursor box to center
    customCursor.style.top = y - 25 + 'px'; // Half the size of the cursor box to center
    customCursor.style.display = 'block';
    coordsDisplay.textContent = `X: ${x}, Y: ${y}`; // Update coordinates display
  });

  img.addEventListener('mouseleave', function (event) {
    customCursor.style.display = 'none';
  });

  img.addEventListener('click', function (event) {
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const character = getCharacter(x, y);
    if (character) {
      foundObject[character] = true;
      document.getElementById(`${character}-x`).style.display = 'block'; // Show the red "X"

      if (allCharactersFound()) {
        img.style.opacity = '0.5'; // Set image opacity to 50%
        img.style.pointerEvents = 'none'; // Disable mouse events on the image
        setTimeout(endGame, 0); /*
When you call setTimeout with a delay of 0, it doesn't execute the callback (in this case, endGame) immediately. Instead, it places the callback at the end of the event queue. This means that any JavaScript code that's currently executing will complete, and the browser will have a chance to update the DOM, process any user interactions, or handle other high-priority tasks before the endGame function is called.

In the context of your application, this can be particularly useful because it allows the browser to apply any changes made to the DOM (like setting the opacity of the image and disabling pointer events) before the alert box is displayed. If you didn't use setTimeout, the alert could potentially block these updates from being rendered immediately, leading to a less smooth user experience.

So, in summary, using setTimeout(endGame, 0) ensures that the UI updates (like fading out the image) are visually applied before the endGame function executes, which is responsible for showing the final alert. This technique leverages the browser's event loop to manage the timing of these operations.
        */
      }
    }
  });

  function endGame() {
    clearInterval(timerInterval);
    const seconds = (timeElapsed / 1000).toFixed(1); // Format the time in the same way as in startTimer
    alert(`You found Waldo and friends in ${seconds} seconds!`);
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      timeElapsed += 10; // Update time in milliseconds
      const seconds = (timeElapsed / 1000).toFixed(1); // Convert to seconds with 1 decimal place
      timerDisplay.textContent = `${seconds}`; // Update timer display
    }, 10);
  }
});

function getCharacter(px, py) {
  if (between(px, 775, 815) && between(py, 810, 850)) {
    return 'waldo';
  }
  if (between(px, 790, 830) && between(py, 655, 695)) {
    return 'wenda';
  }
  if (between(px, 1180, 1220) && between(py, 840, 880)) {
    return 'wizard';
  }
}

function between(num, min, max) {
  return num >= min && num <= max;
}

function allCharactersFound() {
  return foundObject.waldo && foundObject.wenda && foundObject.wizard;
}
