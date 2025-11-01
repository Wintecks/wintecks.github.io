async function fetchVideoInfo(event) {
    event.preventDefault();

    document.getElementById('result_box').innerHTML = `
        <div class="cont_result">
            <div id="result">
                <p style="display: flex; justify-content: center;">Завантаження...</p>
            </div>
        </div>
    `

    resultDiv = document.getElementById('result');
    videoUrl = document.getElementById('video_url').value.trim();
    backendUrl = 'http://localhost:5000/api/get/info-video';

    if (!videoUrl) {
        resultDiv.innerHTML = '<p class="error">Будь ласка, введіть дійсне посилання.</p>';
        return;
    }

    try {
        // 1. Відправка запиту на бекенд (Node.js)
        response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: videoUrl })
        });

        data = await response.json();

        if (!response.ok) {
            // Обробка помилок, повернених бекендом
            resultDiv.innerHTML = `<p class="error">Помилка: ${data.error || 'Невідома помилка бекенду.'}</p>`;
            return;
        }

        // 2. Відображення отриманих даних
        resultDiv.innerHTML = `
            <div class="video_header">
                <img id="thumbnail" src="${data.thumbnail}" alt="Прев'ю відео">

                <div class="video_name">
                    <p><strong>Назва:</strong> ${data.title}</p>
                </div>
            </div>
            
            <div class="slider_cont">
                <div style="width: 200px; flex-grow: 1;">
                    <div class="slider_styled" id="video_time_slider"></div> 
                </div>
                <p>
                    <span id="start_time_text">0:00</span> - <span id="end_time_text">0:00</span>
                </p>
            </div>
        `;
        initTimeSlider(data.duration);

    } catch (error) {
        console.error('Помилка запиту до бекенду:', error);
        resultDiv.innerHTML = '<p class="error">Не вдалося з\'єднатися з сервером (перевірте, чи запущено Node.js).</p>';
    }
}

// Функція форматування: (MM:SS)
function formatTime(totalSeconds) {
    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = Math.floor(totalSeconds % 60);
    
    paddedSeconds = String(seconds).padStart(2, '0');
    
    // Якщо тривалість 1 година або більше, додаємо години (HH:MM:SS)
    if (hours > 0) {
        paddedMinutes = String(minutes).padStart(2, '0');
        return `${hours}:${paddedMinutes}:${paddedSeconds}`;
    }
    
    // Якщо менше години, залишаємо MM:SS
    return `${minutes}:${paddedSeconds}`;
}

// ГОЛОВНА ФУНКЦІЯ ІНІЦІАЛІЗАЦІЇ/ОНОВЛЕННЯ
function initTimeSlider(maxTimeSeconds) {

    slider = document.getElementById('video_time_slider');
    startTimeDisplay = document.getElementById('start_time_text');
    endTimeDisplay = document.getElementById('end_time_text');
    
    // Форматуємо максимальний час для відображення користувачу
    maxTimeString = formatTime(maxTimeSeconds);

    // Оновлення початкових значень на екрані
    startTimeDisplay.innerHTML = formatTime(0);
    endTimeDisplay.innerHTML = maxTimeString;
    
    // 4. ВИКЛИК СТВОРЕННЯ АБО ОНОВЛЕННЯ ПОВЗУНКА
    if (slider.noUiSlider) {
        // ОПТИМІЗАЦІЯ: Оновлюємо, якщо вже існує
        slider.noUiSlider.updateOptions({
            range: {
                'min': 0,
                'max': maxTimeSeconds
            },
            start: [0, maxTimeSeconds] 
        });
        
    } else {
        // СТВОРЕННЯ ПОВЗУНКА
        noUiSlider.create(slider, {
            start: [0, maxTimeSeconds], 
            connect: true, 
            step: 1, 
            range: {
                'min': 0,
                'max': maxTimeSeconds 
            },
            margin: 1
        });

        // ДОДАВАННЯ ОБРОБНИКА ПОДІЙ (лише при першому створенні)
        slider.noUiSlider.on('update', function (values, handle) {
            timeInSeconds = Math.round(values[handle]);
            formattedTime = formatTime(timeInSeconds); 

            if (handle === 0) {
                startTimeDisplay.innerHTML = formattedTime;
            } else {
                // Відображаємо оригінальний рядок MAX, якщо вибрано повний максимум
                if (timeInSeconds === maxTimeSeconds) {
                    endTimeDisplay.innerHTML = maxTimeString;
                } else {
                    endTimeDisplay.innerHTML = formattedTime;
                }
            }
        });
    }
}