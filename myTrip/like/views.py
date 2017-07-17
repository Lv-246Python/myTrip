"""This module contains Class Based View for like application."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from .models import Like


class LikeView(View):
    """Likes view handles GET, POST, DELETE requests."""

    def get(self, request, like_id, trip_id=None, checkpoint_id=None, photo_id=None, comment_id=None):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 404.
        """
        if trip_id:
            likes = Like.get_by_comment_id(comment_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200)

        if checkpoint_id:
            likes = Like.get_by_photo_id(photo_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200)

        if photo_id:
            likes = Like.get_by_checkpoint_id(checkpoint_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200)

        if comment_id:
            likes = Like.get_by_trip_id(trip_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200)

        like = Like.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like = like.to_dict()
        return JsonResponse(like, status=200)

    def post(self, request, trip_id=None, checkpoint_id=None, photo_id=None, comment_id=None):
        """Handles POST request, that return JSON response with HTTP status 201."""
        like_data = json.loads(request.body.decode('utf-8'))
        like = Like.create(**like_data)
        return JsonResponse(like.to_dict(), status=201)

    def delete(self, request, like_id):
        """
        Handles DELETE request, that return HTTP status 204,
        if exception: HTTP status 404.
        """
        like = Like.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like.delete()
        return HttpResponse(status=204)
