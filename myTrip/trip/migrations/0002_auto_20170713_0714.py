# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-13 07:14
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trip',
            old_name='user_id',
            new_name='user',
        ),
    ]