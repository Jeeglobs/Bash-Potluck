# Generated by Django 4.2 on 2023-04-24 23:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('potluck', '0012_alter_event_options_user_dietary_restrictions_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='dietary_restrictions',
        ),
    ]