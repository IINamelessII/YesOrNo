from importlib import import_module
from json import dumps
from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase
from model_mommy import mommy
from rest_framework.test import APIRequestFactory, force_authenticate
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


# class TestVoteYesView(TestCase):
#     def setUp(self):
#         self.view = views.voteYes
#         self.poll_model = mommy.make('polls.Poll')
#         self.user_model = mommy.make('User')
#         self.profile_model = Profile.objects.get(user=self.user_model)
#         self.factory = APIRequestFactory()
        
#     def test(self):
#         agree = self.poll_model.agree
#         self.profile_model.voted[self.poll_model.pk] = False
#         request = self.factory.post('/', dumps({'id': self.poll_model.pk}), content_type='application/json')
#         force_authenticate(request, user=self.user_model)
#         response = self.view(request)
#         self.poll_model.refresh_from_db()
#         new_agree = agree + 1
#         self.assertEquals(new_agree, self.poll_model.agree)
#         self.assertEquals(self.profile_model[self.poll_model.pk], True)

