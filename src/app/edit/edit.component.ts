import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  jobId: number | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.jobId = parseInt(this.route.snapshot.params['id'], 10);
  }

}
