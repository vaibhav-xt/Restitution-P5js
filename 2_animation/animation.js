const widthHeight = 500;
let slider;
let playFlag = false;
let bounceBackFlag = false;
let ballBounce = {
    speed: 1,
    direction: "down"
};
let variableArrowLength;
let buttonClicked = false;
let initialSliderValue;



function setup() {
    createCanvas(widthHeight, widthHeight);
    background(220);
    angleMode(DEGREES);

    // Slider 
    slider = createSlider(0, 1, 0.5, 0.1);
    slider.position(width * 0.5 - width * 0.25, height * 0.70);
    slider.style('width', `${width * 0.5}px`);
    playButton()
}

function draw() {
    background(245);
    push()
    playFlag ? bouncingBall() : example();
    pop()

    textDisplay(slider.value(), width * 0.5 - 13, height * 0.68)

    push()
    fill(220)
    rect(0, height - height * 0.1, width, height * 0.1)
    pop()
}

function bouncingBall() {
    const { speed, direction } = ballBounce;
    // Line
    line(width * 0.3, height * 0.5, width * 0.7, height * 0.5);

    arrowRotation(width * 0.4, height * 0.16, bounceBackFlag ? width * 0.32 : height * 0.04 + speed * 5.05, 0, 2);
    textDisplay(`t1= 1sec`, width * 0.25, height * 0.45)

    arrowRotation(width * 0.6, height * 0.5, bounceBackFlag ? initialSliderValue === 0 ? 0 : width * 0.5 - (height * 0.18 + speed * 5) : 0, 180, 2);
    textDisplay(`t2= ${initialSliderValue}sec`, width * 0.63, height * 0.45)

    fill(216, 27, 96)
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

    if (initialSliderValue !== 0) {
        if (direction === "up") {
            if (variableArrowLength < ballY) {
                ballBounce.speed -= 0.5;
            }
        }
    }
}



function example() {
    // Arrows 
    arrowRotation(width * 0.4, height * 0.17, width * 0.3, 0);

    arrowRotation(width * 0.6, height * 0.495, width * slider.value() * 0.3, 180);

    // Text 
    textDisplay('V(approach)', width * 0.31, height * 0.15);
    textDisplay('V(separation)', width * 0.53, height * 0.15);

    // Line
    line(width * 0.3, height * 0.5, width * 0.7, height * 0.5)

    // Circle 
    fill(216, 27, 96)
    circle(width * 0.50, height * 0.46, width * 0.08);

}

function playButton() {
    button = createButton("Play");
    button.position(width * 0.4, height * 0.93)
    button.class('button')
    button.mousePressed(() => {
        if (!buttonClicked) {
            playFlag = true;
            variableArrowLength = height * 0.5 - width * slider.value() * 0.3;
            buttonClicked = true; // Set the flag to true after the first click
            initialSliderValue = slider.value();
        }
    });
}

// Display Text 
function textDisplay(label, xText, yText, size = width * 0.03) {
    push();
    stroke(2)
    textSize(size);
    text(label, xText, yText);
    pop();
}

// Rotate Arrow 
function arrowRotation(xArrowAngle, yArrowAngle, arrowLength, deg, weight = widthHeight * 0.007) {
    let c = (deg === 180) ? color(255, 153, 0) : color(102, 0, 255);
    push();
    stroke(c)
    fill(c)
    strokeWeight(weight)
    translate(xArrowAngle, yArrowAngle);
    rotate(deg);
    drawArrow(0, 0, arrowLength, deg);
    pop();
}

// Draw Arrow 
function drawArrow(xArrow, yArrow, arrowLength, deg) {
    rectMode(CENTER);

    push();
    line(xArrow, yArrow, xArrow, yArrow + arrowLength);

    // Calculate the coordinates for the arrowhead
    let arrowSize = 10;
    let arrowX1 = xArrow - arrowSize / 2;
    let arrowX2 = xArrow + arrowSize / 2;
    let arrowY = yArrow + arrowLength;

    // Draw the arrowhead
    triangle(arrowX1, arrowY, arrowX2, arrowY, xArrow, arrowY + arrowSize);

    pop();
}
