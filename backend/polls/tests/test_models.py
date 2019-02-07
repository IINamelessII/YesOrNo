from random import randint
from django.test import TestCase
from model_mommy import mommy


class TestPoll(TestCase):
    def setUp(self):
        self.models = mommy.make('polls.Poll')
    
    def test_str(self):
        self.assertEquals(str(self.models), 'Poll #{} rate {}%'.format(self.models.id, self.models.rate))

    def test_rate_case0(self):
        self.models.likes = 0
        self.models.dislikes = 0
        self.assertEquals(self.models.rate, 100)
    
    def test_rate_case1(self):
        if self.models.likes == 0:
            self.models.likes = randint(1, 2147483647)
            self.models.save()
        if self.models.dislikes == 0:
            self.models.dislikes = randint(1, 2147483647)
            self.models.save()
        self.assertEquals(self.models.rate, int(self.models.likes / (self.models.likes + self.models.dislikes) * 100))

    def test_agree_rate_case0(self):
        self.models.agree = 0
        self.models.disagree = 0
        self.assertEquals(self.models.agree_rate, 50)
    
    def test_agree_rate_case1(self):
        if self.models.agree == 0:
            self.models.agree = randint(1, 2147483647)
            self.models.save()
        if self.models.disagree == 0:
            self.models.disagree = randint(1, 2147483647)
            self.models.save()
        self.assertEquals(self.models.agree_rate, int(self.models.agree / (self.models.agree + self.models.disagree) * 100))
    
    def test_voteYes(self):
        current_agree = self.models.agree
        self.models.voteYes()
        self.models.refresh_from_db()
        new_agree = current_agree + 1
        self.assertEquals(self.models.agree, new_agree)
    
    def test_voteNo(self):
        current_disagree = self.models.disagree
        self.models.voteNo()
        self.models.refresh_from_db()
        new_disagree = current_disagree + 1
        self.assertEquals(self.models.disagree, new_disagree)

    def test_rateLike(self):
        current_likes = self.models.likes
        self.models.rateLike()
        self.models.refresh_from_db()
        new_likes = current_likes + 1
        self.assertEquals(self.models.likes, new_likes)
    
    def test_rateDislike(self):
        current_dislikes = self.models.dislikes
        self.models.rateDislike()
        self.models.refresh_from_db()
        new_dislikes = current_dislikes + 1
        self.assertEquals(self.models.dislikes, new_dislikes)
    
    def test_unvoteYes(self):
        if self.models.agree == 0:
            self.models.agree = randint(1, 2147483647)
            self.models.save()
        current_agree = self.models.agree
        self.models.unvoteYes()
        self.models.refresh_from_db()
        new_agree = current_agree - 1
        self.assertEquals(self.models.agree, new_agree)
    
    def test_unvoteNo(self):
        if self.models.disagree == 0:
            self.models.disagree = randint(1, 2147483647)
            self.models.save()
        current_disagree = self.models.disagree
        self.models.unvoteNo()
        self.models.refresh_from_db()
        new_disagree = current_disagree - 1
        self.assertEquals(self.models.disagree, new_disagree)

    def test_unrateLike(self):
        if self.models.likes == 0:
            self.models.likes = randint(1, 2147483647)
            self.models.save()
        current_likes = self.models.likes
        self.models.unrateLike()
        self.models.refresh_from_db()
        new_likes = current_likes - 1
        self.assertEquals(self.models.likes, new_likes)
    
    def test_unrateDislike(self):
        if self.models.dislikes == 0:
            self.models.dislikes = randint(1, 2147483647)
            self.models.save()
        current_dislikes = self.models.dislikes
        self.models.unrateDislike()
        self.models.refresh_from_db()
        new_dislikes = current_dislikes - 1
        self.assertEquals(self.models.dislikes, new_dislikes)


class TestFlow(TestCase):
    def setUp(self):
        self.models = mommy.make('polls.Flow')

    def test_str(self):
        self.assertEquals(str(self.models), 'Flow "' + self.models.name + '"')    
    