# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-08 11:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0004_auto_20170726_1038'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='checkpoint',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='checkpoint.Checkpoint'),
        ),
    ]
