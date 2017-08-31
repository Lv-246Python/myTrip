"""This module contains Class Based View for create_trip application."""
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic.base import View

from registration.models import CustomUser
from .models import Trip


class TripView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, trip_id=None, user_id=None):
        """Handles GET request with ability to surf trip-list, by logged and not logged users."""
        page = int(request.GET.get('page', 0))
        if trip_id:
            trip = Trip.get_by_id(trip_id)
            if trip:
                trip = trip.to_dict()
                return JsonResponse(trip, status=200, safe=False)
            return HttpResponse(status=404)
        trips = Trip.get_trips(user_id=user_id, page=page)
        data = dict()
        data["trips"] = [trip.to_dict() for trip in trips[0]]
        data["quantity"] = trips[1]
        data["all_pages"] = trips[2]
        return JsonResponse(data, status=200, safe=False)

    def post(self, request):
        """Handles POST request."""
        post_data = json.loads(request.body.decode('utf-8'))
        user = CustomUser.get_by_id(request.user.id)
        if not user:
            return HttpResponse(status=403)
        data = {
            'user': user,
            'title': post_data.get("title"),
            'status': post_data.get("status"),
        }

        trip = Trip.create(**data)
        data = trip.to_dict()
        return JsonResponse(data, status=201)

    def put(self, request, trip_id):
        """Handles PUT request."""
        trip = Trip.get_by_id(trip_id)
        if not trip:
            return HttpResponse(status=404)
        if request.user.id == trip.user.id:
            data = json.loads(request.body.decode('utf-8'))
            trip.edit(data)
            return HttpResponse(status=200)
        return HttpResponse(status=403)

    def delete(self, request, trip_id):
        """Handles DELETE request."""
        trip = Trip.get_by_id(trip_id)
        if not trip:
            return HttpResponse(status=404)
        if request.user.id == trip.user.id:
            Trip.delete_by_id(trip_id)
            return HttpResponse(status=200)
        return HttpResponse(status=403)
