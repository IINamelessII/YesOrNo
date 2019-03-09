from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from polls.models import Poll


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    voted = JSONField(default=dict)
    rated = JSONField(default=dict)

    def __str__(self):
        return self.user.username

    def voteYes(self, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        if poll_id in self.voted['+']:
            self.voted['+'].remove(poll_id)
            poll.unvoteYes()
        else:
            if poll_id in self.voted['-']:
                self.voted['-'].remove(poll_id)
                poll.unvoteNo()
            self.voted['+'].append(poll_id)
            poll.voteYes()
        self.save()
    
    def voteNo(self, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        if poll_id in self.voted['-']:
            self.voted['-'].remove(poll_id)
            poll.unvoteNo()
        else:
            if poll_id in self.voted['+']:
                self.voted['+'].remove(poll_id)
                poll.unvoteYes()
            self.voted['-'].append(poll_id)
            poll.voteNo()
        self.save()

    def rateLike(self, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        if poll_id in self.rated['+']:
            self.rated['+'].remove(poll_id)
            poll.unrateLike()
        else:
            if poll_id in self.rated['-']:
                self.rated['-'].remove(poll_id)
                poll.unrateDislike()
            self.rated['+'].append(poll_id)
            poll.rateLike()
        self.save()
    
    def rateDislike(self, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        if poll_id in self.rated['-']:
            self.rated['-'].remove(poll_id)
            poll.unrateDislike()
        else:
            if poll_id in self.rated['+']:
                self.rated['+'].remove(poll_id)
                poll.unrateLike()
            self.rated['-'].append(poll_id)
            poll.rateDislike()
        self.save()


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, voted={'+' : [], '-': []}, rated={'+' : [], '-': []})


post_save.connect(create_user_profile, sender=User)

