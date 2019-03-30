function preload() {

}

function setup() {
    createCanvas(512, 512);
    background(255);

}

var x0 = -1;
var y0 = -1;
var x1 = -1;
var y1 = -1;

function mousePressed() {
    x0 = mouseX;
    y0 = mouseY;
}

function mouseDragged() {
    x1 = mouseX;
    y1 = mouseY;
    background(255);
    noStroke();
    fill('red');
    ellipse(x0 - 3, y0 - 3, 6);
    fill('green');
    ellipse(x1 - 3, y1 - 3, 6);
}

function mouseReleased() {
    background(255);
    loadPixels();
    draw_line();
    updatePixels();
}

function set_pixel(x, y, c) {
    idx = (y * 512 + x) * 4;
    pixels[idx] = c;
    pixels[idx + 1] = c;
    pixels[idx + 2] = c;
    pixels[idx + 3] = 255;
}

function draw_line() {
    x_decr = x1 < x0;
    dx = x_decr ? x0 - x1 : x1 - x0;

    y_decr = y1 < y0;
    dy = y_decr ? y0 - y1 : y1 - y0;

    switch_xy = dx < dy;
    if (switch_xy) {
        temp = x0;
        x0 = y0;
        y0 = temp;
        temp = x1;
        x1 = y1;
        y1 = temp;
        temp = dx;
        dx = dy;
        dy = temp;
        bool_temp = x_decr;
        x_decr = y_decr;
        y_decr = bool_temp;
    }

    Dp = 2 * dy - dx;
    Deq = 2 * dy;
    Dinc = 2 * dy - 2 * dx;

    D = Dp;
    y = y0;
    x = x0;
    while (x !== x1) {
        console.log('x = ' + x);
        console.log('y = ' + y);
        switch_xy ?
            set_pixel(y, x, 0) :
            set_pixel(x, y, 0);
        if (D < 0) {
            D += Deq;
        } else {
            D += Dinc;
            y_decr ? y-- : y++;
        }
        x_decr ? x-- : x++;
    }
}