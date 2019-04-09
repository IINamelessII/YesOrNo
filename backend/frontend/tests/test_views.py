from importlib import import_module
from json import dumps
from random import randint
from django.conf import settings
from django.contrib import auth
from django.contrib.auth.models import User
from django.http.request import HttpRequest
from django.test import TestCase
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode 
from django.utils.encoding import force_bytes 
from django.contrib.auth.tokens import default_token_generator 
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


class TestSignin(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.view = views.signin        
        self.factory = APIRequestFactory()
        #Example of correct and strong password
        self.password = '9Re5ghsS@^*zw?Pd'
        #Set known password manually 
        #because we can not get raw password of self.user_model
        self.user_model.set_password(self.password)
        self.user_model.save()

    def test_OK_user_was_not_authenticated(self):
        #All data is OK, user was_not_authenticated
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'username': self.user_model.username,
            'password': self.password
        }), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), None)

    def test_wrong_password_user_was_not_authenticated(self):
        #Password is wrong, user was_not_authenticated
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'username': self.user_model.username,
            'password': self.password + 'It is wrong'
        }), 'utf-8')
        response = self.view(request)
        message = 'Wrong Username or Password, please try again or reset your Password'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)
        self.assertEquals(request.session.get('message_was_showed'), False)

    def test_data_is_wrong_user_was_not_authenticated(self):
        #Data is wrong, user was_not_authenticated
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'not an username': self.user_model.username,
            'password': self.password
        }), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 404)
        self.assertEquals(request.session.get('message'), None)


class TestSignup(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.view = views.signup        
        self.factory = APIRequestFactory()
        #Example of correct and strong password
        self.password = '9Re5ghsS@^*zw?Pd'
        #Set known password manually 
        #because we can not get raw password of self.user_model
        self.user_model.set_password(self.password)
        self.user_model.save()
        #Not registred in system username
        self.username = 'NewUser'
        #Not registred in system email
        self.email = 'newemail@gmail.com'

    def test_all_data_is_OK(self):
        #All data is OK
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'username': self.username,
            'password': self.password,
            'email': self.email
        }), 'utf-8')
        response = self.view(request)
        message = 'Please follow the link received in the email to confirm registration of your account'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)
    
    def test_data_is_wrong(self):
        #Wrong data
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'not an username': self.username,
            'password': self.password,
            'email': self.email
        }), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 404)
        self.assertEquals(request.session.get('message'), None)
    
    def test_email_is_exist_in_system(self):
        #User with this email is exist in system
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'username': self.username,
            'password': self.password,
            'email': self.user_model.email
        }), 'utf-8')
        response = self.view(request)
        message = 'Account has already been registered to this email'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)

    def test_username_is_exist_in_system(self):
        #User with this username is exist in system
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'username': self.user_model.username,
            'password': self.password,
            'email': self.email
        }), 'utf-8')
        response = self.view(request)
        message = 'Account with this username already exists'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)

    def test_length_of_password_is_less_than_8(self):
        #Incorrect password, its length less than 8
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'username': self.username,
            'password': 'Just 6',
            'email': self.email
        }), 'utf-8')
        response = self.view(request)
        message = 'Password must be at least 8 characters'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)

    def test_incorrect_email(self):
        #Incorrect email format
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'username': self.username,
            'password': self.password,
            'email': 'not an email adress'
        }), 'utf-8')
        response = self.view(request)
        message = 'This email is incorrect'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)
    
    def test_email_server_does_not_work(self):
        #Some problems with email server
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'username': self.username,
            'password': self.password,
            'email': self.email
        }), 'utf-8')
        with self.settings(EMAIL_BACKEND='Not a backend actually'):
            response = self.view(request)
        message = 'Something went wrong, please try again'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)

class TestActivation(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.view = views.activation      
        self.factory = APIRequestFactory()
        #Correct uid64
        self.uid = urlsafe_base64_encode(force_bytes(self.user_model.pk)).decode()
        #Correct token
        self.token = default_token_generator.make_token(self.user_model)

    def test_uid_and_token_are_OK_and_user_is_not_active(self):
        self.user_model.is_active = False
        self.user_model.save()
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request, self.uid, self.token)
        message = 'Registration successfully completed'
        self.assertEquals(response.status_code, 302)
        self.assertEquals(request.session.get('message'), message)
    
    def test_uid_and_token_are_OK_and_user_is_active(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request, self.uid, self.token)
        message = 'Sorry, this link is not valid'
        self.assertEquals(response.status_code, 302)
        self.assertEquals(request.session.get('message'), message)

    def test_uid_is_not_correct_token_is_OK_and_user_is_not_active(self):
        self.user_model.is_active = False
        self.user_model.save()
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request, 'not a correct uid', self.token)
        message = 'Sorry, this link is not valid'
        self.assertEquals(response.status_code, 302)
        self.assertEquals(request.session.get('message'), message)

    def test_uid_is_OK_token_is_incorrect_and_user_is_not_active(self):
        self.user_model.is_active = False
        self.user_model.save()
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request, self.uid, 'Not a correct token')
        message = 'Sorry, this link is not valid'
        self.assertEquals(response.status_code, 302)
        self.assertEquals(request.session.get('message'), message)
    
    def test_uid_and_token_was_not_passed_and_user_is_not_active(self):
        self.user_model.is_active = False
        self.user_model.save()
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        message = 'Sorry, this link is not valid'
        self.assertEquals(response.status_code, 302)
        self.assertEquals(request.session.get('message'), message)


class TestResetPassword(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.view = views.reset_password
        self.factory = APIRequestFactory()
        self.email = self.user_model.email

    def test_email_exists_in_system_and_user_is_active(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'email': self.email
        }), 'utf-8')
        response = self.view(request)
        message = 'Please follow the link in the email to restore access to your account'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)

    def test_email_exists_in_system_and_user_is_not_active(self):
        self.user_model.is_active = False
        self.user_model.save()
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'email': self.email
        }), 'utf-8')
        response = self.view(request)
        message = 'Please follow the link in the email to complete the registration of your account.'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)

    def test_email_does_not_exist_in_system(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'email': 'not an email actually'
        }), 'utf-8')
        response = self.view(request)
        message = 'Account with this email not found'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)
    
    def test_passed_wrong_data(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'not an email': self.email
        }), 'utf-8')
        response = self.view(request)
        self.assertEquals(response.status_code, 404)
    
    def test_resetpass_email_server_does_not_work(self):
        #Some problems with email server
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'email': self.email
        }), 'utf-8')
        with self.settings(EMAIL_BACKEND='Not a backend actually'):
            response = self.view(request)
        message = 'Something went wrong, please try again'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)


class TestResetPasswordLink(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.view = views.reset_password_link      
        self.factory = APIRequestFactory()
        #Correct uid64
        self.uid = urlsafe_base64_encode(force_bytes(self.user_model.pk)).decode()
        #Correct token
        self.token = default_token_generator.make_token(self.user_model)

    def test_uid_and_token_are_OK(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request, self.uid, self.token)
        message = None
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)
    
    def test_uid_is_OK_and_token_is_not_correct(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request, self.uid, 'Not a token actually')
        message = 'Sorry, this link is not valid'
        self.assertEquals(response.status_code, 302)
        self.assertEquals(request.session.get('message'), message)
    
    def test_uid_is_not_correct_and_token_is_OK(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request, 'Not an uid actually', self.token)
        message = 'Sorry, this link is not valid'
        self.assertEquals(response.status_code, 302)
        self.assertEquals(request.session.get('message'), message)

    def test_uid_and_token_were_not_passed(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        message = 'Sorry, this link is not valid'
        self.assertEquals(response.status_code, 302)
        self.assertEquals(request.session.get('message'), message)


class TestResetPasswordForm(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.view = views.reset_password_form    
        self.factory = APIRequestFactory()
        #Correct uid64
        self.uid = urlsafe_base64_encode(force_bytes(self.user_model.pk)).decode()
        #Correct token
        self.token = default_token_generator.make_token(self.user_model)
        #Example of correct and strong password
        self.password = '9Re5ghsS@^*zw?Pd'
    
    def test_uid_and_token_and_password_are_OK_user_is_active(self):
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'password': self.password
        }), 'utf-8')
        response = self.view(request, self.uid, self.token)
        self.assertEquals(response.status_code, 302)
    
    def test_uid_and_token_and_password_are_OK_user_is_not_active(self):
        self.user_model.is_active = False
        self.user_model.save()
        request = self.factory.get('/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        request._body = bytes(dumps({
            'password': self.password
        }), 'utf-8')
        response = self.view(request, self.uid, self.token)
        message = 'Please follow the link in the email to complete the registration of your account.'
        self.assertEquals(response.status_code, 200)
        self.assertEquals(request.session.get('message'), message)
        