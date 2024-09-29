import cv2
from deepface import DeepFace

def analyze_emotions(video_file, interval=30):
    """
    Analyze emotions in a video file at specified intervals.

    Parameters:
    video_file (str): Path to the video file.
    interval (int): The number of frames to skip between analyses (e.g., 30 means analyze every 30th frame).

    Returns:
    list: A list of detected dominant emotions.
    """
    cap = cv2.VideoCapture(video_file)
    emotions_list = []
    frame_count = 0
    print("Analysis in progress")
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Only analyze the frame if it's on the interval
        if frame_count % interval == 0:
            try:
                analysis_result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
                
                # Check if the result is a list (in case multiple faces are detected)
                if isinstance(analysis_result, list):
                    dominant_emotion = analysis_result[0]['dominant_emotion']
                else:
                    dominant_emotion = analysis_result['dominant_emotion']
                    
                emotions_list.append(dominant_emotion)
            except Exception as e:
                print(f"Error analyzing frame {frame_count}: {e}")

        frame_count += 1

    cap.release()
    cv2.destroyAllWindows()

    return emotions_list

def summarize_emotions(emotions_list):
    from collections import Counter
    emotion_counter = Counter(emotions_list)
    return dict(emotion_counter)

# Driver
# video_file = "C:/Users/avira/OneDrive/Pictures/Camera Roll/WIN_20240822_22_48_47_Pro.mp4"
# interval = 5 #every interval no of frames one is selected
# emotions = analyze_emotions(video_file, interval)
# summary = summarize_emotions(emotions)

# print("Emotion Summary:\n", summary)
