"""Testing module for checkpoint views"""

import json
from datetime import datetime
from django.test import TestCase, Client

from trip.models import Trip
from registration.models import CustomUser


class ViewTest(TestCase):

    def setUp(self):
        self.client = Client()
        user = CustomUser.objects.create(id=10, email='ln@gmail.com')
        user.set_password('root')
        user.save()

        self.client.login(username='ln@gmail.com', password='root')
        self.trip = Trip.objects.create(id=10, user = user, title = 'title', description = 'description', status = 0,
                    create_at=(2017, 7, 20, 11, 38, 34, 466455),
                    update_at=(2017, 7, 20, 11, 38, 34, 466455))

    def test_get_by_id_success(self):
        response = self.client.get('/api/v1/trip/10/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 6)

    def test_get_by_id_error(self):
        response = self.client.get('/api/v1/trip/2/')
        self.assertEqual(response.status_code, 404)

    def test_get_trips_success(self):
        response = self.client.get('/api/v1/trip/')
        self.assertEqual(response.status_code, 200)

    def test_post(self):
        response = self.client.post('/api/v1/trip/', json.dumps({
                    "title": 'title',
                    "description": "some text",
                    "status": 0}),
                    content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_post_error(self):
        self.client.logout()
        response = self.client.post('/api/v1/trip/', json.dumps({
                    "title": 12,
                    "title": 'title',
                    "description": "some text",
                    "status": 0}),
                    content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def test_put_success(self):
        data = {
        "title": "test update",
        "description": "some text",
        "status":2}
        response = self.client.put('/api/v1/trip/10/', json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_put_error(self):
        data = {
        "title": "test update",
        "description": "some text",
        "status":2}
        response = self.client.put('/api/v1/trip/2/', json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_delete_by_id_success(self):
        response = self.client.delete('/api/v1/trip/10/')
        self.assertEqual(response.status_code, 200)

    def test_delete_by_id_error(self):
        response = self.client.delete('/api/v1/trip/2/')
        self.assertEqual(response.status_code, 404)
