from django.test import TestCase
from model_mommy import mommy
from polls.models import Poll
from polls.views import PollByFlowNameList


class TestPollByFlowNameList(TestCase):
    def setUp(self):
        self.flow_model = mommy.make('polls.Flow')
        self.poll_models = mommy.make('polls.Poll', flow=self.flow_model)

    def test_get_queryset(self):
        view = PollByFlowNameList(kwargs={'flow_name': self.flow_model.name})
        polls = sorted(Poll.objects.filter(flow__name=self.flow_model.name), 
            reverse=True, key=lambda x: x.rate)
        self.assertEquals(view.get_queryset(), polls)
    
    def test_get_queryser_empty(self):
        view = PollByFlowNameList(kwargs={'flow_name': ''})
        self.assertEquals(view.get_queryset(), [])
    
    def test_get_queryser_fail(self):
        view = PollByFlowNameList(kwargs={'not_a_flow_name': 'some'})
        self.assertEquals(view.get_queryset().status_code, 404)
