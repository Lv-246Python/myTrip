import json

from django.core.mail import send_mail
from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

EMAIL_HOST_USER = 'morfeos7887@gmail.com'
SUCCESS_MESSAGE = 'Your message were send. Thanks!'
FAIL_MESSAGE = 'Something went wrong...'
USER_MAIL = 'zherebukh.yurii@gmail.com'

class EmailSendView(View):
    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        if not data:
            return HttpResponse(status=400)
        subject = data.get('subject')
        message = data.get('message')
        #user_email = data.get('user_email')
        send_mail('Test', 'Test', 'yura7887@gmail.com', ['morfeos7887@gmail.com'], fail_silently=False)
        return JsonResponse(json.dumps(SUCCESS_MESSAGE), status=200)
