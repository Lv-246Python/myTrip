"""Module generate view for photo requests."""

import json
from django.views.generic.base import View
from django.http import JsonResponse, HttpResponse
from .models import Photo


class PhotoView(View):
    """Class that handle HTTP requests."""

    def get(self, request, photo_id):
        """GET request handler.Get photo by photo_id"""
        photo = Photo.get_by_id(photo_id)
        if not photo:
            return HttpResponse(status=404)
        photo = photo.to_dict()
        return JsonResponse(photo, status=200, safe=False)

    def post(self, request):
        """POST request hangler.Creating a new photo object"""
        post_data = json.loads(request.body.decode('utf-8'))
        photo = Photo()
        photo.create(**post_data)
        return HttpResponse(status=201)

    def put(self, request, photo_id):  # pylint: disable=no-self-use
        """PUT request hangler. If photo object found by id, try to update photo."""
        photo = Photo.get_by_id(photo_id)
        if not photo:
            return HttpResponse(status=404)
        update_data = json.loads(request.body.decode('utf-8'))
        photo.update(**update_data)
        return HttpResponse(status=200)

    def delete(self, request, photo_id):  # pylint: disable=unused-argument,no-self-use
        """DELETE request handler.If photo were found by id, try to delete photo."""
        photo = Photo.get_by_id(photo_id)
        if not photo:
            return HttpResponse(status=404)
        photo.delete()
        return HttpResponse(status=200)
