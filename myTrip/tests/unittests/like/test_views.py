"""Testing module for like views."""

import json

from django.test import TestCase, Client

from checkpoint.models import Checkpoint
from comment.models import Comment
from like.models import Like
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip

JSON_LENGTH = 6


class ViewTest(TestCase):
    """Test for CRUD operation in like view."""

    def setUp(self):
        """
        Preconfig for test.
        Include instance of Client to class as attribute.
        Create a model of trip, checkpoint, photo and comment.
        """
        user = CustomUser.objects.create(
            id=1,
            first_name='name',
            last_name='surname',
            email='email.test@gmail.com',
            password='password'
        )

        self.user = CustomUser.objects.create(
            id=2,
            first_name='second_name',
            last_name='second_surname',
            email='second.email.test@mail.com',
            password='password'
        )

        self.user.set_password('password')
        self.user.save()
        self.client.login(username="email.test@gmail.com", password="password")

        trip = Trip.objects.create(
            id=10,
            user=user,
            title="trip_title",
            description="some_cool_trip",
            status=0
        )

        checkpoint = Checkpoint.objects.create(
            id=20,
            longitude=12,
            latitude=13,
            title="first_checkpoint",
            description="cool checkpoint",
            source_url="http://example.com",
            position_number=1,
            trip=trip
        )

        photo = Photo.objects.create(
            id=30,
            src='src1',
            user=user,
            trip=trip,
            checkpoint=checkpoint,
            description='photo_description'
        )

        comment = Comment.objects.create(
            id=40,
            message='test message',
            user=user,
            trip=trip,
            checkpoint=checkpoint,
            photo=photo
        )

        Like.objects.create(
            id=50,
            user=user,
            trip=trip,
            checkpoint=checkpoint,
            photo=photo,
            comment=comment
        )

        Like.objects.create(
            id=51,
            user=self.user,
            trip=trip,
            checkpoint=checkpoint,
            photo=photo,
            comment=comment
        )

    def test_get_by_id_success(self):
        """Test for GET operation with passed like id."""

        response = self.client.get('/api/v1/trip/10/like/50/')
        self.assertEqual(response.status_code, 200)

    def test_get_by_id_status_not_found(self):
        """Ensure that GET method returns status 404 with non-existed object id."""

        response = self.client.get('/api/v1/trip/10/like/1/')
        self.assertEqual(response.status_code, 404)

    def test_get_by_trip_checkpoint_photo_comment_id(self):
        """
        Ensure that GET method returns status 200 with given Object<Trip> id,
        Object<Checkpoint> id, Object<Photo> id, Object<Comment> id.
        """

        response = self.client.get('/api/v1/trip/10/checkpoint/20/photo/30/comment/40/like/')
        self.assertEqual(response.status_code, 200)

    def test_get_by_trip_checkpoint_photo_comment_id_404(self):
        """Ensure that GET method returns status 404 when some wrong id was send."""

        response = self.client.get('/api/v1/trip/10/checkpoint/20/photo/30/comment/404/like/')
        self.assertEqual(response.status_code, 404)

    def test_get_by_trip_id_length(self):
        """Ensure that GET method returns correct number of Like objects."""

        response = self.client.get('/api/v1/trip/10/checkpoint/20/photo/30/comment/40/like/')
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_get_response_length(self):
        """Ensure that GET method returns all required like fields."""

        response = self.client.get('/api/v1/trip/10/like/50/')
        self.assertEqual(len(response.json()), JSON_LENGTH)

    def test_post_status_success(self):
        """Ensure that POST method creates new object with it relations and status 201."""

        response = self.client.post('/api/v1/trip/10/checkpoint/20/photo/30/comment/40/like/', json.dumps({"user": 1}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_post_status_404(self):
        """Ensure that POST method returns status 404, when data is not passed."""

        response = self.client.post('/api/v1/trip/10/checkpoint/20/photo/30/comment/404/like/',
                                    json.dumps({}), content_type="application/json")

        self.assertEqual(response.status_code, 404)

    def test_delete_status_403(self):
        """Ensure that DELETE method returns status 403 when wrong user tries to delete comment."""

        response = self.client.delete('/api/v1/trip/10/like/51/')
        self.assertEqual(response.status_code, 403)

    def test_delete_404(self):
        """Ensure that DELETE method returns status 404 when wrong id were send."""

        response = self.client.delete('/api/v1/trip/10/like/404/')
        self.assertEqual(response.status_code, 404)

    def test_delete_success(self):
        """Ensure that DELETE method deletes comment object and returns status 204."""

        response = self.client.delete('/api/v1/trip/10/like/50/')
        self.assertEqual(response.status_code, 204)
