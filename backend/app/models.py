from django.db import models

class UserProfile(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Video(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    video_file = models.FileField(upload_to='videos/')
    transcript = models.TextField(blank=True, null=True)
    emotions_summary = models.JSONField(blank=True, null=True)  # Store as JSON
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Video {self.id} by {self.user.name}"
    

class UserVideo(models.Model):
    user = models.CharField(max_length=100)
    video = models.FileField(upload_to='videos/')
    transcript = models.TextField(blank=True, null=True)
    emotions = models.JSONField(blank=True, null=True)


    def __str__(self):
        return self.user
    
class UserQuestionnaire(models.Model):
    # user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    user=models.CharField(max_length=100)
    typeOfTherapy=models.CharField(max_length=100)
    sleepingHabits=models.CharField(max_length=100)
    physicalHealth=models.CharField(max_length=100)
    gender=models.CharField(max_length=100)
    providerGender=models.CharField(max_length=100)
    dateOfBirth=models.CharField(max_length=100)
    preferredLang=models.CharField(max_length=100)
    issue=models.CharField(max_length=5000,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    tags=models.CharField(max_length=1000,null=True,blank=True)

class MHProfessional(models.Model):
    photo=models.ImageField(null=True,blank=True)
    name=models.CharField(max_length=100)
    email=models.CharField(max_length=200)
    phone=models.CharField(max_length=100)
    therapy_specification=models.CharField(max_length=100)
    gender=models.CharField(max_length=100)
    dateOfBirth=models.CharField(max_length=100)
    language1=models.CharField(max_length=100)
    language2=models.CharField(max_length=100,null=True,blank=True)
    language3=models.CharField(max_length=100,null=True,blank=True)
    specialization=models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)





