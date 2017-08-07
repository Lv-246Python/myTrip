"""This module contains Unit Tests for Help app models."""

from datetime import datetime

from django.test import TestCase
from unittest.mock import patch

from help.models import Help

TEST_TIME = datetime(2017, 7, 25, 12, 00, 00)
QUERYSET_ALL_STEP = 20
HELP_ID_ONE = 10
HELP_ID_TWO = 11


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
                email_to='test@mail.com'
            )

            Help.objects.create(
                id=HELP_ID_TWO,
                subject='Test subject 2',
                message='Test message 2',
                email_to='test2@mail.com'
            )

    def test_all(self):
        """Ensure that all() method returns all objects with it configuration."""
        result = Help.all()
        expected = Help.objects.all().order_by('-create_at')[:QUERYSET_ALL_STEP]

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
            'create_at': TEST_TIME,
            'update_at': TEST_TIME
        }
        self.assertEqual(expected, result)

    def test_repr_(self):
        """Ensure that __repr__ method builds a proper repr representation of a Help object."""
        help = Help.objects.get(id=HELP_ID_ONE)
        result = repr(help)
        expected = """id: {}, message: {}, email_to: {},  create_at: {}, update_at: {}""".format(
            help.id, help.message, help.email_to, help.create_at, help.update_at)

        self.assertEqual(result, expected)