from random import randint
from django.contrib.auth.models import User
from django.test import TestCase
from model_mommy import mommy
from frontend.models import Profile
from polls.models import Poll


class TestProfile(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.model = Profile.objects.get(user=self.user_model)
        self.poll_model = mommy.make('Poll')
    
    def test_str(self):
        self.assertEquals(str(self.model), self.model.user.username)

    def test_voteYes_voted_was_false(self):
        poll_id = self.poll_model.id
        if self.poll_model.disagree == 0:
            self.poll_model.disagree = 1
        self.poll_model.save()
        self.model.voted['-'].append(poll_id)
        self.model.save()
        self.model.voteYes(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], True)
        self.assertEquals(poll_id in self.model.voted['-'], False)

    def test_voteYes_voted_was_true(self):
        poll_id = self.poll_model.id
        if self.poll_model.agree == 0:
            self.poll_model.agree = 1
        self.poll_model.save()
        self.model.voted['+'].append(poll_id)
        self.model.save()
        self.model.voteYes(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], False)
        self.assertEquals(poll_id in self.model.voted['-'], False)
    
    def test_voteYes_voted_wasnt(self):
        poll_id = self.poll_model.id
        self.model.voteYes(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], True)
        self.assertEquals(poll_id in self.model.voted['-'], False)
    
    # def test_voteNo_voted_was_false(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.voted[poll_id] = False
    #     self.model.voteNo(poll_id)
    #     self.assertEquals(self.model.voted[poll_id], False)    
    
    # def test_voteNo_voted_was_true(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.voted[poll_id] = True
    #     self.model.voteNo(poll_id)
    #     self.assertEquals(self.model.voted[poll_id], False)

    # def test_voteNo_voted_wasnt(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.voteNo(poll_id)
    #     self.assertEquals(self.model.voted[poll_id], False)
    
    # def test_rateLike_rated_was_false(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rated[poll_id] = False
    #     self.model.rateLike(poll_id)
    #     self.assertEquals(self.model.rated[poll_id], True)

    # def test_rateLike_rated_was_true(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rated[poll_id] = True
    #     self.model.rateLike(poll_id)
    #     self.assertEquals(self.model.rated[poll_id], True)
    
    # def test_rateLike_rated_wasnt(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rateLike(poll_id)
    #     self.assertEquals(self.model.rated[poll_id], True)
    
    # def test_rateDislike_rated_was_false(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rated[poll_id] = False
    #     self.model.rateDislike(poll_id)
    #     self.assertEquals(self.model.rated[poll_id], False)    
    
    # def test_rateDislike_rated_was_true(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rated[poll_id] = True
    #     self.model.rateDislike(poll_id)
    #     self.assertEquals(self.model.rated[poll_id], False)

    # def test_rateDislike_rated_wasnt(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rateDislike(poll_id)
    #     self.assertEquals(self.model.rated[poll_id], False)

    # def test_unvoteYes_voted_was_true(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.voted[poll_id] = True
    #     self.model.unvoteYes(poll_id)
    #     self.assertEquals(self.model.voted.get(poll_id), None)

    # def test_unvoteYes_voted_was_false(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.voted[poll_id] = False
    #     self.model.unvoteYes(poll_id)
    #     self.assertEquals(self.model.voted.get(poll_id), None)

    # def test_unvoteYes_voted_wasnt(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.unvoteYes(poll_id)
    #     self.assertEquals(self.model.voted.get(poll_id), None)

    # def test_unvoteNo_voted_was_true(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.voted[poll_id] = True
    #     self.model.unvoteNo(poll_id)
    #     self.assertEquals(self.model.voted.get(poll_id), None)

    # def test_unvoteNo_voted_was_false(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.voted[poll_id] = False
    #     self.model.unvoteNo(poll_id)
    #     self.assertEquals(self.model.voted.get(poll_id), None)

    # def test_unvoteNo_voted_wasnt(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.unvoteNo(poll_id)
    #     self.assertEquals(self.model.voted.get(poll_id), None)

    # def test_unrateLike_rated_was_true(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rated[poll_id] = True
    #     self.model.unrateLike(poll_id)
    #     self.assertEquals(self.model.rated.get(poll_id), None)

    # def test_unrateLike_rated_was_false(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rated[poll_id] = False
    #     self.model.unrateLike(poll_id)
    #     self.assertEquals(self.model.rated.get(poll_id), None)

    # def test_unvrateLike_rated_wasnt(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.unrateLike(poll_id)
    #     self.assertEquals(self.model.rated.get(poll_id), None)

    # def test_unrateDislike_rated_was_true(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rated[poll_id] = True
    #     self.model.unrateDislike(poll_id)
    #     self.assertEquals(self.model.rated.get(poll_id), None)

    # def test_unvrateDislike_rated_was_false(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.rated[poll_id] = False
    #     self.model.unrateDislike(poll_id)
    #     self.assertEquals(self.model.rated.get(poll_id), None)

    # def test_unrateDislike_rated_wasnt(self):
    #     poll_id = randint(1, 2147483647)
    #     self.model.unrateDislike(poll_id)
    #     self.assertEquals(self.model.rated.get(poll_id), None)
