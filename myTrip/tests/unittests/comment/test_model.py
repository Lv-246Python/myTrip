"""This module contains Unit Tests for Comment app models."""

from datetime import datetime
from unittest.mock import patch

from django.test import TestCase

from checkpoint.models import Checkpoint
from comment.models import Comment
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip

GOOD_USER_ID = 1
BAD_USER_ID = 99
GOOD_TRIP_ID = 10
GOOD_CHECKPOINT_ID = 20
GOOD_PHOTO_ID = 30
GOOD_COMMENT_ID = 66
BAD_COMMENT_ID = 99

TEST_TIME = datetime(2017, 7, 25, 12, 00, 00)


class TestPlugin(TestCase):
    """Tests for Comment model."""

    def setUp(self):
        """Creates objects to provide tests."""
        with patch('django.utils.timezone.now') as mock_test:
            mock_test.return_value = TEST_TIME
            CustomUser.objects.create(
                id=BAD_USER_ID,
                first_name='test1',
                last_name='test1',
                email='test1@gmail.com',
                password='pass'
            )

            CustomUser.objects.create(
                id=GOOD_USER_ID,
                first_name='test',
                last_name='test',
                email='test.test@gmail.com',
                password='user pass'
            )

            Trip.objects.create(
                id=GOOD_TRIP_ID,
                user=CustomUser.objects.get(id=GOOD_USER_ID),
                title='title1',
                description='description1',
                status=0
            )

            Checkpoint.objects.create(
                id=GOOD_CHECKPOINT_ID,
                longitude=20.20,
                latitude=20.20,
                title='title1',
                description='description1',
                position_number=1,
                source_url='url1',
                trip=Trip.objects.get(id=10)
            )

            Photo.objects.create(
                id=GOOD_PHOTO_ID,
                src='src1',
                user=CustomUser.objects.get(id=GOOD_USER_ID),
                trip=Trip.objects.get(id=GOOD_TRIP_ID),
                checkpoint=Checkpoint.objects.get(id=GOOD_CHECKPOINT_ID),
                description='description1'
            )

            Comment.objects.create(
                id=GOOD_COMMENT_ID,
                message='test1',
                user=CustomUser.objects.get(id=GOOD_USER_ID),
                trip=Trip.objects.get(id=GOOD_TRIP_ID),
                checkpoint=Checkpoint.objects.get(id=GOOD_CHECKPOINT_ID),
                photo=Photo.objects.get(id=GOOD_PHOTO_ID)
            )

    def test_get_by_id(self):
        """Ensure that get by id method returns specific comment using id."""

        result = Comment.get_by_id(GOOD_COMMENT_ID)
        expected = Comment.objects.get(id=GOOD_COMMENT_ID)

        self.assertEqual(result, expected)

    def test_get_by_id_none(self):
        """Ensure that get_by_id method returns none if comment does not exist."""

        result = Comment.get_by_id(BAD_COMMENT_ID)
        self.assertIsNone(result)

    def test_filter_with_trip_and_checkpoint_and_photo_id(self):
        """Test for filter method returns all comments with corrected trip,checkpoint,photo ids."""

        trip = Trip.objects.get(id=10)
        checkpoint = Checkpoint.objects.get(id=20)
        photo = Photo.objects.get(id=30)
        result = Comment.filter(trip=trip, checkpoint=checkpoint, photo=photo)
        expected = Comment.objects.filter(trip=trip, checkpoint=checkpoint, photo=photo)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_filter_with_user_and_trip_and_checkpoint_and_photo_id_none(self):
        """Ensure that filter method works correctly with wrong id's."""

        trip = Trip.objects.get(id=10)
        checkpoint = Checkpoint.objects.get(id=20)
        photo = Photo.objects.get(id=30)
        result = Comment.filter(trip=trip, checkpoint=checkpoint, photo=photo)
        expected = Comment.objects.filter(trip=trip, checkpoint=checkpoint, photo=photo)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_create(self):
        """Ensure that create method creates Comment object."""

        user = CustomUser.objects.get(id=GOOD_USER_ID)
        trip = Trip.objects.get(id=GOOD_TRIP_ID)
        checkpoint = Checkpoint.objects.get(id=GOOD_CHECKPOINT_ID)
        photo = Photo.objects.get(id=GOOD_PHOTO_ID)

        data = {
            'message': 'test1',
            'user': user,
            'trip': trip,
            'checkpoint': checkpoint,
            'photo': photo
        }

        result = Comment.create(**data)
        expected = Comment.objects.get(id=result.id)

        self.assertEqual(result, expected)

    def test_to_dict(self, *args):
        """Ensure that to_dict methods builds a proper dict from Comment object."""

        comment = Comment.objects.get(id=GOOD_COMMENT_ID)
        result = comment.to_dict()
        expected = {
            'id': GOOD_COMMENT_ID,
            'message': 'test1',
            'user': GOOD_USER_ID,
            'trip': GOOD_TRIP_ID,
            'checkpoint': GOOD_CHECKPOINT_ID,
            'photo': GOOD_PHOTO_ID,
            'create_at': TEST_TIME,
            'update_at': TEST_TIME,
            'user_name': CustomUser.get_full_name(CustomUser.get_by_id(comment.user.id))
        }

        self.assertEqual(expected, result)

    def test_update(self):
        """Ensure that update method updates specific Comment object."""

        data = {
            'message': 'test message updated'
        }

        comment = Comment.objects.get(id=GOOD_COMMENT_ID)
        comment.update(**data)
        expected = Comment.objects.get(id=GOOD_COMMENT_ID)

        self.assertEqual(comment, expected)

    def test___repr__(self):
        """Ensure that __repr__ method builds a proper repr representation of a Comment object."""

        comment = Comment.objects.get(id=66)
        result = repr(comment)
        expected = """id:{}, message:{}, user:{}, trip:{},
                  checkpoint:{}, photo:{}, create_at:{}, 
                  update_at:{}, 
                  user_name:{}""".format(
            comment.id,
            comment.message,
            comment.user,
            comment.trip.id,
            comment.checkpoint.id,
            comment.photo.id,
            comment.create_at,
            comment.update_at,
            CustomUser.get_full_name(CustomUser.get_by_id(comment.user.id)))

        self.assertEqual(result, expected)
