# Generated by Django 2.2.13 on 2021-01-26 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orgs', '0014_organization_geocoding_enabled'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='property_display_field',
            field=models.CharField(default='address_line_1', max_length=32),
        ),
    ]
