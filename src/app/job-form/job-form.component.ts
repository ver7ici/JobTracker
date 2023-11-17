import { Component, Input } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatNumber, formatDate } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent {
  @Input() jobId: number | undefined;
  job: Job | undefined;

  formOptions = {
    statuses: [] as string[],
    workTypes: [] as string[]
  };

  jobForm = this.fb.group({
    company: ['', Validators.required],
    title: ['', Validators.required],
    link: [''],
    country: ['CA', Validators.required],
    province: ['ON'],
    city: [''],
    type: ['', Validators.required],
    status: ['', Validators.required],
    year: [1970, Validators.required],
    month: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
    day: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
    description: [''],
    comment: ['']
  });

  constructor(private service: JobService, private router: Router, private fb: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    if (this.jobId) {
      this.job = await firstValueFrom(this.service.getJobById(this.jobId));
    }
    await this.initForm();
  }

  async initForm(): Promise<void> {
    const formOptions = await firstValueFrom(this.service.getFormOptions());
    formOptions.statuses.forEach(s => this.formOptions.statuses.push(s.name));
    formOptions.workTypes.forEach(w => this.formOptions.workTypes.push(w.name));

    let appliedDate = new Date();
    if (this.job) {
      appliedDate = new Date(this.job.applied);
    } else {
      this.job = new Job();
      this.job.status = formOptions.statuses[0].name;
      this.job.type = formOptions.workTypes[0].name;
    }
    
    this.jobForm.patchValue({
      company: this.job.company,
      title: this.job.title,
      link: this.job.link,
      country: this.job.country,
      province: this.job.province,
      city: this.job.city,
      type: this.job.type,
      status: this.job.status,
      year: appliedDate.getFullYear(),
      month: appliedDate.getMonth() + 1,
      day: appliedDate.getDate(),
      description: this.job.description,
      comment: this.job.comment
    });
  }

  async onSubmit(): Promise<void> {
    const job = this.job as Job;
    const v = this.jobForm.value;

    job.company = v.company!;
    job.title = v.title!;
    job.country = v.country!;
    job.province = v.province!;
    job.city = v.city!;
    job.type = v.type!;
    job.status = v.status!;
    job.applied = `${v.year}-${formatNumber(v.month!, 'en-US', '2.0')}-${formatNumber(v.day!, 'en-US', '2.0')}`;
    job.updated = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    job.link = v.link!;
    job.description = v.description!;
    job.comment = v.comment!;

    if (job.id == 0) {
      job.id = await this.service.generateId();
      this.service.addJob(job);
    } else {
      this.service.updateJob(job);
    }
    this.router.navigate(['/']);
  }
}
