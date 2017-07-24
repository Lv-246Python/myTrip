"""This module contains Class Based View for create_trip application."""
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic.base import View

from registration.models import CustomUser
from .models import Trip

class TripView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, trip_id=None):
        """Handles GET request"""
        if not trip_id:
            user_id = request.user.id
            trips = Trip.get_trips(user_id)
            trips = [trip.to_dict() for trip in trips]
            return JsonResponse(trips, status=200, safe=False)
        else:
            trip = Trip.get_by_id(trip_id)
            if trip:
                trip = trip.to_dict()
                return JsonResponse(trip, status=200, safe=False)
            return HttpResponse(status=404)

    def post(self, request):
        """Handles POST request."""
        data = json.loads(request.body.decode('utf-8'))
        user = CustomUser.get_by_id(request.user.id)
        if not user:
            return HttpResponse(status=401)
        data["user"] = user
        Trip.create(**data)
        return HttpResponse(status=201)

    def put(self, request, trip_id):
        """Handles PUT request."""
        trip = Trip.get_by_id(trip_id)
        if trip and request.user.id == trip.user.id:
            data = json.loads(request.body.decode('utf-8'))
            trip.edit(data)
            return HttpResponse(status=200)
        return HttpResponse(status=404)

    def delete(self, request, trip_id):
        """Handles DELETE request."""
        trip = Trip.get_by_id(trip_id)
        if trip and request.user.id == trip.user.id:
            Trip.delete_by_id(trip_id)
            return HttpResponse(status=200)
        return HttpResponse(status=404)
        #dev_fix_feature2
