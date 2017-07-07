""" This checkpoint module generates view for CRUD requests"""

import json
from django.http import JsonResponse, HttpResponse
from django.views.generic import View
from .models import  Checkpoint


class CheckpointView(View):
    """ checkpoint view handle GET, POST, PUT, DELETE requests """

    def get(self, request, checkpoint_id):
        """ Handles get request"""
        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint_object:
            return HttpResponse(status=404)
        result = checkpoint_object.to_dict()
        return JsonResponse(result, status=200)

    def post(self, request):
        """ Handles post request"""
        data = json.loads(request.body.decode('utf-8'))
        if not Checkpoint.post(data):
            return HttpResponse(status=400)
        return HttpResponse(status=200)

    def put(self, request, checkpoint_id):
        """Handles put request"""
        if not checkpoint_id:
            return HttpResponse(status=400)
        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint_object:
            return HttpResponse(status=400)
        data = json.loads(request.body.decode('utf-8'))
        result = checkpoint_object.put(data)
        if not result:
            return HttpResponse(status=400)
        return HttpResponse(status=200)

    def delete(self, request, checkpoint_id):
        """ Handles delete request"""
        if not checkpoint_id:
            return HttpResponse(status=400)
        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint_object:
            return HttpResponse(status=400)
        result = checkpoint_object.delete_checkpoint()
        if not result:
            return HttpResponse(status=500)
        return HttpResponse(status=200)
