from django.db import models

class Poll(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='polls', on_delete=models.CASCADE)
    statement = models.CharField(max_length=1000)
    #picture = models.ImageField(blank=True, default=None)
    agree = models.PositiveIntegerField(default=0)
    disagree = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)
    flow = models.ForeignKey('Flow', related_name='polls', on_delete=models.CASCADE)

    def __str__(self):
        return r'Poll #{} rate {}%'.format(self.id, self.likes / (self.likes +\
         self.dislikes if any([self.likes, self.dislikes]) else 1) * 100)


class Flow(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return r'FLow "{}"'.format(self.name)
