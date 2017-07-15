"""Contains tests for registration app."""

import random
import string

from json import dumps
from django.test import TestCase
from django.urls import reverse

from registration.models import CustomUser

# random emails
valid = ''.join(random.choices(string.ascii_lowercase +
                               string.digits, k=10)) + '@gmail.com'
invalid = ''.join(random.choices(string.ascii_lowercase +
                                 string.digits, k=10)) + '_gmail.com'

# random names
f_name = ''.join(random.choices(string.ascii_lowercase + string.digits, k=5))
l_name = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))

# create user and assign values
user = CustomUser.create(email=valid, password=valid)
user.first_name = f_name
user.last_name = l_name


class CustomUserModelTests(TestCase):
    """
    Test CustomUser model methods.
    """

    def test_create(self):
        """
        Test CustomUser.create().
        """

        self.assertIsNotNone(CustomUser.create(
            email=valid, password=valid))  # both fields filled
        self.assertRaises(ValueError, CustomUser.create,
                          None, valid)  # 'email' field is empty
        self.assertRaises(ValueError, CustomUser.create,
                          valid, None)  # 'password' field is empty
        self.assertRaises(ValueError, CustomUser.create,
                          None, None)  # both fields empty

    def test_get_by_id(self):
        """
        Test CustomUser.get_by_id().
        """

        n_user = CustomUser.create(email=valid, password=valid) # create user again (@staticmethod)

        self.assertIsNotNone(CustomUser.get_by_id(n_user.id))  # get by good id
        self.assertIsNone(CustomUser.get_by_id(n_user.id + 1))  # get by wrong id

    def test_get_by_email(self):
        """
        Test CustomUser.get_by_email().
        """

        n_user = CustomUser.create(email=valid, password=valid) # create user again (@staticmethod)

        self.assertIsNotNone(CustomUser.get_by_email(
            n_user.email))  # get by good email
        self.assertIsNone(CustomUser.get_by_email(
            n_user.email + '1'))  # get by wrong email

    def test_get_short_name(self):
        """
        Test CustomUser.get_short_name().
        """

        self.assertIs(user.get_short_name(), user.first_name) # get good first_name
        self.assertIsNot(user.get_short_name(), user.last_name)  # compare

    def test_get_full_name(self):
        """
        Test CustomUser.get_full_name().
        """

        self.assertEqual(user.get_full_name(), '{} {}'.format(
            user.first_name, user.last_name))  # get good full_name
        self.assertNotEqual(user.get_full_name(),
                            user.first_name + user.last_name)  # compare

    def test_update(self):
        """
        Test CustomUser.update().
        """

        self.assertEqual(user.update(first_name=l_name),
                         l_name)  # update first_name
        self.assertEqual(user.update(last_name=f_name),
                         f_name)  # update last_name

    def test_to_dict(self):
        """
        Test CustomUser.update().
        """

        user_dict = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        }

        self.assertEqual(user.to_dict(), user_dict) # check if conversion is correct


class RegistrationViewsTests(TestCase):
    """
    Test registration app views.
    """

    def test_register(self):
        """
        Test 'register' view.
        """

        create_user = self.client.get(
            reverse('register_view'))                   # bad request
        self.assertEqual(create_user.status_code, 400)

        create_user = self.client.post(reverse('register_view'),                  # user created
                                       dumps(
                                           {"email": valid, "password": valid}),
                                       content_type='application/json')
        self.assertEqual(create_user.status_code, 201)

        create_user = self.client.post(reverse('register_view'),                  # email exists
                                       dumps(
                                           {"email": valid, "password": valid}),
                                       content_type='application/json')
        self.assertEqual(create_user.status_code, 400)

        create_user = self.client.post(reverse('register_view'),                  # invalid email
                                       dumps(
                                           {"email": invalid, "password": valid}),
                                       content_type='application/json')
        self.assertEqual(create_user.status_code, 400)

    def test_login(self):
        """
        Test 'login' view.
        """

        login_user = self.client.get(
            reverse('login_view'))                       # bad request
        self.assertEqual(login_user.status_code, 400)

        create_user = self.client.post(reverse('register_view'),                  # user created
                                       dumps(
                                           {"email": valid, "password": valid}),
                                       content_type='application/json')
        self.assertEqual(create_user.status_code, 201)

        login_user = self.client.post(reverse('login_view'),                      # user logged in
                                      dumps(
                                          {"email": valid, "password": valid}),
                                      content_type='application/json')
        self.assertEqual(login_user.status_code, 200)

        login_user = self.client.post(reverse('login_view'),                      # email invalid
                                      dumps(
                                          {"email": invalid, "password": valid}),
                                      content_type='application/json')
        self.assertEqual(login_user.status_code, 403)

        login_user = self.client.post(reverse('login_view'),                      # pass invalid
                                      dumps(
                                          {"email": valid, "password": invalid}),
                                      content_type='application/json')
        self.assertEqual(login_user.status_code, 403)

        login_user = self.client.post(reverse('login_view'),                      # both invalid
                                      dumps(
                                          {"email": invalid, "password": invalid}),
                                      content_type='application/json')
        self.assertEqual(login_user.status_code, 403)

    def test_logout(self):
        """
        Test 'logout' view.
        """

        logout_user = self.client.post(
            reverse('logout_view'))                    # bad request
        self.assertEqual(logout_user.status_code, 400)

        create_user = self.client.post(reverse('register_view'),                  # user created
                                       dumps(
                                           {"email": valid, "password": valid}),
                                       content_type='application/json')
        self.assertEqual(create_user.status_code, 201)

        login_user = self.client.post(reverse('login_view'),                      # user logged in
                                      dumps(
                                          {"email": valid, "password": valid}),
                                      content_type='application/json')
        self.assertEqual(login_user.status_code, 200)

        logout_user = self.client.get(
            reverse('logout_view'))                     # user logged out
        self.assertEqual(logout_user.status_code, 200)

        logout_user = self.client.get(
            reverse('logout_view'))                     # not logged in
        self.assertEqual(logout_user.status_code, 400)
