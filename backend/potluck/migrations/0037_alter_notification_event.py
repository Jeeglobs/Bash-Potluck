# Generated by Django 4.2 on 2023-04-28 21:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('potluck', '0036_notification_event_notification_invitation_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='event',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='potluck.event'),
        ),
    ]
