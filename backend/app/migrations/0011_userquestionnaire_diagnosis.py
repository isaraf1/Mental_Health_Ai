# Generated by Django 5.1 on 2024-09-06 00:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_userquestionnaire_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='userquestionnaire',
            name='diagnosis',
            field=models.CharField(default='', max_length=1000),
            preserve_default=False,
        ),
    ]
