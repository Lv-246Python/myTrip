"""Contains model tests for registration app."""

from datetime import datetime

from django.test import TestCase
from unittest.mock import patch

from registration.models import CustomUser

TEST_TIME = datetime(2017, 7, 25, 12, 00, 00)


class CustomUserModelTests(TestCase):
    """
    Test CustomUser model methods.
    """

    def setUp(self):
        """
        Create CustomUser objects in database.
        """

        with patch('django.utils.timezone.now') as mock_test:
            mock_test.return_value = TEST_TIME
            CustomUser.objects.create(
                id=10,
                first_name='valid',
                last_name='valid',
                email='test@gmail.com',
                password='password'
            )

    def test_get_by_id(self):
        """
        Test CustomUser.get_by_id() method.
        """

        request = CustomUser.get_by_id(10)
        result = CustomUser.objects.get(id=10)
        self.assertEqual(request, result)

    def test_get_by_email(self):
        """
        Test CustomUser.get_by_email() method.
        """

        request = CustomUser.get_by_email('test@gmail.com')
        result = CustomUser.objects.get(email='test@gmail.com')
        self.assertEqual(request, result)

    def test_get_short_name(self):
        """
        Test CustomUser.get_short_name() method.
        """

        request = CustomUser.get_short_name(CustomUser)
        result = CustomUser.first_name
        self.assertEqual(request, result)

    def test_get_full_name(self):
        """
        Test CustomUser.get_full_name() method.
        """

        request = str(CustomUser.get_full_name(CustomUser))
        result = str(CustomUser.first_name) + ' ' + str(CustomUser.last_name)
        self.assertEqual(request, result)

    def test_update_first_name(self):
        """
        Test CustomUser.update() method, with 'first_name' only.
        """

        user = CustomUser.objects.get(id=10)
        request = 'John'
        user.update(request)
        result = user.first_name
        self.assertEqual(request, result)

    def test_update_last_name(self):
        """
        Test CustomUser.update() method, with 'last_name' only.
        """

        user = CustomUser.objects.get(id=10)
        request = 'Travolta'
        user.update(None, request)
        result = user.last_name
        self.assertEqual(request, result)

    def test_update_both(self):
        """
        Test CustomUser.update() method, with both 'first_name' & 'last_name'.
        """

        user = CustomUser.objects.get(id=10)
        user.update('John', 'Travolta')
        self.assertEqual(user.first_name, 'John')
        self.assertEqual(user.last_name, 'Travolta')

    def test_to_dict(self):
        """
        Test CustomUser.to_dict() method.
        """

        with patch('django.utils.timezone.now') as mock_test:
            mock_test.return_value = TEST_TIME
            user = CustomUser.objects.create(
                id=20,
                first_name='valid',
                last_name='valid',
                email='test_2@gmail.com',
                password='password'
            )

        request = user.to_dict()
        result = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'create_at': TEST_TIME,
            'update_at': TEST_TIME
        }
        self.assertEqual(request, result)
