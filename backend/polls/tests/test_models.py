from random import randint
from django.test import TestCase
from model_mommy import mommy


class TestPoll(TestCase):
    def setUp(self):
        self.model = mommy.make('polls.Poll')
    
    def test_str(self):
        self.assertEquals(str(self.model), 'Poll #{} rate {}%'.format(self.model.id, self.model.rate))

    def test_rate_case0(self):
        self.model.likes = 0
        self.model.dislikes = 0
        self.assertEquals(self.model.rate, 100)
    
    def test_rate_case1(self):
        if self.model.likes == 0:
            self.model.likes = randint(1, 2147483647)
            self.model.save()
        if self.model.dislikes == 0:
            self.model.dislikes = randint(1, 2147483647)
            self.model.save()
        self.assertEquals(self.model.rate, int(self.model.likes / (self.model.likes + self.model.dislikes) * 100))

    def test_agree_rate_case0(self):
        self.model.agree = 0
        self.model.disagree = 0
        self.assertEquals(self.model.agree_rate, 50)
    
    def test_agree_rate_case1(self):
        if self.model.agree == 0:
            self.model.agree = randint(1, 2147483647)
            self.model.save()
        if self.model.disagree == 0:
            self.model.disagree = randint(1, 2147483647)
            self.model.save()
        self.assertEquals(self.model.agree_rate, int(self.model.agree / (self.model.agree + self.model.disagree) * 100))
    
    def test_voteYes(self):
        current_agree = self.model.agree
        self.model.voteYes()
        self.model.refresh_from_db()
        new_agree = current_agree + 1
        self.assertEquals(self.model.agree, new_agree)
    
    def test_voteNo(self):
        current_disagree = self.model.disagree
        self.model.voteNo()
        self.model.refresh_from_db()
        new_disagree = current_disagree + 1
        self.assertEquals(self.model.disagree, new_disagree)

    def test_rateLike(self):
        current_likes = self.model.likes
        self.model.rateLike()
        self.model.refresh_from_db()
        new_likes = current_likes + 1
        self.assertEquals(self.model.likes, new_likes)
    
    def test_rateDislike(self):
        current_dislikes = self.model.dislikes
        self.model.rateDislike()
        self.model.refresh_from_db()
        new_dislikes = current_dislikes + 1
        self.assertEquals(self.model.dislikes, new_dislikes)
    
    def test_unvoteYes(self):
        if self.model.agree == 0:
            self.model.agree = randint(1, 2147483647)
            self.model.save()
        current_agree = self.model.agree
        self.model.unvoteYes()
        self.model.refresh_from_db()
        new_agree = current_agree - 1
        self.assertEquals(self.model.agree, new_agree)
    
    def test_unvoteNo(self):
        if self.model.disagree == 0:
            self.model.disagree = randint(1, 2147483647)
            self.model.save()
        current_disagree = self.model.disagree
        self.model.unvoteNo()
        self.model.refresh_from_db()
        new_disagree = current_disagree - 1
        self.assertEquals(self.model.disagree, new_disagree)

    def test_unrateLike(self):
        if self.model.likes == 0:
            self.model.likes = randint(1, 2147483647)
            self.model.save()
        current_likes = self.model.likes
        self.model.unrateLike()
        self.model.refresh_from_db()
        new_likes = current_likes - 1
        self.assertEquals(self.model.likes, new_likes)
    
    def test_unrateDislike(self):
        if self.model.dislikes == 0:
            self.model.dislikes = randint(1, 2147483647)
            self.model.save()
        current_dislikes = self.model.dislikes
        self.model.unrateDislike()
        self.model.refresh_from_db()
        new_dislikes = current_dislikes - 1
        self.assertEquals(self.model.dislikes, new_dislikes)


class TestFlow(TestCase):
    def setUp(self):
        self.model = mommy.make('polls.Flow')

    def test_str(self):
        self.assertEquals(str(self.model), 'Flow "' + self.model.name + '"')    
    