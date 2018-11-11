from django.db import models

class Poll(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='polls', on_delete=models.CASCADE)
    statement = models.CharField(max_length=500)
    agree = models.PositiveIntegerField(default=1)
    disagree = models.PositiveIntegerField(default=1)
    likes = models.PositiveIntegerField(default=1)
    dislikes = models.PositiveIntegerField(default=1)
    flow = models.ForeignKey('Flow', related_name='polls', on_delete=models.CASCADE)

    @property
    def rate(self):
        """
        Poll's property that return poll's rate in % (exp. poll3.rate => 67)
        """
        return int(self.likes / (self.likes + self.dislikes) * 100)
    
    @property
    def agree_rate(self):
        """
        Poll's property that return poll's agree rate in % (exp. poll3.agree_rate => 50)
        """
        return int(self.agree / (self.agree + self.disagree) * 100)

    def __str__(self):
        return r'Poll #{} rate {}%'.format(self.id, self.likes / (self.likes +\
         self.dislikes if any([self.likes, self.dislikes]) else 1) * 100)
    
    def voteYes(self):
        self.agree += 1
        self.save()
    
    def voteNo(self):
        self.disagree += 1
        self.save()
    
    def voteLike(self):
        self.likes += 1
        self.save()
    
    def voteDislike(self):
        self.dislikes += 1
        self.save()



class Flow(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return r'FLow "{}"'.format(self.name)
