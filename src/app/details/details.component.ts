import { Component, Input, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../job';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() public jobId: number | undefined;
  protected job: Job | undefined;

  constructor(private route: ActivatedRoute, private service: JobService) { }

  public ngOnInit(): void {
    if (!this.jobId) {
      this.jobId = parseInt(this.route.snapshot.params['id'], 10);
    }
    this.service.getJobById(this.jobId).subscribe(job => {
      this.job = job;
    });
  }

  protected locationStr(): string {
    let a = [];
    for (let s of [this.job?.city, this.job?.province, this.job?.country]) {
      if (s) a.push(s);
    }
    return a.join(", ");
  }
}
