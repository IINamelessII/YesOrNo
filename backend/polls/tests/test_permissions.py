from django.test import TestCase
from polls.permissions import IsReadOnly


class TestIsReadOnly(TestCase):
    def setUp(self):
        class Request():
            def __init__(self):
                self.method = None
        
        self.permission = IsReadOnly
        self.request = Request
    
    def test_get_method(self):
        #GET is safe method
        request = self.request()
        request.method = 'GET'
        self.assertEquals(self.permission().has_permission(request, None), True)
    
    def test_post_method(self):
        #POST is not safe method
        request = self.request()
        request.method = 'POST'
        self.assertEquals(self.permission().has_permission(request, None), None)