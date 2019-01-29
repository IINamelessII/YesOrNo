from django.test import TestCase
from model_mommy import mommy


class TestPoll(TestCase):
    def setUp(self):
        self.models = mommy.make('polls.Poll')
    

class TestFlow(TestCase):
    def setUp(self):
        self.models = mommy.make('polls.Flow')

    def test_str(self):
        self.assertEquals(str(self.models), 'Flow "' + self.models.name + '"')    
    