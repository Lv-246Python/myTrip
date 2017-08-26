"""This module contains Subscribe model with its methods."""

from django.db import models

from registration.models import CustomUser
from trip.models import Trip


class Subscribe(models.Model):
    """
    Subscribe
    :argument id: int - auto generate primary key
    :argument user_owner_id: int - owner user's id
    :argument: subscribed_on_id: int - Foreign key(CustomUser)
    :argument: trip: int - Foreign key(Trip)
    create_at: datetime - date and time of creation
    update_at: datetime - date and time of last updated object.
    """

    subscribed_on = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    user_owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True,
                                   related_name='+')
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    @staticmethod
    def create(user_owner, trip=None, subscribed_on=None):
        """
        Creates Comment with message and user
        Args:
            user_owner (int): user id, who did subscribe action.
            trip (int): trip id, makes relation to Trip model.
            subscribed (int): user id, on who was made subscribe action.
        Returns:
            Object<Subscribe>: Object of Subscribe.
        """
        subscribe = Subscribe()

        subscribe.user_owner = user_owner
        subscribe.trip = trip
        subscribe.subscribed_on = subscribed_on

        subscribe.save()

        return subscribe

    @staticmethod
    def filter(user_owner=None, subscribed_on=None, trip=None):
        """
        Filter Subscribe objects with given Subscribed and Trip.
        Args:
            user_owner (Object<CustomUser>): Object<CustomUser>,
            subscribed_on (Object<CustomUser>): Object<CustomUser>,
            trip (Object<Trip>): Object<Trip>.
        Returns:
            QuerySet<Subscribe>: QuerySet of Subscribes or None.
        """
        find = {}
        if user_owner:
            find['user_owner'] = user_owner
        if subscribed_on:
            find['subscribed_on'] = subscribed_on
        if trip:
            find['trip'] = trip

        subscribes = Subscribe.objects.filter(**find)
        return subscribes

    def to_dict(self):
        """
        Convert model object to dictionary.
        Return:
            dict:
                {
                    'id': id,
                    'user_owner_id': user id,
                    'subscribed_on_id': subscribed_on id,
                    'trip_id': trip id,
                    'create_at': date of creation,
                    'update_at': date of modification,
                    'user_name': user owner's name,
                    'trip_name': subscribed trip title,
                    'subscribed_on_name': subscribed on user's name
                }
        """
        user_name = CustomUser.get_full_name(CustomUser.get_by_id(self.user_owner.id))
        subscribed_on_name = CustomUser.get_full_name(CustomUser.get_by_id(
            self.subscribed_on.id)) if self.subscribed_on else None
        return {
            'id': self.id,
            'user_owner': self.user_owner.id,
            'subscribed_on': self.subscribed_on.id if self.subscribed_on else None,
            'trip': self.trip.id if self.trip else None,
            'create_at': self.create_at,
            'update_at': self.update_at,
            'user_name': user_name,
            'trip_name': self.trip.title if self.trip else None,
            'subscribed_on_name': subscribed_on_name
        }

    def __repr__(self):
        return """id: {}, user: {}, subscribed: {}, trip: {}, create_at: {},
        update_at: {}, user_name:{}, trip_name: {}, subscribed_on_name: {}""".format(
            self.id, self.user_owner, self.subscribed_on, self.trip, self.create_at,
            self.update_at, CustomUser.get_full_name(CustomUser.get_by_id(self.user_owner.id)),
            self.trip.title if self.trip else None,
            CustomUser.get_full_name(CustomUser.get_by_id(self.subscribed_on.id))
            if self.subscribed_on else None)
