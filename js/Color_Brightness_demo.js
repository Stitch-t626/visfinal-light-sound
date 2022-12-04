const barWidth = 20;
let lastBar = -1;

function setup() {
  createCanvas(720, 400);
  colorMode(HSB, 255, 255, height);
  noStroke();
}

function draw() {
  let whichBar = mouseX / barWidth;
  if (whichBar !== lastBar) {
    let barX = whichBar * barWidth;

    // 
    fill(0, 255, mouseY);
    rect(barX, 0, barWidth, height);
    lastBar = whichBar;
  }
}
