from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    voted = JSONField(default=dict)
    rated = JSONField(default=dict)

    def __str__(self):
        return self.user.username

    def voteYes(self, poll_id):
        self.voted[poll_id] = True
        self.save()
    
    def voteNo(self, poll_id):
        self.voted[poll_id] = False
        self.save()

    def rateLike(self, poll_id):
        self.rated[poll_id] = True
        self.save()
    
    def rateDislike(self, poll_id):
        self.rated[poll_id] = False
        self.save()

    def unvoteYes(self, poll_id):
        self.voted.pop(poll_id, None)
        self.save()
    
    def unvoteNo(self, poll_id):
        self.voted.pop(poll_id, None)
        self.save()

    def unrateLike(self, poll_id):
        self.rated.pop(poll_id, None)
        self.save()
    
    def unrateDislike(self, poll_id):
        self.rated.pop(poll_id, None)
        self.save()


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)

