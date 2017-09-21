"""This module contains Trip model class and basic functions."""
from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone

from registration.models import CustomUser

TILES = 6
DEFAULT_IMAGE = "/static/src/img/default_trip_image.jpg"


class Trip(models.Model):
    """
    Trip
    :argument id: int - auto generated primary key,
    :argument user_id: int - foreign key to User model,
    :argument title: str - title,
    :argument src: str - cover photo,
    :argument description: str - description,
    :argument status: int - 1-finished, 2-in progress, 3-announced,
    :argument create_at: datetime - date of trip creation,
    :argument update_at: datetime - date of trip update,
    :argument start: datetime - date of trip start,
    :argument finish: datetime - date of trip finish
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    status = models.IntegerField(null=True)
    src = models.URLField(default=DEFAULT_IMAGE)
    description = models.TextField(default='', null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)
    start = models.DateTimeField(editable=True, default=timezone.now, null=True)
    finish = models.DateTimeField(editable=True, null=True, blank=True)

    def to_dict(self):
        """
        Convert model object to dictionary.
        Return:
            dict:
                {
                'id': id,
                'user': user,
                'user_name': user name or email,
                'title': title,
                'scr': src,
                'create_at': date,
                'update_at': date,
                'description': description,
                'status': status,
                'start': start,
                'finish': finish
                }
        """
        return {
            "id": self.id,
            "user": self.user.id,
            "user_name": (self.user.get_full_name() if self.user.get_full_name()
                          else self.user.email),
            "title": self.title,
            "src": self.src,
            "create_at": self.create_at,
            "update_at": self.update_at,
            "description": self.description,
            "status": self.status,
            "start": self.start,
            "finish": self.finish
        }

    def __repr__(self):
        return "id:{} user:{} title:{} src:{} create_at:{}" \
               "update_at:{} description:{} status:{}".format(self.id,
                                                              self.user,
                                                              self.title,
                                                              self.src,
                                                              self.create_at,
                                                              self.update_at,
                                                              self.description,
                                                              self.status)

    @staticmethod
    def get_by_id(trip_id):
        """
        Get Trip with given trip id.
        Args:
            trip_id (int): trip id.
        Returns:
            trip Object.
        """
        try:
            trip = Trip.objects.get(id=trip_id)
            return trip
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def create(user, title, status, start, src=None, description=None, finish=None):
        """
        Creates Trip
        Args:
            user (int): fk to user.
            title (str): title of trip.
            src (str): cover photo of trip.
            status (int): trip status.
            description (str): description.
            start (obj): date of trip start.
            finish (obj): date of trip finish.
        Returns:
            trip Object.
        """
        trip = Trip()
        trip.user = user
        trip.title = title
        trip.status = status
        trip.start = start
        if src:
            trip.src = src
        if description:
            trip.description = description
        if finish:
            trip.finish = finish
        trip.save()
        return trip

    def edit(self,
             title=None,
             description=None,
             status=None,
             src=None,
             start=None,
             finish=None):
        """
        Updates Trip with new title, src, description and status.
        Args:
            title (str): title of trip.
            description (str): description.
            status (int): trip status.
            src (str): link to trip image.
            start (obj): date of trip start.
            finish (obj): date of trip finish.
        Returns:
            trip Object.
        """
        if title:
            self.title = title
        if description:
            self.description = description
        if status is not None:
            self.status = status
        if src:
            self.src = src
        if start:
            self.start = start
        if finish:
            self.finish = finish
        if src:
            self.src = src
        self.save()

    @staticmethod
    def delete_by_id(trip_id):
        """
        Deletes Trip by id
        Args:
            trip_id (int): id of trip.
        Returns:
            True.
        """
        try:
            trip = Trip.objects.get(id=trip_id)
            trip.delete()
            return True
        except ObjectDoesNotExist:
            return None

    @staticmethod
    def get_trips(user_id, page=0, step=TILES):
        """
        Returns last 6(TILES) trips, also by the user.
        Args:
            user_id (int): id of user,
            page (int): number of trip-list,
            step (int): maximum quantity of trips on one page of trip-list,
        Returns:
            tuple, that consist of:
                trips (list): last 6(TILES) trips,
                quantity (int): quantity of all trips,
                all_pages (int): quantity of pages with all trips
        """
        start = step*page
        end = start + step
        if not user_id:
            trips = Trip.objects.all()
        else:
            trips = Trip.objects.filter(user=user_id)
        quantity = trips.count()
        trips = trips.order_by('-create_at')[start:end]
        all_pages = quantity // step
        if quantity == 0:
            all_pages = 0
        elif quantity % step == 0:
            all_pages = all_pages - 1
        else:
            all_pages = all_pages
        return trips, quantity, all_pages
