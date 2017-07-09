"""This module contains like model class and basic functions."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models


class Like(models.Model):
    """
    Like
    :argument id: int - auto generate primary key
    :argument user: int - 1ToDo foreign key
    """
    user = models.IntegerField()

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

    def to_dict(self):
        """ToDO method rebuilds queryset to object dictionary for our views."""
        return {
            'id': self.id,
            'user_id': self.user
            }

    def create(self, user):
        """ToDo."""
        self.user = user
        self.save()

    def update(self, id):
        """ToDo."""
        if id:
            self.id = id
        self.save()

    def __str__(self):
        return "like_id = {}," \
               "user_id = {}".format(self.id, self.user)
