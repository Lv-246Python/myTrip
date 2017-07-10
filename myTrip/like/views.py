"""This module contains Class Based View for like application."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from .models import Like


class LikeView(View):
    """Likes view handles GET, POST, DELETE requests."""

    def get(self, request, like_id):
        """Handles GET request."""
        like = Like.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like = like.to_dict()
        return JsonResponse(like, status=200)

    def post(self, request):
        """Handles POST request."""
        like_data = json.loads(request.body.decode('utf-8'))
        like = Like.create(**like_data)
        return JsonResponse(like.to_dict(), status=200)

    def delete(self, request, like_id):
        """Handles DELETE request."""
        like = Like.get_by_id(like_id)
        if not like:
            return HttpResponse(status=404)
        like.delete()
        return HttpResponse(status=200)
