from importlib import import_module
from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from model_mommy import mommy
from rest_framework.test import APIRequestFactory, force_authenticate
from frontend.serializers import ProfileSerializer
from frontend.views import ProfileById


class TestProfileSerializer(TestCase):
    def setUp(self):
        self.view = ProfileById.as_view()
        self.factory = APIRequestFactory()
        self.user_model = mommy.make('User')

    def test_get_is_auth_false(self):
        request = self.factory.get('/api/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        is_authenticated = request.user.is_authenticated
        self.assertEquals(is_authenticated, response.data['is_auth'])
    
    def test_get_is_auth_true(self):
        request = self.factory.get('/api/')
        force_authenticate(request, user=self.user_model)
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        is_authenticated = request.user.is_authenticated
        self.assertEquals(is_authenticated, response.data['is_auth'])
    
    def test_get_message_was_showed_false(self):
        request = self.factory.get('/api/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        request.session['message_was_showed'] = False
        message = request.session.get('message') if not request.session.get('message_was_showed') else None
        self.assertEquals(message, response.data['message'])
    
    def test_get_message_was_showed_true(self):
        request = self.factory.get('/api/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        request.session['message_was_showed'] = True
        message = request.session.get('message') if not request.session.get('message_was_showed') else None
        self.assertEquals(message, response.data['message'])

    
        