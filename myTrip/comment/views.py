"""This module contains Class Based View for comment application."""

import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from checkpoint.models import Checkpoint
from photo.models import Photo
from registration.models import CustomUser
from trip.models import Trip
from .models import Comment


class CommentView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, comment_id=None, trip_id=None, checkpoint_id=None, photo_id=None):
        """Handles GET request.
        Takes as request id's of: trip, checkpoint, photo or comment. Calls necessary method to get
        QuerySet of comments from foreign key id's(trip,checkpoint,photo) or gets one specific
        comment from comment id and returns it.
        Checks if QuerySet or Comment object exists.
        Returns serialized QuerySet or Comment object to JSON with status 200,
        or returns status 404, when else statement works.
        Args:
            comment_id(int): comment id,
            trip_id(int): trip id,
            checkpoint_id(int): checkpoint id,
            photo_id(int): photo id.
        Returns:
            JsonResponse: response: <comment>
            or
            HttpResponse: status: 404.
        """
        if not comment_id:
            comments = Comment.filter(trip_id, checkpoint_id, photo_id)
            if not comments:
                return HttpResponse(status=404)
            comments = [comment.to_dict() for comment in comments]
            return JsonResponse(comments, status=200, safe=False)

        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        return JsonResponse(comment.to_dict(), status=200, safe=False)

    def post(self, request, trip_id=None, checkpoint_id=None, photo_id=None):
        """Handles POST request.
        Creates new comment from request in database.
        In response returns created comment or HttpResponse 404 if comment was not created.
        Returns:
            JsonResponse: response: <comment>
            or
            HttpResponse: status: 404.
        """
        message = json.loads(request.body.decode('utf-8'))['message']
        user_id = json.loads(request.body.decode('utf-8'))['user_id']
        if not message:
            return HttpResponse(status=400)
        user = CustomUser.get_by_id(user_id)
        trip = Trip.get_by_id(trip_id)
        checkpoint = Checkpoint.get_by_id(checkpoint_id)
        photo = Photo.get_by_id(photo_id)
        data = {
            'user': user,
            'trip': trip,
            'checkpoint': checkpoint,
            'photo': photo,
            'message': message

        }
        comment = Comment.create(**data)
        data = comment.to_dict()
        return JsonResponse(data, status=201)

    def put(self, request, comment_id):
        """Handles PUT request.
        Get comment data from PUT request and update comment from request profile in database.
        In response returns updated comment or HttpResponse 404 if comment was not found.
        Args:
            comment_id(int): comment id.
        Returns:
            JsonResponse: response: <comment>
            or
            HttpResponse: status: 404
        """
        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        update_data = json.loads(request.body.decode('utf-8'))
        user_id = update_data['user_id']
        if comment.user.id is user_id:
            comment.update(update_data['message'])
            return JsonResponse(comment.to_dict(), status=200)

        return HttpResponse(status=403)

    def delete(self, request, comment_id):
        """Handles DELETE request.
        Deletes comment from given comment id.
        In response returns HttpStatus 204 or HttpResponse 404 if comment was not found.
        Returns:
            HttpResponse: status: 204
            or
            HttpResponse: status: 404.
        """
        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        comment.delete()
        return HttpResponse(status=204)
