# Generated by Django 4.0.3 on 2022-05-13 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0007_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='likes',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
