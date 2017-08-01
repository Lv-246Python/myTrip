"""Testing module for comment views."""

import json

from django.test import TestCase, Client

from checkpoint.models import Checkpoint
from comment.models import Comment
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip

JSON_LENGTH = 9


class ViewTest(TestCase):
    """ Test for CRUD operation in comment's view """

    def setUp(self):
        """
        Preconfig for test.
        Include instance of Client to class as attribute
        Create a model of trip, checkpoint, photo, comment
        """
        self.client = Client()
        user = CustomUser.objects.create(
            id=1,
            first_name='test',
            last_name='test',
            email='test.test@gmail.com',
            password='user pass'
        )

        self.user = CustomUser.objects.create(
            id=2,
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
            id=10,
            user=user,
            title="my_title",
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
            description='description1'
        )

        Comment.objects.create(
            id=66,
            message='test1',
            user=user,
            trip=trip,
            checkpoint=checkpoint,
            photo=photo
        )

        Comment.objects.create(
            id=62,
            message='test1',
            user=self.user,
            trip=trip,
            checkpoint=checkpoint,
            photo=photo
        )

    def test_get_by_id_success(self):
        """Test for get operation with passed comment id."""

        response = self.client.get('/api/v1/trip/10/comment/66/')
        self.assertEqual(response.status_code, 200)

    def test_get_by_id_status_not_found(self):
        """Ensure that get method returns status 404 with non-existed object id."""

        response = self.client.get('/api/v1/trip/10/comment/1/')
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
        self.assertEqual(len(data), 2)

    def test_get_response_length(self):
        """Ensure that get method returns all required comment fields."""

        response = self.client.get('/api/v1/trip/10/comment/66/')
        self.assertEqual(len(response.json()), JSON_LENGTH)

    def test_post_status_success(self):
        """Ensure that post method creates new object with it relations and status 201."""

        response = self.client.post('/api/v1/trip/10/checkpoint/20/photo/30/comment/', json.dumps({
            "message": "test1"}), content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_post_status_400(self):
        """Ensure that post method returns status 400, when data is not passed."""

        response = self.client.post('/api/v1/trip/30/checkpoint/20/photo/30/comment/',
                                    json.dumps({}), content_type="application/json")

        self.assertEqual(response.status_code, 400)

    def test_put_status_success(self):
        """Ensure that put method updates existed comment object."""

        data = {
            'message': 'put message'
        }

        response = self.client.put('/api/v1/trip/10/comment/62/', json.dumps(data),
                                   content_type="application/json")

        self.assertEqual(response.status_code, 200)

    def test_put_status_404(self):
        """Ensure that put method returns status 404 when wrong id were send."""

        data = {
            'message': 'test message update'
        }

        response = self.client.put('/api/v1/trip/10/comment/2/',
                                   json.dumps(data), content_type="application/json")

        self.assertEqual(response.status_code, 404)

    def test_put_status_403(self):
        """Ensure that put method returns status 403 when wrong user tries to change comment."""

        data = {
            'message': 'test message update'
        }

        response = self.client.put('/api/v1/trip/10/comment/66/', json.dumps(data),
                                   content_type="application/json")

        self.assertEqual(response.status_code, 403)

    def test_delete_status_403(self):
        """Ensure that delete method returns status 403 when wrong user tries to delete comment."""

        response = self.client.delete('/api/v1/trip/10/comment/66/')
        self.assertEqual(response.status_code, 403)

    def test_delete_404(self):
        """Ensure that delete method returns status 404 when wrong id were send."""

        response = self.client.delete('/api/v1/trip/10/comment/999/')
        self.assertEqual(response.status_code, 404)

    def test_delete_success(self):
        """Ensure that delete method deletes comment object and returns status 204."""

        response = self.client.delete('/api/v1/trip/10/comment/62/')
        self.assertEqual(response.status_code, 204)
