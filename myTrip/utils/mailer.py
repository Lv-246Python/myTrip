from django.core.mail import send_mail

import mytrip.local_settings as mail_settings

FROM = mail_settings.EMAIL_HOST_USER
PASSWORD_FROM = mail_settings.EMAIL_HOST_PASSWORD
PORT = mail_settings.EMAIL_PORT
HOST = mail_settings.EMAIL_HOST


def email_sender(subject, message, to=FROM):
    send_mail(subject, message, FROM, to)
