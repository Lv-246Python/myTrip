"""Testing module for checkpoint views."""

import json
from datetime import datetime

from django.test import TestCase, Client

from checkpoint.models import Checkpoint
from comment.models import Comment
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip

JSON_LENGTH = 8


class ViewTest(TestCase):
    """ Test for CRUD operation in checkpoint's view """

    @classmethod
    def setUpTestData(cls):
        """
        Preconfig for test.
        Include instance of Client to class as attribute
        Create a model of trip, checkpoint, photo
        """
        cls.client = Client()
        user = CustomUser.objects.create(
            id=1,
            first_name='test',
            last_name='test',
            email='test.test@gmail.com',
            password='user pass',
            create_at=datetime(2017, 7, 18, 15, 19, 24),
            update_at=datetime(2017, 7, 18, 15, 19, 24)
        )
        trip = Trip.objects.create(
            id=10,
            user=user,
            title="my_title",
            description="some_cool_trip",
            status=0,
            create_at=datetime(2017, 7, 18, 15, 19, 24),
            update_at=datetime(2017, 7, 18, 15, 19, 24)
        )

        checkpoint = Checkpoint.objects.create(
            id=20,
            longitude=12,
            latitude=13,
            title="first_checkpoint",
            description="cool checkpoint",
            source_url="http://example.com",
            position_number=1,
            trip=trip,
            create_at=datetime(2017, 7, 18, 15, 19, 24),
            update_at=datetime(2017, 7, 18, 15, 19, 24)
        )

        photo = Photo.objects.create(
            id=30,
            src='src1',
            user=user,
            trip=trip,
            checkpoint=checkpoint,
            description='description1',
            create_at=datetime(2017, 7, 18, 15, 19, 24),
            update_at=datetime(2017, 7, 18, 15, 19, 24)
        )

        comment = Comment.objects.create(
            id=66,
            message='test message',
            user=user,
            trip=trip,
            checkpoint=checkpoint,
            photo=photo,
            create_at=datetime(2017, 7, 18, 15, 19, 24),
            update_at=datetime(2017, 7, 18, 15, 19, 24)
        )

    def test_get_by_id_success(self):
        """Test for get operation with passed comment id."""

        response = self.client.get('/api/v1/comment/66/')
        self.assertEqual(response.status_code, 200)

    def test_get_by_id_status_not_found(self):
        """Ensure that get method returns status 404 with non-existed object id."""

        response = self.client.get('/api/v1/comment/1/')
        self.assertEqual(response.status_code, 404)

    def test_get_by_trip_checkpoint_photo_id(self):
        """
        Ensure that get method returns status 200 with given Object<Trip> id,
        Object<Checkpoint> id, and Object<Photo> id.
        """

        response = self.client.get('/api/v1/trip/10/checkpoint/20/photo/30/comment/')
        self.assertEqual(response.status_code, 200)

    def test_get_by_trip_checkpoint_photo_id_404(self):
        """Ensure that get method returns status 404 when some wrong id was send."""

        response = self.client.get('/api/v1/trip/10/checkpoint/20/photo/1/comment/')
        self.assertEqual(response.status_code, 404)

    def test_get_by_trip_id_length(self):
        """Ensure that get method returns correct number of Comment objects."""

        response = self.client.get('/api/v1/trip/10/checkpoint/20/photo/30/comment/')
        data = response.json()
        self.assertEqual(len(data), 1)

    def test_get_response_length(self):
        """Ensure that get method returns all required comment fields."""

        response = self.client.get('/api/v1/trip/10/comment/66/')
        self.assertEqual(len(response.json()), JSON_LENGTH)

    def test_post_status_success(self):
        """Ensure that post method creates new object with it relations and status 201."""

        response = self.client.post('/api/v1/trip/10/checkpoint/20/photo/30/comment/', json.dumps({
            'message': 'test message',
            'user_id': 1}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_post_status_404(self):
        """Ensure that post method returns status 400, when data is not passed."""

        response = self.client.post('/api/v1/trip/30/checkpoint/20/photo/30/comment/', json.dumps({}),
                                    content_type="application/json")

        self.assertEqual(response.status_code, 400)

    def test_put_status_success(self):
        """Ensure that put method updates existed comment object."""

        data = {
            'message': 'put message',
            'user_id': 1
        }

        response = self.client.put('/api/v1/comment/66/', json.dumps(data),
                                   content_type="application/json")

        self.assertEqual(response.status_code, 200)

    def test_put_status_404(self):
        """Ensure that put method returns status 404 when wrong id were send."""

        data = {
            'message': 'test message update',
            'user_id': 1
        }

        response = self.client.put('/api/v1/comment/2/',
                                   json.dumps(data), content_type="application/json")

        self.assertEqual(response.status_code, 404)

    def test_put_status_403(self):
        """Ensure that put method returns status 403 when wrong user tries to change comment."""

        data = {
            'message': 'test message update',
            'user_id': 99
        }

        response = self.client.put('/api/v1/comment/66/', json.dumps(data),
                                   content_type="application/json")

        self.assertEqual(response.status_code, 403)

    def test_delete_404(self):
        """Ensure that delete method returns status 404 when wrong id were send."""

        response = self.client.delete('api/v1/comment/1/')
        self.assertEqual(response.status_code, 404)

    def test_delete_success(self):
        """Ensure that delete method deletes comment object and returns status 204."""

        response = self.client.delete('/api/v1/comment/66/')
        self.assertEqual(response.status_code, 204)
