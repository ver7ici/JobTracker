import { Component, Input } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../job';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  @Input() job: Job | undefined;

  constructor(private route: ActivatedRoute, private service: JobService) { }

  ngOnInit(): void {
    const jobId = parseInt(this.route.snapshot.params['id'], 10);
    this.service.getJobById(jobId).subscribe(job => {
      this.job = job;
    });
  }

  locationStr(): string {
    let a = [];
    for (let s of [this.job?.city, this.job?.province, this.job?.country]) {
      if (s) a.push(s);
    }
    return a.join(", ");
  }
}
