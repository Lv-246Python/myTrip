"""This module contains Class Based View for comment application."""
import json

from django.http import JsonResponse, HttpResponse
from django.views.generic.base import View

from help.models import Help
from utils.mailer import email_sender, message_format

RESPONSE_MESSAGE = 'Your message was successfully sent'
FEEDBACK_SUBJECT = 'Feedback'


class EmailSendView(View):
    """Helps view, handles GET and POST requests."""

    def get(self, request):
        """Handles GET request.
        Calls filter_with_step() method of Help model and returns QuerySet of last 20 converted
        to dictionary objects with status 200. Or returns None with status 200
        Help objects.
         Returns:
            JsonResponse: response: <Help>.
        """
        helps = Help.filter_with_step()
        helps = [help_obj.to_dict() for help_obj in helps]
        return JsonResponse(helps, status=200, safe=False)

    def post(self, request):
        """
        Handles POST request.
        Creates new Help object from request in database.
        In response returns created Help object or HttpResponse 400 if comment was not created.
        Returns:
            JsonResponse: response: <Help>
            or
            HttpResponse: status: 400.
        """
        data = json.loads(request.body.decode('utf-8'))
        if not data:
            return HttpResponse(status=400)
        subject = data.get('subject')
        message = data.get('message')
        to = data.get('to')

        help_obj = Help()
        help_obj.create(subject=subject, message=message, email_to=to)

        email_sender(subject=FEEDBACK_SUBJECT, message=message_format(
            to=to, subject=subject, message=message))

        return HttpResponse(RESPONSE_MESSAGE, status=201)
