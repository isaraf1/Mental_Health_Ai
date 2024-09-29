from rest_framework import serializers
from .models import UserProfile, Video, UserVideo, UserQuestionnaire

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'name', 'email', 'created_at']

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'user', 'video_file', 'transcript', 'emotions_summary', 'uploaded_at']


class UserVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVideo
        fields = ['user', 'video', 'transcript' , 'emotions']  # Ensure these fields match your model

class UserQuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuestionnaire
        fields = '__all__'

