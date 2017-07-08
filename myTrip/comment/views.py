"""This module contains Class Based View for comment application."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from .models import Comment


class CommentView(View):
    """Comments view handles GET, POST, PUT, DELETE requests."""

    def get(self, request, comment_id):
        """Handles GET request"""
        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        comment = comment.to_dict()
        return JsonResponse(comment, status=200)

    def put(self, request, comment_id):
        """Handles PUT request."""
        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        update_data = json.loads(request.body.decode('utf-8'))
        comment.update(**update_data)
        return JsonResponse(comment.to_dict(), status=200)

    def post(self, request):
        """Handles POST request."""
        comment_data = json.loads(request.body.decode('utf-8'))
        if not comment_data:
            return HttpResponse(status=404)
        comment = Comment()
        comment.create(**comment_data)
        return JsonResponse(comment.to_dict(), status=200)

    def delete(self, request, comment_id):
        """Handles DELETE request."""
        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        comment.delete()
        return HttpResponse(status=200)
