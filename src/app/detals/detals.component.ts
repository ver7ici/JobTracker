import { Component, inject } from '@angular/core';
import { JobService } from '../job.service';
import { ActivatedRoute } from '@angular/router';
import { Job } from '../job';

@Component({
  selector: 'app-detals',
  templateUrl: './detals.component.html',
  styleUrls: ['./detals.component.css']
})
export class DetalsComponent {
  job: Job | undefined;

  constructor(private route: ActivatedRoute, private service: JobService) { }

  ngOnInit(): void {
    const jobId = parseInt(this.route.snapshot.params['id'], 10);
    this.service.getJobById(jobId)
      .subscribe(job => {
        this.job = job;
      });
  }
}
