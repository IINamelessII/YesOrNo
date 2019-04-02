from importlib import import_module
from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from model_mommy import mommy
from polls.models import Flow, Poll
from polls.views import PollByFlowNameList, PollByUserList


class TestPollByFlowNameList(TestCase):
    def setUp(self):
        self.flow_model = mommy.make('Flow')
        self.view = PollByFlowNameList

    def test_get_queryset(self):
        view = self.view(kwargs={'flow_name': self.flow_model.name})
        polls = Poll.objects.filter(flow__name=self.flow_model.name)
        self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))
    
    def test_get_queryser_empty(self):
        view = self.view(kwargs={'flow_name': ''})
        polls = Poll.objects.filter(flow__name='')
        self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))
    
    def test_get_queryser_fail(self):
        view = self.view(kwargs={'not_a_flow_name': 'some'})
        self.assertEquals(view.get_queryset().status_code, 404)


class TestPollByUserList(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.flow_model = mommy.make('Flow')
        self.factory = APIRequestFactory()
        self.view = PollByUserList.get_queryset

    def test_get_queryset(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        force_authenticate(request, user=self.user_model)
        poll_by_user = Poll(owner=self.user_model, statement='Just a test?', flow=self.flow_model)
        poll_by_user.save()
        polls = Poll.objects.filter(owner=self.user_model)
        self.assertEquals(self.view(request), polls)
        # self.assertEquals(request.user, self.user_model)
        # self.assertQuerysetEqual(view.get_queryset(), map(repr, polls))