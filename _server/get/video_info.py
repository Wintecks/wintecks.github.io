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
            
            return {
                'title': info.get('title'),
                'duration': info.get('duration'),
                'thumbnail': info.get('thumbnail'),
                'uploader': info.get('uploader'),
                'formats': sorted_qualities
            }
    except Exception:
        return {"error": Exception}
    
if __name__ == '__main__':

    print(video_info("https://www.youtube.com/watch?v=dQw4w9WgXcQ"))