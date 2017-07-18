""" This checkpoint module generates view for CRUD requests"""

import json
from django.http import JsonResponse, HttpResponse
from django.views.generic import View
from .models import  Checkpoint


class CheckpointView(View):
    """ checkpoint view handle GET, POST, PUT, DELETE requests """

    def get(self, request, trip_id, checkpoint_id=None):
        """
        Handles get request
        Return json and status 200 with new object if operation was successful
        Return status 404 if checkpoint with such checkpoint_id wasn't found
        Return status 400 if checkpoint_id and trip_id wasn't passed
        """

        if checkpoint_id:
            checkpoint = Checkpoint.get_by_id(checkpoint_id)
            if not checkpoint:
                return HttpResponse(status=404)
            checkpoint_dict = checkpoint.to_dict()
            return JsonResponse(checkpoint_dict, status = 200)
        checkpoints = Checkpoint.get_by_trip_id(trip_id)
        checkpoints_list = [check.to_dict() for check in checkpoints]
        return JsonResponse(checkpoints_list, status=200, safe=False)

    def post(self, request, trip_id):
        """
        Handles post request
        Create new object and returns status  200 if all was successful
        Returns status 409 if creation doesn't occur
        Returns status 400 if trip_id wasn't passed
        """
        if not trip_id:
            return HttpResponse(status=400)
        data = json.loads(request.body.decode('utf-8'))
        data["trip_id"] = trip_id
        result = Checkpoint.create(**data)
        if not result:
            return HttpResponse(status=409)
        return JsonResponse(result.to_dict(), status=200)

    def put(self, request, checkpoint_id, trip_id):
        """
        Handles put request
        Return status 200 if checkpoint has been successful updated
        Return status 400 if checkpoint_id wasn't passed
        Return status 404 if checkpoint with such checkpoint_id wasn't found
        """

        if not checkpoint_id:
            return HttpResponse(status=400)
        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint_object:
            return HttpResponse(status=404)
        data = json.loads(request.body.decode('utf-8'))
        checkpoint_object.update(**data)
        return JsonResponse(checkpoint_object.to_dict(), status=200)

    def delete(self, request, checkpoint_id, trip_id):
        """
        Handles delete request
        Returns 200 if checkpoint has been deleted
        Returns 400 if checkpoint id hasn't been passed
        Returns 404 if checkpoint with such checkpoint_id wasn't found
        """
        if not checkpoint_id:
            return HttpResponse(status=400)
        result = Checkpoint.delete_by_id(checkpoint_id)
        if not result:
            return HttpResponse(status=404)
        return HttpResponse(status=200)
