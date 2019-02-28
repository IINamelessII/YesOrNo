from random import randint
from django.contrib.auth.models import User
from django.test import TestCase
from model_mommy import mommy
from frontend.models import Profile


class TestProfile(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.model = Profile.objects.get(user=self.user_model)
    
    def test_str(self):
        self.assertEquals(str(self.model), self.model.user.username)

    def test_voteYes_voted_was_false(self):
        poll_id = randint(1, 2147483647)
        self.model.voted[poll_id] = False
        self.model.voteYes(poll_id)
        self.assertEquals(self.model.voted[poll_id], True)

    def test_voteYes_voted_was_true(self):
        poll_id = randint(1, 2147483647)
        self.model.voted[poll_id] = True
        self.model.voteYes(poll_id)
        self.assertEquals(self.model.voted[poll_id], True)
    
    def test_voteYes_voted_wasnt(self):
        poll_id = randint(1, 2147483647)
        self.model.voteYes(poll_id)
        self.assertEquals(self.model.voted[poll_id], True)
    
    def test_voteNo_voted_was_false(self):
        poll_id = randint(1, 2147483647)
        self.model.voted[poll_id] = False
        self.model.voteNo(poll_id)
        self.assertEquals(self.model.voted[poll_id], False)    
    
    def test_voteNo_voted_was_true(self):
        poll_id = randint(1, 2147483647)
        self.model.voted[poll_id] = True
        self.model.voteNo(poll_id)
        self.assertEquals(self.model.voted[poll_id], False)

    def test_voteNo_voted_wasnt(self):
        poll_id = randint(1, 2147483647)
        self.model.voteNo(poll_id)
        self.assertEquals(self.model.voted[poll_id], False)
    
    def test_rateLike_rated_was_false(self):
        poll_id = randint(1, 2147483647)
        self.model.rated[poll_id] = False
        self.model.rateLike(poll_id)
        self.assertEquals(self.model.rated[poll_id], True)

    def test_rateLike_rated_was_true(self):
        poll_id = randint(1, 2147483647)
        self.model.rated[poll_id] = True
        self.model.rateLike(poll_id)
        self.assertEquals(self.model.rated[poll_id], True)
    
    def test_rateLike_rated_wasnt(self):
        poll_id = randint(1, 2147483647)
        self.model.rateLike(poll_id)
        self.assertEquals(self.model.rated[poll_id], True)
    
    def test_rateDislike_rated_was_false(self):
        poll_id = randint(1, 2147483647)
        self.model.rated[poll_id] = False
        self.model.rateDislike(poll_id)
        self.assertEquals(self.model.rated[poll_id], False)    
    
    def test_rateDislike_rated_was_true(self):
        poll_id = randint(1, 2147483647)
        self.model.rated[poll_id] = True
        self.model.rateDislike(poll_id)
        self.assertEquals(self.model.rated[poll_id], False)

    def test_rateDislike_rated_wasnt(self):
        poll_id = randint(1, 2147483647)
        self.model.rateDislike(poll_id)
        self.assertEquals(self.model.rated[poll_id], False)