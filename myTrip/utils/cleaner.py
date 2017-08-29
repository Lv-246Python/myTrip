""" Deletes all not activa"""

import datetime
import time
import os
import sys

import django

PROJECT_PATH = os.path.abspath('../')
sys.path.append(PROJECT_PATH)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mytrip.settings")
django.setup()

from registration.models import CustomUser # pylint: disable=wrong-import-position


# From now onwards start your script..

reload = 60*15

dt = datetime.datetime.now() - datetime.timedelta(minutes=15)
users = CustomUser.objects.filter(is_active=False).filter(create_at__lte=dt)
while True:
    for user in users:
        print(user)
        user.delete()
    time.sleep(reload)
