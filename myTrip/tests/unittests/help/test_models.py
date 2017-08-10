"""This module contains Unit Tests for Help app models."""

from datetime import datetime
from unittest.mock import patch

from django.test import TestCase

from help.models import Help

TEST_TIME = datetime(2017, 7, 25, 12, 00, 00)
QUERYSET_START_STEP = 0
QUERYSET_END_STEP = 20
HELP_ID_ONE = 10
HELP_ID_TWO = 11
TEST_EMAIL = 'test@mail.com'


class TestPlugin(TestCase):
    """Tests for Help model."""

    def setUp(self):
        """
        Creates objects to provide tests. To freeze auto changed time at models is necessary to use mock library
        """
        with patch('django.utils.timezone.now') as mock_test:
            mock_test.return_value = TEST_TIME
            Help.objects.create(
                id=HELP_ID_ONE,
                subject='Test subject',
                message='Test message',
                email_to=TEST_EMAIL
            )

            Help.objects.create(
                id=HELP_ID_TWO,
                subject='Test subject 2',
                message='Test message 2',
                email_to='test2@mail.com'
            )

    def test_filter_by_step(self):
        """Ensure that all() method returns all objects with it configuration."""
        result = Help.filter_with_step()
        expected = reversed(Help.objects.all().order_by('-create_at')[QUERYSET_START_STEP:
        QUERYSET_END_STEP])

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_filter(self):
        """Ensure that filter() method returns all Help objects with given arguments."""
        result = Help.filter(email_to=TEST_EMAIL, create_at=TEST_TIME)
        expected = Help.objects.filter(email_to=TEST_EMAIL, create_at=TEST_TIME)
        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_create(self):
        """Ensure that create() method creates and returns Help object with given test data."""
        data = {
            'subject': 'Test subject',
            'message': 'Test message',
            'email_to': 'test@mail.com'
        }

        result = Help.create(**data)
        expected = Help.objects.get(id=result.id)

        self.assertEqual(result, expected)

    def test_to_dict(self):
        """Ensure that to_dict() method converts Help object to Python's dictionary type."""
        help = Help.objects.get(id=HELP_ID_ONE)
        result = help.to_dict()

        expected = {
            'id': HELP_ID_ONE,
            'subject': 'Test subject',
            'message': 'Test message',
            'email_to': 'test@mail.com',
            'response_message': '',
            'create_at': TEST_TIME,
            'update_at': TEST_TIME
        }
        self.assertEqual(expected, result)

    def test_repr_(self):
        """Ensure that __repr__ method builds a proper repr representation of a Help object."""
        help_obj = Help.objects.get(id=HELP_ID_ONE)
        result = repr(help_obj)
        expected = """id: {}, message: {}, email_to: {}, response_message: {}, create_at: {},
        update_at: {}""".format(help_obj.id, help_obj.message, help_obj.email_to,
                                help_obj.response_message, help_obj.create_at, help_obj.update_at)

        self.assertEqual(result, expected)
