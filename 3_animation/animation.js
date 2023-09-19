const widthHeight = 500;
let val_1 = 0;
let val_2 = 0;
let val_3 = 0;
let val_4 = 0;
let val_5 = 0;
let val_6 = 0;
let val_7 = 0;
let val_8 = 0;
let val_9 = 0;
let button;

function setup() {
    createCanvas(widthHeight, widthHeight);

    inputValue(width * 0.23, height * 0.28, "val_1");
    inputValue(width * 0.36, height * 0.28, "val_2");

    inputValue(width * 0.23, height * .48, "val_3");
    inputValue(width * 0.37, height * 0.48, "val_4");

    inputValue(width * 0.23, height * .54, "val_5");
    inputValue(width * 0.37, height * 0.54, "val_6");

    inputValue(width * 0.23, height * 0.7, "val_7");
    inputValue(width * 0.325, height * 0.7, "val_8");
    inputValue(width * 0.285, height * 0.77, "val_8");

    button = createButton("Submit")
    button.position(width * 0.7, height * 0.8)
    button.mousePressed(() => alert("hello"))

}

function inputValue(x, y, whichValue) {
    const inp = createInput('', 'number');
    inp.position(x, y);
    inp.style("width", `${width * 0.06}px`);
    inp.input(function () {
        if (whichValue === "val_1") val_1 = inp.value();
        if (whichValue === "val_2") val_2 = inp.value();
        if (whichValue === "val_3") val_3 = inp.value();
        if (whichValue === "val_4") val_4 = inp.value();
        if (whichValue === "val_5") val_5 = inp.value();
        if (whichValue === "val_6") val_6 = inp.value();
        if (whichValue === "val_7") val_7 = inp.value();
        if (whichValue === "val_8") val_8 = inp.value();
        if (whichValue === "val_9") val_9 = inp.value();
    });
}

function draw() {
    background(220)
    // console.log("val_1", val_1);
    // console.log("val_2", val_2);
    // console.log("val_3", val_3);
    // console.log("val_4", val_4);
    // console.log("val_5", val_5);
    // console.log("val_6", val_6);
    // console.log("val_7", val_7);
    // console.log("val_8", val_8);
    // console.log("val_9", val_9);
    // Text 
    displayText("T =", width * 0.1, height * 0.3, width * 0.05)
    displayText("+", width * 0.3, height * 0.3, width * 0.05)

    displayText("T =", width * 0.1, height * 0.53, width * 0.05)
    displayText("+", width * 0.3, height * 0.53, width * 0.05)
    line(width * 0.21, height * 0.515, width * 0.28, height * 0.515)
    line(width * 0.35, height * 0.515, width * 0.43, height * 0.515)

    displayText("T =", width * 0.1, height * 0.75, width * 0.05)
    displayText("(      )", width * 0.29, height * 0.72, width * 0.05)
    displayText("(      )", width * 0.25, height * 0.79, width * 0.05)
    line(width * 0.21, height * 0.74, width * 0.4, height * 0.74)
}

function displayText(label, xText, yText, size = width * 0.025) {
    push();
    textSize(size);
    translate(xText, yText)
    text(label, 0, 0);
    pop();
}