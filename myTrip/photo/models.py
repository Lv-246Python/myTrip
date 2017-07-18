"""Module contain photo model class and methods."""

from datetime import datetime

from django.db import models
from checkpoint.models import Checkpoint
from registration.models import CustomUser
from trip.models import Trip


class Photo(models.Model):
    """
    Photo
    :argument id: int - auto generated primary key
    :argument src: url - photo source link
    :argument user: int - foreign key to User model id
    :argument trip_id: int - foreign key to Trip model id
    :argument checkpoint_id: int - foreign to Checkpoint model id
    :argument description: str - description to photo
    :argument created_at: date - time when created
    :argument updated_at: date - time when updated.
    """

    src = models.URLField(max_length=200)
    user = models.ForeignKey(CustomUser, null=True)
    trip = models.ForeignKey(Trip, null=True)
    checkpoint = models.ForeignKey(Checkpoint, null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, editable=True)

    @staticmethod
    def get_by_id(photo_id):
        """
        Get photo with given photo id
        Args:
            photo_id (int): photo id.
        Returns:
            Object<Photo>: Object of Photo or None in got exception.
        """
        try:
            return Photo.objects.get(id=photo_id)
        except Photo.DoesNotExist:
            return None

    @staticmethod
    def get_by_trip_id(trip_id):
        """
        Get photo with given trip id
        Args:
            trip_id (int): trip id.
        Returns:
            QuerySet<Photos>: QuerySet of Photos.
        """
        photos = Photo.objects.filter(trip_id=trip_id)
        return photos

    @staticmethod
    def get_by_photo_and_user_id(photo_id, user_id):
        """
        Get photo with given checkpoint id
        Args:
            checkpoint_id (int): checkpoint id.
        Returns:
            QuerySet<Photos>: QuerySet of Photos.
        """
        photo = Photo.objects.get(id=photo_id, user_id=user_id)
        return photo

    @staticmethod
    def get_by_trip_id_and_checkpoint_id(trip_id, checkpoint_id):
        """
        Get photo with given trip and checkpoint id
        Args:
            trip_id (int): trip id
            checkpoint_id (int): checkpoint id.
        Returns:
            QuerySet<Photos>: QuerySet of Photos.
        """
        photos = Photo.objects.filter(trip_id=trip_id, checkpoint_id=checkpoint_id)
        return photos

    @staticmethod
    def get_by_user_id(user_id, trip_id, checkpoint_id=None):
        """
        Get photo with given user id
        Args:
            user_id (int): user id
            trip_id (int): trip id
            checkpoint_id (int): checkpoint id
        Returns:
            QuerySet<Photos>: QuerySet of Photos.
        """
        if trip_id and checkpoint_id:
            photos = Photo.objects.filter(user_id=user_id, trip_id=trip_id, checkpoint_id=checkpoint_id)
            if not photos:
                return False
            return photos
        photos = Photo.objects.filter(user_id=user_id, trip_id=trip_id)
        return photos

    @staticmethod
    def create(src, user_id, trip_id=None, checkpoint_id=None, description=None):
        """ Creating photo model, and returns created object"""
        photo = Photo()
        photo.src = src
        if trip_id:
            photo.trip_id = Trip.get_by_id(trip_id).id
        if checkpoint_id:
            photo.checkpoint_id = Checkpoint.get_by_id(checkpoint_id).id
        photo.user = CustomUser.get_by_id(user_id)
        photo.description = description
        photo.save()
        return photo

    def update(self, user_id, description=None):
        """Updating photo description."""
        if description and user_id:
            self.description = description
            self.updated_at = datetime.now()
            print(datetime.now())
        self.save()

    def to_dict(self):
        """Convert model object to dictionary.
        Return:
            dict:
                {
                    'id': id,
                    'src': source link,
                    'user': user id,
                    'trip_id': trip id,
                    'checkpoit_id': checkpoint id,
                    'description': description text
                }
        """
        return {
            "id": self.id,
            "src": self.src,
            "user": self.user.id,
            "trip_id": self.trip_id,
            "checkpoint_id": self.checkpoint_id,
            "description": self.description
        }
