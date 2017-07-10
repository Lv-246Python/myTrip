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
    trip = models.IntegerField()
    checkpoint = models.IntegerField()
    photo = models.IntegerField()
    comment = models.IntegerField()

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
            return Like.objects.get(id=trip_id)
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
    def create(user):
        """ToDo method creates like by user to trip/checkpoint/photo/comment."""
        like = Like()
        like.user = user
        return like

    def update(self, id):
        """ToDo."""
        if id:
            self.id = id
        self.save()

    def __str__(self):
        return "like_id = {}," \
               "user_id = {}," \
               "trip_id = {}," \
               "checkpoint_id = {}," \
               "photo_id = {}," \
               "comment_id = {}".format(self.id, self.user, self.trip, self.checkpoint, self.photo, self.comment)
