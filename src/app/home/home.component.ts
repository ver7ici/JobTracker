import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Job } from '../job';
import { JobService } from '../job.service';
import { FormOptions } from '../form-options';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private jobList: Job[] = [];
  protected filteredJobList: Job[] = [];

  protected timeFilters = [
    {name: "All Time", value: -1}, 
    {name: "Last 7 Days", value: 7}, 
    {name: "Last 14 Days", value: 14},
    {name: "Last 30 days", value: 30}
  ];

  protected status = new FormOptions();

  protected filterForm = this.fb.group({
    text: new FormControl(''),
    time: new FormControl(this.timeFilters[0]),
    statusArray: this.fb.array([])
  });

  constructor(private service: JobService, private fb: FormBuilder) { }

  public async ngOnInit(): Promise<void> {
    this.service.getAllJobs().subscribe(jobs => {
      this.jobList = jobs;
      this.filteredJobList = jobs.sort((j1, j2) => this.sortByRecent(j1, j2));
    });

    this.status = (await firstValueFrom(this.service.getFormOptions())).status;
    this.initForm();

    this.onFilterChange();
  }

  private initForm(): void {
    for (let s of this.status.toList()) {
      this.filterForm.controls.statusArray.push(this.fb.control(false));
    }
  }

  private sortByRecent(j1: Job, j2: Job): number {
    let d1 = j1.updated;
    let d2 = j2.updated;
    if (d1 < d2) return 1;
    if (d2 < d1) return -1;
    return j1.company.localeCompare(j2.company);
  }

  private onFilterChange(): void {
    this.filterForm.valueChanges.subscribe(filter => {
      this.filteredJobList = this.jobList.filter(job => {

        if (filter.statusArray?.some(b => b as boolean)) {
          for (let i = 0; i < filter.statusArray.length; i++) {
            if (!(filter.statusArray[i] as boolean)) {
              if (job.status === this.status.getName(i+1)) {
                return false;
              }
            }
          }
        }

        if (filter.time?.value! > 0) {
          let past = new Date();
          past = new Date(past.setDate(past.getDate() - filter.time?.value!));
          if (job.updated < past) return false;
        }

        if (filter.text) {
          if (job.company.toLowerCase().includes(filter.text.toLowerCase())) return true;
          if (job.title.toLowerCase().includes(filter.text.toLowerCase())) return true;
          return false;
        }

        return true;
      })
      .sort((j1, j2) => this.sortByRecent(j1, j2))
    });
  }
}


