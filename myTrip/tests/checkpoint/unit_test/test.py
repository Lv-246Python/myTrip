"""Testing module for checkpoint views."""

import json
from datetime import datetime
from django.test import TestCase, Client

from trip.models import Trip
from checkpoint.models import Checkpoint


JSON_LENGTH = 8

class ViewTest(TestCase):
    """ Test for CRUD operation in checkpoint's view """

    @classmethod
    def setUpTestData(cls):
        """Preconfig for test.
        Include instance of Client to class as attribute
        Create a model of trip
        """
        cls.client = Client()
        trip = Trip.objects.create(user_id=3, title="my_title",
                                       description="some_cool_trip", status=0)
        trip.save()
        checkpoint = Checkpoint.objects.create(
            longitude=12,
            latitude=13,
            title="first_checkpoint",
            description="cool checkpoint",
            source_url="http://example.com",
            position_number=1,
            trip=trip,
            create_at=datetime.now(),
            update_at=datetime.now()
        )
        checkpoint.save()
        checkpoint = Checkpoint.objects.create(
            longitude=44,
            latitude=29,
            title="second_checkpoint",
            description="one more cool_ heckpoint",
            source_url="http://example.com",
            position_number=2,
            trip=trip,
            create_at=datetime.now(),
            update_at=datetime.now()
        )
        checkpoint.save()


    def test_get_by_id_success(self):
        """Test for get operation with passed checkpoint id."""

        response = self.client.get('/api/v1/trip/1/checkpoint/1/')
        self.assertEqual(response.status_code, 200)

    def test_get_status_not_found(self):
        """Test for get operation with passed id (wrong)."""

        response = self.client.get('/api/v1/trip/1/checkpoint/3/')
        self.assertEqual(response.status_code, 404)

    def test_get_by_trip_id(self):
        """Test for get operation with passed checkpoint id."""

        response = self.client.get('/api/v1/trip/1/checkpoint/')
        self.assertEqual(response.status_code, 200)

    def test_get_by_trip_id(self):
        """Test for get operation with passed checkpoint id."""

        response = self.client.get('/api/v1/trip/1/checkpoint/')
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_get_response_length(self):
        """Test length of response object after get operation with passed id."""

        response = self.client.get('/api/v1/trip/1/checkpoint/1/')
        self.assertEqual(len(response.json()), JSON_LENGTH)


    def test_post_status_success(self):
        """Test for post operation which will create new instance of checkpoint."""

        response = self.client.post('/api/v1/trip/1/checkpoint/', json.dumps({
            "longitude": 20,
            "latitude": 10,
            "title": "new",
            "description": "cool_checkpoint",
            "source_url": "my_url",
            "position_number":3}),
            content_type="application/json")
        self.assertEqual(response.status_code, 200)


    def test_post_object(self):
        """Test fields in database after post opertaion."""

        response = self.client.post('/api/v1/trip/1/checkpoint/', json.dumps({
            "longitude": 20,
            "latitude": 10,
            "title": "new",
            "description": "cool_checkpoint",
            "source_url": "my_url",
            "position_number": 3}),
            content_type="application/json")

        check_data = {
            "id": 3,
            "longitude": 20,
            "latitude": 10,
            "title": "new",
            "description": "cool_checkpoint",
            "source_url": "my_url",
            "position_number": 3,
            "trip_id": 1
        }
        self.assertEqual(response.json(), check_data)

    def test_put_status_success(self):
        """Test for put operation which will modify checkpoint model."""

        data = {
            "longitude": 15,
            "latitude": 15,
            "title": "test",
            "description": "test_checkpoint",
            "source_url": "test_url",
            "position_number":5
        }

        response = self.client.put('/api/v1/trip/1/checkpoint/1/', json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_put_status_404(self):
        """
        Test for put operation which will modify checkpoint model.
        Request has wrong id and status 404 must be returned
        """

        data = {
            "longitude": 15,
            "latitude": 15,
            "title": "test",
            "description": "test_checkpoint",
            "source_url": "test_url",
            "position_number":5
        }

        response = self.client.put('/api/v1/trip/1/checkpoint/3/', json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_put_object_modified(self):
        """Test object's properties after put opertaion."""

        data = {
            "longitude": 15,
            "latitude": 15,
            "title": "test",
            "description": "test_checkpoint",
            "source_url": "test_url",
            "position_number": 5
        }

        response = self.client.put('/api/v1/trip/1/checkpoint/1/', json.dumps(data),
                                   content_type="application/json")
        received_data = response.json()
        for key in data.keys():
            self.assertEqual(data[key], received_data[key])

    def test_delete_status(self):
        """Test for delete opertaion which will delete checkpoint model."""

        response = self.client.delete('/api/v1/trip/1/checkpoint/1/')
        self.assertEqual(response.status_code, 200)

