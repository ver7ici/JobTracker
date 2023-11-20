import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  jobId: number | undefined;
  job: Job | undefined;

  constructor(private route: ActivatedRoute, private service: JobService, private router: Router) { }

  ngOnInit(): void {
    this.jobId = parseInt(this.route.snapshot.params['id'], 10);
  }

  delete(): void {
    this.service.deleteJob(this.jobId!);
    this.router.navigate(['/']);
  }
}
