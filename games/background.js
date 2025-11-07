let boxes = [];
let bsize = 60;
let amx, amy;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    stroke(0, 0, 0, 200);
    strokeWeight(0.5);

    rectMode(CENTER);
    initializeGrid(); // Викликаємо ініціалізацію сітки
    fill(110);
}

function initializeGrid() {
    // **ВАЖЛИВО:** Оновлюємо ортографічну проєкцію після зміни розміру
    ortho(-width / 2, width / 2, -height / 2, height / 2, 10, 2000); 
    
    // Перерахунок розмірів сітки
    amx = Math.ceil(width / bsize + 1);
    amy = Math.ceil(height / bsize + 1);
    
    // Ініціалізація масиву боксів
    // Примітка: При зміні розміру дані *boxes* скидаються до початкового значення (400)
    boxes = new Array(amx * amy).fill(400); 
}

function windowResized() {
    // 1. Зміна розміру канвасу
    resizeCanvas(windowWidth, windowHeight); 
    
    // 2. Переініціалізація параметрів 3D-світу та сітки
    initializeGrid(); 
}

function draw() {
    background(100);
    directionalLight(255, 255, 255, -PI * 0.3, PI * 0.3, -PI * 0.6);
    translate(0, -10, 250);
    rotateX(-0.2);
    rotateY(0.2);

    // В циклі варто використовувати amx та amy для перевірки, щоб не виходити за межі масиву boxes, 
    // але для візуального відображення ви залишаєте width та height (що є ОК)

    for (let x = 0; x < width + bsize; x += bsize) {
        for (let y = 0; y < height + bsize; y += bsize) {
            // ... решта вашої логіки залишається незмінною
            let h = noise(frameCount * 0.01, x / width * 10, y / height * 10) * 10 * 25;

            let offs = -35;
            if (mouseX + offs >= x - bsize / 2 && mouseX + offs <= x + bsize / 2 &&
                mouseY + offs >= y - bsize / 2 && mouseY + offs <= y + bsize / 2) {
                h = 400;
            }
            
            // ВАЖЛИВО: Оновлення індексу тепер залежить від amx (width/bsize + 1)
            let idx_x = Math.floor(x / bsize);
            let idx_y = Math.floor(y / bsize);
            let idx = idx_x + idx_y * amx; // Перерахунок індексу

            // Перевірка, щоб не виходити за межі масиву boxes
            if (idx >= 0 && idx < boxes.length) {
                let k = boxes[idx] < h ? 0.4 : 0.02;
                boxes[idx] += (h - boxes[idx]) * k;
                push();
                translate(-width / 2 + x, -height / 2 + y);
                box(bsize, bsize, boxes[idx]);
                pop();
            }
        }
    }
}