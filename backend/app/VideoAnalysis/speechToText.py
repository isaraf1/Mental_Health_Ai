import moviepy.editor as mp
import speech_recognition as sr

def video_to_audio(video_file, audio_file):
    # Extract audio from video
    video = mp.VideoFileClip(video_file)
    video.audio.write_audiofile(audio_file)

def audio_to_text(audio_file):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
    return text

# Driver:
# video_file = "C:/Users/avira/OneDrive/Pictures/Camera Roll/WIN_20240822_22_48_47_Pro.mp4"
# audio_file = "output_audio.wav"

# video_to_audio(video_file, audio_file)
# text_output = audio_to_text(audio_file)
# print("Transcript:\n", text_output)
