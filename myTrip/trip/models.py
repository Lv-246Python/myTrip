"""This module contains Trip model class and basic functions."""
from datetime import datetime
from django.db import models
from django.core.exceptions import ObjectDoesNotExist

from registration.models import CustomUser

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
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
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
                'user': user,
                'title': title,
                'created_at': date,
                'description': description,
                'status': status
                }
        """
        return {
            "id": self.id,
            "user": self.user.id,
            "title": self.title,
            "created_at": self.created_at,
            "description": self.description,
            "status": self.status}

    def __repr__(self):
        return "id:{} user:{} title:{} created_at:{}" \
               " description:{} status:{}".format(self.id,
                                                  self.user,
                                                  self.title,
                                                  self.created_at,
                                                  self.description,
                                                  self.status)

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
    def create(user, title, description, status):
        """
        Creates Trip
         Args:
            user (int): fk to user
            title (str): title of trip.
            description (str): describtion,
            status (int): trip status
        Returns:
            trip object
        """

        trip = Trip()
        trip.user = user
        trip.title = title
        trip.description = description
        trip.status = status
        trip.save()
        return trip

    @staticmethod
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

    @staticmethod
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

    def get_trips(user_id, page=1, step=5):
        """
        Returns the last 5 trips by the user
         Args:
            none
        Returns:
            reversed trips
        """
        if not user_id:
            trips = reversed(Trip.objects.all().order_by('-created_at')[:step])
            return trips
        trips = reversed(Trip.objects.filter(user=user_id).order_by('-created_at')[:step])
        return trips
