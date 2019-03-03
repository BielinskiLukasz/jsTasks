function setup() {
    createCanvas(800, 600);
    noLoop();

}

function draw() {
    background(0);
    var col = 0;
    var dx = width / 2;
    var dy = height / 2;
    var red = 0;
    var green = 255;
    var blue = 0;
    for (y = 0; y < height; y++) {
        col = 0;
        for (x = 0; x < width; x++) {
            dx = x - width / 2;
            if (dx < 0) {
                dx = -dx;
            }
            dy = y - height / 2;
            if (dy < 0) {
                dy = -dy;
            }
            d = sqrt(dx * dx + dy * dy);
            if (d < 255) {
                red = 255 - d;
                green = 0 + d;
            }
            blue = (x / width + y / height) / 2 * 256;
            set(x, y, color(red, green, blue));
        }
    }
    updatePixels();
}