from django.contrib.auth.models import User
from django.test import TestCase
from model_mommy import mommy
from users import views


class TestAdminLoginView(TestCase):
    def setUp(self):
        self.user_model = mommy.make('User')
        self.view = views.admin_login

        class Request():
            def __init__(request_self):
                request_self.user = self.user_model
        
        self.request = Request()

    def test_user_isnt_staff(self):
        if self.request.user.is_staff:
            self.request.user.is_staff = False
            self.request.user.save()
        response = self.view(self.request)
        self.assertEquals('admin' in response.url, False)
    
    def test_user_is_staff(self):
        if not self.request.user.is_staff:
            self.request.user.is_staff = True
            self.request.user.save()
        response = self.view(self.request)
        self.assertEquals('admin' in response.url, True)
        