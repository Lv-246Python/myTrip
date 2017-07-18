# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-17 14:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('photo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='photo',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='photo',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='checkpoint',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='checkpoint.Checkpoint'),
        ),
    ]