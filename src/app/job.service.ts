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
    this.http.post<Job>(this.jobsUrl, job, this.httpOptions).subscribe(
      data => {
        console.log('POST successful', data);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  updateJob(job: Job): Observable<any> {
    return this.http.put(this.jobsUrl, job, this.httpOptions);
  }

  getFormOptions(): Observable<FormOptions> {
    return this.http.get<FormOptions>(this.formOptionsUrl);
  }

  async generateId(): Promise<number> {
    let jobs = await firstValueFrom(this.getAllJobs());
    let id = 0;
    for (let job of jobs.sort((n1, n2) => n1.id - n2.id)) {
      if (job.id != id) {
        break;
      }
      id++;
    }
    return id;
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  
}
