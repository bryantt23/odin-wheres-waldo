const foundObject = { waldo: false, wenda: false, wizard: false };
let timerInterval = null;
let timeElapsed = 0;

document.addEventListener('DOMContentLoaded', function () {
  const img = document.getElementById('waldoImage');
  const customCursor = document.getElementById('customCursor');
  const coordsDisplay = document.getElementById('coords');
  const timerDisplay = document.getElementById('timer');
  startTimer();

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
        clearInterval(timerInterval); // Stop the timer
        img.style.opacity = '0.5'; // Set image opacity to 50%
        img.style.pointerEvents = 'none'; // Disable mouse events on the image
        // Set found avatars to have a red X
        for (const character in foundObject) {
          if (
            foundObject.hasOwnProperty(character) &&
            foundObject[character] === true
          ) {
            const avatar = document.getElementById(`${character}-avatar`);
            avatar.classList.add('found'); // Add the 'found' class to show the red X
          }
        }
      }
    }
  });

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
