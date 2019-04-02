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

    def test_voteYes_vote_was_disagree(self):
        poll_id = self.poll_model.id
        if self.poll_model.disagree == 0:
            self.poll_model.disagree = 1
        self.poll_model.save()
        self.model.voted['-'].append(poll_id)
        self.model.save()
        self.model.voteYes(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], True)
        self.assertEquals(poll_id in self.model.voted['-'], False)

    def test_voteYes_vote_was_agree(self):
        poll_id = self.poll_model.id
        if self.poll_model.agree == 0:
            self.poll_model.agree = 1
        self.poll_model.save()
        self.model.voted['+'].append(poll_id)
        self.model.save()
        self.model.voteYes(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], False)
        self.assertEquals(poll_id in self.model.voted['-'], False)
    
    def test_voteYes_vote_wasnt(self):
        poll_id = self.poll_model.id
        self.model.voteYes(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], True)
        self.assertEquals(poll_id in self.model.voted['-'], False)
    
    def test_voteNo_vote_was_disagree(self):
        poll_id = self.poll_model.id
        if self.poll_model.disagree == 0:
            self.poll_model.disagree = 1
        self.poll_model.save()
        self.model.voted['-'].append(poll_id)
        self.model.save()
        self.model.voteNo(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], False)
        self.assertEquals(poll_id in self.model.voted['-'], False)

    def test_voteNo_vote_was_agree(self):
        poll_id = self.poll_model.id
        if self.poll_model.agree == 0:
            self.poll_model.agree = 1
        self.poll_model.save()
        self.model.voted['+'].append(poll_id)
        self.model.save()
        self.model.voteNo(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], False)
        self.assertEquals(poll_id in self.model.voted['-'], True)
    
    def test_voteNo_vote_wasnt(self):
        poll_id = self.poll_model.id
        self.model.voteNo(poll_id)
        self.assertEquals(poll_id in self.model.voted['+'], False)
        self.assertEquals(poll_id in self.model.voted['-'], True)

    def test_rateLike_rate_was_dislike(self):
        poll_id = self.poll_model.id
        if self.poll_model.dislikes == 0:
            self.poll_model.dislikes = 1
        self.poll_model.save()
        self.model.rated['-'].append(poll_id)
        self.model.save()
        self.model.rateLike(poll_id)
        self.assertEquals(poll_id in self.model.rated['+'], True)
        self.assertEquals(poll_id in self.model.rated['-'], False)

    def test_rateLike_rate_was_like(self):
        poll_id = self.poll_model.id
        if self.poll_model.likes == 0:
            self.poll_model.likes = 1
        self.poll_model.save()
        self.model.rated['+'].append(poll_id)
        self.model.save()
        self.model.rateLike(poll_id)
        self.assertEquals(poll_id in self.model.rated['+'], False)
        self.assertEquals(poll_id in self.model.rated['-'], False)
    
    def test_rateLike_rate_wasnt(self):
        poll_id = self.poll_model.id
        self.model.rateLike(poll_id)
        self.assertEquals(poll_id in self.model.rated['+'], True)
        self.assertEquals(poll_id in self.model.rated['-'], False)
    
    def test_rateDislike_rate_was_dislike(self):
        poll_id = self.poll_model.id
        if self.poll_model.dislikes == 0:
            self.poll_model.dislikes = 1
        self.poll_model.save()
        self.model.rated['-'].append(poll_id)
        self.model.save()
        self.model.rateDislike(poll_id)
        self.assertEquals(poll_id in self.model.rated['+'], False)
        self.assertEquals(poll_id in self.model.rated['-'], False)

    def test_rateDislike_rate_was_dislike(self):
        poll_id = self.poll_model.id
        if self.poll_model.likes == 0:
            self.poll_model.likes = 1
        self.poll_model.save()
        self.model.rated['+'].append(poll_id)
        self.model.save()
        self.model.rateDislike(poll_id)
        self.assertEquals(poll_id in self.model.rated['+'], False)
        self.assertEquals(poll_id in self.model.rated['-'], True)
    
    def test_rateDislike_rate_wasnt(self):
        poll_id = self.poll_model.id
        self.model.rateDislike(poll_id)
        self.assertEquals(poll_id in self.model.rated['+'], False)
        self.assertEquals(poll_id in self.model.rated['-'], True)
