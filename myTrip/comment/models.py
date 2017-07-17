"""This module contains comment model class and basic functions."""

from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from checkpoint.models import Checkpoint
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip

DEFAULT = None


class Comment(models.Model):
    """
    Comment
        :argument id: int - auto generated primary key
        :argument message: str - comment message
        :argument user: int -  foreign key to User model
        :argument trip: int - foreign key to trip model, one-to-many relation
        :argument checkpoint: int - foreign key to checkpoint model, one-to-many relation
        :argument photo: int - foreign key to photo model, one-to-many relation.
    """

    message = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE, null=True)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(null=True, editable=False)
    modified = models.DateTimeField(null=True, editable=False)

    @staticmethod
    def get_by_id(comment_id):
        """
        Get Comment with given comment id
        Args:
            comment_id (int): comment id.
        Returns:
            Object<Comment>: Object of Comment.
        """
        try:
            return Comment.objects.get(id=comment_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_trip_id(trip_id):
        """
        Get Comments with given trip id
        Args:
            trip_id (int): user id foreign key to Trip.
        Returns:
            QuerySet<Comment>: QuerySet of Comments.
        """
        try:
            return Comment.objects.filter(trip=trip_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_checkpoint_id(checkpoint_id):
        """
        Get Comments with given trip id
        Args:
            checkpoint_id (int): user id foreign key to Trip.
        Returns:
            QuerySet<Comment>: QuerySet of Comments.
        """
        try:
            return Comment.objects.filter(checkpoint=checkpoint_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_photo_id(photo_id):
        """
        Get Comments with given photo id
        Args:
            photo_id (int): user id foreign key to Photo.
        Returns:
            QuerySet<Comment>: QuerySet of Comments.
        """
        try:
            return Comment.objects.filter(photo=photo_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_user_id(user_id):
        """
        Get Comments with given user id
        Args:
            user_id (int): user id foreign key to CustomUser.
        Returns:
            QuerySet<Comment>: QuerySet of Comments.
        """
        try:
            return Comment.objects.filter(user=user_id)
        except ObjectDoesNotExist:
            return None

    def to_dict(self):
        """Convert model object to dictionary.
        Return:
            dict:
                {
                    'id': id,
                    'message': message,
                    'user_id': user_id,
                    'trip': self.trip.id,
                    'checkpoint': checkpoint.id,
                    'photo': photo.id,
                    'created': created
                }.
        """
        return {
            'id': self.id,
            'message': self.message,
            'user': self.user.id,
            'trip': self.trip.id if self.trip else None,
            'checkpoint': self.checkpoint.id if self.checkpoint else None,
            'photo': self.photo.id if self.photo else None,
            'created': self.created
        }

    @staticmethod
    def create(message, user_id, trip_id, checkpoint_id, photo_id):
        """
        Creates Comment with message and user
        Args:
            message (str): message of comment
            user_id (int): user id, who created comment.
            trip_id (int): trip id, makes relation to Trip model.
            checkpoint_id (int): checkpoint id, makes relation to Checkpoint model.
            photo_id (int): photo id, makes relation to Photo model.
        Returns:
            Object<Comment>: Object of Comment.
        """
        comment = Comment()
        comment.message = message
        comment.user = CustomUser.get_by_id(user_id)
        comment.trip = Trip.get_by_id(trip_id)
        comment.checkpoint = Checkpoint.get_by_id(checkpoint_id)
        comment.photo = Photo.get_by_id(photo_id)
        comment.created = datetime.now()
        comment.save()
        return comment

    def update(self, message=DEFAULT):
        """
        Updates Comment with new message
         Args:
            message (str): new message of comment
        Returns:
            Object<Comment>: Object of Comment.
        """
        if message:
            self.message = message
        self.save()

    def __repr__(self):
        return "id:{}, message:{}, user:{}, trip:{}, " \
               "checkpoint:{}, photo:{}, created:{}".format(self.id,
                                                            self.message,
                                                            self.user,
                                                            self.trip.id,
                                                            self.checkpoint.id,
                                                            self.photo.id,
                                                            self.created)
