"""This module contains Unit Tests for Comment app models."""

from datetime import datetime

from django.test import TestCase

from checkpoint.models import Checkpoint
from comment.models import Comment
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip


class TestPlugin(TestCase):
    """Tests for Comment model."""

    def setUp(self):
        """Creates objects to provide tests."""
        CustomUser.objects.create(
            id=1,
            first_name='test',
            last_name='test',
            email='test.test@gmail.com',
            password='user pass'
        )

        Trip.objects.create(
            id=10,
            user_id=1,
            title='title1',
            description='description1',
            created_at=datetime(2017, 7, 18, 15, 19, 24),
            status=0
        )

        Trip.objects.create(
            id=11,
            user_id=1,
            title='title2',
            description='description2',
            created_at=datetime(2017, 7, 18, 15, 19, 24),
            status=0
        )

        Checkpoint.objects.create(
            id=20,
            longitude=20.20,
            latitude=20.20,
            title='title1',
            description='description1',
            position_number=1,
            source_url='url1',
            trip=10
        )

        Checkpoint.objects.create(
            id=21,
            longitude=21.21,
            latitude=21.21,
            title='title2',
            description='description2',
            position_number=2,
            source_url='url2',
            trip=11
        )

        Photo.objects.create(
            id=30,
            src='src1',
            user_id=1,
            trip_id=10,
            checkpoint_id=20,
            description='description1'
        )

        Photo.objects.create(
            id=31,
            src='src2',
            user_id=1,
            trip_id=11,
            checkpoint_id=21,
            description='description2'
        )

        Comment.objects.create(
            id=66,
            message='test message',
            user=CustomUser.objects.get(id=1),
            trip=Trip.objects.get(id=10),
            checkpoint=Checkpoint.objects.get(id=20),
            photo=Photo.objects.get(id=30),
            created_at=datetime(2017, 7, 18, 15, 19, 24)
        )

    def test_get_by_id(self):
        """Ensure that get by id method returns specific comment using id."""

        result = Comment.get_by_id(66)
        expected = Comment.objects.get(id=66)

        self.assertEqual(result, expected)

    def test_get_by_id_none(self):
        """Ensure that get_by_id method returns none if comment does not exist."""

        result = Comment.get_by_id(99)
        self.assertIsNone(result)

    def test_filter_with_trip_and_checkpoint_and_photo_id(self):
        """Test for filter method returns all comments with corrected trip,checkpoint,photo ids."""

        result = Comment.filter(trip_id=10, checkpoint_id=20, photo_id=30)
        expected = Comment.objects.filter(trip=10, checkpoint=20, photo=30)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_filter_with_trip_and_checkpoint_and_photo_id_none(self):
        """Ensure that filter method works correctly with wrong id's."""

        result = Comment.filter(trip_id=99, checkpoint_id=99, photo_id=99)
        expected = Comment.objects.filter(trip=99, checkpoint=99, photo=99)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_get_by_user_id(self):
        """Ensure that get by user id method returns all comments with corrected user id."""

        result = Comment.get_by_user_id(1)
        expected = Comment.objects.filter(user=1)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_create(self):
        """Ensure that create method creates Comment object."""

        user = CustomUser.objects.get(id=1)
        trip = Trip.objects.get(id=10)
        checkpoint = Checkpoint.objects.get(id=20)
        photo = Photo.objects.get(id=30)

        data = {
            'message': 'test message',
            'user': user,
            'trip': trip,
            'checkpoint': checkpoint,
            'photo': photo
        }

        result = Comment.create(**data)
        expected = Comment.objects.get(id=result.id)

        self.assertEqual(result, expected)

    def test_to_dict(self):
        """Ensure that to_dict methods builds a proper dict from Comment object."""

        comment = Comment.objects.get(id=66)
        result = comment.to_dict()
        expected = {
            'id': 66,
            'message': 'test message',
            'user': 1,
            'trip': 10,
            'checkpoint': 20,
            'photo': 30,
            'created_at': datetime(2017, 7, 18, 15, 19, 24),
            'modified_at': None
        }

        self.assertDictEqual(result, expected)

    def test_update(self):
        """Ensure that update method updates specific Comment object."""

        data = {
            'message': 'test message updated'
        }

        comment = Comment.objects.get(id=66)
        comment.update(**data)
        expected = Comment.objects.get(id=66)

        self.assertEqual(comment, expected)

    def test___repr__(self):
        """Ensure that __repr__ method builds a proper repr representation of a Comment object."""

        comment = Comment.objects.get(id=66)
        result = repr(comment)
        expected = "id:{}, message:{}, user:{}, trip:{}, " \
                   "checkpoint:{}, photo:{}, created_at:{}, updated_at:{}".format(
                       comment.id,
                       comment.message,
                       comment.user,
                       comment.trip.id,
                       comment.checkpoint.id,
                       comment.photo.id,
                       comment.created_at,
                       comment.modified_at)

        self.assertEqual(result, expected)
