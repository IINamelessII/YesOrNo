from importlib import import_module
from json import dumps
from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from model_mommy import mommy
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient
from frontend import views
from frontend.models import Profile
from polls.models import Poll


class TestIndexView(TestCase):
    def test_index_status_code(self):
        response = self.client.get('/')
        self.assertEquals(response.status_code, 200)


class TestLogoutView(TestCase):
    def setUp(self):
        self.view = views.logout
        self.factory = APIRequestFactory()
        self.user_model = mommy.make('User')

    def test_user_was_authenticated(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        force_authenticate(request, user=self.user_model)
        response = self.view(request)
        self.assertEquals(response.status_code, 200)

    def test_user_wasnt_authenticated(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        self.assertEquals(response.status_code, 200)

    def test_user_wasnt_authenticated_without_session(self):
        request = self.factory.get('/')
        response = self.view(request)
        self.assertEquals(response.status_code, 500)


# class TestVoteYes(TestCase):
#     def setUp(self):
#         self.view = views.voteYes
#         self.client = APIClient()
#         self.user_model = mommy.make('User')
#         self.poll_model = mommy.make('Poll')

#     def test_id_exists(self):
#         self.client.login(username=self.user_model.username, password=self.user_model.password)
#         response = self.client.post(reverse('/voteYes'), {'id': self.poll_model.id})
#         self.assertEquals(response.status_code, 204)
