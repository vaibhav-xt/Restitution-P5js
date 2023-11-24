const widthHeight = 500;
let xspacing;
let w;
let amplitude;
let period;
let dx;
let yvalues;
let dragPoint = false;
let pointX;
let pointY;
let radius;
let lineLength;
let waveSpeed = 2;
let timeWave = 0;
let btn = {
  b1: false,
  b2: false,
  b3: false
}
let waveMotion;
let xMove;
let dashedline;
let angleArc

function setup() {
  createCanvas(widthHeight, widthHeight);
  xspacing = 0.1;
  period = width * 0.4;
  w = width * 0.8;
  amplitude = height * 0.18;
  pointY = height * 0.5;
  radius = width * 0.2;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor((w / xspacing) + 1));
  xDistance = dist(width * 0.1, height * 0.5, pointX, height * 0.5) / 50;
  xMove = width * 0.1
  waveMotion = 0
  dashedline = height * 0.5
  angleArc = 0

  button = createButton('A Sin');
  button.position(width * 0.31, height * 0.86);
  button.style('font-size', `${width * 0.04}px`);
  button.elt.classList.add('btn1')
  button.mousePressed(() => {
    if (btn.b3 && !btn.b1) {
      button.style('background', "black");
      button.style('color', "white");
      button.attribute('disabled', 'true');
      btn.b1 = true
    }
  });


  button2 = createButton('2πx/λ');
  button2.position(width * 0.48, height * 0.86);
  button2.style('font-size', `${width * 0.04}px`);
  button2.elt.classList.add('btn2');
  button2.mousePressed(() => {
    pointX = width * 0.65
    button2.style('background', "black");
    button2.style('color', "white");
    button2.attribute('disabled', 'true');
    btn.b2 = true
  });

  button3 = createButton('2πt/T');
  button3.position(width * 0.69, height * 0.86);
  button3.style('font-size', `${width * 0.04}px`);
  button3.elt.classList.add('btn3')
  button3.mousePressed(() => {
    if (btn.b2 && !btn.b3) {
      button3.style('background', "black");
      button3.style('color', "white");
      button3.attribute('disabled', 'true');
      btn.b3 = true
      waveMotion = 3.14;
    }
  });
}

function draw() {
  background(245);
  cartesian();
  calcWave();
  beginShape();
  renderWave();
  endShape();
  pointDrag(pointX, pointY, width * 0.02);
  scaleX(width, height);
  equation(width * 0.15, height * 0.9)
}

function pointDrag(x, y, r) {
  push();
  fill(0, 0, 0);
  if (xMove <= x) {
    xMove += 2;
  }
  circle(xMove, y, r);
  pop();

  if (btn.b2) lineLength = height * 0.5 + yvalues[Math.floor(((xMove) - width * 0.1) / xspacing)];
  line(xMove, y, xMove, lineLength);

  let waveIndex = Math.floor((x - width * 0.1) / xspacing);
  let currentY = height * 0.5 + yvalues[waveIndex];
  let xCenter = width * 0.2
  let arcRotate = (2 * PI) / 2
  let scle = 1

  if (yvalues[waveIndex] <= 0) {
    arcRotate = (2 * PI) / 2;
    scle = 1;
    if (50 <= pointX && pointX <= 150) {
      xCenter = width * 0.2;
    } else if (250 <= pointX && pointX <= 350) {
      xCenter = width * 0.6;
    }
  }

  if (yvalues[waveIndex] > 0) {
    arcRotate = 0
    scle = -1
    if (150 < pointX && pointX <= 250) {
      xCenter = width * 0.4
    } else if (350 <= pointX && pointX <= 450) {
      xCenter = width * 0.8
    }
  }

  if ((yvalues[waveIndex]) === 3.797252216812167e-12) {
    arcRotate = (2 * PI) / 2;
    xCenter = width * 0.6
    scle = -1
  }

  if ((yvalues[waveIndex]) === -9.778882997244264e-11) {
    arcRotate = 0
    xCenter = width * 0.8
    scle = -1
  }

  push()
  fill(0)
  if (btn.b1) circle(xCenter, height * 0.5, r * 0.5)
  pop()

  push();
  setLineDash([5, 5]);
  if (dashedline > currentY && btn.b1) {
    dashedline -= 0.3
  }
  if (btn.b1) line(xCenter, height * 0.5, x, dashedline);
  pop();

  const angle = calculateAngle(width * 0.1, height * 0.5, xCenter, height * 0.5, x, currentY, xCenter, height * 0.5)

  push()
  let startAngle = 0;
  let stopAngle = radians(angle);
  translate(xCenter, height * 0.5);
  rotate(arcRotate)
  scale(scle, 1)

  if (btn.b1 && angleArc < stopAngle) {
    angleArc += 0.008
  }

  if (btn.b1) {
    arc(0, 0, r * 2, r * 2, startAngle, angleArc)
  };
  pop()
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
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


function equation(x, y) {
  push();
  textSize(width * 0.04);
  text("Y(x, y) =", x, y);
  pop();


  push()
  textSize(width * 0.1)
  text("(     +     )", x + 150, y + 10)
  pop()
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
  line(x * 0.9, y * 0.5, x * 0.9, y * 0.515)

  // Y axis scale lines 
  line(x * 0.085, y * 0.4, x * 0.1, y * 0.4)
  line(x * 0.085, y * 0.3, x * 0.1, y * 0.3)
  line(x * 0.085, y * 0.6, x * 0.1, y * 0.6)
  line(x * 0.085, y * 0.7, x * 0.1, y * 0.7)
  textSize(x * 0.02);
  fill(0);

  // X Cordinates values
  text("0", x * 0.08, y * 0.535)
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
}

function cartesian() {
  strokeWeight(1);
  line(width * 0.1, height * 0.2, width * 0.1, height * 0.8);
  line(width * 0.1, height * 0.5, width * 0.9, height * 0.5);
}

function calcWave() {
  if (timeWave <= waveMotion) {
    timeWave += 0.02
  }
  let x = timeWave * waveSpeed
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
  }
}