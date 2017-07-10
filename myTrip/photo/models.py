"""Module contain photo model class and methods."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models


class Photo(models.Model):
    """
     Photo
     :argument id: int - auto generated primary key
     :argument src: url - photo source link
     :argument user_id: int - ToDo foreign key to User model id
     :argument trip_id: int - Todo foreign key to Trip model id
     :argument checkpoint_id: int - ToDo foreign to Checkpoint model id
     :argument description: str - description to photo
    ."""
    src = models.URLField(max_length=200)
    user_id = models.IntegerField()
    trip_id = models.IntegerField(blank=True)
    checkpoint_id = models.IntegerField(blank=True)
    description = models.TextField(blank=True)

    @staticmethod
    def get_by_id(photo_id):
        """Method return one element by id or None if exception."""
        try:
            return Photo.objects.get(id=photo_id)
        except ObjectDoesNotExist:
            return None

    def create(self, src, user_id, trip_id=None, checkpoint_id=None, description=None):
        """Creating photo model."""
        self.src = src
        self.user_id = user_id
        self.trip_id = trip_id
        self.checkpoint_id = checkpoint_id
        self.description = description
        self.save()

    def update(self, src, user_id):
        """Updating photo model."""
        self.src = src
        self.user_id = user_id
        self.save()

    def to_dict(self):
        """Convert queryset to dictionary."""
        return {
            "id": self.id,
            "src": self.src,
            "user_id": self.user_id,
            "trip_id": self.trip_id,
            "checkpoint_id": self.checkpoint_id,
            "description": self.description
        }
