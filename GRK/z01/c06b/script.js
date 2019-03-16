const point1 = {x: 400, y: 100};
const point2 = {x: 200, y: 500};
const point3 = {x: 600, y: 500};

let cx = point1.x;
let cy = point1.y;

function setup() {

    createCanvas(800, 600);
    frameRate(25);
}

function draw() {

    // background(0, 0, 0);
    // stroke(255, 255, 255);

    point(point1.x, point1.y);
    point(point2.x, point2.y);
    point(point3.x, point3.y);

    let rand = floor(random(0, 3));

    if (rand === 0) {
        cx = (cx + point1.x) / 2;
        cy = (cy + point1.y) / 2;
    } else if (rand === 1) {
        cx = (cx + point2.x) / 2;
        cy = (cy + point2.y) / 2;
    } else {
        cx = (cx + point3.x) / 2;
        cy = (cy + point3.y) / 2;
    }

    point(cx, cy);

    updatePixels();
}