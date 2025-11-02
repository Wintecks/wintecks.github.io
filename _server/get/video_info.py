from yt_dlp import YoutubeDL

def video_info(video_url: str):
    ydl_opts = {
        'skip_download': True,
        'quiet': True,
        'force_json': True,
        'no_warnings': True
    }
    try:
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            
<<<<<<< HEAD
            video_only_formats = {}
            best_audio_format = None
            
            # 1. Перебираємо всі формати для фільтрації та пошуку найкращого аудіо
            for f in info.get('formats', []):
                format_id = f.get('format_id')
                vcodec = f.get('vcodec')
                acodec = f.get('acodec')
                height = f.get('height')
                abr = f.get('abr')

                # A. Фільтрація форматів лише відео
                if vcodec != 'none' and acodec == 'none' and height is not None and height > 0:
                    quality_key = f"{height}p"
                    
                    video_only_formats[quality_key] = format_id

                # B. Пошук найкращого формату лише аудіо
                elif vcodec == 'none' and acodec != 'none' and abr is not None:
                    # Порівнюємо бітрейти (abr) для визначення 'найкращого'
                    if best_audio_format is None or abr > best_audio_format.get('abr', 0):
                        best_audio_format = f
            
            # 2. Сортування відео-якостей від високої до низької
            sorted_video_formats = dict(sorted(
                video_only_formats.items(), 
                key=lambda item: int(item[0].replace('p', '')), 
                reverse=True
            ))

            if best_audio_format:
                audio_id = best_audio_format.get('format_id')
                
                sorted_video_formats["audio-only"] = audio_id
                
            
            # 4. Вибірка та повернення результату
=======
            unique_qualities = set()
            
            # Фільтруємо формати:
            for f in info.get('formats', []):
                # 1. Беремо лише ті формати, які мають відео (vcodec не 'none')
                # 2. Переконуємося, що роздільна здатність (height) є числом і більша за 0
                if f.get('vcodec') != 'none' and f.get('height') is not None and f.get('height') > 0:
                    # Форматуємо значення як '360p', '720p' тощо
                    quality_string = f"{f['height']}p"
                    unique_qualities.add(quality_string)

            # Перетворюємо множину назад у список та сортуємо
            # Сортування: перетворюємо '360p' на число 360 для коректного сортування
            sorted_qualities = sorted(
                list(unique_qualities), 
                key=lambda q: int(q.replace('p', '')), 
                reverse=True # Сортуємо від високої якості до низької
            )
            
>>>>>>> 2f6afcb8c8bc49b71fc2fb6f5492c961728da93b
            return {
                'title': info.get('title'),
                'duration': info.get('duration'),
                'thumbnail': info.get('thumbnail'),
                'uploader': info.get('uploader'),
<<<<<<< HEAD
                'format': sorted_video_formats
=======
                'formats': sorted_qualities
>>>>>>> 2f6afcb8c8bc49b71fc2fb6f5492c961728da93b
            }
    except Exception:
        return {"error": Exception}
    
if __name__ == '__main__':

    print(video_info("https://www.youtube.com/watch?v=dQw4w9WgXcQ"))