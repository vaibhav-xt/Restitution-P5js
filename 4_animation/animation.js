const widthHeight = 600;
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
let animationPlaying = false;
let waveSpeed = 2;
let position = 0;
let xDistance;
let waveHeight;
let timeWave = 0;
let startTime;

function setup() {
    createCanvas(widthHeight, widthHeight);
    xspacing = 0.1;
    period = width * 0.4;
    w = width * 0.8;
    amplitude = height * 0.18;
    pointX = width * 0.15;
    pointY = height * 0.5;
    radius = width * 0.2;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor((w / xspacing) + 1));
    xDistance = dist(width * 0.1, height * 0.5, pointX, height * 0.5) / 50;

    playBtn = createButton('Play');
    playBtn.class("button")
    playBtn.position(width * 0.45, height * 0.915);
    playBtn.mousePressed(() => {
        animationPlaying = !animationPlaying;
        if (animationPlaying) {
            startTime = millis() - timeWave * 1000;
            playBtn.html('Stop');
        } else {
            playBtn.html('Play');
        }
    });
}

function draw() {
    if (animationPlaying) {
        timeWave = (millis() - startTime) / 1000;
    }
    lineLength = height * 0.5 + yvalues[Math.floor(((pointX) - width * 0.1) / xspacing)];
    background(245);
    cartesian();
    calcWave();
    beginShape();
    renderWave();
    endShape();
    pointDrag(pointX, pointY, width * 0.02);
    scaleX(width, height);

    push()
    fill(220)
    rect(0, height - height * 0.1, width, height * 0.1)
    pop()
}

function pointDrag(x, y, r) {
    push();
    fill(0, 0, 0);
    circle(x, y, r);
    pop();
    line(x, y, x, height * 0.5 + yvalues[Math.floor((pointX - width * 0.1) / xspacing)]);
}

function mousePressed() {
    let d = dist(mouseX, mouseY, pointX, pointY);
    dragPoint = d < radius;
}

function mouseDragged() {
    let newPointX = constrain(mouseX, width * 0.1, width * 0.9);
    if (dragPoint) {
        pointX = newPointX;
        lineLength = height * 0.5 + yvalues[Math.floor((pointX - width * 0.1) / xspacing) - 1];
        xDistance = dist(width * 0.1, height * 0.5, pointX, height * 0.5) / (width / 10);
    }
}

function mouseReleased() {
    dragPoint = false;
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


    textSize(x * 0.04);
    text(`x = ${xDistance.toFixed(1)}`, x * 0.75, y * 0.1)
    text(`t = ${timeWave.toFixed(1)}s`, x * 0.75, y * 0.2)

    waveHeight = (height * 0.5 - lineLength) / (height / 10);
    text(`Y = ${waveHeight.toFixed(1)}`, x * 0.75, y * 0.15)
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
    }
}