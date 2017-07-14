"""This module contains comment model class and basic functions."""

from checkpoint.models import Checkpoint
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import models
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
        :argument trip: int - foreign key to trip model, many-to-many
        relation
        :argument checkpoint: int - foreign key to checkpoint model,
        many-to-many relation
        :argument photo: int - foreign key to photo model,
        many-to-many relation.
    """

    message = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    trip = models.ManyToManyField(Trip)
    checkpoint = models.ManyToManyField(Checkpoint)
    photo = models.ManyToManyField(Photo)

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
                    'user_id': user_id
                }.
        """
        return {
            'id': self.id,
            'message': self.message,
            'user': self.user.id
        }

    @staticmethod
    def create(message, user_id, trip_id=DEFAULT, checkpoint_id=DEFAULT, photo_id=DEFAULT):
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
        comment.save()
        if trip_id:
            trip = Trip.get_by_id(trip_id)
            comment.trip.add(trip)
        if checkpoint_id:
            checkpoint = Checkpoint.get_by_id(checkpoint_id)
            comment.checkpoint.add(checkpoint)
        if photo_id:
            photo = Photo.get_by_id(photo_id)
            comment.photo.add(photo)
        return comment

    def update(self, message=DEFAULT):
        """
        Updates Comment with new message
         Args:
            message (str): new message of comment
        Returns:
            Object<Comment>: Object of Comment or None when data fails.
        """
        if message:
            self.message = message
        try:
            self.save()
        except ValidationError:
            return None

    def __repr__(self):
        return "id:{} message:{} user:{}".format(self.id, self.message, self.user)
