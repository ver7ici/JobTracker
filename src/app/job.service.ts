import { Injectable } from '@angular/core';
import { Job } from './job';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, map, of, tap } from 'rxjs';
import { FormOptions } from './formOptions';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl = `${window.location.protocol}//${window.location.hostname}`;
  jobsUrl = `${this.baseUrl}:3000/jobs`;
  formOptionsUrl = `${this.baseUrl}:3000/formOptions`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl);
  }

  getJobById(id: number): Observable<Job | undefined> {
    return this.http.get<Job>(`${this.jobsUrl}/${id}`);
  }

  addJob(job: Job): void {
    this.http.post<Job>(this.jobsUrl, job, this.httpOptions).subscribe({
      next: (val) => {console.log(`Added job (id: ${val.id})`)},
      error: (err) => {console.log(`Error while adding job (id: ${job.id}): `, err)}
    });
  }

  updateJob(job: Job): void {
    const url = `${this.jobsUrl}/${job.id}`;
    this.http.put(url, job, this.httpOptions).subscribe({
      next: () => {console.log(`Updated job (id: ${job.id})`)},
      error: (err) => {console.log(`Error while updating job (id: ${job.id}): `, err)}
    });
  }

  deleteJob(id: number): void {
    let url = `${this.jobsUrl}/${id}`;
    this.http.delete<Job>(url, this.httpOptions).subscribe({
      next: () => {console.log(`Deleted job (id: ${id})`)},
      error: (err) => {console.log(`Error while deleting job (id: ${id}): `, err)}
    });
  }

  getFormOptions(): Observable<FormOptions> {
    return this.http.get<FormOptions>(this.formOptionsUrl);
  }

  async generateId(): Promise<number> {
    let jobs = await firstValueFrom(this.getAllJobs());
    let id = 1;
    for (let job of jobs.sort((n1, n2) => n1.id - n2.id)) {
      if (job.id == 0) continue;
      if (job.id != id) break;
      id++;
    }
    return id;
  }
}
