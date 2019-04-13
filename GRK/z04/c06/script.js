var imgA;
var imgB;
var transformationMatrix = makeIdentityMatrix();
// showActualTransformationMatrix();
let inputTranslateX, inputTranslateY, buttonTranslate,
    inputScaleX, inputScaleY, buttonScale,
    inputRotateAngle, buttonRotete,
    inputShearX, inputShearY, buttonShear,
    inputParameter, inputParameterIndex, buttonParameter,
    buttonReset, matrixLabel;

function setup() {
    createCanvas(512, 512);
    background(255);
    imgA = createImage(512, 512);
    imgB = createImage(512, 512);
    imgA.loadPixels();
    imgB.loadPixels();
    var d = pixelDensity();
    for (var i = 0; i < 512 * 512 * 4 * d; i += 4) {
        imgA.pixels[i] = 240;
        imgA.pixels[i + 1] = 250;
        imgA.pixels[i + 2] = 240;
        imgA.pixels[i + 3] = 255;
        imgB.pixels[i] = 240;
        imgB.pixels[i + 1] = 240;
        imgB.pixels[i + 2] = 250;
        imgB.pixels[i + 3] = 255;
    }
    imgA.updatePixels();
    imgB.updatePixels();

    function createTranslateUI() {
        inputTranslateX = createInput();
        inputTranslateX.size(50, 15);
        inputTranslateX.position(530, 25);

        inputTranslateY = createInput();
        inputTranslateY.size(50, 15);
        inputTranslateY.position(inputTranslateX.x + inputTranslateX.width + 5, inputTranslateX.y);

        buttonTranslate = createButton('translate');
        buttonTranslate.size(100, 21);
        buttonTranslate.position(inputTranslateY.x + inputTranslateY.width + 5, inputTranslateX.y);
        buttonTranslate.mousePressed(translateAction);
    }

    createTranslateUI();

    function createScaleUI() {
        inputScaleX = createInput();
        inputScaleX.size(50, 15);
        inputScaleX.position(inputTranslateX.x, inputTranslateX.y + 25);

        inputScaleY = createInput();
        inputScaleY.size(50, 15);
        inputScaleY.position(inputScaleX.x + inputScaleX.width + 5, inputScaleX.y);

        buttonScale = createButton('scale');
        buttonScale.size(100, 21);
        buttonScale.position(inputScaleY.x + inputScaleY.width + 5, inputScaleX.y);
        buttonScale.mousePressed(scaleAction);
    }

    createScaleUI();

    function createRotateUI() {
        inputRotateAngle = createInput();
        inputRotateAngle.size(110, 15);
        inputRotateAngle.position(inputTranslateX.x, inputScaleX.y + 25);

        buttonRotete = createButton('rotate');
        buttonRotete.size(100, 21);
        buttonRotete.position(inputRotateAngle.x + inputRotateAngle.width + 5, inputRotateAngle.y);
        buttonRotete.mousePressed(rotateAction);
    }

    createRotateUI();

    function createShearUI() {
        inputShearX = createInput();
        inputShearX.size(50, 15);
        inputShearX.position(inputTranslateX.x, inputRotateAngle.y + 25);

        inputShearY = createInput();
        inputShearY.size(50, 15);
        inputShearY.position(inputShearX.x + inputShearX.width + 5, inputShearX.y);

        buttonShear = createButton('shear');
        buttonShear.size(100, 21);
        buttonShear.position(inputShearY.x + inputShearY.width + 5, inputShearX.y);
        buttonShear.mousePressed(shearAction);
    }

    createShearUI();

    function createSetParemeterUI() {
        inputParameter = createInput();
        inputParameter.size(50, 15);
        inputParameter.position(inputTranslateX.x, inputShearX.y + 25);

        inputParameterIndex = createInput();
        inputParameterIndex.size(50, 15);
        inputParameterIndex.position(inputParameter.x + inputParameter.width + 5, inputParameter.y);

        buttonParameter = createButton('set');
        buttonParameter.size(100, 21);
        buttonParameter.position(inputParameterIndex.x + inputParameterIndex.width + 5, inputParameter.y);
        buttonParameter.mousePressed(setParameterAction);
    }

    createSetParemeterUI();

    matrixLabel = createElement('h3', transformationMatrix);
    matrixLabel.position(25, 525);

    buttonReset = createButton('reset');
    buttonReset.position(matrixLabel.x, matrixLabel.y + 50);
    buttonReset.mousePressed(grkResetTransformationMatrix);
}

function translateAction() {
    grkTranslateTransformationMatrix(inputTranslateX.value(), inputTranslateY.value());
    inputTranslateX.value('');
    inputTranslateY.value('');
}

function scaleAction() {
    grkScaleTransformationMatrix(inputScaleX.value(), inputScaleY.value());
    inputScaleX.value('');
    inputScaleY.value('');
}

function rotateAction() {
    grkRotateTransformationMatrix(inputRotateAngle.value());
    inputRotateAngle.value('');
}

function shearAction() {
    grkShearTransformationMatrix(inputShearX.value(), inputShearY.value());
    inputShearX.value('');
    inputShearY.value('');
}

function setParameterAction() {
    grkSetTransformMatrixParameter(inputParameter.value(), inputParameterIndex.value());
    inputParameter.value('');
    inputParameterIndex.value('');
}

function draw() {
    if (!keyIsDown(32)) {
        image(imgA, 0, 0);
        text('Image A', 10, 20);
    } else {
        image(imgB, 0, 0);
        text('Image B', 10, 20);
    }
}

function makeVector(x, y) {
    return [x, y, 1];
}

function drawVector(img, vec) {
    img.set(vec[0], vec[1], 0);
    img.updatePixels();
}

function mouseDragged() {
    drawVector(imgA, makeVector(mouseX, mouseY));
    drawVector(imgB, transformVector(transformationMatrix, makeVector(mouseX, mouseY)));
}

function makeIdentityMatrix() {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
}

function makeTranslationMatrix(tx, ty) {
    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]];
}

function makeScaleMatrix(sx, sy) {
    return [[sx, 0, 0], [0, sy, 0], [0, 0, 1]];
}

function makeRotationMatrix(angle) {
    radius = angle / 180 * Math.PI;
    return [[Math.cos(radius), -Math.sin(radius), 0], [Math.sin(radius), Math.cos(radius), 0], [0, 0, 1]];
}

function makeShearMatrix(Shx, Shy) {
    return [[1, Shx, 0], [Shy, 1, 0], [0, 0, 1]];
}

function transformVector(matrix, vec) {
    return [matrix[0][0] * vec[0] + matrix[0][1] * vec[1] + matrix[0][2] * vec[2],
        matrix[1][0] * vec[0] + matrix[1][1] * vec[1] + matrix[1][2] * vec[2],
        matrix[2][0] * vec[0] + matrix[2][1] * vec[1] + matrix[2][2] * vec[2]];
}

function multiplicationMatrix(matrix1, matrix2) {
    return [[matrix1[0][0] * matrix2[0][0] + matrix1[0][1] * matrix2[1][0] + matrix1[0][2] * matrix2[2][0],
        matrix1[0][0] * matrix2[0][1] + matrix1[0][1] * matrix2[1][1] + matrix1[0][2] * matrix2[2][1],
        matrix1[0][0] * matrix2[0][2] + matrix1[0][1] * matrix2[1][2] + matrix1[0][2] * matrix2[2][2]],
        [matrix1[1][0] * matrix2[0][0] + matrix1[1][1] * matrix2[1][0] + matrix1[1][2] * matrix2[2][0],
            matrix1[1][0] * matrix2[0][1] + matrix1[1][1] * matrix2[1][1] + matrix1[1][2] * matrix2[2][1],
            matrix1[1][0] * matrix2[0][2] + matrix1[1][1] * matrix2[1][2] + matrix1[1][2] * matrix2[2][2]],
        [matrix1[2][0] * matrix2[0][0] + matrix1[2][1] * matrix2[1][0] + matrix1[2][2] * matrix2[2][0],
            matrix1[2][0] * matrix2[0][1] + matrix1[2][1] * matrix2[1][1] + matrix1[2][2] * matrix2[2][1],
            matrix1[2][0] * matrix2[0][2] + matrix1[2][1] * matrix2[1][2] + matrix1[2][2] * matrix2[2][2]]];
}

function grkResetTransformationMatrix() {
    transformationMatrix = makeIdentityMatrix();
    showActualTransformationMatrix();
}

function grkTransformMatrix(matrix) {
    transformationMatrix = multiplicationMatrix(transformationMatrix, matrix);
    showActualTransformationMatrix();
}

function grkTranslateTransformationMatrix(tx, ty) {
    transformationMatrix = multiplicationMatrix(transformationMatrix, makeTranslationMatrix(tx, ty));
    showActualTransformationMatrix();
}

function grkScaleTransformationMatrix(sx, sy) {
    transformationMatrix = multiplicationMatrix(transformationMatrix, makeScaleMatrix(sx, sy));
    showActualTransformationMatrix();
}

function grkRotateTransformationMatrix(angle) {
    transformationMatrix = multiplicationMatrix(transformationMatrix, makeRotationMatrix(angle));
    showActualTransformationMatrix();
}

function grkShearTransformationMatrix(Shx, Shy) {
    transformationMatrix = multiplicationMatrix(transformationMatrix, makeShearMatrix(Shx, Shy));
    showActualTransformationMatrix();
}

function grkSetTransformMatrix(matrix) {
    transformationMatrix = matrix;
    showActualTransformationMatrix();
}

function grkSetTransformMatrixParameter(parameter, i) {
    transformationMatrix[parseInt(i / 3)][parseInt(i % 3)] = parameter;
    showActualTransformationMatrix();
}

function showActualTransformationMatrix() {
    console.log("Actual transformation matrix is: ");
    console.log(transformationMatrix);
    matrixLabel.html(transformationMatrix);
}