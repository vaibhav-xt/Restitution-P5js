const height = 600;
const width = height + 200
let xspacing;
let w;
let amplitude;
let period;
let dx;
let yvalues;
let pointX;
let pointY;
let radius;
let lineLength;
let animationPlaying = false;
let waveSpeed = 2;
let position = 0;
let xDistance;
let waveHeight;
let timeWave = 0;
let startTime;
let tSlider;
let prevTSliderValue;
let delayInProgress = false;
let delayStartTime;
let dragPoint = false;
let xSlider;

function setup() {
  createCanvas(width, height);
  pointX = width * 0.18;
  xDistance = dist(width * 0.1, height * 0.5, pointX, height * 0.5) / (width / 10);
  xspacing = 0.1;
  period = width * 0.2;
  w = width * 0.8;
  amplitude = height * 0.1;
  pointY = height * 0.5;
  radius = width * 0.2;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor((w / xspacing) + 1));
  startTime = millis();
  delayStartTime = millis();

  xSlider = createSlider(1, 9, 1.5, .1);
  xSlider.style('width', `${width * 0.35}px`);
  xSlider.position(width * 0.10, height * 0.85);

  tSlider = createSlider(0, 3, 0, .1);
  tSlider.position(width * 0.55, height * 0.85);
  tSlider.style('width', `${width * 0.25}px`);

  tSlider.input(updateAnimationDuration);
  prevTSliderValue = tSlider.value();
}

function updateAnimationDuration() {
  let currentTSliderValue = tSlider.value();
  if (currentTSliderValue !== prevTSliderValue) {
    frameCount = 0;
    startTime = millis();
    delayStartTime = millis();
    delayInProgress = false;
    prevTSliderValue = currentTSliderValue;
  }
}

function delayProcess(callback, duration) {
  if (!delayInProgress) {
    delayInProgress = true;
    delayStartTime = millis();
  }
  if (millis() - delayStartTime >= duration * 1000) {
    delayInProgress = false;
    callback();
  }
}

function draw() {
  background(245);

  let duration = 2.38 * tSlider.value();
  let framesForDuration = duration * 60;
  if (frameCount <= framesForDuration) {
    timeWave = duration * 2
    animationPlaying = true;
  } else {
    delayProcess(() => {
      animationPlaying = false;
      timeWave = 0;
    }, 2);
  }
  pointX = (xSlider.value() * width * 0.1);
  xDistance = dist(width * 0.1, height * 0.5, pointX, height * 0.5) / (width / 10);
  lineLength = height * 0.5 + yvalues[Math.floor(((pointX) - width * 0.1) / xspacing)];
  cartesian();
  calcWave();
  beginShape();
  renderWave();
  endShape();
  pointDrag(pointX, pointY, width * 0.02);
  scaleX(width, height);

  lineLength = height * 0.5 + yvalues[Math.floor(((pointX) - width * 0.1) / xspacing)];
  cartesian();
  calcWave();
  beginShape();
  renderWave();
  endShape();
  pointDrag(pointX, pointY, width * 0.02);
  scaleX(width, height);
}

function calculateAngle(l1Startx, l1Starty, l1Endx, l1Endy, l2Startx, l2Starty, l2Endx, l2Endy) {

  let line1Start = createVector(l1Startx, l1Starty);
  let line1End = createVector(l1Endx, l1Endy);
  let line2Start = createVector(l2Startx, l2Starty);
  let line2End = createVector(l2Endx, l2Endy);

  let line1Dir = p5.Vector.sub(line1End, line1Start);
  let line2Dir = p5.Vector.sub(line2End, line2Start);

  let angleBetweenLines = line1Dir.angleBetween(line2Dir);

  angleBetweenLines = degrees(angleBetweenLines);

  if (angleBetweenLines < 0) angleBetweenLines = 180 + abs(angleBetweenLines)
  textSize(width * 0.03)

  return abs(degrees(line1Dir.angleBetween(line2Dir)))
}


function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function pointDrag(x, y, r) {
  fill(0);
  circle(x, y, r);

  let waveIndex = Math.floor((x - width * 0.1) / xspacing);
  let currentY = height * 0.5 + yvalues[waveIndex];
  line(x, y, x, currentY);

  if (!animationPlaying) {
    let xCenter = width * 0.2
    let arcRotate = (2 * PI) / 2
    let scle = 1

    if (yvalues[waveIndex] <= 0) {
      arcRotate = (2 * PI) / 2;
      scle = 1;
      if ((80 <= pointX && pointX <= 160)) {
        xCenter = width * 0.15;
      } else if (240 <= pointX && pointX <= 320) {
        xCenter = width * 0.35;
      } else if (400 <= pointX && pointX <= 480) {
        xCenter = width * 0.55;
      } else if (560 <= pointX && pointX <= 640) {
        xCenter = width * 0.75;
      }
    }

    if (yvalues[waveIndex] > 0) {
      arcRotate = 0
      scle = -1
      if (160 < pointX && pointX <= 240) {
        xCenter = width * 0.25
      } else if (320 <= pointX && pointX <= 400) {
        xCenter = width * 0.45
      } else if (420 <= pointX && pointX <= 540) {
        xCenter = width * 0.65
      } else if (480 <= pointX && pointX <= 560) {
        xCenter = width * 0.65
      } else if (640 <= pointX && pointX <= 720) {
        xCenter = width * 0.85
      }
    }

    if ((yvalues[waveIndex]) === -1.245532925099999e-11) {
      // arcRotate = (2 * PI) / 2;
      arcRotate = 0
      xCenter = width * 0.25
      scle = -1
    }

    if ((yvalues[waveIndex]) === 2.2040308302966456e-11) {
      arcRotate = (2 * PI) / 2;
      // arcRotate = 0
      xCenter = width * 0.35
      scle = 1
    }

    if ((yvalues[waveIndex]) === -3.1625287354932924e-11) {
      arcRotate = 0
      xCenter = width * 0.45
      scle = -1
    }

    if ((yvalues[waveIndex]) === 4.1210266406899395e-11) {
      arcRotate = (2 * PI) / 2;
      xCenter = width * 0.55
      scle = 1
    }
    circle(xCenter, height * 0.5, r * 0.5)

    push();
    setLineDash([5, 5]);
    line(xCenter, height * 0.5, x, currentY);
    pop();

    const angle = calculateAngle(width * 0.1, height * 0.5, xCenter, height * 0.5, x, currentY, xCenter, height * 0.5)

    push()
    noFill();
    let startAngle = 0;
    let stopAngle = radians(angle);
    translate(xCenter, height * 0.5);
    rotate(arcRotate)
    scale(scle, 1)
    arc(0, 0, r * 2, r * 2, startAngle, stopAngle);
    pop()
    push()
    textSize(width * 0.02)
    text("θ", xCenter - width * 0.03, scle === -1 ? height * 0.535 : height * 0.49)
    pop()
  }

  push()
  displayEquation()
  pop()
}

function displayEquation(x = width * 0.4, y = height * 0.15) {
  textSize(x * 0.07)
  text("θ = ", x, y + height * 0.015);
  text(`2π(${xDistance.toFixed(1)}λ)`, x + width * 0.05, y - height * 0.015);
  line(x + width * 0.05, y, x + width * 0.16, y)
  text(`λ`, x + width * 0.09, y + height * 0.04);

  text(`-`, x + width * 0.175, y + height * 0.012);

  text(`2πλ(${tSlider.value()}T)`, x + width * 0.2, y - height * 0.015);
  line(x + width * 0.2, y, x + width * 0.325, y)
  text(`T`, x + width * 0.25, y + height * 0.04);
}

function scaleX(x, y) {
  // X axis scale lines 
  line(x * 0.2, y * 0.5, x * 0.2, y * 0.515)
  line(x * 0.3, y * 0.5, x * 0.3, y * 0.515)
  line(x * 0.4, y * 0.5, x * 0.4, y * 0.515)
  line(x * 0.5, y * 0.5, x * 0.5, y * 0.515)
  line(x * 0.6, y * 0.5, x * 0.6, y * 0.515)
  line(x * 0.7, y * 0.5, x * 0.7, y * 0.515)
  line(x * 0.8, y * 0.5, x * 0.8, y * 0.515)

  // Y axis scale lines 
  line(x * 0.085, y * 0.4, x * 0.1, y * 0.4)
  line(x * 0.085, y * 0.3, x * 0.1, y * 0.3)
  line(x * 0.085, y * 0.6, x * 0.1, y * 0.6)
  line(x * 0.085, y * 0.7, x * 0.1, y * 0.7)
  textSize(x * 0.02);
  fill(0);

  // X Cordinates values
  text("0", x * 0.08, y * 0.515)
  text("1", x * 0.195, y * 0.535)
  text("2", x * 0.295, y * 0.535)
  text("3", x * 0.395, y * 0.535)
  text("4", x * 0.495, y * 0.535)
  text("5", x * 0.595, y * 0.535)
  text("6", x * 0.695, y * 0.535)
  text("7", x * 0.795, y * 0.535)
  text("8", x * 0.895, y * 0.535)

  // X Cordinates values
  text("2", x * 0.07, y * 0.305)
  text("1", x * 0.07, y * 0.405)
  text("-1", x * 0.065, y * 0.605)
  text("-2", x * 0.065, y * 0.705)

  push()
  textSize(x * 0.04)
  line(x * 0.64, y * 0.875, x * 0.64, y * 0.885)
  line(x * 0.716, y * 0.875, x * 0.716, y * 0.885)
  line(x * 0.795, y * 0.875, x * 0.795, y * 0.885)
  text("x", x * 0.07, y * 0.88)
  text("T", x * 0.53, y * 0.885)
  textSize(width * 0.02)
  text("T", x * 0.635, y * 0.91,)
  text("2T", x * 0.71, y * 0.91)
  text("3T", x * 0.785, y * 0.91)
  XSliderText(width * 0.1, height * 0.91)

  pop()
}

function XSliderText(x, y) {
  line(x + 43, y - 20, x + 43, y - 14)
  text("λ", x + 40, y)
  line(x + 77, y - 20, x + 77, y - 14)
  text("2λ", x + 70, y)
  line(x + 110, y - 20, x + 110, y - 14)
  text("3λ", x + 100, y)
  line(x + 142, y - 20, x + 142, y - 14)
  text("4λ", x + 132, y)
  line(x + 175, y - 20, x + 175, y - 14)
  text("5λ", x + 168, y)
  line(x + 208, y - 20, x + 208, y - 14)
  text("6λ", x + 200, y)
  line(x + 208, y - 20, x + 208, y - 14)
  text("7λ", x + 230, y)
  line(x + 242, y - 20, x + 242, y - 14)
  text("8λ", x + 265, y)
  line(x + 275, y - 20, x + 275, y - 14)
}

function cartesian() {
  strokeWeight(1);
  line(width * 0.1, height * 0.2, width * 0.1, height * 0.8);
  line(width * 0.1, height * 0.5, width * 0.9, height * 0.5);
}

function calcWave() {
  let x = timeWave * waveSpeed;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x -= dx;
  }
}

function renderWave() {
  noFill();
  for (let x = 0; x < yvalues.length; x++) {
    let xCoordinate = x * xspacing + width * 0.1;
    let yCoordinate = height / 2 + yvalues[x];
    curveVertex(xCoordinate, yCoordinate);
    xAngle = xCoordinate
  }
}