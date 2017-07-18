"""Module generate view for photo requests."""

import json
from django.views.generic.base import View
from django.http import JsonResponse, HttpResponse
from .models import Photo
from registration.models import CustomUser


class PhotoView(View):
    """Class that handle HTTP requests."""

    def get(self, request, trip_id=None, checkpoint_id=None):
        """GET request handler. Can return photo/photos ordered by given args."""
        if trip_id and checkpoint_id:
            photos = Photo.get_by_trip_id_and_checkpoint_id(trip_id, checkpoint_id)
            data = [photo.to_dict() for photo in photos]
            return JsonResponse(data, status=200, safe=False)
        if trip_id:
            photos = Photo.get_by_trip_id(trip_id)
            data = [photo.to_dict() for photo in photos]
            return JsonResponse(data, status=200, safe=False)

    def post(self, request, trip_id=None, checkpoint_id=None):
        """POST request hangler.Creating a new photo object and return status 201("created")"""
        post_data = json.loads(request.body.decode('utf-8'))
        if trip_id and checkpoint_id:
            photo = Photo.create(trip_id=trip_id, checkpoint_id=checkpoint_id, **post_data)
            data = photo.to_dict()
            return JsonResponse(data, status=201)
        photo = Photo.create(trip_id=trip_id, **post_data)
        data = photo.to_dict()
        return JsonResponse(data, status=201)

    def put(self, request, trip_id=None, checkpoint_id=None, photo_id=None):  # pylint: disable=no-self-use
        """PUT request hangler. If photo object found by id, try to update photo."""
        update_data = json.loads(request.body.decode('utf-8'))
        photo = Photo.get_by_id(photo_id, update_data["user_id"])
        if not photo:
            return HttpResponse(status=404)
        photo.update(**update_data)
        data = photo.to_dict()
        return JsonResponse(data, status=200)

    def delete(self, request, trip_id=None, checkpoint_id=None, photo_id=None):  # pylint: disable=unused-argument,no-self-use
        """DELETE request handler.If photo were found by id, try to delete photo."""
        data = json.loads(request.body.decode('utf-8'))
        photo = Photo.get_by_id(photo_id, data["user_id"])
        if not photo:
            return  HttpResponse(status=404)
        photo.delete()
        return HttpResponse(status=200)
