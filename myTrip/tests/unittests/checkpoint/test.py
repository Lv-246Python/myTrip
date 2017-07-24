"""Testing module for checkpoint views."""

import json
import mock
from datetime import datetime
from django.test import TestCase, Client

from trip.models import Trip
from registration.models import CustomUser
from checkpoint.models import Checkpoint


JSON_LENGTH = 8
TIME_STAMP = 1500914872
VALID_URL_CHECKPOINT_ID = '/api/v1/trip/2/checkpoint/2/'
INVALID_URL_CHECKPOINT_ID = '/api/v1/trip/2/checkpoint/4/'
VALID_URL_TRIP_ID = '/api/v1/trip/2/checkpoint/'
INVALID_URL_TRIP_ID = '/api/v1/trip/3/checkpoint/'

class ViewTest(TestCase):
    """ Test for CRUD operation in checkpoint's view """

    @classmethod
    def setUpTestData(cls):
        """Previous configuration for test.
        Include instance of Client to class as attribute
        Create a model of trip
        """
        cls.client = Client()
        test_time = datetime.fromtimestamp(TIME_STAMP)
        with mock.patch('django.utils.timezone.now') as mock_now:
            mock_now.return_value = test_time
            user = CustomUser.objects.create(
                id=2,
                first_name='test',
                last_name='test',
                email='test.test@gmail.com',
            )
            user.set_password('userpass')
            user.save()
            trip = Trip.objects.create(id=2, user=user, title="my_title",
                                           description="some_cool_trip", status=0)
            checkpoint = Checkpoint.objects.create(
                id=2,
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
            checkpoint = Checkpoint.objects.create(
                id=3,
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

    def test_get_by_id_success(self):
        """Test for get operation with passed checkpoint id."""

        response = self.client.get(VALID_URL_CHECKPOINT_ID)
        self.assertEqual(response.status_code, 200)

    def test_get_status_not_found(self):
        """Test for get operation with passed id (wrong)."""

        response = self.client.get(INVALID_URL_CHECKPOINT_ID)
        self.assertEqual(response.status_code, 404)

    def test_get_by_trip_id(self):
        """Test for get operation with passed checkpoint id."""

        response = self.client.get(VALID_URL_TRIP_ID)
        self.assertEqual(response.status_code, 200)

    def test_get_by_trip_id_length(self):
        """Test for get operation with passed checkpoint id."""

        response = self.client.get(VALID_URL_TRIP_ID)
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_get_response_length(self):
        """Test length of response object after get operation with passed id."""

        response = self.client.get(VALID_URL_CHECKPOINT_ID)
        self.assertEqual(len(response.json()), JSON_LENGTH)

    def test_post_status_success(self):
        """Test for post operation which will create new instance of checkpoint."""

        response = self.client.post(VALID_URL_TRIP_ID, json.dumps({
            "longitude": 20,
            "latitude": 10,
            "title": "new",
            "description": "cool_checkpoint",
            "source_url": "my_url",
            "position_number":3}),
            content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_post_status_404(self):
        """Test for post operation which will create new instance of checkpoint."""

        response = self.client.post(INVALID_URL_TRIP_ID, json.dumps({
            "longitude": 20,
            "latitude": 10,
            "title": "new",
            "description": "cool_checkpoint",
            "source_url": "my_url",
            "position_number":3}),
            content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_put_status_success(self):
        """Test for put operation which will modify checkpoint model."""

        data = {
            "longitude": 15,
            "latitude": 15,
            "title": "test",
            "description": "test_checkpoint",
            "position_number": 5,
        }
        self.client.login(username='test.test@gmail.com', password='userpass')
        response = self.client.put(VALID_URL_CHECKPOINT_ID, json.dumps(data), content_type="application/json")
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
            "position_number": 5,
        }
        self.client.login(username='test.test@gmail.com', password='userpass')
        response = self.client.put(INVALID_URL_CHECKPOINT_ID, json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_put_status_403(self):
        """
        Test for put operation which will modify checkpoint model.
        Request has wrong id and status 404 must be returned
        """

        data = {
            "longitude": 15,
            "latitude": 15,
            "title": "test",
            "description": "test_checkpoint",
            "position_number": 5,
        }
        response = self.client.put(INVALID_URL_CHECKPOINT_ID, json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 403)

    def test_put_object_modified(self):
        """Test object's properties after put opertaion."""

        check_data = {
            "id": 2,
            "longitude": 15,
            "latitude": 15,
            "title": "test",
            "description": "test_checkpoint",
            "source_url": "http://example.com",
            "position_number": 5,
            "trip_id": 2,
        }
        data = {
            "longitude": 15,
            "latitude": 15,
            "title": "test",
            "description": "test_checkpoint",
            "position_number": 5,
        }
        self.client.login(username='test.test@gmail.com', password='userpass')
        response = self.client.put(VALID_URL_CHECKPOINT_ID, json.dumps(data),
                                   content_type="application/json")
        received_data = response.json()
        self.assertDictEqual(received_data, check_data)

    def test_delete_status_success(self):
        """Test for delete opertaion which will delete checkpoint model."""

        self.client.login(username='test.test@gmail.com', password='userpass')
        response = self.client.delete(VALID_URL_CHECKPOINT_ID)
        self.assertEqual(response.status_code, 200)

    def test_delete_status_404(self):
        """Test for delete opertaion which will delete checkpoint model."""

        self.client.login(username='test.test@gmail.com', password='userpass')
        response = self.client.delete(INVALID_URL_CHECKPOINT_ID)
        self.assertEqual(response.status_code, 404)

    def test_delete_status_403(self):
        """Test for delete opertaion which will delete checkpoint model."""

        response = self.client.delete(INVALID_URL_CHECKPOINT_ID)
        self.assertEqual(response.status_code, 403)
