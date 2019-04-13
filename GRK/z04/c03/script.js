function makeVector(x, y) {
    return [x, y, 1];
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

console.log(makeVector(1, 2));
console.log(makeIdentityMatrix());
console.log(makeTranslationMatrix(3, 4));
console.log(makeScaleMatrix(5, 6));
console.log(makeRotationMatrix(7));
console.log(makeShearMatrix(8, 9));