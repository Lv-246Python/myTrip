"""This module contains Like model and basic methods."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from registration.models import CustomUser
from trip.models import Trip
from checkpoint.models import Checkpoint
from photo.models import Photo
from comment.models import Comment


class Like(models.Model):
    """
    Like
    :argument id: int - auto generate primary key
    :argument user: int - ToDo foreign key
    :argument trip: int - ToDo foreign key
    :argument checkpoint: int - ToDo foreign key
    :argument photo: int - ToDo foreign key
    :argument comment: int - ToDo foreign key
    """

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE, null=True)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)

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
            QuerySet<Like>: QuerySet of Like,
            or None when exception works.
        """
        try:
            return Like.objects.filter(user=user_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_trip_id(trip_id):
        """
        Get Like with given trip id.
        Args:
            trip_id (int): trip id.
        Returns:
            QuerySet<Like>: QuerySet of Like,
            or None when exception works.
        """
        try:
            return Like.objects.filter(trip=trip_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_checkpoint_id(checkpoint_id):
        """
        Get Like with given checkpoint id.
        Args:
            checkpoint_id (int): checkpoint id.
        Returns:
            QuerySet<Like>: QuerySet of Like,
            or None when exception works.
        """
        try:
            return Like.objects.filter(id=checkpoint_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_photo_id(photo_id):
        """
        Get Like with given photo id.
        Args:
            photo_id (int): photo id.
        Returns:
            QuerySet<Like>: QuerySet of Like,
            or None when exception works.
        """
        try:
            return Like.objects.filter(id=photo_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_comment_id(comment_id):
        """
        Get Like with given comment id.
        Args:
            comment_id (int): comment id.
        Returns:
            QuerySet<Like>: QuerySet of Like,
            or None when exception works.
        """
        try:
            return Like.objects.filter(id=comment_id)
        except ObjectDoesNotExist:
            return None

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
            'trip_id': self.trip.id if self.trip else None,
            'checkpoint_id': self.checkpoint.id if self.checkpoint else None,
            'photo_id': self.photo.id if self.photo else None,
            'comment_id': self.comment.id if self.comment else None
        }

    @staticmethod
    def create(user, trip=None, checkpoint=None, photo=None, comment=None):
        """A method creates like by user to trip/checkpoint/photo/comment."""
        like = Like()
        like.user = CustomUser.get_by_id(user)
        like.trip = Trip.get_by_id(trip)
        like.checkpoint = Checkpoint.get_by_id(checkpoint)
        like.photo = Photo.get_by_id(photo)
        like.comment = Comment.get_by_id(comment)
        like.save()
        return like

    @staticmethod
    def delete_by_id(like_id):
        """A method delete like by id."""
        try:
            like = Like.objects.get(id=like_id)
            like.delete()
            return True
        except ObjectDoesNotExist:
            return None

    def __str__(self):
        return "id={} user={} trip={} checkpoint={} photo={} comment={}".format(self.id,
                                                                                self.user,
                                                                                self.trip,
                                                                                self.checkpoint,
                                                                                self.photo,
                                                                                self.comment)
