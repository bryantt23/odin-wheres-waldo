document.addEventListener('DOMContentLoaded', function () {
  const img = document.getElementById('waldoImage');
  const customCursor = document.getElementById('customCursor');
  const coordsDisplay = document.getElementById('coords');

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
