"""This module contains function to provide email sending."""
from django.core.mail import send_mail

import mytrip.email_info as mail_settings

FROM = mail_settings.EMAIL_HOST_USER
PASSWORD_FROM = mail_settings.EMAIL_HOST_PASSWORD
PORT = mail_settings.EMAIL_PORT
HOST = mail_settings.EMAIL_HOST


def email_sender(subject, message, to=FROM):
    """Calls Django send_mail function with passed properties from email_info."""
    send_mail(subject, message, FROM, [to])


def message_format(to, subject, message):
    """Template for admin's emailing."""
    return "This user {}\n Sent you email with this subject: {}\nEmail body:\n{}".format(
        to, subject, message)
