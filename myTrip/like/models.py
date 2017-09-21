"""
This module contains Like model class and basic methods for Trip, Checkpoint, Photo and Comment.
"""

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
    def create(user, trip=None, checkpoint=None, photo=None, comment=None):
        """A method creates like by user."""
        like = Like()
        like.user = user
        if trip:
            like.trip = trip
        if checkpoint:
            like.checkpoint = checkpoint
        if photo:
            like.photo = photo
        if comment:
            like.comment = comment
        like.save()
        return like

    @staticmethod
    def filter(trip=None, checkpoint=None, photo=None, comment=None):
        """
        Get all likes by trip id, checkpoint id, photo id and comment id.
        Args:
            trip (int): trip id
            checkpoint (int): checkpoint id
            photo (int): photo id
            comment (int): comment id.
        Returns:
            QuerySet<Like>: QuerySet of Like.
        """
        return Like.objects.filter(trip=trip, checkpoint=checkpoint,
                                   photo=photo, comment=comment)

    @staticmethod
    def filter_by_user(user, trip=None, checkpoint=None, photo=None, comment=None):
        """
        Get like by user from trip id, checkpoint id, photo id and comment id.
        Args:
            user (int): user id
            trip (int): trip id
            checkpoint (int): checkpoint id
            photo (int): photo id
            comment (int): comment id.
        Returns:
            QuerySet<Like>: QuerySet of Like.
        """
        return Like.objects.filter(user=user, trip=trip, checkpoint=checkpoint,
                                   photo=photo, comment=comment)

    def to_dict(self):
        """
        Convert model object to dictionary.
        Return:
            dict:{
                'id': id,
                'user': user id,
                'user_name': user name or email,
                'avatar': user avatar,
                'trip': trip id,
                'checkpoint': checkpoint id,
                'photo': photo id,
                'comment': comment id,

            }
        """
        return {
            'id': self.id,
            'user': self.user.id,
            'user_name': (self.user.get_full_name() if self.user.get_full_name()
                          else self.user.email),
            'avatar': self.user.profile.avatar,
            'trip': self.trip.id if self.trip else None,
            'checkpoint': self.checkpoint.id if self.checkpoint else None,
            'photo': self.photo.id if self.photo else None,
            'comment': self.comment.id if self.comment else None,
        }

    def __repr__(self):
        return "id:{}, user:{}, trip:{}, checkpoint:{}, photo:{}, comment:{}".\
            format(self.id, self.user.id, self.trip.id, self.checkpoint.id,
                   self.photo.id, self.comment.id)
