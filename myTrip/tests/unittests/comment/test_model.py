"""This module contains Unit Tests for Comment app models"""
from datetime import datetime

from django.test import TestCase

from comment.models import Comment
from registration.models import CustomUser
from trip.models import Trip
from checkpoint.models import Checkpoint
from photo.models import Photo


class TestPlugin(TestCase):
    """Tests for Comment model"""

    def setUp(self):
        CustomUser.objects.create(
            id=1,
            first_name='test',
            last_name='test',
            email='test.test@gmail.com',
            password='user pass'
        )

        Trip.objects.create(
            id=10,
            user_id=CustomUser.objects.get(id=1),
            title='title1',
            description='description1',
            created_at=datetime.now(),
            status=0
        )

        Trip.objects.create(
            id=11,
            user_id=CustomUser.objects.get(id=1),
            title='title2',
            description='description2',
            created_at=datetime.now(),
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
            trip=Trip.objects.get(id=10)
        )

        Checkpoint.objects.create(
            id=21,
            longitude=21.21,
            latitude=21.21,
            title='title2',
            description='description2',
            position_number=2,
            source_url='url2',
            trip=Trip.objects.get(id=11)
        )

        Photo.objects.create(
            id=30,
            src='src1',
            user=CustomUser.objects.get(id=1),
            trip=Trip.objects.get(id=10),
            checkpoint=Checkpoint.objects.get(id=20),
            description='description1'
        )

        Photo.objects.create(
            id=31,
            src='src2',
            user=CustomUser.objects.get(id=1),
            trip=Trip.objects.get(id=11),
            checkpoint=Checkpoint.objects.get(id=21),
            description='description2'
        )

        Comment.objects.create(
            id=1,
            name='comment test',
            user=CustomUser.objects.get(id=1),
            trip=Trip.objects.get(id=10),
            checkpoint=Checkpoint.objects.get(id=20),
            photo=Photo.objects.get(id=30),
            created=datetime(2017, 7, 17, 21, 00)
        )

    def test_get_by_id(self):
        """Ensure that get by id method returns specific comment using id"""

        result = Comment.get_by_id(1)
        expected = Comment.objects.get(id=1)

        self.assertEqual(result, expected)

    def test_get_by_trip_id(self):
        """Ensure that get by trip id method returns all comments with corrected trip id"""

        result = Comment.get_by_trip_id(10)
        expected = Comment.objects.filter(trip=10)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_get_by_checkpoint_id(self):
        """Ensure that get by checkpoint id method returns all comments with corrected checkpoint id"""

        result = Comment.get_by_checkpoint_id(20)
        expected = Comment.objects.filter(checkpoint=20)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_get_by_photo_id(self):
        """Ensure that get by photo id method returns all comments with corrected photo id"""

        result = Comment.get_by_trip_id(30)
        expected = Comment.objects.filter(photo=30)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_get_by_user_id(self):
        """Ensure that get by user id method returns all comments with corrected user id"""

        result = Comment.get_by_user_id(1)
        expected = Comment.objects.filter(user=1)

        self.assertQuerysetEqual(result, map(repr, expected), ordered=False)

    def test_get_by_id_none(self):
        """Ensure that get_by_id method returns none if plugin does not exist"""

        result = Comment.get_by_id(99)
        self.assertIsNone(result)

    def test_to_dict(self):
        """Ensure that to_dict methods builds a proper dict from comment"""

        comment = Comment.objects.get(id=1)
        result = comment.to_dict()
        expected = {
            'id': 1,
            'message': 'test_message',
            'user_id': 1,
            'trip_id': 10,
            'checkpoint_id': 20,
            'photo_id': 30,
            'created': datetime(2017, 7, 17, 21, 00)
        }

        self.assertDictEqual(result, expected)

    def test_create(self):
        """Ensure that create method creates Comment"""

        user = CustomUser.objects.get(id=1)
        trip = Trip.objects.get(id=10)
        checkpoint = Checkpoint.objects.get(id=20)
        photo = Photo.objects.get(id=30)

        data = {
            'message': 'test message',
            'user': user.id,
            'trip': trip.id,
            'checkpoint': checkpoint.id,
            'photo': photo.id,
            'created': datetime(2017, 7, 17, 21, 00)
        }

        result = Comment.create(**data)
        expected = Comment.objects.get(id=result.id)

        self.assertEqual(result, expected)

    def test_update(self):
        """Ensure that update method updates specific comment"""

        data = {
            'message': 'test message updated'
        }

        comment = Comment.objects.get(id=1)
        comment.update(**data)
        expected = Comment.objects.get(id=1)

        self.assertEqual(comment, expected)

    def test___repr__(self):
        """Ensure that __repr__ method builds a proper repr representation of a comment"""

        comment = Comment.objects.get(id=1)
        result = repr(comment)
        expected = 'Comment id: {}, message: {}, user: {}, trip: {}, checkpoint{},' \
                   'photo{}, created{}'.format(comment.id,
                                               comment.message,
                                               comment.user.id,
                                               comment.trip.id,
                                               comment.checkpoint.id,
                                               comment.photo.id,
                                               comment.created)

        self.assertEqual(result, expected)
