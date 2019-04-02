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
        polls = Poll.objects.filter(flow__name=self.flow_model.name)
        self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))
    
    def test_get_queryser_empty(self):
        view = PollByFlowNameList(kwargs={'flow_name': ''})
        polls = Poll.objects.filter(flow__name='')
        self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))
    
    def test_get_queryser_fail(self):
        view = PollByFlowNameList(kwargs={'not_a_flow_name': 'some'})
        self.assertEquals(view.get_queryset().status_code, 404)
