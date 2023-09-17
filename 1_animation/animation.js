// Aspect Ratio 1:1
const widthHeight = 700;

let initialPoints = [];
let isDragging = [];

// Magnetic Upwards Points
let mgUpPoints = [];

// Magnetic Upwards Points
let mgDownPoints = [];

// plus display points
let plusUpward = [];
let plusDownward = [];


function setup() {
    // Aspect Ratio 1:1
    createCanvas(widthHeight, widthHeight);

    initialPoints = [
        // Arrows arguments [x, y, arrowLength, label, degree]
        [width * 0.15, height * 0.15, width * 0.2, `t0`, 0, 0],
        [width * 0.3, height * 0.35, width * 0.15, "t1", 180, 180],
        [width * 0.35, height * 0.20, width * 0.15, "t1", 0],
        [width * 0.50, height * 0.35, width * 0.10, "t2", 180, 180],
        [width * 0.55, height * 0.25, width * 0.10, "t2", 0],
        [width * 0.70, height * 0.35, width * 0.05, "t3", 180, 180],
        [width * 0.75, height * 0.30, width * 0.05, "t3", 0]
    ]

    mgUpPoints = [
        [width * 0.22, height * 0.47, width * 0.07, height * 0.15],
        [width * 0.32, height * 0.47, width * 0.07, height * 0.15],
        [width * 0.42, height * 0.47, width * 0.07, height * 0.15],
        [width * 0.52, height * 0.47, width * 0.07, height * 0.15],
    ]

    mgDownPoints = [
        [width * 0.26, height * 0.71, width * 0.07, height * 0.15],
        [width * 0.36, height * 0.71, width * 0.07, height * 0.15],
        [width * 0.46, height * 0.71, width * 0.07, height * 0.15],
    ]

    plusUpward = [
        ["+", width * 0.30, height * 0.55],
        ["+", width * 0.40, height * 0.55],
        ["+", width * 0.50, height * 0.55]
    ]

    plusDownward = [
        ["+", width * 0.33, height * 0.80],
        ["+", width * 0.43, height * 0.80]
    ]

    for (let i = 0; i < 7; i++) {
        isDragging[i] = false;
    }

    background(220);
    angleMode(DEGREES);
}

function draw() {
    background(220);

    // arrows
    for (let i = 0; i < initialPoints.length; i++) {
        arrowRotation(...initialPoints[i])
    }


    // Ball
    ballPath();

    sizeText("T(upward) = ", width * 0.05, height * 0.55, 0, width * 0.03);
    sizeText("T(downward) = ", width * 0.05, height * 0.8, 0, width * 0.03);


    for (let i = 0; i < plusUpward.length; i++) {
        sizeText(...plusUpward[i])
    }

    for (let i = 0; i < plusDownward.length; i++) {
        sizeText(...plusDownward[i])
    }

    submit()
}

function submit() {
    button = createButton("Submit");
    button.position(width * 0.8, height * 0.8)
    button.mousePressed(() => {
        if (verify()) {
            alert("Well Done!")
        } else {
            alert("Wrong!")
        }
    })
}

function ballPath() {
    push();
    noFill();
    stroke(0, 0, 0, 50);
    stroke(0, 0, 0, 50);
    beginShape();
    curveVertex(width * 0.16, height * 0.34);
    curveVertex(width * 0.16, height * 0.05);
    curveVertex(width * 0.22, height * 0.35);
    curveVertex(width * 0.33, height * 0.10);
    curveVertex(width * 0.43, height * 0.35);
    curveVertex(width * 0.52, height * 0.15);
    curveVertex(width * 0.63, height * 0.35);
    curveVertex(width * 0.7, height * 0.25);
    curveVertex(width * 0.80, height * 0.35);
    curveVertex(width * 0.85, height * 0.34);
    endShape();
    pop();

    push()
    stroke(0, 0, 0, 50);
    fill(255, 255, 255, 200);
    circle(width * 0.19, height * 0.07, width * 0.05)
    circle(width * 0.37, height * 0.10, width * 0.05)
    circle(width * 0.56, height * 0.15, width * 0.05)
    circle(width * 0.72, height * 0.23, width * 0.05)
    pop()
}

// Text Function 
function sizeText(label, xText, yText, deg, size = width * 0.025) {
    push();
    textSize(size);
    translate(deg === 180 ? xText : xText - 5, yText)
    rotate(deg)
    text(label, 0, 0);
    pop();
}

function arrowRotation(xArrowAngle, yArrowAngle, arrowLength, label, deg, textDeg) {
    push()
    translate(xArrowAngle, yArrowAngle)
    rotate(deg)
    drawArrow(0, 0, arrowLength, label, textDeg)
    pop()
}

function drawArrow(xArrow, yArrow, arrowLength, label, textDeg) {
    rectMode(CENTER);
    // Draw the arrow line
    line(xArrow, yArrow, xArrow, yArrow + arrowLength);
    sizeText(label, xArrow, yArrow - 15, textDeg);

    // Calculate arrowhead coordinates
    let arrowSize = 10;
    let arrowX1 = xArrow - arrowSize / 2;
    let arrowX2 = xArrow + arrowSize / 2;
    let arrowY = yArrow + arrowLength;

    // Draw the arrowhead
    fill(0);
    triangle(arrowX1, arrowY, arrowX2, arrowY, xArrow, arrowY + arrowSize);
}

function mousePressed() {
    for (let i = 0; i < 7; i++) {
        if (initialPoints[i][4] === 0) {
            if (mouseX < initialPoints[i][0] + 10 &&
                mouseX > initialPoints[i][0] - 10 &&
                mouseY > (initialPoints[i][1]) &&
                mouseY < initialPoints[i][1] + initialPoints[i][2]
            ) {
                isDragging[i] = true;
            }
        }

        if (initialPoints[i][4] === 180) {
            if (
                mouseX < initialPoints[i][0] + 10 &&
                mouseX > initialPoints[i][0] - 10 &&
                mouseY > (initialPoints[i][1] - initialPoints[i][2]) &&
                mouseY < initialPoints[i][1]
            ) {
                isDragging[i] = true;
            }
        }
    }
}


function mouseDragged() {
    for (let i = 0; i < initialPoints.length; i++) {
        if (initialPoints[i][4] === 0) {
            if (isDragging[i]) {
                initialPoints[i][0] = mouseX;
                initialPoints[i][1] = mouseY - (initialPoints[i][2] / 2);
            }
        }
        if (initialPoints[i][4] === 180) {
            if (isDragging[i]) {
                initialPoints[i][0] = mouseX;
                initialPoints[i][1] = mouseY + (initialPoints[i][2] / 2);
            }
        }
    }
}

function initialPointsClone() {
    return [
        // Arrows arguments [x, y, arrowLength, label, degree]
        [width * 0.15, height * 0.15, width * 0.2, `t0`, 0, 0],
        [width * 0.3, height * 0.35, width * 0.15, "t1", 180, 180],
        [width * 0.35, height * 0.20, width * 0.15, "t1", 0],
        [width * 0.50, height * 0.35, width * 0.10, "t2", 180, 180],
        [width * 0.55, height * 0.25, width * 0.10, "t2", 0],
        [width * 0.70, height * 0.35, width * 0.05, "t3", 180, 180],
        [width * 0.75, height * 0.30, width * 0.05, "t3", 0]
    ]
}

function magnet() {
    let clonePonints = initialPointsClone();

    for (let i = 0; i < initialPoints.length; i++) {
        if (isDragging[i]) {
            if (initialPoints[i][4] === 0) {
                for (let j = 0; j < mgUpPoints.length; j++) {
                    if (
                        mouseX > mgUpPoints[j][0] &&
                        mouseX < mgUpPoints[j][0] + mgUpPoints[j][2] &&
                        mouseY > mgUpPoints[j][1] &&
                        mouseY < mgUpPoints[j][1] + mgUpPoints[j][3]
                    ) {
                        const mgX =
                            mgUpPoints[j][0] + mgUpPoints[j][2] / 2;
                        const mgY =
                            mgUpPoints[j][1] + mgUpPoints[j][3] / 2;
                        initialPoints[i][0] = mgX;
                        initialPoints[i][1] = mgY - initialPoints[i][2] / 2;
                        break
                    } else {
                        // If not aligned with any magnetic point, reset the position
                        initialPoints[i][0] = clonePonints[i][0];
                        initialPoints[i][1] = clonePonints[i][1];
                    }
                }
            } else if (initialPoints[i][4] === 180) {
                for (let j = 0; j < mgDownPoints.length; j++) {
                    if (
                        mouseX > mgDownPoints[j][0] &&
                        mouseX < mgDownPoints[j][0] + mgDownPoints[j][2] &&
                        mouseY > mgDownPoints[j][1] &&
                        mouseY < mgDownPoints[j][1] + mgDownPoints[j][3]
                    ) {
                        const mgX =
                            mgDownPoints[j][0] + mgDownPoints[j][2] / 2;
                        const mgY =
                            mgDownPoints[j][1] + mgDownPoints[j][3] / 2;
                        initialPoints[i][0] = mgX;
                        initialPoints[i][1] = mgY + initialPoints[i][2] / 2;
                        break;
                    } else {
                        // If not aligned with any magnetic point, reset the position
                        initialPoints[i][0] = clonePonints[i][0];
                        initialPoints[i][1] = clonePonints[i][1];
                    }
                }
            }
        }
    }
}

function verify() {
    if (
        initialPoints[0][0] > mgUpPoints[0][0] &&
        initialPoints[0][0] < mgUpPoints[0][0] + mgUpPoints[0][2] &&
        initialPoints[0][1] < mgUpPoints[0][1]
    )

        if (
            initialPoints[2][0] > mgUpPoints[1][0] &&
            initialPoints[2][0] < mgUpPoints[1][0] + mgUpPoints[1][2] &&
            initialPoints[2][1] === mgUpPoints[1][1]
        )

            if (
                initialPoints[4][0] > mgUpPoints[2][0] &&
                initialPoints[4][0] < mgUpPoints[2][0] + mgUpPoints[2][2] &&
                initialPoints[4][1] > mgUpPoints[2][1]
            )

                if (
                    initialPoints[6][0] > mgUpPoints[3][0] &&
                    initialPoints[6][0] < mgUpPoints[3][0] + mgUpPoints[3][2] &&
                    initialPoints[6][1] > mgUpPoints[3][1]
                )

                    if (
                        initialPoints[1][0] > mgDownPoints[0][0] &&
                        initialPoints[1][0] < mgDownPoints[0][0] + mgDownPoints[0][2] &&
                        initialPoints[1][1] > mgDownPoints[0][1]
                    )

                        if (
                            initialPoints[3][0] > mgDownPoints[1][0] &&
                            initialPoints[3][0] < mgDownPoints[1][0] + mgDownPoints[1][2] &&
                            initialPoints[3][1] > mgDownPoints[1][1]
                        )

                            if (
                                initialPoints[5][0] > mgDownPoints[2][0] &&
                                initialPoints[5][0] < mgDownPoints[2][0] + mgDownPoints[2][2] &&
                                initialPoints[5][1] > mgDownPoints[2][1]
                            )

                                return true;
    // Arrow to original Position 
    initialPoints = initialPointsClone();
    return false;
}



function mouseReleased() {
    magnet()

    for (let i = 0; i < isDragging.length; i++) {
        isDragging[i] = false;
    }
}

