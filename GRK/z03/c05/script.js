function setup() {
    createCanvas(512, 512);
    background(255);
}

var last_x = -1;
var last_y = -1;

function mouseDragged() {
    if (mouseButton != LEFT) return;
    if (last_x > 0) {
        line(last_x, last_y, mouseX, mouseY);
    }
    last_x = mouseX;
    last_y = mouseY;
}

function mouseReleased() {
    last_x = last_y = -1;
    if (mouseButton == RIGHT) {
        loadPixels();
        flood_fill(mouseX, mouseY);
        updatePixels();
    }
}

function set_pixel(x, y, c) {
    idx = (y * 512 + x) * 4;
    pixels[idx] = c;
    pixels[idx + 1] = c;
    pixels[idx + 2] = c;
    pixels[idx + 3] = 255;
}

function get_pixel(x, y) {
    idx = (y * 512 + x) * 4;
    return pixels[idx];
}

//właściwa funkcja do wypełniania
function flood_fill(x, y) {
    stos = [];
    stos.push([x, y]);

    console.log('stos length before: ' + stos.length);
    console.log(stos);

    save_me = 10000;
    while (stos.length > 0 && save_me > 0) {
        [x1, y1] = stos.pop();
        if (x1 > 512 || y1 > 512) continue;

        pixel_color = get_pixel(x1, y1);
        console.log('color before: ' + pixel_color);
        if (pixel_color !== 255) continue;

        set_pixel(x1, y1, 200);
        stos.push([x1, y1 + 1]);
        stos.push([x1, y1 - 1]);
        stos.push([x1 + 1, y1]);
        stos.push([x1 - 1, y1]);

        updatePixels();
        console.log('color after: ' + pixel_color);

        console.log('stos length after: ' + stos.length);
        console.log(stos);

        save_me--;
        console.log('save me please: ' + stos.length);
    }

}