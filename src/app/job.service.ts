import { Injectable } from '@angular/core';
import { Job } from './job';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, combineLatest, firstValueFrom, map, merge, take } from 'rxjs';
import { FormOption, FormOptions } from './form-options';
import { JobEntry } from './job-entry';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = `${window.location.protocol}//${window.location.hostname}:3001`;
  private jobUrl = `${this.baseUrl}/job`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private formOptions = {
    status: new FormOptions(),
    type: new FormOptions()
  };

  constructor(private http: HttpClient) {}

  public getAllJobs(): Observable<Job[]> {
    return this.http.get<JobEntry[]>(this.jobUrl).pipe(map(
      (entries: JobEntry[]) => entries.map(
        entry => this.toJob(entry)
      )
    ));
  }

  public getJobById(id: number): Observable<Job | undefined> {
    return this.http.get<JobEntry>(`${this.jobUrl}/${id}`).pipe(map(
      (entry: JobEntry) => this.toJob(entry)
    ));
  }

  public addJob(job: Job): void {
    const entry = this.toJobEntry(job);
    this.http.post<JobEntry>(this.jobUrl, entry, this.httpOptions).subscribe({
      next: (res: any) => {console.log(`Added job (id: ${res.insertId})`)},
      error: (err) => {console.log(`Error while adding job (id: ${job.id}): `, err)}
    });
  }

  public updateJob(job: Job): void {
    const url = `${this.jobUrl}/${job.id}`;
    const entry = this.toJobEntry(job);
    this.http.put(url, entry, this.httpOptions).subscribe({
      next: () => {console.log(`Updated job (id: ${job.id})`)},
      error: (err) => {console.log(`Error while updating job (id: ${job.id}): `, err)}
    });
  }

  public deleteJob(id: number): void {
    let url = `${this.jobUrl}/${id}`;
    this.http.delete<JobEntry>(url, this.httpOptions).subscribe({
      next: () => {console.log(`Deleted job (id: ${id})`)},
      error: (err) => {console.log(`Error while deleting job (id: ${id}): `, err)}
    });
  }

  public async initFormOptions(): Promise<void> {
    this.formOptions = await firstValueFrom(this.getFormOptions());
  }

  public getFormOptions(): Observable<typeof this.formOptions> {
    return combineLatest([
      this.http.get<FormOption[]>(`${this.baseUrl}/status`),
      this.http.get<FormOption[]>(`${this.baseUrl}/type`)
    ]).pipe(map(data => {
      return {
        status: new FormOptions(data[0]), 
        type: new FormOptions(data[1])
      };
    })).pipe(take(1));
  }

  private toJobEntry(job: Job): JobEntry {
    let je: Partial<JobEntry> = job;
    
    je.type_id = this.formOptions.type.getId(job.type);
    je.status_id = this.formOptions.status.getId(job.status);

    const re = /[\u0800-\uFFFF]/g;
    je.description = job.description.replace(re, '');

    return je as JobEntry;
  }

  private toJob(je: JobEntry): Job {
    let job: Partial<Job> = je;
    job.status = this.formOptions.status.getName(je.status_id);
    job.type = this.formOptions.type.getName(je.type_id);
    return job as Job;
  }
}
