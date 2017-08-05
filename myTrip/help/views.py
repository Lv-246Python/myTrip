import json

from django.http import JsonResponse
from django.views.generic.base import View

from utils.mailer import email_sender
from help.models import Help

RESPONSE_MESSAGE = {
    'response_message': 'success!'
}
QUERYSET_HELP = []


class EmailSendView(View):

    def get(self, request):
        helps = Help.filter()
        helps = [help.to_dict() for help in helps]
        return JsonResponse(helps, status=200, safe=False)

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        subject = str(data.get('subject'))
        message = str(data.get('message'))
        to = str(data.get('to'))
        is_static_answer = str(data.get('is_static_answer'))

        help = Help()
        help.create(subject=subject, message=message, email_to=to, is_static_answer=is_static_answer)

        #email_sender(subject=subject, message=message, to=to)

        return JsonResponse(RESPONSE_MESSAGE, status=201)
