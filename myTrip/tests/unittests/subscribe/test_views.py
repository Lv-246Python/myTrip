"""Testing module for Subscribe views."""

from django.test import TestCase, Client

from registration.models import CustomUser
from subscribe.models import Subscribe
from trip.models import Trip

NONE_OBJECT = None
TRIP_ID_GOOD = 10
TRIP_ID_BAD = 99
LOGGED_USER = 2
SUBSCRIBED_ID_GOOD = 1
SUBSCRIBED_ID_BAD = 99


def url_with_trip(trip_id=TRIP_ID_GOOD):
    """
    Function that returns url to get subscribes by trip id, trip id is required.
    By default defines good url.
    """
    return '/api/v1/trip/{}/subscribe/'.format(trip_id)


def url_with_subscribe(subscribed_id=SUBSCRIBED_ID_GOOD):
    """
    Function that returns url to get subscribes by subscribed id, subscribed id is required.
    By default defines good url.
    """
    return '/api/v1/subscribe/{}/'.format(subscribed_id)


def url_with_user():
    """
    Function that defines url to get subscribes by user id from request.body.
    Login by Client from django tests utils os required to work correctly.
    """
    return '/api/v1/subscribe/'


class ViewTest(TestCase):
    """ Test for GET, POST methods in subscribe's view """

    def setUp(self):
        """
        Preconfig for test.
        Include instance of Client to class as attribute
        Create a model of trip, subscribed, user.
        """
        self.client = Client()
        user = CustomUser.objects.create(
            id=SUBSCRIBED_ID_GOOD,
            first_name='test',
            last_name='test',
            email='test.test@gmail.com',
            password='user pass'
        )

        self.user = CustomUser.objects.create(
            id=LOGGED_USER,
            first_name='test_name',
            last_name='test_name',
            email='test@mail.com',
            password='password'
        )

        self.user.set_password('password')
        self.user.save()
        self.client = Client()
        self.client.login(username="test@mail.com", password="password")

        trip = Trip.objects.create(
            id=TRIP_ID_GOOD,
            user=user,
            title="my_title",
            description="some_cool_trip",
            status=0
        )

        Subscribe.objects.create(
            id=10,
            user=self.user,
            subscribed=user,
            trip=NONE_OBJECT
        )

        Subscribe.objects.create(
            id=11,
            user=self.user,
            subscribed=NONE_OBJECT,
            trip=trip
        )

    def test_get_by_user_id(self):
        """
        Ensure that get method returns status 200 with given user owner's
        Object<CustomUser> id.
        """
        response = self.client.get(url_with_user())
        self.assertEqual(response.status_code, 200)

    def test_get_by_user_id_length(self):
        """Ensure that get method returns correct number of Subscribe objects."""

        response = self.client.get(url_with_user())
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_get_by_trip_id(self):
        """
        Ensure that get method returns status 200 with given trip
        Object<Trip> id.
        """
        response = self.client.get(url_with_trip())
        self.assertEqual(response.status_code, 200)

    def test_get_by_trip_id_none(self):
        """
        Ensure that get method returns none from filter method
        of models objects when some wrong id was send.
        """

        response = self.client.get(url_with_trip(trip_id=TRIP_ID_BAD))
        data = response.json()
        self.assertEqual(len(data), 0)

    def test_get_by_subscribed_id(self):
        """
        Ensure that get method returns status 200 with given subscribed
        Object<Subscribed> id.
        """
        response = self.client.get(url_with_subscribe())
        self.assertEqual(response.status_code, 200)

    def test_get_by_subscribed_id_none(self):
        """
        Ensure that get method returns none from filter method
        of models objects when some wrong id was send.
        """

        response = self.client.get(url_with_subscribe(subscribed_id=SUBSCRIBED_ID_BAD))
        data = response.json()
        self.assertEqual(len(data), 0)

    def test_post_subscribed_status_success(self):
        """Ensure that post method creates new object with it relations and status 201."""

        self.client.post(url_with_subscribe())
        response = self.client.post(url_with_subscribe())
        self.assertEqual(response.status_code, 201)

    def test_post_trip_delete_if_exists(self):
        """
        Ensure that post method checks if this subscribe object already exists and deletes it.
        Returns status 200.
        """

        response = self.client.post(url_with_trip())
        self.assertEqual(response.status_code, 200)

    def test_post_trip_status_success(self):
        """
        Ensure that post method checks if this subscribe object already exists. Deletes it.
        And creates another Subscribe object and returns status 201.
        """

        self.client.post(url_with_trip())
        response = self.client.post(url_with_trip())
        self.assertEqual(response.status_code, 201)
