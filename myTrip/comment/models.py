"""This module contains comment model class and basic functions."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from checkpoint.models import Checkpoint
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip


class Comment(models.Model):
    """
    Comment
        :argument id: int - auto generated primary key
        :argument message: str - comment message
        :argument user: Object<CustomUser>  -  foreign key to User model
        :argument trip: Object<Trip> - foreign key to trip model, one-to-many relation
        :argument checkpoint: Object<Checkpoint> - foreign key to checkpoint model, one-to-many relation
        :argument photo: Object<Photo> - foreign key to photo model, one-to-many relation
        :argument created_at: datetime - date and time of created comment
        :argument modified_at: datetime - date and time of modified comment
    """

    message = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE, null=True)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

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
            comment = Comment.objects.get(id=comment_id)
            return comment
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def filter(trip_id=None, checkpoint_id=None, photo_id=None):
        """
        Get Comments with given trip id, checkpoint_id, photo_id.
        Args:
            trip_id (int): user id foreign key to Trip.
            checkpoint_id (int): user id foreign key to Checkpoint.
            photo_id (int): user id foreign key to Photo.
        Returns:
            QuerySet<Comment>: QuerySet of Comments or None.
        """
        comments = Comment.objects.filter(trip=trip_id, checkpoint=checkpoint_id,
                                          photo=photo_id)
        return comments

    @staticmethod
    def get_by_user_id(user_id):
        """
        Get Comments with given user id
        Args:
            user_id (int): user id foreign key to CustomUser.
        Returns:
            QuerySet<Comment>: QuerySet of Comments or None.
        """
        comment = Comment.objects.filter(user=user_id)
        return comment

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
                    'create_at': date of creation
                }.
        """
        return {
            'id': self.id,
            'message': self.message,
            'user': self.user.id,
            'trip': self.trip.id,
            'checkpoint': self.checkpoint.id if self.checkpoint else None,
            'photo': self.photo.id if self.photo else None,
            'create_at': self.create_at,
            'update_at': self.update_at
        }

    @staticmethod
    def create(message, user, trip=None, checkpoint=None, photo=None):
        """
        Creates Comment with message and user
        Args:
            message (str): message of comment
            user (int): user id, who created comment.
            trip (int): trip id, makes relation to Trip model.
            checkpoint (int): checkpoint id, makes relation to Checkpoint model.
            photo (int): photo id, makes relation to Photo model.
        Returns:
            Object<Comment>: Object of Comment.
        """
        comment = Comment()

        comment.message = message
        comment.user = user
        comment.trip = trip
        comment.checkpoint = checkpoint
        comment.photo = photo

        comment.save()

        return comment

    def update(self, message=None):
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
               "checkpoint:{}, photo:{}, create_at:{}, update_at:{}".format(self.id,
                                                                            self.message,
                                                                            self.user,
                                                                            self.trip.id,
                                                                            self.checkpoint.id,
                                                                            self.photo.id,
                                                                            self.create_at,
                                                                            self.update_at)
