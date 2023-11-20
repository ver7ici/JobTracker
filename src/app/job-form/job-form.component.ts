import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { FormOptions } from '../form-options';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {
  @Input() public jobId: number | undefined;
  private job: Job | undefined;

  protected formOptions = {
    status: new FormOptions(),
    type: new FormOptions()
  };

  protected jobForm = this.fb.group({
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

  public async ngOnInit(): Promise<void> {
    if (this.jobId) {
      this.job = await firstValueFrom(this.service.getJobById(this.jobId));
    }
    this.formOptions = await firstValueFrom(this.service.getFormOptions());
    this.initForm();
  }

  private initForm(): void {
    var appliedDate = new Date();
    if (this.job) {
      appliedDate = new Date(this.job.applied);
      this.jobForm.patchValue({
        company: this.job.company,
        title: this.job.title,
        link: this.job.link,
        country: this.job.country,
        province: this.job.province,
        city: this.job.city,
        type: this.job.type,
        status: this.job.status,
        description: this.job.description,
        comment: this.job.comment
      });
    } else {
      this.job = new Job();
      this.jobForm.patchValue({
        type: this.formOptions?.type.getName(1),
        status: this.formOptions?.status.getName(1)
      });
    }

    this.jobForm.patchValue({
      year: appliedDate.getFullYear(),
      month: appliedDate.getMonth() + 1,
      day: appliedDate.getDate()
    });
  }

  protected async onSubmit(): Promise<void> {
    const job = this.job as Job;
    const v = this.jobForm.value;

    job.company = v.company!;
    job.title = v.title!;
    job.country = v.country!;
    job.province = v.province!;
    job.city = v.city!;
    job.type = v.type!;
    job.status = v.status!;
    job.applied = new Date(v.year!, v.month!, v.day!),
    job.updated = new Date();
    job.link = v.link!;
    job.description = v.description!;
    job.comment = v.comment!;

    if (job.id == 0) {
      this.service.addJob(job);
    } else {
      this.service.updateJob(job);
    }
    this.router.navigate(['/']);
  }
}
