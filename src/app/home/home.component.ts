import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Job } from '../job';
import { JobService } from '../job.service';
import { FormOption } from '../formOptions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  jobList: Job[] = [];
  filteredJobList: Job[] = [];

  timeFilters = [
    {name: "All Time", value: -1}, 
    {name: "Last 7 Days", value: 7}, 
    {name: "Last 30 days", value: 30}
  ];
  statusFilters: FormOption[] = [];

  filterForm = new FormGroup({
    text: new FormControl(''),
    time: new FormControl(this.timeFilters[0]),
    applied: new FormControl(),
    interviewing: new FormControl(),
    rejected: new FormControl()
  });

  constructor(private service: JobService) { }

  ngOnInit(): void {
    this.getAllJobs();
    this.getStatuses();

    this.onFilterChange();
  }

  getAllJobs(): void {
    this.service.getAllJobs().subscribe(jobs => {
        this.jobList = jobs;
        this.filteredJobList = jobs.sort((j1, j2) => this.sortByDateThenCompany(j1, j2));
      });
  }

  sortByDateThenCompany(j1: Job, j2: Job): number {
    let d1 = new Date(j1.updated);
    let d2 = new Date(j2.updated);
    if (d1 < d2) return -1;
    if (d2 < d1) return 1;
    return j1.company.localeCompare(j2.company);
  }

  getStatuses(): void {
    this.service.getFormOptions().subscribe(fo => {
      this.statusFilters = fo.statuses;
    });
  }

  onFilterChange(): void {
    this.filterForm.valueChanges.subscribe(filter => {
      this.filteredJobList = this.jobList.filter(job => {
        if (filter.applied || filter.interviewing || filter.rejected) {
          if (!filter.applied && job.status === "Applied") return false;
          if (!filter.interviewing && job.status === "Interviewing") return false;
          if (!filter.rejected && job.status === "Rejected") return false;
        }

        if (filter.time?.value! > 0) {
          let past = new Date();
          past = new Date(past.setDate(past.getDate() - filter.time?.value!));
          if (new Date(job.updated) < past) return false;
        }

        if (filter.text) {
          if (job.company.toLowerCase().includes(filter.text.toLowerCase())) return true;
          if (job.title.toLowerCase().includes(filter.text.toLowerCase())) return true;
          return false;
        }

        return true;
      })
      .sort((j1, j2) => this.sortByDateThenCompany(j1, j2))
    });
  }
}


