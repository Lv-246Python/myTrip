"""This module contains Class Based View for Subscribe application."""

from django.http import HttpResponse, JsonResponse
from django.views.generic.base import View

from registration.models import CustomUser
from trip.models import Trip
from .models import Subscribe

LOGIN_REQUIRED = 'Login required.'
UNSUBSCRIBE = 'You unsubscribed.'
SUBSCRIBE = 'You subscribed'


class SubscribeView(View):
    """Subscribe views, handles GET and POST requests."""

    def get(self, request, trip_id=None, subscribed_id=None):
        """
        Handles GET request.
        Takes as request id's of: trip, subscribed. Calls necessary method to get QuerySet of
        subscribes from foreign key id's(trip,subscribed) or gets one specific
        subscribe from subscribe id and returns it.
        Returns serialized QuerySet or Subscribe object to JSON with status 200,
        or returns status 404, when else statement works.
        Args:
            request.user.id(int): id of logged user,
            trip_id (int): id of trip,
            subscribed_id (int): id of user, was subscribed by logged user.
        Returns:
            JsonResponse: response: <Subscribe>
            or
            HttpResponse: status: 404.
        """
        if subscribed_id or trip_id:
            subscribes = Subscribe.filter(user=request.user.id, subscribed=subscribed_id,
                                        trip=trip_id)
            subscribes = [subscribe.to_dict() for subscribe in subscribes]
            return JsonResponse(subscribes, status=200, safe=False)
        subscribes = Subscribe.get_by_user(user=request.user.id)
        subscribes = [subscribe.to_dict() for subscribe in subscribes]
        return JsonResponse(subscribes, status=200, safe=False)

    def post(self, request, subscribed_id=None, trip_id=None):
        """
        Handles POST request.
        First checks if user is logged.
        Then checks if logged user is subscribed on another user(subscribed model field) or trip.
        If true, deletes subscription and returns JSON data with status. Else creates Subscribe
        object and saves it in database.
        Args:
            request.user.id(int): id of logged user,
            trip_id (int): id of trip,
            subscribed_id (int): id of user, on who logged user wishes to subscribe.
        Returns:
            JsonResponse: response: <comment>
            or
            HttpResponse: status: 404.
        """
        user = CustomUser.get_by_id(request.user.id)
        if user is None:
            return HttpResponse(LOGIN_REQUIRED, status=401)

        subscribed = CustomUser.get_by_id(user_id=subscribed_id)
        trip = Trip.get_by_id(trip_id=trip_id)

        subscribe = Subscribe.filter(user=user, subscribed=subscribed, trip=trip)
        print(subscribe)
        if subscribe:
            subscribe.delete()
            return HttpResponse(UNSUBSCRIBE, status=200)

        Subscribe.create(user=user, trip=trip, subscribed=subscribed)
        return HttpResponse(SUBSCRIBE, status=201)
