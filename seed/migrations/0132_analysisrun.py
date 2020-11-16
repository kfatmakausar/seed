# Generated by Django 2.2.13 on 2020-11-10 04:03

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('seed', '0131_analysis'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnalysisRun',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('output_json', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=dict)),
                ('status', models.IntegerField(choices=[(10, 'Creating'), (20, 'Ready'), (30, 'Queued'), (40, 'Running'), (50, 'Failed'), (60, 'Stopped'), (70, 'Completed')])),
                ('analysis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='seed.Analysis')),
                ('cycle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='seed.Cycle')),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='seed.Property')),
                ('property_state', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='seed.PropertyState')),
            ],
        ),
    ]
