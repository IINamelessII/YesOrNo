from django.conf import settings
from importlib import import_module
from django.test import TestCase
from model_mommy import mommy
from rest_framework.test import APIRequestFactory
from frontend.serializers import ProfileSerializer
from frontend.views import ProfileById


class TestProfileSerializer(TestCase):
    def setUp(self):
        self.view = ProfileById.as_view()
        self.factory = APIRequestFactory()

    def test_get_is_auth(self):
        request = self.factory.get('/api/')
        engine = import_module(settings.SESSION_ENGINE)
        session_key = None
        request.session = engine.SessionStore(session_key)
        response = self.view(request)
        is_auth = request.user.is_authenticated
        self.assertEquals(is_auth, response.data['is_auth'])
        