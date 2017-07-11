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
        Convert model object to dictionary.
        Return:
            dict:
                {
                'id': id,
                'user_id': user id,
                'title': title,
                'created_at': date,
                'description': decription,
                'status': status
                }
        """
        return {
            "id":self.id,
            "user_id":self.user_id,
            "title": self.title,
            "created_at": self.created_at,
            "description": self.description,
            "status": self.status}

    def __repr__(self):
        return "id:{} user_id:{} title:{} created_at:{} description:{} status:{}".format(
        self.id, self.user_id, self.title, self.created_at, self.description, self.status)

    @staticmethod
    def get_by_id(trip_id):
        """
        Get Trip with given trip id
        Args:
            trip_id (int): trip id.
        Returns:
            rtrip object
        """
        try:
            trip = Trip.objects.get(id=trip_id)
            return trip
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def create(data):
        """
        Creates Trip
         Args:
            user_id (int): fk to user
            title (str): title of trip.
            description (str): describtion,
            status (int): trip status
        Returns:
            trip object
        """
        trip = Trip(**data)
        trip.save()
        return trip

    def edit(data, trip_id):
        """
        Updates Trip with new title,description and status
         Args:
            title (str): title of trip.
            description (str): describtion,
            status (int): trip status
        Returns:
            trip obj
        """
        trip = Trip.objects.get(id=trip_id)
        trip.title = data['title']
        trip.description = data['description']
        trip.status = data['status']
        trip.save()
        return trip

    def delete_by_id(trip_id):
        """
        Deletes Trip by id
         Args:
            id(int): id of trip
        Returns:
            none
        """
        trip = Trip.objects.get(id=trip_id)
        trip.delete()
        return None
