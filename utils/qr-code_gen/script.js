document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('gen_btn').addEventListener('click', () => {

        document.getElementById('qr_box_2').innerHTML = `
            <div class="canvas_box">
                <canvas id="qrcode"></canvas>
                <button id="download_qr" class="overlay-button">
                </button>
            </div>
        `

        const canvasElement = document.getElementById('qrcode');

        // Створюємо QR-код
        const qr = new QRious({ 
            element: canvasElement,
            value: document.getElementById('input').value,
            size: 250, 
            level: 'H' 
        });

        // 2. Обробник натискання кнопки "Завантажити"
        document.getElementById('download_qr').addEventListener('click', () => {
            
            // Отримуємо дані зображення з Canvas у форматі Base64 (PNG)
            // Метод .toDataURL() є стандартним для Canvas
            const dataURL = canvasElement.toDataURL("image/png");

            // 3. Створюємо тимчасове посилання <a>
            const link = document.createElement('a');
            
            // Встановлюємо атрибут 'href' з даними зображення
            link.href = dataURL;
            
            // Встановлюємо атрибут 'download', який змушує браузер завантажити файл
            link.download = document.getElementById('input').value + '_qrcode.png';
            
            // 4. Імітуємо натискання на посилання
            document.body.appendChild(link);
            link.click();
            
            // 5. Видаляємо посилання після використання
            document.body.removeChild(link);
            
            console.log("Завантаження QR-коду розпочато.");
        });
    });
});