from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, VideoViewSet, UploadVideoView, UserQuestionnaireCreateView, get_matched_professionals

router = DefaultRouter()
router.register(r'users', UserProfileViewSet)
# router.register(r'videos', VideoViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('api/upload-video/', UploadVideoView.as_view(), name='upload-video'),
    path('api/questionnaire/', UserQuestionnaireCreateView.as_view(), name='questionnaire-create'),
    # path('api/matched-professionals/<int:questionnaire_id>/',get_matched_professionals, name='matched_professionals'),
    path('api/matched-professionals/',get_matched_professionals, name='matched_professionals'),
]

