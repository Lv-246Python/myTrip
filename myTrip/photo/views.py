"""Module generate view for photo requests."""
import json
from django.views.generic.base import View
from django.http import JsonResponse, HttpResponse
from .models import Photo

class PhotoView(View):
    """Class that handle HTTP requests."""

    def get(self, request, photo_id):
        """GET request handler."""
        photo = Photo.get_by_id(photo_id)
        if not photo:
            return HttpResponse(status=404)
        photo = photo.to_dict()
        return JsonResponse(photo, status=200, safe=False)

    def post(self, request):
        """POST request hangler."""
        post_data = json.loads(request.body.decode('utf-8'))
        photo = Photo()
        photo.create(**post_data)
        return HttpResponse(status=200)

    def put(self, request, photo_id):
        """PUT request hangler."""
        photo = Photo.get_by_id(photo_id)
        if not photo:
            return HttpResponse(status=404)
        update_data = json.loads(request.body.decode('utf-8'))
        photo.update(**update_data)
        return HttpResponse(status=200)

    def delete(self, request, photo_id):
        """DELETE request handler."""
        photo = Photo.get_by_id(photo_id)
        photo.delete()
        return HttpResponse(status=200)
