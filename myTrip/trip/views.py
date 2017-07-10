"""This module contains Class Based View for create_trip application."""
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic.base import View
from .models import Trip

class TripView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, trip_id=None):
        """Handles GET request"""
        if trip_id:
            trip = Trip.get_by_id(trip_id)
            if not trip:
                return HttpResponse(status=404)
            trip = trip.to_dict()
            return JsonResponse(trip, status=200)
        else:
            trips = Trip.get_all()
            trips = [trip.to_dict() for trip in trips]
            return JsonResponse(trips, status=200, safe=False)

    def post(self, request):
        """Handles POST request."""
        data = json.loads(request.body.decode('utf-8'))
        Trip.create(**data)
        return HttpResponse(status=200)


    def put(self, request, trip_id):
        """Handles PUT request."""
        if Trip.get_by_id(trip_id):
            data = json.loads(request.body.decode('utf-8'))
            Trip.edit(data, trip_id)
            return HttpResponse(status=200)
        return HttpResponse(status=404)

    def delete(self, request, trip_id):
        """Handles DELETE request."""
        if Trip.get_by_id(trip_id):
            Trip.delete_trip(trip_id)
            return HttpResponse(status=200)
        return HttpResponse(status=404)
