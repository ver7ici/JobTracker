import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  job: Job | undefined;

  constructor(private route: ActivatedRoute, private service: JobService, private router: Router) { }

  ngOnInit(): void {
    const jobId = parseInt(this.route.snapshot.params['id'], 10);
    this.service.getJobById(jobId).subscribe(job => {
      this.job = job;
    });
  }

  delete(): void {
    this.service.deleteJob(this.job?.id!);
    this.router.navigate(['/']);
  }
}
