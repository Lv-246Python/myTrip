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
     :argument describtion: text - describtion
     :argument created_at: date - date
    ."""
    user_id = models.IntegerField()
    title = models.CharField(max_length=200)
    describtion = models.TextField()
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    status_choises = (
        ("InProgress", "In progress"),
        ("Annonced", "Annonced"),
        ("Finished", "Finished"))
    status = models.CharField(max_length=200, choices=status_choises, default="InProgress")

    def to_dict(self):
        """
        ToDO method rebuilds queryset ot object dictionary for our views.
        """
        return {
            "pk":self.id,
            "user_id":self.user_id,
            "title": self.title,
            "created_at": self.created_at,
            "describtion": self.describtion,
            "status": self.status}

    def __str__(self):
        return self.title

    @classmethod
    def get_all(cls):
        """ToDo"""
        return Trip.objects.all()

    @staticmethod
    def getbyid(trip_id):
        """ToDo"""
        try:
            return Trip.objects.get(id=trip_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def create_trip(request):
        """ToDo"""
        user_id = request.POST['user_id']
        title = request.POST['title']
        describtion = request.POST['describtion']
        trip = Trip(title=title, describtion=describtion, user_id=user_id)
        trip.save()
        return

    @staticmethod
    def edit_trip(data, trip_id):
        """ToDo"""
        trip = Trip.objects.filter(id=trip_id)
        trip.update(title=data['title'], describtion=data['describtion'])
        return

    @staticmethod
    def delete_trip(trip_id):
        """ToDo"""
        trip = Trip.objects.get(id=trip_id)
        trip.delete()
        return
