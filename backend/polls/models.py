from django.db import models

class Poll(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='polls', on_delete=models.CASCADE)
    statement = models.CharField(max_length=500)
    agree = models.PositiveIntegerField(default=0)
    disagree = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)
    flow = models.ForeignKey('Flow', related_name='polls', on_delete=models.CASCADE)

    @property
    def rate(self):
        """
        Poll's property that return poll's rate in % (exp. poll3.rate => 67) if someones voted else return None
        """
        return int(self.likes / (self.likes + self.dislikes) * 100) if self.likes + self.dislikes else 50
    
    @property
    def agree_rate(self):
        """
        Poll's property that return poll's agree rate in % (exp. poll3.agree_rate => 50) if someones rated else return None
        """
        return int(self.agree / (self.agree + self.disagree) * 100) if self.agree + self.disagree else 50

    def __str__(self):
        return r'Poll #{} rate {}%'.format(self.id, self.rate)
    
    def voteYes(self):
        self.update(agree=models.F('agree') + 1)
    
    def voteNo(self):
        self.update(disagree=models.F('disagree') + 1)
    
    def rateLike(self):
        self.update(likes=models.F('likes') + 1)
    
    def rateDislike(self):
        self.update(dislikes=models.F('dislikes') + 1)
    
    def unvoteYes(self):
        self.update(agree=models.F('agree') - 1)
    
    def unvoteNo(self):
        self.update(disagree=models.F('disagree') - 1)
    
    def unrateLike(self):
        self.update(likes=models.F('likes') - 1)
    
    def unrateDislike(self):
        self.update(dislikes=models.F('dislikes') - 1)



class Flow(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return r'FLow "{}"'.format(self.name)
