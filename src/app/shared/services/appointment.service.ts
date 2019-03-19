import { Injectable } from '@angular/core';
import { Login } from '../model/login.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Appoinements } from 'src/app/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  // private baseUrl: string = '/assets/data/patients.json';
  public baseUrl: string = `http://localhost:3000/sites/`;

  constructor(private http: HttpClient) { }

  checkLogin(loginData): Observable<Login[]> {
    console.log(loginData);
    return this.http.post<Login[]>(this.baseUrl, loginData).pipe(
      tap((loginData) => console.log(`loginData w/ id=${loginData}`)),
      catchError(this.handleError<Login[]>('loginData'))
    );
  }
  getAllAppointments(): Observable<Appoinements[]> {
    return this.http.get<Appoinements[]>(`${this.baseUrl}allAppointments`);
  }

  getAppointmentsOnDateSelection(currentDate: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}selectedAppointment/${currentDate}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
