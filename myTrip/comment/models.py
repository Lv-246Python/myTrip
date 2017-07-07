"""This module contains comment model class and basic functions."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models


class Comment(models.Model):
    """
     Comment
     :argument id: int - auto generated primary key
     :argument message: str - comment message
     :argument user: int - ToDo foreign key to User model
    ."""
    message = models.TextField()
    user = models.IntegerField()

    @staticmethod
    def get_by_id(comment_id):
        """
        ToDo method to get one element by his id, uses to views,
        returns None when exception works.
        """
        try:
            return Comment.objects.get(id=comment_id)
        except ObjectDoesNotExist:
            return None

    def to_dict(self):
        """
        ToDO method rebuilds queryset ot object dictionary for our views.
        """
        return {
            'id': self.id,
            'message': self.message,
            'user_id': self.user,
        }

    def create(self, message, user):
        """ToDo.
        """
        self.message = message
        self.user = user
        self.save()

    def update(self, message):
        """ToDo"""
        if message:
            self.message = message
        self.save()

    def __repr__(self):
        return "{} {} {}".format(self.id, self.message, self.user)
