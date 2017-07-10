""" This checkpoint module generates view for CRUD requests"""

import json
from django.http import JsonResponse, HttpResponse
from django.views.generic import View
from .models import  Checkpoint


class CheckpointView(View):
    """ checkpoint view handle GET, POST, PUT, DELETE requests """

    def get(self, request, checkpoint_id):
        """
        Handles get request
        Return json and status 200 with new object if operation was successful
        Return status 404 if checkpoint with such checkpoint_id wasn't found
        """
        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint_object:
            return HttpResponse(status=404)
        result = checkpoint_object.to_dict()
        return JsonResponse(result, status=200)

    def post(self, request):
        """
         Handles post request
         Create new object and returns status  200 if all was successful
         Returns status 409 if creation doesn't occur
         """
        data = json.loads(request.body.decode('utf-8'))
        if not Checkpoint.create(data):
            return HttpResponse(status=409)
        return HttpResponse(status=200)

    def put(self, request, checkpoint_id):
        """
        Handles put request
        Return status 200 if checkpoint has been successful updated
        Return status 400 if checkpoint_id wasn't passed
        Return status 404 if checkpoint with such checkpoint_id wasn't found
        Return status 200 if checkpoint wasn't updated
        """
        if not checkpoint_id:
            return HttpResponse(status=400)
        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint_object:
            return HttpResponse(status=404)
        data = json.loads(request.body.decode('utf-8'))
        result = checkpoint_object.update(data)
        if not result:
            return HttpResponse(status=204)
        return HttpResponse(status=200)

    def delete(self, request, checkpoint_id):
        """
        Handles delete request
        Returns 200 if checkpoint has been deleted
        Returns 400 if checkpoint id hasn't been passed
        Returns 404 if checkpoint with such checkpoint_id wasn't found
        Returns 500 if checkpoint wasn't deleted for some reasons
        """
        if not checkpoint_id:
            return HttpResponse(status=400)
        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint_object:
            return HttpResponse(status=404)
        result = checkpoint_object.delete_checkpoint()
        if not result:
            return HttpResponse(status=500)
        return HttpResponse(status=200)
