import json
from django.test import TestCase
from django.urls import reverse


class PhotoViewTests(TestCase):
    def test_create(self):
        response = self.client.post(reverse('PhotoView'),
                                    json.dumps(""))