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
    trip_id = models.IntegerField(null=True)
    checkpoint_id = models.IntegerField(null=True)
    description = models.TextField(null=True)

    @staticmethod
    def get_by_id(photo_id):
        """
        Get photo with given photo id
        Args:
        photo_id (int): photo id.
        Returns:
        QuerySet<Photo>: QuerySet of Photo.
        """
        try:
            return Photo.objects.get(id=photo_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def create(self, src, user_id, trip_id=None, checkpoint_id=None, description=None):
        """ Creating photo model."""
        photo = Photo()
        photo.src = src
        photo.user_id = user_id
        photo.trip_id = trip_id
        photo.trip_id = trip_id
        photo.checkpoint_id = checkpoint_id
        photo.description = description
        photo.save()

    def update(self, src, user_id):
        """Updating photo model."""
        self.src = src
        self.user_id = user_id
        self.save()

    def to_dict(self):
        """Convert model object to dictionary.
        Return:
            dict:
                {
                    'id': id,
                    'src': source link,
                    'user_id': user id,
                    'trip_id': trip id,
                    'checkpoit_id': checkpoint id,
                    'description': description text
                    ...
                }
        """
        return {
            "id": self.id,
            "src": self.src,
            "user_id": self.user_id,
            "trip_id": self.trip_id,
            "checkpoint_id": self.checkpoint_id,
            "description": self.description
        }
