"""This module contains Likes models and basic methods for Trip, Checkpoint, Photo and Comment."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from checkpoint.models import Checkpoint
from comment.models import Comment
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip


class LikesTrip(models.Model):
    """
    LikesTrip
        :argument id: int - auto generate primary key
        :argument user: int - foreign key to CustomUser
        :argument trip: int - foreign key to Trip
    """

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)

    @staticmethod
    def create(user, trip):
        """A method creates like by user to trip."""

        like = LikesTrip()
        like.user = user
        like.trip = trip
        like.save()
        return like

    @staticmethod
    def get_by_id(like_id):
        """
        Get LikesTrip with given like id.
        Args:
            like_id (int): like id.
        Returns:
            Object<LikesTrip>: LikesTrip Object,
            or None when exception works.
        """
        try:
            return LikesTrip.objects.get(id=like_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_user_id(user_id):
        """
        Get LikesTrip with given user id.
        Args:
            user_id (int): user id.
        Returns:
            QuerySet<LikesTrip>: QuerySet of LikesTrip,
            or None when exception works.
        """
        try:
            return LikesTrip.objects.filter(user=user_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_trip_id(trip_id):
        """
        Get LikesTrip with given trip id.
        Args:
            trip_id (int): trip id.
        Returns:
            QuerySet<LikesTrip>: QuerySet of LikesTrip,
            or None when exception works.
        """
        try:
            return LikesTrip.objects.filter(trip=trip_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_by_id(like_id):
        """A method delete like by id."""
        try:
            like = LikesTrip.objects.get(id=like_id)
            like.delete()
            return True
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
                    'trip_id': trip id
                }
        """
        return {
            'id': self.id,
            'user_id': self.user.id,
            'trip_id': self.trip.id
        }

    def __str__(self):
        return "id={} user={} trip={}".format(self.id, self.user, self.trip)


class LikesCheckpoint(models.Model):
    """
    LikesCheckpoint
        :argument id: int - auto generate primary key
        :argument user: int - foreign key to CustomUser
        :argument checkpoint: int - foreign key to Checkpoint
    """

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)

    @staticmethod
    def create(user, trip, checkpoint):
        """A method creates like by user to checkpoint."""
        like = LikesCheckpoint()
        like.user = user
        like.trip = trip
        like.checkpoint = checkpoint
        like.save()
        return like

    @staticmethod
    def filter(trip_id, checkpoint_id):
        """
        Get like with given trip and checkpoint id
        Args:
            trip_id (int): trip id
            checkpoint_id (int): checkpoint id.

        Returns:
            QuerySet<LikesCheckpoint>: QuerySet of LikesCheckpoint.
        """
        return LikesCheckpoint.objects.filter(trip_id=trip_id, checkpoint_id=checkpoint_id)

    @staticmethod
    def get_by_id(like_id):
        """
        Get LikesCheckpoint with given like id.
        Args:
            like_id (int): like id.
        Returns:
            Object<LikesCheckpoint>: LikesCheckpoint Object,
            or None when exception works.
        """
        try:
            return LikesCheckpoint.objects.get(id=like_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_user_id(user_id):
        """
        Get LikesCheckpoint with given user id.
        Args:
            user_id (int): user id.
        Returns:
            QuerySet<LikesCheckpoint>: QuerySet of LikesCheckpoint,
            or None when exception works.
        """
        try:
            return LikesCheckpoint.objects.filter(user=user_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_checkpoint_id(checkpoint_id):
        """
        Get LikesCheckpoint with given checkpoint id.
        Args:
            checkpoint_id (int): checkpoint id.
        Returns:
            QuerySet<LikesCheckpoint>: QuerySet of LikesCheckpoint,
            or None when exception works.
        """
        try:
            return LikesCheckpoint.objects.filter(id=checkpoint_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_by_id(like_id):
        """A method delete like by id."""
        try:
            like = LikesCheckpoint.objects.get(id=like_id)
            like.delete()
            return True
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
                    'checkpoint_id': checkpoint id
                }
        """
        return {
            'id': self.id,
            'user_id': self.user.id,
            'checkpoint_id': self.checkpoint.id
        }

    def __str__(self):
        return "id={} user={} checkpoint={}".format(self.id, self.user, self.checkpoint)


class LikesPhoto(models.Model):
    """
    LikesPhoto
        :argument id: int - auto generate primary key
        :argument user: int - foreign key to CustomUser
        :argument photo: int - foreign key to Photo
    """

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE, null=True)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, null=True)

    @staticmethod
    def create(user, trip, checkpoint, photo):
        """A method creates like by user to photo."""
        like = LikesPhoto()
        like.user = user
        like.trip = trip
        like.checkpoint = checkpoint
        like.photo = photo
        like.save()
        return like

    @staticmethod
    def filter(trip_id, checkpoint_id, photo_id):
        """
        Get like with given trip id, checkpoint id and photo id.
        Args:
            trip_id (int): trip id
            checkpoint_id (int): checkpoint id
            photo_id (int): photo id.

        Returns:
            QuerySet<LikesPhoto>: QuerySet of LikesPhoto.
        """
        return LikesPhoto.objects.filter(trip_id=trip_id, checkpoint_id=checkpoint_id, photo_id=photo_id)

    @staticmethod
    def get_by_id(like_id):
        """
        Get LikesPhoto with given like id.
        Args:
            like_id (int): like id.
        Returns:
            Object<LikesPhoto>: LikesPhoto Object,
            or None when exception works.
        """
        try:
            return LikesPhoto.objects.get(id=like_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_user_id(user_id):
        """
        Get LikesPhoto with given user id.
        Args:
            user_id (int): user id.
        Returns:
            QuerySet<LikesPhoto>: QuerySet of LikesPhoto,
            or None when exception works.
        """
        try:
            return LikesPhoto.objects.filter(user=user_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_photo_id(photo_id):
        """
        Get LikesPhoto with given photo id.
        Args:
            photo_id (int): photo id.
        Returns:
            QuerySet<LikesPhoto>: QuerySet of LikesPhoto,
            or None when exception works.
        """
        try:
            return LikesPhoto.objects.filter(id=photo_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_by_id(like_id):
        """A method delete like by id."""
        try:
            like = LikesPhoto.objects.get(id=like_id)
            like.delete()
            return True
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
                    'photo_id': photo id
                }
        """
        return {
            'id': self.id,
            'user_id': self.user.id,
            'photo_id': self.photo.id
        }

    def __str__(self):
        return "id={} user={} photo={}".format(self.id, self.user, self.photo)


class LikesComment(models.Model):
    """
    LikesComment
        :argument id: int - auto generate primary key
        :argument user: int - foreign key to CustomUser
        :argument comment: int - foreign key to Comment
    """

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    checkpoint = models.ForeignKey(Checkpoint, on_delete=models.CASCADE, null=True)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)

    @staticmethod
    def create(user, trip, checkpoint, photo, comment):
        """A method creates like by user to comment."""
        like = LikesComment()
        like.user = user
        like.trip = trip
        like.checkpoint = checkpoint
        like.photo = photo
        like.comment = comment
        like.save()
        return like

    @staticmethod
    def filter(trip_id, checkpoint_id, photo_id, comment_id):
        """
        Get like with given trip id, checkpoint id, photo id and comment id.
        Args:
            trip_id (int): trip id
            checkpoint_id (int): checkpoint id
            photo_id (int): photo id
            comment_id (int): comment id.

        Returns:
            QuerySet<LikesComment>: QuerySet of LikesComment.
        """
        return LikesComment.objects.filter(trip_id=trip_id, checkpoint_id=checkpoint_id,
                                           photo_id=photo_id, comment_id=comment_id)

    @staticmethod
    def get_by_id(like_id):
        """
        Get LikesComment with given like id.
        Args:
            like_id (int): like id.
        Returns:
            Object<LikesComment>: LikesComment Object,
            or None when exception works.
        """
        try:
            return LikesComment.objects.get(id=like_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_user_id(user_id):
        """
        Get LikesComment with given user id.
        Args:
            user_id (int): user id.
        Returns:
            QuerySet<LikesComment>: QuerySet of LikesComment,
            or None when exception works.
        """
        try:
            return LikesComment.objects.filter(user=user_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_comment_id(comment_id):
        """
        Get LikesComment with given comment id.
        Args:
            comment_id (int): comment id.
        Returns:
            QuerySet<LikesComment>: QuerySet of LikesComment,
            or None when exception works.
        """
        try:
            return LikesComment.objects.filter(id=comment_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def delete_by_id(like_id):
        """A method delete like by id."""
        try:
            like = LikesComment.objects.get(id=like_id)
            like.delete()
            return True
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
                    'comment_id': comment id
                }
        """
        return {
            'id': self.id,
            'user_id': self.user.id,
            'comment_id': self.comment.id
        }

    def __str__(self):
        return "id={} user={} comment={}".format(self.id, self.user, self.comment)
