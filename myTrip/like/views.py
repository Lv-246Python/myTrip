"""This module contains Class Based View for like application."""

import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from checkpoint.models import Checkpoint
from comment.models import Comment
from registration.models import CustomUser
from photo.models import Photo
from trip.models import Trip
from .models import Like


class LikeView(View):
    """LikeView view handles GET, POST, DELETE requests for LikeView model."""

    def get(self, request, trip_id, checkpoint_id=None, photo_id=None, comment_id=None, like_id=None):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 404.
        """
        if not like_id:
            likes = Like.filter(trip_id, checkpoint_id, photo_id, comment_id)
            if not likes:
                return HttpResponse(status=404)

            likes = [like.to_dict() for like in likes]
            return JsonResponse(likes, status=200, safe=False)

        like = Like.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like = like.to_dict()
        return JsonResponse(like, status=200)

    def post(self, request, trip_id, checkpoint_id=None, photo_id=None, comment_id=None):
        """Handles POST request, that return JSON response with HTTP status 201."""
        data = json.loads(request.body.decode('utf-8'))
        if not data:
            return HttpResponse(status=404)
        user = CustomUser.get_by_id(data['user'])
        checkpoint = Checkpoint.get_by_id(checkpoint_id)
        trip = Trip.get_by_id(trip_id)
        photo = Photo.get_by_id(photo_id)
        comment = Comment.get_by_id(comment_id)
        like = Like.create(checkpoint=checkpoint, trip=trip, photo=photo, user=user, comment=comment)
        print(like.to_dict())
        return JsonResponse(like.to_dict(), status=201)

    def delete(self, like_id):
        """
        Handles DELETE request, that return HTTP status 204,
        if exception: HTTP status 404.
        """
        like = Like.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like.delete()
        return HttpResponse(status=204)
