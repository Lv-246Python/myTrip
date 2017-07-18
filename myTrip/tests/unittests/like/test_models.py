"""This module contains Unit Tests for Contact app models."""

from datetime import datetime
from django.test import TestCase

from checkpoint.models import Checkpoint
from comment.models import Comment
from like.models import Like
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip


class LikeTest(TestCase):
    """Tests for contacts."""

    def setUp(self):
        CustomUser.objects.create(
            id=1,
            first_name='first_name',
            last_name='last_name',
            email='test.test@gmail.com',
            password='userpassword'
        )

        Trip.objects.create(
            id=10,
            user_id=CustomUser.objects.get(id=1),
            title='trip_title',
            description='trip_description1',
            created_at=datetime.now(),
            status=0
        )

        Checkpoint.objects.create(
            id=20,
            longitude=20.20,
            latitude=20.20,
            title='checkpoint_title',
            description='checkpoint_description',
            position_number=1,
            source_url='checkpoint_url',
            trip=Trip.objects.get(id=10)
        )

        Photo.objects.create(
            id=30,
            src='photo_src',
            user=CustomUser.objects.get(id=1),
            trip=Trip.objects.get(id=10),
            checkpoint=Checkpoint.objects.get(id=20),
            description='photo_description'
        )

        Comment.objects.create(
            id=40,
            name='comment test',
            user=CustomUser.objects.get(id=1),
            trip=Trip.objects.get(id=10),
            checkpoint=Checkpoint.objects.get(id=20),
            photo=Photo.objects.get(id=30),
            created=datetime(2017, 7, 17, 21, 00)
        )

        Like.objects.create(
            id=50,
            user=CustomUser.objects.get(id=1),
            trip=Trip.objects.get(id=10),
            checkpoint=None,
            photo=None,
            comment=None
        )

    def test_get_by_id(self):
        """Test Like.get_by_id method."""

        request = Like.objects.get(50)
        result = Like.objects.get(id=50)
        self.assertEqual(request, result)

    def test_get_by_user_id(self):
        """Test Like.get_by_user_id method."""

        request = Like.objects.get_by_user_id(1)
        result = Like.objects.get_by_user_id(id=1)
        self.assertEqual(request, result)

    def test_get_by_trip_id(self):
        """Test Like.get_by_trip_id method."""

        request = Like.objects.get_by_trip_id(10)
        result = Like.objects.get_by_trip_id(id=10)
        self.assertEqual(request, result)

    def test_get_by_checkpoint_id(self):
        """Test Like.get_by_checkpoint_id method."""

        request = Like.objects.get_by_checkpoint_id(20)
        result = Like.objects.get_by_checkpoint_id(id=20)
        self.assertEqual(request, result)

    def test_get_by_photo_id(self):
        """Test Like.get_by_photo_id method."""

        request = Like.objects.get_by_photo_id(30)
        result = Like.objects.get_by_photo_id(id=30)
        self.assertEqual(request, result)

    def test_get_by_comment_id(self):
        """Test Like.get_by_comment_id method."""

        request = Like.objects.get_by_comment_id(40)
        result = Like.objects.get_by_comment_id(id=40)
        self.assertEqual(request, result)

    def test_to_dict(self):
        """Test Like.to_dict method."""

        like = Like.objects.get(50)
        request = like.to_dict()
        result = {
            'id': 50,
            'user_id': 1,
            'trip_id': 10,
            'checkpoint_id': None,
            'photo_id': None,
            'comment_id': None
        }
        self.assertEqual(request, result)

    def test_create(self):
        """Test Like.create method."""

        user = CustomUser.objects.get(id=1)
        trip = Trip.objects.get(id=10)
        checkpoint = Checkpoint.objects.get(id=20)
        photo = Photo.objects.get(id=30)
        comment = Comment.objects.get(id=40)

        data = {
            'user': user.id,
            'trip': trip.id,
            'checkpoint': checkpoint.id,
            'photo': photo.id,
            'comment': comment.id
        }

        result = Like.create(**data)
        expected = Like.objects.get(id=result.id)

        self.assertEqual(result, expected)
