# Generated by Django 4.2 on 2023-04-27 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('potluck', '0026_event_end_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='tip_jar',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
