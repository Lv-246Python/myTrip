"""This module contains help model class and basic functions."""

from django.db import models


class Help(models.Model):
    subject = models.CharField(max_length=20)
    message = models.TextField()
    email_to = models.EmailField(blank=False)
    response_message = models.TextField(blank=True)
    is_static_answer = models.BooleanField(blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True, editable=True)

    @staticmethod
    def create(subject, message, email_to, is_static_answer):
        help = Help()

        help.subject = subject
        help.message = message
        help.email_to = email_to
        if is_static_answer:
            help.is_static_answer = is_static_answer

        help.save()

    def update(self, subject, message, email_to, is_static_answer):
        if subject:
            self.subject = subject
        if message:
            self.message = message
        if email_to:
            self.email_to = email_to
        if is_static_answer:
            self.is_static_answer = is_static_answer

        self.save()

    @staticmethod
    def filter():
        helps = Help.objects.filter(is_static_answer=True)
        return helps

    def to_dict(self):
        return {
            'id': self.id,
            'message': self.message,
            'email_to': self.email_to,
            'response_message': self.response_message,
            'private': self.is_static_answer,
            'create_at': self.create_at,
            'update_at': self.update_at
        }

    def __repr__(self):
        return """id: {}, message: {}, email_to: {}, response_message: {}, private: {}, 
        create_at: {}, update_at: {}""".format(self.id, self.message, self.email_to,
                                               self.response_message, self.static, self.create_at,
                                               self.update_at)
