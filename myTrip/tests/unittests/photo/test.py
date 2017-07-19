"""This module contains Unit Tests for Photo app models."""

from datetime import datetime

from django.test import TestCase

from checkpoint.models import Checkpoint
from comment.models import Comment
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip


class TestPlugin(TestCase):
    """Tests for Photo model."""

    def setUp(self):
        """Creates objects to provide tests."""
        CustomUser.objects.create(
            id=1,
            first_name='test',
            last_name='test',
            email='test@gmail.com',
            password='password'
        )

        Trip.objects.create(
            id=1,
            user_id=1,
            title='title1',
            description='description',
            created_at=datetime(2017, 7, 18, 15, 19, 24),
            status=0
        )

        Trip.objects.create(
            id=2,
            user_id=1,
            title='title2',
            description='description2',
            created_at=datetime(2017, 7, 18, 15, 19, 24),
            status=0
        )

        Checkpoint.objects.create(
            id=1,
            longitude=123,
            latitude=321,
            title='title1',
            description='description1',
            position_number=1,
            source_url='url1',
            trip=1
        )

        Checkpoint.objects.create(
            id=2,
            longitude=543,
            latitude=456,
            title='title2',
            description='description2',
            position_number=2,
            source_url='url2',
            trip=2
        )

        Photo.objects.create(
            id=5,
            src='src1',
            user_id=1,
            trip_id=1,
            checkpoint_id=1,
            description='description1'
        )

        Photo.objects.create(
            id=6,
            src='src2',
            user_id=1,
            trip_id=2,
            checkpoint_id=2,
            description='description2'
        )


    def test_get_by_id(self):
        """Ensure that get by id method returns specific photo using id."""

        result = Photo.get_by_id(6)
        expected = Photo.objects.get(id=6)

        self.assertEqual(result, expected)

    def test_get_by_id_none(self):
        """Ensure that get_by_id method returns none if photo does not exist."""

        result = Photo.get_by_id(10)
        self.assertIsNone(result)

    def test_filter_method(self):
        """Test for filter method returns all photos with given trip, checkpoint."""

        result = Photo.filter(trip_id=1, checkpoint_id=1)
        expected = Photo.objects.filter(trip=1, checkpoint=1)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_filter_method_id_none(self):
        """Ensure that filter method works correctly with wrong id's."""

        result = Photo.filter(trip_id=25, checkpoint_id=25)
        expected = Photo.objects.filter(trip=99, checkpoint=99)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)


    def test_create(self):
        """Ensure that create method creates Photo object."""

        user = CustomUser.objects.get(id=1)
        trip = Trip.objects.get(id=1)
        checkpoint = Checkpoint.objects.get(id=1)

        data = {
            'src': 'test url',
            'description': "13w43yghert5er",
            'user': user,
            'trip': trip,
            'checkpoint': checkpoint,
        }

        result = Photo.create(**data)
        expected = Photo.objects.get(id=result.id)

        self.assertEqual(result, expected)

    def test_update(self):
        """Ensure that update method updates specific Photo object."""

        data = {
            'description': 'test description update'
        }

        photo = Photo.objects.get(id=6)
        photo.update(**data)
        expected = Photo.objects.get(id=6)

        self.assertEqual(photo, expected)


