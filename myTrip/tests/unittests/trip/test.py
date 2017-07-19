"""Testing module for checkpoint views"""

import json
from datetime import datetime
from django.test import TestCase, Client

from trip.models import Trip
from registration.models import CustomUser


class ViewTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.client = Client()
        user = CustomUser(email = 'ln@gmail.com', password = 'root')
        user.save()
        trip = Trip(user = user, title = 'title', description = 'description', status = 0)
        trip.save()

    def test_get(self):
        response = self.client.get('/api/v1/trip/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 6)
        response = self.client.get('/api/v1/trip/2/')
        self.assertEqual(response.status_code, 404)
        response = self.client.get('/api/v1/trip/')
        self.assertEqual(response.status_code, 200)

    def test_post(self):
        response = self.client.post('/api/v1/trip/', json.dumps({
                    "user": 1,
                    "title": 'title',
                    "description": "some text",
                    "status": 0}),
                    content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_put(self):
        data = {
                    "title": "test update",
                    "description": "some text",
                    "status":2}
        response = self.client.put('/api/v1/trip/1/', json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.client.put('/api/v1/trip/2/', json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_delete(self):
        response = self.client.delete('/api/v1/trip/1/')
        self.assertEqual(response.status_code, 200)

        response = self.client.delete('/api/v1/trip/2/')
        self.assertEqual(response.status_code, 404)
