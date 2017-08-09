"""Module contain photo model class and methods."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from checkpoint.models import Checkpoint
from registration.models import CustomUser
from trip.models import Trip


class Photo(models.Model):
    """
    Photo
    :argument id: int - auto generated primary key
    :argument src: url - photo source link
    :argument user: - foreign key to User model
    :argument trip: - foreign key to Trip model
    :argument checkpoint: - foreign to Checkpoint model
    :argument description: str - description to photo
    :argument create_at: date - time when created
    :argument updated_at: date - time when updated.
    """

    src = models.URLField()
    user = models.ForeignKey(CustomUser, null=True)
    trip = models.ForeignKey(Trip, null=True)
    checkpoint = models.ForeignKey(Checkpoint, null=True)
    description = models.TextField(null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    @staticmethod
    def get_by_id(photo_id):
        """
        Get photo with given photo id
        Args:
            photo_id (int): photo id.
        Returns:
            Object<Photo>: Object of Photo or None if got exception.
        """
        try:
            return Photo.objects.get(id=photo_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def filter(trip_id, checkpoint_id):
        """
        Get photo with given trip and checkpoint id
        Args:
            trip_id (int): trip id
            checkpoint_id (int): checkpoint id.
            trip_id (int): trip id.

        Returns:
            QuerySet<Photos>: QuerySet of Photos.
        """
        return Photo.objects.filter(trip_id=trip_id, checkpoint_id=checkpoint_id)

    @staticmethod
    def create(src, user, description, trip=None, checkpoint=None):
        """ Creating photo model, and returns created object"""
        photo = Photo()
        photo.src = src
        photo.trip = trip
        photo.checkpoint = checkpoint
        photo.user = user
        photo.description = description
        photo.save()
        return photo

    def update(self, description):
        """Updating photo description."""
        if description:
            self.description = description
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
                    'checkpoint_id': checkpoint id,
                    'description': description text,
                    'create_at': time when created,
                    'update_at': time when last updated
                }
        """
        return {
            "id": self.id,
            "src": self.src,
            "user": self.user.id if self.user else None,
            "trip_id": self.trip.id if self.trip else None,
            "checkpoint_id": self.checkpoint.id if self.checkpoint else None,
            "description": self.description,
            "create_at": self.create_at,
            "update_at": self.update_at
        }
