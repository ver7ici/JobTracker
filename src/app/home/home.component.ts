import { Component, inject } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  jobList: Job[] = [];
  filteredJobList: Job[] = [];

  constructor(private service: JobService) { }

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs(): void {
    this.service.getAllJobs()
      .subscribe(jobs => {
        this.jobList = jobs;
        this.filteredJobList = jobs;
      });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredJobList = this.jobList;
    }

    this.filteredJobList = this.jobList.filter(
      job => job?.company.toLowerCase().includes(text.toLowerCase())
    );
  }
}
