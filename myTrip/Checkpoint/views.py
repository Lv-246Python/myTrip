from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.generic import View
from .models import  Checkpoint
import json

class CheckpointView(View):
    """ Checkpoint view handle GET, POST, PUT, DELETE requests """

    def get(self, request, checkpoint_id = None):
        if not checkpoint_id:
            checkpoint_objects = Checkpoint.get_all()
            result = [check.to_dict() for check in checkpoint_objects]
            return JsonResponse(result, safe=False, status=200)

        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if checkpoint_object:
            result = checkpoint_object.to_dict()
            return JsonResponse(result, safe=False, status=200)
        return HttpResponse(status=404)

    def post(self,request):
        data = json.loads(request.body.decode('utf-8'))
        if not Checkpoint.post(data):
            return HttpResponse(status=400)
        return HttpResponse(status=200)

    def put(self, request,checkpoint_id):
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
        if not checkpoint_id:
            return HttpResponse(status=400)
        checkpoint_object = Checkpoint.get_by_id(checkpoint_id)
        if not checkpoint_object:
            return HttpResponse(status=400)
        result = checkpoint_object.delete_checkpoint()
        if not result:
            return HttpResponse(status=500)
        return HttpResponse(status=200)