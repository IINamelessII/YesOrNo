from importlib import import_module
from json import dumps
from random import randint
from django.conf import settings
from django.contrib.auth.models import User
from django.http.request import HttpRequest
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


class TestVoteYes(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.poll_model = mommy.make('Poll')
        self.view = views.voteYes

        class TestRequest(HttpRequest):
            def __init__(request_self):
                super().__init__()
                request_self.user = self.user_model
        
        self.request = TestRequest

    def test_id_exists(self):
        request = self.request()
        request._body = bytes(dumps({'id': self.poll_model.id}), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 204)

    def test_id_dont_exist(self):
        request = self.request()
        id = randint(1, 2147483647)
        while id == self.poll_model.id:
            id = randint(1, 2147483647)
        request._body = bytes(dumps({'id': id}), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 500)

    def test_user_is_none(self):
        request = self.request()
        request._body = bytes(dumps({'id': self.poll_model.id}), 'utf-8')
        request.user = None
        response = self.view(request)
        self.assertEquals(response.status_code, 500)


class TestVoteNo(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.poll_model = mommy.make('Poll')
        self.view = views.voteNo

        class TestRequest(HttpRequest):
            def __init__(request_self):
                super().__init__()
                request_self.user = self.user_model
        
        self.request = TestRequest

    def test_id_exists(self):
        request = self.request()
        request._body = bytes(dumps({'id': self.poll_model.id}), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 204)

    def test_id_dont_exist(self):
        request = self.request()
        id = randint(1, 2147483647)
        while id == self.poll_model.id:
            id = randint(1, 2147483647)
        request._body = bytes(dumps({'id': id}), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 500)

    def test_user_is_none(self):
        request = self.request()
        request._body = bytes(dumps({'id': self.poll_model.id}), 'utf-8')
        request.user = None
        response = self.view(request)
        self.assertEquals(response.status_code, 500)


class TestRateLike(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.poll_model = mommy.make('Poll')
        self.view = views.rateLike

        class TestRequest(HttpRequest):
            def __init__(request_self):
                super().__init__()
                request_self.user = self.user_model
        
        self.request = TestRequest

    def test_id_exists(self):
        request = self.request()
        request._body = bytes(dumps({'id': self.poll_model.id}), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 204)

    def test_id_dont_exist(self):
        request = self.request()
        id = randint(1, 2147483647)
        while id == self.poll_model.id:
            id = randint(1, 2147483647)
        request._body = bytes(dumps({'id': id}), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 500)

    def test_user_is_none(self):
        request = self.request()
        request._body = bytes(dumps({'id': self.poll_model.id}), 'utf-8')
        request.user = None
        response = self.view(request)
        self.assertEquals(response.status_code, 500)


class TestRateDislike(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.poll_model = mommy.make('Poll')
        self.view = views.rateDislike

        class TestRequest(HttpRequest):
            def __init__(request_self):
                super().__init__()
                request_self.user = self.user_model
        
        self.request = TestRequest

    def test_id_exists(self):
        request = self.request()
        request._body = bytes(dumps({'id': self.poll_model.id}), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 204)

    def test_id_dont_exist(self):
        request = self.request()
        id = randint(1, 2147483647)
        while id == self.poll_model.id:
            id = randint(1, 2147483647)
        request._body = bytes(dumps({'id': id}), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 500)

    def test_user_is_none(self):
        request = self.request()
        request._body = bytes(dumps({'id': self.poll_model.id}), 'utf-8')
        request.user = None
        response = self.view(request)
        self.assertEquals(response.status_code, 500)


class TestAddPoll(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.flow_model = mommy.make('Flow')
        self.view = views.addPoll

        class TestRequest(HttpRequest):
            def __init__(request_self):
                super().__init__()
                request_self.user = self.user_model
        
        self.request = TestRequest

    def test_OK(self):
        #length of this statement is between 10 and 500, it is OK
        text = 'This statement is OK'
        request = self.request()
        request._body = bytes(dumps({
            'flow': self.flow_model.name,
            'statement': text
        }), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 204)
        self.assertEquals(Poll.objects.filter(statement=text).exists(), True)

    def test_length_of_statement_less_than_10(self):
        #length of this statement is less than 10, it is not OK
        text = 'Just 6'
        request = self.request()
        request._body = bytes(dumps({
            'flow': self.flow_model.name,
            'statement': text
        }), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 404)
        self.assertEquals(Poll.objects.filter(statement=text).exists(), False)

    def test_length_of_statement_more_than_500(self):
        #length of this statement is more than 500, it is not OK
        text = 'A' * 501
        request = self.request()
        request._body = bytes(dumps({
            'flow': self.flow_model.name,
            'statement': text
        }), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 404)
        self.assertEquals(Poll.objects.filter(statement=text).exists(), False)

    def test_flow_does_not_exist(self):
        #this flow is not exist, it is not OK
        text = 'This statement is OK',
        request = self.request()
        request._body = bytes(dumps({
            'flow': 'Incorrect flow name',
            'statement': text
        }), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 404)
        self.assertEquals(Poll.objects.filter(statement=text).exists(), False)