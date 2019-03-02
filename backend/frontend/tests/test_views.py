from importlib import import_module
from django.conf import settings
from django.test import TestCase
from model_mommy import mommy
from rest_framework.test import APIRequestFactory, force_authenticate
from frontend import views


class TestIndexView(TestCase):
    def test_index_status_code(self):
        response = self.client.get('/')
        self.assertEquals(response.status_code, 200)


class TestLogoutView(TestCase):
    def setUp(self):
        self.view = views.logout
        self.factory = APIRequestFactory()
        self.user_model = mommy.make('User')

    def test_logout_user_was_authenticated(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        force_authenticate(request, user=self.user_model)
        response = self.view(request)
        self.assertEquals(response.status_code, 200)

    def test_logout_user_wasnt_authenticated(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        self.assertEquals(response.status_code, 200)

    def test_logout_user_wasnt_authenticated_without_session(self):
        request = self.factory.get('/')
        response = self.view(request)
        self.assertEquals(response.status_code, 500)
    
