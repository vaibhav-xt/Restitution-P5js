const widthHeight = 500;
let initialPoints = [];
let dotted_1;
let dotted_2;
let dotted_3;
let dotted_4;

let ballPathFlag = {};
let button;

// Vales 
let val_1;
let val_2;
let val_3;
let val_4;

function setup() {
    createCanvas(widthHeight, widthHeight);
    background(220);
    angleMode(DEGREES);


    initialPoints = [
        // Arrows arguments [x, y, arrowLength, label, degree]
        [width * 0.15, height * 0.15, width * 0.2, `t0`, 0, 0],
        [width * 0.3, height * 0.35, width * 0.15, "", 180, 180],
        [width * 0.35, height * 0.20, width * 0.15, "et0", 0, 0],
        [width * 0.50, height * 0.35, width * 0.10, "", 180, 180],
        [width * 0.55, height * 0.25, width * 0.10, "(e^2)t0", 0, 0],
        [width * 0.70, height * 0.35, width * 0.05, "", 180, 180],
        [width * 0.75, height * 0.30, width * 0.05, "(e^n)t0", 0, 0]
    ]

    // Input Boxes
    inputValue(width * 0.3, height * 0.53, "val_1");
    inputValue(width * 0.3, height * 0.63, "val_2");
    inputValue(width * 0.3, height * 0.73, "val_3");
    // inputValue(width * 0.3, height * 0.83, "val_3");


    dotted_1 = loadImage("./images/dotted_1.svg")
    dotted_2 = loadImage("./images/dotted_2.svg")
    dotted_3 = loadImage("./images/dotted_3.svg")
    dotted_4 = loadImage("./images/dotted_4.svg")

    button = createButton("Submit")
    button.position(width * 0.7, height * 0.8)
    button.class('button')
}

function inputValue(x, y, whichValue) {
    const inp = createInput('');
    inp.position(x, y);
    inp.style("width", `${width * 0.06}px`);
    inp.input(function () {
        if (whichValue === "val_1") val_1 = inp.value();
        if (whichValue === "val_2") val_2 = inp.value();
        if (whichValue === "val_3") val_3 = inp.value();
    });
}

function draw() {
    background(220);

    // arrows
    // for (let i = 0; i < initialPoints.length; i++) {
    //     arrowRotation(...initialPoints[i])
    // }

    arrowRotation(...initialPoints[0])

    if (val_1 === "e") ballPathFlag.val_1 = true;
    if (val_2 === "e^2") ballPathFlag.val_2 = true;
    if (val_3 === "e^n") ballPathFlag.val_3 = true;

    image(dotted_1, width * 0.127, height * 0.09, width * 0.1, height * 0.28);
    if (ballPathFlag.val_1) {
        arrowRotation(...initialPoints[1])
        arrowRotation(...initialPoints[2])
        image(dotted_2, width * 0.23, height * 0.12, width * 0.19, height * 0.25);

        if (!ballPathFlag.val_2) circle(width * 0.43, height * 0.35, width * 0.06)

        if (ballPathFlag.val_2) {
            arrowRotation(...initialPoints[3])
            arrowRotation(...initialPoints[4])
            image(dotted_3, width * 0.422, height * 0.154, width * 0.19, height * 0.22);
            if (!ballPathFlag.val_3) circle(width * 0.63, height * 0.35, width * 0.06)

            if (ballPathFlag.val_3) {
                arrowRotation(...initialPoints[5])
                arrowRotation(...initialPoints[6])
                image(dotted_4, width * 0.615, height * 0.225, width * 0.19, height * 0.15);
                circle(width * 0.81, height * 0.35, width * 0.06)
            }
        }
    }


    sizeText("T1 =         t0", width * 0.2, height * 0.55, 0, width * 0.04)
    sizeText("T2 =         t0", width * 0.2, height * 0.65, 0, width * 0.04)
    sizeText("Tn =         t0", width * 0.2, height * 0.75, 0, width * 0.04)

    if (!ballPathFlag.val_1) circle(width * 0.153, height * 0.1, width * 0.06)

    button.mousePressed(() => {
        if (ballPathFlag.val_1 && ballPathFlag.val_2 && ballPathFlag.val_3) {
            alert("Welldone!")
        } else {
            alert("Try again!")
        }
    })
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
    if (textDeg === 0) {
        sizeText(label, label === "t0" ? xArrow : xArrow - width * 0.05, yArrow + arrowLength + height * 0.05, textDeg);
    }
    if (textDeg === 180) {
        sizeText(label, xArrow + width * 0.05, yArrow - height * 0.04, textDeg);
    }

    // Calculate arrowhead coordinates
    let arrowSize = 10;
    let arrowX1 = xArrow - arrowSize / 2;
    let arrowX2 = xArrow + arrowSize / 2;
    let arrowY = yArrow + arrowLength;

    // Draw the arrowhead
    fill(0);
    triangle(arrowX1, arrowY, arrowX2, arrowY, xArrow, arrowY + arrowSize);
}