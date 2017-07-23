"""This module contains Like model class and basic methods for Trip, Checkpoint, Photo and Comment."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from checkpoint.models import Checkpoint
from comment.models import Comment
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip


class Like(models.Model):
    """
    Like
        :argument id: int - auto generate primary key
        :argument user: int - foreign key to CustomUser
        :argument trip: int - foreign key to Trip
        :argument checkpoint: int - foreign key to Checkpoint
        :argument photo: int - foreign key to Photo
        :argument comment: int - foreign key to Comment
    """

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE, null=True)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)

    @staticmethod
    def create(user, trip, checkpoint, photo, comment):
        """A method creates like by user."""
        like = Like()
        like.user = user
        like.trip = trip
        like.checkpoint = checkpoint
        like.photo = photo
        like.comment = comment
        like.save()
        return like

    @staticmethod
    def filter(trip_id, checkpoint_id=None, photo_id=None, comment_id=None):
        """
        Get like with given trip id, checkpoint id, photo id and comment id.
        Args:
            trip_id (int): trip id
            checkpoint_id (int): checkpoint id
            photo_id (int): photo id
            comment_id (int): comment id.
        Returns:
            QuerySet<Like>: QuerySet of Like.
        """
        return Like.objects.filter(trip_id=trip_id, checkpoint_id=checkpoint_id,
                                   photo_id=photo_id, comment_id=comment_id)

    @staticmethod
    def get_by_id(like_id):
        """
        Get Like with given like id.
        Args:
            like_id (int): like id.
        Returns:
            Object<Like>: Like Object,
            or None when exception works.
        """
        try:
            return Like.objects.get(id=like_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_user_id(user_id):
        """
        Get Like with given user id.
        Args:
            user_id (int): user id.
        Returns:
            QuerySet<Like>: QuerySet of Like.
        """
        like = Like.objects.filter(user=user_id)
        return like

    def to_dict(self):
        """
        Convert model object to dictionary.
        Return:
            dict:
                {
                    'id': id,
                    'user_id': user id,
                    'trip_id': trip id,
                    'checkpoint_id': checkpoint id,
                    'photo_id': photo id,
                    'comment_id': comment id
                }
        """
        return {
            'id': self.id,
            'user_id': self.user.id,
            'trip_id': self.trip.id,
            'checkpoint_id': self.checkpoint.id if self.checkpoint else None,
            'photo_id': self.photo.id if self.photo else None,
            'comment_id': self.comment.id if self.comment else None
        }

    def __str__(self):
        return "id:{}, user:{}, trip:{}, checkpoint:{}, photo:{}, comment:{}".format(self.id,
                                                                                     self.user,
                                                                                     self.trip.id,
                                                                                     self.checkpoint.id,
                                                                                     self.photo.id,
                                                                                     self.comment.id)
