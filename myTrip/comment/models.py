"""This module contains comment model class and basic functions."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from registration.models import CustomUser


class Comment(models.Model):
    """
     Comment
     :argument id: int - auto generated primary key
     :argument message: str - comment message
     :argument user: int -  foreign key to User model
    ."""

    message = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

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
    def get_by_user_id(user_id):
        """
        Get Comments with given user id
        Args:
            user_id (int): user id foreign .
        Returns:
            QuerySet<Comment>: QuerySet of Comments.
        """
        return Comment.objects.filter(user=user_id)

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
            'user': self.user.id,
        }

    @staticmethod
    def create(message, user_id):
        """
        Creates Comment with message and user
         Args:
            message (str): message of comment
            user (int): user id, who created comment.
        Returns:
            Object<Comment>: Object of Comment.
        """
        comment = Comment()
        comment.message = message
        comment.user = CustomUser.get_by_id(user_id)
        comment.save()
        return comment

    def update(self, message):
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
        return "id:{} message:{} user:{}".format(self.id, self.message, self.user)
