import sys
import json
import os
import subprocess
import whisper
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound, VideoUnavailable

def download_audio(video_url: str) -> str:
    # Download the audio as MP3 using yt-dlp
    subprocess.call([
    sys.executable, "-m", "yt_dlp",
    "-x", "--audio-format", "mp3",
    "-o", "audio.%(ext)s",
    video_url
])
    return "audio.mp3"

def transcribe_audio(path: str) -> str:
    # Load Whisper model (base is accurate + fast enough)
    model = whisper.load_model("base")
    result = model.transcribe(path)  # Auto language detection
    return result["text"]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "YouTube URL not provided"}))
        sys.exit(1)

    video_url = sys.argv[1]
    video_id = video_url.split("v=")[-1].split("&")[0]

    try:
        # Try fetching official transcript from YouTube
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        full_text = " ".join([item["text"] for item in transcript])
        print(json.dumps({"text": full_text}))

    except (TranscriptsDisabled, NoTranscriptFound, VideoUnavailable):
        try:
            # Fall back to Whisper transcription
            audio_file = download_audio(video_url)
            text = transcribe_audio(audio_file)
            print(json.dumps({"text": text}))
            os.remove(audio_file)
        except Exception as e:
            print(json.dumps({"error": f"Whisper transcription failed: {str(e)}"}))
