"""This module contains Unit Tests for Photo app models."""

import json

from datetime import datetime
from django.test import TestCase, Client

from checkpoint.models import Checkpoint
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip


class TestPlugin(TestCase):
    """Tests for Photo model."""

    def setUp(self):
        """Creates objects to provide tests."""

        user = CustomUser.objects.create(
            id=20,
            first_name='test',
            last_name='test',
            email='test@gmail.com',
            password='password'
        )

        self.user = CustomUser.objects.create(
            id=5,
            first_name="qwer",
            last_name="ty",
            email="qwer@gmail.com",
            password="password"
        )
        self.user.set_password('password')
        self.user.save()
        self.client = Client()
        self.client.login(username="qwer@gmail.com", password="password")

        trip = Trip.objects.create(
            id=20,
            user=user,
            title='title1',
            description='description',
            create_at=datetime(2017, 7, 18, 15, 19, 24),
            status=0
        )

        checkpoint = Checkpoint.objects.create(
            id=20,
            longitude=123,
            latitude=321,
            title='title1',
            description='description1',
            position_number=1,
            source_url='url1',
            trip=trip
        )

        Photo.objects.create(
            id=5,
            src='src1',
            user=self.user,
            trip=trip,
            checkpoint=checkpoint,
            description='description1'
        )

        Photo.objects.create(
            id=6,
            src='src2',
            user=user,
            trip=trip,
            checkpoint=checkpoint,
            description='description2'
        )

    def test_get_by_trip_and_checkpoint_success(self):
        """Test for get operation with passed trip id and checkpoint id."""

        response = self.client.get('/api/v1/trip/20/checkpoint/20/photo/')
        self.assertEqual(response.status_code, 200)

    def test_get_by_trip_and_checkpoint_none(self):
        """Test for get operation with passed trip id and checkpoint id(wrong)."""

        response = self.client.get('/api/v1/trip/30/checkpoint/30/photo/')
        self.assertEqual(response.status_code, 204)

    def test_get_by_photo_id_success(self):
        """Test for get operation with passed photo id."""

        response = self.client.get('/api/v1/trip/20/checkpoint/20/photo/5/')
        self.assertEqual(response.status_code, 200)

    def test_get_status_not_found(self):
        """Test for get operation with passed id (wrong)."""

        response = self.client.get('/api/v1/trip/20/checkpoint/4/photo/3/')
        self.assertEqual(response.status_code, 204)

    def test_post_status_success(self):
        """Test for post operation which will create new instance of photo."""

        request = self.client.post('/api/v1/trip/20/checkpoint/20/photo/', json.dumps({
            "src": "url_of_image",
            "user": 20,
            "description": "random thing"}),
                                    content_type="application/json")
        self.assertEqual(request.status_code, 201)

    def test_post_status_404(self):
        """Test for post operation which will not create new instance of photo."""

        response = self.client.post('/api/v1/trip/631/checkpoint/135/photo/', json.dumps({
            "src": "url_of_image",
            "user": 20,
            "description": "random thing"}),
                                    content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_put_status_success(self):
        """Test for put operation which will modify photo model."""

        data = {
            "description": "random thing"
        }

        response = self.client.put('/api/v1/trip/20/checkpoint/20/photo/5/', json.dumps(data),
                                   content_type="application/json")

        self.assertEqual(response.status_code, 200)

    def test_put_status_no_permission(self):
        """Test for put operation which will modify photo model."""

        data = {
            "description": "random thing"
        }

        response = self.client.put('/api/v1/trip/20/checkpoint/20/photo/6/', json.dumps(data),
                                   content_type="application/json")
        self.assertEqual(response.status_code, 403)

    def test_put_status_400(self):
        """
        Test for put operation which will modify photo model.
        Request has wrong id and status 404 must be returned
        """

        data = {
            "description": "random thing"
        }

        response = self.client.put('/api/v1/trip/20/checkpoint/20/photo/7/', json.dumps(data),
                                   content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_delete_status_success(self):
        """Test for delete operation which will delete photo model."""

        response = self.client.delete('/api/v1/trip/20/checkpoint/20/photo/5/')
        self.assertEqual(response.status_code, 200)

    def test_delete_status_no_permission(self):
        """Test for delete operation which will delete photo model."""

        response = self.client.delete('/api/v1/trip/20/checkpoint/20/photo/6/')
        self.assertEqual(response.status_code, 403)

    def test_delete_status_400(self):
        """Test for delete operation which will delete photo model."""

        response = self.client.delete('/api/v1/trip/20/checkpoint/20/photo/8/')
        self.assertEqual(response.status_code, 400)
