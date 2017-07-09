"""This module contains Class Based View for create_trip application."""
import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect

from django.views.generic.base import View
from .models import Trip




class TripView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, trip_id=None):
        """Handles GET request"""
        if trip_id:
            trip = Trip.getbyid(trip_id)
            print(type(trip))
            if not trip:
                return HttpResponse('bad request', status=400)
            trip = trip.to_dict()
            return JsonResponse(trip, status=200)
        else:
            trips = Trip.get_all()
            trips = [trip.to_dict() for trip in trips]
            return JsonResponse(trips, status=200, safe=False)

    def post(self, request):
        """Handles POST request."""
        Trip.create_trip(request)
        return redirect('/api/v1/trip/')

    def put(self, request, trip_id):
        """Handles PUT request."""
        data = json.loads(request.body.decode('utf-8'))
        Trip.edit_trip(data, trip_id)
        return redirect('/api/v1/trip/'+trip_id)

    def delete(self, trip_id):
        """Handles DELETE request."""
        trip = Trip.geById(self, trip_id)
        if trip:
            Trip.delete_trip(trip_id)
            return redirect('/api/v1/trip/')
        return HttpResponse(status=404)
