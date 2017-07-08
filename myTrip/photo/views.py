import json
from django.views.generic.base import View
from .models import Photo
from django.http import JsonResponse, HttpResponse


class PhotoView(View):

    def get(self, request, photo_id):
        if not photo_id:
            return HttpResponse(status=404)
        photo = Photo.objects.get(photo_id)
        photo = Photo.to_dict()
        return JsonResponse(photo, status=200)

    def post(self, request):
        post_data = json.loads(request.body.decode('utf-8'))
        photo = Photo()
        photo.create(**post_data)
        return HttpResponse(status=200)

    def put(self, request, photo_id):
        photo = Photo.get_by_id(photo_id)
        if not comment:
            return HttpResponse(status=404)
        update_data = json.loads(request.body.decode('utf-8'))
        photo.update(**update_data)
        return HttpResponse(status=200)

    def delete(self,photo_id):
        photo = Photo.get_by_id(photo_id)
        photo.delete()
        return HttpResponse(status=200)

