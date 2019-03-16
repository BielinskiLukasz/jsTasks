function preload() {
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
    createCanvas(256, 256);
    img.filter('gray');
    img.loadPixels();

    var tablica = new Array(256);
    tablica.fill(0);

    for (x = 0; x < img.width; x++) {
        for (y = 0; y < img.height; y++) {
            pos = 4 * (y * img.width + x);
            tablica[img.pixels[pos]]++;
        }
    }

    background(256, 256, 256);
    stroke(0, 0, 0);

    max = Math.max.apply(Math, tablica);
    for (i = 0; i < 256; i++) {
        h = tablica[i] / max * 256 * 10;
        line(i, 256, i, 256 - h);
    }

    updatePixels();
}