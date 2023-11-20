import { Component, OnInit } from '@angular/core';
import { JobService } from './job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'job-tracker';

  constructor(private service: JobService) {}

  async ngOnInit(): Promise<void> {
    await this.service.initFormOptions();
  }
}
