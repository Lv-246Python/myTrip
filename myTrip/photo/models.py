"""Module contain photo model class and methods."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models


class Photo(models.Model):
    """
    src = photo source link,
    user_id = id user who post.
    """
    src = models.CharField(max_length=200)
    user_id = models.IntegerField()

    @staticmethod
    def get_by_id(photo_id):
        """Method return one element by id or None if exception."""
        try:
            return Photo.objects.get(id=photo_id)
        except ObjectDoesNotExist:
            return None

    def create(self, src, user_id):
        """Creating photo model."""
        self.src = src
        self.user_id = user_id
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
        }
