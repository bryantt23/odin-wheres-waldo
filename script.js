document.addEventListener('DOMContentLoaded', function () {
  const img = document.getElementById('waldoImage');
  const coordsDisplay = document.getElementById('coords');

  img.addEventListener('mousemove', function (event) {
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    coordsDisplay.textContent = `X: ${x}, Y: ${y}`;
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
