from random import randint
# from django.contrib.auth.models import User
from django.test import TestCase
from model_mommy import mommy


# class TestProfile(TestCase):
#     def setUp(self):
#         self.user_model = mommy.make('User')
#         self.model = mommy.make('frontend.Profile', user=self.user_model)
    
#     def test_str(self):
#         self.assertEquals(str(self.model), self.model.user.username)

    # def test_voteYes(self):
    #     poll_id = randint(1, 2147483647)
    #     self.voted[poll_id] = False
    #     self.save()
    #     self.model.voteYes(poll_id)
    #     self.assertEquals(self.model.voted[poll_id], True)
