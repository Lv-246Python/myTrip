# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-31 10:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trip', '0004_auto_20170831_0914'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='trip',
            name='src',
            field=models.URLField(default='http://www.highviewart.com/uploads/cache/645x0x0/articles/2537/1_1417030880.jpg'),
        ),
        migrations.AlterField(
            model_name='trip',
            name='status',
            field=models.IntegerField(),
        ),
    ]