const widthHeight = 500;
let slider;
let playFlag = false;
let bounceBackFlag = false;
let ballBounce = {
    speed: 1,
    direction: "down"
};
let variableArrowLength;

function setup() {
    createCanvas(widthHeight, widthHeight);
    background(220);
    angleMode(DEGREES);

    // Slider 
    slider = createSlider(0, 1, 0.5, 0.1);
    slider.position(width * 0.5 - width * 0.25, height * 0.70);
    slider.style('width', `${width * 0.5}px`);
}

function draw() {
    background(220);
    // example();
    playFlag ? bouncingBall() : example();
    playButton();
}

function bouncingBall() {
    const { speed, direction } = ballBounce;
    // Line
    line(width * 0.3, height * 0.5, width * 0.7, height * 0.5);

    arrowRotation(width * 0.4, height * 0.16, bounceBackFlag ? width * 0.32 : height * 0.04 + speed * 5.05, 0, 2);
    textDisplay(`t1= 1sec`, width * 0.28, height * 0.45)

    arrowRotation(width * 0.6, height * 0.5, bounceBackFlag ? slider.value() === 0 ? 0 : width * 0.5 - (height * 0.18 + speed * 5) : 0, 180, 2);
    textDisplay(`t2= ${slider.value()}sec`, width * 0.65, height * 0.45)

    const ballY = height * 0.2 + speed * 5;
    circle(width * 0.50, ballY, width * 0.08);

    if (direction === "down") {
        if (ballY + width * 0.04 < height * 0.5) {
            ballBounce.speed += 0.5;
        } else {
            ballBounce.direction = "up";
            bounceBackFlag = true;
        }
    }

    if (slider.value() !== 0) {
        if (direction === "up") {
            if (variableArrowLength < ballY) {
                ballBounce.speed -= 0.5;
            }
        }
    }
}



function example() {
    // Arrows 
    arrowRotation(width * 0.4, height * 0.18, width * 0.3, 0);
    arrowRotation(width * 0.6, height * 0.5, width * slider.value() * 0.3, 180);

    // Text 
    textDisplay('V(approach)', width * 0.33, height * 0.15);
    textDisplay('V(separation)', width * 0.53, height * 0.15);

    // Line
    line(width * 0.3, height * 0.5, width * 0.7, height * 0.5)

    // Circle 
    circle(width * 0.50, height * 0.46, width * 0.08);

}

function playButton() {
    push()
    stroke(3)
    fill(255, 0, 0)
    textDisplay(slider.value(), width * 0.5 - 13, height * 0.68)
    pop()
    button = createButton("Play");
    button.position(width * 0.47, height * 0.8)
    button.mousePressed(() => {
        playFlag = true;
        variableArrowLength = height * 0.5 - width * slider.value() * 0.3;
    })
}

// Display Text 
function textDisplay(label, xText, yText, size = width * 0.025) {
    push();
    textSize(size);
    text(label, xText, yText);
    pop();
}

// Rotate Arrow 
function arrowRotation(xArrowAngle, yArrowAngle, arrowLength, deg, weight = widthHeight * 0.007) {
    push();
    strokeWeight(weight)
    translate(xArrowAngle, yArrowAngle);
    rotate(deg);
    drawArrow(0, 0, arrowLength);
    pop();
}

// Draw Arrow 
function drawArrow(xArrow, yArrow, arrowLength) {
    rectMode(CENTER);

    line(xArrow, yArrow, xArrow, yArrow + arrowLength);

    let arrowSize = 10;
    let arrowX1 = xArrow - arrowSize / 2;
    let arrowX2 = xArrow + arrowSize / 2;
    let arrowY = yArrow + arrowLength;

    fill(0);
    triangle(arrowX1, arrowY, arrowX2, arrowY, xArrow, arrowY + arrowSize);
}