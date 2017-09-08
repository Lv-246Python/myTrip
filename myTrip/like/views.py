"""This module contains Class Based View for like application."""

from django.http import HttpResponse, JsonResponse
from django.views.generic.base import View

from checkpoint.models import Checkpoint
from comment.models import Comment
from registration.models import CustomUser
from photo.models import Photo
from trip.models import Trip
from .models import Like


class LikeView(View):
    """LikeView view handles GET and POST requests for LikeView model."""

    def get(self, request, trip_id, checkpoint_id=None,
            photo_id=None, comment_id=None, like_id=None):
        """
        Handles GET request, that return JSON response with HTTP status 200,
        if exception: HTTP status 204.
        """
        if not like_id:
            likes = Like.filter(trip_id, checkpoint_id, photo_id, comment_id)
            if not likes:
                return HttpResponse(status=204)
            likes = [like.to_dict() for like in likes]
            liked = False
            if Like.filter_by_user(request.user.id, trip_id, checkpoint_id, photo_id, comment_id):
                liked = True
            data = dict()
            data['likes'] = likes
            data['count'] = len(likes)
            data['liked'] = liked
            return JsonResponse(data, status=200, safe=False)

        like = Like.get_by_id(like_id)
        data = like.to_dict()
        return JsonResponse(data, status=200, safe=False)

    def post(self, request, trip_id=None, checkpoint_id=None, photo_id=None, comment_id=None):
        """
        Handles POST request, that return HTTP response with status 201, if like create,
        return HTTP response with status 200, if like delete,
        return HTTP response with status 401, if user not logged.
        """
        user = CustomUser.get_by_id(request.user.id)
        if user is None:
            return HttpResponse('Please, login.', status=401)

        trip = Trip.get_by_id(trip_id)
        checkpoint = Checkpoint.get_by_id(checkpoint_id)
        photo = Photo.get_by_id(photo_id)
        comment = Comment.get_by_id(comment_id)

        like = Like.filter_by_user(user, trip, checkpoint, photo, comment)
        if like:
            like.delete()
            return HttpResponse(status=200)

        like = Like.create(user=user, trip=trip, checkpoint=checkpoint,
                           photo=photo, comment=comment)
        data = like.to_dict()
        return JsonResponse(data, status=201)
