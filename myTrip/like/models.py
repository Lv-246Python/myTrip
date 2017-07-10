"""This module contains like model class and basic functions."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models


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
    user = models.IntegerField()
    trip = models.IntegerField(null=True)
    checkpoint = models.IntegerField(null=True)
    photo = models.IntegerField(null=True)
    comment = models.IntegerField(null=True)

    @staticmethod
    def get_by_id(like_id):
        """
        ToDo method to get one element by his id, uses to views,
        returns None when exception works.
        """
        try:
            return Like.objects.get(id=like_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_trip_id(trip_id):
        """
        ToDo method to get one like by trip id, uses to views,
        returns None when exception works.
        """
        try:
            return Like.objects.filter(trip=trip_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_checkpoint_id(checkpoint_id):
        """
        ToDo method to get one like by checkpoint id, uses to views,
        returns None when exception works.
        """
        try:
            return Like.objects.get(id=checkpoint_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_photo_id(photo_id):
        """
        ToDo method to get one like by photo id, uses to views,
        returns None when exception works.
        """
        try:
            return Like.objects.get(id=photo_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_comment_id(comment_id):
        """
        ToDo method to get one like by comment id, uses to views,
        returns None when exception works.
        """
        try:
            return Like.objects.get(id=comment_id)
        except ObjectDoesNotExist:
            return None

    def to_dict(self):
        """ToDO method rebuilds queryset to object dictionary for our views."""
        return {
            'id': self.id,
            'user_id': self.user,
            'trip_id': self.trip,
            'checkpoint_id': self.checkpoint,
            'photo_id': self.photo,
            'comment_id': self.comment
        }

    @staticmethod
    def create(user, trip=None, checkpoint=None, photo=None, comment=None):
        """ToDo method creates like by user to trip/checkpoint/photo/comment."""
        like = Like()
        like.user = user
        like.trip = trip
        like.checkpoint = checkpoint
        like.photo = photo
        like.comment = comment
        like.save()
        return like

    @staticmethod
    def delete_by_id(like_id):
        """ToDo method delete like by id."""
        try:
            like = Like.objects.get(id=like_id)
            like.delete()
            return True
        except ObjectDoesNotExist:
            return None

    def __str__(self):
        return "like={} user={} trip={} checkpoint={} photo={} comment={}".format(self.id,
                                                                                  self.user,
                                                                                  self.trip,
                                                                                  self.checkpoint,
                                                                                  self.photo,
                                                                                  self.comment)
