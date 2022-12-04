/*
 * @name Hue
 * @description Hue is the color reflected from or transmitted through an
 * object and is typically referred to as the name of the color (red, blue,
 * yellow, etc.) Move the cursor vertically over each bar to alter its hue.
 */
const barWidth = 20;
let lastBar = -1;

function setup() {
  createCanvas(720, 400);

  // HSB模式，色调、饱和度、亮度
  colorMode(HSB, height, height, height);
  noStroke();
  background(0);
}

function draw() {
  let whichBar = mouseX / barWidth;
  if (whichBar !== lastBar) {
    let barX = whichBar * barWidth;

    // 固定饱和度和亮度，根据鼠标纵轴的范围设置色调
    fill(mouseY, height, height);
    rect(barX, 0, barWidth, height);
    lastBar = whichBar;
  }
}
