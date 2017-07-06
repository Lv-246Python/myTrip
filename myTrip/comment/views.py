import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from .models import Comment


class CommentView(View):
    def get(self, request, comment_id=None):
        if not comment_id:
            comments = Comment.get_all()
            print(comments)
            comments = [comment.to_dict() for comment in comments]
            print('comments = []', type(comments))
            return JsonResponse(comments, status=200, safe=False)
        else:
            print(comment_id)
            comment = Comment.get_by_id(comment_id)
            if comment is None:
                print('No such comment_id:', comment_id)
                return HttpResponse(status=404)
            print('comment', comment)
            comment = comment.to_dict()
            return JsonResponse(comment, status=200)

    def put(self, request, comment_id):
        print(request.method)
        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        update_data = json.loads(request.body.decode('utf-8'))
        comment.update(**update_data)
        return JsonResponse(comment.to_dict(), status=200)

    def post(self, request):
        print(request.body)
        comment_data = json.loads(request.body.decode('utf-8'))
        print('REQUEST', comment_data)
        comment = Comment()
        comment.create(**comment_data)
        return JsonResponse(comment.to_dict(), status=200)

    def delete(self, request, comment_id):
        print(comment_id)
        comment = Comment.get_by_id(comment_id)
        if not comment:
            return HttpResponse(status=404)
        comment.delete()
        return HttpResponse(status=200)  # redirects to
