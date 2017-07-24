""" This checkpoint module generates view for CRUD requests"""

import json
from django.views.generic import View
from django.http import JsonResponse, HttpResponse
from django.core.exceptions import ObjectDoesNotExist

from .models import Checkpoint
from trip.models import Trip


class CheckpointView(View):
    """ checkpoint view handle GET, POST, PUT, DELETE requests """

    def get(self, request, trip_id, checkpoint_id=None):
        """
        Handles get request
        Return json and status 200 with new object if operation was successful
        Return status 404 if checkpoint with such checkpoint_id wasn't found
        """

        if checkpoint_id:
            checkpoint = Checkpoint.get_by_id(checkpoint_id)
            if not checkpoint:
                return HttpResponse(status=404)
            checkpoint_dict = checkpoint.to_dict()
            return JsonResponse(checkpoint_dict, status=200)
        checkpoints = Checkpoint.get_by_trip_id(trip_id)
        checkpoints_list = [check.to_dict() for check in checkpoints]
        return JsonResponse(checkpoints_list, status=200, safe=False)

    def post(self, request, trip_id):
        """
        Handles post request
        Create new object and returns status  200 if all was successful
        Returns status 404 if such trip wasn't found
        """

        data = json.loads(request.body.decode('utf-8'))
        try:
            trip = Trip.objects.get(id=trip_id)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)
        result = Checkpoint.create(data['longitude'],data['latitude'], data['title'], data['description'],
                                   data['source_url'],data['position_number'],trip)
        return JsonResponse(result.to_dict(), status=200)

    def put(self, request, checkpoint_id, trip_id):
        """
        Handles put request
        Return status 200 if checkpoint has been successful updated
        Return status 404 if checkpoint with such checkpoint_id wasn't found
        """
        trip = Trip.objects.get(id=trip_id)
        if not trip.id == request.user.id:
            return HttpResponse(status=403)
        checkpoint = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint:
            return HttpResponse(status=404)
        data = json.loads(request.body.decode('utf-8'))
        checkpoint.update(data['longitude'],data['latitude'], data['title'], data['description'],
                                 data['position_number'])
        return JsonResponse(checkpoint.to_dict(), status=200)

    def delete(self, request, checkpoint_id, trip_id):
        """
        Handles delete request
        Returns 200 if checkpoint has been deleted
        Returns 404 if checkpoint with such checkpoint_id wasn't found
        Returns 403 if user didn't create this trip
        """
        trip = Trip.objects.get(id=trip_id)
        if not trip.id == request.user.id:
            return HttpResponse(status=403)
        result = Checkpoint.delete_by_id(checkpoint_id)
        if not result:
            return HttpResponse(status=404)
        return HttpResponse(status=200)
