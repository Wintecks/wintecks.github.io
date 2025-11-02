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
            return {
                'title': info.get('title'),
                'duration': info.get('duration'),
                'thumbnail': info.get('thumbnail'),
                'uploader': info.get('uploader'),
                'format': sorted_video_formats
            }
    except Exception:
        return {"error": Exception}
    
if __name__ == '__main__':

    print(video_info("https://www.youtube.com/watch?v=dQw4w9WgXcQ"))