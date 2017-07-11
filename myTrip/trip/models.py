"""This module contains Trip model class and basic functions."""
from __future__ import unicode_literals
from datetime import datetime
from django.db import models
from django.core.exceptions import ObjectDoesNotExist

class Trip(models.Model):
    """
     Trip
     :argument id: int - auto generated primary key
     :argument user_id: int - ToDo foreign key to User model
     :argument title: str - title
     :argument description: text - description
     :argument created_at: date - date
     :argument status: int - 0-in progres, 1-annonced, 2-finished
    ."""
    user_id = models.IntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    status = models.IntegerField(default=0)

    def to_dict(self):
        """
        method rebuilds queryset ot object dictionary for our views.
        """
        return {
            "id":self.id,
            "user":self.user_id,
            "title": self.title,
            "created_at": self.created_at,
            "description": self.description,
            "status": self.status}

    def __str__(self):
        return self.id

    @classmethod
    def get_all(cls):
        """method to get all trips"""
        return Trip.objects.all()

    @staticmethod
    def get_by_id(trip_id):
        """method to get trip by id"""
        try:
            return Trip.objects.get(id=trip_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def create(data):
        """method to create trip"""
        trip = Trip(**data)
        trip.save()
        return None

    @staticmethod
    def edit(data, trip_id):
        """method to update trip fields (title,description,status)"""
        trip = Trip.objects.get(id=trip_id)
        trip.title = data['title']
        trip.description = data['description']
        trip.status = data['status']
        trip.save()
        return None

    @staticmethod
    def delete_trip(trip_id):
        """method to delete trip"""
        trip = Trip.objects.get(id=trip_id)
        trip.delete()
        return None
