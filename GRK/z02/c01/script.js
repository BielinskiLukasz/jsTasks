function preload() {
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
    createCanvas(512, 512);
    img.resize(256, 256);

    img_r1 = createImage(256, 256);
    img_r2 = createImage(256, 256);
    img_r3 = createImage(256, 256);

    img.loadPixels();
    img_r1.loadPixels();
    img_r2.loadPixels();
    img_r3.loadPixels();

    for (x = 0; x < img.width; x++) {
        for (y = 0; y < img.height; y++) {
            pos = 4 * (y * img.width + x);
            img_r1.pixels[pos] = img.pixels[pos]; //to jest wartość dla R
            img_r2.pixels[pos + 1] = img.pixels[pos + 1]; //to jest wartość dla G
            img_r3.pixels[pos + 2] = img.pixels[pos + 2]; //to jest wartość dla B
            img_r1.pixels[pos + 3] = 255;
            img_r2.pixels[pos + 3] = 255;
            img_r3.pixels[pos + 3] = 255;
        }
    }

    img_r1.updatePixels();
    img_r2.updatePixels();
    img_r3.updatePixels();

    img.updatePixels();

    image(img_r1, 0, 0);
    image(img_r2, 256, 0);
    image(img_r3, 0, 256);
    image(img, 256, 256);
}