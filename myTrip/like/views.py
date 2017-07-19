"""This module contains Class Based View for like application."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from .models import LikesCheckpoint, LikesComment, LikesPhoto, LikesTrip


class LikesTripView(View):
    """Likes view handles GET, POST, DELETE requests for LikesTrip model."""

    def get(self, request, like_id, trip_id):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 404.
        """
        if trip_id:
            likes = LikesTrip.get_by_trip_id(trip_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200)

        like = LikesTrip.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like = like.to_dict()
        return JsonResponse(like, status=200)

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
    """Likes view handles GET, POST, DELETE requests for LikesCheckpoint model."""

    def get(self, request, like_id, checkpoint_id):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 404.
        """
        if checkpoint_id:
            likes = LikesCheckpoint.get_by_checkpoint_id(checkpoint_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200)

        like = LikesCheckpoint.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
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
    """Likes view handles GET, POST, DELETE requests for LikesPhoto model."""

    def get(self, request, like_id, photo_id):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 404.
        """
        if photo_id:
            likes = LikesPhoto.get_by_photo_id(photo_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200)

        like = LikesPhoto.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like = like.to_dict()
        return JsonResponse(like, status=200)

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
    """Likes view handles GET, POST, DELETE requests for LikesComment model."""

    def get(self, request, like_id, comment_id):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 404.
        """
        if comment_id:
            likes = LikesPhoto.get_by_photo_id(comment_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200)

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
