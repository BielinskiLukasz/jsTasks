function preload() {
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
}

function setup() {
    createCanvas(512, 512);
    img.resize(256, 256);

    img_h = createImage(256, 256);
    img_s = createImage(256, 256);
    img_v = createImage(256, 256);

    img.loadPixels();
    img_h.loadPixels();
    img_s.loadPixels();
    img_v.loadPixels();

    for (x = 0; x < img.width; x++) {
        for (y = 0; y < img.height; y++) {
            pos = 4 * (y * img.width + x);

            r = img.pixels[pos] / 255;
            g = img.pixels[pos + 1] / 255;
            b = img.pixels[pos + 2] / 255;

            cmax = Math.max(r, g, b);
            cmin = Math.min(r, g, b);

            v = cmax;
            v = (cmax + cmin) / 2;
            img_v.set(x, y, 255 * v);

            // img_h.pixels[pos] = h
            // img_s.pixels[pos + 1] = s
            // img_v.pixels[pos + 2] = v
            img_h.pixels[pos + 3] = 255;
            img_s.pixels[pos + 3] = 255;
            img_v.pixels[pos + 3] = 255;
        }
    }

    img_h.updatePixels();
    img_s.updatePixels();
    img_v.updatePixels();

    image(img_h, 0, 0);
    image(img_s, 256, 0);
    image(img_v, 0, 256);
    image(img, 256, 256);
}