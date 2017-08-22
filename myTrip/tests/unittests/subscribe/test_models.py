"""This module contains Unit Tests for Subscribe app models."""

from datetime import datetime
from unittest.mock import patch

from django.test import TestCase

from registration.models import CustomUser
from subscribe.models import Subscribe
from trip.models import Trip

TEST_TIME = datetime(2017, 7, 25, 12, 00, 00)

SUBSCRIBE_ID_ONE = 31
SUBSCRIBE_ID_TWO = 32
SUBSCRIBE_ID_THREE = 33
SUBSCRIBE_ID_FOUR = 34
NONE_OBJECT = None
BAD_SUBSCRIBE_ID = 99
BAD_USER_ID = 90
SUBSCRIBED_ID_GOOD = 1
LOGGED_USER_ID = 3
TRIP_ID_GOOD = 10


class TestPlugin(TestCase):
    """Tests for Comment model."""

    def setUp(self):
        """
        Preconfig for test.
        Create a model of trip, user, subscriber, subscribe.
        """
        with patch('django.utils.timezone.now') as mock_test:
            mock_test.return_value = TEST_TIME
            user_one = CustomUser.objects.create(
                id=1,
                first_name='test',
                last_name='test',
                email='test1.test@gmail.com',
                password='user pass'
            )

            user_two = CustomUser.objects.create(
                id=2,
                first_name='test',
                last_name='test',
                email='test2.test@gmail.com',
                password='user pass'
            )

            user_three = CustomUser.objects.create(
                id=LOGGED_USER_ID,
                first_name='test_name',
                last_name='test_name',
                email='test3@mail.com',
                password='password'
            )

            trip_one = Trip.objects.create(
                id=TRIP_ID_GOOD,
                user=user_one,
                title="my_title",
                description="some_cool_trip",
                status=0
            )

            trip_two = Trip.objects.create(
                id=11,
                user=user_two,
                title="my_title",
                description="some_cool_trip",
                status=0
            )

            Subscribe.objects.create(
                id=SUBSCRIBE_ID_ONE,
                user=user_three,
                subscribed=user_one,
                trip=NONE_OBJECT,
                create_at=TEST_TIME,
                update_at=TEST_TIME
            )

            Subscribe.objects.create(
                id=SUBSCRIBE_ID_TWO,
                user=user_three,
                subscribed=NONE_OBJECT,
                trip=trip_one,
                create_at=TEST_TIME,
                update_at=TEST_TIME
            )

            Subscribe.objects.create(
                id=SUBSCRIBE_ID_THREE,
                user=user_three,
                subscribed=NONE_OBJECT,
                trip=trip_two,
                create_at=TEST_TIME,
                update_at=TEST_TIME
            )
            Subscribe.objects.create(
                id=SUBSCRIBE_ID_FOUR,
                user=user_three,
                subscribed=user_two,
                trip=NONE_OBJECT,
                create_at=TEST_TIME,
                update_at=TEST_TIME
            )

    def test_filter_with_user_id(self):
        """Test for filter method returns all subscribes with corrected user id."""

        user = CustomUser.objects.get(id=LOGGED_USER_ID)
        result = Subscribe.filter(user=user.id)
        expected = Subscribe.objects.filter(user=user.id)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_filter_with_subscribed_id(self):
        """Test for filter method returns all subscribes with corrected subscribed id."""

        subscribed = CustomUser.objects.get(id=SUBSCRIBED_ID_GOOD)
        result = Subscribe.filter(subscribed=subscribed.id)
        expected = Subscribe.objects.filter(subscribed=subscribed.id)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_filter_with_trip_id(self):
        """Test for filter method returns all subscribes with corrected trip id."""

        trip = Trip.objects.get(id=TRIP_ID_GOOD)
        result = Subscribe.filter(trip=trip)
        expected = Subscribe.objects.filter(trip=trip)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_filter_with_user_none(self):
        """Ensure that filter() method returns None when wrong id were given."""

        user = CustomUser.get_by_id(user_id=BAD_USER_ID)
        result = Subscribe.filter(user=BAD_USER_ID)
        expected = Subscribe.objects.filter(user=BAD_USER_ID)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_create(self):
        """Ensure that create method creates Subscribe object."""

        user = CustomUser.objects.get(id=LOGGED_USER_ID)
        trip = Trip.objects.get(id=TRIP_ID_GOOD)

        data = {
            'user': user,
            'trip': trip,
            'subscribed': NONE_OBJECT
        }

        result = Subscribe.create(**data)
        expected = Subscribe.objects.get(id=result.id)

        self.assertEqual(result, expected)

    def test_to_dict(self, *args):
        """Ensure that to_dict methods builds a proper dict from Subscribe object."""

        comment = Subscribe.objects.get(id=SUBSCRIBE_ID_ONE)
        result = comment.to_dict()
        expected = {
            'id': SUBSCRIBE_ID_ONE,
            'user': LOGGED_USER_ID,
            'subscribed': SUBSCRIBED_ID_GOOD,
            'trip': NONE_OBJECT,
            'create_at': TEST_TIME,
            'update_at': TEST_TIME
        }

        self.assertEqual(expected, result)

    def test___repr__(self):
        """Ensure that __repr__ method builds a proper representation of a Subscribe object."""

        subscribe = Subscribe.objects.get(id=SUBSCRIBE_ID_ONE)
        result = repr(subscribe)
        expected = """id: {}, user: {}, subscribed: {}, trip: {}, create_at: {},
        update_at: {}""".format(
            subscribe.id, subscribe.user, subscribe.subscribed, subscribe.trip, subscribe.create_at,
            subscribe.update_at)

        self.assertEqual(result, expected)
