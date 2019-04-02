from random import randint
from django.contrib.auth.models import User
from django.test import TestCase
from model_mommy import mommy
from polls.models import Flow, Poll
from polls.views import PollByFlowNameList, PollByUserList, ShortPollById


class TestPollByFlowNameList(TestCase):
    def setUp(self):
        self.flow_model = mommy.make('Flow')
        self.view = PollByFlowNameList

    def test_get_queryset(self):
        view = self.view(kwargs={'flow_name': self.flow_model.name})
        polls = Poll.objects.filter(flow__name=self.flow_model.name)
        self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))
    
    def test_get_queryset_empty(self):
        view = self.view(kwargs={'flow_name': ''})
        polls = Poll.objects.filter(flow__name='')
        self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))
    
    def test_get_queryset_fail(self):
        view = self.view(kwargs={'not_a_flow_name': 'some'})
        self.assertEquals(view.get_queryset().status_code, 404)


class TestPollByUserList(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.flow_model = mommy.make('Flow')
        self.view = PollByUserList

        class Request():
            def __init__(request_self):
                request_self.user = self.user_model
        
        self.request = Request()
    
    def test_get_queryset(self):
        poll = Poll(owner=self.user_model, statement='Just a test?', flow=self.flow_model)
        poll.save()
        view = self.view(request=self.request)
        polls = Poll.objects.filter(owner=self.user_model)
        self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))

    def test_get_queryset_empty(self):
        view = self.view(request=self.request)
        polls = Poll.objects.filter(owner=self.user_model)
        self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))

    def test_get_queryset_fail(self):
        view = self.view()
        polls = Poll.objects.filter(owner=self.user_model)
        self.assertEquals(view.get_queryset(), None)


class TestShortPollById(TestCase):
    def setUp(self):
        self.poll_model = mommy.make('Poll')
        self.view = ShortPollById

    def test_get_queryset(self):
        view = self.view(kwargs={'id': self.poll_model.id})
        poll = Poll.objects.get(pk=self.poll_model.id)
        self.assertEquals(view.get_object(), poll)
    
    def test_get_queryset_empty(self):
        id = randint(1, 2147483647)
        view = self.view(kwargs={'id': id})
        self.assertEquals(view.get_object().status_code, 404)
    
    def test_get_queryset_fail(self):
        view = self.view(kwargs={'not_a_flow_name': 'some'})
        self.assertEquals(view.get_object().status_code, 404)