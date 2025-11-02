<<<<<<< HEAD
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 340,
      "density": {
        "enable": true,
        "value_area": 1600
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 4,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
=======
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
>>>>>>> 2f6afcb8c8bc49b71fc2fb6f5492c961728da93b
