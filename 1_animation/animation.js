// Aspect Ratio 1:1
const widthHeight = 400;

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
        [width * 0.15, height * 0.1, width * 0.2, `t0`, 0],
        [width * 0.3, height * 0.3, width * 0.15, "", 180],
        [width * 0.35, height * 0.15, width * 0.15, "t1", 0],
        [width * 0.50, height * 0.30, width * 0.10, "", 180],
        [width * 0.55, height * 0.20, width * 0.10, "t2", 0],
        [width * 0.70, height * 0.30, width * 0.05, "", 180],
        [width * 0.75, height * 0.25, width * 0.05, "t3", 0]
    ]

    mgUpPoints = [
        [width * 0.23, height * 0.45, width * 0.07, height * 0.15],
        [width * 0.33, height * 0.48, width * 0.07, height * 0.15],
        [width * 0.43, height * 0.51, width * 0.07, height * 0.15],
        [width * 0.53, height * 0.54, width * 0.07, height * 0.15],
    ]

    mgDownPoints = [
        [width * 0.26, height * 0.79, width * 0.05, height * 0.1],
        [width * 0.36, height * 0.76, width * 0.05, height * 0.1],
        [width * 0.46, height * 0.73, width * 0.05, height * 0.1],
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

    sizeText("T(upward) = ", width * 0.05, height * 0.55, width * 0.03);
    sizeText("T(downward) = ", width * 0.05, height * 0.8, width * 0.03);

    for (let i = 0; i < plusUpward.length; i++) {
        sizeText(...plusUpward[i])
    }

    for (let i = 0; i < plusDownward.length; i++) {
        sizeText(...plusDownward[i])
    }

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

// Text Function 
function sizeText(label, xText, yText, size = width * 0.025) {
    push();
    textSize(size);
    text(label, xText, yText);
    pop();
}

function arrowRotation(xArrowAngle, yArrowAngle, arrowLength, label, deg) {
    push()
    translate(xArrowAngle, yArrowAngle)
    rotate(deg)
    drawArrow(0, 0, arrowLength, label)
    pop()
}

function drawArrow(xArrow, yArrow, arrowLength, label) {
    rectMode(CENTER);
    // Draw the arrow line
    line(xArrow, yArrow, xArrow, yArrow + arrowLength);
    sizeText(label, xArrow - 5, yArrow - 10);

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
            if (mouseX < initialPoints[i][0] + 20 &&
                mouseX > initialPoints[i][0] - 20 &&
                mouseY > (initialPoints[i][1]) &&
                mouseY < initialPoints[i][1] + initialPoints[i][2]
            ) {
                isDragging[i] = true;
            }
        }

        if (initialPoints[i][4] === 180) {
            if (
                mouseX < initialPoints[i][0] + 20 &&
                mouseX > initialPoints[i][0] - 20 &&
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

function magnet() {
    let initialPointsClone = [
        // Arrows arguments [x, y, arrowLength, label, degree]
        [width * 0.15, height * 0.1, width * 0.2, `t0`, 0],
        [width * 0.3, height * 0.3, width * 0.15, "", 180],
        [width * 0.35, height * 0.15, width * 0.15, "t1", 0],
        [width * 0.50, height * 0.30, width * 0.10, "", 180],
        [width * 0.55, height * 0.20, width * 0.10, "t2", 0],
        [width * 0.70, height * 0.30, width * 0.05, "", 180],
        [width * 0.75, height * 0.25, width * 0.05, "t3", 0]
    ];

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
                        initialPoints[i][0] = mgX;
                        initialPoints[i][1] = mgUpPoints[j][1];
                        break
                    } else {
                        // If not aligned with any magnetic point, reset the position
                        initialPoints[i][0] = initialPointsClone[i][0];
                        initialPoints[i][1] = initialPointsClone[i][1];
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
                            mgDownPoints[j][1] + mgDownPoints[j][3];
                        initialPoints[i][0] = mgX;
                        initialPoints[i][1] = mgY;
                        break;
                    } else {
                        // If not aligned with any magnetic point, reset the position
                        initialPoints[i][0] = initialPointsClone[i][0];
                        initialPoints[i][1] = initialPointsClone[i][1];
                    }
                }
            }
        }
    }
}

function verify() {
    if (initialPoints[0][0] > mgUpPoints[0][0] &&
        initialPoints[0][0] < mgUpPoints[0][0] + mgUpPoints[0][2] &&
        initialPoints[0][1] === mgUpPoints[0][1])

        if (initialPoints[2][0] > mgUpPoints[1][0] &&
            initialPoints[2][0] < mgUpPoints[1][0] + mgUpPoints[2][2] &&
            initialPoints[2][1] === mgUpPoints[1][1])

            if (initialPoints[4][0] > mgUpPoints[2][0] &&
                initialPoints[4][0] < mgUpPoints[2][0] + mgUpPoints[2][2] &&
                initialPoints[4][1] === mgUpPoints[2][1])

                if (initialPoints[6][0] > mgUpPoints[3][0] &&
                    initialPoints[6][0] < mgUpPoints[3][0] + mgUpPoints[3][2] &&
                    initialPoints[6][1] === mgUpPoints[3][1])

                    if (initialPoints[1][0] > mgDownPoints[0][0] &&
                        initialPoints[1][0] < mgDownPoints[0][0] + mgDownPoints[0][2] &&
                        initialPoints[1][1] === mgDownPoints[0][1] + mgDownPoints[0][3])

                        if (initialPoints[3][0] > mgDownPoints[1][0] &&
                            initialPoints[3][0] < mgDownPoints[1][0] + mgDownPoints[1][2] &&
                            initialPoints[3][1] === mgDownPoints[1][1] + mgDownPoints[0][3])

                            if (initialPoints[5][0] > mgDownPoints[2][0] &&
                                initialPoints[5][0] < mgDownPoints[2][0] + mgDownPoints[2][2] &&
                                initialPoints[5][1] === mgDownPoints[2][1] + mgDownPoints[2][3])
                                return true;
    return false;
}



function mouseReleased() {
    magnet()

    for (let i = 0; i < isDragging.length; i++) {
        isDragging[i] = false;
    }
}
