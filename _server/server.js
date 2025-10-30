// server.js

const express = require('express');
const { exec } = require('child_process');
const cors = require('cors'); // Для дозволу запитів з фронтенду
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Для парсингу JSON у тілі запиту

app.post('/api/get-info', (req, res) => {
    const videoUrl = req.body.url;

    if (!videoUrl) {
        return res.status(400).json({ error: 'Потрібно вказати URL відео.' });
    }

    // Використання yt-dlp для отримання інформації
    // --print-json виводить метадані в JSON-форматі
    const command = `yt-dlp --dump-json --no-warnings ${videoUrl}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`yt-dlp помилка: ${error.message}`);
            // Повертаємо помилку клієнту
            return res.status(500).json({ error: 'Помилка обробки відео. Перевірте посилання.' });
        }
        
        try {
            const info = JSON.parse(stdout);
            
            // Форматування тривалості у HH:MM:SS (як ми обговорювали)
            const durationSeconds = info.duration;
            let durationFormatted = 'N/A';

            if (durationSeconds) {
                const hours = Math.floor(durationSeconds / 3600);
                const minutes = Math.floor((durationSeconds % 3600) / 60);
                const seconds = durationSeconds % 60;
                
                if (hours > 0) {
                    durationFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                } else {
                    durationFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                }
            }

            // Відправка вибраних даних на фронтенд
            res.json({
                title: info.title,
                duration: durationFormatted,
                thumbnail: info.thumbnail,
                uploader: info.uploader
            });

        } catch (e) {
            console.error('Помилка парсингу JSON:', e);
            res.status(500).json({ error: 'Помилка парсингу метаданих.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});