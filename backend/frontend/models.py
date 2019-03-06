from django.db import models, transaction
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

    @transaction.atomic
    def voteYes(self, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        if poll_id in self.voted and self.voted[poll_id]:
            self.voted.pop(poll_id, None)
            poll.unvoteYes()
        else:
            if poll_id in self.voted:
                poll.unvoteNo()
            self.voted[poll_id] = True
            poll.voteYes()
        self.save()
    
    @transaction.atomic
    def voteNo(self, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        if poll_id in self.voted and not self.voted[poll_id]:
            self.voted.pop(poll_id, None)
            poll.unvoteNo()
        else:
            if poll_id in self.voted:
                poll.unvoteYes()
            self.voted[poll_id] = False
            poll.voteNo()
        self.save()

    @transaction.atomic
    def rateLike(self, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        if poll_id in self.rated and self.rated[poll_id]:
            self.rated.pop(poll_id, None)
            poll.unrateLike()
        else:
            if poll_id in self.rated:
                poll.unrateDislike()
            self.rated[poll_id] = True
            poll.rateLike()
        self.save()
    
    @transaction.atomic
    def rateDislike(self, poll_id):
        poll = Poll.objects.get(pk=poll_id)
        if poll_id in self.rated and not self.rated[poll_id]:
            self.rated.pop(poll_id, None)
            poll.unrateDislike()
        else:
            if poll_id in self.rated:
                poll.unrateLike()
            self.rated[poll_id] = False
            poll.rateDislike()
        self.save()


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)

