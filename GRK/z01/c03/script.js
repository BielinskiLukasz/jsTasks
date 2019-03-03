function setup() {
    createCanvas(800, 600);
    noLoop();

}

function draw() {
    background(0);
    var col = 0;
    for (y = 0; y < height; y++) {
        col = 0;
        for (x = 0; x < width; x++) {
            set(x, y, x / width * 256);
        }
    }
    updatePixels();
}