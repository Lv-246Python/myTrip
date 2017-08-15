"""This module contains Subscribe model with its methods."""

from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from registration.models import CustomUser
from trip.models import Trip


class Subscribe(models.Model):
    """
    Subscribe
    :argument id: int - auto generate primary key
    :argument user_id: int - owner user's id
    :argument: subscribed_id: int - Foreign key(CustomUser)
    :argument: trip: int - Foreign key(Trip)
    create_at: datetime - date and time of creation
    update_at: datetime - date and time of last updated object.
    """

    subscribed = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='+')
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    @staticmethod
    def create(user, trip=None, subscribed=None):
        """
        Creates Comment with message and user
        Args:
            user (int): user id, who did subscribe action.
            trip (int): trip id, makes relation to Trip model.
            subscribed (int): user id, on who was made subscribe action.
        Returns:
            Object<Subscribe>: Object of Subscribe.
        """
        subscribe = Subscribe()

        subscribe.user = user
        subscribe.trip = trip
        subscribe.subscribed = subscribed

        subscribe.save()

        return subscribe

    @staticmethod
    def get_by_id(subscribe_id):
        """
        Get Subscribe with given subscribe id.
        Args:
            subscribe_id (int): subscribe id.
        Returns:
            Object<Subscribe>: Subscribe Object,
            or None when exception works.
        """
        try:
            return Subscribe.objects.get(id=subscribe_id)
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_by_user(user):
        subscribes = Subscribe.objects.filter(user=user)
        return subscribes

    @staticmethod
    def filter(user=None, subscribed=None, trip=None):
        subscribes = Subscribe.objects.filter(user=user, subscribed=subscribed, trip=trip)
        return subscribes

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
            'user': self.user.id,
            'subscribed': self.subscribed.id if self.subscribed else None,
            'trip': self.trip.id if self.trip else None,
            'create_at': self.create_at,
            'update_at': self.update_at,
        }

    def __repr__(self):
        return "id: {}, user: {}, subscribed: {}, trip: {}, create_at: {}, update_at: {}".format(
            self.id, self.user, self.subscribed, self.trip.id, self.create_at, self.update_at)
