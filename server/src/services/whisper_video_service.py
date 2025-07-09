import sys
import os
import json
import whisper
import tempfile
import subprocess

def extract_audio(video_path: str) -> str:
    # Save audio to a temporary file
    temp_audio = tempfile.NamedTemporaryFile(suffix=".mp3", delete=False)
    audio_path = temp_audio.name
    temp_audio.close()

    # Extract audio using ffmpeg
    command = [
        "ffmpeg",
        "-i", video_path,
        "-q:a", "0",
        "-map", "a",
        "-y",  # overwrite without asking
        audio_path
    ]
    subprocess.run(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    return audio_path

def transcribe_audio(audio_path: str) -> str:
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result["text"]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Video file path not provided"}))
        sys.exit(1)

    video_path = sys.argv[1]

    try:
        audio_path = extract_audio(video_path)
        text = transcribe_audio(audio_path)
        os.remove(audio_path)
        print(json.dumps({"text": text}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
