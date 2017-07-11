"""This module contains Class Based View for create_trip application."""
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic.base import View
from .models import Trip

class TripView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, trip_id):
        """Handles GET request"""
        trip = Trip.get_by_id(trip_id)
        if trip:
            trip = trip.to_dict()
            return JsonResponse(trip, status=200)
        return HttpResponse(status=404)

    def post(self, request):
        """Handles POST request."""
        data = json.loads(request.body.decode('utf-8'))
        Trip.create(data)
        return HttpResponse(status=201)


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
            Trip.delete_by_id(trip_id)
            return HttpResponse(status=200)
        return HttpResponse(status=404)
