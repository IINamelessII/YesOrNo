from django.test import TestCase


class TestIndexView(TestCase):
    def test_index_status_code(self):
        response = self.client.get('/')
        self.assertEquals(response.status_code, 200)