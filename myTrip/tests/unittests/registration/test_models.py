"""Contains model tests for registration app."""

from datetime import datetime
from django.test import TestCase

from registration.models import CustomUser


class CustomUserModelTests(TestCase):
    """
    Test CustomUser model methods.
    """

    def setUp(self):
        """
        Create CustomUser record in database.
        """

        date = datetime.now()
        self.user = CustomUser.objects.create(id=3,
                                              first_name='Roman',
                                              last_name='Hrytskiv',
                                              email='test@gmail.com',
                                              created=date,
                                              last_modified=date)
        self.user.set_password('password')
        self.user.save()

    def test_get_by_id(self):
        """
        Test CustomUser.get_by_id() method.
        """

        request = self.user.get_by_id(3)
        result = CustomUser.objects.get(id=3)
        self.assertEqual(request, result)

    def test_get_by_email(self):
        """
        Test CustomUser.get_by_email() method.
        """

        request = self.user.get_by_email('test@gmail.com')
        result = CustomUser.objects.get(email='test@gmail.com')
        self.assertEqual(request, result)

    def test_get_short_name(self):
        """
        Test CustomUser.get_short_name() method.
        """

        request = self.user.get_short_name()
        result = self.user.first_name
        self.assertEqual(request, result)

    def test_get_full_name(self):
        """
        Test CustomUser.get_full_name() method.
        """

        request = self.user.get_full_name()
        result = self.user.first_name + ' ' + self.user.last_name
        self.assertEqual(request, result)

    def test_update_first_name(self):
        """
        Test CustomUser.update() method, with 'first_name' only.
        """

        request = self.user.update('John')
        result = self.user.first_name
        self.assertEqual(request, result)

    def test_update_last_name(self):
        """
        Test CustomUser.update() method, with 'last_name' only.
        """

        request = self.user.update(None, 'Travolta')
        result = self.user.last_name
        self.assertEqual(request, result)

    def test_update_both(self):
        """
        Test CustomUser.update() method, with both 'first_name' & 'last_name'.
        """

        request = self.user.update('John', 'Travolta')
        result = self.user.first_name + ' ' + self.user.last_name
        self.assertEqual(request, result)

    def test_to_dict(self):
        """
        Test CustomUser.to_dict() method.
        """

        request = self.user.to_dict()
        result = {
            'id': self.user.id,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'email': self.user.email,
        }
        self.assertEqual(request, result)
