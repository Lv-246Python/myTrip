"""Contains view tests for registration app."""

from mock import patch
from json import dumps

from django.urls import reverse
from django.test import TestCase

from registration.models import CustomUser, HashUser


FACEBOOK_AUTH_URL = "http://triptrck.com/api/v1/auth/facebook_auth/"
FACEBOOK_LOGIN_URL = "http://triptrck.com/api/v1/auth/facebook_login/?code=test_code"
ACTIVATION_HASH = 'dalkdhasldabsas123asad'
ACTIVATION_URL = "http://triptrck.com/api/v1/auth/activation?hash=" + ACTIVATION_HASH

def auth_urlopen(url):

    class Response:
        def __init__(self, data):
            self.data = dumps(data).encode()

        def read(self):
            return self.data

    if 'oauth' in url:
        data = {'access_token': 'test_token'}
    elif 'access_token' in url:
        data = {'id': 1412412141, 'name': 'Bob Dylan'}

    return Response(data=data)


class RegistrationViewsTests(TestCase):
    """
    Test 'login', 'logout' and 'register' views.
    """

    def setUp(self):
        """
        Create CustomUser record in database.
        """

        self.user = CustomUser.objects.create(id=5,
                                              email='test@gmail.com')
        self.user.is_active = True
        self.user.set_password('password')
        self.user.save()
        self.not_active_user = CustomUser.objects.create(id=6,
                                              email='test2@gmail.com')
        self.not_active_user.set_password('password')
        self.not_active_user.save()
        hash_user = HashUser.create(self.not_active_user, ACTIVATION_HASH)

    def test_login_success(self):
        """
        Test 'login' view.
        """

        request = self.client.post(reverse('login_view'),
                                   dumps({"email": "test@gmail.com", "password": "password"}),
                                   content_type='application/json')
        self.assertEqual(request.status_code, 200)

    def test_login_wrong_email(self):
        """
        Test 'login' view with wrong email.
        """

        request = self.client.post(reverse('login_view'),
                                   dumps({"email": "krest@gmail.com", "password": "password"}),
                                   content_type='application/json')
        self.assertEqual(request.status_code, 403)

    def test_login_wrong_password(self):
        """
        Test 'login' view with wrong password.
        """

        request = self.client.post(reverse('login_view'),
                                   dumps({"email": "test@gmail.com", "password": "pwd"}),
                                   content_type='application/json')
        self.assertEqual(request.status_code, 403)

    def test_login_wrong_email_and_password(self):
        """
        Test 'login' view with wrong email & password.
        """

        request = self.client.post(reverse('login_view'),
                                   dumps({"email": "krest@gmail.com", "password": "pwd"}),
                                   content_type='application/json')
        self.assertEqual(request.status_code, 403)

    def test_logout_success(self):
        """
        Test 'logout' view.
        """

        self.client.login(username='test@gmail.com', password='password')

        request = self.client.get(reverse('logout_view'))
        self.assertEqual(request.status_code, 200)

    def test_logout_user_not_authenticated(self):
        """
        Test 'logout' view while not authenticated.
        """

        request = self.client.get(reverse('logout_view'))
        self.assertEqual(request.status_code, 400)

    def test_register_success(self):
        """
        Test 'register' view.
        """

        request = self.client.post(reverse('register_view'),
                                   dumps({"email": "reg_test@gmail.com", "password": "pwd",
                                          "created": None, "last_modified": None}),
                                   content_type='application/json')
        self.assertEqual(request.status_code, 201)

    def test_register_email_already_registered(self):
        """
        Test 'register' view with email that already exists in database.
        """

        request = self.client.post(reverse('register_view'),
                                   dumps({"email": "test@gmail.com", "password": "pwd",
                                          "created": None, "last_modified": None}),
                                   content_type='application/json')
        self.assertEqual(request.status_code, 400)

    def test_register_email_is_invalid_format(self):
        """
        Test 'register' view with email that is invalid format.
        """

        request = self.client.post(reverse('register_view'),
                                   dumps({"email": "test_gmail.com", "password": "pwd",
                                          "created": None, "last_modified": None}),
                                   content_type='application/json')
        self.assertEqual(request.status_code, 400)

    def test_facebook_auth(self):
        """
        Test 'Facebook_auth" view'
        """

        request = self.client.get(FACEBOOK_AUTH_URL)
        self.assertEqual(request.status_code, 302)

    @patch('registration.views.urlopen', side_effect=auth_urlopen)
    def test_facebook_login(self, mock):
        """
        Test Facebook_login view
        """

        request = self.client.get(FACEBOOK_LOGIN_URL)
        self.assertEqual(request.status_code, 302)

    def test_activation(self):
        """
        Test activation via email
        """
        request = self.client.get(ACTIVATION_URL)
        self.assertEqual(request.status_code, 200)