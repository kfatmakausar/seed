from __future__ import absolute_import
from __future__ import unicode_literals
from .job_application import JobApplication

from django.db import models
    
class PermitIssuance(models.Model):
    id = models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)
    bin_num = models.IntegerField(null=False, blank=False)
    job_number = models.ForeignKey(JobApplication, on_delete=models.CASCADE)
    work_type = models.CharField(null=True, blank=True, max_length=200)
    permit_status = models.CharField(null=True, blank=True, max_length=200)
    permit_subtype = models.CharField(null=True, blank=True, max_length=200)