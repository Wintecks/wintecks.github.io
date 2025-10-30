let boxes = [];
let bsize = 60;
let amx, amy;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    stroke(0, 0, 0, 200);
    strokeWeight(0.5);

    rectMode(CENTER);
    ortho(-width / 2, width / 2, -height / 2, height / 2, 10, 2000);
    amx = Math.ceil(width / bsize + 1);
    amy = Math.ceil(height / bsize + 1)
    boxes = new Array(amx * amy).fill(400);
    fill(110);
}

function draw() {
    background(100);
    directionalLight(255, 255, 255, -PI * 0.3, PI * 0.3, -PI * 0.6);
    translate(0, -10, 250);
    rotateX(-0.2);
    rotateY(0.2);

    for (let x = 0; x < width + bsize; x += bsize) {
        for (let y = 0; y < height + bsize; y += bsize) {

            let h = noise(frameCount * 0.01, x / width * 10, y / height * 10) * 10 * 25;

            let offs = -35;
            if (mouseX + offs >= x - bsize / 2 && mouseX + offs <= x + bsize / 2 &&
                mouseY + offs >= y - bsize / 2 && mouseY + offs <= y + bsize / 2) {
                h = 400;
            }
            let idx = Math.round(x / bsize + (width / bsize) * (y / bsize));
            let k = boxes[idx] < h ? 0.4 : 0.02;
            boxes[idx] += (h - boxes[idx]) * k;
            push();
            translate(-width / 2 + x, -height / 2 + y);
            box(bsize, bsize, boxes[idx]);
            pop();
        }
    }
}