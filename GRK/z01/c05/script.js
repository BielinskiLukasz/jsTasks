function setup() {
    createCanvas(800, 600);
    noLoop();

}

function draw() {
    <!-- niebo -->
    background(135, 206, 250);

    <!-- trawa -->
    var trawa = color(0, 100, 0);
    for (y = 400; y < height; y++) {
        for (x = 0; x < width; x++) {
            set(x, y, trawa);
        }
    }

    <!-- kwiaty -->
    for (i = 0; i < 1000; i++) {
        var rand_x = floor(random(0, width));
        var rand_y = floor(random(400, height));
        set(rand_x, rand_y, color(random(0, 255)))
    }

    <!-- fasada -->
    var fasada = color(139, 69, 19);
    for (y = 200; y < 400; y++) {
        for (x = 200; x < width - 200; x++) {
            set(x, y, fasada);
        }
    }

    <!-- dach -->
    var dach = color(250, 128, 114);
    var start_x = 125;
    var end_x = 675;
    for (y = 200; y > 50; y--) {
        for (x = start_x; x < end_x; x++) {
            set(x, y, dach);
        }
        start_x += 2;
        end_x -= 2;
    }

    updatePixels();
}