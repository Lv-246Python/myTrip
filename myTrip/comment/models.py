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
        Get Comment with given comment id

         Args:
            comment_id (int): comment id.

        Returns:
            QuerySet<Comment>: QuerySet of Comment.
        """
        try:
            return Comment.objects.get(id=comment_id)
        except ObjectDoesNotExist:
            return None

    def to_dict(self):
        """Convert model object to dictionary.
        Return:
            dict:
                {
                    'id': id,
                    'message': message,
                    'user': user_id
                }.
        """
        return {
            'id': self.id,
            'message': self.message,
            'user': self.user,
        }

    @staticmethod
    def create(message, user):
        """
        Creates Comment with message and user

         Args:
            message (varchar): message of comment
            user (int): user id, who created comment.

        Returns:
            QuerySet<Comment>: QuerySet of Comment.
        """
        comment = Comment()
        comment.message = message
        comment.user = user
        comment.save()
        return comment

    def update(self, message):
        """
        Updates Comment with new message

         Args:
            message (varchar): new message of comment

        Returns:
            QuerySet<Comment>: QuerySet of Comment.
        """
        if message:
            self.message = message
        self.save()

    def __repr__(self):
        return "id:{} message:{} user:{}".format(self.id, self.message, self.user)
