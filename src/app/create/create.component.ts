import { Component } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';
import { FormOption } from '../formOptions';
import { formatDate, formatNumber } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  provinces: FormOption[] = [];
  workTypes: FormOption[] = [];
  statuses: FormOption[] = [];

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth() + 1;
  day = this.now.getDate();

  constructor(private service: JobService, private router: Router) { }

  ngOnInit(): void {
    this.getFormOptions();
  }

  getFormOptions(): void {
    this.service.getFormOptions()
      .subscribe(o => {
        this.provinces = o.provinces;
        this.workTypes = o.workTypes;
        this.statuses = o.statuses;
      });
  }

  async add(company: string, title: string, link: string,
    country: string, province: string, city: string, workType: string,
    status: string, year: number, month: number, day: number,
    description: string, comment: string)
    : Promise<void> {
    var job: Job = {
      id: await this.service.generateId(),
      title: title,
      company: company,
      country: country,
      province: province,
      city: city,
      type: workType,
      applied: `${year}-${formatNumber(month, 'en-US', '2.0')}}-${formatNumber(day, 'en-US', '2.0')}`,
      updated: formatDate(this.now, 'yyyy-MM-dd', 'en-US'),
      // updated: `${this.year}-${this.month}-${this.day}`,
      status: status,
      description: description,
      link: link,
      comment: comment
    };
    this.service.addJob(job);
    this.router.navigate(['/']);
  }
}
