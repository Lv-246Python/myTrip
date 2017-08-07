"""Testing module for help views."""

import json

from django.test import TestCase, Client

from help.models import Help

QUERYSET_ALL_STEP = 20
HELP_ID_ONE = 10
HELP_ID_TWO = 11
JSON_LENGTH = 6
HELP_URL = '/api/v1/help/'

class ViewTest(TestCase):
    """ Test for GET and POST operations in help's view."""

    def setUp(self):
        """
        Preconfig for test.
        Include instance of Client to class as attribute
        Create a model help.
        """
        self.client = Client()
        Help.objects.create(
            id=HELP_ID_ONE,
            subject='Test subject',
            message='Test message',
            email_to='test@mail.com'
        )

        Help.objects.create(
            id=HELP_ID_TWO,
            subject='Test subject 2',
            message='Test message 2',
            email_to='test2@mail.com'
        )

    def test_get_all_status_200(self):
        """Ensure that get method returns status 200 as response with success operation."""

        response = self.client.get(HELP_URL)
        self.assertEqual(response.status_code, 200)

    def test_get_all_length(self):
        """Ensure that get method returns correct number of Help objects."""
        response = self.client.get(HELP_URL)
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_post_status_success(self):
        """Ensure that post method creates new object with it relations and status 201."""
        response = self.client.post(HELP_URL, json.dumps({
            "subject": "test subject", "message": "test message", "to": "test@mail.com"}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_post_status_400(self):
        """Ensure that post method returns status 400, when data is not passed."""
        response = self.client.post(HELP_URL, json.dumps({}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 400)
