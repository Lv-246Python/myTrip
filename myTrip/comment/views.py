"""This module contains Class Based View for comment application."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from .models import Comment


class CommentView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, comment_id=None, trip_id=None, checkpoint_id=None, photo_id=None):
        """Handles GET request.
        Args:
            comment_id(int): comment id.
            trip_id(int): trip id,
            checkpoint_id(int): checkpoint id,
            photo_id(int): photo id.
        Returns:
            JsonResponse: response: <comment>
            or
            HttpResponse: status: 404.
        """

        if trip_id and checkpoint_id and photo_id:
            comments = Comment.get_by_photo_id(photo_id)
            if not comments:
                return HttpResponse(status=404)
            comments = [comment.to_dict() for comment in comments]
            return JsonResponse(comments, status=200, safe=False)

        if trip_id and checkpoint_id:
            comments = Comment.get_by_checkpoint_id(checkpoint_id)
            if not comments:
                return HttpResponse(status=404)
            comments = [comment.to_dict() for comment in comments]
            return JsonResponse(comments, status=200, safe=False)

        if trip_id and photo_id:
            comments = Comment.get_by_photo_id(photo_id)
            if not comments:
                return HttpResponse(status=404)
            comments = [comment.to_dict() for comment in comments]
            return JsonResponse(comments, status=200, safe=False)

        if trip_id:
            comments = Comment.get_by_trip_id(trip_id)
            if not comments:
                return HttpResponse(status=404)
            comments = [comment.to_dict() for comment in comments]
            return JsonResponse(comments, status=200, safe=False)

        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        return JsonResponse(comment.to_dict(), status=200, safe=False)

    def post(self, request):
        """Handles POST request.
        Creates new comment from request in database.
        In response returns created comment or HttpResponse 404 if comment was not created.
        Returns:
            JsonResponse: response: <comment>
            or
            HttpResponse: status: 404.
        """
        comment_data = json.loads(request.body.decode('utf-8'))
        if not comment_data:
            return HttpResponse(status=404)
        comment = Comment.create(**comment_data)
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
        comment.update(**update_data)
        return JsonResponse(comment.to_dict(), status=200)

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
