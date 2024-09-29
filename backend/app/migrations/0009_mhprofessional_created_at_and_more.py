# Generated by Django 5.1 on 2024-09-05 22:21

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_mhprofessional'),
    ]

    operations = [
        migrations.AddField(
            model_name='mhprofessional',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='mhprofessional',
            name='language2',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='mhprofessional',
            name='language3',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
