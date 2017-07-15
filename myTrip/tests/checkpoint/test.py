"""Testing module for checkpoint views"""

import json
from trip.models import Trip
from django.core.exceptions import ObjectDoesNotExist
from checkpoint.models import Checkpoint
from django.test import TestCase, Client

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
        new_trip = Trip(user_id = 3, title = "my_title", description = "some_cool_trip", status = 0)
        new_trip.save()
        new_checkpoint = Checkpoint(
                    longitude=12,
                    latitude=13,
                    title="new_ch",
                    description="coolsa_checkpoint",
                    source_url="my_sadurl",
                    position_number=2,
                    trip=new_trip)
        new_checkpoint.save()

    def test_get_by_id(self):
        """Test for get operation with passed id"""

        response = self.client.get('/api/v1/trip/1/checkpoint/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), JSON_LENGTH)
        response = self.client.get('/api/v1/trip/3/checkpoint/1000/')
        self.assertEqual(response.status_code, 404)

    def test_post(self):
        """Test for post opertaion which will create new instance of checkpoint"""
        response = self.client.post('/api/v1/trip/1/checkpoint/', json.dumps({
                    "longitude": 20,
                    "latitude": 10,
                    "title": "new",
                    "description": "cool_checkpoint",
                    "source_url": "my_url",
                    "position_number":3}),
                    content_type="application/json")
        self.assertEqual(response.status_code, 200)
        id = response.json()['id']
        response = self.client.get('/api/v1/trip/1/checkpoint/2/')
        self.assertTrue(Checkpoint.objects.get(id=2))

    def test_put(self):
        """Test for put opertaion which will modify checkpoint model"""

        data = {
                    "longitude": 15,
                    "latitude": 15,
                    "title": "test",
                    "description": "test_checkpoint",
                    "source_url": "test_url",
                    "position_number":5}
        response = self.client.put('/api/v1/trip/1/checkpoint/1/', json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), JSON_LENGTH)
        received_data = Checkpoint.objects.get(id='1').to_dict()
        for key in data.keys():
            self.assertEqual(data[key], received_data[key])

    def test_delete(self):
        """Test for delete opertaion which will delete checkpoint model"""

        response = self.client.delete('/api/v1/trip/1/checkpoint/1/')
        self.assertEqual(response.status_code, 200)
        with self.assertRaises(ObjectDoesNotExist):
            Checkpoint.objects.get(id=1)



