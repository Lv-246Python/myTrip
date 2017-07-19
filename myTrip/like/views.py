"""This module contains Class Based View for like application."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from .models import LikesCheckpoint, LikesComment, LikesPhoto, LikesTrip


class LikesTripView(View):
    """LikesTripView view handles GET, POST, DELETE requests for LikesTrip model."""

    def get(self, request, like_id=None, trip_id=None):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 204.
        """
        if not like_id:
            likes = LikesTrip.get_by_trip_id(trip_id)
            if not likes:
                return HttpResponse(status=204)
            data = [like.to_dict() for like in likes]
            return JsonResponse(data, status=200, safe=False)

        like = LikesTrip.get_by_id(like_id)
        if not like:
            return HttpResponse(status=204)
        return JsonResponse(like.to_dict(), status=200)

    def post(self, request):
        """Handles POST request, that return JSON response with HTTP status 201."""
        like_data = json.loads(request.body.decode('utf-8'))
        like = LikesTrip.create(**like_data)
        return JsonResponse(like.to_dict(), status=201)

    def delete(self, like_id):
        """
        Handles DELETE request, that return HTTP status 204,
        if exception: HTTP status 404.
        """
        like = LikesTrip.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like.delete()
        return HttpResponse(status=204)


class LikesCheckpointView(View):
    """LikesCheckpointView view handles GET, POST, DELETE requests for LikesCheckpoint model."""

    def get(self, request, like_id=None, checkpoint_id=None):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 204.
        """
        if not like_id:
            likes = LikesCheckpoint.get_by_checkpoint_id(checkpoint_id)
            if not likes:
                return HttpResponse(status=204)
            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200, safe=False)

        like = LikesCheckpoint.get_by_id(like_id)
        if not like:
            return HttpResponse(status=204)
        like = like.to_dict()
        return JsonResponse(like, status=200)

    def post(self, request):
        """Handles POST request, that return JSON response with HTTP status 201."""
        like_data = json.loads(request.body.decode('utf-8'))
        like = LikesCheckpoint.create(**like_data)
        return JsonResponse(like.to_dict(), status=201)

    def delete(self, like_id):
        """
        Handles DELETE request, that return HTTP status 204,
        if exception: HTTP status 404.
        """
        like = LikesCheckpoint.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like.delete()
        return HttpResponse(status=204)


class LikesPhotoView(View):
    """LikesPhotoView view handles GET, POST, DELETE requests for LikesPhoto model."""

    def get(self, request, like_id=None, photo_id=None):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 404.
        """
        if like_id:
            like = LikesPhoto.get_by_id(like_id)
            if not like:
                return HttpResponse(status=404)
            like_dict = like.to_dict()
            return JsonResponse(like_dict, status=200)
        likes = LikesPhoto.get_by_photo_id(photo_id)
        like_list = [like.to_dict() for like in likes]
        return JsonResponse(like_list, status=200, safe=False)

    def post(self, request):
        """Handles POST request, that return JSON response with HTTP status 201."""
        like_data = json.loads(request.body.decode('utf-8'))
        like = LikesPhoto.create(**like_data)
        return JsonResponse(like.to_dict(), status=201)

    def delete(self, like_id):
        """
        Handles DELETE request, that return HTTP status 204,
        if exception: HTTP status 404.
        """
        like = LikesPhoto.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like.delete()
        return HttpResponse(status=204)


class LikesCommentView(View):
    """LikesCommentView view handles GET, POST, DELETE requests for LikesComment model."""

    def get(self, request, like_id=None, comment_id=None):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 404.
        """
        if not like_id:
            likes = LikesPhoto.get_by_photo_id(comment_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200, safe=False)

        like = LikesComment.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like = like.to_dict()
        return JsonResponse(like, status=200)

    def post(self, request):
        """Handles POST request, that return JSON response with HTTP status 201."""
        like_data = json.loads(request.body.decode('utf-8'))
        like = LikesComment.create(**like_data)
        return JsonResponse(like.to_dict(), status=201)

    def delete(self, like_id):
        """
        Handles DELETE request, that return HTTP status 204,
        if exception: HTTP status 404.
        """
        like = LikesComment.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like.delete()
        return HttpResponse(status=204)
